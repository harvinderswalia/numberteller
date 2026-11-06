import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import CTABand from '../../components/marketing/CTABand';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import FAQ from '../../components/marketing/FAQ';
import { SITE } from '../../config/site';
import {
  softwareApplicationSchema,
  breadcrumbSchema,
  faqSchema,
} from '../../components/seo/schema';
import {
  Home,
  Check,
  ArrowRight,
  Briefcase,
  Grid3x3,
  LayoutGrid,
} from 'lucide-react';

const calculates = [
  'House and address number vibration',
  'Vehicle registration number vibration',
  'Mobile number vibration — total and sequential analysis',
  'Harmony check of each number against the owner’s core numbers',
];

const rules = [
  'Address digits are summed and reduced to a single digit or master number',
  'Vehicle plates are reduced from the numeric portion of the registration',
  'Mobile numbers are summed in full and also analysed digit-by-digit for repeating patterns',
  'Each result is compared against the owner’s Life Path and Expression for harmony',
  'Built for the number formats used in India and the GCC — including +91 and +971 mobile numbers and regional plate formats',
];

const faqs = [
  {
    question: 'Does the tool work with Indian and GCC number formats?',
    answer:
      'Yes. NumberTeller is built for practitioners in India and the GCC. It handles +91 and +971 mobile numbers, Indian and UAE address formats, and regional vehicle registration plates — reducing the numeric portions correctly for each.',
  },
  {
    question: 'How is a mobile number analysed?',
    answer:
      'The engine sums all digits in the mobile number and reduces the total to a single digit or master number. It also scans the sequence for repeating digits and patterns, then checks the resulting vibration against the owner’s Life Path and Expression for harmony.',
  },
  {
    question: 'Can I check multiple numbers for the same client?',
    answer:
      'Yes. You can run as many checks as you like — different addresses, vehicle plates or mobile numbers — against the same client’s core numbers. This is useful when a client is choosing between properties, cars or phone numbers.',
  },
];

const related = [
  { title: 'Business Numerology', href: '/features/business-numerology', icon: Briefcase },
  { title: 'Lo Shu Grid', href: '/features/lo-shu-grid', icon: Grid3x3 },
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
];

export default function HouseCarMobile() {
  return (
    <>
      <Seo
        title="Mobile, Car & House Number Numerology Tool"
        description="Check a client's mobile number, car plate or address against their core numbers. Built for practitioners in India and the GCC."
        path="/features/house-car-mobile"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'House, Car & Mobile', path: '/features/house-car-mobile' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'House, Car & Mobile', path: '/features/house-car-mobile' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <Home className="w-4 h-4" />
              Included in Silver
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              House, car and mobile numbers, checked in seconds
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter an address, vehicle plate or mobile number and NumberTeller
              calculates its vibration and checks it against the owner’s core
              numbers — built for the formats practitioners use across India
              and the GCC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/app/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105"
              >
                Start free trial
              </Link>
              <Link
                to="/sample-report"
                className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
              >
                See a sample report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The problem it solves */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-5">
              The problem it solves
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Clients ask about house numbers, car plates and mobile numbers all
              the time — and each check means reducing digits and then
              comparing the result to the owner’s Life Path and Expression by
              hand. NumberTeller does the reduction and the harmony check in one
              step, so you can answer on the spot during a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* What it calculates */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">
            What it calculates
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {calculates.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-5"
              >
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules applied */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">
            Rules applied
          </h2>
          <div className="space-y-4 max-w-3xl">
            {rules.map((rule) => (
              <div
                key={rule}
                className="flex items-start gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-5"
              >
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300 leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Which plan includes it */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-5">
            Which plan includes it
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            House, Car & Mobile is included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan and above. You can check unlimited addresses, plates and mobile
            numbers against any client’s core numbers throughout your
            subscription.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="House, car & mobile FAQ" />
        </div>
      </section>

      {/* Related tools */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">Related tools</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                  Explore tool
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
