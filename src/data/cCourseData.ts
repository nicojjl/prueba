import { CChapter } from '../types';

export const C_COURSE_DATA: CChapter[] = [
  {
    id: 'cap-1',
    chapterNumber: 1,
    title: 'Capítulo 1: Introducción General (El Tutorial K&R)',
    subtitle: 'Fundamentos esenciales del Lenguaje C: Sintaxis, Memoria, Estructuras de Control y Vectores',
    icon: '📘',
    description: 'Aprende la arquitectura básica de un programa en C, la diferencia entre enteros y flotantes, el modelo de entrada/salida de caracteres y el manejo elemental de arreglos y funciones.',
    summary: 'El primer capítulo establece los cimientos del estándar C de Kernighan & Ritchie. Comprenderás la compilación, la función main(), el control de flujo y la representación contigua de arreglos.',
    keyConcepts: [
      '#include y stdio.h',
      'Función main()',
      'printf y scanf',
      'Variables int y float',
      'Ciclos while y for',
      'Constantes simbólicas (#define)',
      'getchar() y putchar()',
      'EOF (End Of File)',
      'Arreglos y carácter nulo \\0',
      'Funciones y paso por valor'
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
    theoryContent: `### 1.1 Estructura Mínima de un Programa C
El lenguaje **C** es un lenguaje de programación estructurado, compilado de medio-bajo nivel creado por Dennis Ritchie en los Laboratorios Bell. A diferencia de lenguajes interpretados, C traduce el código fuente directamente a instrucciones de máquina nativas.

#### El Clásico "Hola, Mundo"
\`\`\`c
#include <stdio.h>

int main(void) {
    printf("¡Hola, mundo! Bienvenido al estándar K&R C\\n");
    return 0;
}
\`\`\`

1. **\`#include <stdio.h>\`**: Le indica al preprocesador de C que incluya la cabecera de entrada/salida estándar (*Standard Input/Output*), permitiendo el uso de funciones como \`printf\` y \`getchar\`.
2. **\`int main(void)\`**: Es el punto de entrada obligatorio para todo programa C. El sistema operativo invoca a \`main\` al iniciar el proceso.
3. **\`printf(...)\`**: Función de formato para imprimir cadenas en la consola estándar. Las secuencias de escape como \`\\n\` representan un salto de línea.
4. **\`return 0;\`**: Devuelve el código de estado 0 al sistema operativo, señalando una ejecución exitosa sin errores.

---

### 1.2 Variables y Expresiones Aritméticas
En C, todas las variables deben declararse antes de utilizarse, especificando su tipo de dato y reservando un bloque contiguo en la memoria RAM.

#### Ejemplo de Conversión de Temperatura (Fahrenheit a Celsius)
Fórmula matemática: $C = \\frac{5}{9} \\times (F - 32)$

\`\`\`c
#include <stdio.h>

int main() {
    float fahr, celsius;
    float lower = 0, upper = 100, step = 20;

    fahr = lower;
    printf("Fahrenheit\\tCelsius\\n");
    printf("------------------------\\n");
    while (fahr <= upper) {
        celsius = (5.0 / 9.0) * (fahr - 32.0);
        printf("%6.0f\\t%8.2f\\n", fahr, celsius);
        fahr = fahr + step;
    }
    return 0;
}
\`\`\`
* **Atención a la División Entera**: En C, la expresión \`5 / 9\` realiza una división de enteros y retorna \`0\`. Para obtener decimales precisos se debe escribir \`5.0 / 9.0\`.
* **Especificadores de Formato**: \`%6.0f\` imprime un número flotante en un campo de 6 caracteres sin decimales; \`%8.2f\` imprime en 8 caracteres con 2 decimales.

---

### 1.3 Ciclos for, while y Constantes Simbólicas
El ciclo \`for\` condensa la inicialización, la condición de parada y el incremento en una sola línea elegante:

\`\`\`c
#include <stdio.h>

#define LOWER 0     /* Límite inferior de la tabla */
#define UPPER 100   /* Límite superior */
#define STEP  20    /* Tamaño del incremento */

int main() {
    for (int fahr = LOWER; fahr <= UPPER; fahr += STEP) {
        printf("%3d F = %5.1f C\\n", fahr, (5.0 / 9.0) * (fahr - 32));
    }
    return 0;
}
\`\`\`
* **Directiva \`#define\`**: Reemplaza sustituciones de texto durante la fase del preprocesador, eliminando "números mágicos" hardcodeados en el código.

---

### 1.4 Entrada y Salida de Caracteres
El modelo E/S de C trata el texto como un flujo continuo de bytes (*stream*).

* **\`getchar()\`**: Lee el siguiente carácter del flujo de entrada y retorna su valor ASCII como un \`int\`.
* **\`putchar(c)\`**: Escribe el carácter \`c\` en la consola estándar.
* **\`EOF\`**: Constante entera especial (End-Of-File, generalmente \`-1\`) devuelta cuando el flujo se agota o termina.

#### Copia de Flujos de Texto:
\`\`\`c
#include <stdio.h>

int main() {
    int c;
    while ((c = getchar()) != EOF) {
        putchar(c);
    }
    return 0;
}
\`\`\`

---

### 1.5 Arreglos y Cadenas de Caracteres
Un arreglo es un bloque contiguo de elementos indexados desde \`0\` hasta \`N - 1\`. En C, una cadena de texto es simplemente un arreglo de caracteres finalizado con el byte nulo \`'\\0'\`.

\`\`\`c
#include <stdio.h>

int longitudCadena(char s[]) {
    int i = 0;
    while (s[i] != '\\0') {
        i++;
    }
    return i;
}

int main() {
    char mensaje[] = "Lenguaje C K&R";
    printf("Cadena: %s | Longitud: %d bytes\\n", mensaje, longitudCadena(mensaje));
    return 0;
}
\`\`\``,
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
        title: '2. Contador de Frecuencia de Caracteres',
        description: 'Uso de arreglos indexados por caracteres ASCII para contar apariciones de dígitos.',
        code: `#include <stdio.h>

int main() {
    int digitos[10] = {0};
    char texto[] = "Cormen 2026 - Lenguaje C Edicion Pro 99";

    for (int i = 0; texto[i] != '\\0'; i++) {
        if (texto[i] >= '0' && texto[i] <= '9') {
            digitos[texto[i] - '0']++;
        }
    }

    printf("Conteo de dígitos encontrados:\\n");
    for (int i = 0; i < 10; i++) {
        if (digitos[i] > 0) {
            printf("Dígito '%d': %d veces\\n", i, digitos[i]);
        }
    }
    return 0;
}`,
        expectedOutput: `Conteo de dígitos encontrados:\nDígito '0': 1 veces\nDígito '2': 2 veces\nDígito '6': 1 veces\nDígito '9': 2 veces`
      }
    ],
    exercises: [
      {
        id: 'ex-cap1-1',
        title: 'Ejercicio 1.1: Impresión de Tabla Invertida',
        description: 'Modifica la rutina de conversión para imprimir la tabla de temperaturas en orden inverso (de 300°F a 0°F de 20 en 20).',
        cormenRef: 'K&R Cap 1 - Sec 1.3',
        initialCode: `#include <stdio.h>

int main() {
    // Escribe un ciclo for que comience en fahr = 300 y baje hasta 0
    // Imprime con formato %3d F = %6.1f C
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    for (int fahr = 300; fahr >= 0; fahr -= 20) {
        printf("%3d F = %6.1f C\\n", fahr, (5.0 / 9.0) * (fahr - 32));
    }
    return 0;
}`,
        hint: 'Usa la estructura for (int fahr = 300; fahr >= 0; fahr -= 20)',
        testCases: [
          {
            id: 'tc-1',
            description: 'Valida primera línea a 300°F',
            input: '',
            expectedOutput: '300 F =  148.9 C'
          }
        ],
        explanation: 'El ciclo for decrece el contador de 20 en 20 asegurando que fahr >= 0.'
      },
      {
        id: 'ex-cap1-2',
        title: 'Ejercicio 1.2: Contador de Palabras y Espacios',
        description: 'Implementa una función que reciba una cadena y cuente el número exacto de palabras en ella.',
        cormenRef: 'K&R Cap 1 - Sec 1.5.4',
        initialCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    // Implementa una máquina de estados sencilla (IN / OUT)
    return 0;
}

int main() {
    char texto[] = "Estructuras de Datos y Algoritmos en C";
    printf("Palabras: %d\\n", contarPalabras(texto));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    int estado = 0; // 0 = OUT, 1 = IN
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
        hint: 'Usa una bandera para saber si estás dentro o fuera de una palabra.',
        testCases: [
          {
            id: 'tc-2',
            description: 'Valida el conteo de 7 palabras',
            input: '',
            expectedOutput: 'Palabras: 7'
          }
        ],
        explanation: 'La bandera detecta las transiciones desde espacios a caracteres de palabra.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c1-1',
        question: '¿Por qué la función getchar() devuelve un int en lugar de un char?',
        options: [
          'Porque en C no existe el tipo char.',
          'Para poder devolver el valor entero especial EOF (-1) que no cabe en un char sin signo.',
          'Porque la CPU ejecuta más rápido las operaciones con int.',
          'Para permitir la lectura de caracteres de 32 bits únicamente.'
        ],
        correctIndex: 1,
        explanation: 'getchar() debe distinguir entre cualquier carácter ASCII válido (0-255) y la señal de fin de archivo EOF (-1), lo cual requiere un tipo entero de mayor rango.'
      },
      {
        id: 'q-c1-2',
        question: '¿Cuál es el resultado de evaluar 5 / 9 en una expresión entera en C?',
        options: ['0.5555', '1', '0', 'Error de compilación'],
        correctIndex: 2,
        explanation: 'En C, la división entre dos operandos enteros trunca la parte decimal y retorna únicamente la parte entera (0).'
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
    description: 'Domina las bibliotecas estándar de E/S de C: formateo avanzado con printf y sprintf, lectura formateada con scanf y sscanf, manipulación de archivos mediante FILE*, fopen, fclose, fread, fwrite y manejo de errores con ferror y feof.',
    summary: 'Aprende a persistir datos en el disco duro y procesar flujos de texto e imágenes en formato binario.',
    keyConcepts: [
      'stdin, stdout, stderr',
      'printf y sprintf',
      'scanf y sscanf',
      'Estructura FILE*',
      'fopen y fclose',
      'getc, putc, fgets, fputs',
      'Entrada/Salida binaria (fread, fwrite)',
      'fseek y ftell',
      'feof y ferror'
    ],
    analogies: [
      {
        title: 'El Descriptor FILE* como un Marcapáginas en un Libro',
        concept: 'Lectura secuencial de archivos en disco',
        analogy: 'Abrir un archivo con fopen() coloca un marcapáginas en el primer carácter del libro. Cada llamada a getc() lee el carácter y mueve el marcapáginas una letra hacia adelante.',
        whyItWorks: 'Visualiza la naturaleza secuencial del puntero interno de posición de archivo.'
      }
    ],
    theoryContent: `### 7.1 Manipulación de Archivos en C (FILE*)
Para manipular archivos en el disco, C utiliza un puntero a la estructura **\`FILE\`**.

#### Modos de Apertura en \`fopen()\`:
* **\`"r"\`**: Lectura (el archivo debe existir).
* **\`"w"\`**: Escritura (crea un archivo nuevo o sobrescribe el existente).
* **\`"a"\`**: Anexar (*append*, escribe al final del archivo).
* **\`"rb"\` / \`"wb"\`**: Lectura/Escritura en formato binario.

\`\`\`c
#include <stdio.h>

int main() {
    char buffer[100];
    // Simulación conceptual de manejo de cadenas formateadas
    sprintf(buffer, "Log generado para el ciclo 2026 en C");
    printf("Buffer formateado en memoria: %s\\n", buffer);
    return 0;
}
\`\`\``,
    codeExamples: [
      {
        title: '1. Formateo de Cadenas con sprintf y sscanf',
        description: 'Procesamiento de texto e interpretaciones de formato directamente en memoria.',
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
      }
    ],
    exercises: [
      {
        id: 'ex-cap7-1',
        title: 'Ejercicio 7.1: Comparador de Cadenas sscanf y printf',
        description: 'Escribe un programa que utilice sprintf para crear un reporte estandarizado.',
        cormenRef: 'K&R Cap 7 - Sec 7.2',
        initialCode: `#include <stdio.h>

int main() {
    char reporte[100];
    // Usa sprintf para llenar el reporte con "ID: 42 | Estado: OK"
    printf("%s\\n", reporte);
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    char reporte[100];
    sprintf(reporte, "ID: %d | Estado: %s", 42, "OK");
    printf("%s\\n", reporte);
    return 0;
}`,
        hint: 'Sintaxis: sprintf(destino, "formato", valores...)',
        testCases: [
          {
            id: 'tc-cap7-1',
            description: 'Valida reporte formateado',
            input: '',
            expectedOutput: 'ID: 42 | Estado: OK'
          }
        ],
        explanation: 'sprintf construye la cadena formateada directamente en la memoria RAM.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c7-1',
        question: '¿Cuál es el valor retornado por fopen() si falla al abrir un archivo especificado?',
        options: ['EOF (-1)', 'NULL', '0', 'Un entero negativo'],
        correctIndex: 1,
        explanation: 'Si el archivo no existe o no se poseen permisos, fopen() devuelve el puntero nulo NULL.'
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
      'Descriptores de Archivo (0, 1, 2)',
      'Llamadas al sistema read() y write()',
      'System call open() y close()',
      'Reposicionamiento con lseek()',
      'Estructuras de directorio e inodos (stat)',
      'Asignación interna de memoria Heap',
      'Llamada sbrk() / brk() del kernel',
      'Implementación de malloc() y free()',
      'Lista libre de bloques (Free List)'
    ],
    analogies: [
      {
        title: 'Llamadas al Sistema como la Ventanilla de un Banco',
        concept: 'User Space vs Kernel Space',
        analogy: 'Tu programa C es un cliente en la sala de espera (User Space). No puede entrar a la bóveda del banco (Hardware/Disco) directamente. Debe pasar una solicitud firmada a la ventanilla (System Call) para que el cajero (el Kernel) realice la operación segura.',
        whyItWorks: 'Explica la protección de memoria del procesador y las transiciones entre nivel de usuario y modo kernel.'
      }
    ],
    theoryContent: `### 8.1 Descriptores de Archivos y Llamadas al Sistema
En el sistema operativo UNIX, todos los dispositivos de entrada y salida se tratan como archivos. Un **descriptor de archivo** es un entero pequeño no negativo que identifica un flujo abierto:

* **\`0\`**: Entrada estándar (\`stdin\`).
* **\`1\`**: Salida estándar (\`stdout\`).
* **\`2\`**: Error estándar (\`stderr\`).

#### Entrada/Salida Básica de Bajo Nivel (\`read\` y \`write\`):
\`\`\`c
#include <unistd.h>

int main() {
    char buf[1024];
    int n;
    // Lee hasta 1024 bytes de stdin (0) y escribe en stdout (1)
    while ((n = read(0, buf, sizeof(buf))) > 0) {
        write(1, buf, n);
    }
    return 0;
}
\`\`\`

---

### 8.2 Asignación de Memoria Interna: Un Malloc Simplificado
El asignador de memoria Heap de K&R administra un bloque contiguo obtenido del sistema operativo mediante \`sbrk()\`. Administra una lista circular enlazada de bloques libres, donde cada bloque posee una cabecera con su tamaño y puntero al siguiente bloque libre:

\`\`\`c
typedef long Align; // Alineación al límite más estricto

union header {
    struct {
        union header *ptr; // Siguiente bloque libre
        unsigned size;     // Tamaño del bloque
    } s;
    Align x; // Forzar alineación de bloque
};

typedef union header Header;
\`\`\``,
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
      }
    ],
    exercises: [
      {
        id: 'ex-cap8-1',
        title: 'Ejercicio 8.1: Asignador con calloc Limpiado a Cero',
        description: 'Implementa la función miCalloc(n, size) utilizando malloc y memset para inicializar la memoria a cero.',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void* miCalloc(size_t n, size_t size) {
    // Asigna n * size bytes con malloc y usa memset para colocar ceros
    return NULL;
}

int main() {
    int *arr = (int*) miCalloc(5, sizeof(int));
    printf("Primer elemento inicializado a cero: %d\\n", arr[0]);
    free(arr);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
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
        hint: 'Usa memset(p, 0, total_bytes) para poner todos los bytes en 0.',
        testCases: [
          {
            id: 'tc-cap8-1',
            description: 'Valida inicialización limpia en cero',
            input: '',
            expectedOutput: 'Primer elemento inicializado a cero: 0'
          }
        ],
        explanation: 'miCalloc garantiza memoria limpia sin valores basura.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c8-1',
        question: '¿Cuál es el descriptor de archivo estándar asignado por UNIX a la salida de errores (stderr)?',
        options: ['0', '1', '2', '3'],
        correctIndex: 2,
        explanation: '0 es stdin, 1 es stdout y 2 es stderr.'
      }
    ]
  }
];
