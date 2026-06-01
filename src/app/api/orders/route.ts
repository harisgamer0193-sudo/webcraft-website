import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { sendOrderEmail, sendCustomerConfirmation } from '@/lib/email'

// Connect using the non-pooling URL for direct SQL queries
function getSql() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || ''
  return neon(connectionString)
}

// Create the orders table if it doesn't exist yet
async function ensureTable() {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
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
    )
  `
}

// Generate a simple unique ID
function makeId() {
  return 'ord_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, plan, projectType, budget, message } = body

    if (!name || !email || !plan || !message) {
      return NextResponse.json(
        { error: 'Name, email, plan, and message are required.' },
        { status: 400 }
      )
    }

    // Make sure table exists
    await ensureTable()

    const id = makeId()

    // Save order to database
    const sql = getSql()
    await sql`
      INSERT INTO orders (id, name, email, phone, plan, project_type, budget, message)
      VALUES (${id}, ${name}, ${email}, ${phone || null}, ${plan}, ${projectType || null}, ${budget || null}, ${message})
    `

    // Send emails (non-blocking)
    const orderData = { name, email, phone, plan, projectType, budget, message }
    sendOrderEmail(orderData).catch((err) => console.error('Owner email error:', err))
    sendCustomerConfirmation(orderData).catch((err) => console.error('Customer email error:', err))

    return NextResponse.json(
      { success: true, order: { id, name, plan } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create order.', detail: message },
      { status: 500 }
    )
  }
}

// GET — view all orders
export async function GET() {
  try {
    await ensureTable()
    const sql = getSql()
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`
    const orders = rows.map((row: Record<string, unknown>) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      plan: row.plan,
      projectType: row.project_type,
      budget: row.budget,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch orders.', detail: message }, { status: 500 })
  }
}

// PATCH — update order status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required.' }, { status: 400 })
    }
    const sql = getSql()
    await sql`UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ error: 'Failed to update order.' }, { status: 500 })
  }
}

// DELETE — remove an order
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 })
    }
    const sql = getSql()
    await sql`DELETE FROM orders WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order delete error:', error)
    return NextResponse.json({ error: 'Failed to delete order.' }, { status: 500 })
  }
}
