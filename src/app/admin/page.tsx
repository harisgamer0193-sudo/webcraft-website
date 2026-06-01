'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  ShoppingCart,
  RefreshCw,
  Trash2,
  Eye,
  ChevronDown,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  name: string
  email: string
  phone: string | null
  plan: string
  projectType: string | null
  budget: string | null
  message: string
  status: string
  createdAt: string
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'New' },
  contacted: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Contacted' },
  in_progress: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      console.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      fetchOrders()
    } catch {
      console.error('Failed to update status')
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    try {
      await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchOrders()
    } catch {
      console.error('Failed to delete order')
    }
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  const newCount = orders.filter((o) => o.status === 'new').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Order Dashboard
              </h1>
              <p className="text-sm text-gray-400">View and manage customer orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {newCount > 0 && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 rounded-full">
                {newCount} New
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={fetchOrders}
              className="rounded-full"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Orders', count: orders.length },
            { key: 'new', label: 'New', count: orders.filter((o) => o.status === 'new').length },
            { key: 'contacted', label: 'Contacted', count: orders.filter((o) => o.status === 'contacted').length },
            { key: 'in_progress', label: 'In Progress', count: orders.filter((o) => o.status === 'in_progress').length },
            { key: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'completed').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Orders Yet</h3>
            <p className="text-gray-400">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => {
              const isExpanded = expandedId === order.id
              const statusInfo = statusColors[order.status] || statusColors.new
              const date = new Date(order.createdAt)

              return (
                <Card key={order.id} className="border-0 shadow-sm rounded-xl overflow-hidden">
                  {/* Order header — always visible */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full text-left"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{order.name}</h3>
                            <Badge className={`${statusInfo.bg} ${statusInfo.text} text-xs px-2 py-0.5 rounded-full border-0`}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-emerald-600 font-medium mt-0.5">{order.plan}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              {order.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-300 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </CardContent>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 border-t border-gray-50">
                      <div className="pt-4 space-y-4">
                        {/* Contact info */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {order.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {order.phone}
                            </div>
                          )}
                          {order.projectType && (
                            <div className="text-sm text-gray-600">
                              <span className="text-gray-400">Project:</span> {order.projectType}
                            </div>
                          )}
                          {order.budget && (
                            <div className="text-sm text-gray-600">
                              <span className="text-gray-400">Budget:</span> {order.budget}
                            </div>
                          )}
                        </div>

                        {/* Message */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Message</p>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{order.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <a
                            href={`mailto:${order.email}?subject=Re: Your ${order.plan} Order — WebCraft&body=Hi ${order.name},%0D%0A%0D%0AThank you for your order!%0D%0A%0D%0ABest regards%0D%0AWebCraft Team`}
                          >
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                              <Mail className="w-4 h-4 mr-1.5" /> Reply via Email
                            </Button>
                          </a>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 mr-1">Status:</span>
                            {Object.entries(statusColors).map(([key, info]) => (
                              <button
                                key={key}
                                onClick={() => updateStatus(order.id, key)}
                                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                                  order.status === key
                                    ? `${info.bg} ${info.text} ring-1 ring-current`
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }`}
                              >
                                {info.label}
                              </button>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full ml-auto"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
