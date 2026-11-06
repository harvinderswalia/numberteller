import { Link } from 'react-router-dom';

export default function CTABand() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Start your free trial today
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          3 days · Unlimited calculations · No credit card.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </section>
  );
}
