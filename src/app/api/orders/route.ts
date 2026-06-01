import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendOrderEmail, sendCustomerConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, plan, projectType, budget, message } = body

    // Validate required fields
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

    // Send email notification to owner (non-blocking)
    const orderData = { name, email, phone, plan, projectType, budget, message }
    sendOrderEmail(orderData).catch((err) =>
      console.error('Owner email send failed:', err)
    )
    sendCustomerConfirmation(orderData).catch((err) =>
      console.error('Customer email send failed:', err)
    )

    return NextResponse.json(
      { success: true, order: { id: order.id, name: order.name, plan: order.plan } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    )
  }
}

// GET — for the owner to view all orders
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders.' },
      { status: 500 }
    )
  }
}
