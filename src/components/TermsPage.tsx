import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface TermsPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

export default function TermsPage({ onNavigate, onShowAuth }: TermsPageProps) {
  const lastUpdated = 'May 2026';

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} />

      <section className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Terms of Use</h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using NumberTeller (the "Platform"), operated by Docully SaaS Technologies Co. LLC, a company registered in Dubai, United Arab Emirates ("Docully", "we", "us", or "our"), you agree to be bound by these Terms of Use. If you do not agree to these terms, you must not use the Platform.
              </p>
              <p>
                These Terms apply to all users of the Platform, including registered account holders and visitors who access the Platform without registering.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Platform Description</h2>
              <p>
                NumberTeller is a professional numerology software platform designed exclusively for use by practising numerologists, holistic consultants, life coaches, and other professional practitioners. It is not intended for use by end consumers seeking personal numerological advice.
              </p>
              <p>
                The Platform provides calculation tools, AI-assisted name correction analysis, chart management, PDF export functionality, and related professional resources. All calculations are performed using Pythagorean numerology methodology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Account Registration</h2>
              <p>
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and accept responsibility for all activity under your account</li>
                <li>Notify us immediately of any unauthorised use of your account</li>
                <li>Not share your account credentials with any third party</li>
              </ul>
              <p>
                You must be at least 18 years of age to create an account. By registering, you represent that you are at least 18 years old.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>Use the Platform for any unlawful purpose or in violation of any applicable law or regulation</li>
                <li>Attempt to gain unauthorised access to any part of the Platform or its infrastructure</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
                <li>Use automated scripts or bots to access or interact with the Platform</li>
                <li>Reproduce, distribute, or create derivative works from Platform content without express written permission</li>
                <li>Use the Platform to process third-party data in violation of applicable privacy laws</li>
                <li>Resell or sublicence access to the Platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
              <p>
                All content on the Platform — including but not limited to the calculation engine, AI name correction algorithms, interface design, text, and graphics — is the property of Docully SaaS Technologies Co. LLC and is protected by applicable intellectual property laws.
              </p>
              <p>
                You retain ownership of data you input into the Platform (such as client names and dates of birth). By inputting such data, you represent that you have the right to do so and that doing so complies with all applicable privacy and data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
              <p>
                The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Docully does not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-400">
                <li>The Platform will be uninterrupted, error-free, or secure at all times</li>
                <li>Calculation results will be suitable for any specific purpose</li>
                <li>Any errors or defects will be corrected</li>
              </ul>
              <p>
                Numerology is an interpretive practice. NumberTeller provides calculation tools only. The Platform does not provide life, legal, medical, financial, or psychological advice. Practitioners are solely responsible for the advice they give to clients based on these tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Docully SaaS Technologies Co. LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of or inability to use the Platform.
              </p>
              <p>
                In no event shall our total liability to you exceed the total amount paid by you to us in the twelve (12) months preceding the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Account Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any other reason at our sole discretion. You may also close your account at any time by contacting our support team.
              </p>
              <p>
                Upon termination, your right to access the Platform ceases immediately. Saved chart data will be retained for 30 days before permanent deletion, unless you request immediate deletion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Modifications to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify registered users of material changes by email. Continued use of the Platform after changes take effect constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, specifically the laws applicable in the Emirate of Dubai. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Contact</h2>
              <p>
                For questions about these Terms, contact us at:
              </p>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-5 mt-3">
                <p className="font-semibold text-white">Docully SaaS Technologies Co. LLC</p>
                <p>Dubai, United Arab Emirates</p>
                <p>Phone / WhatsApp: <a href="tel:+971565043131" className="text-blue-400 hover:text-blue-300">+971 56 504 3131</a></p>
                <p>Email: <a href="mailto:legal@numberteller.com" className="text-blue-400 hover:text-blue-300">legal@numberteller.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
