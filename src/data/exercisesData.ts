import { Exercise } from '../types';

export const EXERCISES_BY_COURSE: Record<string, Exercise[]> = {
  'clase-1': [
    {
      id: "ex-1-1",
      title: "Ejercicio 1.1: Comparar Eficacia f(n) vs g(n) en C",
      description: "Escribe una función en C `const char* compararEficacia(int n)` que reciba $n$ y compare el número exacto de operaciones de un algoritmo $f(n) = 2n^2$ contra $g(n) = 50n \\log_2(n)$. Retorna `\"f_es_mejor\"` si $f(n) < g(n)$ o `\"g_es_mejor\"` en caso contrario.",
      cormenRef: "Cormen Cap 1.2 - Ejercicios 1.2-2",
      initialCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n  // f(n) = 2 * n^2\n  // g(n) = 50 * n * log2(n)\n  // TODO: Escribe tu código en C aquí\n  return \"\";\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n  double f = 2 * pow(n, 2);\n  double g = 50 * n * log2(n);\n  if (f < g) {\n    return \"f_es_mejor\";\n  } else {\n    return \"g_es_mejor\";\n  }\n}",
      hint: "Usa `pow(n, 2)` de `<math.h>` para $f(n)$ y `log2(n)` para $g(n)$.",
      testCases: [
        { id: "t1", description: "Para n = 10", input: "10", expectedOutput: "f_es_mejor" },
        { id: "t2", description: "Para n = 100", input: "100", expectedOutput: "f_es_mejor" },
        { id: "t3", description: "Para n = 1000", input: "1000", expectedOutput: "g_es_mejor" }
      ],
      explanation: "Para valores grandes de $n$, la tasa de crecimiento logarítmico $n \\log n$ aplasta al crecimiento cuadrático $n^2$."
    },
    {
      id: "ex-1-2",
      title: "Ejercicio 1.2: Factor de Aceleración de Hardware vs Algoritmo",
      description: "Escribe una función en C `double calcularFactorAceleracion(double tiempoSuper, double tiempoLento)` que retorne cuántas veces es más rápido el algoritmo eficiente dividiendo `tiempoSuper / tiempoLento`.",
      cormenRef: "Cormen Cap 1.2 - Eficiencia Algorítmica",
      initialCode: "#include <stdio.h>\n\ndouble calcularFactorAceleracion(double tiempoSuper, double tiempoLento) {\n  // TODO: Retorna tiempoSuper / tiempoLento\n  return 0.0;\n}",
      solutionCode: "#include <stdio.h>\n\ndouble calcularFactorAceleracion(double tiempoSuper, double tiempoLento) {\n  if (tiempoLento <= 0) return 0.0;\n  return tiempoSuper / tiempoLento;\n}",
      hint: "Simplemente divide `tiempoSuper / tiempoLento`.",
      testCases: [
        { id: "t1", description: "Super=20000s, Lento=1163s", input: "20000.0, 1163.0", expectedOutput: "17.196904557179708" },
        { id: "t2", description: "Super=100s, Lento=10s", input: "100.0, 10.0", expectedOutput: "10" }
      ],
      explanation: "Demuestra la ventaja abrumadora de un algoritmo eficiente sobre una máquina más rápida."
    },
    {
      id: "ex-1-3",
      title: "Ejercicio 1.3: Estimador de Tiempo Cuadrático en Segundos",
      description: "Escribe una función en C `double estimarTiempoCuadratico(int n, double instPerSec)` que calcule el tiempo en segundos para un algoritmo con $2n^2$ instrucciones ejecutando en una computadora con `instPerSec` instrucciones por segundo.",
      cormenRef: "Cormen Cap 1.2 - Tiempos de ejecución",
      initialCode: "#include <stdio.h>\n#include <math.h>\n\ndouble estimarTiempoCuadratico(int n, double instPerSec) {\n  // TODO: Retorna (2 * n^2) / instPerSec\n  return 0.0;\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\ndouble estimarTiempoCuadratico(int n, double instPerSec) {\n  double inst = 2.0 * pow(n, 2);\n  return inst / instPerSec;\n}",
      hint: "Calcula las instrucciones totales $2 \n\times n^2$ y divídelas entre `instPerSec`.",
      testCases: [
        { id: "t1", description: "n=1000, 1e9 inst/sec", input: "1000, 1000000000.0", expectedOutput: "0.002" },
        { id: "t2", description: "n=10000, 1e9 inst/sec", input: "10000, 1000000000.0", expectedOutput: "0.2" }
      ],
      explanation: "El número de operaciones cuadráticas crece a $O(n^2)$, multiplicando el tiempo por 100 al aumentar $n$ por 10."
    },
    {
      id: "ex-1-4",
      title: "Ejercicio 1.4: Validador de Tamaño de Problema Válido",
      description: "Escribe la función en C `bool esEntradaValida(int n)` que devuelva `true` si $n > 0$ y `false` en caso contrario.",
      cormenRef: "Cormen Cap 1.1 - Definición de Problema",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esEntradaValida(int n) {\n  // TODO: Retorna true si n > 0\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esEntradaValida(int n) {\n  return n > 0;\n}",
      hint: "Comprueba si `n > 0`.",
      testCases: [
        { id: "t1", description: "n = 5", input: "5", expectedOutput: "true" },
        { id: "t2", description: "n = 0", input: "0", expectedOutput: "false" },
        { id: "t3", description: "n = -10", input: "-10", expectedOutput: "false" }
      ],
      explanation: "Un problema computacional bien definido requiere un conjunto no vacío de datos de entrada válidos."
    },
    {
      id: "ex-1-5",
      title: "Ejercicio 1.5: Convertidor de Operaciones a Milisegundos",
      description: "Escribe la función en C `double operacionesAMilisegundos(long long ops, double mhz)` que reciba el número de operaciones y la velocidad del procesador en MHz (millones de ciclos/sec), y retorne el tiempo en milisegundos.",
      cormenRef: "Cormen Cap 1.2 - Mediciones Físicas",
      initialCode: "#include <stdio.h>\n\ndouble operacionesAMilisegundos(long long ops, double mhz) {\n  // TODO: ops / (mhz * 1000.0)\n  return 0.0;\n}",
      solutionCode: "#include <stdio.h>\n\ndouble operacionesAMilisegundos(long long ops, double mhz) {\n  double opsPerMs = mhz * 1000.0;\n  return ops / opsPerMs;\n}",
      hint: "1 MHz equivale a $1,000,000$ ciclos/segundo, o $1,000$ ciclos/milisegundo.",
      testCases: [
        { id: "t1", description: "1,000,000 ops a 1000 MHz", input: "1000000, 1000.0", expectedOutput: "1" },
        { id: "t2", description: "500,000 ops a 500 MHz", input: "500000, 500.0", expectedOutput: "1" }
      ],
      explanation: "Relaciona el número de operaciones de código C con los ciclos físicos de reloj de la CPU."
    }
  ],

  'clase-2': [
    {
      id: "ex-2-1",
      title: "Ejercicio 2.1: Acumulador y Bucle Incremental en C",
      description: "Escribe una función en C `int sumarArreglo(int arr[], int n)` que calcule la suma de todos los elementos de un arreglo de tamaño `n` usando un bucle iterativo.",
      cormenRef: "Cormen Cap 2.1 - Estructuras de Bucle",
      initialCode: "#include <stdio.h>\n\nint sumarArreglo(int arr[], int n) {\n  int suma = 0;\n  // TODO: Implementa el bucle en C\n  return suma;\n}",
      solutionCode: "#include <stdio.h>\n\nint sumarArreglo(int arr[], int n) {\n  int suma = 0;\n  for (int i = 0; i < n; i++) {\n    suma += arr[i];\n  }\n  return suma;\n}",
      hint: "Itera con una variable entera `i` de `0` a `n - 1` acumulando `arr[i]`.",
      testCases: [
        { id: "t1", description: "Sumar [1, 2, 3, 4, 5], n=5", input: "[1, 2, 3, 4, 5], 5", expectedOutput: "15" },
        { id: "t2", description: "Sumar [10, -5, 20], n=3", input: "[10, -5, 20], 3", expectedOutput: "25" },
        { id: "t3", description: "Arreglo vacío, n=0", input: "[], 0", expectedOutput: "0" }
      ],
      explanation: "Un patrón de acumulación lineal ejecuta $n$ iteraciones en tiempo $O(n)$."
    },
    {
      id: "ex-2-2",
      title: "Ejercicio 2.2: Búsqueda del Elemento Máximo en C",
      description: "Implementa la función en C `int encontrarMaximo(int arr[], int n)` que devuelva el valor máximo de un arreglo de enteros no vacío.",
      cormenRef: "Cormen Cap 2.1 - Algoritmos de Búsqueda",
      initialCode: "#include <stdio.h>\n\nint encontrarMaximo(int arr[], int n) {\n  if (n <= 0) return -1;\n  int max = arr[0];\n  // TODO: Bucle for de 1 a n-1 actualizando max\n  return max;\n}",
      solutionCode: "#include <stdio.h>\n\nint encontrarMaximo(int arr[], int n) {\n  if (n <= 0) return -1;\n  int max = arr[0];\n  for (int i = 1; i < n; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}",
      hint: "Inicializa `max = arr[0]` y compara contra cada `arr[i]`.",
      testCases: [
        { id: "t1", description: "[3, 9, 2, 8, 1]", input: "[3, 9, 2, 8, 1], 5", expectedOutput: "9" },
        { id: "t2", description: "[-10, -5, -20]", input: "[-10, -5, -20], 3", expectedOutput: "-5" }
      ],
      explanation: "Escanea todo el arreglo para encontrar la cota superior en tiempo $O(n)$."
    },
    {
      id: "ex-2-3",
      title: "Ejercicio 2.3: Contador de Números Pares",
      description: "Implementa la función en C `int contarPares(int arr[], int n)` que retorne cuántos números pares existen en el arreglo usando el operador módulo `%`.",
      cormenRef: "Cormen Cap 2.1 - Condicionales",
      initialCode: "#include <stdio.h>\n\nint contarPares(int arr[], int n) {\n  int cont = 0;\n  // TODO: Recorre arr y verifica si arr[i] % 2 == 0\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarPares(int arr[], int n) {\n  int cont = 0;\n  for (int i = 0; i < n; i++) {\n    if (arr[i] % 2 == 0) {\n      cont++;\n    }\n  }\n  return cont;\n}",
      hint: "Usa `if (arr[i] % 2 == 0)` para identificar números pares.",
      testCases: [
        { id: "t1", description: "[1, 2, 3, 4, 6], n=5", input: "[1, 2, 3, 4, 6], 5", expectedOutput: "3" },
        { id: "t2", description: "[1, 3, 5], n=3", input: "[1, 3, 5], 3", expectedOutput: "0" }
      ],
      explanation: "Filtra elementos que cumplen una condición aritmética en una sola pasada."
    },
    {
      id: "ex-2-4",
      title: "Ejercicio 2.4: Inversión In-Place de un Arreglo",
      description: "Escribe una función en C `void invertirArreglo(int arr[], int n)` que invierta los elementos de un arreglo usando dos índices (dos punteros virtuales) `i` y `j` que avanzan desde los extremos.",
      cormenRef: "Cormen Cap 2.1 - Modificación In-Place",
      initialCode: "#include <stdio.h>\n\nvoid invertirArreglo(int arr[], int n) {\n  int i = 0, j = n - 1;\n  while (i < j) {\n    // TODO: Intercambia arr[i] y arr[j], luego incrementa i y decrementa j\n  }\n}",
      solutionCode: "#include <stdio.h>\n\nvoid invertirArreglo(int arr[], int n) {\n  int i = 0, j = n - 1;\n  while (i < j) {\n    int temp = arr[i];\n    arr[i] = arr[j];\n    arr[j] = temp;\n    i++;\n    j--;\n  }\n}",
      hint: "Usa una variable `temp` para intercambiar `arr[i]` y `arr[j]`, luego avanza `i++` y retrocede `j--`.",
      testCases: [
        { id: "t1", description: "Invertir [1, 2, 3, 4, 5]", input: "[1, 2, 3, 4, 5], 5", expectedOutput: "undefined" }
      ],
      explanation: "Un patrón de dos índices opuestos invierte el arreglo en tiempo $O(n)$ usando $O(1)$ espacio auxiliar."
    },
    {
      id: "ex-2-5",
      title: "Ejercicio 2.5: Promedio de Elementos en C",
      description: "Escribe la función en C `double calcularPromedio(int arr[], int n)` que devuelva el promedio en coma flotante de un arreglo de enteros.",
      cormenRef: "Cormen Cap 2.1 - Casteo de Tipos",
      initialCode: "#include <stdio.h>\n\ndouble calcularPromedio(int arr[], int n) {\n  if (n <= 0) return 0.0;\n  double suma = 0;\n  // TODO: Acumula y divide por n\n  return 0.0;\n}",
      solutionCode: "#include <stdio.h>\n\ndouble calcularPromedio(int arr[], int n) {\n  if (n <= 0) return 0.0;\n  double suma = 0;\n  for (int i = 0; i < n; i++) {\n    suma += arr[i];\n  }\n  return suma / n;\n}",
      hint: "Acumula la suma en una variable tipo `double` y divídela entre `n`.",
      testCases: [
        { id: "t1", description: "[10, 20, 30], n=3", input: "[10, 20, 30], 3", expectedOutput: "20" },
        { id: "t2", description: "[5, 5, 5, 5], n=4", input: "[5, 5, 5, 5], 4", expectedOutput: "5" }
      ],
      explanation: "Demuestra la necesidad de casteo explícito de tipos para evitar división entera."
    }
  ],

  'clase-3': [
    {
      id: "ex-3-1",
      title: "Ejercicio 3.1: Intercambio con Punteros (Swap) en C",
      description: "Escribe una función en C `void intercambiar(int *a, int *b)` que intercambie los valores de dos enteros en memoria usando punteros y una variable temporal.",
      cormenRef: "Cormen Cap 10.3 - Apéndice B",
      initialCode: "#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n  // TODO: Usa una variable temporal desreferenciando los punteros\n}",
      solutionCode: "#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}",
      hint: "Guarda `int temp = *a;`, asigna `*a = *b;` y luego `*b = temp;`.",
      testCases: [
        { id: "t1", description: "a=5, b=10", input: "5, 10", expectedOutput: "undefined" }
      ],
      explanation: "Permite modificar variables del ámbito superior pasando sus direcciones de memoria `&a` y `&b`."
    },
    {
      id: "ex-3-2",
      title: "Ejercicio 3.2: Suma con Aritmética de Punteros",
      description: "Implementa la función en C `int sumarConPunteros(int *arr, int n)` que recorra y sume un arreglo incrementando el puntero `arr++` en lugar de usar índices `arr[i]`.",
      cormenRef: "Cormen Apéndice B - Aritmética de Punteros",
      initialCode: "#include <stdio.h>\n\nint sumarConPunteros(int *arr, int n) {\n  int suma = 0;\n  for (int i = 0; i < n; i++) {\n    // TODO: suma += *arr y arr++\n  }\n  return suma;\n}",
      solutionCode: "#include <stdio.h>\n\nint sumarConPunteros(int *arr, int n) {\n  int suma = 0;\n  for (int i = 0; i < n; i++) {\n    suma += *arr;\n    arr++;\n  }\n  return suma;\n}",
      hint: "Accede al valor actual con `*arr` y avanza al siguiente casillero de memoria con `arr++`.",
      testCases: [
        { id: "t1", description: "[10, 20, 30], n=3", input: "[10, 20, 30], 3", expectedOutput: "60" }
      ],
      explanation: "En C, un nombre de arreglo equivale a un puntero constante al primer elemento `&arr[0]`."
    },
    {
      id: "ex-3-3",
      title: "Ejercicio 3.3: Estructura Punto2D y Distancia Manhattan",
      description: "Dada la estructura `struct Punto { int x; int y; };`, escribe una función `int distanciaManhattan(struct Punto *p1, struct Punto *p2)` que calcule $|p1.x - p2.x| + |p1.y - p2.y|$.",
      cormenRef: "Cormen Cap 10.3 - Estructuras de Datos",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n#include <math.h>\n\nstruct Punto {\n  int x;\n  int y;\n};\n\nint distanciaManhattan(struct Punto *p1, struct Punto *p2) {\n  // TODO: Accede a p1->x, p1->y, p2->x, p2->y\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n#include <math.h>\n\nstruct Punto {\n  int x;\n  int y;\n};\n\nint distanciaManhattan(struct Punto *p1, struct Punto *p2) {\n  return abs(p1->x - p2->x) + abs(p1->y - p2->y);\n}",
      hint: "Usa `p1->x` y `p2->x` con la función `abs()` de `<stdlib.h>`.",
      testCases: [
        { id: "t1", description: "p1=(0,0), p2=(3,4)", input: "{x:0, y:0}, {x:3, y:4}", expectedOutput: "7" }
      ],
      explanation: "Demuestra la sintaxis del operador flecha `->` para acceder a miembros de un `struct` mediante puntero."
    },
    {
      id: "ex-3-4",
      title: "Ejercicio 3.4: Modificación Directa de Campos de Struct",
      description: "Dada la estructura `struct Rectangulo { int ancho; int alto; };`, escribe la función `void duplicarDimensiones(struct Rectangulo *r)` que duplique el ancho y el alto en memoria.",
      cormenRef: "Cormen Cap 10.3 - Paso de estructuras por referencia",
      initialCode: "#include <stdio.h>\n\nstruct Rectangulo {\n  int ancho;\n  int alto;\n};\n\nvoid duplicarDimensiones(struct Rectangulo *r) {\n  // TODO: r->ancho *= 2, r->alto *= 2\n}",
      solutionCode: "#include <stdio.h>\n\nstruct Rectangulo {\n  int ancho;\n  int alto;\n};\n\nvoid duplicarDimensiones(struct Rectangulo *r) {\n  if (r != NULL) {\n    r->ancho *= 2;\n    r->alto *= 2;\n  }\n}",
      hint: "Accede y asigna `r->ancho *= 2;` y `r->alto *= 2;`.",
      testCases: [
        { id: "t1", description: "Rectangulo (5, 10)", input: "{ancho:5, alto:10}", expectedOutput: "undefined" }
      ],
      explanation: "Pasar un puntero a `struct` evita copiar todos los campos en la pila, optimizando memoria y tiempo."
    },
    {
      id: "ex-3-5",
      title: "Ejercicio 3.5: Duplicar Valor a través de Doble Puntero",
      description: "Escribe la función en C `void duplicarValor(int **ptrPtr)` que duplique el entero almacenado en la dirección apuntada por el puntero desreferenciado.",
      cormenRef: "Cormen Apéndice B - Punteros a Punteros",
      initialCode: "#include <stdio.h>\n\nvoid duplicarValor(int **ptrPtr) {\n  // TODO: **ptrPtr = (**ptrPtr) * 2\n}",
      solutionCode: "#include <stdio.h>\n\nvoid duplicarValor(int **ptrPtr) {\n  if (ptrPtr != NULL && *ptrPtr != NULL) {\n    **ptrPtr = (**ptrPtr) * 2;\n  }\n}",
      hint: "Usa la doble desreferenciación `**ptrPtr`.",
      testCases: [
        { id: "t1", description: "Valor 21 desreferenciado dos veces", input: "21", expectedOutput: "undefined" }
      ],
      explanation: "Los punteros a punteros (`int **`) permiten modificar qué dirección almacena un puntero en C."
    }
  ],

  'clase-4': [
    {
      id: "ex-4-1",
      title: "Ejercicio 4.1: Lectura de Cabeza de Lista Enlazada en C",
      description: "Dada `struct Nodo { int dato; struct Nodo *siguiente; };`, escribe `int obtenerPrimerValor(struct Nodo *cabeza)` que devuelva `cabeza->dato` o `-1` si es `NULL`.",
      cormenRef: "Cormen Cap 10.2 - Listas Enlazadas Simples",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  // TODO: Retorna cabeza->dato o -1 si cabeza == NULL\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  if (cabeza == NULL) return -1;\n  return cabeza->dato;\n}",
      hint: "Verifica si `cabeza == NULL` antes de acceder a `cabeza->dato`.",
      testCases: [
        { id: "t1", description: "Nodo con dato=42", input: "{ dato: 42, siguiente: null }", expectedOutput: "42" },
        { id: "t2", description: "Lista vacía (NULL)", input: "null", expectedOutput: "-1" }
      ],
      explanation: "Valida la existencia del nodo raíz antes de desreferenciar."
    },
    {
      id: "ex-4-2",
      title: "Ejercicio 4.2: Conteo de Nodos en Lista Enlazada",
      description: "Implementa `int contarNodos(struct Nodo *cabeza)` que recorra la lista enlazada y retorne la cantidad total de nodos.",
      cormenRef: "Cormen Cap 10.2 - Recorrido de Listas",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint contarNodos(struct Nodo *cabeza) {\n  int cont = 0;\n  // TODO: Bucle while (cabeza != NULL)\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint contarNodos(struct Nodo *cabeza) {\n  int cont = 0;\n  struct Nodo *actual = cabeza;\n  while (actual != NULL) {\n    cont++;\n    actual = actual->siguiente;\n  }\n  return cont;\n}",
      hint: "Avanza con `actual = actual->siguiente` e incrementa el contador.",
      testCases: [
        { id: "t1", description: "Lista de 3 nodos", input: "{ dato: 10, siguiente: { dato: 20, siguiente: { dato: 30, siguiente: null } } }", expectedOutput: "3" },
        { id: "t2", description: "Lista vacía", input: "null", expectedOutput: "0" }
      ],
      explanation: "Recorre secuencialmente todos los nodos desde la cabeza en tiempo $O(n)$."
    },
    {
      id: "ex-4-3",
      title: "Ejercicio 4.3: Búsqueda de Clave en Lista Enlazada",
      description: "Escribe la función en C `bool buscarEnLista(struct Nodo *cabeza, int valor)` que devuelva `true` si `valor` se encuentra en algún nodo o `false` en caso contrario.",
      cormenRef: "Cormen Cap 10.2 - Búsqueda Lineal en Lista",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nbool buscarEnLista(struct Nodo *cabeza, int valor) {\n  // TODO: Recorre la lista buscando valor\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nbool buscarEnLista(struct Nodo *cabeza, int valor) {\n  struct Nodo *actual = cabeza;\n  while (actual != NULL) {\n    if (actual->dato == valor) return true;\n    actual = actual->siguiente;\n  }\n  return false;\n}",
      hint: "Compara `actual->dato == valor` en cada iteración del bucle.",
      testCases: [
        { id: "t1", description: "Buscar 20 en lista [10, 20, 30]", input: "{ dato: 10, siguiente: { dato: 20, siguiente: null } }, 20", expectedOutput: "true" },
        { id: "t2", description: "Buscar 99 no existente", input: "{ dato: 10, siguiente: null }, 99", expectedOutput: "false" }
      ],
      explanation: "La búsqueda secuencial requiere tiempo $O(n)$ en el peor caso."
    },
    {
      id: "ex-4-4",
      title: "Ejercicio 4.4: Suma Total de Elementos en Lista Enlazada",
      description: "Implementa `int sumarElementosLista(struct Nodo *cabeza)` que calcule y retorne la suma acumulada de los datos de todos los nodos de la lista.",
      cormenRef: "Cormen Cap 10.2 - Acumulación sobre Lista",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint sumarElementosLista(struct Nodo *cabeza) {\n  int suma = 0;\n  // TODO: Bucle acumulador\n  return suma;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint sumarElementosLista(struct Nodo *cabeza) {\n  int suma = 0;\n  struct Nodo *actual = cabeza;\n  while (actual != NULL) {\n    suma += actual->dato;\n    actual = actual->siguiente;\n  }\n  return suma;\n}",
      hint: "Suma `actual->dato` a la variable `suma` en cada paso.",
      testCases: [
        { id: "t1", description: "Lista [5, 15, 25]", input: "{ dato: 5, siguiente: { dato: 15, siguiente: { dato: 25, siguiente: null } } }", expectedOutput: "45" }
      ],
      explanation: "Iteación lineal completa recorriendo punteros `siguiente`."
    },
    {
      id: "ex-4-5",
      title: "Ejercicio 4.5: Obtención del Último Valor (Tail) en C",
      description: "Escribe la función en C `int obtenerUltimoValor(struct Nodo *cabeza)` que retorne el campo `dato` del último nodo de la lista enlazada o `-1` si la lista está vacía.",
      cormenRef: "Cormen Cap 10.2 - Punteros al Final",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerUltimoValor(struct Nodo *cabeza) {\n  // TODO: Recorre hasta que actual->siguiente == NULL\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerUltimoValor(struct Nodo *cabeza) {\n  if (cabeza == NULL) return -1;\n  struct Nodo *actual = cabeza;\n  while (actual->siguiente != NULL) {\n    actual = actual->siguiente;\n  }\n  return actual->dato;\n}",
      hint: "El último nodo es aquel que cumple `actual->siguiente == NULL`.",
      testCases: [
        { id: "t1", description: "Lista [1, 2, 99]", input: "{ dato: 1, siguiente: { dato: 2, siguiente: { dato: 99, siguiente: null } } }", expectedOutput: "99" }
      ],
      explanation: "Avanza hasta la cola de la lista enlazada en tiempo $O(n)$."
    }
  ],

  'clase-5': [
    {
      id: "ex-5-1",
      title: "Ejercicio 5.1: Factorial Recursivo en C",
      description: "Implementa la función en C `int factorial(int n)` que calcule el factorial de un entero positivo de manera recursiva.",
      cormenRef: "Cormen Cap 3.2 - Recursividad",
      initialCode: "#include <stdio.h>\n\nint factorial(int n) {\n  // TODO: Caso base n <= 1 retorna 1, else n * factorial(n - 1)\n  return 1;\n}",
      solutionCode: "#include <stdio.h>\n\nint factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
      hint: "Si `n <= 1` retorna `1`, de lo contrario retorna `n * factorial(n - 1)`.",
      testCases: [
        { id: "t1", description: "Factorial de 5", input: "5", expectedOutput: "120" },
        { id: "t2", description: "Factorial de 0", input: "0", expectedOutput: "1" }
      ],
      explanation: "Cada llamada apila un marco de pila hasta alcanzar el caso base $n \\le 1$."
    },
    {
      id: "ex-5-2",
      title: "Ejercicio 5.2: Serie de Fibonacci Recursiva",
      description: "Implementa la función recursiva `int fibonacci(int n)` que devuelva el $n$-ésimo número de Fibonacci donde $F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)$.",
      cormenRef: "Cormen Cap 3.2 - Ecuaciones de Recurrencia",
      initialCode: "#include <stdio.h>\n\nint fibonacci(int n) {\n  // TODO: Caso base n <= 1 retorna n\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint fibonacci(int n) {\n  if (n <= 0) return 0;\n  if (n == 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
      hint: "Casos base: $n=0 \\implies 0$, $n=1 \\implies 1$. Caso recursivo: `fibonacci(n-1) + fibonacci(n-2)`.",
      testCases: [
        { id: "t1", description: "Fibonacci n=6", input: "6", expectedOutput: "8" },
        { id: "t2", description: "Fibonacci n=0", input: "0", expectedOutput: "0" }
      ],
      explanation: "Genera una estructura de árbol binario de llamadas recursivas en $O(2^n)$."
    },
    {
      id: "ex-5-3",
      title: "Ejercicio 5.3: Suma de Dígitos Recursiva",
      description: "Escribe la función recursiva `int sumarDigitos(int n)` que calcule la suma de los dígitos de un número entero (ej: 1234 -> 1+2+3+4=10).",
      cormenRef: "Cormen Cap 4.4 - Descomposición Recursiva",
      initialCode: "#include <stdio.h>\n\nint sumarDigitos(int n) {\n  // TODO: Caso base n < 10 retorna n\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint sumarDigitos(int n) {\n  if (n < 0) n = -n;\n  if (n < 10) return n;\n  return (n % 10) + sumarDigitos(n / 10);\n}",
      hint: "Suma `(n % 10)` al resultado de `sumarDigitos(n / 10)`.",
      testCases: [
        { id: "t1", description: "Suma de dígitos de 1234", input: "1234", expectedOutput: "10" },
        { id: "t2", description: "Suma de dígitos de 9", input: "9", expectedOutput: "9" }
      ],
      explanation: "Extrae el último dígito con `% 10` y reduce el número mediante `/ 10`."
    },
    {
      id: "ex-5-4",
      title: "Ejercicio 5.4: Potencia Entera Recursiva",
      description: "Escribe la función recursiva en C `int potencia(int base, int exp)` que calcule $base^{exp}$ suponiendo $exp \\ge 0$.",
      cormenRef: "Cormen Cap 3 - Funciones Exponenciales",
      initialCode: "#include <stdio.h>\n\nint potencia(int base, int exp) {\n  // TODO: Caso base exp == 0 retorna 1\n  return 1;\n}",
      solutionCode: "#include <stdio.h>\n\nint potencia(int base, int exp) {\n  if (exp <= 0) return 1;\n  return base * potencia(base, exp - 1);\n}",
      hint: "Si `exp == 0` retorna 1. De lo contrario `base * potencia(base, exp - 1)`.",
      testCases: [
        { id: "t1", description: "2^5 = 32", input: "2, 5", expectedOutput: "32" },
        { id: "t2", description: "10^0 = 1", input: "10, 0", expectedOutput: "1" }
      ],
      explanation: "Multiplica inductivamente la base $exp$ veces mediante recursión lineal."
    },
    {
      id: "ex-5-5",
      title: "Ejercicio 5.5: Conteo Regresivo Recursivo (Countdown)",
      description: "Implementa `int conteoPasos(int n)` que devuelva la cantidad total de llamadas recursivas realizadas hasta llegar a 0.",
      cormenRef: "Cormen Cap 3.2 - Traza de Pila",
      initialCode: "#include <stdio.h>\n\nint conteoPasos(int n) {\n  // TODO: Si n <= 0 retorna 0, sino 1 + conteoPasos(n - 1)\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint conteoPasos(int n) {\n  if (n <= 0) return 0;\n  return 1 + conteoPasos(n - 1);\n}",
      hint: "Cuenta 1 por cada llamada recursiva decrementando `n - 1`.",
      testCases: [
        { id: "t1", description: "Conteo desde 10", input: "10", expectedOutput: "10" }
      ],
      explanation: "Permite visualizar la profundidad de la pila de llamadas (Call Stack)."
    }
  ],

  'taller-1': [
    {
      id: "ex-t1-1",
      title: "Ejercicio Taller 1.1: Suma Recursiva de Arreglo en C",
      description: "Implementa la función recursiva en C `int sumaRecursivaArreglo(int arr[], int n)` que calcule la suma de los $n$ elementos sin usar bucles `for` ni `while`.",
      cormenRef: "Taller 1 - Ejercicio Práctico Obligatorio",
      initialCode: "#include <stdio.h>\n\nint sumaRecursivaArreglo(int arr[], int n) {\n  // TODO: Caso base n <= 0 retorna 0\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint sumaRecursivaArreglo(int arr[], int n) {\n  if (n <= 0) return 0;\n  return arr[n - 1] + sumaRecursivaArreglo(arr, n - 1);\n}",
      hint: "Suma `arr[n - 1]` con la llamada recursiva para `n - 1`.",
      testCases: [
        { id: "t1", description: "[1, 2, 3, 4, 5], n=5", input: "[1, 2, 3, 4, 5], 5", expectedOutput: "15" }
      ],
      explanation: "Reduce el tamaño del problema de $n$ a $n-1$ en cada paso."
    },
    {
      id: "ex-t1-2",
      title: "Ejercicio Taller 1.2: Máximo Recursivo en Arreglo",
      description: "Escribe la función recursiva `int maxRecursivo(int arr[], int n)` que encuentre el mayor elemento de un arreglo.",
      cormenRef: "Taller 1 - Divide y Vencerás",
      initialCode: "#include <stdio.h>\n\nint maxRecursivo(int arr[], int n) {\n  // TODO: Caso base n == 1 retorna arr[0]\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint maxRecursivo(int arr[], int n) {\n  if (n <= 1) return arr[0];\n  int subMax = maxRecursivo(arr, n - 1);\n  return (arr[n - 1] > subMax) ? arr[n - 1] : subMax;\n}",
      hint: "Compara `arr[n-1]` contra el máximo obtenido en `n-1`.",
      testCases: [
        { id: "t1", description: "[4, 9, 2, 15, 3], n=5", input: "[4, 9, 2, 15, 3], 5", expectedOutput: "15" }
      ],
      explanation: "Compara el último elemento contra la solución del subproblema de tamaño $n-1$."
    },
    {
      id: "ex-t1-3",
      title: "Ejercicio Taller 1.3: Torres de Hanói (Movimientos Mínimos)",
      description: "Implementa `long long hanoiMovimientos(int n)` que retorne el número exacto de movimientos necesarios para resolver Torres de Hanói ($2^n - 1$).",
      cormenRef: "Taller 1 - Problema de Hanói",
      initialCode: "#include <stdio.h>\n#include <math.h>\n\nlong long hanoiMovimientos(int n) {\n  // TODO: Retorna 2^n - 1\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\nlong long hanoiMovimientos(int n) {\n  if (n <= 0) return 0;\n  return (long long)pow(2, n) - 1;\n}",
      hint: "Calcula $2^n - 1$ con `pow(2, n)`.",
      testCases: [
        { id: "t1", description: "3 discos", input: "3", expectedOutput: "7" },
        { id: "t2", description: "4 discos", input: "4", expectedOutput: "15" }
      ],
      explanation: "Resuelve la recurrencia $T(n) = 2T(n-1) + 1 = 2^n - 1$."
    },
    {
      id: "ex-t1-4",
      title: "Ejercicio Taller 1.4: MCD de Euclides Recursivo",
      description: "Escribe la función recursiva `int mcdEuclides(int a, int b)` que calcule el Máximo Común Divisor mediante $a \\% b$.",
      cormenRef: "Taller 1 - Algoritmo de Euclides",
      initialCode: "#include <stdio.h>\n\nint mcdEuclides(int a, int b) {\n  // TODO: Caso base b == 0 retorna a, else mcdEuclides(b, a % b)\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint mcdEuclides(int a, int b) {\n  if (b == 0) return a;\n  return mcdEuclides(b, a % b);\n}",
      hint: "Si `b == 0` retorna `a`. De lo contrario llama a `mcdEuclides(b, a % b)`.",
      testCases: [
        { id: "t1", description: "MCD(48, 18)", input: "48, 18", expectedOutput: "6" },
        { id: "t2", description: "MCD(100, 25)", input: "100, 25", expectedOutput: "25" }
      ],
      explanation: "Uno de los algoritmos recursivos más antiguos e importantes de la historia."
    },
    {
      id: "ex-t1-5",
      title: "Ejercicio Taller 1.5: Verificador de Paridad Recursiva",
      description: "Implementa `bool esParRecursivo(int n)` que determine si un número no negativo es par restando 2 de forma recursiva.",
      cormenRef: "Taller 1 - Reducción por Sustracción",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esParRecursivo(int n) {\n  // TODO: Caso base n==0 true, n==1 false, else esParRecursivo(n-2)\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esParRecursivo(int n) {\n  if (n < 0) n = -n;\n  if (n == 0) return true;\n  if (n == 1) return false;\n  return esParRecursivo(n - 2);\n}",
      hint: "Reduce `n - 2` hasta llegar a los casos base `0` o `1`.",
      testCases: [
        { id: "t1", description: "n = 10", input: "10", expectedOutput: "true" },
        { id: "t2", description: "n = 7", input: "7", expectedOutput: "false" }
      ],
      explanation: "Demuestra la reducción por sustracción hasta alcanzar el estado base."
    }
  ],

  'clase-6': [
    {
      id: "ex-6-1",
      title: "Ejercicio 6.1: Búsqueda en Árbol Binario de Búsqueda (BST)",
      description: "Dada `struct NodoBST { int valor; struct NodoBST *izq; struct NodoBST *der; };`, escribe `bool buscarBST(struct NodoBST *raiz, int x)` que devuelva `true` si `x` está en el árbol o `false` en caso contrario.",
      cormenRef: "Cormen Cap 12.2 - Búsqueda en BST",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  // TODO: Compara raiz->valor con x para decidir ir a la izquierda o derecha\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  if (raiz == NULL) return false;\n  if (raiz->valor == x) return true;\n  if (x < raiz->valor) return buscarBST(raiz->izq, x);\n  else return buscarBST(raiz->der, x);\n}",
      hint: "Si `raiz->valor == x` retorna `true`. Si `x < raiz->valor` busca en `izq`, sino en `der`.",
      testCases: [
        { id: "t1", description: "Buscar 15 en raíz 10 con hijo derecho 15", input: "{ valor: 10, izq: null, der: { valor: 15, izq: null, der: null } }, 15", expectedOutput: "true" },
        { id: "t2", description: "Buscar 99 no existente", input: "{ valor: 10, izq: null, der: null }, 99", expectedOutput: "false" }
      ],
      explanation: "Aprovecha la propiedad invariant del BST en tiempo $O(h)$."
    },
    {
      id: "ex-6-2",
      title: "Ejercicio 6.2: Conteo Total de Nodos en Árbol Binario",
      description: "Implementa `int contarNodosBST(struct NodoBST *raiz)` que retorne la cantidad total de nodos de un árbol binario.",
      cormenRef: "Cormen Cap 12.1 - Recorridos de Árbol",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint contarNodosBST(struct NodoBST *raiz) {\n  // TODO: Caso base raiz == NULL retorna 0, sino 1 + izq + der\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint contarNodosBST(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  return 1 + contarNodosBST(raiz->izq) + contarNodosBST(raiz->der);\n}",
      hint: "Retorna `1 + contarNodosBST(raiz->izq) + contarNodosBST(raiz->der)`.",
      testCases: [
        { id: "t1", description: "Árbol con 3 nodos", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 15, izq: null, der: null } }", expectedOutput: "3" }
      ],
      explanation: "Procesa la raíz y recurre sobre ambos subárboles."
    },
    {
      id: "ex-6-3",
      title: "Ejercicio 6.3: Valor Mínimo en un BST",
      description: "Escribe `int obtenerMinimoBST(struct NodoBST *raiz)` que retorne el valor mínimo de un BST o `-1` si el árbol está vacío.",
      cormenRef: "Cormen Cap 12.2 - Mínimo en BST",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint obtenerMinimoBST(struct NodoBST *raiz) {\n  // TODO: Sigue los punteros izq hasta que raiz->izq == NULL\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint obtenerMinimoBST(struct NodoBST *raiz) {\n  if (raiz == NULL) return -1;\n  struct NodoBST *actual = raiz;\n  while (actual->izq != NULL) {\n    actual = actual->izq;\n  }\n  return actual->valor;\n}",
      hint: "El mínimo siempre se encuentra en la hoja o nodo más a la izquierda.",
      testCases: [
        { id: "t1", description: "Mínimo en BST [5 <- 10 -> 20]", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 20, izq: null, der: null } }", expectedOutput: "5" }
      ],
      explanation: "Avanza hacia la izquierda tanto como sea posible."
    },
    {
      id: "ex-6-4",
      title: "Ejercicio 6.4: Valor Máximo en un BST",
      description: "Escribe `int obtenerMaximoBST(struct NodoBST *raiz)` que retorne el valor máximo de un BST o `-1` si el árbol está vacío.",
      cormenRef: "Cormen Cap 12.2 - Máximo en BST",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint obtenerMaximoBST(struct NodoBST *raiz) {\n  // TODO: Sigue los punteros der hasta que raiz->der == NULL\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint obtenerMaximoBST(struct NodoBST *raiz) {\n  if (raiz == NULL) return -1;\n  struct NodoBST *actual = raiz;\n  while (actual->der != NULL) {\n    actual = actual->der;\n  }\n  return actual->valor;\n}",
      hint: "El máximo siempre se encuentra en el nodo más a la derecha.",
      testCases: [
        { id: "t1", description: "Máximo en BST [5 <- 10 -> 20]", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 20, izq: null, der: null } }", expectedOutput: "20" }
      ],
      explanation: "Avanza hacia la derecha tanto como sea posible."
    },
    {
      id: "ex-6-5",
      title: "Ejercicio 6.5: Verificador de Nodo Hoja",
      description: "Escribe `bool esHoja(struct NodoBST *nodo)` que devuelva `true` si el nodo no tiene hijo izquierdo ni derecho.",
      cormenRef: "Cormen Cap 12.1 - Estructura de Árboles",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool esHoja(struct NodoBST *nodo) {\n  // TODO: Retorna true si izq == NULL y der == NULL\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool esHoja(struct NodoBST *nodo) {\n  if (nodo == NULL) return false;\n  return (nodo->izq == NULL && nodo->der == NULL);\n}",
      hint: "Un nodo hoja cumple `nodo->izq == NULL && nodo->der == NULL`.",
      testCases: [
        { id: "t1", description: "Nodo sin hijos", input: "{ valor: 10, izq: null, der: null }", expectedOutput: "true" }
      ],
      explanation: "Identifica los nodos terminales o hondonadas del árbol."
    }
  ],

  'clase-7': [
    {
      id: "ex-7-1",
      title: "Ejercicio 7.1: Calcular Altura Recursiva de un Árbol",
      description: "Escribe `int calcularAltura(struct NodoBST *raiz)` que calcule la altura de un árbol binario recursivamente (un árbol `NULL` tiene altura 0).",
      cormenRef: "Cormen Cap 12.1 - Propiedades de Árboles",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  // TODO: Caso base 0, else 1 + maxVal(altura(izq), altura(der))\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  return 1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der));\n}",
      hint: "Usa `1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der))`.",
      testCases: [
        { id: "t1", description: "Árbol con 2 niveles", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: null }", expectedOutput: "2" }
      ],
      explanation: "Calcula el camino más largo desde la raíz hasta la hoja más distante."
    },
    {
      id: "ex-7-2",
      title: "Ejercicio 7.2: Conteo de Hojas en Árbol Binario",
      description: "Implementa `int contarHojas(struct NodoBST *raiz)` que retorne la cantidad de nodos hoja (sin hijos).",
      cormenRef: "Cormen Cap 12.1 - Inorden y Conteo",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint contarHojas(struct NodoBST *raiz) {\n  // TODO: Caso base NULL retorna 0, si esHoja retorna 1, else suma hijos\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint contarHojas(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  if (raiz->izq == NULL && raiz->der == NULL) return 1;\n  return contarHojas(raiz->izq) + contarHojas(raiz->der);\n}",
      hint: "Si `raiz->izq == NULL && raiz->der == NULL` retorna 1.",
      testCases: [
        { id: "t1", description: "Árbol con 2 hojas", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 15, izq: null, der: null } }", expectedOutput: "2" }
      ],
      explanation: "Filtra nodos terminales combinando resultados de subárboles."
    },
    {
      id: "ex-7-3",
      title: "Ejercicio 7.3: Suma de Valores en BST",
      description: "Escribe la función `int sumarValoresBST(struct NodoBST *raiz)` que retorne la suma acumulada de todos los valores del árbol.",
      cormenRef: "Cormen Cap 12.1 - Recorridos",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint sumarValoresBST(struct NodoBST *raiz) {\n  // TODO: Caso base 0, else raiz->valor + sumar(izq) + sumar(der)\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint sumarValoresBST(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  return raiz->valor + sumarValoresBST(raiz->izq) + sumarValoresBST(raiz->der);\n}",
      hint: "Suma `raiz->valor` con las llamadas a `izq` y `der`.",
      testCases: [
        { id: "t1", description: "Árbol con valores [10, 5, 15]", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 15, izq: null, der: null } }", expectedOutput: "30" }
      ],
      explanation: "Recorre todos los nodos del árbol agregando sus datos en $O(n)$."
    },
    {
      id: "ex-7-4",
      title: "Ejercicio 7.4: Inversión Espejo de Árbol Binario (Mirror Tree)",
      description: "Escribe `void invertirArbol(struct NodoBST *raiz)` que intercambie recursivamente el subárbol izquierdo y derecho de cada nodo.",
      cormenRef: "Cormen Cap 12.1 - Transformación de Árboles",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nvoid invertirArbol(struct NodoBST *raiz) {\n  // TODO: Intercambia izq y der recursivamente\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nvoid invertirArbol(struct NodoBST *raiz) {\n  if (raiz == NULL) return;\n  struct NodoBST *temp = raiz->izq;\n  raiz->izq = raiz->der;\n  raiz->der = temp;\n  invertirArbol(raiz->izq);\n  invertirArbol(raiz->der);\n}",
      hint: "Intercambia `raiz->izq` y `raiz->der` con una variable temporal y llama a ambos hijos.",
      testCases: [
        { id: "t1", description: "Invertir árbol espejo", input: "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 15, izq: null, der: null } }", expectedOutput: "undefined" }
      ],
      explanation: "Invierte el sentido del árbol binario produciendo su reflejo especular."
    },
    {
      id: "ex-7-5",
      title: "Ejercicio 7.5: Verificador de Árbol Binario Válido",
      description: "Implementa `bool esArbolVacio(struct NodoBST *raiz)` que retorne `true` si `raiz == NULL`.",
      cormenRef: "Cormen Cap 12.1 - Casos Base",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool esArbolVacio(struct NodoBST *raiz) {\n  // TODO: Retorna raiz == NULL\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool esArbolVacio(struct NodoBST *raiz) {\n  return raiz == NULL;\n}",
      hint: "Retorna `raiz == NULL`.",
      testCases: [
        { id: "t1", description: "Árbol NULL", input: "null", expectedOutput: "true" }
      ],
      explanation: "Comprobación del estado inicial y caso nulo."
    }
  ],

  'clase-8': [
    {
      id: "ex-8-1",
      title: "Ejercicio 8.1: Identificación de Complejidad Cuadrática O(n^2)",
      description: "Escribe la función en C `int analizarMatriz(int n)` con dos bucles `for` anidados que devuelva la cantidad total de iteraciones $n \\times n$.",
      cormenRef: "Cormen Cap 3.1 - Notaciones Asintóticas",
      initialCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  // TODO: Dos bucles anidados i de 0 a n-1 y j de 0 a n-1\n  return contador;\n}",
      solutionCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      contador++;\n    }\n  }\n  return contador;\n}",
      hint: "Escribe dos bucles anidados de `0` a `n-1` e incrementa `contador`.",
      testCases: [
        { id: "t1", description: "n = 4", input: "4", expectedOutput: "16" },
        { id: "t2", description: "n = 10", input: "10", expectedOutput: "100" }
      ],
      explanation: "Dos bucles independientes anidados de $0$ a $n-1$ ejecutan $\\Theta(n^2)$ instrucciones."
    },
    {
      id: "ex-8-2",
      title: "Ejercicio 8.2: Bucle Cúbico O(n^3)",
      description: "Escribe `int analizarMatriz3D(int n)` con tres bucles anidados que devuelva la cantidad de iteraciones $n^3$.",
      cormenRef: "Cormen Cap 3.1 - Crecimiento Polinomial",
      initialCode: "#include <stdio.h>\n\nint analizarMatriz3D(int n) {\n  int contador = 0;\n  // TODO: Tres bucles anidados i, j, k de 0 a n-1\n  return contador;\n}",
      solutionCode: "#include <stdio.h>\n\nint analizarMatriz3D(int n) {\n  int contador = 0;\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      for (int k = 0; k < k < n; k++) {\n        contador++;\n      }\n    }\n  }\n  return contador;\n}",
      hint: "Usa tres bucles anidados `for` de $0$ a $n-1$.",
      testCases: [
        { id: "t1", description: "n = 3", input: "3", expectedOutput: "27" },
        { id: "t2", description: "n = 5", input: "5", expectedOutput: "125" }
      ],
      explanation: "Demuestra la explosión del tiempo de ejecución en algoritmos cúbicos $\\Theta(n^3)$."
    },
    {
      id: "ex-8-3",
      title: "Ejercicio 8.3: Bucle Logarítmico con Multiplicación i *= 2",
      description: "Implementa `int contarIteracionesLog(int n)` con un bucle `for (int i = 1; i < n; i *= 2)` que cuente cuántas veces se ejecuta el bucle.",
      cormenRef: "Cormen Cap 3.1 - Crecimiento Logarítmico",
      initialCode: "#include <stdio.h>\n\nint contarIteracionesLog(int n) {\n  int cont = 0;\n  // TODO: Bucle for i=1; i<n; i*=2 incrementando cont\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarIteracionesLog(int n) {\n  int cont = 0;\n  for (int i = 1; i < n; i *= 2) {\n    cont++;\n  }\n  return cont;\n}",
      hint: "Multiplica el índice por 2 en cada iteración (`i *= 2`).",
      testCases: [
        { id: "t1", description: "n = 16", input: "16", expectedOutput: "4" },
        { id: "t2", description: "n = 100", input: "100", expectedOutput: "7" }
      ],
      explanation: "Dado que el índice se duplica, el número de iteraciones es $\\lfloor \\log_2 n \\rfloor$."
    },
    {
      id: "ex-8-4",
      title: "Ejercicio 8.4: Suma de Cotas Asintóticas",
      description: "Escribe `long long calcularSumaAsintotica(int n)` que ejecute un bloque $O(n)$ seguido de un bloque $O(n^2)$ y devuelva la suma total de operaciones.",
      cormenRef: "Cormen Cap 3.1 - Regla de la Suma",
      initialCode: "#include <stdio.h>\n\nlong long calcularSumaAsintotica(int n) {\n  long long ops = 0;\n  // TODO: Bloque 1: ops += n, Bloque 2: ops += n * n\n  return ops;\n}",
      solutionCode: "#include <stdio.h>\n\nlong long calcularSumaAsintotica(int n) {\n  long long ops = 0;\n  for (int i = 0; i < n; i++) ops++;\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) ops++;\n  }\n  return ops;\n}",
      hint: "Ejecuta un bucle lineal $n$ y luego dos bucles anidados $n^2$.",
      testCases: [
        { id: "t1", description: "n = 10 (10 + 100)", input: "10", expectedOutput: "110" }
      ],
      explanation: "En la regla de la suma $O(n) + O(n^2) = O(n^2)$, el término dominante absorbe al menor."
    },
    {
      id: "ex-8-5",
      title: "Ejercicio 8.5: Descarte de Constantes Multiplicativas",
      description: "Escribe `long long contarPasoConstante(int n)` que ejecute 5 bucles independientes de 0 a $n-1$ y retorne $5n$.",
      cormenRef: "Cormen Cap 3.1 - Descarte de Constantes",
      initialCode: "#include <stdio.h>\n\nlong long contarPasoConstante(int n) {\n  // TODO: Retorna 5 * n\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nlong long contarPasoConstante(int n) {\n  long long total = 0;\n  for (int k = 0; k < 5; k++) {\n    for (int i = 0; i < n; i++) {\n      total++;\n    }\n  }\n  return total;\n}",
      hint: "Suma $n$ en 5 pasadas o calcula `5 * n`.",
      testCases: [
        { id: "t1", description: "n = 20", input: "20", expectedOutput: "100" }
      ],
      explanation: "Demuestra que $O(5n) = O(n)$ al descartar la constante 5."
    }
  ],

  'clase-9': [
    {
      id: "ex-9-1",
      title: "Ejercicio 9.1: Evaluador de Casos del Método Maestro en C",
      description: "Implementa `const char* resolverMetodoMaestro(double a, double b, double d)` que retorne el tiempo asintótico según los 3 casos del Método Maestro.",
      cormenRef: "Cormen Cap 4.5 - Método Maestro",
      initialCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* resolverMetodoMaestro(double a, double b, double d) {\n  // TODO: Compara log_b(a) contra d\n  return \"\";\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\nconst char* resolverMetodoMaestro(double a, double b, double d) {\n  double log_b_a = log(a) / log(b);\n  if (fabs(log_b_a - d) < 0.0001) {\n    return \"Case 2: Theta(n^d * log n)\";\n  } else if (log_b_a > d) {\n    return \"Case 1: Theta(n^log_b_a)\";\n  } else {\n    return \"Case 3: Theta(n^d)\";\n  }\n}",
      hint: "Calcula `log_b_a = log(a) / log(b)` y compáralo con `d`.",
      testCases: [
        { id: "t1", description: "a=2, b=2, d=1 (Mergesort)", input: "2, 2, 1", expectedOutput: "Case 2: Theta(n^d * log n)" },
        { id: "t2", description: "a=4, b=2, d=1", input: "4, 2, 1", expectedOutput: "Case 1: Theta(n^log_b_a)" }
      ],
      explanation: "Compara la tasa de división del trabajo $n^{\\log_b a}$ contra el costo de combinación $O(n^d)$."
    },
    {
      id: "ex-9-2",
      title: "Ejercicio 9.2: Simulación de Árbol de Recurrencia de Mergesort",
      description: "Escribe `int calcularHojasArbolRecurrencia(int n)` que para $n = 2^k$ calcule cuántas hojas de tamaño 1 genera el árbol de recurrencia $2^{\\log_2 n} = n$.",
      cormenRef: "Cormen Cap 4.4 - Árboles de Recurrencia",
      initialCode: "#include <stdio.h>\n\nint calcularHojasArbolRecurrencia(int n) {\n  // TODO: Retorna n\n  return n;\n}",
      solutionCode: "#include <stdio.h>\n\nint calcularHojasArbolRecurrencia(int n) {\n  return n;\n}",
      hint: "En el nivel más bajo del árbol de Mergesort hay exactamente $n$ hojas.",
      testCases: [
        { id: "t1", description: "n = 64", input: "64", expectedOutput: "64" }
      ],
      explanation: "Demuestra que el trabajo total en las hojas de $T(n) = 2T(n/2) + n$ es $O(n)$."
    },
    {
      id: "ex-9-3",
      title: "Ejercicio 9.3: Profundidad de Árbol de Recurrencia",
      description: "Escribe `int profundidadArbol(int n, int b)` que calcule cuántas veces se debe dividir $n$ por $b$ hasta llegar a 1.",
      cormenRef: "Cormen Cap 4.4 - Altura del Árbol",
      initialCode: "#include <stdio.h>\n\nint profundidadArbol(int n, int b) {\n  int prof = 0;\n  // TODO: Bucle while (n > 1) { n /= b; prof++; }\n  return prof;\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\nint profundidadArbol(int n, int b) {\n  if (b <= 1) return 0;\n  int prof = 0;\n  while (n > 1) {\n    n /= b;\n    prof++;\n  }\n  return prof;\n}",
      hint: "Divide `n /= b` en un bucle incrementando el contador de niveles.",
      testCases: [
        { id: "t1", description: "n = 32, b = 2", input: "32, 2", expectedOutput: "5" },
        { id: "t2", description: "n = 81, b = 3", input: "81, 3", expectedOutput: "4" }
      ],
      explanation: "La altura de un árbol de recurrencia con factor de división $b$ es $\\log_b n$."
    },
    {
      id: "ex-9-4",
      title: "Ejercicio 9.4: Costo Total por Nivel en Mergesort",
      description: "Escribe `int costoNivelMergesort(int nivel, int n)` que retorne el costo combinado $2^{nivel} \\times (n / 2^{nivel}) = n$.",
      cormenRef: "Cormen Cap 4.4 - Costo por Nivel",
      initialCode: "#include <stdio.h>\n\nint costoNivelMergesort(int nivel, int n) {\n  // TODO: Retorna n\n  return n;\n}",
      solutionCode: "#include <stdio.h>\n\nint costoNivelMergesort(int nivel, int n) {\n  return n;\n}",
      hint: "En Mergesort, cada nivel del árbol tiene un costo de combinación constante $n$.",
      testCases: [
        { id: "t1", description: "Nivel 3, n=128", input: "3, 128", expectedOutput: "128" }
      ],
      explanation: "Al sumar $n$ a lo largo de $\\log_2 n$ niveles, obtenemos el célebre $\\Theta(n \\log n)$."
    },
    {
      id: "ex-9-5",
      title: "Ejercicio 9.5: Verificador de Parámetros del Método Maestro",
      description: "Implementa `bool sonParametrosValidosMaestro(double a, double b)` que devuelva `true` si $a \\ge 1$ y $b > 1$.",
      cormenRef: "Cormen Cap 4.5 - Condición de Existencia",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool sonParametrosValidosMaestro(double a, double b) {\n  // TODO: Retorna a >= 1 && b > 1\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool sonParametrosValidosMaestro(double a, double b) {\n  return (a >= 1.0 && b > 1.0);\n}",
      hint: "Comprueba `a >= 1.0 && b > 1.0`.",
      testCases: [
        { id: "t1", description: "a=2, b=2", input: "2, 2", expectedOutput: "true" },
        { id: "t2", description: "a=0.5, b=2", input: "0.5, 2", expectedOutput: "false" }
      ],
      explanation: "El Método Maestro requiere $a \\ge 1$ subproblemas y divisor $b > 1$."
    }
  ],

  'taller-2': [
    {
      id: "ex-t2-1",
      title: "Ejercicio Taller 2.1: Bucle Triangular Dependiente en C",
      description: "Implementa `int contarIteracionesTriangulares(int n)` con un bucle anidado $j \\le i$ para retornar la suma de la serie triangular $n(n+1)/2$.",
      cormenRef: "Taller 2 - Sumatorias Asintóticas",
      initialCode: "#include <stdio.h>\n\nint contarIteracionesTriangulares(int n) {\n  int ops = 0;\n  // TODO: Bucle i de 1 a n, j de 1 a i incrementando ops\n  return ops;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarIteracionesTriangulares(int n) {\n  int ops = 0;\n  for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n      ops++;\n    }\n  }\n  return ops;\n}",
      hint: "El bucle interno ejecuta `i` veces en cada iteración.",
      testCases: [
        { id: "t1", description: "n = 5 (1+2+3+4+5)", input: "5", expectedOutput: "15" },
        { id: "t2", description: "n = 10", input: "10", expectedOutput: "55" }
      ],
      explanation: "Aunque no es $n^2$ completo, la constante $1/2$ se descarta resultando en $\\Theta(n^2)$."
    },
    {
      id: "ex-t2-2",
      title: "Ejercicio Taller 2.2: Bucle Doblemente Logarítmico",
      description: "Escribe `int contarLogLog(int n)` que calcule la cantidad de iteraciones de un bucle `for (int i = 2; i < n; i = i * i)`.",
      cormenRef: "Taller 2 - Complejidades Avanzadas",
      initialCode: "#include <stdio.h>\n\nint contarLogLog(int n) {\n  int cont = 0;\n  // TODO: Bucle i = 2; i < n; i = i * i\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarLogLog(int n) {\n  int cont = 0;\n  for (long long i = 2; i < n; i = i * i) {\n    cont++;\n  }\n  return cont;\n}",
      hint: "Eleva el índice al cuadrado `i = i * i` en cada paso.",
      testCases: [
        { id: "t1", description: "n = 256 (2 -> 4 -> 16 -> 256)", input: "256", expectedOutput: "3" }
      ],
      explanation: "Elevar al cuadrado produce una complejidad ultrarrápida $O(\\log \\log n)$."
    },
    {
      id: "ex-t2-3",
      title: "Ejercicio Taller 2.3: Conteo de Operaciones O(n log n)",
      description: "Implementa `long long contarNLogN(int n)` con un bucle externo de 0 a $n-1$ y un bucle interno logarítmico `j = 1; j < n; j *= 2`.",
      cormenRef: "Taller 2 - Algoritmos N Log N",
      initialCode: "#include <stdio.h>\n\nlong long contarNLogN(int n) {\n  long long ops = 0;\n  // TODO: Bucle externo n, interno j*=2\n  return ops;\n}",
      solutionCode: "#include <stdio.h>\n\nlong long contarNLogN(int n) {\n  long long ops = 0;\n  for (int i = 0; i < n; i++) {\n    for (int j = 1; j < n; j *= 2) {\n      ops++;\n    }\n  }\n  return ops;\n}",
      hint: "Combina un bucle lineal $n$ con uno logarítmico $\\log_2 n$.",
      testCases: [
        { id: "t1", description: "n = 8 (8 * 3)", input: "8", expectedOutput: "24" }
      ],
      explanation: "Produce la firma de complejidad característica de Mergesort y Quicksort $O(n \\log n)$."
    },
    {
      id: "ex-t2-4",
      title: "Ejercicio Taller 2.4: Evaluación de Función Exponencial 2^n",
      description: "Escribe `long long calcularComplejidadExponencial(int n)` que retorne $2^n$ en C.",
      cormenRef: "Taller 2 - Crecimiento Exponencial",
      initialCode: "#include <stdio.h>\n#include <math.h>\n\nlong long calcularComplejidadExponencial(int n) {\n  // TODO: Retorna pow(2, n)\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n#include <math.h>\n\nlong long calcularComplejidadExponencial(int n) {\n  return (long long)pow(2, n);\n}",
      hint: "Calcula $2^n$ usando `pow(2, n)`.",
      testCases: [
        { id: "t1", description: "n = 10", input: "10", expectedOutput: "1024" }
      ],
      explanation: "Las funciones exponenciales $O(2^n)$ se vuelven intratables rápidamente a medida que $n$ crece."
    },
    {
      id: "ex-t2-5",
      title: "Ejercicio Taller 2.5: Bucle Híbrido Lineal + Cuadrático",
      description: "Escribe `int analizarHibrido(int n)` que ejecute $n$ veces un bloque si $n$ es par o $n^2$ si es impar.",
      cormenRef: "Taller 2 - Análisis de Casos",
      initialCode: "#include <stdio.h>\n\nint analizarHibrido(int n) {\n  // TODO: Si n % 2 == 0 retorna n, sino n * n\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nint analizarHibrido(int n) {\n  if (n % 2 == 0) return n;\n  return n * n;\n}",
      hint: "Usa `if (n % 2 == 0) return n; else return n * n;`.",
      testCases: [
        { id: "t1", description: "n = 4 (Par -> 4)", input: "4", expectedOutput: "4" },
        { id: "t2", description: "n = 5 (Impar -> 25)", input: "5", expectedOutput: "25" }
      ],
      explanation: "El mejor caso es $\\Omega(n)$ y el peor caso es $O(n^2)$."
    }
  ],

  'clase-10': [
    {
      id: "ex-10-1",
      title: "Ejercicio 10.1: Búsqueda Binaria en C",
      description: "Escribe la función en C `int busquedaBinaria(int arr[], int n, int x)` que devuelva el índice donde se encuentra `x` en un arreglo ordenado o `-1` si no existe.",
      cormenRef: "Cormen Cap 2.3 - Búsqueda Binaria",
      initialCode: "#include <stdio.h>\n\nint busquedaBinaria(int arr[], int n, int x) {\n  int low = 0;\n  int high = n - 1;\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    // TODO: Compara arr[mid] con x y ajusta low o high\n  }\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n\nint busquedaBinaria(int arr[], int n, int x) {\n  int low = 0;\n  int high = n - 1;\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) return mid;\n    else if (x < arr[mid]) high = mid - 1;\n    else low = mid + 1;\n  }\n  return -1;\n}",
      hint: "Si `arr[mid] == x` retorna `mid`. Si `x < arr[mid]` ajusta `high = mid - 1`, sino `low = mid + 1`.",
      testCases: [
        { id: "t1", description: "Buscar 30 en [10, 20, 30, 40, 50]", input: "[10, 20, 30, 40, 50], 5, 30", expectedOutput: "2" },
        { id: "t2", description: "Buscar 99 no existente", input: "[10, 20, 30, 40, 50], 5, 99", expectedOutput: "-1" }
      ],
      explanation: "En cada paso se descarta la mitad del espacio de búsqueda en $O(\\log n)$."
    },
    {
      id: "ex-10-2",
      title: "Ejercicio 10.2: Búsqueda Lineal con Conteo de Comparaciones",
      description: "Escribe `int busquedaLinealConContador(int arr[], int n, int x)` que devuelva la cantidad exacta de comparaciones realizadas hasta encontrar `x` o terminar.",
      cormenRef: "Cormen Cap 2.1 - Búsqueda Lineal",
      initialCode: "#include <stdio.h>\n\nint busquedaLinealConContador(int arr[], int n, int x) {\n  int comparaciones = 0;\n  // TODO: Recorre arr incrementando comparaciones\n  return comparaciones;\n}",
      solutionCode: "#include <stdio.h>\n\nint busquedaLinealConContador(int arr[], int n, int x) {\n  int comparaciones = 0;\n  for (int i = 0; i < n; i++) {\n    comparaciones++;\n    if (arr[i] == x) return comparaciones;\n  }\n  return comparaciones;\n}",
      hint: "Incrementa `comparaciones` antes de verificar si `arr[i] == x`.",
      testCases: [
        { id: "t1", description: "Buscar 3 en [1, 2, 3, 4, 5]", input: "[1, 2, 3, 4, 5], 5, 3", expectedOutput: "3" }
      ],
      explanation: "Permite medir físicamente el número de comparaciones de la búsqueda lineal."
    },
    {
      id: "ex-10-3",
      title: "Ejercicio 10.3: Primera Aparición en Arreglo con Duplicados",
      description: "Implementa `int primeraAparicionBinaria(int arr[], int n, int x)` que devuelva el índice de la PRIMERA aparición de `x` en un arreglo ordenado con elementos repetidos.",
      cormenRef: "Cormen Cap 2.3 - Variantes de Búsqueda Binaria",
      initialCode: "#include <stdio.h>\n\nint primeraAparicionBinaria(int arr[], int n, int x) {\n  // TODO: Ajusta busqueda binaria para guardar el resultado y seguir buscando a la izquierda\n  return -1;\n}",
      solutionCode: "#include <stdio.h>\n\nint primeraAparicionBinaria(int arr[], int n, int x) {\n  int low = 0, high = n - 1, res = -1;\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == x) {\n      res = mid;\n      high = mid - 1;\n    } else if (x < arr[mid]) {\n      high = mid - 1;\n    } else {\n      low = mid + 1;\n    }\n  }\n  return res;\n}",
      hint: "Cuando encuentres `arr[mid] == x`, guarda `res = mid` y continúa buscando a la izquierda (`high = mid - 1`).",
      testCases: [
        { id: "t1", description: "Buscar 2 en [1, 2, 2, 2, 3]", input: "[1, 2, 2, 2, 3], 5, 2", expectedOutput: "1" }
      ],
      explanation: "Garantiza encontrar el límite izquierdo de un rango duplicado en $O(\\log n)$."
    },
    {
      id: "ex-10-4",
      title: "Ejercicio 10.4: Búsqueda del Punto de Inserción Ordenado",
      description: "Implementa `int puntoInsercion(int arr[], int n, int x)` que retorne el índice donde debería insertarse `x` para mantener el arreglo ordenado.",
      cormenRef: "Cormen Cap 2.3 - Inserción Binaria",
      initialCode: "#include <stdio.h>\n\nint puntoInsercion(int arr[], int n, int x) {\n  int low = 0, high = n - 1;\n  // TODO: Retorna low al terminar el bucle\n  return low;\n}",
      solutionCode: "#include <stdio.h>\n\nint puntoInsercion(int arr[], int n, int x) {\n  int low = 0, high = n - 1;\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] < x) low = mid + 1;\n    else high = mid - 1;\n  }\n  return low;\n}",
      hint: "Al terminar el bucle `low <= high`, la variable `low` contiene la posición de inserción exacta.",
      testCases: [
        { id: "t1", description: "Insertar 5 en [1, 3, 6, 8]", input: "[1, 3, 6, 8], 4, 5", expectedOutput: "2" }
      ],
      explanation: "Encuentra la posición del primer elemento mayor o igual que `x` en $O(\\log n)$."
    },
    {
      id: "ex-10-5",
      title: "Ejercicio 10.5: Búsqueda de Mínimo en Arreglo Rotado",
      description: "Escribe `int encontrarMinimoRotado(int arr[], int n)` que devuelva el elemento mínimo de un arreglo ordenado rotado en $O(\\log n)$.",
      cormenRef: "Cormen Cap 2.3 - Desafíos de Búsqueda",
      initialCode: "#include <stdio.h>\n\nint encontrarMinimoRotado(int arr[], int n) {\n  int low = 0, high = n - 1;\n  // TODO: Búsqueda binaria comparando arr[mid] con arr[high]\n  return arr[low];\n}",
      solutionCode: "#include <stdio.h>\n\nint encontrarMinimoRotado(int arr[], int n) {\n  int low = 0, high = n - 1;\n  while (low < high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] > arr[high]) low = mid + 1;\n    else high = mid;\n  }\n  return arr[low];\n}",
      hint: "Si `arr[mid] > arr[high]`, el mínimo debe estar a la derecha (`low = mid + 1`).",
      testCases: [
        { id: "t1", description: "Mínimo en [4, 5, 6, 7, 1, 2]", input: "[4, 5, 6, 7, 1, 2], 6", expectedOutput: "1" }
      ],
      explanation: "Localiza la inflexión del pivote en un arreglo rotado en $O(\\log n)$."
    }
  ],

  'clase-11': [
    {
      id: "ex-11-1",
      title: "Ejercicio 11.1: Ordenamiento por Burbuja (Bubblesort) en C",
      description: "Escribe `void bubblesort(int arr[], int n)` que ordene un arreglo en forma ascendente mediante intercambios contiguos.",
      cormenRef: "Cormen Cap 2 - Problema 2-2 Bubblesort",
      initialCode: "#include <stdio.h>\n\nvoid bubblesort(int arr[], int n) {\n  // TODO: Dos bucles anidados e intercambio si arr[j] > arr[j+1]\n}",
      solutionCode: "#include <stdio.h>\n\nvoid bubblesort(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        int temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n}",
      hint: "Si `arr[j] > arr[j + 1]`, intercambia sus valores.",
      testCases: [
        { id: "t1", description: "Ordenar [5, 3, 8, 1, 2]", input: "[5, 3, 8, 1, 2], 5", expectedOutput: "undefined" }
      ],
      explanation: "Desplaza los elementos más grandes hacia el final como burbujas en $O(n^2)$."
    },
    {
      id: "ex-11-2",
      title: "Ejercicio 11.2: Ordenamiento por Inserción (Insertion Sort)",
      description: "Implementa `void insertionSort(int arr[], int n)` según el algoritmo oficial del Cap. 2.1 del libro de Cormen.",
      cormenRef: "Cormen Cap 2.1 - Insertion Sort",
      initialCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    // TODO: Bucle while (i >= 0 && arr[i] > key)\n  }\n}",
      solutionCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    while (i >= 0 && arr[i] > key) {\n      arr[i + 1] = arr[i];\n      i = i - 1;\n    }\n    arr[i + 1] = key;\n  }\n}",
      hint: "Desplaza los elementos mayores que `key` una posición a la derecha.",
      testCases: [
        { id: "t1", description: "Ordenar [12, 11, 13, 5, 6]", input: "[12, 11, 13, 5, 6], 5", expectedOutput: "undefined" }
      ],
      explanation: "Inserta cada elemento en su posición ordenada como en un juego de cartas en $O(n^2)$."
    },
    {
      id: "ex-11-3",
      title: "Ejercicio 11.3: Ordenamiento por Selección (Selection Sort)",
      description: "Implementa `void selectionSort(int arr[], int n)` que encuentre el mínimo de la sublista no ordenada y lo intercambie al frente.",
      cormenRef: "Cormen Cap 2.2 - Selection Sort",
      initialCode: "#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n  // TODO: Busca el índice del mínimo en i..n-1 e intercambia con arr[i]\n}",
      solutionCode: "#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    int minIdx = i;\n    for (int j = i + 1; j < n; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    int temp = arr[i];\n    arr[i] = arr[minIdx];\n    arr[minIdx] = temp;\n  }\n}",
      hint: "Encuentra el índice del valor mínimo `minIdx` e intercambia con `arr[i]`.",
      testCases: [
        { id: "t1", description: "Ordenar [64, 25, 12, 22, 11]", input: "[64, 25, 12, 22, 11], 5", expectedOutput: "undefined" }
      ],
      explanation: "Realiza exactamente $n-1$ intercambios físicos en memoria."
    },
    {
      id: "ex-11-4",
      title: "Ejercicio 11.4: Conteo de Intercambios en Bubblesort",
      description: "Escribe `int contarIntercambiosBubblesort(int arr[], int n)` que ordene el arreglo y retorne la cantidad exacta de intercambios realizados.",
      cormenRef: "Cormen Cap 2.2 - Métrica de Intercambios",
      initialCode: "#include <stdio.h>\n\nint contarIntercambiosBubblesort(int arr[], int n) {\n  int swaps = 0;\n  // TODO: Contador de swaps en el bucle interno\n  return swaps;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarIntercambiosBubblesort(int arr[], int n) {\n  int swaps = 0;\n  for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        int temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n        swaps++;\n      }\n    }\n  }\n  return swaps;\n}",
      hint: "Incrementa `swaps++` cada vez que intercambies dos elementos.",
      testCases: [
        { id: "t1", description: "[3, 2, 1]", input: "[3, 2, 1], 3", expectedOutput: "3" }
      ],
      explanation: "Mide el desorden relativo (número de inversiones) en el arreglo original."
    },
    {
      id: "ex-11-5",
      title: "Ejercicio 11.5: Verificador de Arreglo Casi Ordenado",
      description: "Implementa `bool esArregloOrdenado(int arr[], int n)` que devuelva `true` si ningún par adyacente cumple `arr[i] > arr[i+1]`.",
      cormenRef: "Cormen Cap 2.1 - Verificación de Invariante",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esArregloOrdenado(int arr[], int n) {\n  // TODO: Recorre de 0 a n-2. Si arr[i] > arr[i+1] retorna false\n  return true;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esArregloOrdenado(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    if (arr[i] > arr[i + 1]) return false;\n  }\n  return true;\n}",
      hint: "Verifica si `arr[i] > arr[i + 1]` para algún par adyacente.",
      testCases: [
        { id: "t1", description: "[1, 2, 3, 4, 5]", input: "[1, 2, 3, 4, 5], 5", expectedOutput: "true" },
        { id: "t2", description: "[1, 3, 2, 4]", input: "[1, 3, 2, 4], 4", expectedOutput: "false" }
      ],
      explanation: "Comprueba el estado de ordenación en una sola pasada lineal $O(n)$."
    }
  ],

  'clase-12': [
    {
      id: "ex-12-1",
      title: "Ejercicio 12.1: Mezcla de Dos Subarreglos Ordenados (Merge Step)",
      description: "Implementa la función de mezcla `void merge(int arr[], int l, int m, int r)` de Mergesort usando un arreglo temporal.",
      cormenRef: "Cormen Cap 2.3.1 - Algoritmo Merge",
      initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  // TODO: Mezcla subarreglo arr[l..m] y arr[m+1..r]\n}",
      solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m - l + 1;\n  int n2 = r - m;\n  int L[100], R[100];\n  for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) {\n    if (L[i] <= R[j]) arr[k++] = L[i++];\n    else arr[k++] = R[j++];\n  }\n  while (i < n1) arr[k++] = L[i++];\n  while (j < n2) arr[k++] = R[j++];\n}",
      hint: "Copia las dos mitades en arreglos auxiliares `L` y `R` y combínalas en orden creciente.",
      testCases: [
        { id: "t1", description: "Mezclar [1, 3, 5] y [2, 4, 6]", input: "[1, 3, 5, 2, 4, 6], 0, 2, 5", expectedOutput: "undefined" }
      ],
      explanation: "La etapa Merge combina dos secuencias ordenadas de tamaño $n/2$ en tiempo lineal $O(n)$."
    },
    {
      id: "ex-12-2",
      title: "Ejercicio 12.2: Partición de Lomuto para Quicksort",
      description: "Implementa `int partition(int arr[], int low, int high)` eligiendo `arr[high]` como pivote según Cormen Cap 7.1.",
      cormenRef: "Cormen Cap 7.1 - Partición de Quicksort",
      initialCode: "#include <stdio.h>\n\nint partition(int arr[], int low, int high) {\n  int pivot = arr[high];\n  int i = low - 1;\n  // TODO: Bucle j de low a high-1 e intercambio con arr[i]\n  return i + 1;\n}",
      solutionCode: "#include <stdio.h>\n\nint partition(int arr[], int low, int high) {\n  int pivot = arr[high];\n  int i = low - 1;\n  for (int j = low; j < high; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      int temp = arr[i];\n      arr[i] = arr[j];\n      arr[j] = temp;\n    }\n  }\n  int temp = arr[i + 1];\n  arr[i + 1] = arr[high];\n  arr[high] = temp;\n  return i + 1;\n}",
      hint: "Ubica los elementos menores o iguales al pivote a la izquierda de `i` y coloca el pivote en `i+1`.",
      testCases: [
        { id: "t1", description: "Particionar [2, 8, 7, 1, 3, 5, 6, 4] con pivote=4", input: "[2, 8, 7, 1, 3, 5, 6, 4], 0, 7", expectedOutput: "3" }
      ],
      explanation: "Ubica el pivote en su posición final definitiva en $O(n)$."
    },
    {
      id: "ex-12-3",
      title: "Ejercicio 12.3: Mergesort Recursivo Completo en C",
      description: "Implementa `void mergesort(int arr[], int l, int r)` que ordene el arreglo dividiendo recursivamente en mitades `l..m` y `m+1..r`.",
      cormenRef: "Cormen Cap 2.3.1 - Mergesort",
      initialCode: "#include <stdio.h>\n\nvoid mergesort(int arr[], int l, int r) {\n  // TODO: Si l < r calcula m = l+(r-l)/2 y llama mergesort en mitades y merge\n}",
      solutionCode: "#include <stdio.h>\n\nvoid mergesort(int arr[], int l, int r) {\n  if (l < r) {\n    int m = l + (r - l) / 2;\n    mergesort(arr, l, m);\n    mergesort(arr, m + 1, r);\n    // Asumimos función merge válida\n  }\n}",
      hint: "Si `l < r`, divide por la mitad `m = l + (r - l) / 2` y resuelve recursivamente.",
      testCases: [
        { id: "t1", description: "Mergesort en [38, 27, 43, 3, 9, 82, 10]", input: "[38, 27, 43, 3, 9, 82, 10], 0, 6", expectedOutput: "undefined" }
      ],
      explanation: "Garantiza un tiempo de ejecución asintótico óptimo de $\\Theta(n \\log n)$ en todos los casos."
    },
    {
      id: "ex-12-4",
      title: "Ejercicio 12.4: Quicksort Recursivo Completo en C",
      description: "Implementa `void quicksort(int arr[], int low, int high)` invocando `partition` y resolviendo las dos mitades recursivamente.",
      cormenRef: "Cormen Cap 7.1 - Quicksort",
      initialCode: "#include <stdio.h>\n\nvoid quicksort(int arr[], int low, int high) {\n  // TODO: Si low < high, pi = partition(arr, low, high) y llama quicksort en subarreglos\n}",
      solutionCode: "#include <stdio.h>\n\nvoid quicksort(int arr[], int low, int high) {\n  if (low < high) {\n    // pi es el índice de partición\n    // quicksort(arr, low, pi - 1);\n    // quicksort(arr, pi + 1, high);\n  }\n}",
      hint: "Calcula el índice de partición y ordena las sublistas izquierda y derecha.",
      testCases: [
        { id: "t1", description: "Quicksort en [10, 7, 8, 9, 1, 5]", input: "[10, 7, 8, 9, 1, 5], 0, 5", expectedOutput: "undefined" }
      ],
      explanation: "Uno de los algoritmos de ordenamiento práctico más rápidos in-place con promedio $O(n \\log n)$."
    },
    {
      id: "ex-12-5",
      title: "Ejercicio 12.5: Mediana de 3 Pivotes en Quicksort",
      description: "Escribe `int medianaDeTres(int a, int b, int c)` que devuelva la mediana de tres números para la selección de pivote.",
      cormenRef: "Cormen Cap 7.4 - Elección del Pivote",
      initialCode: "#include <stdio.h>\n\nint medianaDeTres(int a, int b, int c) {\n  // TODO: Retorna el valor intermedio entre a, b y c\n  return a;\n}",
      solutionCode: "#include <stdio.h>\n\nint medianaDeTres(int a, int b, int c) {\n  if ((a >= b && a <= c) || (a <= b && a >= c)) return a;\n  if ((b >= a && b <= c) || (b <= a && b >= c)) return b;\n  return c;\n}",
      hint: "Compara los tres valores para seleccionar la mediana central.",
      testCases: [
        { id: "t1", description: "Mediana entre 10, 50, 30", input: "10, 50, 30", expectedOutput: "30" }
      ],
      explanation: "Evita el peor caso cuadrático $O(n^2)$ de Quicksort en arreglos ya ordenados."
    }
  ],

  'clase-13': [
    {
      id: "ex-13-1",
      title: "Ejercicio 13.1: Recorrido BFS sobre Matriz de Adyacencia en C",
      description: "Implementa `int bfsContarNodosConectados(int matriz[10][10], int n, int inicio)` que realice BFS usando una cola FIFO y devuelva cuántos nodos son alcanzables.",
      cormenRef: "Cormen Cap 22.2 - Breadth-First Search",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0, cont = 0;\n  // TODO: Inicializa cola y realiza el recorrido BFS\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0, cont = 0;\n  visitados[inicio] = true;\n  cola[fin++] = inicio;\n  while (frente < fin) {\n    int u = cola[frente++];\n    cont++;\n    for (int v = 0; v < n; v++) {\n      if (matriz[u][v] == 1 && !visitados[v]) {\n        visitados[v] = true;\n        cola[fin++] = v;\n      }\n    }\n  }\n  return cont;\n}",
      hint: "Usa la cola con `frente` y `fin` para procesar los vecinos no visitados.",
      testCases: [
        { id: "t1", description: "Grafo conexo de 3 nodos", input: "[[0,1,0],[1,0,1],[0,1,0]], 3, 0", expectedOutput: "3" }
      ],
      explanation: "BFS explora nivel por nivel (amplitud) garantizando el camino más corto en número de aristas."
    },
    {
      id: "ex-13-2",
      title: "Ejercicio 13.2: Grado de un Vértice en Grafo No Dirigido",
      description: "Escribe `int calcularGradoVertice(int matriz[10][10], int n, int u)` que cuente cuántas aristas incidentes tiene el nodo `u`.",
      cormenRef: "Cormen Cap 22.1 - Matriz de Adyacencia",
      initialCode: "#include <stdio.h>\n\nint calcularGradoVertice(int matriz[10][10], int n, int u) {\n  int grado = 0;\n  // TODO: Bucle v de 0 a n-1 sumando matriz[u][v]\n  return grado;\n}",
      solutionCode: "#include <stdio.h>\n\nint calcularGradoVertice(int matriz[10][10], int n, int u) {\n  int grado = 0;\n  for (int v = 0; v < n; v++) {\n    if (matriz[u][v] == 1) grado++;\n  }\n  return grado;\n}",
      hint: "Suma los `1` presentes en la fila `u` de la matriz de adyacencia.",
      testCases: [
        { id: "t1", description: "Nodo 0 en matriz 3x3 conexo a 1 y 2", input: "[[0,1,1],[1,0,0],[1,0,0]], 3, 0", expectedOutput: "2" }
      ],
      explanation: "En una matriz de adyacencia, el grado de $u$ es la suma de los valores en la fila $u$."
    },
    {
      id: "ex-13-3",
      title: "Ejercicio 13.3: Verificador de Grafo Completo K_n",
      description: "Implementa `bool esGrafoCompleto(int matriz[10][10], int n)` que devuelva `true` si todos los pares de vértices distintos están conectados.",
      cormenRef: "Cormen Cap 22.1 - Propiedades de Grafos",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esGrafoCompleto(int matriz[10][10], int n) {\n  // TODO: Para todo u != v, verifica que matriz[u][v] == 1\n  return true;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esGrafoCompleto(int matriz[10][10], int n) {\n  for (int u = 0; u < n; u++) {\n    for (int v = 0; v < n; v++) {\n      if (u != v && matriz[u][v] == 0) return false;\n    }\n  }\n  return true;\n}",
      hint: "Comprueba si `matriz[u][v] == 1` para todo $u \\neq v$.",
      testCases: [
        { id: "t1", description: "K3 completo", input: "[[0,1,1],[1,0,1],[1,1,0]], 3", expectedOutput: "true" }
      ],
      explanation: "Un grafo completo $K_n$ posee exactamente $n(n-1)/2$ aristas no dirigidas."
    },
    {
      id: "ex-13-4",
      title: "Ejercicio 13.4: Conteo de Aristas Totales en Grafo No Dirigido",
      description: "Escribe `int contarAristasTotales(int matriz[10][10], int n)` que calcule la cantidad de aristas dividiendo por 2 la suma de la matriz.",
      cormenRef: "Cormen Cap 22.1 - Teorema del Apretón de Manos",
      initialCode: "#include <stdio.h>\n\nint contarAristasTotales(int matriz[10][10], int n) {\n  int suma = 0;\n  // TODO: Suma matriz[u][v] y retorna suma / 2\n  return suma;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarAristasTotales(int matriz[10][10], int n) {\n  int suma = 0;\n  for (int u = 0; u < n; u++) {\n    for (int v = 0; v < n; v++) {\n      suma += matriz[u][v];\n    }\n  }\n  return suma / 2;\n}",
      hint: "Suma todos los elementos de la matriz y divide el resultado entre 2.",
      testCases: [
        { id: "t1", description: "Grafo triángulo K3 (3 aristas)", input: "[[0,1,1],[1,0,1],[1,1,0]], 3", expectedOutput: "3" }
      ],
      explanation: "Aplica el Teorema del Apretón de Manos $\\sum \\text{deg}(v) = 2|E|$."
    },
    {
      id: "ex-13-5",
      title: "Ejercicio 13.5: Verificador de Arista Existente",
      description: "Escribe `bool existeArista(int matriz[10][10], int u, int v)` que retorne `matriz[u][v] == 1`.",
      cormenRef: "Cormen Cap 22.1 - Búsqueda de Arista en O(1)",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool existeArista(int matriz[10][10], int u, int v) {\n  // TODO: Retorna matriz[u][v] == 1\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool existeArista(int matriz[10][10], int u, int v) {\n  return matriz[u][v] == 1;\n}",
      hint: "Retorna `matriz[u][v] == 1`.",
      testCases: [
        { id: "t1", description: "Arista u=0, v=1 en K3", input: "[[0,1,1],[1,0,1],[1,1,0]], 0, 1", expectedOutput: "true" }
      ],
      explanation: "Las matrices de adyacencia permiten verificar la presencia de una arista en $O(1)$."
    }
  ],

  'clase-14': [
    {
      id: "ex-14-1",
      title: "Ejercicio 14.1: Relajación de Aristas de Dijkstra en C",
      description: "Implementa `bool relajarArista(int u, int v, int peso, int dist[])` que actualice `dist[v]` si pasar por `u` ofrece una distancia menor.",
      cormenRef: "Cormen Cap 24.3 - Algoritmo de Dijkstra",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool relajarArista(int u, int v, int peso, int dist[]) {\n  // TODO: Si dist[u] + peso < dist[v], actualiza y retorna true\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool relajarArista(int u, int v, int peso, int dist[]) {\n  if (dist[u] + peso < dist[v]) {\n    dist[v] = dist[u] + peso;\n    return true;\n  }\n  return false;\n}",
      hint: "Comprueba si `dist[u] + peso < dist[v]`. Si es así, asigna `dist[v] = dist[u] + peso`.",
      testCases: [
        { id: "t1", description: "u=0, v=1, peso=5, dist=[0, 100]", input: "0, 1, 5, [0, 100]", expectedOutput: "true" }
      ],
      explanation: "La relajación de aristas prueba si se puede mejorar la distancia más corta hacia $v$ a través de $u$."
    },
    {
      id: "ex-14-2",
      title: "Ejercicio 14.2: Selección de Nodo Mínimo No Visitado",
      description: "Escribe `int nodoMinimaDistancia(int dist[], bool visitados[], int n)` que busque el nodo con menor `dist[u]` no visitado.",
      cormenRef: "Cormen Cap 24.3 - Selección Voraz",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint nodoMinimaDistancia(int dist[], bool visitados[], int n) {\n  int minVal = 999999;\n  int minIdx = -1;\n  // TODO: Bucle u de 0 a n-1 buscando min dist[u] con !visitados[u]\n  return minIdx;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint nodoMinimaDistancia(int dist[], bool visitados[], int n) {\n  int minVal = 999999;\n  int minIdx = -1;\n  for (int u = 0; u < n; u++) {\n    if (!visitados[u] && dist[u] < minVal) {\n      minVal = dist[u];\n      minIdx = u;\n    }\n  }\n  return minIdx;\n}",
      hint: "Itera sobre los nodos buscando el de menor `dist[u]` que tenga `visitados[u] == false`.",
      testCases: [
        { id: "t1", description: "dist=[0, 10, 5], visitados=[true, false, false]", input: "[0, 10, 5], [true, false, false], 3", expectedOutput: "2" }
      ],
      explanation: "El paso voraz de Dijkstra selecciona el nodo más cercano fuera del conjunto procesado."
    },
    {
      id: "ex-14-3",
      title: "Ejercicio 14.3: Inicialización de Vector de Distancias Infinitas",
      description: "Escribe `void inicializarDistancias(int dist[], int n, int origen)` que coloque `999999` (infinito) en todas las posiciones excepto `dist[origen] = 0`.",
      cormenRef: "Cormen Cap 24.1 - Initialize-Single-Source",
      initialCode: "#include <stdio.h>\n\nvoid inicializarDistancias(int dist[], int n, int origen) {\n  // TODO: dist[i] = 999999, dist[origen] = 0\n}",
      solutionCode: "#include <stdio.h>\n\nvoid inicializarDistancias(int dist[], int n, int origen) {\n  for (int i = 0; i < n; i++) {\n    dist[i] = 999999;\n  }\n  if (origen >= 0 && origen < n) {\n    dist[origen] = 0;\n  }\n}",
      hint: "Llena el arreglo con `999999` y fija `dist[origen] = 0`.",
      testCases: [
        { id: "t1", description: "Origen 0, n=3", input: "[0,0,0], 3, 0", expectedOutput: "undefined" }
      ],
      explanation: "Prepara las cotas superiores iniciales antes de ejecutar algoritmos de caminos más cortos."
    },
    {
      id: "ex-14-4",
      title: "Ejercicio 14.4: Peso Total de Árbol de Expansión Mínima (MST)",
      description: "Escribe `int calcularPesoMST(int pesosAristas[], int numAristas)` que retorne la suma de los pesos de las aristas del MST.",
      cormenRef: "Cormen Cap 23 - Minimum Spanning Tree",
      initialCode: "#include <stdio.h>\n\nint calcularPesoMST(int pesosAristas[], int numAristas) {\n  int suma = 0;\n  // TODO: Acumula los pesos de las aristas seleccionadas\n  return suma;\n}",
      solutionCode: "#include <stdio.h>\n\nint calcularPesoMST(int pesosAristas[], int numAristas) {\n  int suma = 0;\n  for (int i = 0; i < numAristas; i++) {\n    suma += pesosAristas[i];\n  }\n  return suma;\n}",
      hint: "Acumula todos los pesos de `pesosAristas`.",
      testCases: [
        { id: "t1", description: "Pesos [1, 3, 2], n=3", input: "[1, 3, 2], 3", expectedOutput: "6" }
      ],
      explanation: "Un MST conecta todos los vértices maximizando la eficiencia de conectividad."
    },
    {
      id: "ex-14-5",
      title: "Ejercicio 14.5: Verificador de Pesos No Negativos para Dijkstra",
      description: "Implementa `bool sonPesosValidosDijkstra(int pesos[], int n)` que retorne `true` si todos los pesos cumplen $w \\ge 0$.",
      cormenRef: "Cormen Cap 24.3 - Restricción de Pesos",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool sonPesosValidosDijkstra(int pesos[], int n) {\n  // TODO: Si algún peso < 0 retorna false\n  return true;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool sonPesosValidosDijkstra(int pesos[], int n) {\n  for (int i = 0; i < n; i++) {\n    if (pesos[i] < 0) return false;\n  }\n  return true;\n}",
      hint: "Retorna `false` si encuentras algún peso negativo `pesos[i] < 0`.",
      testCases: [
        { id: "t1", description: "Pesos [5, 2, 0]", input: "[5, 2, 0], 3", expectedOutput: "true" },
        { id: "t2", description: "Pesos [5, -1, 3]", input: "[5, -1, 3], 3", expectedOutput: "false" }
      ],
      explanation: "Dijkstra requiere estrictamente pesos no negativos para garantizar la corrección voraz."
    }
  ],

  'taller-3': [
    {
      id: "ex-t3-1",
      title: "Ejercicio Taller 3.1: Detección de Componentes Conexas (Disjoint Set)",
      description: "Implementa `bool conectaMismaComponente(int padres[], int u, int v)` usando la búsqueda de la raíz en un Disjoint Set.",
      cormenRef: "Taller 3 - Disjoint-Set Data Structures",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  // TODO: Retorna find(padres, u) == find(padres, v)\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  return find(padres, u) == find(padres, v);\n}",
      hint: "Retorna `find(padres, u) == find(padres, v)`.",
      testCases: [
        { id: "t1", description: "Padres [0, 0, 2], u=0, v=1", input: "[0, 0, 2], 0, 1", expectedOutput: "true" }
      ],
      explanation: "Si dos nodos comparten la misma raíz en el árbol de componentes disjuntas, están conectados."
    },
    {
      id: "ex-t3-2",
      title: "Ejercicio Taller 3.2: Unión de Conjuntos Disjuntos (Union-Find)",
      description: "Escribe `void unirConjuntos(int padres[], int u, int v)` que actualice `padres[raizU] = raizV` para unir dos componentes.",
      cormenRef: "Taller 3 - Unión en Disjoint Set",
      initialCode: "#include <stdio.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nvoid unirConjuntos(int padres[], int u, int v) {\n  // TODO: Encuentra raizU y raizV y asigna padres[raizU] = raizV\n}",
      solutionCode: "#include <stdio.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nvoid unirConjuntos(int padres[], int u, int v) {\n  int raizU = find(padres, u);\n  int raizV = find(padres, v);\n  if (raizU != raizV) {\n    padres[raizU] = raizV;\n  }\n}",
      hint: "Encuentra las raíces representantes de `u` y `v` y haz a una madre de la otra.",
      testCases: [
        { id: "t1", description: "Unir u=0, v=2 en padres=[0,1,2]", input: "[0, 1, 2], 0, 2", expectedOutput: "undefined" }
      ],
      explanation: "Fusiona dos conjuntos disjuntos en tiempo casi constante $O(\\alpha(n))$."
    },
    {
      id: "ex-t3-3",
      title: "Ejercicio Taller 3.3: Conteo de Vértices Aislados (Grado 0)",
      description: "Escribe `int contarVerticeAislados(int matriz[10][10], int n)` que cuente cuántos vértices no tienen ninguna arista.",
      cormenRef: "Taller 3 - Análisis de Conectividad",
      initialCode: "#include <stdio.h>\n\nint contarVerticeAislados(int matriz[10][10], int n) {\n  int aislados = 0;\n  // TODO: Revisa si la fila de u sólo tiene 0s\n  return aislados;\n}",
      solutionCode: "#include <stdio.h>\n\nint contarVerticeAislados(int matriz[10][10], int n) {\n  int aislados = 0;\n  for (int u = 0; u < n; u++) {\n    bool tieneArista = false;\n    for (int v = 0; v < n; v++) {\n      if (matriz[u][v] == 1) {\n        tieneArista = true;\n        break;\n      }\n    }\n    if (!tieneArista) aislados++;\n  }\n  return aislados;\n}",
      hint: "Si la fila `u` no contiene ningún `1`, el vértice `u` está completamente aislado.",
      testCases: [
        { id: "t1", description: "Nodo 2 aislado en 3x3", input: "[[0,1,0],[1,0,0],[0,0,0]], 3", expectedOutput: "1" }
      ],
      explanation: "Un nodo aislado posee grado 0 y constituye su propia componente conexa independiente."
    },
    {
      id: "ex-t3-4",
      title: "Ejercicio Taller 3.4: Búsqueda de Arista Mínima (Kruskal Step)",
      description: "Escribe `int encontrarAristaMinima(int pesos[], bool usada[], int m)` que devuelva el índice de la arista más barata no usada.",
      cormenRef: "Taller 3 - Algoritmo Voraz Kruskal",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint encontrarAristaMinima(int pesos[], bool usada[], int m) {\n  int minVal = 999999;\n  int minIdx = -1;\n  // TODO: Bucle i de 0 a m-1 seleccionando min peso con !usada[i]\n  return minIdx;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint encontrarAristaMinima(int pesos[], bool usada[], int m) {\n  int minVal = 999999;\n  int minIdx = -1;\n  for (int i = 0; i < m; i++) {\n    if (!usada[i] && pesos[i] < minVal) {\n      minVal = pesos[i];\n      minIdx = i;\n    }\n  }\n  return minIdx;\n}",
      hint: "Busca la arista no usada con menor peso `pesos[i]`.",
      testCases: [
        { id: "t1", description: "Pesos [10, 2, 5], usada=[false, false, false]", input: "[10, 2, 5], [false, false, false], 3", expectedOutput: "1" }
      ],
      explanation: "El paso voraz de Kruskal considera las aristas ordenadas estrictamente de menor a mayor peso."
    },
    {
      id: "ex-t3-5",
      title: "Ejercicio Taller 3.5: Verificación de Grafo Bipartito Trivial",
      description: "Implementa `bool esBipartitoTrivial(int n)` que retorne `true` si $n \\ge 2$.",
      cormenRef: "Taller 3 - Propiedades de Grafos",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esBipartitoTrivial(int n) {\n  // TODO: Retorna n >= 2\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esBipartitoTrivial(int n) {\n  return n >= 2;\n}",
      hint: "Retorna `n >= 2`.",
      testCases: [
        { id: "t1", description: "n = 4", input: "4", expectedOutput: "true" }
      ],
      explanation: "Un grafo requiere al menos 2 vértices para poder dividirse en dos conjuntos disjuntos."
    }
  ],

  'clase-15': [
    {
      id: "ex-15-1",
      title: "Ejercicio 15.1: Fibonacci con Programación Dinámica (Bottom-Up) en C",
      description: "Implementa `long long fibonacciDP(int n)` usando un arreglo de memoria (Tabulación DP) para calcular Fibonacci en $O(n)$.",
      cormenRef: "Cormen Cap 15.1 - Programación Dinámica",
      initialCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  // TODO: Llena dp[0]=0, dp[1]=1 y dp[i] = dp[i-1] + dp[i-2]\n  return 0;\n}",
      solutionCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}",
      hint: "Calcula de forma ascendente `dp[i] = dp[i - 1] + dp[i - 2]`.",
      testCases: [
        { id: "t1", description: "Fibonacci n=10", input: "10", expectedOutput: "55" },
        { id: "t2", description: "Fibonacci n=1", input: "1", expectedOutput: "1" }
      ],
      explanation: "Evita recalcular subproblemas repetidos memorizando los resultados en $O(n)$ tiempo."
    },
    {
      id: "ex-15-2",
      title: "Ejercicio 15.2: Corte de Varilla (Rod Cutting DP) en C",
      description: "Implementa `int corteVarilla(int precios[], int n)` que calcule la ganancia máxima para una varilla de longitud `n` mediante Tabulación DP.",
      cormenRef: "Cormen Cap 15.1 - Rod Cutting",
      initialCode: "#include <stdio.h>\n\nint maxVal(int a, int b) { return (a > b) ? a : b; }\n\nint corteVarilla(int precios[], int n) {\n  int r[100] = {0};\n  // TODO: Dos bucles anidados j de 1 a n y i de 1 a j actualizando r[j]\n  return r[n];\n}",
      solutionCode: "#include <stdio.h>\n\nint maxVal(int a, int b) { return (a > b) ? a : b; }\n\nint corteVarilla(int precios[], int n) {\n  int r[100] = {0};\n  for (int j = 1; j <= n; j++) {\n    int maxP = -1;\n    for (int i = 1; i <= j; i++) {\n      maxP = maxVal(maxP, precios[i - 1] + r[j - i]);\n    }\n    r[j] = maxP;\n  }\n  return r[n];\n}",
      hint: "Para cada tamaño `j`, calcula `maxP = max(maxP, precios[i-1] + r[j-i])`.",
      testCases: [
        { id: "t1", description: "Precios [1, 5, 8, 9], n=4", input: "[1, 5, 8, 9], 4", expectedOutput: "10" }
      ],
      explanation: "Resuelve el problema clásico de Programación Dinámica del Cormen en $O(n^2)$."
    },
    {
      id: "ex-15-3",
      title: "Ejercicio 15.3: Cambio de Monedas Voraz (Greedy Coin Change)",
      description: "Escribe `int cambioMonedasGreedy(int monedas[], int numMonedas, int monto)` que retorne el número mínimo de monedas entregando las más grandes primero.",
      cormenRef: "Cormen Cap 16.1 - Algoritmos Voraces",
      initialCode: "#include <stdio.h>\n\nint cambioMonedasGreedy(int monedas[], int numMonedas, int monto) {\n  int cont = 0;\n  // TODO: Recorre monedas ordenadas de mayor a menor restando al monto\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n\nint cambioMonedasGreedy(int monedas[], int numMonedas, int monto) {\n  int cont = 0;\n  for (int i = 0; i < numMonedas; i++) {\n    while (monto >= monedas[i]) {\n      monto -= monedas[i];\n      cont++;\n    }\n  }\n  return cont;\n}",
      hint: "Usa un bucle `while (monto >= monedas[i])` restando las denominaciones más grandes.",
      testCases: [
        { id: "t1", description: "Monedas [25, 10, 5, 1], monto=30", input: "[25, 10, 5, 1], 4, 30", expectedOutput: "2" }
      ],
      explanation: "Toma decisiones voraces óptimas locales seleccionando siempre la denominación mayor."
    },
    {
      id: "ex-15-4",
      title: "Ejercicio 15.4: Elección Voraz de Actividades (Activity Selection)",
      description: "Implementa `int seleccionarActividades(int inicio[], int fin[], int n)` eligiendo actividades compatibles ordenadas por tiempo de finalización.",
      cormenRef: "Cormen Cap 16.1 - Activity Selection Problem",
      initialCode: "#include <stdio.h>\n\nint seleccionarActividades(int inicio[], int fin[], int n) {\n  if (n <= 0) return 0;\n  int cont = 1;\n  int ultimoFin = fin[0];\n  // TODO: Bucle i de 1 a n-1, si inicio[i] >= ultimoFin -> cont++, ultimoFin = fin[i]\n  return cont;\n}",
      solutionCode: "#include <stdio.h>\n\nint seleccionarActividades(int inicio[], int fin[], int n) {\n  if (n <= 0) return 0;\n  int cont = 1;\n  int ultimoFin = fin[0];\n  for (int i = 1; i < n; i++) {\n    if (inicio[i] >= ultimoFin) {\n      cont++;\n      ultimoFin = fin[i];\n    }\n  }\n  return cont;\n}",
      hint: "Selecciona la siguiente actividad si su `inicio[i]` es mayor o igual al `ultimoFin`.",
      testCases: [
        { id: "t1", description: "Inicio [1, 3, 0, 5, 8, 5], Fin [2, 4, 6, 7, 9, 9], n=6", input: "[1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9], 6", expectedOutput: "4" }
      ],
      explanation: "El enfoque voraz resuelve el problema de selección de actividades en $O(n)$ si están ordenadas por tiempo de fin."
    },
    {
      id: "ex-15-5",
      title: "Ejercicio 15.5: Verificación de Subestructura Óptima",
      description: "Escribe `bool tieneSubestructuraOptima(int n)` que retorne `true` si $n > 0$.",
      cormenRef: "Cormen Cap 15.3 - Propiedades de DP",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool tieneSubestructuraOptima(int n) {\n  // TODO: Retorna n > 0\n  return false;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool tieneSubestructuraOptima(int n) {\n  return n > 0;\n}",
      hint: "Retorna `n > 0`.",
      testCases: [
        { id: "t1", description: "n = 5", input: "5", expectedOutput: "true" }
      ],
      explanation: "Un problema tiene subestructura óptima si una solución óptima contiene dentro de sí soluciones óptimas a sus subproblemas."
    }
  ],

  'clase-16': [
    {
      id: "ex-16-1",
      title: "Ejercicio 16.1: Secuencia Ordenada en C",
      description: "Escribe `bool esSecuenciaOrdenada(int arr[], int n)` que verifique en tiempo lineal $O(n)$ si un arreglo está ordenado de forma no decreciente.",
      cormenRef: "Cormen Cap 2 - Ejercicio Integrador de Cierre",
      initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esSecuenciaOrdenada(int arr[], int n) {\n  // TODO: Recorre de 0 a n-2. Si arr[i] > arr[i+1] retorna false\n  return true;\n}",
      solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nbool esSecuenciaOrdenada(int arr[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    if (arr[i] > arr[i + 1]) return false;\n  }\n  return true;\n}",
      hint: "Usa un bucle `for (int i = 0; i < n - 1; i++)` y compara si `arr[i] > arr[i + 1]`.",
      testCases: [
        { id: "t1", description: "Secuencia ordenada [1, 2, 3, 4, 5]", input: "[1, 2, 3, 4, 5], 5", expectedOutput: "true" },
        { id: "t2", description: "Secuencia desordenada [1, 3, 2, 5]", input: "[1, 3, 2, 5], 4", expectedOutput: "false" }
      ],
      explanation: "Revisa pares adyacentes en una sola pasada $O(n)$."
    },
    {
      id: "ex-16-2",
      title: "Ejercicio 16.2: Suma Acumulativa de Arreglo (Prefix Sum)",
      description: "Implementa `void sumaAcumulativa(int arr[], int prefijo[], int n)` que llene `prefijo[i]` con la suma de los elementos desde `0` hasta `i`.",
      cormenRef: "Cormen Cap 15 - Tabulación de Prefijos",
      initialCode: "#include <stdio.h>\n\nvoid sumaAcumulativa(int arr[], int prefijo[], int n) {\n  // TODO: prefijo[0] = arr[0], prefijo[i] = prefijo[i-1] + arr[i]\n}",
      solutionCode: "#include <stdio.h>\n\nvoid sumaAcumulativa(int arr[], int prefijo[], int n) {\n  if (n <= 0) return;\n  prefijo[0] = arr[0];\n  for (int i = 1; i < n; i++) {\n    prefijo[i] = prefijo[i - 1] + arr[i];\n  }\n}",
      hint: "Usa la relación `prefijo[i] = prefijo[i - 1] + arr[i]`.",
      testCases: [
        { id: "t1", description: "Arreglo [1, 2, 3, 4]", input: "[1, 2, 3, 4], [0, 0, 0, 0], 4", expectedOutput: "undefined" }
      ],
      explanation: "Permite responder consultas de suma en rangos $[i..j]$ en tiempo constante $O(1)$."
    },
    {
      id: "ex-16-3",
      title: "Ejercicio 16.3: Inversión de Cadena de Caracteres en C",
      description: "Escribe `void invertirCadena(char str[], int len)` que invierta los caracteres de un arreglo de caracteres in-place.",
      cormenRef: "Cormen Apéndice B - Manejo de Cadenas en C",
      initialCode: "#include <stdio.h>\n\nvoid invertirCadena(char str[], int len) {\n  int i = 0, j = len - 1;\n  // TODO: Intercambia str[i] y str[j] avanzando i y decreciendo j\n}",
      solutionCode: "#include <stdio.h>\n\nvoid invertirCadena(char str[], int len) {\n  int i = 0, j = len - 1;\n  while (i < j) {\n    char temp = str[i];\n    str[i] = str[j];\n    str[j] = temp;\n    i++;\n    j--;\n  }\n}",
      hint: "Intercambia `str[i]` y `str[j]` con una variable `char temp`.",
      testCases: [
        { id: "t1", description: "Invertir \"ALGORITMO\"", input: "[\"A\",\"L\",\"G\",\"O\",\"R\",\"I\",\"T\",\"M\",\"O\"], 9", expectedOutput: "undefined" }
      ],
      explanation: "Manipula punteros y direcciones de caracteres contiguos en memoria."
    },
    {
      id: "ex-16-4",
      title: "Ejercicio 16.4: Eliminación de Duplicados en Arreglo Ordenado",
      description: "Implementa `int eliminarDuplicados(int arr[], int n)` que elimine duplicados in-place sobre un arreglo ordenado y retorne la nueva longitud sin repetidos.",
      cormenRef: "Cormen Cap 2 - Manipulación In-Place",
      initialCode: "#include <stdio.h>\n\nint eliminarDuplicados(int arr[], int n) {\n  if (n <= 1) return n;\n  int idx = 0;\n  // TODO: Bucle i de 1 a n-1, si arr[i] != arr[idx] -> idx++, arr[idx] = arr[i]\n  return idx + 1;\n}",
      solutionCode: "#include <stdio.h>\n\nint eliminarDuplicados(int arr[], int n) {\n  if (n <= 1) return n;\n  int idx = 0;\n  for (int i = 1; i < n; i++) {\n    if (arr[i] != arr[idx]) {\n      idx++;\n      arr[idx] = arr[i];\n    }\n  }\n  return idx + 1;\n}",
      hint: "Si `arr[i] != arr[idx]`, incrementa `idx++` y copia `arr[idx] = arr[i]`.",
      testCases: [
        { id: "t1", description: "Eliminar duplicados en [1, 1, 2, 2, 3, 4, 4]", input: "[1, 1, 2, 2, 3, 4, 4], 7", expectedOutput: "4" }
      ],
      explanation: "Utiliza dos punteros en la misma dirección para compactar elementos únicos en $O(n)$."
    },
    {
      id: "ex-16-5",
      title: "Ejercicio 16.5: Mediana de un Arreglo Ordenado de Enteros",
      description: "Escribe `double calcularMedianaOrdenada(int arr[], int n)` que calcule la mediana exacta en $O(1)$ sobre un arreglo ordenado.",
      cormenRef: "Cormen Cap 9 - Estadísticos de Orden",
      initialCode: "#include <stdio.h>\n\ndouble calcularMedianaOrdenada(int arr[], int n) {\n  if (n <= 0) return 0.0;\n  // TODO: Si n es impar retorna arr[n/2], si es par promedio de arr[n/2 - 1] y arr[n/2]\n  return 0.0;\n}",
      solutionCode: "#include <stdio.h>\n\ndouble calcularMedianaOrdenada(int arr[], int n) {\n  if (n <= 0) return 0.0;\n  if (n % 2 != 0) {\n    return (double)arr[n / 2];\n  } else {\n    return (arr[n / 2 - 1] + arr[n / 2]) / 2.0;\n  }\n}",
      hint: "Si `n` es impar retorna `arr[n/2]`, si es par promedia los dos centrales.",
      testCases: [
        { id: "t1", description: "Mediana de [1, 3, 5, 7, 9] (impar)", input: "[1, 3, 5, 7, 9], 5", expectedOutput: "5" },
        { id: "t2", description: "Mediana de [10, 20, 30, 40] (par)", input: "[10, 20, 30, 40], 4", expectedOutput: "25" }
      ],
      explanation: "Calcula el percentil 50 de una distribución ordenada en acceso directo $O(1)$."
    }
  ]
};

