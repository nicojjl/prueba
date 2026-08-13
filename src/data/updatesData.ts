export interface AppUpdate {
  id: string;
  version: string;
  date: string;
  title: string;
  badge: string;
  badgeColor: 'orange' | 'green' | 'blue' | 'purple';
  description: string;
  highlights: string[];
  isLatest?: boolean;
}

export const APP_UPDATES: AppUpdate[] = [
  {
    id: 'update-v3.0',
    version: 'v3.0',
    date: '13 de Agosto, 2026',
    title: 'Progressive Web App (PWA) & Modo 100% Offline',
    badge: 'PWA & Mobile',
    badgeColor: 'green',
    isLatest: true,
    description: 'Convierte la plataforma en una aplicación nativa instalable en tu teléfono o computador. Estudia teoría, algoritmos y practica C sin conexión a Internet.',
    highlights: [
      'Instalable en Android, iOS y Desktop: Presiona "Añadir a la pantalla de inicio" para tener acceso directo como app nativa.',
      'Estudio 100% Offline con Service Worker: Toda la teoría, simuladores visuales, quizes y ejercicios de C corren directo en tu navegador sin consumir datos.',
      'Indicador de Estado Offline: Detección inteligente de conectividad con banner de estado y soporte especial para navegadores móviles Safari y Chrome.'
    ]
  },
  {
    id: 'update-v2.9',
    version: 'v2.9',
    date: '13 de Agosto, 2026',
    title: 'Exportador de Resúmenes en PDF y Markdown (.md)',
    badge: 'Estudio & Exámenes',
    badgeColor: 'purple',
    isLatest: false,
    description: 'Descarga fichas de repaso completas con teoría, pseudocódigo Cormen (CLRS), análisis Big-O y preguntas de autoevaluación para estudiar antes de tus pruebas.',
    highlights: [
      'Exportación en Markdown (.md): Genera archivos Markdown limpios estructurados para Obsidian, Notion o VS Code.',
      'Impresión y Guardar como PDF (.pdf): Formateo listo para impresión con membrete oficial CLRS, fuentes serif elegantes y bloques de código legibles.',
      'Filtro de Contenido Personalizable: Escoge si deseas incluir teoría, pseudocódigo C, tablas Big-O, analogías o cuestionarios de autoevaluación.'
    ]
  },
  {
    id: 'update-v2.8',
    version: 'v2.8',
    date: '13 de Agosto, 2026',
    title: 'Compartir Soluciones por Enlace (URL Hash & Share Code)',
    badge: 'Colaboración & IDE',
    badgeColor: 'blue',
    isLatest: false,
    description: 'Genera enlaces directos codificados para enviar soluciones de C y algoritmos a tus compañeros por WhatsApp o Discord.',
    highlights: [
      'Generador de Enlaces Hash Base64: Botón "Compartir" en el playground de código que comprime tu solución C en un enlace único.',
      'Acciones Rápidas para Redes: Un solo clic para enviar por WhatsApp o copiar el bloque Markdown formateado para Discord y Telegram.',
      'Auto-Carga al Abrir Enlace: Al abrir un enlace compartido (#share=...), la plataforma detecta el código y muestra un modal interactivo para cargarlo y compilarlo en vivo.'
    ]
  },
  {
    id: 'update-v2.7',
    version: 'v2.7',
    date: '13 de Agosto, 2026',
    title: 'Puntajes, Logros Compartidos y Ránking de Estudiantes (Leaderboard)',
    badge: 'Gamificación & Social',
    badgeColor: 'orange',
    isLatest: false,
    description: 'Llegó el sistema de gamificación para estudiar en comunidad con tus amigos y compañeros de universidad.',
    highlights: [
      'Sistema de Puntos de Experiencia (XP): Gana XP resolviendo ejercicios de C, completando lecciones de algoritmos y manteniendo tu racha diaria.',
      'Tabla de Clasificación (Leaderboard): Mídete con compañeros de distintas universidades (U. de Chile, UTFSM, PUC, U. de Valparaíso) y filtra por Ránking Global, Mi Universidad o Rachas.',
      'Perfiles de Estudiante Personalizables: Elige tu apodo, universidad y avatar (🧙‍♂️ Hechicero de C, 🐱‍💻 Gato Coder, 🥷 Ninja Asintótico, etc.).',
      'Insignias y Compartición Social: Desbloquea logros (Erudito Cormen, Dominio C, Racha Implacable) y comparte tu ficha de ránking con un solo clic en WhatsApp/Discord.'
    ]
  },
  {
    id: 'update-v2.6',
    version: 'v2.6',
    date: '13 de Agosto, 2026',
    title: 'Optimizaciones de Navegación, Sismología y Datos Personalizados',
    badge: 'Mantenimiento & UX',
    badgeColor: 'purple',
    isLatest: false,
    description: 'Nuevas mejoras en la experiencia de usuario, navegación directa a cursos, telemetría sísmica estricta para Chile y optimizaciones del motor de simulación de algoritmos.',
    highlights: [
      'Navegación Corregida: El botón "Curso Algorítmica (CLRS)" del menú lateral ahora redirige directamente a las lecciones del curso, y se agregó el botón "Volver al Menú Principal".',
      'Telemetría Sísmica Perfeccionada: Filtro geográfico exclusivo para Chile (costas y zona central de Valparaíso) descartando sismos trasandinos, con traducción limpia de direcciones cardinales en español.',
      'Simulación de Datos Personalizados: Estructuras de datos como Pila (Stack) y Cola (Queue) en el visualizador ahora soportan vectores de entrada personalizados ingresados por el usuario.',
      'Refactorización y Rendimiento: Eliminación de código obsoleto en el visor de C, depuración de componentes huérfanos y optimización del backend Express con Gemini AI.'
    ]
  },
  {
    id: 'update-v2.5',
    version: 'v2.5',
    date: '13 de Agosto, 2026',
    title: 'Expansión Completa del Curso C Pro (8 Capítulos K&R)',
    badge: 'Nueva Versión',
    badgeColor: 'orange',
    isLatest: false,
    description: 'Actualización masiva del plan de estudios de C con la cobertura exhaustiva de los 8 capítulos del libro estándar K&R (Kernighan & Ritchie).',
    highlights: [
      '7 Secciones Teóricas completas por capítulo (Motivación K&R, Teoría, Complejidad, Aplicaciones, Gotchas, Glosario y Referencias).',
      'Banco de Ejercicios en 5 niveles progresivos: Conceptual, Aplicación Guiada (Bugs), Implementación, Análisis y Desafío Avanzado Integrador.',
      'Quizes conceptuales interactivos con explicaciones profundas por cada capítulo.',
      'Soporte completo de punteros, estructuras autorreferenciadas, uniones, I/O con FILE* y llamadas al sistema UNIX.'
    ]
  },
  {
    id: 'update-v2.4',
    version: 'v2.4',
    date: '10 de Agosto, 2026',
    title: 'Visualizador Interactivo de 14 Algoritmos Clásicos',
    badge: 'Módulo Algoritmos',
    badgeColor: 'green',
    description: 'Lanzamiento del motor visual paso a paso para algoritmos de ordenamiento, búsqueda, estructuras de datos, programación dinámica y grafos.',
    highlights: [
      'Simulaciones animadas en tiempo real con pseudocódigo CLRS sincronizado.',
      'Editor de código ejecutable integrado con soporte para C, C++ y Python.',
      'Monitoreo de comparaciones, intercambios y complejidad asintótica en tiempo real.'
    ]
  },
  {
    id: 'update-v2.3',
    version: 'v2.3',
    date: '05 de Agosto, 2026',
    title: 'Widgets de Clima y Sismología en Tiempo Real',
    badge: 'Integración API',
    badgeColor: 'blue',
    description: 'Integración de servicios meteorológicos y de actividad sísmica en vivo para la Región de Valparaíso y Chile.',
    highlights: [
      'API meteorológica de Open-Meteo: Estado del clima (soleado, nublado, lluvia) y temperatura exacta en Valparaíso.',
      'API sismológica USGS: Reporte en vivo del último sismo detectado con fecha, hora, magnitud y distancia a Valparaíso.',
      'Actualización periódica automática sin recargar la página.'
    ]
  }
];
