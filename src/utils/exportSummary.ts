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
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4;
      margin: 18mm 18mm 20mm 18mm;
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
      border-bottom: 1px solid #E5E2DE;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    .summary-box {
      background-color: #FFF7ED;
      border: 1px solid #FDBA74;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 12.5px;
    }

    pre {
      background-color: #181825;
      color: #CDD6F4;
      padding: 14px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-all;
      border: 1px solid #313244;
      page-break-inside: avoid;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      background: #F2F1EE;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 11px;
      color: #C2410C;
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
      padding: 12px;
      margin-bottom: 10px;
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
  <div class="no-print" style="position: sticky; top: 0; background: #1A1A1A; color: white; padding: 12px; text-align: center; margin: -20px -20px 20px -20px; font-family: sans-serif; font-size: 13px;">
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
      <strong>📌 Resumen Ejecutivo:</strong> ${payload.topicSummary}
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
    <pre>${payload.pseudocodeCLRS.trim()}</pre>
  ` : ''}

  ${payload.codeExampleC ? `
    <h2 class="section-title">💻 Implementación en C (ANSI / C99)</h2>
    <pre>${payload.codeExampleC.trim()}</pre>
  ` : ''}

  ${payload.theoryContent ? `
    <h2 class="section-title">📖 Desarrollo Teórico &amp; Conceptos</h2>
    <div>${payload.theoryContent.replace(/\n/g, '<br/>')}</div>
  ` : ''}

  ${payload.analogies && payload.analogies.length > 0 ? `
    <h2 class="section-title">💡 Analogías del Mundo Real</h2>
    ${payload.analogies.map(a => `
      <div class="question-card">
        <div style="font-weight: bold; color: #C2410C;">${a.title}</div>
        <div style="margin-top: 4px;"><strong>Analogía:</strong> ${a.analogy}</div>
        <div style="margin-top: 2px; font-size: 11px; color: #555;"><strong>Fundamento:</strong> ${a.whyItWorks}</div>
      </div>
    `).join('')}
  ` : ''}

  ${payload.checkQuestions && payload.checkQuestions.length > 0 ? `
    <h2 class="section-title">❓ Cuestionario de Autoevaluación</h2>
    ${payload.checkQuestions.map((q, i) => `
      <div class="question-card">
        <div class="question-title">Pregunta ${i + 1}: ${cleanMarkdownForText(q.question)}</div>
        <ul style="margin: 4px 0; padding-left: 18px;">
          ${q.options.map(opt => `<li>${cleanMarkdownForText(opt)}</li>`).join('')}
        </ul>
        <div style="font-size: 11px; color: #166534; margin-top: 6px; font-style: italic;">
          ✓ Explicación: ${cleanMarkdownForText(q.explanation)}
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
