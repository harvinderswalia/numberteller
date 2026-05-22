import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ChevronRight, Send, Hash } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

export default function ContactPage({ onNavigate, onShowAuth, onShowSignIn }: ContactPageProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} currentPage="contact" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 55%)`
        }} />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400">
            Questions about NumberTeller? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                    <a href="tel:+971565043131" className="text-white font-medium hover:text-blue-300 transition-colors">+971 56 504 3131</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Email</p>
                    <a href="mailto:support@numberteller.com" className="text-white font-medium hover:text-blue-300 transition-colors">support@numberteller.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Company</p>
                    <p className="text-white font-medium">Docully SaaS Technologies Co. LLC</p>
                    <p className="text-gray-400 text-sm">Dubai, United Arab Emirates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Support Hours</p>
                    <p className="text-white font-medium">Mon – Fri, 9am – 6pm GST</p>
                    <p className="text-gray-400 text-sm">UTC+4 (Dubai time)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp card */}
            <div className="bg-emerald-900/30 border border-emerald-500/25 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                <h4 className="text-white font-bold">Prefer WhatsApp?</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                For quick questions and faster responses, message us directly on WhatsApp. We typically respond within a few hours during business hours.
              </p>
              <a
                href="https://wa.me/971565043131"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-slate-800 border border-white/10 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center min-h-80">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-5">
                  <Send className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 max-w-sm">
                  Thank you for reaching out. Our team will get back to you within one business day.
                </p>
              </div>
            ) : (
              <div className="bg-slate-800 border border-white/10 rounded-2xl p-8">
                <h3 className="text-white font-bold text-xl mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Enquiry</option>
                      <option value="pricing">Pricing & Plans</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Issue</option>
                      <option value="feedback">Feature Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors resize-none"
                      placeholder="Describe your query or how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    Send Message
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
