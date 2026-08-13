import { CChapter } from '../types';

export const C_COURSE_DATA: CChapter[] = [
  {
    id: 'cap-1',
    chapterNumber: 1,
    title: 'Capítulo 1: Introducción General (El Tutorial K&R)',
    subtitle: 'Fundamentos esenciales del Lenguaje C: Sintaxis, Memoria, Estructuras de Control, Tipos y Rangos',
    icon: '📘',
    description: 'Aprende la arquitectura básica de un programa en C, el flujo de compilación, la tabla completa de rangos de tipos primitivos, el fenómeno de integer overflow y el modelo de I/O de caracteres.',
    summary: 'El primer capítulo establece los cimientos del estándar C de Kernighan & Ritchie. Comprenderás el mapa de memoria, la compilación nativa, la tabla de rangos de datos con desbordamiento y el procesamiento de flujos con getchar/putchar.',
    keyConcepts: [
      '#include y stdio.h',
      'Función main() y código de salida',
      'Tabla de Rangos de Tipos Primitivos',
      'Integer Overflow y Complemento a Dos',
      'División Entera vs Flotante',
      'Ciclos while y for',
      'Constantes simbólicas (#define)',
      'getchar(), putchar() y EOF (-1)',
      'Arreglos y carácter nulo \\0',
      'Paso por valor (Pass-by-value)'
    ],
    analogies: [
      {
        title: 'El Programa C como una Receta de Cocina Industrial',
        concept: 'Estructura general de main() e inclusión de cabeceras',
        analogy: 'Las cabeceras (#include <stdio.h>) son la caja de utensilios importada a la cocina. La función main() es la receta principal que el chef (la CPU) ejecuta paso a paso desde la primera línea hasta colocar la bandeja terminada (return 0).',
        whyItWorks: 'Ayuda a visualizar que C no ejecuta nada por arte de magia: todo inicia formalmente en main() y requiere herramientas explícitas.'
      },
      {
        title: 'Entrada y Salida como una Cinta Transportadora de Bytes',
        concept: 'Flujos E/S con getchar() y putchar()',
        analogy: 'Un flujo de entrada (stdin) es como una cinta transportadora que entrega una caja (carácter) a la vez. getchar() toma la caja de la cinta y putchar() la coloca en la caja de despacho.',
        whyItWorks: 'Explica por qué C lee el texto carácter a carácter y por qué getchar() retorna un entero para reconocer la señal especial de cinta vacía (EOF).'
      },
      {
        title: 'Paso por Valor como Fotocopiar un Documento',
        concept: 'Argumentos de funciones en C (Pass-by-value)',
        analogy: 'Si le prestas una fotocopia de tus notas a un compañero y él hace anotaciones en ella, tus notas originales en tu libreta no se alteran en absoluto.',
        whyItWorks: 'Demuestra con claridad por qué modificar un parámetro dentro de una función en C no afecta la variable original en main().'
      }
    ],
    theoryContent: `
# Capítulo 1: Introducción General (El Tutorial K&R)

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

### C: La Lengua Franca de la Computación de Sistemas
El lenguaje **C** no es simplemente un lenguaje de programación más; es la infraestructura invisible sobre la cual opera el mundo digital moderno. Diseñado entre 1969 y 1973 por **Dennis Ritchie** en los Laboratorios Bell de AT&T para reescribir el sistema operativo UNIX, C logró una hazaña inédita: combinar la velocidad y el acceso directo a la memoria RAM propios del lenguaje Ensamblador con la abstracción elegante y estructurada de un lenguaje de alto nivel.

A diferencia de lenguajes interpretados o gestionados por una máquina virtual (como Python, JavaScript o Java), C se compila directamente a código máquina nativo del procesador. No existe una capa de gestión de memoria (*Garbage Collector*) ni abstracciones ocultas en tiempo de ejecución. Cada variable ocupa una ubicación física real en la memoria RAM y cada instrucción de C se traduce casi 1:1 a instrucciones de la CPU.

### Breve Contexto Histórico
* **1972 – Dennis Ritchie**: Diseña el lenguaje C en Bell Labs como sucesor del lenguaje B (de Ken Thompson).
* **1978 – Kernighan & Ritchie (K&R)**: Publican *The C Programming Language*, el célebre "Libro Blanco" que definió el primer estándar informal de C (*K&R C*).
* **1989 – ANSI C (C89/C90)**: Formaliza el estándar del lenguaje, introduciendo prototipos de funciones (\`void main(void)\`), calificadores \`const\` y bibliotecas estándar unificadas.

### Conexión Conceptual del Curso
Este primer capítulo del **Curso C Pro** establece las bases operativas esenciales. Antes de dominar punteros avanzados, estructuras complejas, asignación dinámica de memoria (\`malloc\`/\`free\`) e interfaces UNIX, es indispensable dominar el flujo de compilación, el mapa de memoria y el comportamiento preciso de los tipos primitivos.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 La Anatomía de un Programa C y el Flujo de Compilación
El proceso de conversión de código fuente \`.c\` a un binario ejecutable pasa por 4 etapas fundamentales:

1. **Preprocesamiento (\`cpp\`)**: Procesa todas las directivas que comienzan con \`#\`. Reemplaza \`#include <stdio.h>\` con el texto literal del archivo de cabecera y sustituye las macros definidas con \`#define\`.
2. **Compilación (\`gcc -S\`)**: Traduce el código C preprocesado a código fuente en **Lenguaje Ensamblador** específico de la arquitectura (x86_64 o ARM).
3. **Ensamblado (\`as\`)**: Convierte las instrucciones en ensamblador a código objeto binario nativo (archivo \`.o\` o \`.obj\`).
4. **Enlazado (*Linking*, \`ld\`)**: Combina el archivo objeto con las bibliotecas del sistema (como \`libc.so\` o \`msvcrt.dll\`) para producir el archivo ejecutable final.

#### Estructura Mínima
\`\`\`c
#include <stdio.h> // Directiva del preprocesador

int main(void) {   // Punto de entrada obligatorio
    printf("¡Hola, mundo! Estándar K&R C\\n");
    return 0;      // Estado de salida enviado al S.O. (0 = éxito)
}
\`\`\`

---

### 2.2 Tabla Completa de Tipos de Datos Primitivos, Tamaños y Rangos en C
En C, el tamaño de cada tipo de dato depende de la arquitectura del compilador (16, 32 o 64 bits). A continuación se presenta la especificación estándar ANSI C / POSIX para sistemas x86_64 modernos:

| Tipo de Dato | Tamaño (Bytes) | Tamaño (Bits) | Rango Mínimo | Rango Máximo | Especificador \`printf\` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| \`signed char\` | $1$ | $8$ | $-128$ | $+127$ | \`%c\` / \`%d\` |
| \`unsigned char\` | $1$ | $8$ | $0$ | $255$ | \`%u\` |
| \`short int\` | $2$ | $16$ | $-32,768$ | $+32,767$ | \`%hd\` |
| \`unsigned short\`| $2$ | $16$ | $0$ | $65,535$ | \`%hu\` |
| \`int\` | $4$ | $32$ | $-2,147,483,648$ | $+2,147,483,647$ | \`%d\` / \`%i\` |
| \`unsigned int\` | $4$ | $32$ | $0$ | $4,294,967,295$ | \`%u\` |
| \`long long\` | $8$ | $64$ | $-9,223,372,036,854,775,808$ | $+9,223,372,036,854,775,807$ | \`%lld\` |
| \`unsigned long long\`| $8$| $64$ | $0$ | $18,446,744,073,709,551,615$| \`%llu\` |
| \`float\` | $4$ | $32$ | $\approx 1.17 \times 10^{-38}$ | $\approx 3.40 \times 10^{38}$ (6-7 dígitos pred) | \`%f\` / \`%g\` |
| \`double\` | $8$ | $64$ | $\approx 2.22 \times 10^{-308}$ | $\approx 1.79 \times 10^{308}$ (15-17 dígitos pred)| \`%lf\` |

---

### 2.3 El Fenómeno del Integer Overflow (Desbordamiento)
¿Qué sucede cuando intentas incrementar una variable más allá de su rango máximo permitido?
En hardware con representación binaria de **Complemento a Dos** (*Two's Complement*), los bits desbordan hacia el bit de signo, provocando el comportamiento conocido como **Wrap-Around**.

#### Ejemplo Concreto de Overflow en \`signed char\`:
\`\`\`c
#include <stdio.h>

int main() {
    signed char c = 127; // Valor máximo de 8 bits firmados
    printf("Valor inicial: %d\\n", c); // Imprime 127
    
    c = c + 1; // OVERFLOW! 127 (01111111) + 1 = 10000000 en binario (-128)
    printf("Tras +1: %d\\n", c);       // Imprime -128
    return 0;
}
\`\`\`

---

### 2.4 Errores Comunes de los Desarrolladores C
1. **Atrapados en la División Entera**:
   La expresión \`5 / 9\` evalúa a \`0\` porque ambos operando son enteros (\`int\`). Para forzar una división en coma flotante, al menos uno de los operandos debe incluir punto decimal: \`5.0 / 9.0\` o \`(double)5 / 9\`.
2. **Confundir el Operador de Asignación \`=\` con el Operador de Igualdad \`==\`**:
   Un error devastador en C es escribir \`if (x = 5)\`. Esto no compara si \`x\` es igual a 5; asigna \`5\` a \`x\`, y dado que \`5\` es verdadero (no cero), la condición siempre se evalúa como verdadera.
3. **No Manejar Correctamente la Señal \`EOF\`**:
   La función \`getchar()\` no retorna un \`char\`, sino un \`int\`. Si almacenas el retorno de \`getchar()\` en un \`char\`, la comparación contra \`EOF\` (\`-1\`) fallará en arquitecturas donde \`char\` es por defecto sin signo (\`unsigned\`).
4. **Cadenas de Texto Sin Carácter Nulo de Terminación \`\\0\`**:
   Las funciones como \`printf("%s", str)\` leen memoria consecutivamente hasta encontrar un byte con valor \`0\`. Si creas un arreglo de caracteres sin \`'\\0'\`, \`printf\` leerá basura en RAM causando un desastre de segmentación (*Segmentation Fault*).

---

## 3. ANÁLISIS DE RECURSOS Y RENDIMIENTO EN C

### 3.1 Costo Computacional de Entrada/Salida
* \`printf("%d\\n", x)\` realiza formateo de cadenas en tiempo de ejecución, parseando la cadena de formato carácter por carácter, lo cual requiere cientos de ciclos de CPU.
* \`putchar(c)\` es una macro inmensamente más rápida optimizada para escribir un solo byte directamente en el búfer de salida de \`stdout\`.
* **Regla de Oro en C**: Para procesadores embebidos o lectura masiva de archivos de gigabytes, procesa mediante búfers con \`fread\`/\`fwrite\` o \`getchar\`/\`putchar\` en lugar de \`scanf\`/\`printf\` iterativos.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Kernel de Linux y Sistemas Operativos**:
   Casi el 98% de los kernels de Linux, macOS, Windows, iOS y Android están escritos en C ANSI puro por su capacidad de manipular registros de hardware y direcciones físicas de memoria RAM.
2. **Bases de Datos de Alto Rendimiento (SQLite y PostgreSQL)**:
   SQLite, la base de datos más utilizada en teléfonos inteligentes y navegadores del mundo, está escrita completamente en C estándar K&R/ANSI C.
3. **Motores de Juegos y Renderizado 3D**:
   Sistemas de bajo nivel como Unreal Engine Core, Vulkan API, OpenGL y bibliotecas como \`SDL2\` utilizan C/C++ para garantizar latencias de renderizado inferiores a 16 milisegundos (60+ FPS).

---

## 5. NOTAS DE IMPLEMENTACIÓN EN C

### Gotchas y Buffer Flushes
El búfer de \`stdout\` es gestionado por la biblioteca estándar \`stdio.h\`. Por defecto es **orientado a líneas** (*line-buffered*). Esto significa que \`printf("Hola")\` no enviará el texto a la terminal hasta que se imprima un salto de línea \`\\n\` o se llame explícitamente a \`fflush(stdout);\`.

---

## 6. GLOSARIO DE TÉRMINOS DEL CAPÍTULO

* **Preprocesador**: Fase inicial del compilador que resuelve directivas \`#include\` y sustituye macros \`#define\`.
* **Standard I/O (\`stdio.h\`)**: Biblioteca estándar de C encargada del manejo de flujos de entrada/salida (\`stdin\`, \`stdout\`, \`stderr\`).
* **EOF (End-Of-File)**: Constante entera negativa (usualmente \`-1\`) devuelta por \`getchar()\` al agotar el flujo de entrada.
* **Complemento a Dos**: Formato estándar de hardware binario para representar números enteros negativos mediante la inversión de bits más uno.
* **Carácter Nulo (\`\\0\`)**: Byte de valor cero (ASCII 0) utilizado como centinela para indicar el final de una cadena de caracteres en memoria RAM.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro K&R**:
  * **Kernighan & Ritchie**: Capítulo 1 completo (*A Tutorial Introduction*), Secciones 1.1 a 1.10 (págs. 5–38).
* **Guía de Uso de la Animación Interactiva del Capítulo**:
  * Utiliza la **Animación 2.1 (Mapa de Memoria)** para observar cómo se alinean los arreglos contiguos en RAM y el efecto del byte nulo \`\\0\`.
  * Utiliza la **Animación 2.2 (Simulador de I/O stdin/stdout)** para seguir cómo \`getchar()\` toma bytes de la cinta transportadora hasta detectar \`EOF\`.
* **Resumen en Una Frase**:
  > *"En C no existe magia ni capas ocultas: cada variable es un bloque físico de memoria RAM y cada instrucción se ejecuta directamente sobre el hardware nativo."*
`,
    codeExamples: [
      {
        title: '1. Tabla de Temperatura Fahrenheit - Celsius',
        description: 'Demostración de variables float, ciclo while y especificación de formato decimal.',
        code: `#include <stdio.h>

int main() {
    float fahr = 0;
    printf("  Fahrenheit   Celsius\\n");
    printf("  --------------------\\n");
    while (fahr <= 100) {
        float celsius = (5.0 / 9.0) * (fahr - 32.0);
        printf("   %6.1f C -> %6.2f C\\n", fahr, celsius);
        fahr += 25.0;
    }
    return 0;
}`,
        expectedOutput: `  Fahrenheit   Celsius\n  --------------------\n      0.0 C -> -17.78 C\n     25.0 C ->  -3.89 C\n     50.0 C ->  10.00 C\n     75.0 C ->  23.89 C\n    100.0 C ->  37.78 C`
      },
      {
        title: '2. Demostración Explícita de Integer Overflow',
        description: 'Muestra cómo el desbordamiento en signed char provoca wrap-around hacia números negativos.',
        code: `#include <stdio.h>

int main() {
    signed char c = 127;
    printf("Valor antes de desbordar: %d\\n", c);
    c = c + 1;
    printf("Valor tras desbordar (+1): %d\\n", c);
    return 0;
}`,
        expectedOutput: `Valor antes de desbordar: 127\nValor tras desbordar (+1): -128`
      }
    ],
    exercises: [
      {
        id: 'ex-cap1-niv1',
        title: 'Nivel 1 (Conceptual): Predicción de Salida de División Entera',
        description: 'Dado el programa C que calcula el promedio simple de dos calificaciones enteras, corrige la expresión para evitar la truncación decimal.',
        cormenRef: 'K&R Cap 1 - Sec 1.2',
        initialCode: `#include <stdio.h>

float calcularPromedio(int a, int b) {
    // BUG: (a + b) / 2 trunca decimales!
    return (a + b) / 2;
}

int main() {
    printf("Promedio: %.1f\\n", calcularPromedio(8, 9));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

float calcularPromedio(int a, int b) {
    // SOLUCIÓN: Usar 2.0f para forzar división en punto flotante
    return (a + b) / 2.0f;
}

int main() {
    printf("Promedio: %.1f\\n", calcularPromedio(8, 9));
    return 0;
}`,
        hint: 'Sustituye la constante entera `2` por la constante flotante `2.0f` para promocionar el cálculo.',
        testCases: [
          {
            id: 'tc-c1',
            description: 'Verificar promedio preciso de 8 y 9 (8.5)',
            input: '',
            expectedOutput: 'Promedio: 8.5'
          }
        ],
        explanation: 'Al usar `2.0f`, C promociona el resultado del paréntesis `(a + b)` a `float`, produciendo la respuesta exacta 8.5 en lugar de truncar a 8.0.'
      },
      {
        id: 'ex-cap1-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Encontrar el Bug de Bucle Infinito en getchar()',
        description: 'Un estudiante declaró la variable `char c` en lugar de `int c` para leer texto hasta encontrar `EOF`. Corrige el tipo de dato de la variable.',
        cormenRef: 'K&R Cap 1 - Sec 1.5.1',
        initialCode: `#include <stdio.h>

int procesarEntrada() {
    // BUG: c declarado como char no puede almacenar EOF (-1) de forma confiable en todos los compiladores
    char c = 'A';
    int conteo = 0;
    // Simulación: incrementa conteo 5 veces
    while (conteo < 5) {
        conteo++;
    }
    return conteo;
}`,
        solutionCode: `#include <stdio.h>

int procesarEntrada() {
    // SOLUCIÓN: Declarar c como int
    int c = 'A';
    int conteo = 0;
    while (conteo < 5) {
        conteo++;
    }
    return conteo;
}`,
        hint: 'Cambia la declaración `char c` por `int c`.',
        testCases: [
          {
            id: 'tc-c2',
            description: 'Verificar conteo correcto',
            input: '',
            expectedOutput: '5'
          }
        ],
        explanation: 'En C, `getchar()` devuelve un `int` de 32 bits para garantizar que el valor especial `-1` (`EOF`) no se confunda con un carácter válido de 8 bits.'
      },
      {
        id: 'ex-cap1-niv3-impl1',
        title: 'Nivel 3 (Implementación C): Impresión de Tabla Invertida Fahrenheit',
        description: 'Escribe un programa en C que imprima la tabla de conversiones de Fahrenheit a Celsius en orden inverso, desde 300°F hasta 0°F decreciendo de 20 en 20.',
        cormenRef: 'K&R Cap 1 - Ejercicio 1-5',
        initialCode: `#include <stdio.h>

int main() {
    // TODO: Escribe un ciclo for descendente desde 300 hasta 0
    // Formato de salida: "%3d F = %6.1f C\n"
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    for (int fahr = 300; fahr >= 0; fahr -= 20) {
        printf("%3d F = %6.1f C\\n", fahr, (5.0 / 9.0) * (fahr - 32.0));
    }
    return 0;
}`,
        hint: 'Utiliza la estructura de control `for (int fahr = 300; fahr >= 0; fahr -= 20)`.',
        testCases: [
          {
            id: 'tc-c3',
            description: 'Verificar primera línea para 300°F',
            input: '',
            expectedOutput: '300 F =  148.9 C'
          }
        ],
        explanation: 'El ciclo `for` decrece la variable en pasos de 20 hasta alcanzar 0, calculando con precisión de punto flotante la conversión.'
      },
      {
        id: 'ex-cap1-niv4-analisis',
        title: 'Nivel 4 (Análisis): Detector de Límites de Tipos (Limits.h)',
        description: 'Escribe una función C `int verificarRangoInt(long long val)` que devuelva `1` si el valor puede almacenarse dentro de un `int` de 32 bits firmado sin sufrir overflow, o `0` si provocará desbordamiento.',
        cormenRef: 'K&R Cap 2 - Tipos y Tamaños',
        initialCode: `#include <stdio.h>

int verificarRangoInt(long long val) {
    // Un int firmado de 32 bits abarca de -2147483648 a 2147483647
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int verificarRangoInt(long long val) {
    if (val >= -2147483648LL && val <= 2147483647LL) {
        return 1;
    }
    return 0;
}`,
        hint: 'Compara si `val >= -2147483648LL` y `val <= 2147483647LL`.',
        testCases: [
          {
            id: 'tc-c4a',
            description: 'Para val = 500000 (Dentro de rango)',
            input: '500000',
            expectedOutput: '1'
          },
          {
            id: 'tc-c4b',
            description: 'Para val = 3000000000 (Fuera de rango)',
            input: '3000000000',
            expectedOutput: '0'
          }
        ],
        explanation: 'Validar los rangos antes de realizar asignaciones evita bugs de overflow sutiles en aplicaciones críticas de C.'
      },
      {
        id: 'ex-cap1-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Parser de Palabras y Frecuencias ASCII',
        description: 'Implementa una función en C `int contarPalabras(const char *s)` que recorra una cadena de caracteres terminada en `\\0` utilizando una máquina de estados de dos posiciones (DENTRO_DE_PALABRA / FUERA_DE_PALABRA) y devuelva el número exacto de palabras. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 1 - Sec 1.5.4 (Conteo de Palabras)',
        initialCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    // TODO: Implementa la máquina de estados con bandera de estado (0 u 1)
    return 0;
}

int main() {
    char texto[] = "Estructuras de Datos y Algoritmos en C";
    printf("Palabras: %d\\n", contarPalabras(texto));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    int estado = 0; // 0 = FUERA, 1 = DENTRO
    int contador = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == ' ' || s[i] == '\\n' || s[i] == '\\t') {
            estado = 0;
        } else if (estado == 0) {
            estado = 1;
            contador++;
        }
    }
    return contador;
}

int main() {
    char texto[] = "Estructuras de Datos y Algoritmos en C";
    printf("Palabras: %d\\n", contarPalabras(texto));
    return 0;
}`,
        hint: 'Usa la variable `estado = 0` para denotar que estás en un espacio en blanco. Cuando encuentras un carácter diferente a espacio y estabas fuera, cambia `estado = 1` e incrementa el contador.',
        testCases: [
          {
            id: 'tc-c5',
            description: 'Verificar el conteo de 7 palabras en la frase de prueba',
            input: '',
            expectedOutput: 'Palabras: 7'
          }
        ],
        explanation: 'La máquina de estados de K&R detecta las transiciones desde espacios blancos hacia caracteres visibles, contando exactamente las secuencias continuas de texto.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c1-1',
        question: '¿Por qué la función getchar() devuelve un int en lugar de un char en el estándar K&R C?',
        options: [
          'Porque en C no existe el tipo primitivo char.',
          'Para poder devolver la constante especial EOF (-1), el cual no cabe en un char sin signo (0-255).',
          'Porque los procesadores x86 solo pueden procesar números enteros de 32 bits.',
          'Para permitir la lectura de caracteres unicode utf-32 exclusivamente.'
        ],
        correctIndex: 1,
        explanation: 'getchar() debe retornar cualquier byte válido (0 a 255) y además el código de control EOF (-1). Para no solapar -1 con el carácter 255 (0xFF), se requiere un entero de mayor capacidad.'
      },
      {
        id: 'q-c1-2',
        question: '¿Cuál es el resultado de evaluar la expresión (5 / 9) * 100 en lenguaje C?',
        options: ['55', '55.55', '0', 'Error de compilación'],
        correctIndex: 2,
        explanation: 'Dado que 5 y 9 son enteros, la división 5 / 9 evalúa primero a 0 (división entera con truncamiento). Luego 0 * 100 resulta en 0.'
      },
      {
        id: 'q-c1-3',
        question: '¿Qué sucede al declarar un `signed char c = 127;` y ejecutar `c = c + 1;` en una arquitectura estándar de Complemento a Dos?',
        options: [
          'El valor de c se incrementa normalmente a 128.',
          'Ocurre un desbordamiento (Integer Overflow) y c pasa a valer -128.',
          'El programa lanza un kernel panic del sistema operativo.',
          'La variable c se borra automáticamente de la memoria RAM.'
        ],
        correctIndex: 1,
        explanation: 'En complemento a dos de 8 bits, 127 es 01111111. Sumar 1 produce 10000000 en binario, que corresponde al valor negativo -128.'
      },
      {
        id: 'q-c1-4',
        question: '¿Cuál es la función del carácter nulo `\\0` en una cadena de texto en C?',
        options: [
          'Indicar al compilador que la cadena debe convertirse a mayúsculas.',
          'Servir como centinela de terminación en memoria RAM para saber dónde finaliza la cadena.',
          'Imprimir un espacio en blanco en la consola estándar.',
          'Reservar memoria en el disco duro para almacenar la cadena.'
        ],
        correctIndex: 1,
        explanation: 'Las cadenas en C son arreglos simples de caracteres sin encabezados de longitud. El byte `\\0` (ASCII 0) marca el fin exacto de la cadena en RAM.'
      },
      {
        id: 'q-c1-5',
        question: '¿Qué etapa de compilación procesa las directivas como `#include` y `#define`?',
        options: ['El Enlazador (Linker)', 'El Preprocesador', 'El Ensamblador', 'El Optimizador de Código Machine'],
        correctIndex: 1,
        explanation: 'El preprocesador (`cpp`) actúa antes del compilador propiamente dicho, sustituyendo texto literal y expandiendo macros.'
      }
    ]
  },

  {
    id: 'cap-2',
    chapterNumber: 2,
    title: 'Capítulo 2: Tipos, Operadores y Expresiones',
    subtitle: 'Tipos primitivos, qualificadores, constantes, operaciones bitwise y precedencia',
    icon: '🔢',
    description: 'Domina los tipos de datos en C (char, int, float, double), qualificadores (short, long, signed, unsigned, const), operadores bit a bit (&, |, ^, ~, <<, >>) y conversión implícita/explícita de tipos (cast).',
    summary: 'Este capítulo profundiza en la representación interna de datos en memoria, las reglas del preprocesador y la manipulación matemática directa de bits.',
    keyConcepts: [
      'char, int, float, double',
      'short, long, signed, unsigned',
      'Constantes octales (0) y hexadecimales (0x)',
      'Calificador const',
      'Operadores relacionales y lógicos',
      'Evaluación en cortocircuito (&&, ||)',
      'Cast (conversión explícita)',
      'Incremento prefijo vs sufijo (++x / x++)',
      'Operadores bitwise (&, |, ^, ~, <<, >>)',
      'Operador ternario (? :)'
    ],
    analogies: [
      {
        title: 'Los Tipos de Datos como Cajas de Diferente Capacidad',
        concept: 'Tamaño en bytes de char, short, int, long',
        analogy: 'Un char es una caja pequeña de 1 byte. Un int es un contenedor de 4 bytes. Si intentas meter un valor de 1,000,000 en un char, la caja se desborda perdiendo los bits sobrantes.',
        whyItWorks: 'Explica físicamente los límites de almacenamiento en la RAM y el desbordamiento numérico.'
      },
      {
        title: 'Operadores Bitwise como un Panel de Interruptores de Luz',
        concept: 'Manipulación de bits individuales',
        analogy: 'Imagina un panel con 8 interruptores (bits). El operador AND (&) solo deja pasar corriente si ambos interruptores están encendidos; OR (|) enciende si al menos uno está activo; XOR (^) enciende si son distintos.',
        whyItWorks: 'Hace tangible las operaciones lógicas a nivel de hardware y máscaras de bits.'
      }
    ],
    theoryContent: `### 2.1 Tipos y Tamaños de Datos
C proporciona cuatro tipos primitivos fundamentales alineados con los tamaños nativos del procesador:

* **\`char\`**: Almacena un solo byte (8 bits). Utilizado para caracteres ASCII o enteros pequeños.
* **\`int\`**: Entero de tamaño natural de la máquina (generalmente 32 bits / 4 bytes).
* **\`float\`**: Punto flotante de precisión simple (4 bytes IEEE 754).
* **\`double\`**: Punto flotante de doble precisión (8 bytes).

#### Calificadores de Tamaño y Signo:
* **\`short int\`** (2 bytes) y **\`long int\`** (8 bytes).
* **\`unsigned\`**: Elimina el bit de signo, duplicando el valor máximo positivo (ej. \`unsigned char\` va de 0 a 255).
* **\`const\`**: Declara variables de solo lectura cuyos valores no pueden modificarse tras su inicialización.

\`\`\`c
#include <stdio.h>

int main() {
    printf("sizeof(char):   %lu byte\\n", sizeof(char));
    printf("sizeof(short):  %lu bytes\\n", sizeof(short));
    printf("sizeof(int):    %lu bytes\\n", sizeof(int));
    printf("sizeof(long):   %lu bytes\\n", sizeof(long));
    printf("sizeof(double): %lu bytes\\n", sizeof(double));
    return 0;
}
\`\`\`

---

### 2.2 Operadores Lógicos y Evaluación en Cortocircuito
Los operadores relacionales (\`<\`, \`<=\`, \`>\`, \`>=\`, \`==\`, \`!=\`) y lógicos (\`&&\`, \`||\`, \`!\`) devuelven \`1\` para verdadero y \`0\` para falso.

#### Evaluación en Cortocircuito (*Short-Circuit Evaluation*):
En \`exp1 && exp2\`, si \`exp1\` es falsa (\`0\`), C no evalúa \`exp2\` porque el resultado final es necesariamente falso.
En \`exp1 || exp2\`, si \`exp1\` es verdadera (\`1\`), \`exp2\` no se evalúa.

\`\`\`c
int ptr != NULL && *ptr == 42; // Seguro: no desreferencia ptr si es NULL
\`\`\`

---

### 2.3 Operadores Bit a Bit (Bitwise Operators)
Permiten manipular bits individuales en tipos enteros:

| Operador | Nombre | Operación | Ejemplo (\`a = 0x05\`, \`b = 0x09\`) |
| :---: | :--- | :--- | :--- |
| \`&\` | **AND Bitwise** | \`1\` si ambos bits son \`1\`. Máscaras de lectura. | \`0x05 & 0x09 = 0x01\` |
| \`|\` | **OR Bitwise** | \`1\` si al menos un bit es \`1\`. Encender bits. | \`0x05 | 0x09 = 0x0D\` |
| \`^\` | **XOR Bitwise** | \`1\` si los bits son distintos. Alternar bits. | \`0x05 ^ 0x09 = 0x0C\` |
| \`~\` | **NOT Bitwise** | Invierte todos los bits (complemento a 1). | \`~0x05 = 0xFA\` |
| \`<<\` | **Shift Left** | Desplaza bits a la izquierda (multiplica por $2^n$). | \`0x05 << 2 = 0x14\` (20) |
| \`>>\` | **Shift Right** | Desplaza bits a la derecha (divide entre $2^n$). | \`0x05 >> 1 = 0x02\` (2) |

\`\`\`c
#include <stdio.h>

int main() {
    unsigned char a = 0x05; // 0000 0101 (5)
    unsigned char b = 0x09; // 0000 1001 (9)

    printf("a & b  = 0x%02X (%d)\\n", a & b, a & b);   // 0000 0001 (1)
    printf("a | b  = 0x%02X (%d)\\n", a | b, a | b);   // 0000 1101 (13)
    printf("a ^ b  = 0x%02X (%d)\\n", a ^ b, a ^ b);   // 0000 1100 (12)
    printf("a << 2 = 0x%02X (%d)\\n", a << 2, a << 2); // 0001 0100 (20)
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '1. Manipulación de Bits y Máscaras de Configuración',
        description: 'Uso de operadores bitwise para activar, desactivar y verificar banderas de estado en C.',
        code: `#include <stdio.h>

#define FLAG_READ   (1 << 0) // 0001 (1)
#define FLAG_WRITE  (1 << 1) // 0010 (2)
#define FLAG_EXEC   (1 << 2) // 0100 (4)

int main() {
    unsigned char permisos = 0;

    // Otorgar lectura y ejecución
    permisos |= (FLAG_READ | FLAG_EXEC);

    printf("Permisos Octal/Hex: 0x%02X\\n", permisos);
    printf("¿Tiene permiso de Lectura?  %s\\n", (permisos & FLAG_READ) ? "SI" : "NO");
    printf("¿Tiene permiso de Escritura? %s\\n", (permisos & FLAG_WRITE) ? "SI" : "NO");
    printf("¿Tiene permiso de Ejecución? %s\\n", (permisos & FLAG_EXEC) ? "SI" : "NO");

    return 0;
}`,
        expectedOutput: `Permisos Octal/Hex: 0x05\n¿Tiene permiso de Lectura?  SI\n¿Tiene permiso de Escritura? NO\n¿Tiene permiso de Ejecución? SI`
      }
    ],
    exercises: [
      {
        id: 'ex-cap2-1',
        title: 'Ejercicio 2.1: Inversor de Bits con XOR',
        description: 'Escribe una función getbits(x, p, n) que devuelva los n bits ajustados a la derecha de x que comienzan en la posición p.',
        cormenRef: 'K&R Cap 2 - Sec 2.9',
        initialCode: `#include <stdio.h>

unsigned getbits(unsigned x, int p, int n) {
    // Retorna (x >> (p + 1 - n)) & ~(~0 << n)
    return 0;
}

int main() {
    unsigned val = 0xAB; // 1010 1011
    printf("Resultado: 0x%X\\n", getbits(val, 4, 3));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

unsigned getbits(unsigned x, int p, int n) {
    return (x >> (p + 1 - n)) & ~(~0 << n);
}

int main() {
    unsigned val = 0xAB; // 1010 1011
    printf("Resultado: 0x%X\\n", getbits(val, 4, 3));
    return 0;
}`,
        hint: 'Usa desplazamientos a la derecha y una máscara creada con ~(~0 << n).',
        testCases: [
          {
            id: 'tc-cap2-1',
            description: 'Valida la extracción de 3 bits',
            input: '',
            expectedOutput: 'Resultado: 0x5'
          }
        ],
        explanation: 'La máscara ~(~0 << n) genera n unos en las posiciones menos significativas.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c2-1',
        question: '¿Qué operador se utiliza para forzar una conversión explícita de tipos en C?',
        options: ['static_cast', 'Operador cast (tipo)', 'convert()', 'type()'],
        correctIndex: 1,
        explanation: 'En C, el operador cast se escribe colocando el tipo deseado entre paréntesis antes de la expresión, por ejemplo: (double) x.'
      }
    ]
  },

  {
    id: 'cap-3',
    chapterNumber: 3,
    title: 'Capítulo 3: Control de Flujo',
    subtitle: 'Sentencias condicionales, bifurcaciones múltiples y bucles de control',
    icon: '🔁',
    description: 'Estructuras de control en C: if-else, else-if, switch-case con fall-through, ciclos while, for, do-while, y control explícito mediante break, continue y goto.',
    summary: 'Aprende a estructurar algoritmos complejos utilizando las sentencias de control de flujo estándar de C.',
    keyConcepts: [
      'Sentencias y bloques { }',
      'if-else y else-if',
      'switch, case, break, default',
      'Efecto fall-through en switch',
      'Ciclos while y for',
      'Ciclo do-while (prueba posterior)',
      'break (salida de bucle)',
      'continue (salto a siguiente iteración)',
      'goto y etiquetas'
    ],
    analogies: [
      {
        title: 'El Switch-Case como un Clasificador Postal de Paquetes',
        concept: 'Bifurcación condicional por casos enteros',
        analogy: 'Un escáner lee el código postal (valor entero) y envía el paquete por el carril del caso correspondiente. Si falta la barrera de detención (break), el paquete se desliza a los carriles siguientes.',
        whyItWorks: 'Visualiza el comportamiento de salto directo del switch y la necesidad del break.'
      }
    ],
    theoryContent: `### 3.1 Estructuras Condicionales y Bloques
Un bloque en C se delimita con llaves \`{\` y \`}\`. Las variables declaradas dentro de un bloque tienen alcance local a ese bloque.

#### La Sentencia Switch-Case:
Evalúa una expresión entera y salta directamente a la etiqueta \`case\` correspondiente.

\`\`\`c
#include <stdio.h>

int main() {
    char opcion = 'B';
    switch (opcion) {
        case 'A':
            printf("Procesando Módulo Algorítmico\\n");
            break;
        case 'B':
            printf("Procesando Módulo Lenguaje C\\n");
            break;
        default:
            printf("Opción desconocida\\n");
            break;
    }
    return 0;
}
\`\`\`

---

### 3.2 Ciclo Do-While (Prueba Posterior)
A diferencia de \`while\` y \`for\`, el ciclo \`do-while\` evalúa su condición al **final** del bloque, garantizando que el cuerpo se ejecute al menos una vez.

\`\`\`c
#include <stdio.h>

int main() {
    int n = 10;
    do {
        printf("Ejecución garantizada al menos 1 vez (n = %d)\\n", n);
    } while (n < 5);
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '1. Algoritmo de Búsqueda Binaria con Bucle While',
        description: 'Implementación del algoritmo O(log n) utilizando estructuras de control condicionales.',
        code: `#include <stdio.h>

int busquedaBinaria(int arr[], int n, int clave) {
    int izq = 0, der = n - 1;
    while (izq <= der) {
        int medio = izq + (der - izq) / 2;
        if (arr[medio] == clave) return medio;
        if (arr[medio] < clave) izq = medio + 1;
        else der = medio - 1;
    }
    return -1;
}

int main() {
    int datos[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int idx = busquedaBinaria(datos, 10, 23);
    printf("Elemento 23 encontrado en el índice: %d\\n", idx);
    return 0;
}`,
        expectedOutput: `Elemento 23 encontrado en el índice: 5`
      }
    ],
    exercises: [
      {
        id: 'ex-cap3-1',
        title: 'Ejercicio 3.1: Conversor de Cadenas atoi con Bucle',
        description: 'Implementa la función atoi(s) que convierte una cadena de dígitos en su entero correspondiente.',
        cormenRef: 'K&R Cap 3 - Sec 3.5',
        initialCode: `#include <stdio.h>

int miAtoi(const char s[]) {
    int i = 0, n = 0;
    // Omitir espacios en blanco y procesar dígitos
    return n;
}

int main() {
    printf("Resultado: %d\\n", miAtoi("   2026"));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int miAtoi(const char s[]) {
    int i = 0, n = 0;
    while (s[i] == ' ' || s[i] == '\\t' || s[i] == '\\n') i++;
    while (s[i] >= '0' && s[i] <= '9') {
        n = 10 * n + (s[i] - '0');
        i++;
    }
    return n;
}

int main() {
    printf("Resultado: %d\\n", miAtoi("   2026"));
    return 0;
}`,
        hint: 'Multiplica n por 10 y suma (s[i] - \'0\') en cada iteración.',
        testCases: [
          {
            id: 'tc-cap3-1',
            description: 'Valida conversión de "   2026"',
            input: '',
            expectedOutput: 'Resultado: 2026'
          }
        ],
        explanation: 'El bucle acumula los dígitos numéricos en base 10.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c3-1',
        question: '¿Qué sucede en una sentencia switch si se omite la instrucción break al final de un case?',
        options: [
          'Ocurre un error de compilación.',
          'La ejecución continúa y entra al siguiente case (efecto fall-through).',
          'El programa finaliza inmediatamente.',
          'Se ejecuta automáticamente el caso default.'
        ],
        correctIndex: 1,
        explanation: 'Sin un break explícito, C no interrumpe la ejecución y continúa ejecutando las sentencias de los casos subsiguientes.'
      }
    ]
  },

  {
    id: 'cap-4',
    chapterNumber: 4,
    title: 'Capítulo 4: Funciones y la Estructura del Programa',
    subtitle: 'Arquitectura modular, ámbito de variables, estáticas, recursión y preprocesador',
    icon: '📦',
    description: 'Aprende a estructurar software modular en C: prototipos de función, variables externas (extern), variables estáticas (static), archivos de cabecera (.h), la pila de llamadas en recursión y macros avanzadas del preprocesador.',
    summary: 'Crea aplicaciones limpias y mantenibles organizando el código en múltiples archivos y módulos independientes.',
    keyConcepts: [
      'Prototipos y declaraciones',
      'Variables externas (extern)',
      'Scope y ocultamiento de variables',
      'Variables estáticas (static local y global)',
      'Variables de registro (register)',
      'Inclusión de archivos (#include)',
      'Macros con parámetros (#define)',
      'Recursividad y pila de llamadas',
      'Compilaciones condicionales (#ifdef)'
    ],
    analogies: [
      {
        title: 'Variables Estáticas como un Contador de Turnos en una Panadería',
        concept: 'Persistencia de variables local static',
        analogy: 'A diferencia de un cliente que llega y se va (variable automática que se destruye al salir de la función), el dispensador de tickets (variable static) permanece atornillado a la pared recordando el último número emitido.',
        whyItWorks: 'Aclara cómo static conserva su valor en la RAM entre sucesivas llamadas a la función.'
      }
    ],
    theoryContent: `### 4.1 Variables Estáticas y Ámbito
* **\`static\` local**: Preserva su estado en la memoria RAM durante toda la vida del programa, sin reinicializarse en cada llamada.
* **\`static\` global**: Oculta la variable o función restringiendo su alcance únicamente al archivo \`.c\` actual (privacidad de módulo).

\`\`\`c
#include <stdio.h>

void contador() {
    static int invocaciones = 0; // Se inicializa solo una vez
    invocaciones++;
    printf("Invocación número: %d\\n", invocaciones);
}

int main() {
    contador();
    contador();
    contador();
    return 0;
}
\`\`\`

---

### 4.2 El Preprocesador de C (#define, #include, #ifdef)
El preprocesador procesa el texto fuente antes de enviarlo al compilador:

* **Macros con Parámetros**:
\`\`\`c
#define MAX(A, B) ((A) > (B) ? (A) : (B))
#define CUADRADO(x) ((x) * (x))
\`\`\`
* **Guarda de Inclusión en Cabeceras**:
\`\`\`c
#ifndef MI_LIBRERIA_H
#define MI_LIBRERIA_H

// Declaraciones y prototipos de la librería

#endif
\`\`\``,
    codeExamples: [
      {
        title: '1. Torres de Hanói Recursivas',
        description: 'Demostración práctica de recursión y la pila de llamadas con 3 discos.',
        code: `#include <stdio.h>

void hanoi(int n, char origen, char destino, char auxiliar) {
    if (n == 1) {
        printf("Mover disco 1 de %c a %c\\n", origen, destino);
        return;
    }
    hanoi(n - 1, origen, auxiliar, destino);
    printf("Mover disco %d de %c a %c\\n", n, origen, destino);
    hanoi(n - 1, auxiliar, destino, origen);
}

int main() {
    printf("Solución para 3 discos:\\n");
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`,
        expectedOutput: `Solución para 3 discos:\nMover disco 1 de A a C\nMover disco 2 de A a B\nMover disco 1 de C a B\nMover disco 3 de A a C\nMover disco 1 de B a A\nMover disco 2 de B a C\nMover disco 1 de A a C`
      }
    ],
    exercises: [
      {
        id: 'ex-cap4-1',
        title: 'Ejercicio 4.1: Cadena Invertida Recursiva',
        description: 'Implementa una función recursiva reverse(s) que invierta la cadena s en el mismo lugar.',
        cormenRef: 'K&R Cap 4 - Sec 4.10',
        initialCode: `#include <stdio.h>
#include <string.h>

void invertirRecursivo(char s[], int i, int j) {
    // Intercambia s[i] y s[j] y llama recursivamente para i+1, j-1
}

int main() {
    char str[] = "ALGORITMOS";
    invertirRecursivo(str, 0, strlen(str) - 1);
    printf("Invertida: %s\\n", str);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <string.h>

void invertirRecursivo(char s[], int i, int j) {
    if (i >= j) return;
    char temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    invertirRecursivo(s, i + 1, j - 1);
}

int main() {
    char str[] = "ALGORITMOS";
    invertirRecursivo(str, 0, strlen(str) - 1);
    printf("Invertida: %s\\n", str);
    return 0;
}`,
        hint: 'El caso base ocurre cuando el índice izquierdo i es mayor o igual al derecho j.',
        testCases: [
          {
            id: 'tc-cap4-1',
            description: 'Valida inversión de "ALGORITMOS"',
            input: '',
            expectedOutput: 'Invertida: SOMTIROGLA'
          }
        ],
        explanation: 'La recursión reduce la distancia entre índices hasta que se cruzan.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c4-1',
        question: '¿Qué ocurre al calificar una variable global con la palabra clave static?',
        options: [
          'La variable se convierte en una constante inmutable.',
          'Su visibilidad se limita únicamente al archivo fuente donde está definida.',
          'Se almacena en la pila de llamadas (stack).',
          'Aumenta automáticamente el tamaño de la variable a 64 bits.'
        ],
        correctIndex: 1,
        explanation: 'La cualidad static aplicada a una variable o función global restringe su enlace (linkage) haciéndola invisible para otros archivos objeto.'
      }
    ]
  },

  {
    id: 'cap-5',
    chapterNumber: 5,
    title: 'Capítulo 5: Punteros y Arreglos',
    subtitle: 'Direcciones de memoria, aritmética de apuntadores, arreglos y punteros a funciones',
    icon: '⚡',
    description: 'El corazón de Lenguaje C: operador de dirección (&), operador de desreferencia (*), paso por referencia, equivalencia entre arreglos y punteros *(p + i), arreglos de punteros, argumentos en línea de comandos (argc, argv) y punteros a funciones.',
    summary: 'Domina los conceptos más potentes de C aprendiendo a gestionar la memoria física directamente mediante punteros.',
    keyConcepts: [
      'Operador dirección de memoria &',
      'Operador desreferencia *',
      'Paso por referencia (Swap)',
      'Aritmética de punteros (p + i)',
      'Decaimiento de arreglos en punteros',
      'Cadenas como char *',
      'Arreglos de punteros (char *argv[])',
      'Punteros a punteros (int **ptr)',
      'Argumentos argc y argv',
      'Punteros a funciones'
    ],
    analogies: [
      {
        title: 'Punteros como Números de Casillero Postales',
        concept: 'Dirección de memoria vs Contenido de la memoria',
        analogy: 'Una variable común es el contenido de la carta dentro del casillero. Un puntero es un trozo de papel con el número de casillero (ej. 0x7ffd10) escrito en él. Desreferenciar (*p) significa ir a ese casillero y leer la carta que contiene.',
        whyItWorks: 'Diferencia perfectamente el valor numérico de la dirección de memoria del contenido almacenado.'
      },
      {
        title: 'Aritmética de Punteros como Avanzar en una Fila de Asientos',
        concept: 'Operación ptr + i ajustada al sizeof(T)',
        analogy: 'Si estás sentado en la silla 10 y te dicen "avanza 2 asientos", te mueves a la silla 12 sin importar si las sillas son estrechas (char, 1 byte) o anchas (double, 8 bytes). C calcula automáticamente los bytes necesarios.',
        whyItWorks: 'Explica por qué p + 1 incrementa la dirección en el número de bytes del tipo apuntado.'
      }
    ],
    theoryContent: `### 5.1 Conceptos Fundamentales de Punteros
Un **puntero** es una variable cuyo valor es la **dirección de memoria RAM** de otra variable.

* **\`&\` (Address-of)**: Obtiene la dirección de memoria de una variable.
* **\`*\` (Dereference)**: Accede al valor almacenado en la dirección apuntada.

\`\`\`c
#include <stdio.h>

void intercambiar(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Antes: x = %d, y = %d\\n", x, y);
    intercambiar(&x, &y); // Pasamos las direcciones con &
    printf("Después: x = %d, y = %d\\n", x, y);
    return 0;
}
\`\`\`

---

### 5.2 Equivalencia entre Punteros y Arreglos
En C, el nombre de un arreglo se decae automáticamente en un puntero a su primer elemento:
\`\`\`c
arr[i]  <===>  *(arr + i)
\`\`\`

\`\`\`c
#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int *p = numeros; // Apunta al primer elemento (numeros[0])

    for (int i = 0; i < 5; i++) {
        printf("*(p + %d) = %d (Dir: %p)\\n", i, *(p + i), (void*)(p + i));
    }
    return 0;
}
\`\`\`

---

### 5.3 Punteros a Funciones
Permiten pasar código executable como argumentos a otras funciones (mecanismo de *callbacks*):

\`\`\`c
#include <stdio.h>

int sumar(int a, int b) { return a + b; }
int restar(int a, int b) { return a - b; }

void ejecutarOperacion(int (*op)(int, int), int x, int y) {
    printf("Resultado de la operación: %d\\n", op(x, y));
}

int main() {
    ejecutarOperacion(sumar, 15, 5);
    ejecutarOperacion(restar, 15, 5);
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '1. Ordenamiento Quicksort con Puntero a Función de Comparación',
        description: 'Uso de la función qsort de stdlib.h utilizando punteros a funciones.',
        code: `#include <stdio.h>
#include <stdlib.h>

int compararEnteros(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int valores[] = {42, 12, 88, 3, 27, 95, 1};
    int n = 7;

    qsort(valores, n, sizeof(int), compararEnteros);

    printf("Arreglo ordenado con qsort y puntero a función:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", valores[i]);
    }
    printf("\\n");
    return 0;
}`,
        expectedOutput: `Arreglo ordenado con qsort y puntero a función:\n1 3 12 27 42 88 95`
      }
    ],
    exercises: [
      {
        id: 'ex-cap5-1',
        title: 'Ejercicio 5.1: Copia de Cadenas con Punteros strepy',
        description: 'Implementa la versión estilizada de K&R para copiar cadenas utilizando punteros e incrementos.',
        cormenRef: 'K&R Cap 5 - Sec 5.5',
        initialCode: `#include <stdio.h>

void miStrcpy(char *s, const char *t) {
    // Mientras (*s++ = *t++) != '\0'
}

int main() {
    char destino[50];
    miStrcpy(destino, "Cormen K&R C Pro");
    printf("Destino: %s\\n", destino);
    return 0;
}`,
        solutionCode: `#include <stdio.h>

void miStrcpy(char *s, const char *t) {
    while ((*s++ = *t++) != '\\0');
}

int main() {
    char destino[50];
    miStrcpy(destino, "Cormen K&R C Pro");
    printf("Destino: %s\\n", destino);
    return 0;
}`,
        hint: 'Aprovecha la asignación en la condición (*s++ = *t++).',
        testCases: [
          {
            id: 'tc-cap5-1',
            description: 'Valida la copia exacta de cadena',
            input: '',
            expectedOutput: 'Destino: Cormen K&R C Pro'
          }
        ],
        explanation: 'El bucle copia el carácter y avanza ambos punteros hasta copiar el byte nulo.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c5-1',
        question: 'Si p es un puntero a int (4 bytes) con valor 0x1000, ¿cuál será el valor de p + 2?',
        options: ['0x1002', '0x1004', '0x1008', '0x2000'],
        correctIndex: 2,
        explanation: 'La aritmética de punteros multiplica el incremento por sizeof(T). 0x1000 + (2 * 4 bytes) = 0x1008.'
      }
    ]
  },

  {
    id: 'cap-6',
    chapterNumber: 6,
    title: 'Capítulo 6: Estructuras (Structs, Uniones y Enum)',
    subtitle: 'Agrupación heterogénea de datos, punteros a estructuras, nodos y typedef',
    icon: '🏗️',
    description: 'Crea tipos de datos complejos en C: sintaxis struct, acceso con punto (.) y flecha (->), estructuras autorreferenciadas para árboles y listas enlazadas, typedef, uniones (union) y campos de bits (bit-fields).',
    summary: 'Construye estructuras de datos complejas combinando tipos heterogéneos y memoria dinámica.',
    keyConcepts: [
      'Estructuras (struct)',
      'Acceso con punto . y flecha ->',
      'Punteros a estructuras',
      'Arreglos de estructuras',
      'Estructuras autorreferenciadas (Nodos)',
      'Redefinición de tipos con typedef',
      'Uniones (union)',
      'Campos de bits (bit-fields)',
      'Alineación y padding de memoria'
    ],
    analogies: [
      {
        title: 'Una Estructura struct como una Ficha de Identificación',
        concept: 'Agrupación heterogénea de datos',
        analogy: 'Una ficha médica agrupa diferentes tipos de información: nombre (cadena), edad (entero), altura (flotante) y tipo de sangre (carácter). A diferencia de un arreglo que obliga a que todo sea igual, un struct agrupa datos heterogéneos bajo un mismo nombre.',
        whyItWorks: 'Demuestra la diferencia fundamental entre colecciones homogéneas (arreglos) y compuestas (structs).'
      }
    ],
    theoryContent: `### 6.1 Estructuras y Acceso a Miembros
Una **estructura** es una colección de una o más variables agrupadas bajo un solo nombre.

\`\`\`c
#include <stdio.h>

struct Punto {
    int x;
    int y;
};

int main() {
    struct Punto p1 = {10, 20};
    struct Punto *ptr = &p1;

    // Acceso con operador punto y flecha
    printf("Punto directo: (%d, %d)\\n", p1.x, p1.y);
    printf("Punto vía flecha: (%d, %d)\\n", ptr->x, ptr->y);

    return 0;
}
\`\`\`

---

### 6.2 Nodos Autorreferenciados para Listas y Árboles
Un struct que contiene un puntero a su propio tipo permite construir estructuras dinámicas:

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo* crearNodo(int val) {
    Nodo *nuevo = (Nodo*) malloc(sizeof(Nodo));
    nuevo->dato = val;
    nuevo->siguiente = NULL;
    return nuevo;
}

int main() {
    Nodo *cabeza = crearNodo(100);
    cabeza->siguiente = crearNodo(200);

    printf("Nodo 1: %d -> Nodo 2: %d\\n", cabeza->dato, cabeza->siguiente->dato);

    free(cabeza->siguiente);
    free(cabeza);
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '1. Tabla Hash con Listas Enlazadas de Structs (K&R Sec 6.6)',
        description: 'Estructura de datos clásica de K&R para buscar símbolos e identificadores.',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct nlist {
    struct nlist *next;
    char *name;
    char *defn;
} nlist;

int main() {
    nlist item;
    item.name = "MAX_BUFFER";
    item.defn = "1024";
    item.next = NULL;

    printf("Símbolo Hash: %s = %s\\n", item.name, item.defn);
    return 0;
}`,
        expectedOutput: `Símbolo Hash: MAX_BUFFER = 1024`
      }
    ],
    exercises: [
      {
        id: 'ex-cap6-1',
        title: 'Ejercicio 6.1: Inserción en Árbol Binario de Búsqueda',
        description: 'Crea una función para insertar valores en un árbol binario de búsqueda compuesto por structs.',
        cormenRef: 'K&R Cap 6 - Sec 6.5',
        initialCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct tnode {
    int val;
    struct tnode *left;
    struct tnode *right;
} tnode;

tnode* insertar(tnode *p, int w) {
    // Si p == NULL, malloc y retorna nuevo nodo
    // Si w < p->val, p->left = insertar(p->left, w)
    // De lo contrario, p->right = insertar(p->right, w)
    return p;
}

int main() {
    tnode *raiz = NULL;
    raiz = insertar(raiz, 50);
    raiz = insertar(raiz, 30);
    raiz = insertar(raiz, 70);
    printf("Raíz: %d, Izq: %d, Der: %d\\n", raiz->val, raiz->left->val, raiz->right->val);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct tnode {
    int val;
    struct tnode *left;
    struct tnode *right;
} tnode;

tnode* insertar(tnode *p, int w) {
    if (p == NULL) {
        p = (tnode*) malloc(sizeof(tnode));
        p->val = w;
        p->left = p->right = NULL;
    } else if (w < p->val) {
        p->left = insertar(p->left, w);
    } else {
        p->right = insertar(p->right, w);
    }
    return p;
}

int main() {
    tnode *raiz = NULL;
    raiz = insertar(raiz, 50);
    raiz = insertar(raiz, 30);
    raiz = insertar(raiz, 70);
    printf("Raíz: %d, Izq: %d, Der: %d\\n", raiz->val, raiz->left->val, raiz->right->val);
    return 0;
}`,
        hint: 'Si p es NULL, asigna memoria dinámicamente con malloc.',
        testCases: [
          {
            id: 'tc-cap6-1',
            description: 'Valida estructura del árbol BST',
            input: '',
            expectedOutput: 'Raíz: 50, Izq: 30, Der: 70'
          }
        ],
        explanation: 'La inserción recursiva navega por las ramas izquierda y derecha creando nodos dinámicos.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c6-1',
        question: '¿Qué operador se utiliza para acceder a un miembro de una estructura cuando se posee un puntero a ella?',
        options: ['Operador punto (.)', 'Operador flecha (->)', 'Operador asterisco (*)', 'Operador dos puntos (::)'],
        correctIndex: 1,
        explanation: 'El operador flecha (ptr->miembro) es un atajo equivalente a escribir (*ptr).miembro.'
      }
    ]
  },

  {
    id: 'cap-7',
    chapterNumber: 7,
    title: 'Capítulo 7: Entrada y Salida (stdio.h)',
    subtitle: 'Manejo de flujos E/S, entrada formateada con scanf, salida con printf y archivos FILE*',
    icon: '📁',
    description: 'Domina la biblioteca de entrada y salida estándar de C: flujos estandarizados (stdin, stdout, stderr), formateo avanzado con printf/sprintf, procesamiento seguro de entradas con scanf/sscanf/fgets, acceso a archivos con FILE*, fopen, fclose, E/S binaria con fread/fwrite, fseek y gestión de errores con feof y ferror.',
    summary: 'Aprende a persistir datos en el disco duro de forma eficiente y a procesar flujos de entrada/salida de texto y archivos binarios.',
    keyConcepts: [
      'Flujos estándar stdin, stdout, stderr',
      'Salida formateada: printf, fprintf, sprintf',
      'Entrada formateada: scanf, fscanf, sscanf',
      'Estructura FILE* y modos de apertura',
      'Entrada/Salida por caracteres: getc, putc, getchar, putchar',
      'Entrada/Salida por líneas: fgets, fputs',
      'Entrada/Salida binaria: fread, fwrite',
      'Acceso aleatorio: fseek, ftell, rewind',
      'Control de errores y fin de archivo: feof, ferror, perror'
    ],
    analogies: [
      {
        title: 'El Descriptor FILE* como un Marcapáginas en un Libro',
        concept: 'Lectura secuencial de archivos en disco',
        analogy: 'Abrir un archivo con fopen() coloca un marcapáginas en el primer carácter del libro. Cada llamada a getc() o fgets() lee los datos y mueve el marcapáginas hacia adelante. Con fseek() puedes saltar el marcapáginas a cualquier página.',
        whyItWorks: 'Visualiza la naturaleza secuencial del puntero interno de posición de archivo.'
      },
      {
        title: 'sprintf / sscanf como una Impresora e Imprimidora de Etiquetas en Memoria',
        concept: 'Formateo directo en arreglos de caracteres',
        analogy: 'En lugar de enviar la etiqueta de texto al monitor (stdout), sprintf "imprime" el texto formateado sobre una tira de papel en blanco en tu mesa (un arreglo char buffer[]). sscanf hace lo opuesto: lee la etiqueta del papel y extrae los datos numéricos.',
        whyItWorks: 'Clarifica que las funciones con prefijo "s" operan sobre buffers en memoria RAM sin interactuar con discos o terminales.'
      }
    ],
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico K&R
En el diseño original de C, Dennis Ritchie decidió intencionalmente no incluir instrucciones de entrada/salida como primitivas del lenguaje (a diferencia de PASCAL o FORTRAN). La E/S se implementó en su totalidad como una **Librería Estándar Portable** (\`<stdio.h>\`), garantizando que los programas C pudieran compilarse sin modificaciones en distintas arquitecturas de hardware abstraídas mediante flujos (*streams*).

### Analogía Intuitiva
Un flujo de E/S en C es como una **cinta transportadora de paquetes de texto/bytes**:
* El programa deposita paquetes en la cinta (\`fprintf\`, \`fwrite\`) o los recoge (\`fscanf\`, \`fread\`).
* La librería \`stdio.h\` amortigua las transferencias usando un **Buffer intermedio en RAM**, reduciendo los accesos lentos al disco físico.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Flujos Estándar y la Estructura \`FILE*\`
Al iniciar cualquier aplicación C, el entorno de tiempo de ejecución abre automáticamente tres flujos estándar:
* **\`stdin\`**: Entrada estándar (teclado, descriptor \`0\`).
* **\`stdout\`**: Salida estándar (consola con buffer por líneas, descriptor \`1\`).
* **\`stderr\`**: Error estándar (consola sin buffer inmediato, descriptor \`2\`).

La estructura incompleta \`FILE\` es un **manejador de flujo** que contiene el buffer interno de E/S, indicadores de posición, banderas de error y el descriptor asignado por el Kernel.

---

### 2.2 Apertura, Modos y Cierre de Archivos (\`fopen\` / \`fclose\`)
Para abrir un archivo en disco se utiliza \`fopen(nombre, modo)\`:

| Modo | Descripción | Comportamiento si el archivo no existe |
| :--- | :--- | :--- |
| **\`"r"\`** | Lectura de texto | Falla y retorna \`NULL\` |
| **\`"w"\`** | Escritura de texto | Lo crea de cero (si existe, lo trunca a 0 bytes) |
| **\`"a"\`** | Anexar texto (*append*) | Lo crea de cero (escribe siempre al final del archivo) |
| **\`"rb"\` / \`"wb"\`** | Modo binario sin traducción de caracteres \`\\r\\n\` | Según corresponda (\`r\` o \`w\`) |

#### Regla de Oro:
Siempre se debe verificar si \`fopen()\` devolvió \`NULL\` antes de operar con el puntero \`FILE*\`. Al terminar, invocar \`fclose(fp)\` para volcar los buffers a disco.

---

### 2.3 Formateo en Memoria: \`sprintf\` y \`sscanf\`
* **\`sprintf(buffer, "fmt", ...)\`**: Formatea texto y lo escribe en el arreglo \`buffer\`.
* **\`sscanf(cadena, "fmt", ...)\`**: Analiza y extrae variables desde una cadena de texto en RAM.

---

### 2.4 E/S Binaria y Acceso Aleatorio (\`fread\`, \`fwrite\`, \`fseek\`)
* **\`fwrite(ptr, size, count, fp)\`**: Escribe \`count\` elementos de \`size\` bytes desde la memoria al archivo.
* **\`fread(ptr, size, count, fp)\`**: Lee bloques binarios directamente a memoria.
* **\`fseek(fp, offset, origin)\`**: Mueve el puntero de posición del archivo:
  * \`SEEK_SET\`: Desde el inicio del archivo.
  * \`SEEK_CUR\`: Desde la posición actual.
  * \`SEEK_END\`: Desde el final del archivo.

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Buffering en \`stdio.h\` vs Transferencias Unbuffered
Llamar repetidamente a \`getc()\` no ejecuta un acceso a disco por cada carácter. \`stdio.h\` lee bloques de $4096$ bytes a un buffer en RAM ($O(1)$ amortizado), reduciendo las llamadas al sistema del kernel de $O(N)$ a $O(N / 4096)$.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Servidores Web y Logs de Sistema**: Escriben registros de auditoría formateados en tiempo real mediante \`fprintf(fp, ...)\`.
2. **Bases de Datos Relacionales (Storage Engines)**: Utilizan \`fseek()\` y \`fread()\` para leer páginas de datos fijas de 4KB/8KB de forma aleatoria desde el disco.
3. **Parseo de Archivos de Configuración (JSON / INI)**: Utilizan \`fgets()\` y \`sscanf()\` para procesar líneas de texto con seguridad.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. El Riesgo de Seguridad de \`gets()\` y \`scanf("%s")\`
* **\`gets()\`**: Está **prohibida** en el estándar C11 porque no limita la cantidad de caracteres leídos, provocando desbordamientos de buffer (*Buffer Overflow*).
* **Solución Segura**: Utilizar siempre \`fgets(buffer, sizeof(buffer), fp)\`.

### 2. Bucle Infinito de Lectura por Mal Uso de \`feof()\`
\`feof(fp)\` solo devuelve verdadero **después** de que una operación de lectura intentó leer más allá del final del archivo. Nunca debe usarse como condición directa del bucle \`while (!feof(fp))\`.

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Stream (Flujo)**: Abstracción de un canal de datos secuencial de entrada o salida.
* **FILE***: Estructura que actúa como manejador del flujo de datos en \`stdio.h\`.
* **Buffer**: Zona de memoria RAM intermedia que acumula datos para optimizar transferencias con el disco.
* **fseek**: Función de posicionamiento arbitrario dentro de un archivo.
* **Buffer Overflow**: Vulnerabilidad causada por escribir más datos en un buffer de los que puede almacenar.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **Kernighan & Ritchie (K&R C)**: Capítulo 7 completo (*Input and Output*), Secciones 7.1 a 7.8 (págs. 151–168).
* **Resumen en Una Frase**:
  > *"La librería stdio de C transforma la complejidad de las operaciones físicas de disco en flujos de datos estructurados, limpios e interconectados."*
`,
    codeExamples: [
      {
        title: '1. Procesamiento de Cadenas Formateadas con sprintf y sscanf',
        description: 'Construcción y análisis de datos en memoria sin interactuar directamente con disco.',
        code: `#include <stdio.h>

int main() {
    char registro[] = "Estudiante 101 95.5";
    char nombre[20];
    int id;
    float nota;

    sscanf(registro, "%s %d %f", nombre, &id, &nota);

    printf("Datos Parseados:\\n");
    printf("  Nombre: %s\\n  ID: %d\\n  Nota: %.1f\\n", nombre, id, nota);
    return 0;
}`,
        expectedOutput: `Datos Parseados:\n  Nombre: Estudiante\n  ID: 101\n  Nota: 95.5`
      },
      {
        title: '2. Formateo Seguro de Buffer con sprintf',
        description: 'Construcción estandarizada de mensajes formateados en arreglos de caracteres.',
        code: `#include <stdio.h>

int main() {
    char buffer[100];
    int id = 42;
    char estado[] = "OK";

    sprintf(buffer, "ID: %d | Estado: %s", id, estado);
    printf("Resultado: %s\\n", buffer);
    return 0;
}`,
        expectedOutput: `Resultado: ID: 42 | Estado: OK`
      }
    ],
    exercises: [
      {
        id: 'ex-cap7-niv1',
        title: 'Nivel 1 (Conceptual): Formateo de Cadenas en Memoria con sprintf',
        description: 'Escribe una función C `void formatearReporte(char dest[], int id, const char estado[])` que utilice `sprintf` para construir la cadena `"ID: <id> | Estado: <estado>"`.',
        cormenRef: 'K&R Cap 7 - Sec 7.2',
        initialCode: '#include <stdio.h>\n\nvoid formatearReporte(char dest[], int id, const char estado[]) {\n    // TODO: Utiliza sprintf para llenar dest\n}',
        solutionCode: '#include <stdio.h>\n\nvoid formatearReporte(char dest[], int id, const char estado[]) {\n    sprintf(dest, "ID: %d | Estado: %s", id, estado);\n}',
        hint: 'Sintaxis: `sprintf(dest, "ID: %d | Estado: %s", id, estado);`',
        testCases: [
          {
            id: 'tc-c7-1',
            description: 'Formatear ID 42 y Estado "OK"',
            input: '42, "OK"',
            expectedOutput: 'ID: 42 | Estado: OK'
          }
        ],
        explanation: '`sprintf` escribe la salida formateada directamente en el arreglo de caracteres especificado.'
      },
      {
        id: 'ex-cap7-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Extracción Segura de Datos con sscanf',
        description: 'El siguiente código intenta extraer una fecha `"2026-08-15"` usando `sscanf`, pero los especificadores de formato son incorrectos o faltan los operadores `&`. Corrígelo.',
        cormenRef: 'K&R Cap 7 - Sec 7.4',
        initialCode: '#include <stdio.h>\n\nint parsearFecha(const char fechaStr[], int *anio, int *mes, int *dia) {\n    // BUG: Error de especificadores o falta de punteros en sscanf\n    return sscanf(fechaStr, "%d-%d-%d", anio, mes, dia);\n}',
        solutionCode: '#include <stdio.h>\n\nint parsearFecha(const char fechaStr[], int *anio, int *mes, int *dia) {\n    return sscanf(fechaStr, "%d-%d-%d", anio, mes, dia);\n}',
        hint: '`sscanf(fechaStr, "%d-%d-%d", anio, mes, dia)` debe retornar 3 si se parsearon los 3 enteros correctamente.',
        testCases: [
          {
            id: 'tc-c7-2',
            description: 'Parsear "2026-08-15" -> debe retornar 3 campos parseados',
            input: '"2026-08-15"',
            expectedOutput: '3'
          }
        ],
        explanation: '`sscanf` devuelve el número de elementos asignados exitosamente, permitiendo validar la integridad del parseo.'
      },
      {
        id: 'ex-cap7-niv3-impl',
        title: 'Nivel 3 (Implementación C): Contador de Líneas en Texto con fgets',
        description: 'Escribe una función C `int contarLneasTexto(const char texto[])` que utilice `sscanf` o recorrido de buffer para contar cuántos caracteres salto de línea `\\n` existen en el texto.',
        cormenRef: 'K&R Cap 7 - Sec 7.7',
        initialCode: '#include <stdio.h>\n\nint contarLineasTexto(const char texto[]) {\n    int lineas = 0;\n    // TODO: Cuenta cuántos saltos de línea \\\'\\\\n\\\' contiene la cadena\n    return lineas;\n}',
        solutionCode: '#include <stdio.h>\n\nint contarLineasTexto(const char texto[]) {\n    int lineas = 0;\n    for (int i = 0; texto[i] != \'\\0\'; i++) {\n        if (texto[i] == \'\\n\') lineas++;\n    }\n    return lineas;\n}',
        hint: 'Itera sobre la cadena e incrementa `lineas` cada vez que `texto[i] == \'\\n\'`.',
        testCases: [
          {
            id: 'tc-c7-3',
            description: 'Contar líneas de "Hola\\nMundo\\nC\\n" -> 3 líneas',
            input: '"Hola\\nMundo\\nC\\n"',
            expectedOutput: '3'
          }
        ],
        explanation: 'Las herramientas de análisis de texto en C como `wc -l` cuentan la ocurrencia del carácter de nueva línea `\\n`.'
      },
      {
        id: 'ex-cap7-niv4-analisis',
        title: 'Nivel 4 (Análisis): Copia de Archivos Binarios por Bloques (fread / fwrite)',
        description: 'Escribe una función `size_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes)` que simule una copia por bloques binarios.',
        cormenRef: 'K&R Cap 7 - Sec 7.5',
        initialCode: '#include <stdio.h>\n#include <string.h>\n\nsize_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes) {\n    // TODO: Utiliza memcpy o transferencia por bytes para copiar numBytes\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n#include <string.h>\n\nsize_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes) {\n    if (src == NULL || dest == NULL) return 0;\n    memcpy(dest, src, numBytes);\n    return numBytes;\n}',
        hint: 'Utiliza `memcpy(dest, src, numBytes)` y retorna `numBytes`.',
        testCases: [
          {
            id: 'tc-c7-4',
            description: 'Copiar bloque de 10 bytes -> retorna 10',
            input: '10',
            expectedOutput: '10'
          }
        ],
        explanation: 'Las transferencias de bloques de memoria no interpretan tipos ni caracteres especiales, copiando los bytes puros.'
      },
      {
        id: 'ex-cap7-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Analizador de Expresión CSV con sscanf',
        description: 'Escribe una función C `int parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio)` que extraiga datos separados por comas usando `sscanf(linea, "%[^,],%d,%f", nombre, edad, promedio)`. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 7 - Sec 7.4',
        initialCode: '#include <stdio.h>\n\nint parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio) {\n    // TODO: Utiliza la especificación de conjunto de caracteres de sscanf %[^,]\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio) {\n    return sscanf(linea, "%[^,],%d,%f", nombre, edad, promedio);\n}',
        hint: 'Utiliza el especificador `%[^,]` en `sscanf` para leer todos los caracteres hasta encontrar una coma.',
        testCases: [
          {
            id: 'tc-c7-5',
            description: 'Parsear "Carlos,22,9.5" -> debe retornar 3 elementos parseados',
            input: '"Carlos,22,9.5"',
            expectedOutput: '3'
          }
        ],
        explanation: 'El especificador de escaneo `%[^,]` en `sscanf` actúa como una expresión regular simple para detener la lectura en la coma delimitadora.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c7-1',
        question: '¿Cuál es el valor retornado por fopen() si falla al abrir el archivo especificado?',
        options: ['EOF (-1)', 'NULL', '0', 'Un número entero negativo'],
        correctIndex: 1,
        explanation: 'Si el archivo no existe o el programa no cuenta con permisos de acceso, fopen() devuelve el puntero nulo NULL.'
      },
      {
        id: 'q-c7-2',
        question: '¿Por qué la función fgets() es preferible sobre la función obsoleta gets() para leer texto?',
        options: [
          'fgets() es más rápida porque usa ensamblador.',
          'fgets() requiere especificar el tamaño máximo del buffer destino, previniendo desbordamientos de memoria (Buffer Overflow).',
          'gets() no puede leer espacios en blanco.',
          'fgets() convierte automáticamente el texto a mayúsculas.'
        ],
        correctIndex: 1,
        explanation: 'Al requerir el límite del buffer en sus parámetros, fgets() garantiza que nunca se escriban más bytes de los asignados en memoria.'
      },
      {
        id: 'q-c7-3',
        question: '¿Cuál es la función del flujo estándar stderr en los sistemas operativos derivados de UNIX?',
        options: [
          'Guardar copias de seguridad del código fuente.',
          'Canal de salida sin buffer inmediato dedicado a emitir mensajes de error o advertencias independientemente de la redirección de stdout.',
          'Procesar datos ingresados desde el ratón.',
          'Acelerar el uso de la memoria RAM.'
        ],
        correctIndex: 1,
        explanation: 'stderr permite enviar alertas inmediatas a la consola incluso cuando la salida estándar stdout se redirige a un archivo mediante >.'
      }
    ]
  },

  {
    id: 'cap-8',
    chapterNumber: 8,
    title: 'Capítulo 8: La Interfaz del Sistema Operativo UNIX',
    subtitle: 'Llamadas al sistema (System Calls), Descriptores de Archivo y Asignación de Memoria (malloc)',
    icon: '💻',
    description: 'Módulo avanzado de arquitectura UNIX: llamadas al sistema nativas read(), write(), open(), close(), lseek(), acceso a directorios (stat, fstat) e implementación interna de un asignador de memoria dinámica Heap (malloc/free) con lista libre de bloques.',
    summary: 'Comprende la frontera entre el espacio de usuario de un programa C y el kernel del sistema operativo.',
    keyConcepts: [
      'Descriptores de Archivo (0: stdin, 1: stdout, 2: stderr)',
      'Llamadas al Sistema unbuffered: read() y write()',
      'System calls: open(), close(), creat()',
      'Reposicionamiento en archivo: lseek()',
      'Metadatos de archivos e inodos (stat, fstat)',
      'Gestión de directorios: opendir, readdir, closedir',
      'Ampliación del segmento de datos: llamada sbrk() / brk()',
      'Implementación K&R de malloc() y free()',
      'Lista circular de bloques libres con cabecera (Header)'
    ],
    analogies: [
      {
        title: 'Llamadas al Sistema como la Ventanilla de un Banco',
        concept: 'User Space vs Kernel Space',
        analogy: 'Tu programa C es un cliente en la sala de espera (User Space). No puede entrar a la bóveda del banco (Hardware/Disco) directamente. Debe pasar una solicitud firmada a la ventanilla (System Call) para que el cajero (el Kernel) realice la operación de manera aislada y segura.',
        whyItWorks: 'Explica la protección de memoria del procesador y las transiciones entre nivel de usuario y modo kernel.'
      },
      {
        title: 'El Malloc de K&R como una Red de Terrenos Conectados',
        concept: 'Free List (Lista de bloques libres en el Heap)',
        analogy: 'El Heap es un gran terreno administrado como una lista circular de parcelas disponibles. Cuando pides 100 metros (malloc), el administrador busca una parcela suficientemente grande, recorta los 100 metros y te los entrega con un cartelito (Header) en la entrada que indica su tamaño.',
        whyItWorks: 'Demuestra el funcionamiento de la cabecera oculta `Header` que antecede al puntero retornado por malloc.'
      }
    ],
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico K&R
C y UNIX nacieron en estrecha simbiosis en Bell Labs. Dennis Ritchie y Ken Thompson diseñaron el lenguaje C específicamente para reescribir el Kernel de UNIX en 1972. Por esta razón, comprender el Capítulo 8 de K&R es entender las tripas mismas de los sistemas operativos modernos (Linux, macOS, Android), donde las funciones de la librería de C abren una puerta directa hacia las **Llamadas al Sistema** (*System Calls*).

### Analogía Intuitiva
La interfaz de UNIX distingue dos mundos separados por hardware:
* **Espacio de Usuario (*User Space*)**: Donde corre tu programa C.
* **Espacio de Kernel (*Kernel Space*)**: Donde residen los controladores de disco, tarjeta de red y memoria física.
Una **System Call** (\`read\`, \`write\`, \`sbrk\`) es una interrupción de hardware organizada que le pide al Kernel realizar un trabajo en su nombre.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Descriptores de Archivo de Bajo Nivel (\`0\`, \`1\`, \`2\`)
En UNIX, "Todo es un archivo" (*Everything is a file*). Un **descriptor de archivo** es un entero entero pequeño que indexa la tabla de archivos abiertos del proceso:
* **\`0\`**: Entrada estándar (\`stdin\`).
* **\`1\`**: Salida estándar (\`stdout\`).
* **\`2\`**: Error estándar (\`stderr\`).

---

### 2.2 Entrada/Salida no Amortiguada: \`read\` y \`write\`
Las llamadas primitivas al sistema operativo para transferir bytes sin buffer intermedio son:
\`\`\`c
#include <unistd.h>

int n_read = read(int fd, char *buf, int nbytes);
int n_written = write(int fd, const char *buf, int nbytes);
\`\`\`
* \`read()\` devuelve la cantidad de bytes efectivamente leídos (retorna \`0\` al alcanzar el fin de archivo EOF).
* \`write()\` devuelve el número de bytes transferidos al canal.

---

### 2.3 Control de Posición (\`lseek\`) y Metadatos (\`stat\`)
* **\`lseek(fd, offset, origin)\`**: Cambia la posición actual de lectura/escritura en el descriptor sin transferir datos.
* **\`stat(path, &st)\`**: Consulta los metadatos guardados en el **Inodo** del sistema de archivos (tamaño en bytes, permisos, propietario, timestamps).

---

### 2.4 Diseño Interno de un Asignador de Memoria (\`malloc\` / \`free\` en K&R)
El asignador de memoria en el Heap de C opera solicitando bloques grandes al Kernel mediante la llamada \`sbrk(nbytes)\`.

#### Estructura de la Cabecera de Bloque (\`Header\`):
Cada bloque reservado en el Heap posee una **cabecera invisible** justo antes de la dirección retornado al usuario:
\`\`\`c
typedef long Align; // Forzar alineación al límite de memoria de la CPU

union header {
    struct {
        union header *ptr; // Puntero al siguiente bloque libre en la lista circular
        unsigned size;     // Tamaño del bloque en unidades de Header
    } s;
    Align x; // Garantiza alineación estricta de memoria
};

typedef union header Header;
\`\`\`

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Costo de Context Switches en System Calls
* **Acceso a Memoria RAM (User Space)**: ~1 a 10 nanosegundos.
* **Llamada al Sistema (Context Switch al Kernel)**: ~1,000 a 10,000 nanosegundos.
Por ello, hacer una llamada \`write(1, &c, 1)\` dentro de un bucle de 1,000,000 de caracteres es **1000 veces más lento** que acumularlos en un buffer de \`stdio.h\` e invocarlo una sola vez.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Clones de Utilidades de Terminal UNIX**: Herramientas como \`cat\`, \`cp\`, \`ls\` y \`mkdir\` se escriben utilizando llamadas nativas \`read\`, \`write\` y \`readdir\`.
2. **Motores de Contenedores (Docker / LXC)**: Interceptan llamadas al sistema para aislar procesos en espacios de nombres (*namespaces*).
3. **Gestores de Memoria de Alto Rendimiento (jemalloc / tcmalloc)**: Heredan el diseño de lista libre de K&R optimizado para entornos multihilo.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. Fragmentación Externa de Memoria en el Heap
Llamar repetidamente a \`malloc()\` y \`free()\` con tamaños dispares divide la memoria libre en miles de fragmentos pequeños e inconexos, provocando fallos por falta de memoria contigua aunque el total libre sea suficiente.

### 2. Corrupción de Cabecera por Desbordamiento de Arreglo
Si se escribe más allá de los límites de un arreglo dinámico reservado con \`malloc()\`, se sobrescribirá la estructura \`Header\` del bloque contiguo, provocando un colapso catastrófico (*Segmentation Fault*) al invocar \`free()\`.

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **System Call**: Instrucción de interfaz que solicita al Kernel del sistema operativo ejecutar una acción privilegiada.
* **Descriptor de Archivo**: Índice entero de bajo nivel que identifica un canal de E/S abierto.
* **Inodo**: Estructura de datos en disco que contiene todos los metadatos de un archivo excepto su nombre.
* **sbrk / brk**: Llamada al sistema UNIX para incrementar o decrementar el límite superior de memoria del Heap (*Program Break*).
* **Fragmentación**: Degradación de la eficiencia de la memoria por la dispersión de bloques libres pequeños.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **Kernighan & Ritchie (K&R C)**: Capítulo 8 completo (*The UNIX System Interface*), Secciones 8.1 a 8.7 (págs. 169–189).
* **Resumen en Una Frase**:
  > *"Comprender la interfaz UNIX en C de demarca el límite exacto donde el software deja de ser código abstracto para convertirse en instrucciones físicas ejecutadas por el sistema operativo."*
`,
    codeExamples: [
      {
        title: '1. Simulación de Reserva Dinámica y Liberación en el Heap',
        description: 'Demostración práctica de asignación de memoria con malloc y comprobación de puntero libre.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*) malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Error al asignar memoria\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 100;
        printf("Bloque %d: %d en dirección %p\\n", i, arr[i], (void*)&arr[i]);
    }

    free(arr); // Devuelve el bloque al sistema
    printf("Memoria liberada correctamente al Heap.\\n");
    return 0;
}`,
        expectedOutput: `Bloque 0: 100 en dirección 0x7ffd10\nBloque 1: 200 en dirección 0x7ffd14\nBloque 2: 300 en dirección 0x7ffd18\nBloque 3: 400 en dirección 0x7ffd1c\nBloque 4: 500 en dirección 0x7ffd20\nMemoria liberada correctamente al Heap.`
      },
      {
        title: '2. Implementación de miCalloc con malloc y memset',
        description: 'Asignación de memoria en el Heap garantizando inicialización limpia a ceros.',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void* miCalloc(size_t n, size_t size) {
    size_t total = n * size;
    void *p = malloc(total);
    if (p != NULL) {
        memset(p, 0, total);
    }
    return p;
}

int main() {
    int *arr = (int*) miCalloc(5, sizeof(int));
    printf("Primer elemento inicializado a cero: %d\\n", arr[0]);
    free(arr);
    return 0;
}`,
        expectedOutput: `Primer elemento inicializado a cero: 0`
      }
    ],
    exercises: [
      {
        id: 'ex-cap8-niv1',
        title: 'Nivel 1 (Conceptual): Identificación de Descriptores de Archivo Estándar',
        description: 'Escribe una función C `int obtenerDescriptorError(void)` que retorne el valor numérico del descriptor de archivo asignado por UNIX a la salida de errores estándar `stderr`.',
        cormenRef: 'K&R Cap 8 - Sec 8.1',
        initialCode: '#include <stdio.h>\n\nint obtenerDescriptorError(void) {\n    // TODO: Retorna el entero del descriptor de stderr\n    return -1;\n}',
        solutionCode: '#include <stdio.h>\n\nint obtenerDescriptorError(void) {\n    return 2; // 0: stdin, 1: stdout, 2: stderr\n}',
        hint: 'Los descriptores estándar son 0 (stdin), 1 (stdout) y 2 (stderr).',
        testCases: [
          {
            id: 'tc-c8-1',
            description: 'Obtener descriptor de stderr -> debe retornar 2',
            input: '',
            expectedOutput: '2'
          }
        ],
        explanation: 'UNIX asigna el entero 2 al flujo de error estándar stderr al iniciar cada proceso.'
      },
      {
        id: 'ex-cap8-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Asignador Limpio miCalloc con memset',
        description: 'La función `miCalloc` debe reservar memoria dinámica con `malloc` y limpiarla a cero con `memset`. Corrige el cálculo de bytes total.',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nvoid* miCalloc(size_t n, size_t size) {\n    // BUG: Multiplica mal los bytes para memset\n    void *p = malloc(n);\n    if (p) memset(p, 0, n);\n    return p;\n}',
        solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nvoid* miCalloc(size_t n, size_t size) {\n    size_t total = n * size;\n    void *p = malloc(total);\n    if (p != NULL) {\n        memset(p, 0, total);\n    }\n    return p;\n}',
        hint: 'El tamaño total en bytes es `n * size`. Pasa `total` a `malloc` y a `memset`.',
        testCases: [
          {
            id: 'tc-c8-2',
            description: 'Asignar 5 enteros de 4 bytes -> limpia 20 bytes a cero',
            input: '5, 4',
            expectedOutput: '0'
          }
        ],
        explanation: '`calloc` requiere multiplicar el número de elementos `n` por el tamaño individual de cada elemento `size`.'
      },
      {
        id: 'ex-cap8-niv3-impl',
        title: 'Nivel 3 (Implementación C): Copia de Archivos con read() y write() unbuffered',
        description: 'Escribe una función C `int simularCopiaUnbuffered(int bytesCopiar)` que devuelva la cantidad total de bytes transferidos.',
        cormenRef: 'K&R Cap 8 - Sec 8.2',
        initialCode: '#include <stdio.h>\n\nint simularCopiaUnbuffered(int bytesCopiar) {\n    // TODO: Simula el bucle read/write retornando la cantidad de bytes procesados\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint simularCopiaUnbuffered(int bytesCopiar) {\n    if (bytesCopiar < 0) return 0;\n    return bytesCopiar;\n}',
        hint: 'Retorna `bytesCopiar` si es mayor o igual a 0, de lo contrario 0.',
        testCases: [
          {
            id: 'tc-c8-3',
            description: 'Copiar 1024 bytes -> retorna 1024',
            input: '1024',
            expectedOutput: '1024'
          }
        ],
        explanation: 'Las transferencias directas leen y escriben chunks contiguos de bytes retornando el total transferido.'
      },
      {
        id: 'ex-cap8-niv4-analisis',
        title: 'Nivel 4 (Análisis): Cálculo del Tamaño de Cabecera Header en Malloc de K&R',
        description: 'Escribe una función C `size_t obtenerTamanioHeader(void)` que devuelva `sizeof(Header)` garantizando la alineación estricta de memoria.',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n\ntypedef long Align;\nunion header {\n    struct {\n        union header *ptr;\n        unsigned size;\n    } s;\n    Align x;\n};\ntypedef union header Header;\n\nsize_t obtenerTamanioHeader(void) {\n    // TODO: Devuelve sizeof(Header)\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\ntypedef long Align;\nunion header {\n    struct {\n        union header *ptr;\n        unsigned size;\n    } s;\n    Align x;\n};\ntypedef union header Header;\n\nsize_t obtenerTamanioHeader(void) {\n    return sizeof(Header);\n}',
        hint: 'Retorna `sizeof(Header)`.',
        testCases: [
          {
            id: 'tc-c8-4',
            description: 'Obtener sizeof(Header) -> debe retornar mayor a 0 (ej. 16 en 64-bits)',
            input: '',
            expectedOutput: '16'
          }
        ],
        explanation: 'La `union header` fuerza al compilador a alinear cada bloque al tamaño de palabra más estricto del procesador (8 o 16 bytes).'
      },
      {
        id: 'ex-cap8-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Gestor de Asignación de Bloque de Memoria Fija',
        description: 'Escribe una función C `void* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida)` que asigne un bloque contiguo dentro de un buffer `pool` pre-reservado y actualice el `offset`. Si no hay espacio suficiente, retorna `NULL`. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n\nvoid* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida) {\n    // TODO: Verifica si *offset + bytesPedida <= tamanioPool y retorna la dirección\n    return NULL;\n}',
        solutionCode: '#include <stdio.h>\n\nvoid* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida) {\n    if (*offset + bytesPedida > tamanioPool) return NULL;\n    void *p = &pool[*offset];\n    *offset += bytesPedida;\n    return p;\n}',
        hint: 'Verifica si `*offset + bytesPedida <= tamanioPool`. Si es válido, guarda `&pool[*offset]`, incrementa `*offset` y retorna la dirección.',
        testCases: [
          {
            id: 'tc-c8-5',
            description: 'Pedir 64 bytes de un pool de 1024 -> asignación exitosa',
            input: '64',
            expectedOutput: '64'
          }
        ],
        explanation: 'Un asignador de arena o pool administra bloques contiguos incrementando un puntero de avance (*bump allocator*) de forma ultrafast $O(1)$.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c8-1',
        question: '¿Cuál es el descriptor de archivo estándar asignado por los sistemas UNIX a la salida de errores (stderr)?',
        options: ['0', '1', '2', '3'],
        correctIndex: 2,
        explanation: '0 representa la entrada estándar stdin, 1 la salida estándar stdout y 2 la salida de errores stderr.'
      },
      {
        id: 'q-c8-2',
        question: '¿Qué función cumple la llamada al sistema sbrk() en la implementación de malloc() en sistemas UNIX?',
        options: [
          'Escribir texto en la impresora.',
          'Solicitar al Kernel incrementar o decrementar el límite superior del segmento de datos (Heap) del proceso.',
          'Cerrar los descriptores de archivo inactivos.',
          'Crear un nuevo hilo de ejecución.'
        ],
        correctIndex: 1,
        explanation: 'sbrk() expande el espacio de direcciones disponible en el Heap para que el asignador malloc pueda satisfacer nuevas solicitudes de memoria.'
      },
      {
        id: 'q-c8-3',
        question: '¿Por qué la llamada al sistema read() devuelve el valor 0 al leer un archivo?',
        options: [
          'Ocurrió un error grave en el disco duro.',
          'Indica que se ha alcanzado el Fin de Archivo (EOF - End Of File).',
          'El archivo se encuentra protegido contra escritura.',
          'La memoria RAM está llena.'
        ],
        correctIndex: 1,
        explanation: 'read() devuelve 0 bytes leídos cuando el puntero del archivo alcanza el final del archivo (EOF).'
      }
    ]
  }
];
