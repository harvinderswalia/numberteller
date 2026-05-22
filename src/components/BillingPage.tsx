import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface BillingPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

export default function BillingPage({ onNavigate, onShowAuth }: BillingPageProps) {
  const lastUpdated = 'May 2026';

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} />

      <section className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Billing Policy</h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Overview</h2>
              <p>
                This Billing Policy applies to all paid subscriptions to NumberTeller, operated by Docully SaaS Technologies Co. LLC ("Docully", "we", "us"). By subscribing to a paid plan, you agree to this policy in full.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Plans and Pricing</h2>
              <p>NumberTeller offers the following subscription plans (prices in Indian Rupees, INR):</p>
              <div className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden mt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-5 py-3 text-white font-semibold">Plan</th>
                      <th className="text-left px-5 py-3 text-white font-semibold">Price</th>
                      <th className="text-left px-5 py-3 text-white font-semibold">Billed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="px-5 py-3 text-gray-300">Free Trial</td>
                      <td className="px-5 py-3 text-gray-300">₹0</td>
                      <td className="px-5 py-3 text-gray-400">7 days · 5 calculations · No card</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="px-5 py-3 text-gray-300">Calculator</td>
                      <td className="px-5 py-3 text-gray-300">₹999/month</td>
                      <td className="px-5 py-3 text-gray-400">Monthly, recurring</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-gray-300">Expert</td>
                      <td className="px-5 py-3 text-gray-300">₹1,499/month</td>
                      <td className="px-5 py-3 text-gray-400">Monthly, recurring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Prices are listed in Indian Rupees (INR) and are exclusive of applicable GST. Taxes will be shown before payment confirmation. All subscriptions are monthly — there are no annual plans. Payments are processed via Stripe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Billing Cycle</h2>
              <p>
                For monthly subscriptions, your billing date is the day of the month on which you first subscribed. For annual subscriptions, the billing date is the annual anniversary of your first payment.
              </p>
              <p>
                Subscriptions renew automatically at the end of each billing period unless cancelled. You will receive a reminder email prior to renewal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Payment Methods</h2>
              <p>We accept the following payment methods via Stripe:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Major credit and debit cards (Visa, Mastercard, American Express)</li>
                <li>Stripe-supported local payment methods (available at checkout)</li>
                <li>Bank transfer (for annual and corporate plans — contact us)</li>
              </ul>
              <p>
                All payment data is processed securely by Stripe, a PCI-DSS Level 1 certified payment processor. Docully does not store card numbers on its servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Cancellation Policy</h2>
              <p>
                You may cancel your subscription at any time from your account settings or by contacting our support team. Cancellation takes effect at the end of your current billing period — your Premium access will continue until that date.
              </p>
              <p>
                <strong className="text-white">Monthly plans:</strong> Cancel at any time. No further charges after the end of the current month.
              </p>
              <p>
                <strong className="text-white">Annual plans:</strong> Cancel at any time. No further annual charges will be made. Access continues until the end of the paid annual period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Refund Policy</h2>
              <p>
                We offer a <strong className="text-white">7-day refund window</strong> from the date of initial subscription purchase. If you are not satisfied with NumberTeller Premium, contact us within 7 days of your first payment and we will issue a full refund.
              </p>
              <p>
                After 7 days, subscription fees are non-refundable, including in cases of early cancellation of an annual plan. Pro-rated refunds for unused subscription periods are not available.
              </p>
              <p>
                Refunds are not available for:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Subsequent renewal charges after the initial subscription</li>
                <li>Accounts suspended or terminated for Terms of Use violations</li>
                <li>Partial months or partial annual periods upon early cancellation</li>
              </ul>
              <p>
                To request a refund within the 7-day window, contact <a href="mailto:billing@numberteller.com" className="text-blue-400 hover:text-blue-300">billing@numberteller.com</a> or reach us on WhatsApp at <a href="https://wa.me/971565043131" className="text-blue-400 hover:text-blue-300">+971 56 504 3131</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Failed Payments</h2>
              <p>
                If a payment fails, we will retry the charge up to 3 times over 7 days. If the payment continues to fail, your subscription will be downgraded to the Free plan. Your saved chart data will not be deleted, but saving new charts will be unavailable until payment is successfully processed.
              </p>
              <p>
                We will notify you by email of any failed payment and provide a link to update your payment details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Upgrading and Downgrading</h2>
              <p>
                You may upgrade from monthly to annual billing at any time. The unused portion of your current monthly period will be credited towards the annual plan price.
              </p>
              <p>
                Downgrading from annual to monthly is available at renewal. You may not downgrade mid-period to receive a refund on the annual fee.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Taxes</h2>
              <p>
                Prices displayed may be subject to applicable VAT, GST, or other taxes depending on your location. Any applicable taxes will be shown clearly before payment confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
              <p>For billing enquiries, contact us at:</p>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-5 mt-3">
                <p className="font-semibold text-white">Docully SaaS Technologies Co. LLC</p>
                <p>Dubai, United Arab Emirates</p>
                <p>Billing: <a href="mailto:billing@numberteller.com" className="text-blue-400 hover:text-blue-300">billing@numberteller.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/971565043131" className="text-blue-400 hover:text-blue-300">+971 56 504 3131</a></p>
              </div>
            </section>

          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
