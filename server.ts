import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Could not initialize Gemini API:', e);
    }
  }

  // AI Tutor Endpoint
  app.post('/api/tutor', async (req, res) => {
    try {
      const { message, currentClass, userCode, history } = req.body;

      const systemPrompt = `Eres un Mentor e Instructor IA experto, extremadamente paciente, cercano y entusiasta en Algorítmica y Complejidad. 
Tu libro base principal es "Introduction to Algorithms" de Cormen, Leiserson, Rivest y Stein (CLRS).

REGLAS DE INTERACCIÓN OBLIGATORIAS:
1. Siempre respondes en ESPAÑOL con un tono amable, pedagógico y motivador.
2. Haces preguntas de comprobación breves para asegurarte de que el estudiante comprende.
3. Si el estudiante dice "no entiendo" o se equivoca: explicas el concepto de OTRA manera diferente (otra analogía cotidiana, paso a paso más lento o un ejemplo más simple). No avances si hay dudas.
4. Corrige errores de inmediato con amabilidad y refuerza los aciertos.
5. Referencia el libro de Cormen cuando sea relevante (ej: "Esto se explica en el Capítulo 2 de Cormen...").
6. Cuando el estudiante demuestre dominar la clase o si escribe "siguiente" cuando la clase haya terminado, felicítalo e indícale la transición a la siguiente clase.
7. Al finalizar la explicación de una clase, di claramente: "Esta clase ha terminado. Cuando estés listo para la siguiente, escribe 'siguiente'."
8. TODO EL CÓDIGO QUE PROPORCIONES DEBE SER ESTRICTAMENTE EN LENGUAJE C (ANSI C / C99). Incluye siempre headers como #include <stdio.h>, #include <stdbool.h>, tipos de datos explícitos (int, double, char*), punteros (*), y estructuras (struct) según aplique. No uses JavaScript ni C++.

Contexto Actual del Estudiante:
- Clase Actual: ${currentClass?.title || 'General'}
- Tema de la clase: ${currentClass?.topic || 'Algorítmica y Complejidad'}
- Capítulo de Cormen: ${currentClass?.cormenChapter || 'CLRS General'}
- Código actual del estudiante en C en la plataforma:
${userCode ? `\`\`\`c\n${userCode}\n\`\`\`` : 'Sin código cargado.'}`;

      if (ai) {
        // Construct conversation contents for Gemini
        const formattedHistory = (history || []).slice(-6).map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        }));

        formattedHistory.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: formattedHistory,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        return res.json({ text: response.text });
      }

      // Fallback AI Mentor logic if process.env.GEMINI_API_KEY is not configured
      let reply = '';
      const msgLower = (message || '').toLowerCase();

      if (msgLower.includes('no entiendo') || msgLower.includes('ayuda')) {
        reply = `¡No te preocupes en absoluto! Vamos a verlo con otra analogía más sencilla:
Imagínate que estás buscando un libro en una biblioteca... 
En la **clase actual (${currentClass?.title || 'Algoritmos'})**, la clave es entender el costo paso a paso. 

¿Qué parte específica del concepto te resulta más confusa? ¡Cuéntame y lo desglosamos en mini-pasos en Lenguaje C!`;
      } else if (msgLower.includes('siguiente')) {
        reply = `¡Excelente trabajo avanzando! 🎉 
Has completado el objetivo de esta sección. Pasemos a la siguiente clase para seguir profundizando en el libro de Cormen con ejemplos en C. ¡Escribe tus dudas cuando gustes!`;
      } else if (msgLower.includes('cormen') || msgLower.includes('libro')) {
        reply = `El libro de Cormen (CLRS - *Introduction to Algorithms*) aborda esto en el **${currentClass?.cormenChapter || 'Capítulo principal'}**. 
Recuerda que adaptamos los algoritmos formalmente a **Lenguaje C** con manejo transparente de memoria, punteros y arreglos.`;
      } else {
        reply = `¡Excelente consulta sobre **${currentClass?.topic || 'Algorítmica'}**! 
En el análisis del libro de Cormen (Capítulo: *${currentClass?.cormenChapter || 'General'}*), abordamos este problema optimizando el tiempo y espacio en memoria mediante **Lenguaje C**.

¿Te gustaría que revisemos un fragmento de código en C o que probemos con un ejemplo numérico concreto?`;
      }

      return res.json({ text: reply });
    } catch (error: any) {
      console.error('Error in tutor API:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
