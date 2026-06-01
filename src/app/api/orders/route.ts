import { NextRequest, NextResponse } from 'next/server'
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

    const orderData = { name, email, phone, plan, projectType, budget, message }

    // Send email to you (the owner)
    const ownerResult = await sendOrderEmail(orderData)
    if (!ownerResult.sent) {
      console.error('Owner email failed:', ownerResult.reason)
      return NextResponse.json(
        { error: 'Failed to send order. Please try again later.' },
        { status: 500 }
      )
    }

    // Send confirmation to customer (non-blocking)
    sendCustomerConfirmation(orderData).catch((err) =>
      console.error('Customer confirmation error:', err)
    )

    return NextResponse.json(
      { success: true, message: 'Order placed successfully! We will contact you soon.' },
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
