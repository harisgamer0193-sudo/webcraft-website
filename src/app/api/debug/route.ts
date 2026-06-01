import { NextResponse } from 'next/server'

export async function GET() {
  const results: Record<string, unknown> = {}

  // Check 1: Environment variables
  results.env = {
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
    SMTP_USER: !!process.env.SMTP_USER,
    OWNER_EMAIL: process.env.OWNER_EMAIL || 'NOT SET',
  }

  // Check 2: Try database connection with Neon
  try {
    const { neon } = await import('@neondatabase/serverless')
    const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || ''
    const sql = neon(connectionString)
    await sql`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      plan TEXT NOT NULL,
      project_type TEXT,
      budget TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`
    const rows = await sql`SELECT COUNT(*) as cnt FROM orders`
    results.database = { status: 'CONNECTED', orderCount: rows[0]?.cnt || 0 }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    results.database = { status: 'FAILED', error: message }
  }

  // Check 3: Email
  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    })
    await transporter.verify()
    results.email = { status: 'CONNECTED' }
    transporter.close()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    results.email = { status: 'FAILED', error: message }
  }

  return NextResponse.json(results, { status: 200 })
}
