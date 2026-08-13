import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export function preprocessMarkdown(text: string): string {
  if (!text) return '';

  let str = text;

  // Replace control characters from JS unescaped strings
  str = str
    .replace(/\x09ext\{/g, '\\text{')
    .replace(/\x09ext/g, '\\text')
    .replace(/\x0Crac\{/g, '\\frac{')
    .replace(/\x0Crac/g, '\\frac')
    .replace(/\x09imes/g, '\\times')
    .replace(/\x09heta/g, '\\theta')
    .replace(/\x09au/g, '\\tau')
    .replace(/\x08egin/g, '\\begin');

  return str;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  inline = false,
}) => {
  const processed = preprocessMarkdown(content);

  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-6 mb-3 border-b border-[#E5E2DE] pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mt-5 mb-2.5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-serif font-bold text-[#C2410C] mt-4 mb-2 flex items-center gap-2">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xs font-bold text-[#1A1A1A] mt-3 mb-1.5 uppercase tracking-wider">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-sm text-[#33312E] leading-relaxed mb-3">
        {children}
      </p>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[#1A1A1A] bg-[#FFF7ED] px-1 py-0.5 rounded text-[0.95em]">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[#4A4742]">{children}</em>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-1.5 my-3 pl-2 text-sm text-[#33312E] leading-relaxed">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-1.5 my-3 pl-2 text-sm text-[#33312E] leading-relaxed">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#C2410C] bg-[#FFF7ED] p-3.5 rounded-r-xl my-4 text-sm text-[#1A1A1A] italic">
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-[#F2F1EE] text-[#C2410C] font-mono font-semibold px-1.5 py-0.5 rounded text-xs border border-[#E5E2DE]" {...props}>
            {children}
          </code>
        );
      }
      return (
        <pre className="bg-[#181818] text-[#E5E5E5] font-mono text-xs p-4 rounded-xl overflow-x-auto my-3 border border-[#252525] shadow-xs">
          <code {...props}>{children}</code>
        </pre>
      );
    },
    hr: () => <hr className="my-6 border-[#E5E2DE]" />,
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4 border border-[#E5E2DE] rounded-xl">
        <table className="w-full text-left text-xs text-[#33312E] border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="bg-[#F2F1EE] p-2.5 font-bold text-[#1A1A1A] border-b border-[#E5E2DE]">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="p-2.5 border-b border-[#F2F1EE]">{children}</td>
    ),
  };

  if (inline) {
    return (
      <span className={`markdown-body inline ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {processed}
        </ReactMarkdown>
      </span>
    );
  }

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
};
