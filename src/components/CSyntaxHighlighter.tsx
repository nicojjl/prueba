import React from 'react';

interface CSyntaxHighlighterProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

// Tokenize C and standard code for syntax highlighting
export const CSyntaxHighlighter: React.FC<CSyntaxHighlighterProps> = ({
  code,
  language = 'c',
  className = '',
  showLineNumbers = true,
}) => {
  const lines = code.trimEnd().split('\n');

  const highlightLine = (line: string) => {
    // Escapes and tokenizes strings, comments, directives, keywords, functions, numbers, types

    // 1. Full line comments //
    if (line.trim().startsWith('//')) {
      return <span className="text-[#6C7086] italic">{line}</span>;
    }

    // Process token parts
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    // Pattern matching regexes
    const commentRegex = /^(\/\/.*|\/\*[\s\S]*?\*\/)/;
    const stringRegex = /^(".*?"|'.*?')/;
    const directiveRegex = /^(#include\s*<[^>]+>|#include\s*"[^"]+"|#define\s+[A-Za-z0-9_]+|#pragma\s+[A-Za-z0-9_]+)/;
    const keywordRegex = /^\b(if|else|for|while|do|return|switch|case|break|continue|struct|typedef|const|static|volatile|sizeof|enum|union)\b/;
    const typeRegex = /^\b(int|float|double|char|void|long|short|bool|size_t|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|FILE|NULL|true|false)\b/;
    const fnNameRegex = /^\b([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()/;
    const numberRegex = /^\b(\d+(\.\d+)?|0x[0-9a-fA-F]+)\b/;
    const opRegex = /^([+\-*/%=<>!&|^~]+|->|\.)/;
    const identifierRegex = /^[A-Za-z_][A-Za-z0-9_]*/;

    while (remaining.length > 0) {
      // Check comment
      const commentMatch = remaining.match(commentRegex);
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
      const stringMatch = remaining.match(stringRegex);
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
      const dirMatch = remaining.match(directiveRegex);
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
      const kwMatch = remaining.match(keywordRegex);
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
      const typeMatch = remaining.match(typeRegex);
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
      const fnMatch = remaining.match(fnNameRegex);
      if (fnMatch) {
        const isStd = ['printf', 'scanf', 'malloc', 'free', 'realloc', 'calloc', 'strcpy', 'strlen', 'strcmp', 'pow', 'sqrt', 'abs'].includes(fnMatch[1]);
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
      const numMatch = remaining.match(numberRegex);
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
      const opMatch = remaining.match(opRegex);
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
      const idMatch = remaining.match(identifierRegex);
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
};
