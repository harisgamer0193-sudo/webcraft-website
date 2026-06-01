import nodemailer from 'nodemailer'

// Owner email — change this to YOUR email address
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'hello@webcraft.dev'

// SMTP config — configure with your email provider
// For Gmail: use an App Password from https://myaccount.google.com/apppasswords
// For Outlook: use your regular password
// For other providers: check their SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

export interface OrderData {
  name: string
  email: string
  phone?: string
  plan: string
  projectType?: string
  budget?: string
  message: string
}

export async function sendOrderEmail(order: OrderData) {
  const subject = `New Order: ${order.plan} Plan — from ${order.name}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 24px 32px;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Website Order</h1>
        <p style="color: #d1fae5; margin: 4px 0 0; font-size: 14px;">${order.plan} Plan</p>
      </div>
      <div style="padding: 24px 32px;">
        <h2 style="font-size: 18px; color: #111827; margin-bottom: 16px;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${order.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0; color: #059669; font-size: 14px; font-weight: 600;">
              <a href="mailto:${order.email}" style="color: #059669;">${order.email}</a>
            </td>
          </tr>
          ${order.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${order.phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Plan</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${order.plan}</td>
          </tr>
          ${order.projectType ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Project Type</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${order.projectType}</td>
          </tr>` : ''}
          ${order.budget ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Budget</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${order.budget}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <h3 style="font-size: 16px; color: #111827; margin-bottom: 8px;">Message</h3>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.6; background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">${order.message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${order.email}?subject=Re: Your ${order.plan} Plan Order — WebCraft&body=Hi ${order.name},%0D%0A%0D%0AThank you for your order! Let me get back to you regarding your project.%0D%0A%0D%0ABest regards%0D%0AWebCraft Team"
             style="display: inline-block; background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Reply to ${order.name}
          </a>
        </div>
      </div>
      <div style="background: #f3f4f6; padding: 16px 32px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">This order was submitted through your WebCraft website</p>
      </div>
    </div>
  `

  try {
    // Only attempt to send if SMTP credentials are configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"WebCraft Orders" <${process.env.SMTP_USER}>`,
        to: OWNER_EMAIL,
        replyTo: order.email,
        subject,
        html,
      })
      return { sent: true }
    } else {
      // SMTP not configured — email content is logged for reference
      console.log('📧 EMAIL NOT SENT — SMTP not configured. Order details:')
      console.log('To:', OWNER_EMAIL)
      console.log('Reply-To:', order.email)
      console.log('Subject:', subject)
      console.log('---')
      return { sent: false, reason: 'SMTP not configured' }
    }
  } catch (error) {
    console.error('Email send error:', error)
    return { sent: false, reason: String(error) }
  }
}

export async function sendCustomerConfirmation(order: OrderData) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 24px 32px;">
        <h1 style="color: white; margin: 0; font-size: 22px;">Order Received!</h1>
        <p style="color: #d1fae5; margin: 4px 0 0; font-size: 14px;">We'll get back to you within 24 hours</p>
      </div>
      <div style="padding: 24px 32px;">
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">Hi ${order.name},</p>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">Thank you for your order! We've received your <strong>${order.plan}</strong> plan request. Our team will review your project details and get back to you within 24 hours.</p>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 16px 0;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Order Summary</p>
          <p style="margin: 8px 0 0; color: #111827; font-size: 14px; font-weight: 600;">Plan: ${order.plan}</p>
        </div>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">If you have any questions in the meantime, feel free to reply to this email.</p>
        <p style="color: #374151; font-size: 15px;">Best regards,<br><strong>WebCraft Team</strong></p>
      </div>
    </div>
  `

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"WebCraft" <${process.env.SMTP_USER}>`,
        to: order.email,
        subject: `Your ${order.plan} Plan Order — We've Got It!`,
        html,
      })
      return { sent: true }
    }
    return { sent: false, reason: 'SMTP not configured' }
  } catch (error) {
    console.error('Customer confirmation error:', error)
    return { sent: false, reason: String(error) }
  }
}
