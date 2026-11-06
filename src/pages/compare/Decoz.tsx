import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import CTABand from '../../components/marketing/CTABand';
import {
  breadcrumbSchema,
} from '../../components/seo/schema';
import {
  Grid3x3,
  Wand2,
  Briefcase,
  Home,
  Check,
  Monitor,
  Globe,
  Gift,
  IndianRupee,
  Info,
} from 'lucide-react';

const decozPoints = [
  { icon: Monitor, title: 'Windows desktop software', body: 'Decoz is a long-established numerology application with a native Windows desktop program.' },
  { icon: Globe, title: 'Online web app', body: 'Decoz also offers an online web app, so it is not limited to a single desktop.' },
  { icon: Gift, title: 'Free trial version', body: 'A free trial version is available so you can evaluate the software before buying.' },
];

const numbertellerPoints = [
  { icon: Grid3x3, title: 'Lo Shu grid', body: 'Full Lo Shu grid with power arrows, missing numbers and plane analysis.' },
  { icon: Wand2, title: 'AI name correction', body: 'Ranked name variants scored against the client’s birth numbers and goal.' },
  { icon: Briefcase, title: 'Business module', body: 'Company number, name suggestions, owner profile and 2–5 partner compatibility.' },
  { icon: Home, title: 'House, car & mobile', body: 'Address, vehicle plate and phone-number vibration against the owner’s numbers.' },
  { icon: IndianRupee, title: 'INR monthly plans', body: 'Plans from ₹991/month, billed in Indian Rupees with a 3-day free trial — no credit card.' },
];

export default function Decoz() {
  return (
    <>
      <Seo
        title="NumberTeller vs Decoz Numerology Software"
        description="A fair side-by-side of NumberTeller and Decoz numerology software for professional numerologists choosing a tool."
        path="/compare/decoz-numerology-software"
        noindex
        jsonLd={[breadcrumbSchema([
          { name: 'Compare', path: '/compare/decoz-numerology-software' },
          { name: 'Decoz', path: '/compare/decoz-numerology-software' },
        ])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: 'Compare', path: '/compare/decoz-numerology-software' },
            { name: 'Decoz', path: '/compare/decoz-numerology-software' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5 max-w-3xl">
            NumberTeller and Decoz: which fits your practice?
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-6">
            If you are choosing between NumberTeller and Decoz, here is a fair,
            factual side-by-side. We have tried to describe Decoz accurately
            based on what the product publicly offers.
          </p>

          {/* Fairness note */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-14 flex items-start gap-3 max-w-3xl">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-100/80">
              We are not in a position to comment on Decoz&rsquo;s current pricing,
              feature depth or calculation accuracy beyond what is listed below.
              The Decoz points are the ones we have been able to verify from
              public sources. <strong className="text-blue-200">Last checked: November 2026.</strong>{' '}
              Always confirm details on the Decoz website before deciding.
            </p>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {/* Decoz side */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Decoz</h2>
              <p className="text-sm text-gray-400 mb-6">
                A long-established numerology software used by many practitioners.
              </p>
              <ul className="space-y-5">
                {decozPoints.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <Icon className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{title}</p>
                      <p className="text-sm text-gray-400 mt-1">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-6 pt-6 border-t border-white/10">
                No pricing claims made about Decoz on this page.
              </p>
            </div>

            {/* NumberTeller side */}
            <div className="bg-slate-800/60 border border-cyan-500/30 rounded-2xl p-8 ring-1 ring-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-2">NumberTeller</h2>
              <p className="text-sm text-gray-400 mb-6">
                Browser-based numerology software built for practising numerologists.
              </p>
              <ul className="space-y-5">
                {numbertellerPoints.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{title}</p>
                      <p className="text-sm text-gray-400 mt-1">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to choose */}
          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-8 mb-4">
            <h2 className="text-2xl font-bold text-white mb-6">How to choose</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-white font-medium mb-3">Decoz may suit you if</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" /> You want a Windows desktop program you install locally.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" /> You are comfortable with its calculation method and report style.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" /> You prefer a one-time or long-established licensing model.</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-medium mb-3">NumberTeller may suit you if</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> You want a browser-based tool that works on any device.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> You need the Lo Shu grid, AI name correction and a business module.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> You prefer a low monthly INR plan with a free trial.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-6 pt-6 border-t border-white/10">
              The best way to judge is to try both. NumberTeller offers a{' '}
              <Link to="/app/signup" className="text-cyan-400 hover:underline">3-day free trial</Link>
              {' '}— no credit card — or you can{' '}
              <Link to="/sample-report" className="text-cyan-400 hover:underline">see a sample report</Link>{' '}
              first.
            </p>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
