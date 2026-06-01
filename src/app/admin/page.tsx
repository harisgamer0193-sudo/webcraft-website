'use client'

import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Orders System Active</h1>
        <p className="text-gray-500 leading-relaxed mb-6">
          When customers place orders, you receive them directly in your email inbox at{' '}
          <strong className="text-emerald-600">harisgamer0193@gmail.com</strong>.
          Simply reply to those emails to respond to customers.
        </p>
        <div className="bg-white rounded-xl border p-6 mb-6">
          <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
          <p className="text-sm text-gray-600">
            All orders are delivered to your email. Check your inbox (and spam folder) for new order notifications.
          </p>
        </div>
        <a href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
          </Button>
        </a>
      </div>
    </div>
  )
}
