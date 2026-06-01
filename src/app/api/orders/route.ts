import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendOrderEmail, sendCustomerConfirmation } from '@/lib/email'

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

    // Save order to database
    const order = await db.order.create({
      data: {
        name,
        email,
        phone: phone || null,
        plan,
        projectType: projectType || null,
        budget: budget || null,
        message,
      },
    })

    // Send emails (non-blocking)
    const orderData = { name, email, phone, plan, projectType, budget, message }
    sendOrderEmail(orderData).catch((err) => console.error('Owner email error:', err))
    sendCustomerConfirmation(orderData).catch((err) => console.error('Customer email error:', err))

    return NextResponse.json(
      { success: true, order: { id: order.id, name: order.name, plan: order.plan } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    const detail = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create order.', detail },
      { status: 500 }
    )
  }
}

// GET — view all orders
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    const detail = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch orders.', detail }, { status: 500 })
  }
}

// PATCH — update order status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required.' }, { status: 400 })
    }
    await db.order.update({
      where: { id },
      data: { status },
    })
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
    await db.order.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order delete error:', error)
    return NextResponse.json({ error: 'Failed to delete order.' }, { status: 500 })
  }
}
