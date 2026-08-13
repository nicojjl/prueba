import React, { useMemo } from 'react';

interface CSyntaxHighlighterProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

// Pre-compiled token regexes at module scope for maximum performance
const COMMENT_REGEX = /^(\/\/.*|\/\*[\s\S]*?\*\/)/;
const STRING_REGEX = /^(".*?"|'.*?')/;
const DIRECTIVE_REGEX = /^(#include\s*<[^>]+>|#include\s*"[^"]+"|#define\s+[A-Za-z0-9_]+|#pragma\s+[A-Za-z0-9_]+)/;
const KEYWORD_REGEX = /^\b(if|else|for|while|do|return|switch|case|break|continue|struct|typedef|const|static|volatile|sizeof|enum|union)\b/;
const TYPE_REGEX = /^\b(int|float|double|char|void|long|short|bool|size_t|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|FILE|NULL|true|false)\b/;
const FN_NAME_REGEX = /^\b([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()/;
const NUMBER_REGEX = /^\b(\d+(\.\d+)?|0x[0-9a-fA-F]+)\b/;
const OP_REGEX = /^([+\-*/%=<>!&|^~]+|->|\.)/;
const IDENTIFIER_REGEX = /^[A-Za-z_][A-Za-z0-9_]*/;

const STD_FUNCTIONS = new Set([
  'printf', 'scanf', 'malloc', 'free', 'realloc', 'calloc',
  'strcpy', 'strlen', 'strcmp', 'pow', 'sqrt', 'abs'
]);

const highlightLine = (line: string): React.ReactNode[] => {
  // 1. Full line comments //
  if (line.trim().startsWith('//')) {
    return [<span key={0} className="text-[#6C7086] italic">{line}</span>];
  }

  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // Check comment
    const commentMatch = remaining.match(COMMENT_REGEX);
    if (commentMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#6C7086] italic">
          {commentMatch[0]}
        </span>
      );
      remaining = remaining.slice(commentMatch[0].length);
      continue;
    }

    // Check string
    const stringMatch = remaining.match(STRING_REGEX);
    if (stringMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#A6E3A1] font-semibold">
          {stringMatch[0]}
        </span>
      );
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    // Check directive (#include <stdio.h>)
    const dirMatch = remaining.match(DIRECTIVE_REGEX);
    if (dirMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#89B4FA] font-bold">
          {dirMatch[0]}
        </span>
      );
      remaining = remaining.slice(dirMatch[0].length);
      continue;
    }

    // Check Keyword
    const kwMatch = remaining.match(KEYWORD_REGEX);
    if (kwMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#CBA6F7] font-bold">
          {kwMatch[0]}
        </span>
      );
      remaining = remaining.slice(kwMatch[0].length);
      continue;
    }

    // Check Type
    const typeMatch = remaining.match(TYPE_REGEX);
    if (typeMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#F38BA8] font-bold">
          {typeMatch[0]}
        </span>
      );
      remaining = remaining.slice(typeMatch[0].length);
      continue;
    }

    // Check Function call/def
    const fnMatch = remaining.match(FN_NAME_REGEX);
    if (fnMatch) {
      const isStd = STD_FUNCTIONS.has(fnMatch[1]);
      tokens.push(
        <span
          key={keyIdx++}
          className={isStd ? 'text-[#89DCEB] font-bold' : 'text-[#F9E2AF] font-bold'}
        >
          {fnMatch[1]}
        </span>
      );
      remaining = remaining.slice(fnMatch[1].length);
      continue;
    }

    // Check Number
    const numMatch = remaining.match(NUMBER_REGEX);
    if (numMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#FAB387] font-mono">
          {numMatch[0]}
        </span>
      );
      remaining = remaining.slice(numMatch[0].length);
      continue;
    }

    // Check Operator / Arrow
    const opMatch = remaining.match(OP_REGEX);
    if (opMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#F5E0DC] font-bold">
          {opMatch[0]}
        </span>
      );
      remaining = remaining.slice(opMatch[0].length);
      continue;
    }

    // Regular identifier or whitespace
    const idMatch = remaining.match(IDENTIFIER_REGEX);
    if (idMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[#CDD6F4]">
          {idMatch[0]}
        </span>
      );
      remaining = remaining.slice(idMatch[0].length);
      continue;
    }

    // Single non-matching char (spaces, punctuation)
    tokens.push(
      <span key={keyIdx++} className="text-[#BAC2DE]">
        {remaining[0]}
      </span>
    );
    remaining = remaining.slice(1);
  }

  return tokens;
};

// Tokenize C and standard code for syntax highlighting
export const CSyntaxHighlighter: React.FC<CSyntaxHighlighterProps> = React.memo(({
  code,
  language = 'c',
  className = '',
  showLineNumbers = true,
}) => {
  const lines = useMemo(() => code.trimEnd().split('\n'), [code]);

  return (
    <div className={`bg-[#181825] border border-[#313244] rounded-xl overflow-x-auto shadow-md ${className}`}>
      <table className="w-full text-xs font-mono text-[#CDD6F4] border-collapse">
        <tbody>
          {lines.map((line, idx) => (
            <tr key={idx} className="hover:bg-[#1e1e2e]/60 transition-colors">
              {showLineNumbers && (
                <td className="w-10 select-none text-right pr-4 text-[#585B70] font-mono border-r border-[#313244]/50 py-1 bg-[#11111B]">
                  {idx + 1}
                </td>
              )}
              <td className="pl-4 pr-4 py-1 whitespace-pre leading-relaxed">
                {highlightLine(line)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

CSyntaxHighlighter.displayName = 'CSyntaxHighlighter';

