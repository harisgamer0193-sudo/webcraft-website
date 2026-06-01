'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Palette,
  Smartphone,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Mail,
  MapPin,
  Phone,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Monitor,
  Layers,
  Rocket,
  Heart,
  Users,
  Award,
  Coffee,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

/* ───────────────────── Animated section wrapper ───────────────────── */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ───────────────────── Navbar ───────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Web<span className="text-emerald-600">Craft</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ───────────────────── Hero ───────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-emerald-950/70" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-1.5 text-sm mb-6 rounded-full">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Professional Web Development
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            We Build Websites{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 animate-gradient">
              That Convert
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl"
          >
            Transform your online presence with stunning, high-performance websites crafted to grow your business. From concept to launch — we make it happen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-13 text-base shadow-lg shadow-emerald-600/30">
              Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-13 text-base">
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-8 sm:gap-16"
          >
            {[
              { num: '150+', label: 'Projects Delivered' },
              { num: '98%', label: 'Client Satisfaction' },
              { num: '5+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">{s.num}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-emerald-400" />
        </div>
      </motion.div>
    </section>
  )
}

/* ───────────────────── Services ───────────────────── */
const services = [
  {
    icon: Palette,
    title: 'Custom Web Design',
    desc: 'Unique, brand-aligned designs that captivate your audience and set you apart from the competition. Every pixel is crafted with purpose and precision to deliver an unforgettable user experience.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    desc: 'Robust, scalable web applications built with cutting-edge technologies. From responsive frontends to powerful backends, we deliver solutions that perform flawlessly under any load.',
    color: 'from-teal-500 to-cyan-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Responsive websites that look stunning on every device. We prioritize mobile experiences to ensure your audience gets a seamless interaction regardless of screen size.',
    color: 'from-cyan-500 to-emerald-400',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    desc: 'Lightning-fast load times and smooth interactions that keep visitors engaged. We optimize every aspect of your site to achieve top Core Web Vitals scores and SEO rankings.',
    color: 'from-emerald-600 to-green-400',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    desc: 'Keep your website safe and up-to-date with ongoing maintenance, security patches, and monitoring. We proactively protect your digital investment 24/7 so you can focus on growth.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Globe,
    title: 'SEO & Digital Strategy',
    desc: 'Get found online with data-driven SEO strategies and digital marketing. We help you climb search rankings, drive organic traffic, and convert visitors into loyal customers.',
    color: 'from-teal-600 to-emerald-400',
  },
]

function Services() {
  return (
    <Section id="services" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
            What We Do
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Services That <span className="text-emerald-600">Drive Results</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            From stunning designs to powerful development — everything you need to succeed online, under one roof.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Portfolio ───────────────────── */
const projects = [
  {
    img: '/portfolio-1.png',
    title: 'TechVault SaaS Platform',
    category: 'Web Application',
    desc: 'A comprehensive SaaS dashboard with real-time analytics, team collaboration features, and a modern dark theme interface.',
  },
  {
    img: '/portfolio-2.png',
    title: 'LuxeCart E-Commerce',
    category: 'E-Commerce',
    desc: 'High-converting online store with seamless checkout, product filtering, and a beautiful responsive design that drives sales.',
  },
  {
    img: '/portfolio-3.png',
    title: 'DataPulse Analytics',
    category: 'Dashboard',
    desc: 'Enterprise-grade analytics dashboard with interactive charts, custom reporting, and real-time data visualization capabilities.',
  },
]

function Portfolio() {
  return (
    <Section id="portfolio" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
            Our Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Featured <span className="text-emerald-600">Projects</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Every project is a story of transformation. Here are some of the businesses we have helped thrive online.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 rounded-full hover:bg-white/30">
                      View Project <ExternalLink className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 mb-3">
                    {p.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Testimonials ───────────────────── */
const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, Bloom & Grow',
    text: 'WebCraft transformed our outdated website into a modern, high-performing platform. Our online sales increased by 340% within three months of launch. The team was responsive, creative, and delivered beyond our expectations.',
    stars: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, TechNova',
    text: 'Working with WebCraft was a game-changer for our startup. They understood our vision perfectly and built a website that not only looks amazing but also converts visitors into customers. Highly recommended for anyone serious about their online presence.',
    stars: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Marketing Director, LuxeStyle',
    text: 'The attention to detail is incredible. Every animation, every interaction feels polished and intentional. Our bounce rate dropped by 60% and user engagement tripled. WebCraft does not just build websites — they build experiences.',
    stars: 5,
  },
]

function Testimonials() {
  return (
    <Section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            What Our <span className="text-emerald-600">Clients Say</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Do not just take our word for it — hear from the businesses we have helped succeed.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-shadow rounded-2xl">
                <CardContent className="p-6 lg:p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-sm">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Pricing ───────────────────── */
const plans = [
  {
    name: 'Starter',
    price: '$499',
    desc: 'Perfect for small businesses and personal brands getting started online.',
    features: [
      'Responsive 5-page website',
      'Custom design mockup',
      'Mobile-friendly layout',
      'Basic SEO setup',
      'Contact form integration',
      '1 revision round',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$1,299',
    desc: 'Ideal for growing businesses that need a strong online presence and more functionality.',
    features: [
      'Up to 15 pages',
      'Premium custom design',
      'CMS integration',
      'Advanced SEO optimization',
      'E-commerce ready',
      'Analytics dashboard',
      '3 revision rounds',
      'Priority support',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large-scale projects that demand advanced features, integrations, and dedicated support.',
    features: [
      'Unlimited pages',
      'Bespoke UI/UX design',
      'Custom web application',
      'API integrations',
      'Performance optimization',
      'Security hardening',
      'Unlimited revisions',
      'Dedicated project manager',
    ],
    cta: 'Contact Us',
    popular: false,
  },
]

function Pricing() {
  return (
    <Section id="pricing" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Transparent <span className="text-emerald-600">Pricing</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Clear, upfront pricing with no hidden fees. Choose the plan that fits your goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card
                className={`relative h-full border-0 rounded-2xl transition-shadow ${
                  p.popular
                    ? 'shadow-xl ring-2 ring-emerald-500 scale-[1.02]'
                    : 'shadow-sm hover:shadow-lg'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">{p.price}</span>
                    {p.price !== 'Custom' && <span className="text-gray-400 text-sm">/project</span>}
                  </div>
                  <p className="mt-3 text-gray-500 text-sm">{p.desc}</p>
                  <div className="mt-6 h-px bg-gray-100" />
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 rounded-full h-11 ${
                      p.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {p.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── About / Stats ───────────────────── */
const stats = [
  { icon: Users, num: '150+', label: 'Happy Clients' },
  { icon: Award, num: '5+', label: 'Years in Business' },
  { icon: Coffee, num: '3,200+', label: 'Cups of Coffee' },
  { icon: Rocket, num: '99.9%', label: 'Uptime Guarantee' },
]

function About() {
  return (
    <Section id="about" className="py-20 sm:py-28 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-1.5 mb-4 rounded-full">
              About Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              We Are Passionate About{' '}
              <span className="text-emerald-400">Crafting Digital Experiences</span>
            </h2>
            <p className="mt-6 text-gray-300 leading-relaxed text-lg">
              WebCraft was founded with a simple mission: help businesses thrive online through exceptional web design and development. We believe that every business deserves a website that not only looks stunning but also delivers real, measurable results.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Our team of designers, developers, and strategists work closely with each client to understand their unique needs and deliver solutions that exceed expectations. From startups to enterprises, we approach every project with the same level of dedication and creative energy, ensuring your digital presence stands out in a crowded marketplace.
            </p>
            <Button size="lg" className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 shadow-lg shadow-emerald-600/30">
              Learn More <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <s.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white">{s.num}</div>
                    <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Process ───────────────────── */
const steps = [
  {
    icon: Monitor,
    title: 'Discovery',
    desc: 'We dive deep into your business goals, target audience, and competitive landscape to build a solid strategy.',
  },
  {
    icon: Layers,
    title: 'Design',
    desc: 'Our designers create stunning, user-focused mockups that align with your brand identity and business objectives.',
  },
  {
    icon: Code2,
    title: 'Develop',
    desc: 'We bring designs to life with clean, performant code using the latest technologies and best practices.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    desc: 'After thorough testing, we deploy your website and provide ongoing support to ensure lasting success.',
  },
]

function Process() {
  return (
    <Section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
            Our Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            How We <span className="text-emerald-600">Work</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            A streamlined, transparent process that keeps you informed and involved every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto">
                  <s.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── CTA Banner ───────────────────── */
function CtaBanner() {
  return (
    <Section className="py-20 sm:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-10 right-20 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Ready to Build Something{' '}
          <span className="text-emerald-200">Amazing?</span>
        </h2>
        <p className="mt-6 text-emerald-100 text-lg leading-relaxed">
          Let us turn your vision into reality. Get a free consultation and discover how we can help grow your business with a stunning, high-performing website.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-full px-8 h-13 text-base font-semibold shadow-lg">
            Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-13 text-base">
            Schedule a Call
          </Button>
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Contact ───────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <Section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5 mb-4 rounded-full">
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Let&apos;s Start Your <span className="text-emerald-600">Project</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Have an idea? We would love to hear about it. Fill out the form and we will get back to you within 24 hours with a free project estimate.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Mail, label: 'hello@webcraft.dev' },
                { icon: Phone, label: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'San Francisco, CA' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6 lg:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="text-gray-500 mt-2">We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name</label>
                      <Input placeholder="John" className="h-11 rounded-lg" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label>
                      <Input placeholder="Doe" className="h-11 rounded-lg" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                    <Input type="email" placeholder="john@example.com" className="h-11 rounded-lg" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Project Type</label>
                    <Input placeholder="e.g. E-Commerce, Portfolio, SaaS" className="h-11 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="rounded-lg resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-11 text-base"
                  >
                    Send Message <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}

/* ───────────────────── Footer ───────────────────── */
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Web<span className="text-emerald-400">Craft</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Crafting high-performance websites that help businesses grow and succeed online since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Services', 'Portfolio', 'Pricing', 'About', 'Contact'].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-emerald-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Web Design', 'Web Development', 'E-Commerce', 'SEO Optimization', 'Maintenance'].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-emerald-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                hello@webcraft.dev
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; 2026 WebCraft. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ───────────────────── Scroll-to-top ───────────────────── */
function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center hover:bg-emerald-700 transition-colors"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </motion.button>
  )
}

/* ───────────────────── Page ───────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Pricing />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  )
}
