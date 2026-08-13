/**
 * Utility for exporting course summaries, theoretical lessons, and CLRS pseudocode
 * to Markdown (.md) or printable PDF (.pdf) documents for exam review.
 */

export interface SummaryExportPayload {
  title: string;
  categoryOrCourse: string;
  cormenRef?: string;
  topicSummary?: string;
  theoryContent?: string;
  pseudocodeCLRS?: string;
  codeExampleC?: string;
  complexity?: {
    timeBest?: string;
    timeAverage?: string;
    timeWorst?: string;
    spaceWorst?: string;
  };
  keyTakeaways?: string[];
  analogies?: Array<{
    title: string;
    concept: string;
    analogy: string;
    whyItWorks: string;
  }>;
  checkQuestions?: Array<{
    question: string;
    options: string[];
    explanation: string;
  }>;
}

/**
 * Clean up HTML/Markdown formatting tags if raw text is needed
 */
function cleanMarkdownForText(md: string): string {
  if (!md) return '';
  return md.replace(/<[^>]*>/g, '').trim();
}

/**
 * Syntax highlighter for C and Pseudocode in HTML PDF output
 */
export function highlightCCode(code: string): string {
  if (!code) return '';

  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const strings: string[] = [];
  const comments: string[] = [];

  // Protect strings
  escaped = escaped.replace(/(".*?"|'.*?')/g, (match) => {
    const idx = strings.length;
    strings.push(`<span class="token-string">${match}</span>`);
    return `___STR_${idx}___`;
  });

  // Protect comments
  escaped = escaped.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
    const idx = comments.length;
    comments.push(`<span class="token-comment">${match}</span>`);
    return `___COM_${idx}___`;
  });

  // Preprocessor directives (#include, #define, etc.)
  escaped = escaped.replace(/(#\s*(?:include|define|ifdef|ifndef|endif|pragma))\s*(&lt;.*?&gt;|".*?"|[^\s]+)?/g, (match, dir, file) => {
    return `<span class="token-directive">${dir}</span>${file ? ` <span class="token-header">${file}</span>` : ''}`;
  });

  // Keywords
  const keywords = [
    'void', 'int', 'char', 'float', 'double', 'long', 'short', 'unsigned', 'signed', 'bool',
    'if', 'else', 'for', 'while', 'do', 'return', 'switch', 'case', 'default', 'break', 'continue',
    'struct', 'typedef', 'enum', 'NULL', 'sizeof', 'true', 'false', 'const', 'static', 'extern'
  ];
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  escaped = escaped.replace(kwRegex, '<span class="token-keyword">$1</span>');

  // Numbers
  escaped = escaped.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>');

  // Functions (word followed by '(')
  escaped = escaped.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="token-function">$1</span>');

  // Restore comments and strings
  comments.forEach((c, idx) => {
    escaped = escaped.replace(`___COM_${idx}___`, c);
  });
  strings.forEach((s, idx) => {
    escaped = escaped.replace(`___STR_${idx}___`, s);
  });

  return escaped;
}

/**
 * Parses Markdown strings into rich, beautifully formatted HTML for PDF printing.
 */
export function renderMarkdownToHTML(mdText: string): string {
  if (!mdText) return '';

  let html = mdText;

  // Code blocks ```c ... ``` or ```clrs ... ```
  html = html.replace(/```(?:c|clrs|cpp|c99)?\n([\s\S]*?)\n```/gi, (_, code) => {
    return `<pre class="code-block">${highlightCCode(code.trim())}</pre>`;
  });

  // Math $...$ or $$...$$
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$1</div>');
  html = html.replace(/\$([^\$\n]+)\$/g, '<span class="math-inline">$1</span>');

  // Headers
  html = html.replace(/^#### (.*$)/gim, '<h4 class="md-h4">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>');

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="md-quote">$1</blockquote>');

  // Process list lines
  html = html.replace(/^(\d+)\.\s+(.*$)/gim, '<li class="ol-item"><span class="ol-num">$1.</span> $2</li>');
  html = html.replace(/^[\-\*]\s+(.*$)/gim, '<li class="ul-item">$1</li>');

  // Wrap contiguous <li> elements into <ol> or <ul>
  html = html.replace(/(<li class="ol-item">[\s\S]*?<\/li>\n?)+/g, (match) => `<ol class="md-ol">${match}</ol>`);
  html = html.replace(/(<li class="ul-item">[\s\S]*?<\/li>\n?)+/g, (match) => `<ul class="md-ul">${match}</ul>`);

  // Split by double newlines or single newlines for paragraphs
  const blocks = html.split(/\n\n+/);
  const formattedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<div')
    ) {
      return trimmed;
    }
    const para = trimmed.replace(/\n/g, '<br/>');
    return `<p class="md-p">${para}</p>`;
  });

  return formattedBlocks.join('\n');
}

/**
 * Generate structured Markdown text from summary payload
 */
export function generateMarkdownSummary(payload: SummaryExportPayload): string {
  const dateStr = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let md = `# 📚 Ficha de Repaso: ${payload.title}\n`;
  md += `**Categoría / Curso:** ${payload.categoryOrCourse}\n`;
  if (payload.cormenRef) {
    md += `**Referencia Cormen (CLRS):** ${payload.cormenRef}\n`;
  }
  md += `**Fecha de Exportación:** ${dateStr}\n\n`;
  md += `---\n\n`;

  if (payload.topicSummary) {
    md += `## 📌 Resumen Conceptual\n`;
    md += `${payload.topicSummary}\n\n`;
  }

  if (payload.theoryContent) {
    md += `## 📖 Desarrollo Teórico\n\n`;
    md += `${payload.theoryContent}\n\n`;
  }

  if (payload.pseudocodeCLRS) {
    md += `## ⚡ Pseudocódigo Estándar Cormen (CLRS)\n\n`;
    md += `\`\`\`clrs\n${payload.pseudocodeCLRS.trim()}\n\`\`\`\n\n`;
  }

  if (payload.codeExampleC) {
    md += `## 💻 Código de Referencia en C (ANSI / C99)\n\n`;
    md += `\`\`\`c\n${payload.codeExampleC.trim()}\n\`\`\`\n\n`;
  }

  if (payload.complexity) {
    md += `## 📊 Análisis Asintótico de Complejidad (Big-O)\n\n`;
    md += `| Caso / Métrica | Complejidad |\n`;
    md += `| :--- | :--- |\n`;
    if (payload.complexity.timeBest) md += `| **Mejor Caso Temporal** | \`${payload.complexity.timeBest}\` |\n`;
    if (payload.complexity.timeAverage) md += `| **Caso Promedio Temporal** | \`${payload.complexity.timeAverage}\` |\n`;
    if (payload.complexity.timeWorst) md += `| **Peor Caso Temporal** | \`${payload.complexity.timeWorst}\` |\n`;
    if (payload.complexity.spaceWorst) md += `| **Espacio Memoria (Auxiliar)** | \`${payload.complexity.spaceWorst}\` |\n`;
    md += `\n`;
  }

  if (payload.keyTakeaways && payload.keyTakeaways.length > 0) {
    md += `## 🎯 Puntos Clave para Examen\n`;
    payload.keyTakeaways.forEach((point) => {
      md += `- ${point}\n`;
    });
    md += `\n`;
  }

  if (payload.analogies && payload.analogies.length > 0) {
    md += `## 💡 Analogías del Mundo Real para Memorizar\n\n`;
    payload.analogies.forEach((a, i) => {
      md += `### ${i + 1}. ${a.title}\n`;
      md += `**Concepto Teórico:** ${a.concept}\n\n`;
      md += `**Analogía:** ${a.analogy}\n\n`;
      md += `**¿Por qué funciona?:** ${a.whyItWorks}\n\n`;
    });
  }

  if (payload.checkQuestions && payload.checkQuestions.length > 0) {
    md += `## ❓ Preguntas de Autoevaluación & Repaso\n\n`;
    payload.checkQuestions.forEach((q, i) => {
      md += `### Pregunta ${i + 1}: ${cleanMarkdownForText(q.question)}\n`;
      q.options.forEach((opt, optIdx) => {
        md += `- [ ] ${cleanMarkdownForText(opt)}\n`;
      });
      md += `\n> **Explicación:** ${cleanMarkdownForText(q.explanation)}\n\n`;
    });
  }

  md += `---\n*Generado automáticamente por la Plataforma de Algoritmos y C - Cormen (CLRS) Edition.*`;
  return md;
}

/**
 * Triggers file download for Markdown summary
 */
export function downloadMarkdownSummary(payload: SummaryExportPayload): void {
  const mdContent = generateMarkdownSummary(payload);
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sanitizedTitle = payload.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  link.href = url;
  link.setAttribute('download', `Ficha_${sanitizedTitle || 'resumen'}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Prepares a clean, high-contrast HTML print document and triggers print (PDF download)
 */
export function exportSummaryToPDF(payload: SummaryExportPayload): void {
  const dateStr = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor permite ventanas emergentes (popups) para generar y exportar la ficha PDF.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ficha de Repaso - ${payload.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4;
      margin: 16mm 16mm 18mm 16mm;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #1A1A1A;
      background-color: #FFFFFF;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
      font-size: 13px;
    }

    .header-banner {
      border-bottom: 2px solid #1A1A1A;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-title {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      font-weight: 700;
      color: #1A1A1A;
      margin: 0 0 4px 0;
    }

    .header-subtitle {
      font-size: 11px;
      color: #C2410C;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .header-meta {
      text-align: right;
      font-size: 10px;
      color: #666;
      font-family: 'JetBrains Mono', monospace;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 16px;
      font-weight: 700;
      color: #C2410C;
      border-bottom: 1.5px solid #FDBA74;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    .summary-box {
      background-color: #FFF7ED;
      border: 1px solid #FDBA74;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 18px;
      font-size: 13px;
    }

    pre.code-block {
      background-color: #181825;
      color: #CDD6F4;
      padding: 16px;
      border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-all;
      border: 1px solid #313244;
      margin: 12px 0 18px 0;
      page-break-inside: avoid;
    }

    .token-keyword { color: #C678DD; font-weight: bold; }
    .token-directive { color: #E06C75; font-weight: bold; }
    .token-header { color: #98C379; }
    .token-string { color: #98C379; }
    .token-number { color: #D19A66; }
    .token-function { color: #61AFEF; font-weight: 600; }
    .token-comment { color: #7F848E; font-style: italic; }

    code.inline-code, code {
      font-family: 'JetBrains Mono', monospace;
      background: #F4F1EA;
      color: #C2410C;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11.5px;
      border: 1px solid #E5E2DE;
      font-weight: 600;
    }

    .math-inline {
      font-family: 'JetBrains Mono', monospace;
      font-style: italic;
      background: #FFF7ED;
      color: #9A3412;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11.5px;
      border: 1px solid #FDBA74;
      font-weight: 700;
    }

    .md-h1 { font-family: 'Cinzel', serif; font-size: 20px; color: #1A1A1A; margin: 18px 0 8px 0; border-bottom: 2px solid #C2410C; padding-bottom: 4px; }
    .md-h2 { font-family: 'Cinzel', serif; font-size: 17px; color: #1A1A1A; margin: 16px 0 8px 0; border-bottom: 1px solid #E5E2DE; padding-bottom: 2px; }
    .md-h3 { font-family: 'Cinzel', serif; font-size: 15px; color: #C2410C; margin: 14px 0 6px 0; font-weight: 700; }
    .md-h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #1A1A1A; margin: 10px 0 4px 0; font-weight: 700; }

    .md-p { margin: 6px 0; line-height: 1.65; color: #2D2B28; }
    .md-ol, .md-ul { margin: 8px 0 12px 18px; padding-left: 10px; }
    .md-ol li, .md-ul li { margin-bottom: 6px; line-height: 1.55; color: #2D2B28; }
    .ol-num { font-weight: 700; color: #C2410C; margin-right: 4px; }

    .md-quote {
      border-left: 3px solid #C2410C;
      background: #FFF7ED;
      padding: 8px 14px;
      margin: 10px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #4A4742;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #E5E2DE;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: #F9F8F6;
      font-weight: 700;
    }

    .question-card {
      border: 1px solid #E5E2DE;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 12px;
      background-color: #F9F8F6;
      page-break-inside: avoid;
    }

    .question-title {
      font-weight: 700;
      color: #1A1A1A;
      margin-bottom: 6px;
    }

    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px dashed #E5E2DE;
      text-align: center;
      font-size: 10px;
      color: #888;
      font-family: 'JetBrains Mono', monospace;
    }

    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="position: sticky; top: 0; background: #1A1A1A; color: white; padding: 12px; text-align: center; margin: -20px -20px 20px -20px; font-family: sans-serif; font-size: 13px; z-index: 999;">
    <span>📄 <strong>Vista Previa de Ficha de Repaso PDF</strong></span> — 
    <button onclick="window.print()" style="background: #C2410C; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-left: 10px;">
      🖨️ Imprimir / Guardar como PDF
    </button>
  </div>

  <div class="header-banner">
    <div>
      <div class="header-subtitle">${payload.categoryOrCourse} • ${payload.cormenRef || 'CLRS Edition'}</div>
      <h1 class="header-title">${payload.title}</h1>
    </div>
    <div class="header-meta">
      <div>Fecha: ${dateStr}</div>
      <div>Plataforma de C &amp; Algoritmos</div>
    </div>
  </div>

  ${payload.topicSummary ? `
    <div class="summary-box">
      <strong>📌 Resumen Ejecutivo:</strong>
      <div style="margin-top: 4px;">${renderMarkdownToHTML(payload.topicSummary)}</div>
    </div>
  ` : ''}

  ${payload.complexity ? `
    <h2 class="section-title">📊 Análisis Asintótico (Big-O)</h2>
    <table>
      <thead>
        <tr>
          <th>Métrica de Rendimiento</th>
          <th>Complejidad Notacional</th>
        </tr>
      </thead>
      <tbody>
        ${payload.complexity.timeBest ? `<tr><td><strong>Mejor Caso Temporal</strong></td><td><code>${payload.complexity.timeBest}</code></td></tr>` : ''}
        ${payload.complexity.timeAverage ? `<tr><td><strong>Caso Promedio Temporal</strong></td><td><code>${payload.complexity.timeAverage}</code></td></tr>` : ''}
        ${payload.complexity.timeWorst ? `<tr><td><strong>Peor Caso Temporal</strong></td><td><code>${payload.complexity.timeWorst}</code></td></tr>` : ''}
        ${payload.complexity.spaceWorst ? `<tr><td><strong>Espacio en Memoria Auxiliar</strong></td><td><code>${payload.complexity.spaceWorst}</code></td></tr>` : ''}
      </tbody>
    </table>
  ` : ''}

  ${payload.pseudocodeCLRS ? `
    <h2 class="section-title">⚡ Pseudocódigo Estándar Cormen (CLRS)</h2>
    <pre class="code-block">${highlightCCode(payload.pseudocodeCLRS.trim())}</pre>
  ` : ''}

  ${payload.codeExampleC ? `
    <h2 class="section-title">💻 Implementación en C (ANSI / C99)</h2>
    <pre class="code-block">${highlightCCode(payload.codeExampleC.trim())}</pre>
  ` : ''}

  ${payload.theoryContent ? `
    <h2 class="section-title">📖 Desarrollo Teórico &amp; Conceptos</h2>
    <div class="theory-body">${renderMarkdownToHTML(payload.theoryContent)}</div>
  ` : ''}

  ${payload.analogies && payload.analogies.length > 0 ? `
    <h2 class="section-title">💡 Analogías del Mundo Real</h2>
    ${payload.analogies.map(a => `
      <div class="question-card">
        <div style="font-weight: bold; color: #C2410C; font-size: 14px;">${a.title}</div>
        <div style="margin-top: 4px;"><strong>Analogía:</strong> ${renderMarkdownToHTML(a.analogy)}</div>
        <div style="margin-top: 4px; font-size: 11.5px; color: #555;"><strong>Fundamento:</strong> ${renderMarkdownToHTML(a.whyItWorks)}</div>
      </div>
    `).join('')}
  ` : ''}

  ${payload.checkQuestions && payload.checkQuestions.length > 0 ? `
    <h2 class="section-title">❓ Cuestionario de Autoevaluación</h2>
    ${payload.checkQuestions.map((q, i) => `
      <div class="question-card">
        <div class="question-title">Pregunta ${i + 1}: ${renderMarkdownToHTML(q.question)}</div>
        <ul style="margin: 4px 0; padding-left: 18px;">
          ${q.options.map(opt => `<li>${renderMarkdownToHTML(opt)}</li>`).join('')}
        </ul>
        <div style="font-size: 11px; color: #166534; margin-top: 6px; font-style: italic;">
          ✓ Explicación: ${renderMarkdownToHTML(q.explanation)}
        </div>
      </div>
    `).join('')}
  ` : ''}

  <div class="footer">
    — Documento de Repaso para Pruebas y Exámenes • Algorítmica &amp; Lenguaje C (Cormen Edition) —
  </div>
</body>
</html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Export a Certamen and its Pauta de Soluciones to PDF
 */
export function exportCertamenPDF(certamen: {
  title: string;
  course: string;
  university: string;
  semester: string;
  date: string;
  professor: string;
  duration?: string;
  summary: string;
  topics: string[];
  questions: Array<{
    number: string;
    points: number;
    title: string;
    description: string;
    codeSnippet?: string;
    solutionExplanation?: string;
    solutionCode?: string;
  }>;
}): void {
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${certamen.title} - ${certamen.course}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4;
      margin: 16mm 16mm 18mm 16mm;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1A1A1A;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
      font-size: 12.5px;
      line-height: 1.5;
    }

    .header-table {
      width: 100%;
      border-bottom: 2px solid #C2410C;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }

    .header-univ {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #C2410C;
      font-weight: 700;
    }

    .header-title {
      font-family: 'Cinzel', serif;
      font-size: 22px;
      font-weight: 700;
      color: #1A1A1A;
      margin: 4px 0;
    }

    .header-meta {
      font-size: 11.5px;
      color: #4A4742;
    }

    .meta-tag {
      display: inline-block;
      background: #FFF7ED;
      color: #C2410C;
      border: 1px solid #FDBA74;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 10.5px;
      font-weight: 700;
      margin-right: 4px;
      margin-bottom: 4px;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 15px;
      font-weight: 700;
      color: #C2410C;
      border-bottom: 1.5px solid #FDBA74;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 12px;
    }

    .q-card {
      border: 1.5px solid #E5E2DE;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 18px;
      background: #FAFAFA;
      page-break-inside: avoid;
    }

    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #E5E2DE;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }

    .q-num {
      font-weight: 800;
      color: #C2410C;
      font-size: 14px;
    }

    .q-pts {
      background: #1A1A1A;
      color: #FDBA74;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
    }

    .q-title {
      font-size: 14px;
      font-weight: 700;
      color: #1A1A1A;
      margin-bottom: 8px;
    }

    .pauta-box {
      background-color: #FFF7ED;
      border: 1px solid #FDBA74;
      border-radius: 6px;
      padding: 12px 14px;
      margin-top: 10px;
      font-size: 12px;
    }

    .pauta-box strong {
      color: #9A3412;
    }

    pre.code-block {
      background-color: #181825;
      color: #CDD6F4;
      padding: 14px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      line-height: 1.55;
      white-space: pre-wrap;
      word-break: break-all;
      border: 1px solid #313244;
      margin: 10px 0;
      page-break-inside: avoid;
    }

    .token-keyword { color: #C678DD; font-weight: bold; }
    .token-directive { color: #E06C75; font-weight: bold; }
    .token-header { color: #98C379; }
    .token-string { color: #98C379; }
    .token-number { color: #D19A66; }
    .token-function { color: #61AFEF; font-weight: 600; }
    .token-comment { color: #7F848E; font-style: italic; }

    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 10px;
      color: #888888;
      border-top: 1px solid #E5E2DE;
      padding-top: 10px;
    }

    @media print {
      .no-print { display: none !important; }
      body { padding: 0; background: white; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="position: sticky; top: 0; background: #1A1A1A; color: white; padding: 12px; text-align: center; margin: -16mm -16mm 16mm -16mm; font-family: sans-serif; font-size: 13px; z-index: 999;">
    <span>📄 <strong>Pauta Oficial de Certamen</strong></span> — 
    <button onclick="window.print()" style="background: #C2410C; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-left: 10px;">
      🖨️ Imprimir / Guardar como PDF
    </button>
  </div>

  <table class="header-table">
    <tr>
      <td>
        <div class="header-univ">${certamen.university}</div>
        <div class="header-title">${certamen.title}</div>
        <div class="header-meta">
          <strong>Asignatura:</strong> ${certamen.course} | <strong>Fecha:</strong> ${certamen.date} | <strong>Profesor:</strong> ${certamen.professor}
          ${certamen.duration ? ` | <strong>Tiempo:</strong> ${certamen.duration}` : ''}
        </div>
        <div style="margin-top: 8px;">
          ${certamen.topics.map(t => `<span class="meta-tag">${t}</span>`).join('')}
        </div>
      </td>
    </tr>
  </table>

  <div style="background: #FAFAFA; border: 1px solid #E5E2DE; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
    <strong>📌 Resumen de la Evaluación:</strong> ${certamen.summary}
  </div>

  <h2 class="section-title">📝 Enunciados y Pauta de Soluciones Oficiales</h2>

  ${certamen.questions.map(q => `
    <div class="q-card">
      <div class="q-header">
        <span class="q-num">${q.number}: ${q.title}</span>
        <span class="q-pts">${q.points} Puntos</span>
      </div>

      <div style="margin-bottom: 10px; color: #333;">
        ${renderMarkdownToHTML(q.description)}
      </div>

      ${q.codeSnippet ? `
        <div style="font-size: 11px; font-weight: bold; color: #4A4742; margin-top: 8px;">Fragmento / Código Base:</div>
        <pre class="code-block">${highlightCCode(q.codeSnippet.trim())}</pre>
      ` : ''}

      ${q.solutionExplanation ? `
        <div class="pauta-box">
          <strong>✓ Pauta &amp; Explicación de Corrección:</strong>
          <div style="margin-top: 4px;">${renderMarkdownToHTML(q.solutionExplanation)}</div>
        </div>
      ` : ''}

      ${q.solutionCode ? `
        <div style="font-size: 11px; font-weight: bold; color: #166534; margin-top: 10px;">💻 Solución Oficial C99:</div>
        <pre class="code-block">${highlightCCode(q.solutionCode.trim())}</pre>
      ` : ''}
    </div>
  `).join('')}

  <div class="footer">
    — Certamen Oficial • Estructura de Datos y Algoritmos (USM / ELO320) —
  </div>
</body>
</html>
  `;

  // First try opening a new printable window
  try {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try {
          printWindow.print();
        } catch (e) {
          console.warn('Direct print call failed, window remains open for user printing:', e);
        }
      }, 500);
      return;
    }
  } catch (err) {
    console.warn('Popup window blocked, trying hidden iframe print fallback:', err);
  }

  // Fallback: create a temporary hidden iframe to trigger the print dialog
  try {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.opacity = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
      iframe.contentWindow?.focus();
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }, 3000);
      }, 500);
    }
  } catch (fallbackErr) {
    console.error('Print iframe fallback failed:', fallbackErr);
  }
}

