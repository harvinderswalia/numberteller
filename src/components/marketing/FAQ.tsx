import { Head } from 'vite-react-ssg';
import { faqSchema } from '../seo/schema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  heading?: string;
}

export default function FAQ({ items, heading = 'FAQ' }: FAQProps) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
        />
      </Head>
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">{heading}</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-slate-800/60 border border-white/10 rounded-xl overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors">
                {item.question}
                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
