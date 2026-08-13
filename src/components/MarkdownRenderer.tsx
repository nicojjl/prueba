import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

// Module-level static plugin arrays to avoid re-instantiation
const REMARK_PLUGINS = [remarkGfm, remarkMath];
const REHYPE_PLUGINS = [rehypeKatex];

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

// Static custom Markdown UI components
const defaultComponents = {
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
    <ul className="list-disc list-outside space-y-2 my-3 pl-5 text-sm text-[#33312E] leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-outside space-y-2 my-3 pl-5 text-sm text-[#33312E] leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed pl-1 mb-1">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-[#C2410C] bg-[#FFF7ED] p-3.5 rounded-r-xl my-4 text-sm text-[#1A1A1A] italic">
      {children}
    </blockquote>
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const codeString = Array.isArray(children) ? children.join('') : String(children || '');
    const match = /language-(\w+)/.exec(className || '');
    const isInline = inline === true || node?.inline === true || (!match && !codeString.includes('\n'));

    if (isInline) {
      return (
        <code
          className="bg-[#1A1A1A] text-[#FDBA74] font-mono text-[0.85em] font-semibold px-2 py-0.5 rounded border border-stone-800 inline-block my-0.5 mx-0.5 align-baseline"
          {...props}
        >
          {codeString}
        </code>
      );
    }
    return (
      <div className="my-3">
        <CSyntaxHighlighter code={codeString.replace(/\n$/, '')} language={match ? match[1] : 'c'} />
      </div>
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

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(({
  content,
  className = '',
  inline = false,
}) => {
  const processed = useMemo(() => preprocessMarkdown(content), [content]);

  if (inline) {
    return (
      <span className={`markdown-body inline ${className}`}>
        <ReactMarkdown
          remarkPlugins={REMARK_PLUGINS}
          rehypePlugins={REHYPE_PLUGINS}
          components={defaultComponents}
        >
          {processed}
        </ReactMarkdown>
      </span>
    );
  }

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={REMARK_PLUGINS}
        rehypePlugins={REHYPE_PLUGINS}
        components={defaultComponents}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

