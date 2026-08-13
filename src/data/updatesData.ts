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
    id: 'update-v2.6',
    version: 'v2.6',
    date: '13 de Agosto, 2026',
    title: 'Optimizaciones de Navegación, Sismología y Datos Personalizados',
    badge: 'Mantenimiento & UX',
    badgeColor: 'purple',
    isLatest: true,
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
