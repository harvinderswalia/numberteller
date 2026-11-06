import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { SITE } from '../config/site';
import { webPageSchema, breadcrumbSchema } from '../components/seo/schema';
import {
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
  CalendarClock,
} from 'lucide-react';

const walkthroughPoints = [
  'Core chart and Lo Shu grid on a real client',
  'Name correction and compatibility in real time',
  'Personal year, pinnacles and transit cycles',
  'Exporting a client-ready PDF report',
];

export default function Demo() {
  return (
    <>
      <Seo
        title="Book a NumberTeller Demo for Your Practice"
        description="A short walkthrough of NumberTeller's tools on a real chart, with plan activation help on WhatsApp or email."
        path="/demo"
        jsonLd={[webPageSchema(), breadcrumbSchema([{ name: 'Demo', path: '/demo' }])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Book a demo', path: '/demo' }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mt-8 mb-5">
            <Clock className="w-4 h-4" />
            15-minute walkthrough
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            See NumberTeller on a real chart
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            A short, practical walkthrough of NumberTeller's tools on a real
            client chart — from core numbers to a finished PDF report. We'll
            also help you pick and activate the right plan for your practice.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-5">
                <CalendarClock className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">
                What we cover
              </h2>
              <ul className="space-y-3">
                {walkthroughPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-white mb-2">
                Book your walkthrough
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Reach us on WhatsApp for the quickest response, or send an email
                and we'll set up a time that suits you.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href={SITE.contact.whatsappDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book on WhatsApp
                </a>
                <a
                  href={`mailto:${SITE.contact.email}?subject=NumberTeller%20demo%20request`}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email us to schedule
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400">
              Prefer to explore on your own?{' '}
              <Link to="/app/signup" className="text-cyan-400 hover:underline">
                Start a 3-day free trial
              </Link>{' '}
              — no credit card needed.
            </p>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
