import { CourseItem } from '../types';

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'clase-1',
    number: 1,
    type: 'class',
    title: 'Clase 1 – Introducción al Curso',
    topic: '¿Qué es un algoritmo y por qué la complejidad importa?',
    cormenChapter: 'Capítulo 1: El papel de los algoritmos en la informática',
    durationMinutes: 45,
    summary: 'Compr\endi\endo la definición formal de algoritmo, la noción de problema computacional y la diferencia abismal entre eficiencia computacional y simple hardware rápido.',
    theoryContent: `
### 1. ¿Qué es un Algoritmo?
Según **Cormen et al. (CLRS, Cap. 1.1)**, informalmente un **algoritmo** es cualquier procedimiento computacional bien definido que toma algún valor o conjunto de valores como **entrada** y produce algún valor o conjunto de valores como **salida**. 

Un algoritmo es una secuencia de pasos computaciona\les que transforman la entrada en la salida. También podemos verlo como una herramienta para resolver un **problema computacional bien especificado**.

#### Ejemplo Cotidiano
Imagínate una receta para hornear un pastel:
* **Entrada**: Harina, huevos, azúcar, leche, horno precalentado a 180°C.
* **Pasos (Algoritmo)**: 1) Mezclar secos, 2) Batir líquidos, 3) Unir y hornear 35 minutos.
* **Salida**: Un pastel listo para comer.

En ciencias de la computación, un problema clásico es **Ordenar una secuencia de números**:
* **Entrada**: Una secuencia de $n$ números $\\langle a_1, a_2, \\dots, a_n \rang\le$.
* **Salida**: Una reordenación $\\langle a'_1, a'_2, \\dots, a'_n \rang\le$ tal que $a'_1 \le a'_2 \le \\dots \le a'_n$.

---

### 2. ¿Por qué estudiar Complejidad Algorítmica?
¿Por qué nos importa la velocidad de un algoritmo si las supercomputadoras ejecutan miles de millones de instrucciones por segundo?

Veamos la comparación célebre de Cormen (Cap. 1.2):
Supongamos que enfrentamos una computadora ultra rápida **SuperA** (ejecuta $10^{10}$ instrucciones/seg) ejecutando un algoritmo de ordenamiento lento con tiempo $2n^2$, contra una computadora modesta **LentaB** (ejecuta solo $10^7$ instrucciones/seg) ejecutando Mergesort con tiempo $50n \\log_2 n$.

Para ordenar **10 millones de números ($n = 10^7$)**:
* **SuperA con Algoritmo $O(n^2)$**:
  $$\\text{Tiempo} = \\frac{2 \\times (10^7)^2}{10^{10}} = 20,000 \\text{ segundos} \\approx 5.5 \\text{ horas.}$$
* **LentaB con Algoritmo $O(n \\log n)$**:
  $$\\text{Tiempo} = \\frac{50 \\times 10^7 \\times \\log_2(10^7)}{10^7} \\approx 50 \\times 23.25 \\approx 1,163 \\text{ segundos} \\approx 19.3 \\text{ minutos!}$$

¡La computadora 1000 veces más lenta venció a la supercomputadora por más de 16 veces gracias a usar un algoritmo superior! **Los algoritmos son la tecnología clave.**
    `,
    visualizerType: 'big_o_chart',
    checkQuestions: [
      {
        id: 'q1-1',
        question: 'Según el libro de Cormen, ¿cuál es la definición formal básica de un algoritmo?',
        options: [
          'Un programa escrito exclusivamente en lenguaje C o Ensamblador.',
          'Un procedimiento computacional bien definido que transforma una entrada en una salida deseada.',
          'Una supercomputadora capaz de procesar datos en para\lelo.',
          'Una fórmula matemática sin aplicación práctica en software.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! En Cormen Cap 1.1, un algoritmo se define como cualquier procedimiento bien definido que toma entradas y genera salidas exactas.',
        analogousExplanation: 'Piensa en una licuadora: \le pones fruta y leche (Entrada), sigue las revoluciones de las aspas (Pasos/Algoritmo) y te entrega un licuado perfecto (Salida).'
      },
      {
        id: 'q1-2',
        question: 'Si tenemos $n=1,000,000$, ¿por qué un algoritmo $O(n \\log n)$ supera drásticamente a uno $O(n^2)$ incluso en una computadora más lenta?',
        options: [
          'Porque el número total de operaciones de $n \\log n$ crece muchísimo más despacio que $n^2$ cuando $n$ aumenta.',
          'Porque la computadora lenta tiene más memoria RAM.',
          'Porque $n^2$ siempre usa menos ciclos de procesador.',
          'Porque la notación no afecta el tiempo real de ejecución.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! El orden de crecimiento del algoritmo domina el tiempo de ejecución a medida que el volumen de datos aumenta.',
        analogousExplanation: 'Imagina recorrer a pie 10km ($n \\log n$) en vez de dar vueltas en auto en un embotellamiento de 100km ($n^2$). Aunque el auto corra más, la ruta corta gana.'
      }
    ],
    exercises: [
      {
        id: "ex-1",
        title: "Ejercicio 1: Calculador de Pasos Algorítmicos en C",
        description: "Escribe una función en C `const char* compararEficacia(int n)` que reciba $n$ y compare el número exacto de operaciones de un algoritmo $f(n) = 2n^2$ contra $g(n) = 50n \\log_2(n)$. La función debe retornar `\"f_es_mejor\"` si $f(n) < g(n)$ o `\"g_es_mejor\"` en caso contrario.",
        cormenRef: "Cormen Cap 1.2 - Ejercicios 1.2-2 y 1.2-3",
        initialCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n  // f(n) = 2 * n^2\n  // g(n) = 50 * n * log2(n)\n  \n  // TODO: Escribe tu código en C aquí\n  return \"\";\n}",
        solutionCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n  double f = 2 * pow(n, 2);\n  double g = 50 * n * log2(n);\n  if (f < g) {\n    return \"f_es_mejor\";\n  } else {\n    return \"g_es_mejor\";\n  }\n}",
        hint: "Usa la función pow(n, 2) de <math.h> para f(n), y log2(n) para g(n). Retorna \"f_es_mejor\" o \"g_es_mejor\".",
        testCases: [
          {
                    "id": "t1",
                    "description": "Para n = 10 (f=200, g=1660)",
                    "input": "10",
                    "expectedOutput": "f_es_mejor"
          },
          {
                    "id": "t2",
                    "description": "Para n = 100 (f=20000, g=33219)",
                    "input": "100",
                    "expectedOutput": "f_es_mejor"
          },
          {
                    "id": "t3",
                    "description": "Para n = 1000 (f=2000000, g=498289)",
                    "input": "1000",
                    "expectedOutput": "g_es_mejor"
          }
],
        explanation: "Para valores pequeños de $n$, la constante 50 hace que $f(n)$ parezca más rápido. Pero para $n=1000$ en adelante, $g(n)$ es inmensamente más eficiente."
      }
    ],
    nextItemId: 'clase-2'
  },

  {
    id: 'clase-2',
    number: 2,
    type: 'class',
    title: 'Clase 2 – Repaso de Programación Básica',
    topic: 'Variab\les, tipos, condiciona\les, bucles while/for, funciones y pseudocódigo',
    cormenChapter: 'Capítulo 2: Primeros Pasos (Pseudocódigo del libro)',
    durationMinutes: 50,
    summary: 'Revisión estructural del pseudocódigo de Cormen: bucles de control, variables, paso de parámetros e invariantes.',
    theoryContent: `
### 1. Pseudocódigo al Estilo Cormen (CLRS)
En el libro de Cormen, los algoritmos no se escriben en un lenguaje específico (como C++ o Java), sino en **pseudocódigo**. El pseudocódigo de Cormen sigue reglas claras:

1. **Sangría (Indentation)**: Reemplaza las llaves \`{}\` o palabras \`begin/\\end\`. Define la estructura de bloques.
2. **Estructuras de Control**:
   * \`while\` condición \`do\`
   * \`for\` $i = 1$ \`to\` $n$ \`do\`
   * \`if\` condición \`then\` ... \`else\` ...
3. **Arreglos**: Se denotan con $A[i]$. **En Cormen, los índices habitualmente empiezan en 1 ($A[1 \\dots n]$)**, aunque en JS/C/C++ empiezan en 0.
4. **Paso por valor / referencia**: Los tipos compuestos (arreglos y objetos) se pasan por referencia (puntero a los datos).

---

### 2. Estructuras de Bucles e Invariante de Bucle
Un concepto fundamental en Cormen es la **Invariante de Bucle** (Loop Invariant), que nos permite demostrar que un bucle es correcto analizando 3 propiedades:
1. **Inicialización**: Es verdadera antes de la primera iteración del bucle.
2. **Mantenimiento**: Si es verdadera antes de una iteración, se mantiene verdadera antes de la siguiente.
3. **Terminación**: Al finalizar el bucle, la invariante nos da una propiedad útil para demostrar la corrección del algoritmo.
    `,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q2-1',
        question: 'En el pseudocódigo estándar del libro de Cormen (CLRS), ¿en qué número de índice comienzan usualmente los arreglos?',
        options: ['En índice 0', 'En índice 1', 'En índice -1', 'No tienen índices'],
        correctIndex: 1,
        explanation: '¡Correcto! Cormen adopta la convención matemática donde los arreglos van de A[1] a A[n]. Cuando programemos en JS/C adaptaremos los índices a base 0.',
        analogousExplanation: 'En matemática tradicional contamos del 1 al 10. En informática física (C/JS) contamos desde el desplazamiento cero (offset 0).'
      }
    ],
    exercises: [
      {
        id: "ex-2",
        title: "Ejercicio 2: Acumulador y Bucle Incremental en C",
        description: "Escribe una función en C `int sumarArreglo(int arr[], int n)` que calcule la suma de todos los elementos de un arreglo de tamaño `n` usando un bucle iterativo.",
        cormenRef: "Cormen Cap 2.1 - Estructuras de bucle en pseudocódigo",
        initialCode: "#include <stdio.h>\n\nint sumarArreglo(int arr[], int n) {\n  int suma = 0;\n  // TODO: Implementa el bucle en C\n  return suma;\n}",
        solutionCode: "#include <stdio.h>\n\nint sumarArreglo(int arr[], int n) {\n  int suma = 0;\n  for (int i = 0; i < n; i++) {\n    suma += arr[i];\n  }\n  return suma;\n}",
        hint: "Itera con una variable entera `i` desde 0 hasta `n - 1` acumulando `arr[i]` en `suma`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Sumar [1, 2, 3, 4, 5], n=5",
                    "input": "[1, 2, 3, 4, 5], 5",
                    "expectedOutput": "15"
          },
          {
                    "id": "t2",
                    "description": "Sumar [10, -5, 20], n=3",
                    "input": "[10, -5, 20], 3",
                    "expectedOutput": "25"
          },
          {
                    "id": "t3",
                    "description": "Arreglo vacío, n=0",
                    "input": "[], 0",
                    "expectedOutput": "0"
          }
],
        explanation: "Este bucle realiza exactamente $n$ iteraciones para un arreglo de longitud $n$, con una complejidad de tiempo $O(n)$."
      }
    ],
    prevItemId: 'clase-1',
    nextItemId: 'clase-3'
  },

  {
    id: 'clase-3',
    number: 3,
    type: 'class',
    title: 'Clase 3 – Introducción al Lenguaje C para Cormen',
    topic: 'Sintaxis de C indispensable, punteros e\lementa\les, arreglos y estructuras (structs)',
    cormenChapter: 'Capítulo 10.3 y Apéndice B: Representación de estructuras de datos en memoria',
    durationMinutes: 55,
    summary: 'Apr\ender a \leer la memoria de la computadora: direcciones de memoria (\`&\`), desreferenciación de punteros (\`*\`), arreglos contiguos y campos de estructuras (\`struct\`).',
    theoryContent: `
### 1. ¿Por qué apr\ender los conceptos de C?
Para compr\ender profundamente el libro de Cormen y la gestión de memoria real de un algoritmo, necesitamos ent\ender qué es un **puntero** y cómo se almacenan las estructuras de datos en la memoria RAM.

### 2. Punteros y Direcciones de Memoria
La memoria RAM es una secuencia gigante de casilleros numerados (direcciones de memoria, ej. \`0x7fff5fbff7c0\`).

* **Declaración de variable**: \`int x = 42;\` (Guarda el valor 42 en un casillero).
* **Operador Dirección (\`&\`)**: \`&x\` obtiene la dirección de memoria donde vive \`x\`.
* **Variab\le Puntero (\`*\`)**: \`int *p = &x;\` (La variable \`p\` almacena la dirección de memoria de \`x\`).
* **Desreferenciación (\`*p\`)**: \`*p = 100;\` cambia el valor guardado en la dirección almacenada por \`p\` (modifica \`x\` a 100).

\`\`\`c
int x = 10;
int *p = &x; // p apunta a x

printf("Valor de x: %d\\n", x);   // Imprime 10
printf("Dirección de x: %p\\n", p); // Imprime dirección en RAM
*p = 25;                         // Modificamos x a través de p!
printf("Nuevo x: %d\\n", x);      // Imprime 25
\`\`\`

---

### 3. Estructuras (\`struct\`) y Punteros en C
En C, un \`struct\` agrupa datos relacionados. Para acceder a sus campos a través de un puntero usamos el operador f\lecha \`->\`:

\`\`\`c
struct Nodo {
    int dato;
    struct Nodo *siguiente;
};

struct Nodo n1;
n1.dato = 5;

struct Nodo *punteroNodo = &n1;
punteroNodo->dato = 10; // Equiva\le a (*punteroNodo).dato = 10
\`\`\`
    `,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q3-1',
        question: 'En C, si tenemos `int a = 50; int *ptr = &a;`, ¿qué hace la instrucción `*ptr = 99;`?',
        options: [
          'Cambia la dirección de memoria almacenada en ptr a 99.',
          'Modifica directamente el valor de la variable `a` asignándo\le 99.',
          'Produce un error de compilación.',
          'Crea un nuevo puntero en memoria.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! El operador `*` (desreferenciación) accede al contenido guardado en la dirección de memoria a la que apunta `ptr`.',
        analogousExplanation: 'Si `ptr` es el número de un casillero de correo, `*ptr = 99` abre ese casillero concreto y pone adentro el paquete número 99.'
      }
    ],
    exercises: [
      {
        id: "ex-3",
        title: "Ejercicio 3: Intercambio de Variables con Punteros (Swap) en C",
        description: "Escribe una función en C `void intercambiar(int *a, int *b)` que intercambie los valores de dos enteros en memoria usando punteros y una variable temporal.",
        cormenRef: "Cormen Cap 10.3 - Apéndice B (Punteros y Memoria)",
        initialCode: "#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n  // TODO: Usa una variable temporal e intercambia los valores desreferenciando los punteros\n}",
        solutionCode: "#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}",
        hint: "Usa `int temp = *a;` para guardar el valor desreferenciado de `a`, asigna `*a = *b;` y finalmente `*b = temp;`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Intercambiar a=5, b=10",
                    "input": "5, 10",
                    "expectedOutput": "undefined"
          }
],
        explanation: "Al pasar las direcciones de memoria `&x` y `&y`, la función modifica directamente las variables originales en RAM mediante desreferenciación (`*`)."
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
