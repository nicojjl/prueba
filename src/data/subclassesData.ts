import { DeepeningSubclass, PracticeSubclass, CourseItem } from '../types';

export const SUBCLASSES_BY_COURSE_ID: Record<string, { deepening: DeepeningSubclass; practice: PracticeSubclass }> = {
  'clase-1': {
    deepening: {
      title: 'Subclase 1A: Profundización Teórica y Analogías Intuitivas',
      subtitle: 'Entendiendo la eficiencia algorítmica más allá de la sintaxis y las supercomputadoras',
      moreTopicsContent: `
### 1. Más Temas: El Impacto de la Arquitectura del Procesador y la Memoria Cache en C

En la práctica de la ingeniería de software de bajo nivel con **Lenguaje C**, un algoritmo con menor complejidad teórica $O(n)$ puede ser temporalmente más lento que un algoritmo $O(n^2)$ para valores pequeños de $n$ debido a los **factores constantes ocultos** y a la **jerarquía de memoria** (Caché L1, L2, L3).

* **Constantes Ocultas ($c \cdot g(n)$)**: La Notación Big-O ignora coeficientes constantes. Si un algoritmo tarda $1000n$ operaciones y otro tarda $2n^2$, para $n < 500$ el algoritmo cuadrático es más rápido en tiempo real.
* **Locación de Referencia (Cache Locality)**: Los procesadores modernos leen bloques de memoria contiguos. Arreglos contiguos en C (\`int arr[N]\`) aprovechan la caché drásticamente mejor que listas enlazadas dinámicas con punteros dispersos (\`malloc\`).
* **Algoritmos In-Place vs Memoria Auxiliar**: La complejidad espacial ($O(1)$ vs $O(n)$) determina si un algoritmo escrito en C puede ejecutarse en microcontroladores embebidos o servidores con memoria restringida.
      `,
      analogies: [
        {
          title: 'La Analogía de la Receta de Cocina',
          concept: 'Definición de Algoritmo y Entradas/Salidas',
          analogy: 'Un algoritmo es exactamente como una receta de alta cocina: Los ingredientes medidos son la Entrada (Input), las instrucciones paso a paso en orden estricto son el Algoritmo en C, y el platillo servido es la Salida (Output). Si cambias el orden de los pasos, la receta falla.',
          whyItWorks: 'Relaciona la rigidez y secuencia estricta de las instrucciones computacionales con un proceso culinario conocido por todos.'
        },
        {
          title: 'La Analogía del Vehículo vs Avión',
          concept: 'Diferencia entre $O(n^2)$ y $O(n \\log n)$',
          analogy: 'Para viajar 5 kilómetros, ir en bicicleta ($O(n)$) es más rápido que preparar un avión comercial ($O(n \\log n)$) porque despegar lleva tiempo. Pero para viajar 5,000 kilómetros de un continente a otro, el avión destruye por completo a la bicicleta sin importar cuán rápido pedalees.',
          whyItWorks: 'Demuestra visualmente por qué los algoritmos eficientes dominan cuando el tamaño de los datos ($n$) escala a millones.'
        }
      ],
      alternativeExplanation: `
#### Explicado de Otra Forma (Para Principiantes):
Imagina que te piden buscar un nombre en una guía telefónica de 1,000,000 de personas.

1. **Enfoque Lento ($O(n)$)**: Lees página por página desde la primera hasta la última. Podrías hacer hasta 1,000,000 de revisiones.
2. **Enfoque Inteligente ($O(\\log n)$)**: Abres la guía por la mitad. Si la letra que buscas es anterior, descartas la mitad posterior de un solo golpe. Repites dividiendo a la mitad. ¡En solo **20 pasos** habrás encontrado a la persona entre un millón!
      `
    },
    practice: {
      title: 'Subclase 1B: Taller de Práctica, Problema Guía y Cuestionario Intensivo',
      appliedTheory: `
La elección del algoritmo correcto no es un ejercicio puramente académico; en sistemas embebidos, Linux kernel y motores de alto rendimiento escritos en C, optimizar un bucle de $O(n^2)$ a $O(n \\log n)$ reduce la carga de la CPU de 100% a 2% y la latencia percibida por el usuario de 4 segundos a 80 milisegundos.
      `,
      solvedProblem: {
        title: 'Problema Guía Resuelto: Búsqueda del Par Invertido en Lista de Transacciones',
        problemStatement: 'Dado un arreglo de montos de transacciones financieras no ordenadas `[15, -5, 20, 5, -15, 30]`, encuentra si existe un par de transacciones que se anulen exactamente ($A + B = 0$). Plantea la solución ingenua $O(n^2)$ y la solución optimizada $O(n)$ en C.',
        stepByStepSolution: `
**Paso 1: Solución Ingenua $O(n^2)$ en Lenguaje C**
Compara cada elemento con todos los demás mediante dos bucles anidados.
\`\`\`c
#include <stdio.h>
#include <stdbool.h>

bool existeParInversoLento(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      if (arr[i] + arr[j] == 0) return true;
    }
  }
  return false;
}
\`\`\`

**Paso 2: Solución Optimizada $O(n)$ con Frecuencia Directa / Tabla Hash en Lenguaje C**
Usamos un arreglo de presencia para marcar elementos vistos en $O(1)$.
\`\`\`c
#include <stdio.h>
#include <stdbool.h>

bool existeParInversoRapido(int arr[], int n) {
  bool vistos[2000] = {false}; // Mapeo directo de desplazamientos
  for (int i = 0; i < n; i++) {
    int val = arr[i] + 1000;
    int complemento = -arr[i] + 1000;
    if (complemento >= 0 && complemento < 2000 && vistos[complemento]) {
      return true;
    }
    if (val >= 0 && val < 2000) {
      vistos[val] = true;
    }
  }
  return false;
}
\`\`\`
        `,
        keyTakeaway: 'Cambiar de un enfoque iterativo doble $O(n^2)$ a uno respaldado por direccionamiento directo $O(1)$ en memoria C reduce drásticamente el tiempo de ejecución.'
      },
      exercises: [],
      quizQuestions: [
        {
          id: 'q1-sub-1',
          question: '¿Por qué un algoritmo con complejidad $O(n \\log n)$ es preferible a uno $O(n^2)$ para grandes volúmenes de datos?',
          options: [
            'Porque $n \\log n$ usa menos memoria física siempre.',
            'Porque el ritmo de crecimiento de $n \\log n$ es sustancialmente menor que $n^2$ cuando $n$ tiende a infinito.',
            'Porque $n^2$ no se puede programar en C.',
            'Porque $n \\log n$ no requiere ciclos de bucle.'
          ],
          correctIndex: 1,
          explanation: 'A medida que $n$ crece, $n^2$ explota cuadráticamente mientras $n \\log n$ mantiene un crecimiento casi lineal.',
          analogousExplanation: 'Grafica $1000^2 = 1,000,000$ vs $1000 \\times 10 = 10,000$. ¡La diferencia es de 100 veces menos pasos!'
        },
        {
          id: 'q1-sub-2',
          question: '¿Qué representa la constante $c$ en la expresión de tiempo $T(n) = c \\cdot g(n)$ en un programa en C?',
          options: [
            'El número de hilos de la CPU.',
            'Los factores constantes del hardware, flags de gcc y sobrecosto de instrucciones en ensamblador.',
            'El tamaño máximo del arreglo.',
            'La cantidad de variables globales.'
          ],
          correctIndex: 1,
          explanation: 'Las constantes engloban la velocidad del procesador, optimizaciones del compilador C (ej. gcc -O3) y costo de instrucción máquina.',
          analogousExplanation: 'Es como la aceleración base de un automóvil: la Big-O mide el tipo de motor, mientras que la constante es el rozamiento de los neumáticos.'
        }
      ]
    }
  }
};

export function getSubclassesForCourse(item: CourseItem): { deepening: DeepeningSubclass; practice: PracticeSubclass } {
  if (SUBCLASSES_BY_COURSE_ID[item.id]) {
    return SUBCLASSES_BY_COURSE_ID[item.id];
  }

  return {
    deepening: {
      title: `Subclase 1A: Profundización Teórica – ${item.title}`,
      subtitle: `Conceptos avanzados en C y modelos mentales para dominar ${item.topic}`,
      moreTopicsContent: `
### 1. Profundización Teórica Avanzada en C

En este módulo complementario profundizamos en los cimientos de **${item.title}** (${item.cormenChapter}).

* **Invariante de Bucle en C**: Garantiza la corrección formal del algoritmo mediante tres propiedades:
  1. *Inicialización*: Es verdadero antes de la primera iteración.
  2. *Mantenimiento*: Si es verdadero antes de una iteración, se mantiene verdadero antes de la siguiente.
  3. *Terminación*: Al terminar el bucle, la invariante provee una propiedad útil para demostrar que el programa en C es correcto.
* **Gestión de Punteros y Casos de Borde**: Manejo de punteros nulos (\`NULL\`), límites de arreglo y fugas de memoria (\`free\`).
* **Análisis del Peor, Mejor y Caso Promedio**: Comportamiento del algoritmo C según la distribución de datos en RAM.
      `,
      analogies: [
        {
          title: `Analogía Principal de ${item.title}`,
          concept: item.topic,
          analogy: `Piensa en ${item.topic} como la organización estratégica de un almacén logístico: Si organizas los paquetes por casilleros indexados en C, encontrar cualquier caja toma tiempo constante; si los apilas sin orden, debes revisar caja por caja cada vez.`,
          whyItWorks: 'Asocia el comportamiento interno del algoritmo C con una tarea de clasificación espacial tangible.'
        },
        {
          title: 'Analogía del Archivador de Documentos',
          concept: 'Acceso Directo vs Punteros Enlazados',
          analogy: 'Un arreglo en C (\`int arr[N]\`) es un archivador con pestañas numeradas. Una lista enlazada (\`struct Nodo*\`) es un juego de pistas en donde cada papel te indica en qué cajón está el siguiente.',
          whyItWorks: 'Clarifica la diferencia entre direccionamiento indexado $O(1)$ y desreferenciación por punteros $O(n)$.'
        }
      ],
      alternativeExplanation: `
#### Explicación Intuitiva Alternativa:
Si tuvieras que explicarle **${item.topic}** a un colega sin formación matemática:

1. **La Idea Clave**: No buscamos trabajar más duro, sino trabajar de forma estructurada para evitar repetir instrucciones C innecesarias.
2. **El Patrón**: Identificamos la sub-estructura del problema, dividimos en piezas manejables y ensamblamos la solución garantizada.
      `
    },
    practice: {
      title: `Subclase 1B: Taller de Práctica e Intensivo – ${item.title}`,
      appliedTheory: `
Aplicación práctica de **${item.topic}** en sistemas operativos, motores de gráficos y C embebido.
      `,
      solvedProblem: {
        title: `Problema Guía Resuelto: Optimización de Algoritmo en C para ${item.title}`,
        problemStatement: `Dado un conjunto de datos de prueba para ${item.topic}, se requiere diseñar una función en C eficiente que minimice el tiempo de CPU y el uso de memoria RAM.`,
        stepByStepSolution: `
**Paso 1: Análisis del Planteamiento**
Identificamos las entradas principales, tipos de datos en C y restricciones de tiempo.

**Paso 2: Implementación de Referencia en Lenguaje C**
\`\`\`c
#include <stdio.h>

int resolverProblemaGuia(int datos[], int n) {
  int acumulador = 0;
  for (int i = 0; i < n; i++) {
    acumulador += datos[i];
  }
  return acumulador;
}
\`\`\`

**Paso 3: Verificación de Complejidad**
* Tiempo: $O(n)$ – Un solo recorrido lineal sobre la estructura en C.
* Memoria: $O(1)$ – Espacio constante sin asignaciones dinámicas adicionales.
        `,
        keyTakeaway: 'Analizar los tipos de datos y punteros en C antes de codificar ahorra errores de segmentación (Segmentation Fault).'
      },
      exercises: item.exercises || [],
      quizQuestions: item.checkQuestions && item.checkQuestions.length > 0 ? item.checkQuestions : [
        {
          id: `q-fallback-1-${item.id}`,
          question: `En el contexto de ${item.title}, ¿cuál es el objetivo principal de analizar la complejidad en C?`,
          options: [
            'Medir el tamaño del ejecutable compilado por gcc.',
            'Predecir cómo escala el tiempo y la memoria al crecer el volumen de datos de entrada.',
            'Determinar el color del editor de código.',
            'Evitar escribir comentarios en el código C.'
          ],
          correctIndex: 1,
          explanation: 'El análisis de complejidad predice la escalabilidad del sistema sin depender de un hardware particular.',
          analogousExplanation: 'Es como medir el consumo de combustible por cada 100km en lugar de medir el color del auto.'
        }
      ]
    }
  };
}
