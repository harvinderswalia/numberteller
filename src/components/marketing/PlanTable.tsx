import { SITE } from '../../config/site';

export default function PlanTable() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {SITE.plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative bg-slate-800/60 border rounded-2xl p-8 ${
            plan.badge === 'Most popular'
              ? 'border-blue-500/50 ring-1 ring-blue-500/30'
              : 'border-white/10'
          }`}
        >
          {plan.badge && (
            <span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                plan.badge === 'Most popular'
                  ? 'bg-blue-500 text-white'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              {plan.badge}
            </span>
          )}
          <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-white">
              ₹{plan.price.toLocaleString('en-IN')}
            </span>
            <span className="text-gray-400 text-sm">/{plan.period}</span>
          </div>
          <p className="text-sm text-gray-400 mb-6">{plan.numerology} numerology consultation{plan.numerology > 1 ? 's' : ''} per month</p>
        </div>
      ))}
    </div>
  );
}
