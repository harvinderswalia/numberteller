import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

export default function PrivacyPage({ onNavigate, onShowAuth }: PrivacyPageProps) {
  const lastUpdated = 'May 2026';

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} />

      <section className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p>
                Docully SaaS Technologies Co. LLC ("Docully", "we", "us", or "our"), the operator of NumberTeller, is committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights in relation to it.
              </p>
              <p>
                This policy applies to all users of the NumberTeller platform, accessible at numberteller.com and related subdomains.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Data We Collect</h2>
              <p><strong className="text-white">Account Data:</strong> When you register, we collect your email address and a hashed version of your password. We do not store plaintext passwords.</p>
              <p><strong className="text-white">Chart Data:</strong> If you save charts, we store the data you input (names, dates of birth, and calculation results) associated with your account. This data is stored in encrypted form in our secure database.</p>
              <p><strong className="text-white">Usage Data:</strong> We may collect anonymised information about how you use the Platform — such as which tools are used most frequently — to improve the product. This data is not linked to individual identities.</p>
              <p><strong className="text-white">Communication Data:</strong> If you contact us via the contact form or email, we retain those communications to respond to your enquiry.</p>
              <p><strong className="text-white">Payment Data:</strong> Payment processing is handled by our payment provider. We do not store credit card numbers or full payment card details on our servers.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>To provide, maintain, and improve the Platform</li>
                <li>To authenticate your account and manage your session</li>
                <li>To store and retrieve your saved client charts</li>
                <li>To send you transactional communications (account notifications, billing confirmations)</li>
                <li>To respond to your support requests and enquiries</li>
                <li>To enforce our Terms of Use and prevent fraud or abuse</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p>
                NumberTeller uses the following third-party services, each of which has its own privacy policy:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li><strong className="text-white">Supabase:</strong> Our database and authentication infrastructure provider. Data is stored on Supabase's secure servers.</li>
                <li><strong className="text-white">Payment Processor:</strong> Payments are processed by a PCI-DSS compliant payment gateway. We do not receive or store full payment card data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where retention is required by law (e.g., billing records, which are retained for 7 years in accordance with UAE commercial regulations).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Cookies</h2>
              <p>
                NumberTeller uses minimal, necessary cookies to maintain your authenticated session. We do not use tracking cookies, third-party advertising cookies, or cookies for behavioural profiling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Encryption of data in transit (TLS/HTTPS)</li>
                <li>Encryption of data at rest</li>
                <li>Row-level security policies ensuring each user can only access their own data</li>
                <li>Hashed password storage (never stored in plaintext)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Object to certain processing activities</li>
                <li>Request a copy of your data in portable format</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:privacy@numberteller.com" className="text-blue-400 hover:text-blue-300">privacy@numberteller.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Client Data Responsibility</h2>
              <p>
                As a practitioner using NumberTeller, you may input data relating to your clients (names, dates of birth). You are solely responsible for ensuring that you have the appropriate legal basis to process this data and that doing so complies with all applicable data protection laws in your jurisdiction.
              </p>
              <p>
                Docully acts as a data processor in respect of client data you input, and you act as the data controller. Our Data Processing Agreement is available upon request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify registered users of material changes by email. The "last updated" date at the top of this page indicates when the policy was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Contact</h2>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-5 mt-3">
                <p className="font-semibold text-white">Docully SaaS Technologies Co. LLC</p>
                <p>Dubai, United Arab Emirates</p>
                <p>Privacy enquiries: <a href="mailto:privacy@numberteller.com" className="text-blue-400 hover:text-blue-300">privacy@numberteller.com</a></p>
                <p>Phone / WhatsApp: <a href="tel:+971565043131" className="text-blue-400 hover:text-blue-300">+971 56 504 3131</a></p>
              </div>
            </section>

          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
