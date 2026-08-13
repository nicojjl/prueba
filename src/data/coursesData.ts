import { CourseItem } from '../types';
import { EXERCISES_BY_COURSE } from './exercisesData';

const RAW_COURSES_DATA: CourseItem[] = [
  {
    id: 'clase-1',
    number: 1,
    type: 'class',
    title: 'Clase 1 – Introducción al Curso y Análisis Algorítmico',
    topic: '¿Qué es un algoritmo, por qué importa la complejidad y cómo escala el costo computacional?',
    cormenChapter: 'Capítulo 1: El papel de los algoritmos en la informática (CLRS 4ta Ed., págs. 5–15)',
    durationMinutes: 60,
    summary: 'Comprende la definición formal de algoritmo, la noción de problema computacional, las curvas de crecimiento asintótico O(1) a O(2^n) y la razón por la cual la eficiencia algorítmica supera drásticamente al hardware rápido.',
    theoryContent: `
# Clase 1: Introducción al Curso y Análisis Algorítmico

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

### ¿Por qué la Complejidad Algorítmica es la Piedra Angular de la Informática?
En la era del almacenamiento masivo en la nube, los procesadores multinúcleo a gigahertz y los macrodatos (*Big Data*), existe la falsa creencia de que la potencia bruta del hardware puede compensar el código ineficiente. Nada más alejado de la realidad. Cuando el volumen de datos de entrada $n$ pasa de miles a millones o billones de registros, la **complejidad algorítmica** domina por completo sobre la velocidad de reloj del procesador.

Un algoritmo no es simplemente "un trozo de código que funciona". Un algoritmo es una especificación matemática rigurosa que transforma recursos computacionales finitos (tiempo de CPU y memoria RAM) en soluciones exactas. Un algoritmo ineficiente ejecutado en la supercomputadora más potente del planeta colapsará irremisiblemente ante un algoritmo eficiente ejecutado en una modesta computadora portátil cuando $n$ crece lo suficiente.

### Breve Contexto Histórico
* **1843 – Ada Lovelace**: Escribió el primer algoritmo formal de la historia diseñado para ser procesado por una máquina (la Máquina Analítica de Charles Babbage), destinado a calcular la secuencia de números de Bernoulli.
* **1936 – Alan Turing**: En su célebre artículo sobre los "Números Computables", formalizó la definición de algoritmo mediante el modelo de la *Máquina de Turing*, estableciendo los límites matemáticos de lo que es y no es computable (*Problema de la Parada*).
* **1990 – Cormen, Leiserson, Rivest y Stein (CLRS)**: Publicaron la primera edición de *Introduction to Algorithms*, obra cumbre que estandarizó el análisis asintótico riguroso y la notación Big-O como el lenguaje universal de la ingeniería de software.

### Conexión Conceptual con el Curso
Esta clase es el cimiento de todo el programa de **Algorítmica & Complejidad**. Las técnicas avanzadas que estudiaremos en clases posteriores —desde estructuras de datos lineales y árboles balanceados Red-Black hasta algoritmos de grafos y programación dinámica— responden a una sola búsqueda fundamental: **reducir la curva de complejidad asintótica** para resolver problemas computacionales en escalas masivas.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Definición Formal de Algoritmo y Problema Computacional
Según **Cormen et al. (CLRS, Cap. 1.1)**, informalmente un **algoritmo** es cualquier procedimiento computacional bien definido que toma algún valor o conjunto de valores como **entrada** ($\text{Entrada} = I$) y produce algún valor o conjunto de valores como **salida** ($\text{Salida} = O$), satisfaciendo una relación funcional especificada $O = f(I)$.

Es indispensable distinguir entre dos conceptos frecuentemente confundidos:
1. **Problema Computacional**: La declaración formal y abstracta de la relación deseada entre las entradas permitidas y la salida esperada.
2. **Algoritmo**: La secuencia finita, inequívoca y determinista de pasos computacionales concretos que resuelve dicho problema.

#### Las Tres Propiedades Fundamentales de un Algoritmo Correcto
* **Finitud**: El algoritmo debe detenerse siempre tras un número finito de pasos para cualquier instancia válida de entrada.
* **Definibilidad (No Ambigüedad)**: Cada paso computacional debe estar rigurosamente especificado, sin interpretaciones ambiguas.
* **Correctitud**: Se dice que un algoritmo es *correcto* si, para cada instancia de entrada válida, se detiene y produce exactamente la salida requerida por la especificación del problema.

---

### 2.2 Ejemplo Guiado Paso a Paso: Ordenamiento de Secuencias
Consideremos el problema computacional clásico de **Ordenamiento de una Secuencia de Números**:
* **Entrada**: Una secuencia de $n$ números $\langle a_1, a_2, \dots, a_n \rangle$.
* **Salida**: Una reordenación $\langle a'_1, a'_2, \dots, a'_n \rangle$ tal que $a'_1 \le a'_2 \le \dots \le a'_n$.

Supongamos la secuencia concreta de 6 elementos: $I = \langle 31, 41, 59, 26, 41, 58 \rangle$.

#### Enfoque A: Algoritmo Cuadrático $O(n^2)$ (por ejemplo, Insertion Sort o Bubble Sort)
1. Para colocar $26$ en su lugar correcto, el algoritmo realiza comparaciones e intercambios adyacentes iterativos.
2. Número total de comparaciones e intercambios en el peor caso para $n=6$:
   $$\text{Operaciones} \approx \frac{n(n-1)}{2} = \frac{6 \times 5}{2} = 15 \text{ pasos.}$$
3. Para $n = 1,000,000$ elementos:
   $$\text{Operaciones} \approx \frac{(10^6)^2}{2} = 5 \times 10^{11} = 500,000,000,000 \text{ pasos.}$$

#### Enfoque B: Algoritmo Logarítmico-Lineal $O(n \log_2 n)$ (por ejemplo, Merge Sort / Ordenamiento por Mezcla)
1. Divide la secuencia recursivamente en mitades hasta obtener listas de 1 solo elemento.
2. Fusiona las sublistas ordenadamente aprovechando que ya están ordenadas.
3. Número total de operaciones para $n = 1,000,000$:
   $$\text{Operaciones} \approx n \log_2 n = 10^6 \times \log_2(10^6) \approx 10^6 \times 19.93 \approx 20,000,000 \text{ pasos.}$$

¡El algoritmo $O(n \log n)$ requiere **25,000 veces menos operaciones** para el mismo conjunto de datos!

---

### 2.3 Comparativa de Crecimiento Asintótico en Tiempos Reales
La siguiente tabla ilustra el número de operaciones requeridas por diferentes familias de complejidad según el tamaño de la entrada $n$ (asumiendo 1 microsegundo $1\,\mu\text{s} = 10^{-6}\,\text{s}$ por operación en CPU):

| $n$ (Entrada) | $O(1)$ | $O(\log_2 n)$ | $O(n)$ | $O(n \log_2 n)$ | $O(n^2)$ | $O(2^n)$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$n = 10$** | $1$ ops ($1\,\mu\text{s}$) | $3.3$ ops ($3\,\mu\text{s}$) | $10$ ops ($10\,\mu\text{s}$) | $33$ ops ($33\,\mu\text{s}$) | $100$ ops ($100\,\mu\text{s}$) | $1,024$ ops ($1\,\text{ms}$) |
| **$n = 100$** | $1$ ops ($1\,\mu\text{s}$) | $6.6$ ops ($7\,\mu\text{s}$) | $100$ ops ($100\,\mu\text{s}$) | $664$ ops ($664\,\mu\text{s}$) | $10,000$ ops ($0.01\,\text{s}$) | $1.26 \times 10^{30}$ ops ($4 \times 10^{16}$ años) |
| **$n = 1,000$** | $1$ ops ($1\,\mu\text{s}$) | $9.9$ ops ($10\,\mu\text{s}$) | $1,000$ ops ($1\,\text{ms}$) | $9,965$ ops ($10\,\text{ms}$) | $1,000,000$ ops ($1\,\text{s}$) | **Incalculable** (Supera la edad del universo) |
| **$n = 10,000$** | $1$ ops ($1\,\mu\text{s}$) | $13.2$ ops ($13\,\mu\text{s}$) | $10,000$ ops ($10\,\text{ms}$) | $132,877$ ops ($0.13\,\text{s}$) | $100,000,000$ ops ($1.66\,\text{min}$) | **Imposible** |
| **$n = 1,000,000$**| $1$ ops ($1\,\mu\text{s}$) | $19.9$ ops ($20\,\mu\text{s}$) | $1,000,000$ ops ($1\,\text{s}$) | $19,931,568$ ops ($19.9\,\text{s}$) | $10^{12}$ ops ($11.5\,\text{días}$) | **Imposible** |

---

### 2.4 Errores Comunes de los Estudiantes
1. **Confundir tiempo medido en reloj de pared (\`clock()\`) con complejidad algorítmica**: El tiempo en segundos depende de la carga del SO, lenguaje, compilador y temperatura del CPU. La complejidad mide la tasa de crecimiento del número de instrucciones primitivas en función de $n$.
2. **Creer que el hardware rápido compensa un mal algoritmo**: Como demostró Cormen (Cap. 1.2), si duplicas la velocidad del procesador ejecutando un algoritmo $O(2^n)$, solo podrás procesar 1 elemento adicional ($n+1$) en el mismo tiempo.
3. **Subestimar las constantes para valores pequeños de $n$**: Si $n \le 10$, un algoritmo $O(n^2)$ sencillo (como Insertion Sort) suele ser más rápido que Merge Sort $O(n \log n)$ debido a que Merge Sort requiere overhead de asignación de memoria y llamadas recursivas.
4. **Olvidar los casos límite (Edge Cases)**: Un algoritmo puede ser eficiente para entradas promedio pero colapsar con bucles infinitos o desbordamientos si el arreglo está vacío ($n=0$), ya ordenado o contiene elementos duplicados.

---

### 2.5 Variantes y Casos Especiales
* **Algoritmos Deterministas vs. Probabilistas**: Un algoritmo determinista sigue siempre la misma secuencia de estados para la misma entrada. Un algoritmo probabilista (como QuickSort con pivote aleatorio o Monte Carlo) utiliza números aleatorios para tomar decisiones de ejecución.
* **Algoritmos In-Place (En el Sitio)**: Algoritmos que solo requieren $O(1)$ memoria adicional constante más allá del arreglo de entrada (ejemplo: HeapSort o Insertion Sort), en contraste con algoritmos que requieren $O(n)$ espacio extra (como Merge Sort).

---

## 3. ANÁLISIS DE COMPLEJIDAD DETALLADO

### 3.1 Derivación Paso a Paso de la Comparación de Cormen (CLRS Cap. 1.2)
Imaginemos una competencia entre dos sistemas computacionales ordenando $n = 10,000,000 = 10^7$ elementos:

* **SuperA**: Supercomputadora ejecutando un algoritmo de ordenamiento cuadrático $f(n) = 2n^2$ instrucciones.
  * Capacidad del procesador: $10^{10}$ instrucciones por segundo ($10\,\text{GHz}$).
  * Tiempo total de ejecución $T_A(n)$:
    $$T_A(10^7) = \frac{2 \times (10^7)^2}{10^{10}} = \frac{2 \times 10^{14}}{10^{10}} = 20,000\text{ segundos} \approx 5.55\text{ horas.}$$

* **LentaB**: Computadora personal modesta ejecutando Merge Sort con $g(n) = 50n \log_2 n$ instrucciones.
  * Capacidad del procesador: $10^7$ instrucciones por segundo ($10\,\text{MHz}$ — ¡1,000 veces más lenta que SuperA!).
  * Tiempo total de ejecución $T_B(n)$:
    $$T_B(10^7) = \frac{50 \times 10^7 \times \log_2(10^7)}{10^7} = 50 \times \log_2(10^7) \approx 50 \times 23.2534 \approx 1,162.67\text{ segundos} \approx 19.37\text{ minutos.}$$

**Conclusión Matemática**: La computadora 1,000 veces más lenta aplasta a la supercomputadora por **más de 17 veces de ventaja**, demostrando que el orden de crecimiento de la función de complejidad es la variable crítica dominante.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Planificadores de Consultas en Motores de Bases de Datos (PostgreSQL / MySQL)**:
   Cuando ejecutas \`SELECT * FROM usuarios WHERE email = 'ejemplo@correo.com'\`, el optimizador del motor evalúa la cardinalidad. Si existe un índice B-Tree, ejecuta una búsqueda $O(\log n)$ en lugar de un *Sequential Scan* $O(n)$ sobre 50 millones de filas, reduciendo la respuesta de 12 segundos a 0.4 milisegundos.
2. **Motores de Navegación GPS y Tráfico en Tiempo Real (Google Maps / Waze)**:
   Modelan la red vial como un grafo con millones de aristas y vértices. Usan variantes optimizadas del algoritmo de Dijkstra y A* ($O((E + V) \log V)$) para calcular rutas óptimas en milisegundos.
3. **Sistemas de Comercio Financiero de Alta Frecuencia (HFT)**:
   Las bolsas de valores (NASDAQ, NYSE) procesan millones de órdenes por segundo emparejando ofertas de compra y venta mediante colas de prioridad basadas en Binary Heaps ($O(\log n)$) para evitar latencias en microsegundos.

---

## 5. NOTAS DE IMPLEMENTACIÓN EN C

### Gotchas y Consideraciones Críticas
1. **Desbordamiento de Enteros (*Integer Overflow*)**:
   El tipo primitivo \`int\` en arquitectura de 32 bits firmada tiene un rango limitado a $[-2,147,483,648 \dots 2,147,483,647]$. Si intentas calcular $n^2$ con $n = 50,000$, $n^2 = 2,500,000,000$, lo cual desborda silenciosamente un \`int\` produciendo un número negativo.
   * *Solución*: Para cálculos de complejidad con valores de $n \ge 50,000$, utiliza siempre \`long long\` (64 bits, hasta $\approx 9 \times 10^{18}$) o \`double\`.
2. **Precisión de \`log2()\`. en \`<math.h>\`**:
   La función \`log2(x)\` de la biblioteca estándar de C trabaja con tipo \`double\`. Al convertir su resultado a \`int\` mediante *casting* implícito, los errores de redondeo en coma flotante pueden alterar las comparaciones strictly.

\`\`\`c
#include <stdio.h>
#include <math.h>

// Forma segura de calcular operaciones sin overflow
long long calcularPasosCuadraticos(long long n) {
    return 2 * n * n; // Usa 64 bits para evitar wrap-around negativo
}
\`\`\`

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Algoritmo**: Secuencia finita e inequívoca de instrucciones computacionales que transforma entradas en salidas exactas.
* **Problema Computacional**: Definición abstracta y formal que establece las restricciones entre entradas válidas y salidas esperadas.
* **Complejidad Asintótica**: Estudio del comportamiento límite de los recursos computacionales (tiempo y espacio) cuando la entrada $n$ tiende a infinito.
* **Invariante de Bucle**: Propiedad lógica que debe mantenerse verdadera antes de la primera iteración, durante cada ciclo y al finalizar el bucle.
* **Correctitud**: Propiedad matemática de un algoritmo que garantiza que este siempre se detiene y entrega la respuesta válida especificada.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 1 completo (*The Role of Algorithms in Computing*), Secciones 1.1 y 1.2 (págs. 5–15).
  * Ejercicios recomendados del libro: Ejercicio 1.2-2 (pivote entre $8n^2$ y $64n \log_2 n$) y Ejercicio 1.2-3 (mínimo $n$ para el cual un algoritmo $100n^2$ supera a $2^n$).
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Utiliza la **Animación 1.1 (Comparador de Crecimiento)** ajustando el selector de $n$ desde 10 hasta 1,000,000 para observar cómo la barra roja $O(n^2)$ eclipsa por completo a la barra naranja $O(n \log n)$.
  * Utiliza la **Animación 1.2 (Máquina de Transformación)** para seguir el flujo de datos desde la entrada de RAM pasando por el microprocesador hasta la salida ordenada.
* **Resumen en Una Frase**:
  > *"Un algoritmo eficiente ejecutado en la computadora más modesta siempre vencerá a un algoritmo ineficiente en la supercomputadora más potente del mundo a medida que el volumen de datos aumenta."*
`,
    visualizerType: 'big_o_chart',
    checkQuestions: [
      {
        id: 'q1-1',
        question: 'Según la definición formal del libro CLRS (Cormen et al., Cap. 1.1), ¿qué es un algoritmo?',
        options: [
          'Un programa ejecutable escrito exclusivamente en lenguaje C o ensamblador.',
          'Un procedimiento computacional bien definido que toma una entrada y produce una salida deseada.',
          'Una arquitectura de supercomputadora capaz de ejecutar operaciones en paralelo.',
          'Una biblioteca estándar de funciones matemáticas sin aplicación práctica en software real.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! En CLRS Cap 1.1, un algoritmo se define formalmente como cualquier procedimiento computacional bien definido que transforma un conjunto de entradas en un conjunto de salidas.',
        analogousExplanation: 'Piensa en una procesadora de alimentos: le ingresas ingredientes crudos (Entrada), ejecuta las aspas a velocidad controlada (Pasos del Algoritmo) y produce una mezcla homogénea (Salida).'
      },
      {
        id: 'q1-2',
        question: 'Si tenemos una entrada masiva de n = 1,000,000 elementos, ¿por qué un algoritmo O(n log n) supera drásticamente a uno O(n²) ejecutado en una supercomputadora 1,000 veces más rápida?',
        options: [
          'Porque la tasa de crecimiento de las operaciones de n log n aumenta a un ritmo inmensamente menor que n², dominando sobre la velocidad del CPU.',
          'Porque el algoritmo O(n log n) consume más memoria RAM y fuerza al procesador a acelerar.',
          'Porque la notación Big-O es solo una aproximación teórica que no se refleja en tiempo real.',
          'Porque las supercomputadoras no pueden ejecutar bucles cuadráticos.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! Como demostró Cormen (Cap. 1.2), el orden de crecimiento de la función algorítmica domina el rendimiento cuando n crece, haciendo irrelevante la velocidad pura del hardware.',
        analogousExplanation: 'Imagina viajar a pie por una autopista directa de 10 km (n log n) versus viajar en un automóvil deportivo a 300 km/h en un laberinto de 500,000 km (n²). Ganará la ruta corta.'
      },
      {
        id: 'q1-3',
        question: '¿Cuál de los siguientes problemas se beneficia directamente de pasar de una búsqueda lineal O(n) a una búsqueda O(log n)?',
        options: [
          'Escribir datos secuenciales en un archivo de texto en disco.',
          'Buscar un usuario en una base de datos distribuida con 50 millones de filas indexed.',
          'Sumar todos los elementos de una matriz bidimensional.',
          'Imprimir todos los elementos de una lista enlazada por pantalla.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! Buscar en 50 millones de filas con O(log₂ n) requiere solo 26 comparaciones en un índice B-Tree, frente a 50,000,000 en búsqueda lineal.',
        analogousExplanation: 'Es la diferencia entre buscar una palabra en un diccionario hojeando página por página (O(n)) versus abrirlo exactamente por la mitad recursivamente (O(log n)).'
      },
      {
        id: 'q1-4',
        question: '¿Qué ocurre al intentar calcular n² en lenguaje C usando el tipo primitivo `int` cuando n = 50,000?',
        options: [
          'El programa lanza una excepción de tiempo de ejecución de tipo ArithmeticException.',
          'El compilador aborta la compilación de inmediato.',
          'Ocurre un desbordamiento de enteros (Integer Overflow) silencioso produciendo un número negativo debido al límite de 32 bits.',
          'El valor se convierte automáticamente a punto flotante de doble precisión.'
        ],
        correctIndex: 2,
        explanation: '¡Exacto! En C, un `int` firmado de 32 bits se limita a 2.14x10⁹. Para 50,000², el resultado es 2.5x10⁹, lo que provoca wrap-around negativo en complemento a dos.',
        analogousExplanation: 'Es como el odómetro analógico de un automóvil antiguo que llega a 999,999 km y al dar un paso más marca 000,000 km.'
      },
      {
        id: 'q1-5',
        question: '¿Qué es una "Invariante de Bucle" (Loop Invariant) en el análisis formal de algoritmos?',
        options: [
          'Una variable global que no puede ser modificada por ninguna función.',
          'Una propiedad lógica que se mantiene verdadera antes de iniciar el bucle, durante cada iteración y al finalizar la ejecución.',
          'Un error sintáctico que impide que el bucle `for` termine.',
          'La velocidad de reloj constante a la que el CPU ejecuta un ciclo `while`.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! Las invariantes de bucle son la herramienta matemática principal usada en CLRS para demostrar la correctitud formal de los algoritmos.',
        analogousExplanation: 'En un partido de fútbol, la suma de los goles del equipo A más el equipo B siempre es igual al marcador total del partido durante cualquier minuto del juego.'
      }
    ],
    exercises: [
      {
        id: 'ex-1-niv1',
        title: 'Nivel 1 (Conceptual): Predicción de Crecimiento Asintótico',
        description: 'Dados dos algoritmos A y B con complejidades f(n) = 100n y g(n) = n², determina para qué valor mínimo de n el algoritmo A comienza a ser estrictamente más eficiente que el algoritmo B.',
        cormenRef: 'CLRS 4ta Ed., Ejercicio 1.2-2',
        initialCode: '#include <stdio.h>\n\n// Responde en C retornando el valor int mínimo de n\nint calcularPuntoDeCruce() {\n    // f(n) = 100 * n\n    // g(n) = n * n\n    // Queremos encontrar el n donde 100n < n^2\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint calcularPuntoDeCruce() {\n    int n = 1;\n    while (100 * n >= n * n) {\n        n++;\n    }\n    return n; // Retorna 101\n}',
        hint: 'Despeja la desigualdad 100n < n² dividiendo ambos lados entre n (para n > 0). Obtendrás 100 < n, por lo que el primer entero es 101.',
        testCases: [
          {
            id: 'tc-1',
            description: 'Verificar el punto de cruce exacto entre 100n y n²',
            input: '',
            expectedOutput: '101'
          }
        ],
        explanation: 'Para n ≤ 100, la constante 100 hace que g(n) = n² parezca más rápido o igual. Pero para n = 101 en adelante, g(n) crece como n² y f(n) = 100n demuestra su superioridad lineal.'
      },
      {
        id: 'ex-1-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Corrección de Bug de Overflow en C',
        description: 'Un estudiante escribió la función `long long calcularOperacionesCuadraticas(int n)` para calcular n², pero la función devuelve valores negativos para n = 50,000. Corrige el bug de casting explícito en la expresión C.',
        cormenRef: 'Gotchas de C - Complemento a Dos y Casting',
        initialCode: '#include <stdio.h>\n\nlong long calcularOperacionesCuadraticas(int n) {\n    // BUG: La multiplicación (n * n) se realiza primero como int de 32 bits!\n    long long resultado = n * n;\n    return resultado;\n}',
        solutionCode: '#include <stdio.h>\n\nlong long calcularOperacionesCuadraticas(int n) {\n    // SOLUCIÓN: Castear a (long long) antes de multiplicar\n    long long resultado = (long long)n * n;\n    return resultado;\n}',
        hint: 'Si multiplicas dos variables `int`, C realiza el producto en aritmética `int` de 32 bits antes de asignar el resultado a `long long`. Realiza un cast explícito `(long long)n`.',
        testCases: [
          {
            id: 'tc-2',
            description: 'Para n = 50000 (Resultado esperado: 2500000000)',
            input: '50000',
            expectedOutput: '2500000000'
          }
        ],
        explanation: 'Al hacer `(long long)n * n`, C promueve ambos operandos a 64 bits, permitiendo almacenar valores de hasta 9x10¹⁸ sin sufrir desbordamiento.'
      },
      {
        id: 'ex-1-niv3-impl1',
        title: 'Nivel 3 (Implementación C): Comparador de Eficiencia Cormen',
        description: 'Escribe una función en C `const char* compararEficacia(int n)` que compare el número exacto de operaciones entre f(n) = 2n² y g(n) = 50n log₂(n). Debe retornar "f_es_mejor" si f(n) < g(n) o "g_es_mejor" en caso contrario.',
        cormenRef: 'CLRS 4ta Ed., Sección 1.2',
        initialCode: '#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n    // TODO: Calcula f y g usando pow() y log2() de <math.h>\n    return "";\n}',
        solutionCode: '#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n    double f = 2.0 * n * n;\n    double g = 50.0 * n * log2(n);\n    if (f < g) {\n        return "f_es_mejor";\n    } else {\n        return "g_es_mejor";\n    }\n}',
        hint: 'Usa `log2(n)` de `<math.h>` y compara los valores en tipo `double` para mantener precisión decimal.',
        testCases: [
          {
            id: 'tc-3a',
            description: 'Para n = 10 (f=200, g=166.09 -> g es mejor)',
            input: '10',
            expectedOutput: 'f_es_mejor'
          },
          {
            id: 'tc-3b',
            description: 'Para n = 1000 (f=2000000, g=498289 -> g es mejor)',
            input: '1000',
            expectedOutput: 'g_es_mejor'
          }
        ],
        explanation: 'Para valores pequeños de n (como n = 10 o 100), la constante 50 hace que g(n) requiera más operaciones. Pero para n = 1000, g(n) es 4 veces más eficiente que f(n).'
      },
      {
        id: 'ex-1-niv4-analisis',
        title: 'Nivel 4 (Análisis): Cálculo del Término Dominante',
        description: 'Dado el polinomio de complejidad f(n) = 5n³ + 200n² + 1000n + 5000, escribe una función C `long long obtenerTerminoDominante(int n)` que devuelva únicamente la contribución del término de mayor orden (5n³).',
        cormenRef: 'CLRS 4ta Ed., Cap 3 - Notación Asintótica',
        initialCode: '#include <stdio.h>\n\nlong long obtenerTerminoDominante(int n) {\n    // Devuelve solo 5 * n^3\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nlong long obtenerTerminoDominante(int n) {\n    long long n64 = (long long)n;\n    return 5 * n64 * n64 * n64;\n}',
        hint: 'Eleva n al cubo usando tipos de 64 bits (`long long`) para evitar overflow en el término n³.',
        testCases: [
          {
            id: 'tc-4',
            description: 'Para n = 100 (Resultado esperado: 5 * 100³ = 5000000)',
            input: '100',
            expectedOutput: '5000000'
          }
        ],
        explanation: 'En el análisis asintótico Big-O, a medida que n tiende a infinito, el término de mayor grado (5n³) eclipsa a todos los términos de grado menor (200n² + 1000n + 5000).'
      },
      {
        id: 'ex-1-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Simulador de Umbral de Ineficiencia',
        description: 'Escribe un programa en C que determine el mayor valor entero de n para el cual un algoritmo exponencial T(n) = 2ⁿ ejecuta menos operaciones totales que un algoritmo cuadrático T2(n) = 1000n². [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Problemas del Capítulo 1',
        initialCode: '#include <stdio.h>\n#include <math.h>\n\nint determinarUmbralExponencial() {\n    // Encuentra el mayor n entero tal que 2^n < 1000 * n^2\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n#include <math.h>\n\nint determinarUmbralExponencial() {\n    int n = 1;\n    int ultimoNValido = 1;\n    while (1) {\n        double expVal = pow(2.0, n);\n        double quadVal = 1000.0 * n * n;\n        if (expVal < quadVal) {\n            ultimoNValido = n;\n        } else if (n > 20) {\n            break; // Una vez superado el umbral para n grande, 2^n domina para siempre\n        }\n        n++;\n    }\n    return ultimoNValido; // Retorna 19\n}',
        hint: 'Usa `pow(2.0, n)` y compara contra `1000.0 * n * n`. Inicia con n=1 e incrementa hasta que 2ⁿ supere definitivamente a 1000n².',
        testCases: [
          {
            id: 'tc-5',
            description: 'Determinar el último n entero donde 2^n < 1000n²',
            input: '',
            expectedOutput: '19'
          }
        ],
        explanation: 'A pesar de la enorme constante 1000, la función exponencial 2ⁿ explota tan rápido que para n = 20, 2²⁰ = 1,048,576 supera a 1000 × 20² = 400,000. ¡El último n válido es 19!'
      }
    ],
    nextItemId: 'clase-2'
  },

  {
    id: 'clase-2',
    number: 2,
    type: 'class',
    title: 'Clase 2 – Repaso de Programación Básica y Pseudocódigo CLRS',
    topic: 'Variables, tipos de datos, estructuras de control, funciones y la sintaxis formal de pseudocódigo en Cormen',
    cormenChapter: 'Capítulo 2: Primeros Pasos (Getting Started - Sec. 2.1)',
    durationMinutes: 50,
    summary: 'Análisis estructural del pseudocódigo formal de Cormen: bloques por identación, convenciones de arreglos base-1, paso por referencia y demostración de corrección mediante Invariantes de Bucle.',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico y Necesidad Universitaria
Cuando Thomas Cormen, Charles Leiserson, Ronald Rivest y Clifford Stein escribieron *Introduction to Algorithms* (CLRS) en MIT, se enfrentaron a un dilema fundamental: **¿en qué lenguaje de programación deben expresarse los algoritmos para que conserven su validez académica a lo largo de las décadas?**

Si hubieran elegido Pascal en 1990, C++ en 2001, o Java en 2009, el libro habría quedado obsoleto con los cambios de sintaxis de cada lenguaje. Por ello, diseñaron un **Pseudocódigo Matemático Formal** que omite los detalles de bajo nivel específicos del compilador (como la recolección de basura o las directivas de inclusión) pero retiene con precisión absoluta la lógica de ejecución, la estructura de bloques y el manejo de objetos en memoria.

### Analogía Intuitiva
El pseudocódigo de Cormen es como el **plano arquitectónico de un edificio**: no especifica qué marca de martillo o clavos usará el carpintero (C, C++, Java o Python), sino la distribución exacta de vigas de carga, dimensiones de columnas y flujos de tránsito que garantizan que la estructura no colapse.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Las Convenciones Formales del Pseudocódigo CLRS
El pseudocódigo en CLRS sigue cinco reglas estructurales estrictas:

1. **Estructura por Identación (Sangría)**: Los bloques de código dentro de un \`for\`, \`while\` o \`if-else\` se definen exclusivamente por la sangría, eliminando las llaves \`{}\` o las palabras reservadas \`begin/end\`.
2. **Estructuras de Control Iterativas y Condicionales**:
   * \`for i = 1 to n do\` (recorre de $1$ a $n$ inclusive de forma ascendente).
   * \`for i = n downto 1 do\` (recorre de forma descendente).
   * \`while\` *condición* \`do\` (evalúa la condición antes de cada iteración).
3. **Indexación de Arreglos Base 1 ($A[1 \\dots n]$)**:
   * **REGLA FUNDAMENTAL DE CORMEN**: Los arreglos en el libro de texto están indexados habitualmente comenzando en $1$. El primer elemento es $A[1]$ y el último es $A[n]$, donde $n = A.length$.
   * *Nota de traducción a C*: Al codificar en lenguaje C, **debemos mapear obligatoriamente** la lógica de base 1 a base 0 ($A[0 \\dots n-1]$).
4. **Paso de Parámetros por Referencia**:
   * Los tipos primarios (enteros, flotantes, booleanos) se pasan por valor.
   * Las estructuras compuestas (arreglos, objetos y grafos) se pasan por **referencia** (puntero a la dirección base en memoria RAM). Los cambios dentro del algoritmo afectan directamente los datos originales.
5. **Acceso a Atributos de Objetos**:
   * Se denotan mediante el punto: \`x.key\` o \`node.next\`. Un objeto asignado a una variable es una referencia (puntero). Si \`y = x\`, ambas variables apuntan al mismo objeto en memoria RAM.

#### Diagrama de Mapeo de Índices: Cormen (Base-1) vs C (Base-0)
\`\`\`
Pseudocódigo Cormen:  [ A[1] ]  [ A[2] ]  [ A[3] ]  ...  [ A[n] ]
                      ↓          ↓          ↓               ↓
Código en C Nativo:  [ A[0] ]  [ A[1] ]  [ A[2] ]  ...  [ A[n-1] ]
\`\`\`

---

### 2.2 La Invariante de Bucle (Loop Invariant)
Para demostrar formalmente que un algoritmo iterativo produce la respuesta correcta sin recurrir a pruebas empíricas de fuerza bruta, Cormen introduce el método de la **Invariante de Bucle**. Una invariante es una afirmación lógica sobre el estado de las variables que debe cumplir 3 propiedades esenciales:

1. **Inicialización**: La propiedad es verdadera inmediatamente antes de entrar a la primera iteración del bucle.
2. **Mantenimiento**: Si la propiedad es verdadera antes de una iteración, se mantiene verdadera antes de iniciar la siguiente iteración.
3. **Terminación**: Cuando el bucle finaliza, la propiedad retenida proporciona una prueba lógica irrefutable de que el algoritmo ha alcanzado la solución correcta.

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Conteo Riguroso de Operaciones en Bucles Simples y Anidados

Consideremos el algoritmo de búsqueda lineal para encontrar el elemento $x$ en un arreglo $A$ de $n$ elementos:

\`\`\`text
LINEAL-SEARCH(A, x)
1  i = 1
2  while i <= A.length and A[i] != x do
3      i = i + 1
4  if i <= A.length then
5      return i
6  else return NIL
\`\`\`

#### Derivación de Complejidad Temporal:
* **Mejor Caso ($T_{best}(n)$)**: Ocurre cuando $x$ se encuentra en la primera posición ($A[1] == x$). La condición del \`while\` se ejecuta 1 vez y se retorna inmediatamente.
  $$\\text{Tiempo} = O(1)$$
* **Peor Caso ($T_{worst}(n)$)**: Ocurre cuando $x$ no está presente en el arreglo o se encuentra en la última posición ($A[n]$). La condición del \`while\` se evalúa $n+1$ veces y el cuerpo se ejecuta $n$ veces.
  $$\\text{Tiempo} = c_1 + (n+1)c_2 + n c_3 + c_4 = O(n)$$

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Analizadores Sintácticos (Parsers) e Intérpretes**: Los compiladores de C y Java leen el código fuente como una secuencia de caracteres y aplican estructuras de control iterativas para verificar la validez sintáctica.
2. **Motores de Búsqueda de Texto**: La búsqueda secuencial lineal $O(n)$ se utiliza como fallback en buffers de edición en tiempo real (por ejemplo, búsquedas en editores Vim o VSCode sobre documentos pequeños).
3. **Validación de Integridad de Datos**: Los algoritmos de suma de comprobación (Checksums) recorren linealmente arreglos de bytes calculando acumulación de hash.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. El Error "Off-By-One" (Desfase por un Elemento)
El desatino más común de los estudiantes al traducir pseudocódigo de Cormen a C es olvidar convertir los límites de los bucles:
* **Incorrecto (Crash por Segmentation Fault en C)**:
  \`\`\`c
  // Causa lectura fuera de límites en A[n]!
  for (int i = 1; i <= n; i++) {
      suma += A[i];
  }
  \`\`\`
* **Correcto (Base-0 en C)**:
  \`\`\`c
  for (int i = 0; i < n; i++) {
      suma += A[i];
  }
  \`\`\`

### 2. Modificación de Variables de Control
En el pseudocódigo de Cormen, la variable de un bucle \`for\` incrementa automáticamente. Modificar manualmente la variable del bucle dentro del cuerpo se considera una pésima práctica académica que corrompe la invariante de bucle.

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Pseudocódigo**: Lenguaje informal de alto nivel diseñado para expresar algoritmos omitiendo detalles específicos de compiladores.
* **Invariante de Bucle**: Propiedad lógica que se demuestra antes, durante y al terminar un bucle para certificar su correctitud matemática.
* **Indexación Base-1**: Convención matemática en CLRS donde los arreglos inician en el índice 1 ($A[1]$).
* **Indexación Base-0**: Convención física de memoria usada en C donde los arreglos inician en el desplazamiento 0 ($A[0]$).
* **Off-By-One Error**: Fallo de programación que ocurre al iterar un elemento de más o de menos en un bucle.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 2 completo (*Getting Started*), Sección 2.1 (págs. 18–24).
  * Ejercicios del libro: Ejercicio 2.1-1 (trazar Ordenamiento por Inserción) y Ejercicio 2.1-3 (Pseudocódigo de Búsqueda Lineal y prueba de Invariante).
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Utiliza el visualizador de **Mapa de Memoria y Punteros** para inspeccionar la asignación contigua de memoria en arreglos y el comportamiento de variables locales en el stack.
* **Resumen en Una Frase**:
  > *"El pseudocódigo formal es el idioma universal de las ciencias de la computación; comprender la traducción entre los índices base-1 del libro y el hardware base-0 de C es el primer paso para dominar los algoritmos."*
`,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q2-1',
        question: 'En el pseudocódigo estándar del libro de Cormen (CLRS), ¿en qué número de índice comienzan usualmente los arreglos?',
        options: ['En índice 0', 'En índice 1', 'En índice -1', 'No tienen índices'],
        correctIndex: 1,
        explanation: '¡Correcto! Cormen adopta la convención matemática donde los arreglos van de A[1] a A[n]. Al programar en C debemos traducirlo a base 0.',
        analogousExplanation: 'En matemática tradicional contamos del 1 al 10. En informática física (C/JS) contamos desde el desplazamiento cero (offset 0).'
      },
      {
        id: 'q2-2',
        question: '¿Qué tres propiedades deben verificarse para demostrar la corrección de un algoritmo mediante una Invariante de Bucle?',
        options: [
          'Compilación, Ejecución y Finalización.',
          'Inicialización, Mantenimiento y Terminación.',
          'Entrada, Proceso y Salida.',
          'Asignación, Declaración y Desreferenciación.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Según CLRS Cap. 2.1, la prueba por Invariante requiere demostrar Inicialización (antes del bucle), Mantenimiento (entre iteraciones) y Terminación (al salir).',
        analogousExplanation: 'Es análogo al principio de inducción matemática: caso base (inicialización), paso inductivo (mantenimiento) y conclusión (terminación).'
      }
    ],
    exercises: [
      {
        id: 'ex-2-niv1',
        title: 'Nivel 1 (Conceptual): Mapeo de Índices de Cormen a C Base-0',
        description: 'En el pseudocódigo de Cormen, el último elemento de un arreglo de tamaño n está en A[n]. Escribe una función en C `int obtenerUltimoElemento(int A[], int n)` que devuelva correctamente el último elemento en C.',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Convenciones de Pseudocódigo',
        initialCode: '#include <stdio.h>\n\nint obtenerUltimoElemento(int A[], int n) {\n    // BUG: A[n] en C accede fuera del límite!\n    return A[n];\n}',
        solutionCode: '#include <stdio.h>\n\nint obtenerUltimoElemento(int A[], int n) {\n    // SOLUCIÓN: En C base-0, el último elemento está en A[n - 1]\n    if (n <= 0) return -1;\n    return A[n - 1];\n}',
        hint: 'En C, un arreglo de tamaño n tiene posiciones válidas de 0 a n-1. Ajusta el índice a `A[n - 1]`.',
        testCases: [
          {
            id: 'tc-2-1',
            description: 'Obtener último elemento de [10, 20, 30, 40, 50], n=5',
            input: '[10, 20, 30, 40, 50], 5',
            expectedOutput: '50'
          }
        ],
        explanation: 'En C, acceder a `A[n]` es un error de "Off-By-One" que lee memoria no asignada. La última posición válida es siempre `A[n - 1]`.'
      },
      {
        id: 'ex-2-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Corrección de Bug "Off-By-One" en Búsqueda Lineal',
        description: 'El siguiente código intenta implementar la Búsqueda Lineal de Cormen en C, pero tiene un error de límite en el bucle for que causa un Segmentation Fault. Corrígelo.',
        cormenRef: 'CLRS 4ta Ed., Ejercicio 2.1-3',
        initialCode: '#include <stdio.h>\n\nint busquedaLineal(int A[], int n, int x) {\n    // BUG: i <= n en C genera acceso fuera de memoria\n    for (int i = 0; i <= n; i++) {\n        if (A[i] == x) {\n            return i; // Retorna índice base-0\n        }\n    }\n    return -1;\n}',
        solutionCode: '#include <stdio.h>\n\nint busquedaLineal(int A[], int n, int x) {\n    // SOLUCIÓN: Cambiar la condición a i < n\n    for (int i = 0; i < n; i++) {\n        if (A[i] == x) {\n            return i;\n        }\n    }\n    return -1;\n}',
        hint: 'Cambia la condición del ciclo `i <= n` por `i < n`.',
        testCases: [
          {
            id: 'tc-2-2a',
            description: 'Buscar x=30 en [10, 20, 30, 40], n=4 (Índice esperado: 2)',
            input: '[10, 20, 30, 40], 4, 30',
            expectedOutput: '2'
          },
          {
            id: 'tc-2-2b',
            description: 'Buscar x=99 en [10, 20, 30, 40], n=4 (No encontrado: -1)',
            input: '[10, 20, 30, 40], 4, 99',
            expectedOutput: '-1'
          }
        ],
        explanation: 'Cambiar `i <= n` a `i < n` asegura que el bucle se detenga en $i = n-1$, inspeccionando exactamente todos los elementos sin provocar desbordamiento de memoria.'
      },
      {
        id: 'ex-2-niv3-impl',
        title: 'Nivel 3 (Implementación C): Suma Acumulativa de Elementos Pares',
        description: 'Escribe una función C `int sumarElementosPares(int A[], int n)` que recorra un arreglo de enteros y devuelva únicamente la suma acumulada de los elementos cuyo valor sea un número par (`val % 2 == 0`).',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Estructuras Iterativas',
        initialCode: '#include <stdio.h>\n\nint sumarElementosPares(int A[], int n) {\n    int suma = 0;\n    // TODO: Implementa el recorrido acumulando los números pares\n    return suma;\n}',
        solutionCode: '#include <stdio.h>\n\nint sumarElementosPares(int A[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        if (A[i] % 2 == 0) {\n            suma += A[i];\n        }\n    }\n    return suma;\n}',
        hint: 'Usa el operador módulo `A[i] % 2 == 0` dentro del bucle `for` para identificar valores pares.',
        testCases: [
          {
            id: 'tc-2-3',
            description: 'Sumar pares de [1, 2, 3, 4, 5, 6], n=6 (2+4+6 = 12)',
            input: '[1, 2, 3, 4, 5, 6], 6',
            expectedOutput: '12'
          }
        ],
        explanation: 'El bucle evalúa la condición de paridad mediante el operador residuo `% 2`. Mantiene la invariante acumulando solo los valores válidos en $O(n)$ tiempo.'
      },
      {
        id: 'ex-2-niv4-analisis',
        title: 'Nivel 4 (Análisis): Verificador de Arreglo Estrictamente Monótono Creciente',
        description: 'Escribe una función C `int esMonotonoCreciente(int A[], int n)` que devuelva `1` si para todo i se cumple A[i] < A[i+1], o `0` si existe alguna violación.',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Demostración de Invariantes',
        initialCode: '#include <stdio.h>\n\nint esMonotonoCreciente(int A[], int n) {\n    // TODO: Verifica la propiedad de monotonía\n    return 1;\n}',
        solutionCode: '#include <stdio.h>\n\nint esMonotonoCreciente(int A[], int n) {\n    if (n <= 1) return 1;\n    for (int i = 0; i < n - 1; i++) {\n        if (A[i] >= A[i + 1]) {\n            return 0;\n        }\n    }\n    return 1;\n}',
        hint: 'Itera hasta `n - 1` e inspecciona la pareja `A[i]` y `A[i + 1]`. Si `A[i] >= A[i + 1]`, retorna 0 inmediatamente.',
        testCases: [
          {
            id: 'tc-2-4a',
            description: 'Para [10, 20, 30, 40], n=4 (Es creciente -> 1)',
            input: '[10, 20, 30, 40], 4',
            expectedOutput: '1'
          },
          {
            id: 'tc-2-4b',
            description: 'Para [10, 25, 20, 40], n=4 (Violación -> 0)',
            input: '[10, 25, 20, 40], 4',
            expectedOutput: '0'
          }
        ],
        explanation: 'La función utiliza cortocircuito para retornar `0` apenas se detecta la primera violación. La invariante de bucle garantiza que todo el subarreglo previo $A[0 \\dots i]$ ha sido verificado.'
      },
      {
        id: 'ex-2-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Algoritmo de Rotación de Arreglo in-place',
        description: 'Escribe una función C `void rotarIzquierda(int A[], int n, int k)` que rote un arreglo k posiciones a la izquierda con complejidad espacial auxiliar O(1). [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Problemas del Capítulo 2',
        initialCode: '#include <stdio.h>\n\nvoid invertirSubarreglo(int A[], int inicio, int fin) {\n    while (inicio < fin) {\n        int temp = A[inicio];\n        A[inicio] = A[fin];\n        A[fin] = temp;\n        inicio++;\n        fin--;\n    }\n}\n\nvoid rotarIzquierda(int A[], int n, int k) {\n    // TODO: Utiliza el triple algoritmo de inversión de Jon Bentley\n}',
        solutionCode: '#include <stdio.h>\n\nvoid invertirSubarreglo(int A[], int inicio, int fin) {\n    while (inicio < fin) {\n        int temp = A[inicio];\n        A[inicio] = A[fin];\n        A[fin] = temp;\n        inicio++;\n        fin--;\n    }\n}\n\nvoid rotarIzquierda(int A[], int n, int k) {\n    if (n <= 1) return;\n    k = k % n;\n    if (k == 0) return;\n    invertirSubarreglo(A, 0, k - 1);\n    invertirSubarreglo(A, k, n - 1);\n    invertirSubarreglo(A, 0, n - 1);\n}',
        hint: 'Aplica el algoritmo de inversión triple: 1) invierte A[0...k-1], 2) invierte A[k...n-1], 3) invierte todo A[0...n-1]. Complejidad O(n) tiempo y O(1) memoria.',
        testCases: [
          {
            id: 'tc-2-5',
            description: 'Rotar [1, 2, 3, 4, 5] k=2 posiciones -> [3, 4, 5, 1, 2]',
            input: '[1, 2, 3, 4, 5], 5, 2',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El célebre algoritmo de rotación mediante tres inversiones invierte bloques contiguos de memoria en $O(n)$ tiempo total sin utilizar memoria auxiliar adicional ($O(1)$ espacio).'
      }
    ],
    prevItemId: 'clase-1',
    nextItemId: 'clase-3'
  },

  {
    id: 'clase-3',
    number: 3,
    type: 'class',
    title: 'Clase 3 – Punteros, Direcciones de Memoria y Structs en C para Cormen',
    topic: 'Direccionamiento de memoria RAM (&), desreferenciación (*), la arimética de punteros y estructuras compuestas (structs)',
    cormenChapter: 'Capítulo 10: Estructuras de Datos Elementales (Sec. 10.3 - Punteros y Objetos)',
    durationMinutes: 55,
    summary: 'Aprender a leer y manipular la memoria física de la computadora: operadores &, *, paso de parámetros por referencia, aritmética de punteros, estructuras compuestas (struct) y el operador flecha (->).',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico y Necesidad Universitaria
En los capítulos 10 a 21 del libro de Cormen (CLRS), los algoritmos manipulan **Estructuras de Datos Dinámicas**: Listas Enlazadas, Árboles Binarios de Búsqueda, Montículos (Heaps), Grafos y Tablas Hash. En el pseudocódigo del libro, expresiones como \`x.next = y\` o \`parent[x] = NIL\` asumen que el sistema operativo puede seguir referencias en memoria instantáneamente.

Para implementar estos algoritmos en la realidad, el lenguaje C es la herramienta insustituible por excelencia. A diferencia de lenguajes con memoria administrada (Python, Java o JavaScript) donde la memoria RAM está oculta tras capas de abstracción, en C **el programador tiene control directo sobre cada byte físico de la memoria RAM del sistema**.

### Analogía Intuitiva
La memoria RAM es un **hotel de lujo gigante con miles de millones de habitaciones numeradas de forma secuencial** (las direcciones hexadecimales de memoria, ej. \`0x7fff5fbff7c0\`):
* Una **variable convencional** (\`int x = 42;\`) es una habitación donde el huésped (el número 42) vive adentro.
* Un **puntero** (\`int *p = &x;\`) es un **papel que tiene anotado el número de la habitación** de \`x\`.
* **Desreferenciar un puntero** (\`*p = 99;\`) es usar esa dirección anotada en el papel para caminar hacia la habitación y cambiar al huésped por un nuevo número 99.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Los Tres Operadores Fundamentales de Memoria en C
1. **Operador Dirección (\`&\`)**: Antepuesto a cualquier variable, extrae su dirección física inicial en la memoria RAM (expresada en hexadecimal).
2. **Declarador de Puntero (\`*\`)**: En una declaración (\`T *ptr;\`), indica que la variable \`ptr\` no almacena un valor numérico directo, sino la dirección de memoria de un dato de tipo \`T\`.
3. **Operador Desreferenciación / Indirección (\`*\`)**: Antepuesto a un puntero existente (\`*ptr\`), accede directamente al contenido almacenado en la dirección apuntada.

#### Diagrama de Memoria RAM: Variable vs Puntero
\`\`\`
Dirección Hexadecimal  | Variable / Tipo | Contenido en RAM
-----------------------|-----------------|------------------
0x7fff5fbff7c0         | int x           | 42
...                    | ...             | ...
0x7fff5fbff7c8         | int *p          | 0x7fff5fbff7c0  (Apunta a x)
\`\`\`

---

### 2.2 Estructuras Compuestas (\`struct\`) y el Operador Flecha (\`->\`)
Un \`struct\` en C agrupa múltiples variables bajo un mismo nombre. Cuando manejamos punteros a estructuras (como en los nodos de Cormen), el lenguaje C proporciona el operador flecha \`->\` como un atajo sintáctico equivalente a la desreferenciación seguida del acceso a campo:

$$\\text{puntero}->\\text{campo} \\equiv (*\\text{puntero}).\\text{campo}$$

\`\`\`c
struct Nodo {
    int clave;
    struct Nodo *siguiente;
};

struct Nodo n1 = {10, NULL};
struct Nodo *ptr = &n1;

// Ambas líneas son idénticas en C:
(*ptr).clave = 25;
ptr->clave = 25; // Sintaxis preferida en CLRS y C Pro
\`\`\`

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Tiempos de Acceso a Memoria
* **Acceso Directo (\`x\`)**: $O(1)$ tiempo. El CPU lee la dirección de memoria asociada a la variable local en el stack frame actual.
* **Acceso Indirecto por Puntero (\`*p\`)**: $O(1)$ tiempo. Requiere dos lecturas de bus de datos: primero lee la dirección guardada en \`p\` y luego busca el valor en esa dirección objetivo.
* **Aritmética de Punteros (\`ptr + i\`)**: $O(1)$ tiempo. En C, sumar $i$ a un puntero de tipo \`T*\` incrementa la dirección física en $i \\times \\text{sizeof}(T)$ bytes.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Kernel de Sistemas Operativos (Linux / Windows)**: El planificador de tareas de Linux utiliza listas doblemente enlazadas de estructuras \`task_struct\` interconectadas mediante punteros en C.
2. **Asignadores de Memoria (\`malloc\` / \`free\` / \`jemalloc\`)**: Los administradores de heap leen cabeceras de bloques libres desreferenciando punteros a la tabla de memoria.
3. **Manejadores de Hardware y Drivers**: La lectura de puertos I/O (tarjetas de red, GPUs) requiere mapear punteros directamente a direcciones de memoria físicas de dispositivos PCI.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. Punteros Salvajes (Wild Pointers) y Uninitialized Pointers
Un puntero declarado sin inicializar (\`int *p;\`) contiene "basura" de memoria. Intentar desreferenciarlo (\`*p = 5;\`) provoca el error fatal de tiempo de ejecución **Segmentation Fault (core dumped)** o corrompe regiones aleatorias de la memoria del sistema.
* **REGLA UNIVERSAL**: Inicializa siempre todo puntero no utilizado con \`NULL\` (\`int *p = NULL;\`).

### 2. Violación del Principio de Aliasing y Punteros Colgantes (Dangling Pointers)
Si dos punteros \`p1\` y \`p2\` apuntan a la misma dirección y liberas o destruyes la variable subyacente, \`p2\` queda "colgando".

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Puntero**: Variable que almacena una dirección de memoria en lugar de un valor directo.
* **Desreferenciación**: Operación \`*\` que permite leer o modificar el valor alojado en la dirección a la que apunta un puntero.
* **Puntero NULL**: Valor especial (habitualmente \`0x0\`) que representa un puntero que no apunta a ninguna dirección válida de memoria.
* **Operador Flecha (\`->\`)**: Atajo sintáctico en C para acceder a miembros de un \`struct\` a través de un puntero.
* **Segmentation Fault**: Violación de acceso de memoria generada por el procesador cuando un programa intenta leer o escribir en una dirección no permitida.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 10 completo (*Elementary Data Structures*), Sección 10.3 (págs. 263–268).
  * **Kernighan & Ritchie (K&R C)**: Capítulo 5 completo (*Pointers and Arrays*), Secciones 5.1 y 5.2.
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Activa la **Animación de Punteros y Memoria** ajustando el interruptor de desreferenciación para visualizar cómo cambia el valor de la variable objetivo cuando modificamos el puntero.
* **Resumen en Una Frase**:
  > *"Un puntero no es más que un número que indica en qué habitación de la RAM vive la información; dominar su desreferenciación es la clave para construir estructuras de datos dinámicas."*
`,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q3-1',
        question: 'En C, si tenemos `int a = 50; int *ptr = &a;`, ¿qué hace exactamente la instrucción `*ptr = 99;`?',
        options: [
          'Cambia la dirección de memoria almacenada en ptr por el número 99.',
          'Modifica directamente el valor almacenado en la variable `a` asignándole 99.',
          'Produce un error de compilación por incompatibilidad de tipos.',
          'Crea un nuevo puntero secundario en el stack.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! El operador `*` (desreferenciación) accede a la celda de memoria cuya dirección está guardada en `ptr` (es decir, la variable `a`) y reemplaza su contenido por 99.',
        analogousExplanation: 'Si `ptr` es el número de la habitación 104, `*ptr = 99` entra a la habitación 104 y cambia la cama por una nueva.'
      },
      {
        id: 'q3-2',
        question: 'Dada una estructura `struct Nodo { int clave; struct Nodo *next; } *p;`, ¿cuál es la sintaxis correcta equivalente a `(*p).clave`?',
        options: ['p.clave', 'p->clave', 'p&*clave', 'p..clave'],
        correctIndex: 1,
        explanation: '¡Correcto! En C, el operador flecha `p->clave` es el atajo oficial para desreferenciar un puntero a estructura y acceder a uno de sus campos.',
        analogousExplanation: 'Es simplemente una forma abreviada y limpia de escribir `(*p).clave` sin tener que llenar el código de paréntesis extra.'
      }
    ],
    exercises: [
      {
        id: 'ex-3-niv1',
        title: 'Nivel 1 (Conceptual): Modificación Indirecta por Punteros',
        description: 'Escribe una función en C `void duplicarValor(int *p)` que tome un puntero a un entero `p` y duplique el valor alojado en esa dirección de memoria.',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Apéndice B',
        initialCode: '#include <stdio.h>\n\nvoid duplicarValor(int *p) {\n    // TODO: Duplica el valor desreferenciando p\n}',
        solutionCode: '#include <stdio.h>\n\nvoid duplicarValor(int *p) {\n    if (p != NULL) {\n        *p = (*p) * 2;\n    }\n}',
        hint: 'Usa `*p = (*p) * 2;` para modificar el entero original en la memoria RAM.',
        testCases: [
          {
            id: 'tc-3-1',
            description: 'Duplicar valor original val=21 (Resultado esperado: 42)',
            input: '21',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Al desreferenciar `*p`, modificamos directamente la variable en el scope invocador sin necesidad de retornar un nuevo valor.'
      },
      {
        id: 'ex-3-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Intercambio de Variables (Swap) con Punteros',
        description: 'Un estudiante escribió la función `swap(int a, int b)` intentando intercambiar dos variables, pero descubrió que fuera de la función no cambiaban. Corrige la firma y el cuerpo usando punteros `int *a, int *b`.',
        cormenRef: 'K&R C Cap 5.2 - Paso por Referencia',
        initialCode: '#include <stdio.h>\n\nvoid intercambiarErroneo(int a, int b) {\n    // BUG: Pasa por valor, no modifica las variables originales fuera!\n    int temp = a;\n    a = b;\n    b = temp;\n}',
        solutionCode: '#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n    if (a != NULL && b != NULL) {\n        int temp = *a;\n        *a = *b;\n        *b = temp;\n    }\n}',
        hint: 'Cambia los parámetros a `int *a, int *b` e intercambia mediante `*a` y `*b`.',
        testCases: [
          {
            id: 'tc-3-2',
            description: 'Intercambiar a=10 y b=20',
            input: '10, 20',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Pasar direcciones de memoria `&a` y `&b` permite a la función modificar el estado en el frame de pila del llamador.'
      },
      {
        id: 'ex-3-niv3-impl',
        title: 'Nivel 3 (Implementación C): Modificador de Estructura de Nodo',
        description: 'Dada la estructura `struct Elemento { int id; int valor; };`, escribe una función C `void actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor)` que actualice ambos campos usando el operador flecha `->`.',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Atributos de Objetos',
        initialCode: '#include <stdio.h>\n\nstruct Elemento {\n    int id;\n    int valor;\n};\n\nvoid actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor) {\n    // TODO: Actualiza id y valor mediante el operador flecha ->\n}',
        solutionCode: '#include <stdio.h>\n\nstruct Elemento {\n    int id;\n    int valor;\n};\n\nvoid actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor) {\n    if (elem != NULL) {\n        elem->id = nuevoId;\n        elem->valor = nuevoValor;\n    }\n}',
        hint: 'Usa `elem->id = nuevoId;` y `elem->valor = nuevoValor;`.',
        testCases: [
          {
            id: 'tc-3-3',
            description: 'Actualizar struct a id=101, valor=500',
            input: '101, 500',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El operador `->` desreferencia la dirección del struct y modifica directamente los miembros de la estructura original.'
      },
      {
        id: 'ex-3-niv4-analisis',
        title: 'Nivel 4 (Análisis): Búsqueda de Mínimo y Máximo con Retorno Multivalor por Puntero',
        description: 'En C una función solo puede retornar un único valor directamente. Implementa `void obtenerMinMax(int A[], int n, int *minVal, int *maxVal)` que devuelva el mínimo y el máximo de un arreglo escribiendo en los punteros provistos.',
        cormenRef: 'CLRS 4ta Ed., Cap 9 - Medianas y Estadísticos de Orden',
        initialCode: '#include <stdio.h>\n\nvoid obtenerMinMax(int A[], int n, int *minVal, int *maxVal) {\n    // TODO: Recorre A y asigna los resultados en *minVal y *maxVal\n}',
        solutionCode: '#include <stdio.h>\n\nvoid obtenerMinMax(int A[], int n, int *minVal, int *maxVal) {\n    if (n <= 0 || minVal == NULL || maxVal == NULL) return;\n    int min = A[0];\n    int max = A[0];\n    for (int i = 1; i < n; i++) {\n        if (A[i] < min) min = A[i];\n        if (A[i] > max) max = A[i];\n    }\n    *minVal = min;\n    *maxVal = max;\n}',
        hint: 'Inicializa `min = A[0]` y `max = A[0]`. Al terminar el recorrido asigna `*minVal = min;` y `*maxVal = max;`.',
        testCases: [
          {
            id: 'tc-3-4',
            description: 'Para [45, 12, 89, 3, 67], n=5 (Min=3, Max=89)',
            input: '[45, 12, 89, 3, 67], 5',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El patrón de pasar punteros de salida (`int *out`) es el mecanismo idiomático en C para retornar múltiples resultados desde una sola función.'
      },
      {
        id: 'ex-3-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Simulador de Asignador de Memoria Fija (Arena Allocator)',
        description: 'Implementa una estructura `struct Arena` que administre un arreglo buffer de enteros de tamaño fijo (ej. 100 enteros). Escribe la función `int* arenaAlloc(struct Arena *a, int tamano)` que devuelva un puntero al bloque asignado incrementando el desplazamiento (offset) interno. [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Representación mediante arreglos',
        initialCode: '#include <stdio.h>\n\nstruct Arena {\n    int buffer[100];\n    int offset;\n};\n\nvoid initArena(struct Arena *a) {\n    a->offset = 0;\n}\n\nint* arenaAlloc(struct Arena *a, int tamano) {\n    // TODO: Si offset + tamano <= 100, devuelve &a->buffer[offset] e incrementa offset\n    return NULL;\n}',
        solutionCode: '#include <stdio.h>\n\nstruct Arena {\n    int buffer[100];\n    int offset;\n};\n\nvoid initArena(struct Arena *a) {\n    a->offset = 0;\n}\n\nint* arenaAlloc(struct Arena *a, int tamano) {\n    if (a == NULL || a->offset + tamano > 100) {\n        return NULL;\n    }\n    int *ptr = &a->buffer[a->offset];\n    a->offset += tamano;\n    return ptr;\n}',
        hint: 'Verifica si `a->offset + tamano <= 100`. Si es así, calcula `ptr = &a->buffer[a->offset]`, suma `tamano` a `offset` y retorna `ptr`.',
        testCases: [
          {
            id: 'tc-3-5',
            description: 'Asignar bloque de 10 enteros en Arena limpia',
            input: '10',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Los asignadores por arena (Arena Allocators) son patrones de altísimo rendimiento usados en compiladores y motores de juegos para evitar la fragmentación de memoria de `malloc`.'
      }
    ],
    prevItemId: 'clase-2',
    nextItemId: 'clase-4'
  },

  {
    id: 'clase-4',
    number: 4,
    type: 'class',
    title: 'Clase 4 – Listas Enlazadas',
    topic: 'Listas enlazadas simples, representaciones en memoria y comparación contra arreglos',
    cormenChapter: 'Capítulo 10.2: Listas enlazadas (Linked Lists)',
    durationMinutes: 60,
    summary: 'Construcción de estructuras dinámicas de datos: nodos, punteros \`head\` y \`next\`, inserción en $O(1)$, eliminación y búsqueda lineal $O(n)$.',
    theoryContent: `
### 1. ¿Qué es una Lista Enlazada Simple?
Según **Cormen Cap 10.2**, una lista enlazada es una estructura de datos en la que los elementos se arreglan en un **orden lineal**. Sin embargo, a diferencia de un arreglo donde los elementos están en posiciones contiguas de memoria, en una lista enlazada cada elemento es un **Objeto / Nodo** separado que contiene:
1. **\`key\` / \`dato\`**: El valor guardado.
2. **\`next\`**: Un puntero a la dirección de memoria del siguiente nodo.

El primer nodo se conoce como **\`head\`** (cabeza). Si la lista está vacía, \`head == NULL\`.

\`\`\`
[ HEAD ] -> [ Dato: 12 | next ] -> [ Dato: 99 | next ] -> [ Dato: 37 | NULL ]
\`\`\`

---

### 2. Arreglo vs Lista Enlazada: Comparativa de Complejidad

| Operación | Arreglo Contiguo | Lista Enlazada Simple |
| :--- | :--- | :--- |
| **Acceso a\leatorio por índice** ($A[i]$) | $O(1)$ (Inmediato) | $O(n)$ (Debe recorrer nodo por nodo) |
| **Inserción al Inicio** | $O(n)$ (Debe desplazar todos los elementos) | $O(1)$ (Súper eficiente) |
| **Inserción al Final** | $O(1)$ amortizado / $O(n)$ si está l\leno | $O(n)$ sin puntero \`tail\`, $O(1)$ con \`tail\` |
| **Búsqueda de un valor** | $O(n)$ (o $O(\\log n)$ si ordenado) | $O(n)$ |
| **Uso de Memoria** | Compacto, sin overhead de punteros | Requiere espacio extra por cada puntero \`next\` |
    `,
    visualizerType: 'linked_list',
    checkQuestions: [
      {
        id: 'q4-1',
        question: '¿Cuál es la ventaja fundamental de insertar un nuevo elemento al INICIO de una lista enlazada frente a un arreglo estático?',
        options: [
          'En la lista enlazada toma tiempo $O(1)$ cambiando solo un par de punteros, mientras que en el arreglo toma $O(n)$ desplazando elementos.',
          'La lista enlazada ocupa menos memoria total.',
          'La lista enlazada permite buscar elementos más rápido.',
          'El arreglo no permite insertar elementos jamás.'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! Insertar al frente de una lista enlazada requiere crear el nodo y reasignar `head = nuevoNodo`, operación constante $O(1)$.',
        analogousExplanation: 'Imagina una cadena de vagones de tren: enganchar un vagón nuevo al frente de la locomotora es $O(1)$. En cambio, en una fila fija de asientos numerados tienes que correr a todos un puesto a la derecha.'
      }
    ],
    exercises: [
      {
        id: "ex-4",
        title: "Ejercicio 4: Lectura de Cabeza de Lista Enlazada en C",
        description: "Dada la estructura `struct Nodo { int dato; struct Nodo *siguiente; };`, escribe una función `int obtenerPrimerValor(struct Nodo *cabeza)` que devuelva el campo `dato` del nodo cabeza o `-1` si la lista es nula (`NULL`).",
        cormenRef: "Cormen Cap 10.2 - Listas Enlazadas Simples",
        initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  // TODO: Retorna cabeza->dato o -1 si cabeza == NULL\n  return -1;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  if (cabeza == NULL) return -1;\n  return cabeza->dato;\n}",
        hint: "Verifica primero si `cabeza == NULL`. Si no es nulo, accede a su valor usando el operador flecha `cabeza->dato`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Lista con nodo dato=42",
                    "input": "{ dato: 42, siguiente: null }",
                    "expectedOutput": "42"
          },
          {
                    "id": "t2",
                    "description": "Lista vacía (NULL)",
                    "input": "null",
                    "expectedOutput": "-1"
          }
],
        explanation: "El acceso a campos de una estructura mediante un puntero se realiza con el operador flecha `->`, verificando siempre que el puntero no sea nulo."
      }
    ],
    prevItemId: 'clase-3',
    nextItemId: 'clase-5'
  },

  {
    id: 'clase-5',
    number: 5,
    type: 'class',
    title: 'Clase 5 – Recursión',
    topic: 'Casos base y recursivos, la pila de llamadas (Call Stack) y pensamiento recursivo',
    cormenChapter: 'Capítulo 3 y 4.4: Recursividad y Árbo\les de Recursión',
    durationMinutes: 60,
    summary: 'Compr\ender cómo una función se llama a sí misma dividi\endo problemas en subproblemas idénticos más pequeños hasta alcanzar el caso base.',
    theoryContent: `
### 1. El Concepto de Recursión
La **recursión** es una técnica donde una función se define en términos de sí misma. 

Toda función recursiva bien diseñada DEBE constar de dos componentes sagrados:
1. **Caso Base (Condición de parada)**: Un estado trivial que se resuelve directamente sin volver a llamar a la función. ¡Evita que el programa entre en un bucle infinito!
2. **Caso Recursivo**: El paso donde la función realiza una llamada a sí misma, pasando una versión **más pequeña** o reducida del problema original.

---

### 2. La Pila de Llamadas (Call Stack) en Memoria
Cuando una función recursiva se ejecuta, cada llamada genera un **marco de pila (stack frame)** que guarda sus variables loca\les y la dirección de retorno.

#### Ejemplo: Factorial de $n$ ($n!$)
Definición matemática:
$$n! = \begin{cases} 1 & \\text{si } n = 0 \\text{ o } n = 1 \\text{ (Caso Base)} \\ n \\times (n-1)! & \\text{si } n > 1 \\text{ (Caso Recursivo)} \\\end{cases}$$

Traza de ejecución para \`factorial(3)\`:
1. \`factorial(3)\` invoca \`3 * factorial(2)\` (Espera en pila)
2. \`factorial(2)\` invoca \`2 * factorial(1)\` (Espera en pila)
3. \`factorial(1)\` alcanza el Caso Base y retorna \`1\`
4. Se desapila: \`factorial(2)\` retorna \`2 * 1 = 2\`
5. Se desapila: \`factorial(3)\` retorna \`3 * 2 = 6\`
    `,
    visualizerType: 'recursion_tree',
    checkQuestions: [
      {
        id: 'q5-1',
        question: '¿Qué sucede si escribimos una función recursiva y olvidamos colocar el Caso Base?',
        options: [
          'La función se ejecuta en tiempo $O(1)$.',
          'Ocurrirá un desbordamiento de pila (Stack Overflow) porque las llamadas se acumularán infinitamente en la memoria.',
          'La función retornará 0 automáticamente.',
          'El compilador convertirá la función en un bucle for estático.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Sin un caso base la memoria de la pila (Call Stack) se agota rindi\endo el error "Maximum call stack size exceeded".',
        analogousExplanation: 'Es como verse entre dos espejos para\lelos enfrentados: el ref\lejo se repite infinitamente en profundidad hasta que el marco físico (caso base) corta la ima\gen.'
      }
    ],
    exercises: [
      {
        id: "ex-5",
        title: "Ejercicio 5: Factorial Recursivo en C",
        description: "Implementa la función en C `int factorial(int n)` que calcule el factorial de un número entero positivo de manera recursiva.",
        cormenRef: "Cormen Cap 3.2 - Funciones Recursivas",
        initialCode: "#include <stdio.h>\n\nint factorial(int n) {\n  // Caso base: si n <= 1 retorna 1\n  // Caso recursivo: n * factorial(n - 1)\n  \n  // TODO: Escribe el código en C\n  return 1;\n}",
        solutionCode: "#include <stdio.h>\n\nint factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
        hint: "Si `n <= 1`, retorna 1. En caso contrario, retorna `n * factorial(n - 1)`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Factorial de 5",
                    "input": "5",
                    "expectedOutput": "120"
          },
          {
                    "id": "t2",
                    "description": "Factorial de 0",
                    "input": "0",
                    "expectedOutput": "1"
          },
          {
                    "id": "t3",
                    "description": "Factorial de 3",
                    "input": "3",
                    "expectedOutput": "6"
          }
],
        explanation: "Cada llamada recursiva apila un marco en la pila de llamadas de C hasta llegar al caso base $n le 1$."
      }
    ],
    prevItemId: 'clase-5',
    nextItemId: 'taller-1'
  },

  {
    id: 'taller-1',
    number: 1,
    type: 'workshop',
    title: 'Tal\ler 1 – Recursión Práctica (Tal\ler Obligatorio)',
    topic: 'Resolución guiada de ejercicios intensivos del libro de Cormen',
    cormenChapter: 'Capítulo 4: Divide y Vencerás & Prob\lemas de Recursión',
    durationMinutes: 70,
    summary: 'Tal\ler práctico obligatorio: resolución paso a paso de Torres de Hanói, suma de dígitos y la inversión recursiva de un arreglo.',
    theoryContent: `
### 🎯 Bienvenido al Tal\ler 1 de Recursión
En este taller no hay teoría abstracta nueva. Vamos a aplicar directamente el pensamiento recursivo a tres problemas emb\lemáticos del libro de Cormen.

#### Desafíos del Taller:
1. **Suma de Dígitos Recursiva**: Dado un número entero positivo (ej: $1234$), calcular $1 + 2 + 3 + 4 = 10$ mediante $n \% 10 + \\text{suma}(\\\\lfloor n / 10 \rfloor)$.
2. **Inversión de Arreglo Recursivo**: Invertir un arreglo intercambiando el elemento izquierdo y derecho recursivamente.
3. **Torres de Hanói**: Mover $n$ discos del poste A al C apoyándose en el poste B.
    `,
    visualizerType: 'recursion_tree',
    checkQuestions: [
      {
        id: 'qt1-1',
        question: 'En el problema de las Torres de Hanói con $n$ discos, ¿cuál es el número mínimo de movimientos necesarios?',
        options: ['$2^n - 1$', '$n^2$', '$n \\\log n$', '$2n$'],
        correctIndex: 0,
        explanation: '¡Exce\lente! La recurrencia $T(n) = 2T(n-1) + 1$ se resuelve en $T(n) = 2^n - 1$ movimientos.',
        analogousExplanation: 'Para 1 disco = 1 mov. Para 2 discos = 3 mov. Para 3 discos = 7 mov ($2^3 - 1 = 7$). Crece de forma exponencial.'
      }
    ],
    exercises: [
      {
        id: "ex-t1-1",
        title: "Ejercicio Taller 1.1: Suma Recursiva de Arreglo en C",
        description: "Implementa la función recursiva en C `int sumaRecursivaArreglo(int arr[], int n)` que calcule la suma de los $n$ elementos de un arreglo sin usar bucles `for` ni `while`.",
        cormenRef: "Taller 1 - Ejercicio Práctico Obligatorio",
        initialCode: "#include <stdio.h>\n\nint sumaRecursivaArreglo(int arr[], int n) {\n  // Caso base: si n <= 0 retorna 0\n  // Caso recursivo: arr[n - 1] + sumaRecursivaArreglo(arr, n - 1)\n  \n  // TODO: Escribe tu código en C\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n\nint sumaRecursivaArreglo(int arr[], int n) {\n  if (n <= 0) return 0;\n  return arr[n - 1] + sumaRecursivaArreglo(arr, n - 1);\n}",
        hint: "Suma el último elemento actual `arr[n - 1]` con la suma de los primeros `n - 1` elementos.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Suma [1, 2, 3, 4, 5], n=5",
                    "input": "[1, 2, 3, 4, 5], 5",
                    "expectedOutput": "15"
          },
          {
                    "id": "t2",
                    "description": "Arreglo de 1 elemento [10], n=1",
                    "input": "[10], 1",
                    "expectedOutput": "10"
          }
],
        explanation: "La recursión divide el problema reduciendo el tamaño del arreglo en 1 en cada llamada hasta alcanzar $n=0$."
      }
    ],
    prevItemId: 'clase-5',
    nextItemId: 'clase-6'
  },

  {
    id: 'clase-6',
    number: 6,
    type: 'class',
    title: 'Clase 6 – Árbo\les',
    topic: 'Árbo\les binarios, recorridos (Inorden, Preorden, Postorden) y Árbo\les Binarios de Búsqueda (BST)',
    cormenChapter: 'Capítulo 12: Árbo\les Binarios de Búsqueda (Binary Search Trees)',
    durationMinutes: 60,
    summary: 'Estructura jerárquica no lineal: nodos con hijos izquierdo y derecho, propiedad de búsqueda de un BST y recorridos de árbol.',
    theoryContent: `
### 1. Concepto de Árbol Binario de Búsqueda (BST)
Según **Cormen Cap. 12.1**, un árbol binario es una estructura de datos jerárquica donde cada nodo contiene una clave (\`key\`), un puntero al hijo izquierdo (\`\left\`), un hijo derecho (\`right\`) y opcionalmente al padre (\`parent\`).

#### La Propiedad Invariante del BST:
Sea $x$ un nodo en un árbol binario de búsqueda:
* Si $y$ es un nodo en el **subárbol izquierdo** de $x$, entonces $y.key \le x.key$.
* Si $y$ es un nodo en el **subárbol derecho** de $x$, entonces $y.key \\\\ge x.key$.

---

### 2. Recorridos de Árbol (Tree Traversals)
1. **Inorden (Inorder)**: Recorre Subárbol Izquierdo $\rightarrow$ Nodo Raíz $\rightarrow$ Subárbol Derecho. 
   * **¡Propiedad Mágica!**: Imprime las claves de un BST en **orden estrictamente creciente (ordenado)**.
2. **Preorden (Preorder)**: Nodo Raíz $\rightarrow$ Subárbol Izquierdo $\rightarrow$ Subárbol Derecho. (Ideal para copiar un árbol).
3. **Postorden (Postorder)**: Subárbol Izquierdo $\rightarrow$ Subárbol Derecho $\rightarrow$ Nodo Raíz. (Ideal para liberar memoria o borrar nodos).
    `,
    visualizerType: 'binary_tree',
    checkQuestions: [
      {
        id: 'q6-1',
        question: 'Si ejecutamos un recorrido INORDEN (Inorder Traversal) sobre un Árbol Binario de Búsqueda (BST), ¿en qué secuencia se procesan las claves?',
        options: [
          'En orden totalmente a\leatorio.',
          'En orden estrictamente asc\endente (ordenado de menor a mayor).',
          'De mayor a menor obligatoriamente.',
          'En orden de nivel por nivel.'
        ],
        correctIndex: 1,
        explanation: '¡Exce\lente! Debido a la propiedad del BST ($Izquierdo \le Raíz \le Derecho$), el recorrido Inorden visita las claves ordenadas perfectamente.',
        analogousExplanation: 'Imagina una biblioteca ordenada por código: Inorden recorre primero el estante izquierdo (menores), luego la mesa central (raíz) y finalmente el estante derecho (mayores).'
      }
    ],
    exercises: [
      {
        id: "ex-6",
        title: "Ejercicio 6: Búsqueda en un Árbol Binario de Búsqueda (BST) en C",
        description: "Dada la estructura `struct NodoBST { int valor; struct NodoBST *izq; struct NodoBST *der; };`, escribe la función `bool buscarBST(struct NodoBST *raiz, int x)` que devuelva `true` si `x` está en el BST o `false` en caso contrario.",
        cormenRef: "Cormen Cap 12.2 - Búsqueda en Árboles BST",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  if (raiz == NULL) return false;\n  // TODO: Compara raiz->valor con x para decidir ir a la izquierda o derecha\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  if (raiz == NULL) return false;\n  if (raiz->valor == x) return true;\n  if (x < raiz->valor) {\n    return buscarBST(raiz->izq, x);\n  } else {\n    return buscarBST(raiz->der, x);\n  }\n}",
        hint: "Si `raiz->valor == x`, retorne `true`. Si `x < raiz->valor`, busque en `raiz->izq`, de lo contrario en `raiz->der`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Buscar 15 en raíz valor=10 (der con 15)",
                    "input": "{ valor: 10, izq: null, der: { valor: 15, izq: null, der: null } }, 15",
                    "expectedOutput": "true"
          },
          {
                    "id": "t2",
                    "description": "Buscar 99 no existente",
                    "input": "{ valor: 10, izq: null, der: null }, 99",
                    "expectedOutput": "false"
          }
],
        explanation: "Aprovecha la propiedad del BST: los valores menores están en el subárbol izquierdo y los mayores en el derecho, ofreciendo búsqueda en $O(h)$."
      }
    ],
    prevItemId: 'taller-1',
    nextItemId: 'clase-7'
  },

  {
    id: 'clase-7',
    number: 7,
    type: 'review',
    title: 'Clase 7 – Repaso Integrador (Listas, Recursión y Árbo\les)',
    topic: 'Sesión de consolidación de conceptos fundamenta\les antes del Análisis Asintótico',
    cormenChapter: 'Consolidación de Capítulos 4, 10 y 12',
    durationMinutes: 50,
    summary: 'Conectar las estructuras de datos dinámicas con el razonamiento recursivo. Desafíos integrados.',
    theoryContent: `
### 🔄 Sesión de Consolidación Integradora
Hemos cubierto tres pilares fundamenta\les de las ciencias de la computación:
1. **Listas Enlazadas**: Secuencia de punteros en memoria RAM.
2. **Recursión**: Dividir un problema en instancias idénticas más pequeñas sobre la Pila de Llamadas.
3. **Árbo\les Binarios**: Estructura de ramificación dob\le no lineal ideal para búsquedas eficientes.

¿Cómo se conectan estos tres temas?
¡Un árbol es intrínsecamente una estructura recursiva! La raíz de un árbol tiene dos subárbo\les (izquierdo y derecho) que a su vez son árbo\les.
    `,
    visualizerType: 'binary_tree',
    checkQuestions: [
      {
        id: 'q7-1',
        question: '¿Por qué la mayoría de las operaciones sobre árbo\les binarios se escriben de forma recursiva?',
        options: [
          'Porque los árbo\les son estructuras naturalmente recursivas donde cada subárbol es en sí mismo un árbol binario.',
          'Porque C no permite bucles sobre árbo\les.',
          'Porque la recursión usa menos memoria que un bucle.',
          'Porque el libro de Cormen lo exi\\\ge obligatoriamente.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! El caso base sue\le ser el árbol vacío (null) y el caso recursivo procesa la raíz y llama recursivamente a \left y right.',
        analogousExplanation: 'Un árbol botánico real está hecho de ramas: si cortas una rama principal, parece un árbol más pequeño comp\leto.'
      }
    ],
    exercises: [
      {
        id: "ex-7",
        title: "Ejercicio 7: Calcular la Altura Recursiva de un Árbol en C",
        description: "Escribe una función en C `int calcularAltura(struct NodoBST *raiz)` que calcule la altura de un árbol binario recursivamente (un árbol vacío `NULL` tiene altura 0).",
        cormenRef: "Cormen Cap 12.1 - Propiedades de Árboles",
        initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  // Caso base: si raiz == NULL retorna 0\n  // Caso recursivo: 1 + maxVal(calcularAltura(izq), calcularAltura(der))\n  \n  // TODO: Escribe el código en C\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  return 1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der));\n}",
        hint: "Si `raiz == NULL`, retorna 0. Retorna `1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der))`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Árbol con raíz y un hijo",
                    "input": "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: null }",
                    "expectedOutput": "2"
          },
          {
                    "id": "t2",
                    "description": "Árbol vacío (NULL)",
                    "input": "null",
                    "expectedOutput": "0"
          }
],
        explanation: "La altura se calcula desde las hojas hacia la raíz sumando 1 por cada nivel del camino más largo."
      }
    ],
    prevItemId: 'clase-6',
    nextItemId: 'clase-8'
  },

  {
    id: 'clase-8',
    number: 8,
    type: 'class',
    title: 'Clase 8 – Análisis Asintótico',
    topic: 'Notaciones Big-O (O), \\\Omega (Ω) y \\\Theta (Θ), análisis de peores/mejores casos y reglas prácticas',
    cormenChapter: 'Capítulo 3: Crecimiento de las funciones (Asymptotic Notation)',
    durationMinutes: 65,
    summary: 'Apr\ender la notación matemática formal para clasificar algoritmos ignorando constantes insignificantes a gran escala.',
    theoryContent: `
### 1. Las Tres Notaciones Asintóticas de Cormen (CLRS Cap. 3.1)

Cuando analizadas la eficiencia de un algoritmo, no nos interesan los milisegundos exactos en una computadora determinada, sino la **tasa de crecimiento** del tiempo de ejecución cuando $n \to \\\infty$.

#### A. Notación $O$ Grande (Big-O) - Cota Superior
$$O(g(n)) = \{ f(n) : \\text{existen constantes positivas } c, n_0 \\text{ ta\les que } 0 \le f(n) \le c \\cdot g(n) \\text{ para todo } n \\\\ge n_0 \}$$
* **Significado Intuitivo**: Garantía del **Peor Caso** (Worst-case). El algoritmo *NUNCA* tardará más que esta cota.

#### B. Notación $\\\\Omega$ (\\\Omega Grande) - Cota Inferior
$$\\\\Omega(g(n)) = \{ f(n) : \\text{existen constantes } c, n_0 > 0 \\text{ ta\les que } 0 \le c \\cdot g(n) \le f(n) \\text{ para todo } n \\\\ge n_0 \}$$
* **Significado Intuitivo**: Cota del **Mejor Caso** (Best-case). El algoritmo tardará *AL MENOS* esta cantidad de tiempo.

#### C. Notación $\\\\Theta$ (\\\Theta) - Cota Ajustada (Tight Bound)
$$\\\\Theta(g(n)) = O(g(n)) \cap \\\\Omega(g(n))$$
* **Significado Intuitivo**: La notación ideal. El algoritmo está atrapado superior e inferiormente por la misma tasa de crecimiento.

---

### 2. Reglas Prácticas para Calcular la Notación $O$
1. **Descartar Términos de Menor Orden**: En $f(n) = 3n^3 + 100n^2 + 500$, el término dominante es $n^3$. Por lo tanto, $f(n) \in O(n^3)$.
2. **Ignorar Constantes Multiplicativas**: $O(5000 \\cdot n) \implies O(n)$.
3. **Suma de Operaciones**: Si una parte toma $O(n)$ y otra $O(n^2)$, la suma es $O(n^2)$.
4. **Bucles Anidados**: Si un bucle interno corre $n$ veces dentro de un bucle externo de $n$ veces, la complejidad es $O(n \\times n) = O(n^2)$.
    `,
    visualizerType: 'big_o_chart',
    checkQuestions: [
      {
        id: 'q8-1',
        question: 'Si un algoritmo realiza exactamente $f(n) = 5n^2 + 30n + 1000$ operaciones, ¿cuál es su clasificación simplificada en notación Big-O?',
        options: ['$O(n^2)$', '$O(5n^2)$', '$O(n^3)$', '$O(30n)$'],
        correctIndex: 0,
        explanation: '¡Correcto! Eliminamos los términos de menor grado (30n y 1000) y la constante multiplicativa 5, quedando únicamente $O(n^2)$.',
        analogousExplanation: 'Si vas a comprar una casa de 1 millón de dólares y te cobran 5 dólares por un café en el camino, el costo total sigue si\endo aproximadamente 1 millón.'
      }
    ],
    exercises: [
      {
        id: "ex-8",
        title: "Ejercicio 8: Identificación de Complejidad Cuadrática en C",
        description: "Escribe una función en C `int analizarMatriz(int n)` con dos bucles `for` anidados que cuente y devuelva la cantidad total de iteraciones $n \times n$.",
        cormenRef: "Cormen Cap 3.1 - Notaciones Asintóticas",
        initialCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  // TODO: Escribe dos bucles anidados i de 0 a n-1 y j de 0 a n-1 incrementando contador\n  return contador;\n}",
        solutionCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      contador++;\n    }\n  }\n  return contador;\n}",
        hint: "Escribe un bucle `for(int i=0; i<n; i++)` que contenga `for(int j=0; j<n; j++) contador++;`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Para n = 4",
                    "input": "4",
                    "expectedOutput": "16"
          },
          {
                    "id": "t2",
                    "description": "Para n = 10",
                    "input": "10",
                    "expectedOutput": "100"
          }
],
        explanation: "Dos bucles anidados independientes de 0 a $n-1$ ejecutan exactamente $n \times n = n^2$ instrucciones, con complejidad $\\Theta(n^2)$."
      }
    ],
    prevItemId: 'clase-7',
    nextItemId: 'clase-9'
  },

  {
    id: 'clase-9',
    number: 9,
    type: 'class',
    title: 'Clase 9 – Recurrencias y Método Maestro',
    topic: 'Análisis de algoritmos recursivos, resolución de ecuaciones de recurrencia y el Teorema Maestro',
    cormenChapter: 'Capítulo 4: Método Maestro y Árbo\les de Recurrencia',
    durationMinutes: 65,
    summary: 'Apr\ender la herramienta matemática definitiva de Cormen para resolver la complejidad de algoritmos tipo Divide y Vencerás.',
    theoryContent: `
### 1. Ecuaciones de Recurrencia
Cuando un algoritmo es recursivo, su tiempo de ejecución se describe mediante una **ecuación de recurrencia**. 

Por ejemplo, para Mergesort:
$$T(n) = 2T(n/2) + \\\\Theta(n)$$
Significa: Dividimos el problema de tamaño $n$ en **2 subproblemas** de tamaño **$n/2$**, y combinarlos toma tiempo lineal **$\\\\Theta(n)$**.

---

### 2. El Teorema Maestro (Master Theorem) de Cormen (Cap 4.5)
Aplica a recurrencias de la forma general:
$$T(n) = aT(n/b) + f(n)$$
Donde $a \\\\ge 1$ (número de subproblemas), $b > 1$ (factor de división) y $f(n)$ es el costo de dividir y combinar.

Comparamos $f(n)$ contra la función crítica $n^{\\log_b a}$:

1. **Caso 1**: Si $f(n) = O(n^{\\log_b a - \epsilon})$ para algún $\epsilon > 0$, entonces:
   $$T(n) = \\\\Theta(n^{\\log_b a})$$
2. **Caso 2**: Si $f(n) = \\\\Theta(n^{\\log_b a})$, entonces:
   $$T(n) = \\\\Theta(n^{\\log_b a} \\log n)$$
3. **Caso 3**: Si $f(n) = \\\\Omega(n^{\\log_b a + \epsilon})$ y se cump\le la condición de regularidad, entonces:
   $$T(n) = \\\\Theta(f(n))$$
    `,
    visualizerType: 'recursion_tree',
    checkQuestions: [
      {
        id: 'q9-1',
        question: 'Dada la recurrencia de Búsqueda Binaria $T(n) = 1T(n/2) + \\\\Theta(1)$, donde $a=1, b=2 \implies n^{\\log_2 1} = n^0 = 1$. ¿Qué caso del Método Maestro aplica?',
        options: [
          'Caso 2, ya que $f(n) = \\\\\Theta(1) = \\\\\Theta(n^{\\log_b a})$, obteni\endo $T(n) = \\\\\Theta(\\\log n)$.',
          'Caso 1, dando $T(n) = \\\\\Theta(n^2)$.',
          'Caso 3, dando $T(n) = \\\\\Theta(n)$.',
          'No se puede aplicar el método maestro.'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente cálculo! Como $f(n) = \\\\Theta(1)$ equivale a $n^0$, aplica el Caso 2 dando $T(n) = \\\\Theta(\\log n)$.',
        analogousExplanation: 'En cada paso descartas la mitad de las páginas de un libro. La cantidad de cortes que puedes hacer antes de l\legar a 1 página es $\\log_2 n$.'
      }
    ],
    exercises: [
      {
        id: "ex-9",
        title: "Ejercicio 9: Evaluador de Casos del Método Maestro en C",
        description: "Implementa la función en C `const char* resolverMetodoMaestro(double a, double b, double d)` que retorne el tiempo asintótico según los 3 casos del Método Maestro.",
        cormenRef: "Cormen Cap 4.5 - Método Maestro",
        initialCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* resolverMetodoMaestro(double a, double b, double d) {\n  // log_b(a) = log(a) / log(b)\n  // Compara log_b(a) contra d\n  \n  // TODO: Escribe tu lógica en C\n  return \"\";\n}",
        solutionCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* resolverMetodoMaestro(double a, double b, double d) {\n  double log_b_a = log(a) / log(b);\n  if (fabs(log_b_a - d) < 0.0001) {\n    return \"Case 2: Theta(n^d * log n)\";\n  } else if (log_b_a > d) {\n    return \"Case 1: Theta(n^log_b_a)\";\n  } else {\n    return \"Case 3: Theta(n^d)\";\n  }\n}",
        hint: "Calcula `double log_b_a = log(a) / log(b);` usando `<math.h>` y compara con `d`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "a=2, b=2, d=1 (log_2(2)=1 == d=1)",
                    "input": "2, 2, 1",
                    "expectedOutput": "Case 2: Theta(n^d * log n)"
          },
          {
                    "id": "t2",
                    "description": "a=4, b=2, d=1 (log_2(4)=2 > d=1)",
                    "input": "4, 2, 1",
                    "expectedOutput": "Case 1: Theta(n^log_b_a)"
          }
],
        explanation: "El Método Maestro compara la tasa de división del trabajo $n^{\\log_b a}$ contra la función de combinación $f(n) = O(n^d)$."
      }
    ],
    prevItemId: 'clase-8',
    nextItemId: 'taller-2'
  },

  {
    id: 'taller-2',
    number: 2,
    type: 'workshop',
    title: 'Tal\ler 2 – Análisis Asintótico y Recurrencias (Tal\ler Obligatorio)',
    topic: 'Cálculo intensivo de O grande, análisis de fragmentos de código y recurrencias paso a paso',
    cormenChapter: 'Capítulos 3 y 4: Ejercicios se\leccionados de CLRS',
    durationMinutes: 70,
    summary: 'Tal\ler obligatorio de ejercitación técnica: determinar la complejidad exacta de fragmentos de código con bucles no trivia\les y árbo\les de recurrencia.',
    theoryContent: `
### 🎯 Bienvenido al Tal\ler 2 de Análisis Algorítmico
En este taller pondremos a prueba tu capacidad para mirar fragmentos de código rea\les o pseudo-código de Cormen y deducir inmediatamente su cota Big-O.

#### Desafíos del Taller:
1. **Análisis de Bucle Logarítmico**: ¿Qué complejidad tiene un bucle cuyo índice se multiplica por 2 en cada iteración (\`i = i * 2\`)?
2. **Cálculo de Big-O sobre bucle dep\endiente**: \`for (int i=1; i<=n; i++) for (int j=1; j<=i; j++)\`.
    `,
    visualizerType: 'big_o_chart',
    checkQuestions: [
      {
        id: 'qt2-1',
        question: '¿Cuál es la complejidad del siguiente bucle: `for (\let i = 1; i < n; i = i * 2) { ... }`?',
        options: ['$O(\\log_2 n)$', '$O(n)$', '$O(n^2)$', '$O(1)$'],
        correctIndex: 0,
        explanation: '¡Exce\lente! Dado que la variable $i$ se duplica en cada iteración ($1, 2, 4, 8, 16 \\dots$), alcanza el límite $n$ en $\\log_2 n$ pasos.',
        analogousExplanation: 'Si doblas una hoja por la mitad repetidamente, el grosor crece exponencialmente y solo puedes doblarla unos $\\log_2(\\text{grosor})$ pasos.'
      }
    ],
    exercises: [
      {
        id: "ex-t2-1",
        title: "Ejercicio Taller 2.1: Bucle Triangular Dependiente en C",
        description: "Implementa en C `int contarIteracionesTriangulares(int n)` con un bucle anidado $j le i$ para retornar la suma de la serie triangular $n(n+1)/2$.",
        cormenRef: "Taller 2 - Sumatorias Asintóticas",
        initialCode: "#include <stdio.h>\n\nint contarIteracionesTriangulares(int n) {\n  int ops = 0;\n  // TODO: Bucle externo i de 1 a n, interno j de 1 a i incrementando ops\n  return ops;\n}",
        solutionCode: "#include <stdio.h>\n\nint contarIteracionesTriangulares(int n) {\n  int ops = 0;\n  for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n      ops++;\n    }\n  }\n  return ops;\n}",
        hint: "El bucle interno corre `i` veces en la iteración `i`. La suma total es $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Para n = 5 (1+2+3+4+5)",
                    "input": "5",
                    "expectedOutput": "15"
          },
          {
                    "id": "t2",
                    "description": "Para n = 10",
                    "input": "10",
                    "expectedOutput": "55"
          }
],
        explanation: "Aunque el número de iteraciones no es $n^2$, la constante $1/2$ se descarta en Big-O, resultando en $\\Theta(n^2)$."
      }
    ],
    prevItemId: 'clase-9',
    nextItemId: 'clase-10'
  },

  {
    id: 'clase-10',
    number: 10,
    type: 'class',
    title: 'Clase 10 – Algoritmos de Búsqueda',
    topic: 'Búsqueda Lineal vs. Búsqueda Binaria y análisis de complejidad comparativo',
    cormenChapter: 'Capítulo 2.1 y 2.3: Búsqueda lineal y división binaria',
    durationMinutes: 50,
    summary: 'Comparación técnica entre escaneo secuencial en $O(n)$ e inspección dicotómica sobre arreglos ordenados en $O(\\log n)$.',
    theoryContent: `
### 1. Búsqueda Lineal (Linear Search)
Recorre el arreglo elemento por elemento desde $A[0]$ hasta $A[n-1]$ comparando contra el valor buscado $x$.
* **Peor Caso**: El elemento no está o está al final $\implies O(n)$.
* **Mejor Caso**: El elemento está en la primera posición $A[0] \implies O(1)$.
* **Requisito**: Funciona sobre arreglos desordenados.

---

### 2. Búsqueda Binaria (Binary Search) - Cormen Cap 2.3
**¡Requisito indispensable!**: El arreglo DEBE estar **previamente ordenado**.

#### Algoritmo:
1. Mantenemos dos punteros: \`low = 0\` y \`high = n - 1\`.
2. Calculamos el punto medio \`mid = floor((low + high) / 2)\`.
3. Si $A[mid] == x$, ¡encontrado!
4. Si $x < A[mid]$, descartamos toda la mitad derecha: \`high = mid - 1\`.
5. Si $x > A[mid]$, descartamos toda la mitad izquierda: \`low = mid + 1\`.

#### Complejidad:
En cada paso reducimos el espacio de búsqueda a la mitad ($n/2, n/4, n/8 \\dots$).
$$T(n) = O(\\log_2 n)$$

Para **1,000,000 de elementos**:
* Búsqueda Lineal: hasta **1,000,000 comparaciones**.
* Búsqueda Binaria: **máximo 20 comparaciones** ($2^{20} > 1,000,000$).
    `,
    visualizerType: 'sorting',
    checkQuestions: [
      {
        id: 'q10-1',
        question: '¿Cuál es la condición sine qua non (obligatoria) para poder aplicar la Búsqueda Binaria?',
        options: [
          'El arreglo debe ser de tamaño par.',
          'El arreglo debe estar previamente ordenado.',
          'La computadora debe ser de 64 bits.',
          'El arreglo debe guardarse en una lista enlazada.'
        ],
        correctIndex: 1,
        explanation: '¡Exce\lente! Sin un arreglo ordenado, descartar la mitad izquierda o derecha provocaría perder el elemento buscado.',
        analogousExplanation: 'Buscar en un diccionario impreso funciona rápido porque las palabras están ordenadas de la A a la Z. Si las páginas estuvieran desordenadas, t\endrías que \leer hoja por hoja (búsqueda lineal).'
      }
    ],
    exercises: [
      {
        id: "ex-10",
        title: "Ejercicio 10: Búsqueda Binaria en C",
        description: "Escribe la función en C `int busquedaBinaria(int arr[], int n, int x)` que devuelva el índice donde se encuentra `x` en un arreglo ordenado o `-1` si no existe.",
        cormenRef: "Cormen Cap 2.3 - Búsqueda Binaria",
        initialCode: "#include <stdio.h>\n\nint busquedaBinaria(int arr[], int n, int x) {\n  int low = 0;\n  int high = n - 1;\n  \n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    // TODO: Compara arr[mid] con x y ajusta low o high\n  }\n  \n  return -1;\n}",
        solutionCode: "#include <stdio.h>\n\nint busquedaBinaria(int arr[], int n, int x) {\n  int low = 0;\n  int high = n - 1;\n  \n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) return mid;\n    else if (x < arr[mid]) high = mid - 1;\n    else low = mid + 1;\n  }\n  \n  return -1;\n}",
        hint: "Si `arr[mid] == x` retorna `mid`. Si `x < arr[mid]` ajusta `high = mid - 1`, sino `low = mid + 1`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Buscar 30 en [10, 20, 30, 40, 50], n=5",
                    "input": "[10, 20, 30, 40, 50], 5, 30",
                    "expectedOutput": "2"
          },
          {
                    "id": "t2",
                    "description": "Buscar 99 no existente",
                    "input": "[10, 20, 30, 40, 50], 5, 99",
                    "expectedOutput": "-1"
          }
],
        explanation: "En cada paso se descarta la mitad del espacio de búsqueda, garantizando complejidad de tiempo $O(\\log n)$."
      }
    ],
    prevItemId: 'taller-2',
    nextItemId: 'clase-11'
  },

  {
    id: 'clase-11',
    number: 11,
    type: 'class',
    title: 'Clase 11 – Algoritmos de Ordenamiento (Parte 1)',
    topic: 'Ordenamiento por Inserción (Insertion Sort), Se\lección y Burbuja: $O(n^2)$ y estabilidad',
    cormenChapter: 'Capítulo 2.1: Ordenamiento por inserción (Insertion Sort)',
    durationMinutes: 60,
    summary: 'Estudio detallado de los algoritmos de ordenamiento e\lementa\les. La metáfora de las cartas de juego en Insertion Sort.',
    theoryContent: `
### 1. Ordenamiento por Inserción (Insertion Sort) - Cormen Cap 2.1
Cormen utiliza la ana\\logía clásica de **ordenar una mano de cartas de póquer**:
Empezamos con una mano vacía y tomamos las cartas una por una del mazo. Para insertar una nueva carta en su lugar correcto, la comparamos de derecha a izquierda con las cartas que ya tenemos en la mano.

#### Pseudocódigo de Cormen:
\`\`\`text
INSERTION-SORT(A)
1. for j = 2 to A.\length
2.     key = A[j]
3.     // Insertar A[j] en la secuencia ordenada A[1..j-1]
4.     i = j - 1
5.     while i > 0 and A[i] > key
6.         A[i + 1] = A[i]
7.         i = i - 1
8.     A[i + 1] = key
\`\`\`

#### Análisis de Complejidad:
* **Peor Caso (Arreglo en orden inverso)**: $O(n^2)$.
* **Mejor Caso (Arreglo ya ordenado)**: $O(n)$ (¡Solo realiza una pasada probando la condición!).
* **Espacio**: In-place ($O(1)$ memoria extra).
* **Estabilidad**: **Estable** (mantiene el orden relativo de elementos duplicados).
    `,
    visualizerType: 'sorting',
    checkQuestions: [
      {
        id: 'q11-1',
        question: '¿Por qué se dice que Insertion Sort tiene un mejor caso de tiempo $O(n)$?',
        options: [
          'Porque si el arreglo ya está comp\letamente ordenado, el bucle while interno nunca se ejecuta y solo se hace 1 comparación por cada elemento.',
          'Porque usa memoria secundaria.',
          'Porque siempre divide el arreglo a la mitad.',
          'Porque utiliza pivotes a\leatorios.'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! En el mejor caso (arreglo ordenado), Insertion Sort solo escanea los elementos linealmente verificando que ya están en su sitio.',
        analogousExplanation: 'Si te entregan un mazo de cartas ya ordenado del 1 al 10, solo pasas el dedo rápidamente verificando que cada carta es mayor que la anterior.'
      }
    ],
    exercises: [
      {
        id: "ex-11",
        title: "Ejercicio 11: Implementar Insertion Sort en C",
        description: "Escribe la función en C `void insertionSort(int arr[], int n)` que ordene in-place el arreglo usando el algoritmo de inserción de Cormen (Cap. 2.1).",
        cormenRef: "Cormen Cap 2.1 - Insertion Sort",
        initialCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    // TODO: Mueve los elementos mayores que key un lugar adelante\n    while (i >= 0 && arr[i] > key) {\n      arr[i + 1] = arr[i];\n      i = i - 1;\n    }\n    arr[i + 1] = key;\n  }\n}",
        solutionCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    while (i >= 0 && arr[i] > key) {\n      arr[i + 1] = arr[i];\n      i = i - 1;\n    }\n    arr[i + 1] = key;\n  }\n}",
        hint: "Mantiene una subsecuencia ordenada `arr[0..j-1]` e inserta la clave `key = arr[j]` en su posición correcta.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Ordenar [5, 2, 4, 6, 1, 3], n=6",
                    "input": "[5, 2, 4, 6, 1, 3], 6",
                    "expectedOutput": "undefined"
          }
],
        explanation: "Insertion Sort es un algoritmo eficiente para arreglos pequeños o casi ordenados con complejidad $O(n^2)$ en el peor caso."
      }
    ],
    prevItemId: 'clase-10',
    nextItemId: 'clase-12'
  },

  {
    id: 'clase-12',
    number: 12,
    type: 'class',
    title: 'Clase 12 – Algoritmos de Ordenamiento (Parte 2)',
    topic: 'Mergesort ($O(n \\\log n)$) y Quicksort (Particionamiento de Hoare/Lomuto, e\lección de pivote)',
    cormenChapter: 'Capítulos 2.3 (Mergesort) y 7 (Quicksort)',
    durationMinutes: 65,
    summary: 'Los reyes del ordenamiento eficientes por Divide y Vencerás: garantía lineal-\\logarítmica en Mergesort vs r\endimiento práctico veloz de Quicksort.',
    theoryContent: `
### 1. Mergesort (Ordenamiento por Mezcla) - Cormen Cap 2.3
Sigue el paradigma **Divide y Vencerás**:
1. **Divide**: Divide la secuencia de $n$ elementos en dos subsecuencias de $n/2$ elementos.
2. **Vence (Conquer)**: Ordena las dos subsecuencias de forma recursiva usando Mergesort.
3. **Combina (Combine)**: Mezcla (\`MERGE\`) las dos subsecuencias ordenadas para producir la secuencia final ordenada.

#### Complejidad:
Garantizada en **Peor, Promedio y Mejor Caso**:
$$\\\\Theta(n \\log_2 n)$$
* **Desventaja**: Requiere memoria auxiliar $O(n)$ para los arreglos tempora\les de mezcla.

---

### 2. Quicksort - Cormen Cap. 7
Quicksort también aplica Divide y Vencerás, pero **todo el trabajo pesado se hace en la fase de división (\`PARTITION\`)**:

1. **Se\lección de Pivote**: Eli\\\ge un elemento $x = A[r]$ como **pivote**.
2. **Partición (Partition)**: Reorganiza el arreglo de modo que todos los elementos menores o igua\les al pivote queden a su izquierda, y todos los mayores a su derecha.
3. **Llamadas Recursivas**: Ordena recursivamente el subarreglo izquierdo y derecho.

#### Complejidad:
* **Caso Promedio**: $O(n \\log n)$ (Prácticamente el más veloz en memoria RAM debido a localidad de caché).
* **Peor Caso**: $O(n^2)$ (Ocurre si el pivote e\legido es siempre el mínimo o máximo absoluto de un arreglo ya ordenado).
* **Estrategia**: E\legir pivotes a\leatorios (**Randomized Quicksort** Cap 7.3) para evitar el peor caso.
    `,
    visualizerType: 'sorting',
    checkQuestions: [
      {
        id: 'q12-1',
        question: '¿Cuál es la principal diferencia funcional entre Mergesort y Quicksort respecto al uso de memoria auxiliar?',
        options: [
          'Mergesort requiere un arreglo auxiliar temporal de tamaño $O(n)$ para la fase de mezcla, mientras que Quicksort ordena in-place.',
          'Quicksort requiere más memoria RAM que Mergesort.',
          'Ambos requieren exactamente la misma memoria auxiliar.',
          'Mergesort no usa recursión.'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! Mergesort necesita espacio $O(n)$ para fusionar subarreglos ordenados, mientras que Quicksort reordena elementos directly in-place.',
        analogousExplanation: 'Mergesort es como ordenar dos pilas de cartas usando una mesa auxiliar para mezclarlas en orden. Quicksort acomoda las cartas dentro de la misma pila haci\endo huecos.'
      }
    ],
    exercises: [
      {
        id: "ex-12",
        title: "Ejercicio 12: Combinación (Merge) de Subarreglos en C",
        description: "Implementa en C la rutina `void merge(int arr[], int l, int m, int r)` para combinar dos subarreglos ordenados `arr[l..m]` y `arr[m+1..r]`.",
        cormenRef: "Cormen Cap 2.3 - Merge Sort",
        initialCode: "#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m - l + 1;\n  int n2 = r - m;\n  int L[100], R[100];\n  for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n  \n  // TODO: Combina L y R de nuevo en arr\n}",
        solutionCode: "#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m - l + 1;\n  int n2 = r - m;\n  int L[100], R[100];\n  for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n  \n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) {\n    if (L[i] <= R[j]) { arr[k] = L[i]; i++; }\n    else { arr[k] = R[j]; j++; }\n    k++;\n  }\n  while (i < n1) { arr[k] = L[i]; i++; k++; }\n  while (j < n2) { arr[k] = R[j]; j++; k++; }\n}",
        hint: "Compara `L[i]` y `R[j]`, coloca el menor en `arr[k]` y avanza el índice correspondiente.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Combinar subarreglos ordenados en [2, 4, 1, 3]",
                    "input": "[2, 4, 1, 3], 0, 1, 3",
                    "expectedOutput": "undefined"
          }
],
        explanation: "Merge realiza la mezcla lineal en tiempo $O(n_1 + n_2)$, formando la columna vertebral de Merge Sort $O(n \\log n)$."
      }
    ],
    prevItemId: 'clase-11',
    nextItemId: 'clase-13'
  },

  {
    id: 'clase-13',
    number: 13,
    type: 'class',
    title: 'Clase 13 – Algoritmos de Grafos (Parte 1)',
    topic: 'Representaciones de grafos (Matriz vs Lista de Adyacencia) y recorridos BFS (Anchura) y DFS (Profundidad)',
    cormenChapter: 'Capítulo 22: Algoritmos e\lementa\les de grafos',
    durationMinutes: 65,
    summary: 'Estructuras no linea\les en red: vértices $V$ y aristas $E$. Exploración por nive\les (BFS) vs exploración profunda (DFS).',
    theoryContent: `
### 1. Representación de Grafos - Cormen Cap 22.1
Un Grafo $G = (V, E)$ consiste en un conjunto de vértices $V$ y aristas $E$.

#### A. Lista de Adyacencia (Adjacency List)
Consiste en un arreglo de $|V|$ listas. Para cada vértice $u$, $Adj[u]$ contiene todos los vértices adyacentes a $u$.
* **Espacio**: $O(|V| + |E|)$ (¡Ideal para grafos dispersos!).

#### B. Matriz de Adyacencia (Adjacency Matrix)
Una matriz $|V| \\times |V|$ donde $A[u][v] = 1$ si hay arista entre $u$ y $v$, $0$ si no.
* **Espacio**: $O(|V|^2)$ (Ideal para grafos densos).

---

### 2. Recorridos de Grafos
* **BFS (Breadth-First Search / Búsqueda en Anchura)**:
  * Utiliza una **Cola (Queue / FIFO)**.
  * Explora el grafo por **nive\les de distancia (capas)** desde la fuente $s$.
  * Garantiza encontrar la distancia en número de aristas más corta en grafos no ponderados.
  * Complejidad: $O(|V| + |E|)$.

* **DFS (Depth-First Search / Búsqueda en Profundidad)**:
  * Utiliza una **Pila (Stack / LIFO)** o **Recursión**.
  * Explora "tan profundo como sea posible" a lo largo de cada rama antes de retroceder (backtracking).
  * Produce tiempos de descubrimiento $d[u]$ y finalización $f[u]$ crucia\les para Ordenamiento Topológico.
  * Complejidad: $O(|V| + |E|)$.
    `,
    visualizerType: 'graph_bfs_dfs',
    checkQuestions: [
      {
        id: 'q13-1',
        question: '¿Qué estructura de datos auxiliar utiliza la Búsqueda en Anchura (BFS) para explorar un grafo nivel por nivel?',
        options: [
          'Una Cola (Queue / FIFO - First In First Out)',
          'Una Pila (Stack / LIFO)',
          'Un Árbol Binario de Búsqueda',
          'Una matriz estática'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! BFS procesa los nodos en orden de l\legada usando una Cola, asegurando explorar todos los vecinos a distancia $d$ antes de pasar a $d+1$.',
        analogousExplanation: 'Es como la onda expansiva circular que se genera cuando tiras una piedra al agua: primero se moja el anillo de 1 metro, luego el de 2 metros, luego el de 3 metros.'
      }
    ],
    exercises: [
      {
        id: "ex-13",
        title: "Ejercicio 13: Recorrido BFS en Grafo sobre Matriz de Adyacencia en C",
        description: "Implementa la función en C `int bfsContarNodosConectados(int matriz[10][10], int n, int inicio)` que realice un recorrido BFS sobre una matriz de adyacencia y retorne cuántos nodos son alcanzables desde `inicio`.",
        cormenRef: "Cormen Cap 22.2 - Breadth-First Search",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0;\n  int cont = 0;\n  \n  // TODO: Inicializa cola y realiza el recorrido BFS\n  return cont;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0;\n  int cont = 0;\n  \n  visitados[inicio] = true;\n  cola[fin++] = inicio;\n  \n  while (frente < fin) {\n    int u = cola[frente++];\n    cont++;\n    for (int v = 0; v < n; v++) {\n      if (matriz[u][v] == 1 && !visitados[v]) {\n        visitados[v] = true;\n        cola[fin++] = v;\n      }\n    }\n  }\n  return cont;\n}",
        hint: "Usa la cola FIFO con `frente` y `fin` para procesar los vecinos no visitados.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Grafo conexo de 3 nodos",
                    "input": "[[0,1,0],[1,0,1],[0,1,0]], 3, 0",
                    "expectedOutput": "3"
          }
],
        explanation: "BFS explora nivel por nivel (amplitud) usando una cola FIFO, garantizando descubrir los caminos más cortos en grafos no ponderados."
      }
    ],
    prevItemId: 'clase-12',
    nextItemId: 'clase-14'
  },

  {
    id: 'clase-14',
    number: 14,
    type: 'class',
    title: 'Clase 14 – Algoritmos de Grafos (Parte 2)',
    topic: 'Árbo\les de Expansión Mínima (Prim y Kruskal) y Caminos Más Cortos (Algoritmo de Dijkstra)',
    cormenChapter: 'Capítulos 23 (Minimum Spanning Trees) y 24 (Single-Source Shortest Paths)',
    durationMinutes: 70,
    summary: 'Resolvi\endo problemas de optimización en redes ponderadas: infraestructura con Prim/Kruskal vs navegación GPS con Dijkstra.',
    theoryContent: `
### 1. Árbol de Expansión Mínima (MST - Minimum Spanning Tree) - Cormen Cap 23
Dado un grafo conexo no dirigido ponderado $G = (V, E)$, deseamos encontrar un subconjunto de aristas $T \subseteq E$ que conecte todos los vértices **sin ciclos** y cuyo **peso total sea mínimo**.

* **Algoritmo de Kruskal**:
  * Enfoque voraz (Greedy) sobre aristas.
  * Ordena todas las aristas de menor a mayor peso. Va agregando la arista más barata que no cree un ciclo (usando estructura Disjoint Set / Union-Find).
  * Complejidad: $O(|E| \\log |E|)$.

* **Algoritmo de Prim**:
  * Hace crecer un único árbol comenzando desde un nodo raíz.
  * En cada paso agrega el vértice más cercano fuera del árbol mediante una Cola de Prioridad (Min-Heap).
  * Complejidad: $O(|E| + |V| \\log |V|)$ con Fibonacci Heap.

---

### 2. Caminos Más Cortos desde una Fuente: Dijkstra - Cormen Cap 24.3
Resuelve el problema de encontrar la distancia mínima desde un nodo ori\gen $s$ a todos los demás nodos en un grafo ponderado **con pesos no negativos ($w(u,v) \\\\ge 0$)**.

#### Idea Clave de Dijkstra:
Mantiene una estimación de distancia $d[u]$ para cada nodo $u$. Utiliza relajación de aristas:
$$\\text{RELAX}(u, v, w): \\text{si } d[v] > d[u] + w(u,v) \implies d[v] = d[u] + w(u,v)$$
    `,
    visualizerType: 'dijkstra',
    checkQuestions: [
      {
        id: 'q14-1',
        question: '¿Cuál es la restricción fundamental sobre las aristas del grafo para que el Algoritmo de Dijkstra funcione correctamente?',
        options: [
          'Todas las aristas deben tener pesos NO NEGATIVOS ($w(u,v) \\\\\ge 0$).',
          'El grafo debe ser dirigido obligatoriamente.',
          'No pueden existir más de 10 nodos en total.',
          'Las aristas deben tener pesos negativos.'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! Si existen aristas con peso negativo, Dijkstra puede caer en estimaciones falsas voraces. (Para pesos negativos se utiliza Bellman-Ford).',
        analogousExplanation: 'Imagina que viajas en auto pagando peajes. Si existiera un peaje con costo negativo (te regalan dinero por pasar), volver a pasar en círculos reduciría infinitamente el costo, rompi\endo la lógica voraz.'
      }
    ],
    exercises: [
      {
        id: "ex-14",
        title: "Ejercicio 14: Relajación de Aristas de Dijkstra en C",
        description: "Implementa la función de relajación de Dijkstra `bool relajarArista(int u, int v, int peso, int dist[])` que actualice `dist[v]` si pasar por `u` ofrece una distancia menor.",
        cormenRef: "Cormen Cap 24.3 - Algoritmo de Dijkstra",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool relajarArista(int u, int v, int peso, int dist[]) {\n  // TODO: Si dist[u] + peso < dist[v], actualiza dist[v] y retorna true\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool relajarArista(int u, int v, int peso, int dist[]) {\n  if (dist[u] + peso < dist[v]) {\n    dist[v] = dist[u] + peso;\n    return true;\n  }\n  return false;\n}",
        hint: "Verifica si `dist[u] + peso < dist[v]`. Si es así, asigna `dist[v] = dist[u] + peso;` y retorna `true`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Relajar u=0, v=1, peso=5, dist=[0, 100]",
                    "input": "0, 1, 5, [0, 100]",
                    "expectedOutput": "true"
          }
],
        explanation: "La relajación prueba si la ruta actual a $v$ puede ser mejorada pasando por el nodo intermedio $u$."
      }
    ],
    prevItemId: 'clase-13',
    nextItemId: 'taller-3'
  },

  {
    id: 'taller-3',
    number: 3,
    type: 'workshop',
    title: 'Tal\ler 3 – Algoritmos de Grafos (Tal\ler Obligatorio)',
    topic: 'Ejecución manual de BFS, DFS, Dijkstra y MST Prim/Kruskal sobre grafos concretos',
    cormenChapter: 'Capítulos 22, 23 y 24: Prob\lemas integradores de grafos',
    durationMinutes: 75,
    summary: 'Tal\ler obligatorio: seguimiento paso a paso del estado de colas, vectores de distancia y conjuntos Union-Find.',
    theoryContent: `
### 🎯 Bienvenido al Tal\ler 3 de Grafos
En este taller resolveremos paso a paso cómo se comporta Dijkstra y Prim en redes rea\les.

#### Desafíos del Taller:
1. **Traza Manual de Dijkstra**: Dado un grafo con 5 nodos, registrar el vector de distancias \`d\` en cada extracción del nodo mínimo.
2. **Kruskal con Aristas**: Ordenar aristas por peso y detectar ciclos antes de unir componentes.
    `,
    visualizerType: 'dijkstra',
    checkQuestions: [
      {
        id: 'qt3-1',
        question: 'En el Algoritmo de Kruskal, ¿qué estructura de datos nos permite verificar en tiempo casi constante si agregar una arista creará un ciclo?',
        options: [
          'Conjuntos Disjuntos (Disjoint Set / Union-Find con compresión de caminos)',
          'Una pila LIFO estática',
          'Una matriz de adyacencia comp\leta',
          'Un árbol AVL'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! La estructura Union-Find permite realizar `Find-Set(u)` y `Find-Set(v)` para ver si ya pertenecen a la misma componente conexa en tiempo $O(\\\alpha(n))$.',
        analogousExplanation: 'Imagina que cada isla conectada tiene un color. Antes de construir un puente entre dos islas, verificas si ya tienen el mismo color. Si es así, el puente crearía un círculo cerrado inútil.'
      }
    ],
    exercises: [
      {
        id: "ex-t3-1",
        title: "Ejercicio Taller 3.1: Detección de Componentes Conexas (Disjoint Set) en C",
        description: "Implementa la función en C `bool conectaMismaComponente(int padres[], int u, int v)` usando la búsqueda de la raíz representante en un Disjoint Set.",
        cormenRef: "Taller 3 - Disjoint-Set Data Structures",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  // TODO: Retorna true si find(padres, u) == find(padres, v)\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  return find(padres, u) == find(padres, v);\n}",
        hint: "Retorna `find(padres, u) == find(padres, v)`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Misma componente padres=[0,0,2], u=0, v=1",
                    "input": "[0, 0, 2], 0, 1",
                    "expectedOutput": "true"
          }
],
        explanation: "Si dos nodos comparten el mismo representante raíz, pertenecen al mismo conjunto o componente conexa."
      }
    ],
    prevItemId: 'clase-14',
    nextItemId: 'clase-15'
  },

  {
    id: 'clase-15',
    number: 15,
    type: 'class',
    title: 'Clase 15 – Técnicas de Diseño de Algoritmos',
    topic: 'Divide y Vencerás, Programación Dinámica (Corte de Varilla, Mochila) y Algoritmos Voraces (Greedy)',
    cormenChapter: 'Capítulos 15 (Dynamic Programming) y 16 (Greedy Algorithms)',
    durationMinutes: 70,
    summary: 'Apr\ender cuándo reutilizar soluciones de subproblemas traslapados (Programación Dinámica) vs tomar decisiones óptimas loca\les (Voraces).',
    theoryContent: `
### 1. Programación Dinámica (Dynamic Programming) - Cormen Cap 15
Aplica cuando un problema tiene **Subproblemas Traslapados (Overlapping Subprob\lems)** y **Estructura de Subestructura Óptima**.

En lugar de resolver el mismo subproblema miles de veces de forma recursiva exponencial, guardamos las soluciones en una **Tabla Memoria (Memoization / Tabulation)**.

#### Ejemplo Clásico: Prob\lema del Corte de Varilla (Rod Cutting Cap 15.1)
Dada una varilla de longitud $n$ y una tabla de precios $p_i$ para varillas de tamaño $i$, encontrar la ganancia máxima $r_n$:
$$r_n = \max_{1 \le i \le n} (p_i + r_{n-i})$$

Sin programación dinámica toma $O(2^n)$. Con programación dinámica (bottom-up), ¡toma solo $O(n^2)$!

---

### 2. Algoritmos Voraces (Greedy Algorithms) - Cormen Cap 16
Toman la e\lección que parece **la mejor en el momento presente (óptimo local)** con la esperanza de l\legar al óptimo global.
* A diferencia de Programación Dinámica, nunca vuelven atrás a reconsiderar una decisión.
* Ejemplo: Código de Huffman (Cap 16.3) y Algoritmo de Dijkstra.
    `,
    visualizerType: 'dynamic_programming',
    checkQuestions: [
      {
        id: 'q15-1',
        question: '¿Cuál es la característica técnica clave que hace que un problema sea ideal para resolverse con Programación Dinámica?',
        options: [
          'Poseer subproblemas traslapados (los mismos subproblemas se repiten una y otra vez en el árbol recursivo).',
          'Que el problema no tenga solución.',
          'Que las entradas estén totalmente ordenadas.',
          'Que solo requiera un bucle while.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! Al memorizar la respuesta de subproblemas repetidos en una tabla, reducimos el tiempo de ejecución exponencial $O(2^n)$ a tiempo polinomial.',
        analogousExplanation: 'Si te preguntan cuánto es 1+1+1+1+1, dices 5. Si luego agregan un "+1" al final, no vuelves a sumar desde el primer 1: simplemente dices 5 + 1 = 6 porque memorizaste el subresultado anterior.'
      }
    ],
    exercises: [
      {
        id: "ex-15",
        title: "Ejercicio 15: Fibonacci con Programación Dinámica (DP) en C",
        description: "Implementa la función en C `long long fibonacciDP(int n)` utilizando un arreglo de memoria (Tabulación DP) para calcular el $n$-ésimo número de Fibonacci en tiempo $O(n)$.",
        cormenRef: "Cormen Cap 15.1 - Programación Dinámica",
        initialCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  // TODO: Asigna dp[0] = 0, dp[1] = 1 y llena la tabla hasta n\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}",
        hint: "Construye la tabla `dp[i] = dp[i-1] + dp[i-2]` de manera ascendente (Bottom-Up) desde $i=2$ hasta $n$.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Fibonacci de 10",
                    "input": "10",
                    "expectedOutput": "55"
          },
          {
                    "id": "t2",
                    "description": "Fibonacci de 1",
                    "input": "1",
                    "expectedOutput": "1"
          }
],
        explanation: "La Programación Dinámica evita recalculaciones redundantes almacenando soluciones a subproblemas superpuestos en $O(n)$ tiempo."
      }
    ],
    prevItemId: 'taller-3',
    nextItemId: 'clase-16'
  },

  {
    id: 'clase-16',
    number: 16,
    type: 'review',
    title: 'Clase 16 – Repaso Final y Cierre del Curso',
    topic: 'Resumen integral de los grandes temas, mapa mental de algoritmos y consejos para el futuro',
    cormenChapter: 'Conclusión y Visión Global de Algorítmica & Complejidad',
    durationMinutes: 50,
    summary: '¡Felicitaciones por comp\letar el curso! Repaso integrador del mapa de diseño de algoritmos y guía de estudio avanzado.',
    theoryContent: `
### 🎉 ¡Felicitaciones por l\legar a la meta final del Curso!

Has recorrido con éxito la totalidad del núc\leo fundamental del libro **"Introduction to Algorithms" de Cormen (CLRS)**.

#### Tu Mapa del Conocimiento Algorítmico:
1. **Fundamentos**: Complejidad Asintótica $O, \\\\Omega, \\\\Theta$, Punteros en memoria, Invariantes.
2. **Estructuras de Datos**: Arreglos contiguos, Listas Enlazadas, BST (Árbo\les Binarios de Búsqueda).
3. **Análisis de Recursión**: Método Maestro y Árbo\les de decisión.
4. **Búsqueda y Ordenamiento**: Búsqueda Binaria $O(\\log n)$, Mergesort $O(n \\log n)$, Quicksort in-place.
5. **Grafos**: BFS, DFS, Dijkstra, Prim y Kruskal.
6. **Diseño Avanzado**: Divide y Vencerás, Programación Dinámica y Algoritmos Voraces.

---

### Mensaje Final del Mentor IA:
*Esta clase ha terminado. ¡Has dominado con éxito el mapa de Algorítmica y Complejidad! Cuando estés listo para seguir practicando o Vibe Coding en tu VS Code, puedes usar la Guía incluida.*
    `,
    visualizerType: 'none',
    checkQuestions: [
      {
        id: 'q16-1',
        question: '¿Cuál es el paradigma de diseño que reutiliza respuestas de subproblemas repetidos guardándolas en tablas?',
        options: [
          'Programación Dinámica',
          'Búsqueda a ciegas',
          'Algoritmo Voraz sin memoria',
          'Fuerza Bruta pura'
        ],
        correctIndex: 0,
        explanation: '¡Exce\lente! Programación Dinámica es el pilar para transformar problemas exponencia\les en polinomia\les.',
        analogousExplanation: 'Es la libreta de apuntes que te evita volver a recalcular la misma ecuación dos veces.'
      }
    ],
    exercises: [
      {
        id: "ex-16",
        title: "Ejercicio Integrador Final: Secuencia Ordenada en C",
        description: "Escribe una función en C `bool esSecuenciaOrdenada(int arr[], int n)` que verifique en tiempo lineal $O(n)$ si un arreglo de enteros está ordenado en forma no decreciente.",
        cormenRef: "Cormen Cap 2 - Ejercicio Integrador de Cierre",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esSecuenciaOrdenada(int arr[], int n) {\n  // TODO: Recorre el arreglo de 0 a n-2. Si arr[i] > arr[i+1], retorna false.\n  return true;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esSecuenciaOrdenada(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    if (arr[i] > arr[i + 1]) {\n      return false;\n    }\n  }\n  return true;\n}",
        hint: "Usa un bucle `for (int i = 0; i < n - 1; i++)` y compara si `arr[i] > arr[i + 1]`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Secuencia ordenada [1, 2, 3, 4, 5], n=5",
                    "input": "[1, 2, 3, 4, 5], 5",
                    "expectedOutput": "true"
          },
          {
                    "id": "t2",
                    "description": "Secuencia desordenada [1, 3, 2, 5], n=4",
                    "input": "[1, 3, 2, 5], 4",
                    "expectedOutput": "false"
          }
],
        explanation: "Revisa pares adyacentes en una sola pasada $O(n)$. Si ningún elemento viola la condición de ordenación, el arreglo es válido."
      }
    ],
    prevItemId: 'clase-15'
  }
];

export const COURSES_DATA: CourseItem[] = RAW_COURSES_DATA.map((item) => ({
  ...item,
  exercises: EXERCISES_BY_COURSE[item.id] || item.exercises || [],
}));

