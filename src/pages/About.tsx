import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { SITE } from '../config/site';
import { organizationSchema, breadcrumbSchema } from '../components/seo/schema';
import { Building2, MapPin, Phone, Mail, ShieldCheck, Cpu } from 'lucide-react';

export default function About() {
  return (
    <>
      <Seo
        title="About NumberTeller — Built for Numerology Practitioners"
        description="Why we built calculation software for practising numerologists, and how the engine handles master and karmic debt numbers."
        path="/about"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([{ name: 'About', path: '/about' }]),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-6">
            Professional numerology, without the manual maths
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-12">
            NumberTeller is built and published by Confiex Data Room Private
            Limited, Mumbai, India.
          </p>

          <div className="grid md:grid-cols-1 gap-6 mb-12">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <Building2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Publisher
              </h2>
              <p className="text-gray-300 font-medium mb-1">
                {SITE.publisher.legalName}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {SITE.publisher.address}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Telephone: {SITE.publisher.telephone}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 mb-5">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Why we built it
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Practising numerologists spend hours reducing numbers by hand or
                in spreadsheets — and a single misread letter value or misplaced
                Lo Shu digit changes a whole reading. NumberTeller runs the
                Pythagorean and Lo Shu arithmetic for you, so you spend your
                time interpreting, not calculating.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-5">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                How the engine works
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The calculation engine preserves master numbers (11, 22, 33)
                during reduction and automatically flags karmic debt (13, 14,
                16, 19) and missing numbers — the details most often lost when a
                chart is done by hand.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href={SITE.contact.phoneHref}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-gray-400" />
                {SITE.contact.phone}
              </a>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors break-all"
              >
                <Mail className="w-5 h-5 text-gray-400" />
                {SITE.contact.email}
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400">
              Explore the tools{' '}
              <Link to="/features" className="text-cyan-400 hover:underline">
                here
              </Link>{' '}
              or{' '}
              <Link to="/pricing" className="text-cyan-400 hover:underline">
                see pricing
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
