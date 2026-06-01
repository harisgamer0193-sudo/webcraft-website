import { NextResponse } from 'next/server'

export async function GET() {
  const results: Record<string, unknown> = {}

  // Check email connection
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

  results.ownerEmail = process.env.OWNER_EMAIL || 'NOT SET'

  return NextResponse.json(results, { status: 200 })
}
