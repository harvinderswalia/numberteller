import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

interface MarkdownContentProps {
  content: string;
}

function isInternal(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 mt-10">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mb-4 mt-10">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mb-3 mt-8">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-slate-200 mb-2 mt-6">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="text-slate-200">{children}</em>,
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            if (isInternal(href)) {
              return (
                <Link to={href} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500/40 bg-slate-800/40 rounded-r-lg pl-5 pr-4 py-3 my-6 text-gray-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800 border-b border-white/10">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left px-4 py-3 font-semibold text-white border border-white/10">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-gray-300 border border-white/10">{children}</td>
          ),
          hr: () => <hr className="border-white/10 my-8" />,
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="bg-slate-950 border border-white/10 rounded-xl p-4 overflow-x-auto my-4">
                  <code className="text-sm text-cyan-300">{children}</code>
                </pre>
              );
            }
            return (
              <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm">{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
