/**
 * Utility for encoding and decoding shared C/Algorithmic code via URL hash.
 */

export interface SharedCodePayload {
  code: string;
  title?: string;
  exerciseId?: string;
  language?: string;
  timestamp?: number;
}

/**
 * Encodes C code and metadata into a URL-safe Base64 hash string and constructs the full URL.
 */
export function encodeCodeToShareUrl(
  code: string,
  metadata: { title?: string; exerciseId?: string; language?: string } = {}
): string {
  const payload: SharedCodePayload = {
    code,
    title: metadata.title || 'Código C',
    exerciseId: metadata.exerciseId,
    language: metadata.language || 'c',
    timestamp: Date.now(),
  };

  try {
    const jsonStr = JSON.stringify(payload);
    // Encode UTF-8 safely before btoa
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64UrlSafe = btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#share=${base64UrlSafe}`;
  } catch (err) {
    console.error('Error encoding shared code:', err);
    return window.location.href;
  }
}

/**
 * Decodes a share code string (or URL hash) back into the SharedCodePayload.
 */
export function decodeShareCode(shareStr: string): SharedCodePayload | null {
  if (!shareStr) return null;

  // Clean hash prefix if present (#share=... or share=...)
  let cleanStr = shareStr;
  if (cleanStr.includes('#share=')) {
    cleanStr = cleanStr.split('#share=')[1];
  } else if (cleanStr.startsWith('#')) {
    cleanStr = cleanStr.substring(1);
  } else if (cleanStr.includes('share=')) {
    cleanStr = cleanStr.split('share=')[1];
  }

  cleanStr = cleanStr.split('&')[0]; // strip any trailing params

  try {
    let base64 = cleanStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed.code === 'string') {
      return parsed as SharedCodePayload;
    }
    return null;
  } catch (err) {
    console.error('Error decoding shared code:', err);
    return null;
  }
}

/**
 * Helper to generate WhatsApp sharing URL with formatted text.
 */
export function getWhatsAppShareLink(codeUrl: string, title: string = 'Solución C'): string {
  const text = `💻 *Solución de C / Algoritmos compartida*\n` +
    `📖 *Tema:* ${title}\n\n` +
    `🚀 *Abre el enlace para probar y compilar la solución en vivo:*\n${codeUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

/**
 * Helper to generate Markdown text formatted for Discord / Telegram.
 */
export function getDiscordShareText(code: string, codeUrl: string, title: string = 'Solución C'): string {
  return `**💻 Solución Compartida: ${title}**\n` +
    `\`\`\`c\n${code.length > 800 ? code.substring(0, 800) + '\n// ... (código truncado, abre el enlace para ver completo)' : code}\n\`\`\`\n` +
    `🔗 **Probar y compilar solución en vivo:**\n<${codeUrl}>`;
}
