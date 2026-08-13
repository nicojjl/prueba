export interface CertamenQuestion {
  id: string;
  number: string;
  points: number;
  title: string;
  description: string;
  codeSnippet?: string;
  solutionExplanation?: string;
  solutionCode?: string;
  tags: string[];
}

export interface CertamenItem {
  id: string;
  title: string;
  course: string;
  university: string;
  semester: string;
  date: string;
  professor: string;
  duration?: string;
  difficulty: 'Media' | 'Alta' | 'Avanzada';
  summary: string;
  topics: string[];
  questions: CertamenQuestion[];
}

export const CERTAMENES_DATA: CertamenItem[] = [
  {
    id: 'c1-2024-2',
    title: 'Certamen 1 - 2024 Semestre 2',
    course: 'Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2024-2',
    date: '22 de Octubre de 2024',
    professor: 'Prof. Álvaro Cofré',
    duration: '90 minutos',
    difficulty: 'Alta',
    summary: 'Evaluación de Pilas (LIFO), generación de palabras palíndromas, Tablas Hash con detección de fugas de memoria y Árboles Ternarios recursivos.',
    topics: ['Pilas (Stack)', 'Tablas Hash', 'Fugas de Memoria (malloc/free)', 'Árboles Ternarios'],
    questions: [
      {
        id: 'c1-2024-2-p1',
        number: 'Pregunta 1',
        points: 30,
        title: 'Generación de Palabras Palíndromas usando Pilas (Stack)',
        description: 'Dada una cadena de texto original (ej: "hola"), programe en C la función `generarPilaPalindroma()` que cree una palabra palíndroma (ej: "holaaloh") utilizando estructuras de tipo Pila (LIFO).\n\n(i) Explique brevemente su estrategia a seguir.\n(ii) Implemente todas las funciones complementarias (`push`, `pop_return`, `llenarPilaOriginal`, etc.).',
        codeSnippet: `typedef struct nodo_pila {
    char caracter;
    struct nodo_pila *stge;
} pila_t;

void llenarPilaOriginal(char *word, pila_t **pilaOriginal);
void generarPilaPalindroma(pila_t *pilaOriginal, pila_t **pilaPalindroma);
void push(pila_t **pila, char caracter);
char pop_return(pila_t **pila);`,
        solutionExplanation: `Estrategia 2 (Solo con push y estructuras auxiliares):
1. Llenar la pila original en orden con los caracteres de la palabra entrada ("hola").
2. Recorrer la pila original y hacer push en una pila invertida temporal 'pilaInvertida' (esto invierte el orden a 'aloh').
3. Vaciar 'pilaInvertida' e ir haciendo push en 'pilaPalindroma' (restaura el orden original "hola").
4. Volver a recorrer la 'pilaOriginal' e ir haciendo push directamente en 'pilaPalindroma' (concatena la versión invertida "aloh").
5. Resultado final en 'pilaPalindroma': "holaaloh".`,
        solutionCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct nodo_pila {
    char caracter;
    struct nodo_pila *stge;
} pila_t;

void push(pila_t **pila, char caracter) {
    pila_t *nuevo = malloc(sizeof(pila_t));
    nuevo->caracter = caracter;
    nuevo->stge = *pila;
    *pila = nuevo;
}

char pop_return(pila_t **pila) {
    pila_t *objetivo = *pila;
    char letra = objetivo->caracter;
    *pila = objetivo->stge;
    free(objetivo);
    return letra;
}

void generarPilaPalindroma(pila_t *pilaOriginal, pila_t **pilaPalindroma) {
    pila_t *pilaTemporal = pilaOriginal;
    pila_t *pilaInvertida = NULL;

    while (pilaTemporal != NULL) {
        push(&pilaInvertida, pilaTemporal->caracter);
        pilaTemporal = pilaTemporal->stge;
    }

    while (pilaInvertida != NULL) {
        push(pilaPalindroma, pilaInvertida->caracter);
        pilaInvertida = pilaInvertida->stge;
    }

    pilaTemporal = pilaOriginal;
    while (pilaTemporal != NULL) {
        push(pilaPalindroma, pilaTemporal->caracter);
        pilaTemporal = pilaTemporal->stge;
    }
}

void llenarPilaOriginal(char *word, pila_t **pilaOriginal) {
    for (int i = 0; word[i] != '\\0'; i++) {
        push(pilaOriginal, word[i]);
    }
}`,
        tags: ['Pilas', 'C99', 'Punteros Dobles', 'LIFO']
      },
      {
        id: 'c1-2024-2-p2',
        number: 'Pregunta 2',
        points: 40,
        title: 'Análisis e Identificación de Fugas de Memoria en Tabla Hash',
        description: 'Dada una implementación de Tabla Hash con hashing abierto (encadenamiento en listas para pares clave-valor `char*` e `int`), identifique los problemas de manejo de memoria presentes y repárelos en C99.',
        codeSnippet: `typedef struct nodo {
    char *key;
    int value;
    struct nodo *sgte;
} nodo_t;

typedef struct tabla_hash {
    nodo_t **entries;
} t_hash_t;

// Fragmento con errores:
void insert(t_hash_t *tabla, char *key, int value) {
    // ...
    entry = malloc(sizeof(nodo_t));
    entry->key = key; // <-- ERROR: Asignación directa de puntero local
    entry->value = value;
    // ...
}`,
        solutionExplanation: `Errores de Memoria Identificados & Soluciones:
1. Reserva de Cadenas (Líneas 52 y 62): Se asigna directamente 'entry->key = key;', compartiendo memoria con un arreglo estático o destruido al salir del scope.
   - Solución: 'entry->key = malloc((strlen(key) + 1) * sizeof(char)); strcpy(entry->key, key);' o utilizar 'entry->key = strdup(key);'.
2. Liberación Incompleta en limpiar_tabla_hash() (Línea 39): Se elimina el nodo 'temp' pero NO se libera la clave dinamica 'temp->key', provocando Memory Leak.
   - Solución: Ejecutar 'free(temp->key);' antes de 'free(temp);'.
3. Uso de función inviable (Líneas 42-43): Se invoca 'remove()' en lugar de la función estándar 'free()'.
   - Solución: Reemplazar 'remove(table->entries); remove(table);' por 'free(table->entries); free(table);'.`,
        solutionCode: `void limpiar_tabla_hash(t_hash_t *table) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        nodo_t *entry = table->entries[i];
        while (entry != NULL) {
            nodo_t *temp = entry;
            entry = entry->sgte;
            free(temp->key); // Libera memoria reservada para el string de la clave
            free(temp);      // Libera la estructura del nodo
        }
    }
    free(table->entries);
    free(table);
}

void insert(t_hash_t *tabla, char *key, int value) {
    unsigned int index = funcion_hash(key);
    nodo_t *entry = tabla->entries[index];

    if (entry == NULL) {
        entry = malloc(sizeof(nodo_t));
        entry->key = strdup(key); // Asigna memoria propia para la clave
        entry->value = value;
        entry->sgte = NULL;
        tabla->entries[index] = entry;
    } else {
        while (entry->sgte != NULL) {
            entry = entry->sgte;
        }
        entry->sgte = malloc(sizeof(nodo_t));
        entry->sgte->key = strdup(key);
        entry->sgte->value = value;
        entry->sgte->sgte = NULL;
    }
}`,
        tags: ['Tabla Hash', 'Memory Leak', 'strdup', 'free']
      },
      {
        id: 'c1-2024-2-p3',
        number: 'Pregunta 3',
        points: 30,
        title: 'Árbol Ternario Recursivo: Altura y Conteo de Hojas',
        description: 'Dado un árbol ternario compuesto por nodos con tres hijos (`izq`, `cen`, `der`), programe de forma puramente recursiva las funciones:\n(i) `int calcularAltura(tree *nodo)`\n(ii) `int contarHojas(tree *nodo)`',
        codeSnippet: `typedef struct terminario {
    int valor;
    struct terminario *izq, *cen, *der;
} tree;`,
        solutionExplanation: `Enfoque Recursivo:
- Altura del Árbol: Caso base: Si el nodo es NULL, retorna 0. En otro caso, calcula de manera recursiva la altura de los tres subárboles (izq, cen, der), obtiene la altura máxima entre los tres y suma +1 por el nodo raíz actual.
- Conteo de Nodos Hoja: Caso base 1: Si es NULL, retorna 0. Caso base 2: Si un nodo NO tiene hijo izquierdo, ni central, ni derecho ('nodo->izq == NULL && nodo->cen == NULL && nodo->der == NULL'), es una hoja y retorna 1. En caso contrario, retorna la suma de hojas de los 3 subárboles.`,
        solutionCode: `int calcularAltura(tree *nodo) {
    if (nodo == NULL) return 0;

    int alturaIzq = calcularAltura(nodo->izq);
    int alturaCen = calcularAltura(nodo->cen);
    int alturaDer = calcularAltura(nodo->der);

    int alturaMaxima = alturaIzq;
    if (alturaCen > alturaMaxima) alturaMaxima = alturaCen;
    if (alturaDer > alturaMaxima) alturaMaxima = alturaDer;

    return alturaMaxima + 1;
}

int contarHojas(tree *nodo) {
    if (nodo == NULL) return 0;

    if (nodo->izq == NULL && nodo->cen == NULL && nodo->der == NULL) {
        return 1; // Nodo hoja detectado
    }

    int hojasIzq = contarHojas(nodo->izq);
    int hojasCen = contarHojas(nodo->cen);
    int hojasDer = contarHojas(nodo->der);

    return hojasIzq + hojasCen + hojasDer;
}`,
        tags: ['Árboles Ternarios', 'Recursión', 'Estructuras No Lineales']
      }
    ]
  },
  {
    id: 'c1-2023-1',
    title: 'Certamen 1 - 2023 Semestre 1',
    course: 'ELO320 - Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2023-1',
    date: '18 de Mayo de 2023',
    professor: 'Prof. Nicolás Gálvez Ramírez',
    duration: '60 minutos',
    difficulty: 'Avanzada',
    summary: 'Implementación de Colas (Enqueue/Dequeue con punteros dobles), depuración de error de memoria en listas con sscanf y eliminación de nodos en Árboles Binarios de Búsqueda.',
    topics: ['Colas (Queue)', 'Listas Enlazadas', 'Buffer Overwrite / Stack Memory', 'Árboles ABB'],
    questions: [
      {
        id: 'c1-2023-1-p1',
        number: 'Pregunta (a)',
        points: 30,
        title: 'Filas / Colas Enlazadas con Doble Puntero (Begin y End)',
        description: 'Programe en C las funciones `enqueue(nodo_t **begin, int datos)` y `dequeue(nodo_t **end, int datos)` para dos implementaciones de colas propuestas. Analice cuál posee ventaja en complejidad computacional.',
        solutionExplanation: `Ventajas y Análisis:
- La implementación que mantiene referencias dobles explicitas al primer nodo ('begin') y al último nodo ('end') permite que tanto la operación de encolar (enqueue) como la de desencolar (dequeue) se ejecuten en tiempo constante O(1).
- Si solo mantuviéramos una referencia simple, requeriríamos recorrer toda la lista en O(n) para insertar al final, lo cual degrada significativamente el rendimiento en colas de gran tamaño.`,
        solutionCode: `typedef struct node {
    int datos;
    struct node *sgte;
} nodo_t;

void enqueue(nodo_t **begin, nodo_t **end, int datos) {
    nodo_t *nuevo = malloc(sizeof(nodo_t));
    nuevo->datos = datos;
    nuevo->sgte = NULL;

    if (*end == NULL) {
        *begin = nuevo;
        *end = nuevo;
    } else {
        (*end)->sgte = nuevo;
        *end = nuevo;
    }
}

int dequeue(nodo_t **begin, nodo_t **end) {
    if (*begin == NULL) return -1; // Cola vacía

    nodo_t *temp = *begin;
    int valor = temp->datos;
    *begin = (*begin)->sgte;

    if (*begin == NULL) {
        *end = NULL;
    }

    free(temp);
    return valor;
}`,
        tags: ['Colas', 'Enqueue', 'Dequeue', 'O(1)']
      },
      {
        id: 'c1-2023-1-p2',
        number: 'Pregunta (b)',
        points: 40,
        title: 'Análisis de Bug de Memoria en Lista Enlazada `say_my_name`',
        description: 'Se presenta un programa que lee nombres desde una cadena fija usando `sscanf()` e inserta nodos en una lista enlazada. Sin embargo, al imprimir la lista el output muestra elementos duplicados inesperados: "Diego -> Diego -> Diego -> ||".\n\nIdentifique, explique a nivel de memoria y repare el programa.',
        codeSnippet: `void add(nodo_t **cabeza, char *nombre) {
    nodo_t *nuevo = malloc(sizeof(nodo_t));
    nuevo->nombre = nombre; // <-- ERROR: Apunta al buffer local reutilizado 'nom'
    nuevo->sgte = *cabeza;
    *cabeza = nuevo;
}`,
        solutionExplanation: `Explicación del Error de Memoria:
El arreglo local 'char nom[6]' en 'main()' reside en el Stack frame. La función 'add()' asigna el puntero 'nuevo->nombre = nombre;' directamente. Como 'nombre' apunta siempre a la misma variable local 'nom', todos los nodos agregados terminan apuntando exactamente a la misma dirección de memoria. Cada llamada a 'sscanf()' sobrescribe el contenido de 'nom', por lo que todos los nodos terminan reflejando el último nombre leído ("Diego").

Solución:
Asignar memoria dinámica propia en el Heap para el nombre de cada nodo usando 'strdup(nombre)' o 'malloc(strlen(nombre) + 1)' en 'add()', y liberar dicha memoria con 'free(nodo->nombre)' en 'free_list()'.`,
        solutionCode: `void add(nodo_t **cabeza, char *nombre) {
    nodo_t *nuevo = malloc(sizeof(nodo_t));
    nuevo->nombre = strdup(nombre); // Reserva memoria individual en Heap
    nuevo->sgte = *cabeza;
    *cabeza = nuevo;
}

void free_list(nodo_t **cabeza) {
    nodo_t *actual = *cabeza;
    while (actual != NULL) {
        nodo_t *temp = actual;
        actual = actual->sgte;
        free(temp->nombre); // Libera el string asignado
        free(temp);         // Libera el nodo
    }
    *cabeza = NULL;
}`,
        tags: ['Stack vs Heap', 'Dangling Pointers', 'strdup', 'Listas Enlazadas']
      },
      {
        id: 'c1-2023-1-p3',
        number: 'Pregunta (c)',
        points: 30,
        title: 'Eliminación de Nodos por Referencia en Árbol Binario de Búsqueda (ABB)',
        description: 'Programe en C la función `void delete_node(tree **nodo)` que elimina de un ABB al nodo apuntado por referencia. Considere los tres casos clásicos (nodo hoja, nodo con 1 hijo, nodo con 2 hijos utilizando la función `sucesor()`).',
        solutionCode: `typedef struct ABB {
    int dato;
    struct ABB *izq, *der;
} tree;

void delete_node(tree **nodo) {
    if (nodo == NULL || *nodo == NULL) return;

    tree *elim = *nodo;

    // Caso 1: Nodo Hoja (sin hijos)
    if (elim->izq == NULL && elim->der == NULL) {
        *nodo = NULL;
        free(elim);
    }
    // Caso 2a: Tiene solo hijo derecho
    else if (elim->izq == NULL) {
        *nodo = elim->der;
        free(elim);
    }
    // Caso 2b: Tiene solo hijo izquierdo
    else if (elim->der == NULL) {
        *nodo = elim->izq;
        free(elim);
    }
    // Caso 3: Tiene dos hijos
    else {
        tree *suc = sucesor(elim); // Encuentra el menor del subárbol derecho
        elim->dato = suc->dato;    // Copia el valor del sucesor
        delete_node(&(elim->der)); // Elimina recursivamente el sucesor
    }
}`,
        tags: ['ABB', 'Eliminación BST', 'Puntero Doble', 'Recursión']
      }
    ]
  },
  {
    id: 'c1-2022-1',
    title: 'Certamen 1 - 2022 Semestre 1',
    course: 'ELO320 - Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2022-1',
    date: '26 de Mayo de 2022',
    professor: 'Prof. Nicolás Gálvez Ramírez',
    duration: '60 minutos',
    difficulty: 'Media',
    summary: 'Comparativa de Tablas Hash (Direccionamiento Abierto vs Encadenamiento), liberación de listas enlazadas dinámicas y eliminación en ABB.',
    topics: ['Tablas Hash', 'Listas Enlazadas', 'Árboles Binarios de Búsqueda'],
    questions: [
      {
        id: 'c1-2022-1-p1',
        number: 'Pregunta (a)',
        points: 30,
        title: 'Inserción y Colisiones en Tablas Hash (Probing vs Listas)',
        description: 'Implemente la función `insert(int *A, char *llave, int valor)` para dos variantes de Tabla Hash:\n1. Arreglo plano con sondeado lineal (Direccionamiento Abierto).\n2. Arreglo de cabezas de listas enlazadas (Encadenamiento).\n\nResponda: ¿Cuál es la diferencia principal entre ambas y cómo se comportan ante un volumen elevado de datos?',
        solutionExplanation: `Diferencias y Comportamiento Asintótico:
- Direccionamiento Abierto: Tiene una capacidad rígida máxima fija igual al tamaño del arreglo. Si la tabla supera un factor de carga α ≈ 0.7, la probabilidad de colisiones en cadena aumenta dramáticamente, degradando las búsquedas a O(n).
- Encadenamiento (Listas): No tiene límite rígido de elementos. Puede almacenar infinitos elementos reservando memoria dinámicamente en las listas de cada bucket. Aunque el rendimiento se degrada si el hash no distribuye bien, no sufre de desbordamiento de espacio.`,
        tags: ['Hash Open Addressing', 'Chaining', 'Factor de Carga']
      },
      {
        id: 'c1-2022-1-p2',
        number: 'Pregunta (b)',
        points: 30,
        title: 'Liberación de Memoria Dinámica en Lista `pukamon`',
        description: 'Identifique el error en la función `free_list(pkmn **head)` encargada de liberar una lista enlazada de objetos `pkmn` con miembros dinámicos (`char *nom`).',
        solutionCode: `void free_list(pkmn **head) {
    if (head == NULL || *head == NULL) return;

    pkmn *actual = *head;
    while (actual != NULL) {
        pkmn *siguiente = actual->sgte;
        if (actual->nom != NULL) {
            free(actual->nom); // Libera el string asignado al nombre
        }
        free(actual); // Libera la estructura del nodo
        actual = siguiente;
    }
    *head = NULL;
}`,
        tags: ['Punteros', 'free()', 'Gestión de Memoria']
      },
      {
        id: 'c1-2022-1-p3',
        number: 'Pregunta (c)',
        points: 40,
        title: 'Eliminación en Árbol Binario de Búsqueda (ABB)',
        description: 'Programe la función `delete_node(tree *nodo)` para eliminar un nodo específico en un Árbol Binario de Búsqueda sabiendo que se dispone de la función `tree *sucesor(tree *nodo)`.',
        tags: ['ABB', 'Eliminación', 'Estructuras Arborescentes']
      }
    ]
  },
  {
    id: 'c2-2022-1',
    title: 'Certamen 2 - 2022 Semestre 1',
    course: 'ELO320 - Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2022-1',
    date: '07 de Julio de 2022',
    professor: 'Prof. Nicolás Gálvez Ramírez',
    duration: '60 minutos',
    difficulty: 'Alta',
    summary: 'Análisis de tiempo de ejecución T(n) en ordenamiento Bubble Sort (`Le_Sort`), cálculo de complejidad con Árboles de Recursión no simétricos y optimización de redes de Fibra Óptica usando Dijkstra.',
    topics: ['Análisis de Complejidad (Big-O)', 'Árboles de Recursión', 'Grafos (Dijkstra)'],
    questions: [
      {
        id: 'c2-2022-1-p1',
        number: 'Pregunta (a)',
        points: 30,
        title: 'Análisis Asintótico y Paso a Paso de `Le_Sort` (Bubble Sort)',
        description: 'Dada la función `Le_Sort(int array[], int size)`:\n(i) Determine el número exacto de instrucciones y tiempo de ejecución $T(n)$.\n(ii) Obtenga las cotas asintóticas $\\mathcal{O}, \\Theta, \\Omega$.',
        codeSnippet: `void Le_Sort(int array[], int size) {
    for (int step = 0; step < size - 1; step++) {
        for (int i = 0; i < size - step - 1; i++) {
            if (array[i] > array[i + 1]) {
                int temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }
    }
}`,
        solutionExplanation: `Cálculo Paso a Paso de T(n):
- El ciclo externo se ejecuta (n - 1) veces.
- El ciclo interno ejecuta (n - 1 - step) iteraciones.
- Sumatoria de iteraciones: ∑_{step=0}^{n-2} (n - 1 - step) = (n - 1) + (n - 2) + ... + 1 = \\frac{n(n - 1)}{2} = \\frac{n^2 - n}{2}.
- Tiempo de ejecución: T(n) = c_1 n^2 + c_2 n + c_3.
- Complejidad Asintótica: O(n²), Θ(n²), Ω(n²).`,
        tags: ['Bubble Sort', 'Sumatorias', 'Cotas Asintóticas']
      },
      {
        id: 'c2-2022-1-p2',
        number: 'Pregunta (b)',
        points: 40,
        title: 'Árbol de Recursión con Subproblemas Desbalanceados',
        description: 'Dada la relación de recurrencia:\n$$T(n) = 2T(n/4) + T(n/5) + T(n/6) + n^2, \\quad T(1) = 1$$\n\n1. Determine la rama más larga del árbol.\n2. Determine la rama más corta del árbol.\n3. Calcule las complejidades $\\mathcal{O}, \\Theta, \\Omega$.',
        solutionExplanation: `Desglose de Árbol de Recursión:
1. Rama más larga: Corresponde a los subproblemas que reducen el tamaño más lentamente, es decir, el divisor menor (n/4). La altura máxima es h_max = log_4(n).
2. Rama más corta: Corresponde al subproblema que reduce el tamaño más rápido, es decir, el divisor mayor (n/6). La altura mínima es h_min = log_6(n).
3. Suma por Niveles: El trabajo en la raíz es n². En el nivel 1 es 2(n/4)² + (n/5)² + (n/6)² = n² [2/16 + 1/25 + 1/36] = n² [0.125 + 0.04 + 0.0277] = 0.1927 n².
Como la suma por niveles decrece geométrica y fuertemente (factor < 1), el trabajo total está dominado por la raíz.
Por ende, T(n) = Θ(n²).`,
        tags: ['Árbol de Recursión', 'Recurrencias', 'Teorema Maestro']
      },
      {
        id: 'c2-2022-1-p3',
        number: 'Pregunta (c)',
        points: 30,
        title: 'Optimización de Latencia en Red de Fibra Óptica (Dijkstra en Grafos)',
        description: 'Se presenta el grafo de cableado entre la central 1 y los armarios 2 a 7 en Puentehuel Bajo. Recomiende el camino de menor latencia (distancia acumulada mínima) desde la central 1 hasta el armario 6 aplicando el algoritmo de Dijkstra.',
        solutionExplanation: `Aplicación de Dijkstra desde Nodo 1:
1. Distancias iniciales: D[1]=0, resto ∞.
2. Nodos vecinos de 1: D[2]=1, D[3]=7, D[4]=4, D[5]=5.
3. Se selecciona Nodo 2 (min D=1). Revisa vecinos de 2: a Nodo 6 costo = 1 + 6 = 7.
4. Se selecciona Nodo 4 (min D=4). Revisa vecinos de 4: a Nodo 6 costo = 4 + 7 = 11.
5. Menor camino encontrado a Nodo 6: Ruta 1 -> 2 -> 6 con costo total de 7 km.`,
        tags: ['Grafos', 'Dijkstra', 'Camino Mínimo']
      }
    ]
  },
  {
    id: 'c2-2021-1',
    title: 'Certamen 2 - 2021 Semestre 1',
    course: 'ELO320 - Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2021-1',
    date: '04 de Agosto de 2021',
    professor: 'Prof. Nicolás Gálvez & Prof. Werner Creixell',
    duration: '60 minutos',
    difficulty: 'Avanzada',
    summary: 'Evaluación comparativa de 3 algoritmos recursivos con Teorema Maestro, complejidad de SelectionSort y análisis de recurrencia en Búsqueda Ternaria.',
    topics: ['Teorema Maestro', 'SelectionSort', 'Búsqueda Ternaria'],
    questions: [
      {
        id: 'c2-2021-1-p1',
        number: 'Pregunta (a)',
        points: 50,
        title: 'Comparación y Elección Óptima de Algoritmos (Teorema Maestro)',
        description: 'Se tienen tres propuestas de algoritmos:\n1. Algoritmo A: Divide en 5 subproblemas de n/2 y combina en O(n).\n2. Algoritmo B: Divide en 2 subproblemas de (n-1) y combina en O(1).\n3. Algoritmo C: Divide en 9 subproblemas de n/3 y combina en O(n²).\n\nCalcule el tiempo de ejecución de cada uno y determine cuál escogería.',
        solutionExplanation: `Análisis por Teorema Maestro T(n) = a T(n/b) + f(n):
- Algoritmo A: T_A(n) = 5 T(n/2) + O(n).
  a=5, b=2. n^{log_b a} = n^{log_2 5} ≈ n^{2.32}.
  Como f(n) = O(n) < n^{2.32}, aplica Caso 1: T_A(n) = Θ(n^{2.32}).

- Algoritmo B: T_B(n) = 2 T(n-1) + O(1).
  Es una recurrencia sustractiva. T_B(n) = O(2^n) (Exponencial).

- Algoritmo C: T_C(n) = 9 T(n/3) + O(n²).
  a=9, b=3. n^{log_3 9} = n².
  Como f(n) = Θ(n²), aplica Caso 2 (k=0): T_C(n) = Θ(n² log n).

Conclusión: Se escoge el Algoritmo C ya que Θ(n² log n) crecemos mucho más lento que Θ(n^{2.32}) y Θ(2^n).`,
        tags: ['Teorema Maestro', 'Eficiencia Asintótica', 'Comparación Algorítmica']
      },
      {
        id: 'c2-2021-1-p2',
        number: 'Pregunta (b)',
        points: 25,
        title: 'Análisis Asintótico de SelectionSort',
        description: 'Determine el tiempo de ejecución T(n) y la complejidad asintótica de la función `selectionSort(int *arr, int n)`.',
        codeSnippet: `void selectionSort(int *arr, int n) {
    int i, j, min_indice;
    for (i = 0; i < n - 1; i++) {
        min_indice = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_indice]) min_indice = j;
        }
        int temp = arr[i];
        arr[i] = arr[min_indice];
        arr[min_indice] = temp;
    }
}`,
        solutionExplanation: `Cálculo de T(n):
El bucle interno realiza (n - 1 - i) comparaciones en cada paso.
Sumatoria: ∑_{i=0}^{n-2} (n - 1 - i) = \\frac{n(n-1)}{2}.
Independientemente de si el arreglo está ordenado o invertido, SelectionSort SIEMPRE realiza las mismas comparaciones.
Por lo tanto, T(n) = Θ(n²) en el mejor, peor y caso promedio.`,
        tags: ['SelectionSort', 'Complejidad Cuadrática']
      },
      {
        id: 'c2-2021-1-p3',
        number: 'Pregunta (c)',
        points: 25,
        title: 'Recurrencia y Complejidad de Búsqueda Ternaria',
        description: 'Dada la función `BusquedaTernaria()` que divide el rango de búsqueda en 3 partes iguales usando dos puntos medios (`div1` y `div2`), determine su ecuación de recurrencia T(n) y su complejidad asintótica.',
        solutionExplanation: `Ecuación de Recurrencia:
En cada paso recursivo, el algoritmo realiza O(1) comparaciones y se reduce a buscar en 1 solo tercio del arreglo.
Por ende: T(n) = T(n/3) + O(1).

Aplicando Teorema Maestro (a=1, b=3, f(n)=O(1)):
n^{log_3 1} = n^0 = 1.
f(n) = Θ(1), aplica Caso 2 del Teorema Maestro.
Resultado: T(n) = Θ(log_3 n) = Θ(log n).`,
        tags: ['Búsqueda Ternaria', 'Recurrencia', 'O(log n)']
      }
    ]
  },
  {
    id: 'c1-2015-1',
    title: 'Certamen 1 - 2015 Semestre 1',
    course: 'ELO320 - Estructura de Datos y Algoritmos',
    university: 'Universidad Técnica Federico Santa María (USM)',
    semester: '2015-1',
    date: '1er Semestre de 2015',
    professor: 'Prof. María José Escobar S.',
    duration: '90 minutos',
    difficulty: 'Media',
    summary: 'Rotación simple a la derecha en Árboles ABB, división de listas simplemente enlazadas (`ubicarDividir`) y manipulación de listas doblemente enlazadas.',
    topics: ['Rotación ABB', 'Listas Enlazadas', 'Listas Dobles'],
    questions: [
      {
        id: 'c1-2015-1-p1',
        number: 'Pregunta 1',
        points: 30,
        title: 'Rotación Simple a la Derecha en ABB (`funcionPregunta1`)',
        description: 'Analice el comportamiento de la función `funcionPregunta1(Nodo *p)` aplicada sobre la raíz de un Árbol Binario de Búsqueda.',
        codeSnippet: `Nodo *funcionPregunta1(Nodo *p) {
    Nodo *aa = p->left;
    p->left = aa->right;
    aa->right = p;
    return (aa);
};`,
        solutionExplanation: `Explicación y Conjetura:
La función realiza una Rotación Simple hacia la Derecha (Right Rotation) sobre el subárbol con raíz en 'p'.
1. Setea como nueva raíz del subárbol al nodo hijo izquierdo 'aa = p->left'.
2. El subárbol derecho de 'aa' se reasigna como hijo izquierdo de 'p' ('p->left = aa->right').
3. El nodo 'p' pasa a ser el hijo derecho de 'aa' ('aa->right = p').
4. Retorna 'aa' como la nueva raíz del subárbol, preservando la propiedad de ordenamiento ABB.`,
        tags: ['ABB', 'Rotaciones', 'Balance de Árboles']
      },
      {
        id: 'c1-2015-1-p2',
        number: 'Pregunta 2',
        points: 40,
        title: 'Partición de Lista Enlazada `ubicarDividir` por Valor Pivote',
        description: 'Dada una lista enlazada ordenada descendentemente, ubique el elemento `split` y divida la lista en dos (`lista1` y `lista2`), agregando el pivote a la lista resultante de menor tamaño.',
        tags: ['Listas Enlazadas', 'Split', 'Algoritmos con Listas']
      },
      {
        id: 'c1-2015-1-p3',
        number: 'Pregunta 3',
        points: 30,
        title: 'Eliminación K elementos desde Inicio y Fin en Lista Doble',
        description: 'Implemente en C99 las funciones `removeFromHead(Node *lista, int k)` y `removeFromTail(Node *lista, int k)` que eliminen los k primeros o últimos nodos de una lista doblemente enlazada.',
        tags: ['Listas Dobles', 'Head/Tail', 'Memory Management']
      }
    ]
  }
];
