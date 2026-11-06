import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { SITE } from '../config/site';
import { webPageSchema, breadcrumbSchema } from '../components/seo/schema';
import { Mail, Phone, MessageCircle, MapPin, Building2 } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact NumberTeller — Support & Plan Activation"
        description="Reach the NumberTeller team on WhatsApp, phone or email for demos, plan activation and support."
        path="/contact"
        jsonLd={[webPageSchema(), breadcrumbSchema([{ name: 'Contact', path: '/contact' }])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            Questions about a plan, need a demo, or want help activating your
            subscription? The NumberTeller team is one message away.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a
              href={SITE.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">WhatsApp</h2>
              <p className="text-sm text-gray-400 mb-2">
                Fastest way to reach us — demos and plan activation.
              </p>
              <p className="text-sm text-cyan-400 group-hover:underline">
                {SITE.contact.phone}
              </p>
            </a>

            <a
              href={SITE.contact.phoneHref}
              className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">Phone</h2>
              <p className="text-sm text-gray-400 mb-2">
                Speak to the team during business hours.
              </p>
              <p className="text-sm text-cyan-400 group-hover:underline">
                {SITE.contact.phone}
              </p>
            </a>

            <a
              href={`mailto:${SITE.contact.email}`}
              className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">Email</h2>
              <p className="text-sm text-gray-400 mb-2">
                Support requests and account questions.
              </p>
              <p className="text-sm text-cyan-400 group-hover:underline break-all">
                {SITE.contact.email}
              </p>
            </a>
          </div>

          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
                <Building2 className="w-5 h-5 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Publisher
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Company</p>
                <p className="text-white font-medium">
                  {SITE.publisher.legalName}
                </p>
              </div>
              <div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {SITE.publisher.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400">
              Looking to explore the tools first?{' '}
              <Link to="/features" className="text-cyan-400 hover:underline">
                See the {SITE.toolCount} tools
              </Link>{' '}
              or{' '}
              <Link to="/demo" className="text-cyan-400 hover:underline">
                book a demo
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
