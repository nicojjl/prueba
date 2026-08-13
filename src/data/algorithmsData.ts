import { AlgorithmItem, AlgoCategory } from '../types';

export const ALGO_CATEGORIES: { id: AlgoCategory; label: string; count: number; icon: string }[] = [
  { id: 'conceptos', label: 'Conceptos Fundamentales', count: 7, icon: '💡' },
  { id: 'estructuras', label: 'Estructuras de Datos', count: 8, icon: '📦' },
  { id: 'ordenamiento', label: 'Ordenamiento (Sorting)', count: 8, icon: '📊' },
  { id: 'busqueda_grafos', label: 'Búsqueda y Grafos', count: 6, icon: '🕸️' },
  { id: 'dp_backtracking', label: 'Prog. Dinámica & Backtracking', count: 5, icon: '🧩' },
];

export const ALGORITHMS_DATA: AlgorithmItem[] = [
  // ----------------------------------------------------
  // 1. BUBBLE SORT
  // ----------------------------------------------------
  {
    id: 'bubble-sort',
    name: 'Bubble Sort (Ordenamiento Burbuja)',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento',
    subtitle: 'Compara elementos adyacentes y hace flotar los valores más grandes al final.',
    icon: '🫧',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(n)',
      timeAverage: 'O(n²)',
      timeWorst: 'O(n²)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Las Burbujas de Gas en una Bebida',
      description: 'Igual que las burbujas más grandes y livianas suben a la superficie de un vaso, el valor máximo "flota" hacia la derecha del arreglo en cada pasada.',
      realLifeExample: 'Ordenar una fila de estudiantes por estatura comparando solo a dos personas adyacentes a la vez e intercambiándolas si la izquierda es más alta.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona Bubble Sort?
Bubble Sort es el algoritmo de ordenamiento más intuitivo. Recorre el arreglo repetidamente y en cada iteración:
1. Compara el elemento actual \`arr[i]\` con su vecino \`arr[i+1]\`.
2. Si \`arr[i] > arr[i+1]\`, los **intercambia** (\`swap\`).
3. Al finalizar una pasada completa, el elemento más grande queda fijo en su posición final correcta a la derecha.
4. Repite el proceso para los restantes \`n - 1\` elementos hasta que no se requieran más intercambios.

#### Optimizaciones:
Agregando una bandera \`swapped\`, si en una pasada completa no ocurre ningún intercambio, el arreglo ya está completamente ordenado y el algoritmo termina anticipadamente en $O(n)$.
`,
    codeImplementations: {
      c: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break; // Ya ordenado
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Arreglo Ordenado: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    for (int x : arr) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# Ejemplo
numeros = [64, 34, 25, 12, 22, 11, 90]
print("Ordenado:", bubble_sort(numeros))`
    },
    initialVisualData: {
      defaultArray: [45, 12, 89, 34, 23, 7, 60]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [45, 12, 89, 34, 23, 7, 60];
      const steps: any[] = [];
      const n = arr.length;
      let sortedIndices: number[] = [];

      steps.push({
        stepIndex: 0,
        description: 'Estado Inicial: Se prepara el arreglo no ordenado para Bubble Sort.',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: [],
        codeLine: 4
      });

      let stepCounter = 1;
      for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({
            stepIndex: stepCounter++,
            description: `Comparando arr[${j}] = ${arr[j]} y arr[${j + 1}] = ${arr[j + 1]}.`,
            arrayState: [...arr],
            highlightIndices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            activePointers: [
              { label: 'j', index: j, color: '#C2410C' },
              { label: 'j+1', index: j + 1, color: '#2563EB' }
            ],
            codeLine: 6
          });

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;

            steps.push({
              stepIndex: stepCounter++,
              description: `Intercambio (Swap): ${temp} > ${arr[j]} -> Se mueven las posiciones.`,
              arrayState: [...arr],
              highlightIndices: [j, j + 1],
              swapIndices: [j, j + 1],
              sortedIndices: [...sortedIndices],
              codeLine: 8
            });
          }
        }
        sortedIndices.unshift(n - 1 - i);
        steps.push({
          stepIndex: stepCounter++,
          description: `El elemento arr[${n - 1 - i}] = ${arr[n - 1 - i]} ha quedado fijado en su posición correcta.`,
          arrayState: [...arr],
          highlightIndices: [],
          sortedIndices: [...sortedIndices],
          codeLine: 12
        });

        if (!swapped) break;
      }

      sortedIndices = Array.from({ length: n }, (_, i) => i);
      steps.push({
        stepIndex: stepCounter++,
        description: '¡Ordenamiento completado exitosamente con Bubble Sort!',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 13
      });

      return steps;
    },
    exercises: [
      {
        id: 'ex-bubble-1',
        title: 'Optimización con bandera de intercambio',
        description: 'Escribe en C el algoritmo de Bubble Sort agregando la variable de corte anticipado swapped cuando no se detecten cambios.',
        cCode: `#include <stdio.h>\n\nvoid bubbleSortOptimized(int arr[], int n) {\n    // Tu código aquí\n}`,
        cppCode: `#include <iostream>\n#include <vector>\n\nvoid bubbleSortOptimized(std::vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def bubble_sort_optimized(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: '11 12 22 25 34 64 90',
        explanation: 'La variable swapped permite detener el bucle externo si la lista interna no realizó permutas.',
      }
    ]
  },

  // ----------------------------------------------------
  // 2. SELECTION SORT
  // ----------------------------------------------------
  {
    id: 'selection-sort',
    name: 'Selection Sort (Ordenamiento por Selección)',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento',
    subtitle: 'Busca el elemento mínimo en el arreglo restante y lo coloca en la primera posición no ordenada.',
    icon: '🔍',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(n²)',
      timeAverage: 'O(n²)',
      timeWorst: 'O(n²)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Organizar una baraja de cartas por valor',
      description: 'Revisas toda tu mano buscando la carta con la denominación más pequeña y la mueves al extremo izquierdo, repitiendo el proceso con el resto de cartas.',
      realLifeExample: 'Seleccionar los atletas más rápidos uno a uno para formar una alineación de podio ordenada.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona Selection Sort?
Selection Sort divide el arreglo en dos partes: la sublista ordenada a la izquierda y la sublista desordenada a la derecha:
1. Encuentra el elemento **mínimo** en la sublista no ordenada.
2. Intercambia ese elemento mínimo con el primer elemento desordenado.
3. Desplaza el límite entre ambas sublistas una posición a la derecha.
4. Realiza exactamente $n - 1$ intercambios en total, lo que minimiza las escrituras en memoria RAM.
`,
    codeImplementations: {
      c: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int arr[] = {29, 10, 14, 37, 13};
    int n = 5;
    selectionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        std::swap(arr[i], arr[minIdx]);
    }
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
    },
    initialVisualData: {
      defaultArray: [29, 10, 14, 37, 13, 8]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [29, 10, 14, 37, 13, 8];
      const steps: any[] = [];
      const n = arr.length;
      const sortedIndices: number[] = [];

      steps.push({
        stepIndex: 0,
        description: 'Estado Inicial para Selection Sort.',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: []
      });

      let stepCounter = 1;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
          stepIndex: stepCounter++,
          description: `Buscando el elemento mínimo desde el índice ${i}. Mínimo provisional: arr[${minIdx}] = ${arr[minIdx]}.`,
          arrayState: [...arr],
          highlightIndices: [i],
          sortedIndices: [...sortedIndices],
          activePointers: [{ label: 'min', index: minIdx, color: '#10B981' }]
        });

        for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            steps.push({
              stepIndex: stepCounter++,
              description: `¡Nuevo mínimo encontrado! arr[${j}] = ${arr[j]} es menor.`,
              arrayState: [...arr],
              highlightIndices: [j],
              sortedIndices: [...sortedIndices],
              activePointers: [{ label: 'min', index: minIdx, color: '#10B981' }]
            });
          }
        }

        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          steps.push({
            stepIndex: stepCounter++,
            description: `Intercambiando arr[${i}] (${temp}) con el mínimo arr[${minIdx}] (${arr[i]}).`,
            arrayState: [...arr],
            swapIndices: [i, minIdx],
            sortedIndices: [...sortedIndices]
          });
        }
        sortedIndices.push(i);
      }
      sortedIndices.push(n - 1);

      steps.push({
        stepIndex: stepCounter++,
        description: '¡Arreglo totalmente ordenado con Selection Sort!',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k)
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 3. INSERTION SORT
  // ----------------------------------------------------
  {
    id: 'insertion-sort',
    name: 'Insertion Sort (Ordenamiento por Inserción)',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento',
    subtitle: 'Inserta cada elemento en su posición relativa correcta dentro de una sublista ya ordenada.',
    icon: '🃏',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(n)',
      timeAverage: 'O(n²)',
      timeWorst: 'O(n²)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Ordenar una mano de cartas de Poker',
      description: 'Tomas una carta de la mesa a la vez y la deslizas hacia la izquierda insertándola entre las cartas que ya tienes ordenadas en tu mano.',
      realLifeExample: 'Organizar libros en una biblioteca al colocar un nuevo libro en el estante corriendo los libros existentes a la derecha.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona Insertion Sort?
Insertion Sort construye la lista ordenada elemento por elemento:
1. Asume que el primer elemento \`arr[0]\` ya está ordenado.
2. Toma la siguiente carta / elemento \`key = arr[i]\`.
3. Compara \`key\` con los elementos a su izquierda y los desplaza una posición a la derecha mientras sean mayores que \`key\`.
4. Inserta \`key\` en el espacio libre resultante.
5. Muy eficiente para arreglos pequeños o casi totalmente ordenados ($O(n)$ mejor caso).
`,
    codeImplementations: {
      c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = 5;
    insertionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    for (size_t i = 1; i < arr.size(); ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`
    },
    initialVisualData: {
      defaultArray: [12, 11, 13, 5, 6, 9]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [12, 11, 13, 5, 6, 9];
      const steps: any[] = [];
      const n = arr.length;

      steps.push({
        stepIndex: 0,
        description: 'Estado Inicial para Insertion Sort.',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: [0]
      });

      let stepCounter = 1;
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push({
          stepIndex: stepCounter++,
          description: `Seleccionando clave key = ${key} (índice ${i}) para insertar en el subarreglo ordenado [0..${i-1}].`,
          arrayState: [...arr],
          highlightIndices: [i],
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          activePointers: [{ label: 'key', index: i, color: '#C2410C' }]
        });

        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          steps.push({
            stepIndex: stepCounter++,
            description: `arr[${j}] (${arr[j]}) es mayor que key (${key}). Desplazando ${arr[j]} a la derecha (índice ${j + 1}).`,
            arrayState: [...arr],
            highlightIndices: [j, j + 1],
            sortedIndices: Array.from({ length: i }, (_, k) => k)
          });
          j--;
        }
        arr[j + 1] = key;
        steps.push({
          stepIndex: stepCounter++,
          description: `Insertando key = ${key} en el índice libre ${j + 1}.`,
          arrayState: [...arr],
          highlightIndices: [j + 1],
          sortedIndices: Array.from({ length: i + 1 }, (_, k) => k)
        });
      }

      steps.push({
        stepIndex: stepCounter++,
        description: '¡Arreglo ordenado con Insertion Sort!',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k)
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 4. QUICK SORT
  // ----------------------------------------------------
  {
    id: 'quick-sort',
    name: 'Quick Sort (Ordenamiento Rápido)',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento',
    subtitle: 'Elige un pivote, particiona los elementos menores a la izquierda y los mayores a la derecha recursivamente.',
    icon: '⚡',
    difficulty: 'Intermedio',
    complexity: {
      timeBest: 'O(n log n)',
      timeAverage: 'O(n log n)',
      timeWorst: 'O(n²)',
      spaceWorst: 'O(log n)',
    },
    analogy: {
      title: 'Organizar archivos por fecha con un umbral pivote',
      description: 'Eliges una fecha de referencia (el pivote). Separas los archivos anteriores a la izquierda y los posteriores a la derecha. Luego repites el proceso de forma independiente en cada grupo.',
      realLifeExample: 'Clasificar un grupo de personas tomando a una persona mediana como estatura pivote.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona Quick Sort?
Quick Sort es un algoritmo de **Divide y Vencerás** (Divide and Conquer):
1. **Selección del Pivote**: Elige un elemento como pivote (por ejemplo, el último elemento \`arr[high]\`).
2. **Partición (Lomuto / Hoare)**: Reorganiza el arreglo de modo que todos los elementos menores que el pivote queden antes de él, y los mayores después.
3. **Llamadas Recursivas**: Aplica Quick Sort recursivamente a la sublista izquierda y a la sublista derecha.
4. Es extremadamente rápido en la práctica gracias al excelente uso de la memoria caché de la CPU.
`,
    codeImplementations: {
      c: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`
    },
    initialVisualData: {
      defaultArray: [10, 80, 30, 90, 40, 50, 70]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [10, 80, 30, 90, 40, 50, 70];
      const steps: any[] = [];
      const n = arr.length;
      let stepCounter = 0;
      const sortedIndices: number[] = [];

      steps.push({
        stepIndex: stepCounter++,
        description: 'Estado Inicial para Quick Sort.',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: []
      });

      function runQuickSort(low: number, high: number) {
        if (low < high) {
          const pivot = arr[high];
          steps.push({
            stepIndex: stepCounter++,
            description: `Particionando el rango [${low}..${high}]. Pivote elegido: arr[${high}] = ${pivot}.`,
            arrayState: [...arr],
            highlightIndices: [high],
            sortedIndices: [...sortedIndices],
            activePointers: [{ label: 'pivote', index: high, color: '#C2410C' }]
          });

          let i = low - 1;
          for (let j = low; j < high; j++) {
            steps.push({
              stepIndex: stepCounter++,
              description: `Comparando arr[${j}] (${arr[j]}) con pivote ${pivot}.`,
              arrayState: [...arr],
              highlightIndices: [j, high],
              sortedIndices: [...sortedIndices]
            });

            if (arr[j] < pivot) {
              i++;
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              steps.push({
                stepIndex: stepCounter++,
                description: `arr[${j}] < pivote -> Moviendo elemento menor al índice ${i}.`,
                arrayState: [...arr],
                swapIndices: [i, j],
                sortedIndices: [...sortedIndices]
              });
            }
          }

          const temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          const pi = i + 1;
          sortedIndices.push(pi);

          steps.push({
            stepIndex: stepCounter++,
            description: `Pivote ${pivot} colocado en su posición definitiva index ${pi}.`,
            arrayState: [...arr],
            highlightIndices: [pi],
            sortedIndices: [...sortedIndices]
          });

          runQuickSort(low, pi - 1);
          runQuickSort(pi + 1, high);
        } else if (low === high) {
          if (!sortedIndices.includes(low)) sortedIndices.push(low);
        }
      }

      runQuickSort(0, n - 1);

      steps.push({
        stepIndex: stepCounter++,
        description: '¡Quick Sort finalizado!',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k)
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 5. MERGE SORT
  // ----------------------------------------------------
  {
    id: 'merge-sort',
    name: 'Merge Sort (Ordenamiento por Mezcla)',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento',
    cormenChapter: 'Capítulo 2.3 (Divide y Vencerás)',
    subtitle: 'Divide el arreglo por la mitad repetidamente y luego combina las sublistas ordenadas.',
    icon: '🔀',
    difficulty: 'Intermedio',
    pseudocode: `MERGE-SORT(A, p, r)
 1. if p < r
 2.   q = ⌊(p + r) / 2⌋
 3.   MERGE-SORT(A, p, q)
 4.   MERGE-SORT(A, q + 1, r)
 5.   MERGE(A, p, q, r)

MERGE(A, p, q, r)
 6. n1 = q - p + 1,  n2 = r - q
 7. crear arreglos L[1..n1] y R[1..n2]
 8. copiar A[p..q] en L, A[q+1..r] en R
 9. i = 1,  j = 1
10. for k = p to r
11.   if L[i] <= R[j]
12.     A[k] = L[i];  i = i + 1
13.   else
14.     A[k] = R[j];  j = j + 1`,
    complexity: {
      timeBest: 'O(n log n)',
      timeAverage: 'O(n log n)',
      timeWorst: 'O(n log n)',
      spaceWorst: 'O(n)',
    },
    analogy: {
      title: 'Mezclar dos filas de clientes ya ordenadas por turno',
      description: 'Si tienes dos filas ordenadas, para formar una sola fila final basta con mirar las dos primeras personas de cada fila y dejar pasar a la que tenga el menor número.',
      realLifeExample: 'Unir dos directorios telefónicos alfabéticos en un único tomo maestro.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona Merge Sort?
Merge Sort garantiza $O(n \\log n)$ en todos los casos:
1. **Divide**: Calcula la mitad del arreglo \`mid = (low + high) / 2\`.
2. **Conquista**: Llama a Merge Sort recursivamente en la mitad izquierda y derecha.
3. **Combina (Merge)**: Combina las dos sublistas ordenadas creando un arreglo auxiliar temporal.
`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k] = L[i]; i++; }
        else { arr[k] = R[j]; j++; }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      cpp: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    merged, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[right[j]]); j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged`
    },
    initialVisualData: {
      defaultArray: [38, 27, 43, 3, 9, 82, 10]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [38, 27, 43, 3, 9, 82, 10];
      const steps: any[] = [];
      let stepCounter = 0;

      steps.push({
        stepIndex: stepCounter++,
        description: 'Estado Inicial para Merge Sort.',
        arrayState: [...arr],
        highlightIndices: [],
        sortedIndices: []
      });

      function runMergeSort(l: number, r: number) {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          steps.push({
            stepIndex: stepCounter++,
            description: `Dividiendo rango [${l}..${r}] en dos mitades: [${l}..${m}] y [${m+1}..${r}].`,
            arrayState: [...arr],
            highlightIndices: Array.from({ length: r - l + 1 }, (_, i) => l + i)
          });

          runMergeSort(l, m);
          runMergeSort(m + 1, r);

          // Merge step
          const left = arr.slice(l, m + 1);
          const right = arr.slice(m + 1, r + 1);
          let i = 0, j = 0, k = l;

          while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
              arr[k] = left[i++];
            } else {
              arr[k] = right[j++];
            }
            k++;
          }
          while (i < left.length) arr[k++] = left[i++];
          while (j < right.length) arr[k++] = right[j++];

          steps.push({
            stepIndex: stepCounter++,
            description: `Mezcladas exitosamente las dos sublistas en [${l}..${r}] resultando en orden correcto.`,
            arrayState: [...arr],
            sortedIndices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx)
          });
        }
      }

      runMergeSort(0, arr.length - 1);

      steps.push({
        stepIndex: stepCounter++,
        description: '¡Merge Sort completado!',
        arrayState: [...arr],
        sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx)
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 6. BINARY SEARCH
  // ----------------------------------------------------
  {
    id: 'binary-search',
    name: 'Búsqueda Binaria (Binary Search)',
    category: 'conceptos',
    categoryLabel: 'Conceptos',
    subtitle: 'Encuentra la posición de un elemento objetivo en un arreglo ya ordenado descartando la mitad de las opciones en cada paso.',
    icon: '🎯',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(1)',
      timeAverage: 'O(log n)',
      timeWorst: 'O(log n)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Adivinar un número entre 1 y 100',
      description: 'Si dices "50" y te responden "Más alto", descartas inmediatamente del 1 al 50. Luego dices "75", recortando el espacio de búsqueda a la mitad cada vez.',
      realLifeExample: 'Buscar una palabra en el diccionario impreso abriéndolo exactamente por el centro.',
    },
    explanationMarkdown: `
### ¿Cómo Funciona la Búsqueda Binaria?
**Requisito indispensable**: El arreglo DEBE estar **ordenado**.
1. Define los punteros \`low = 0\` y \`high = n - 1\`.
2. Calcula el elemento medio \`mid = (low + high) / 2\`.
3. Si \`arr[mid] == target\`, ¡elemento encontrado!
4. Si \`target < arr[mid]\`, busca en la mitad izquierda (\`high = mid - 1\`).
5. Si \`target > arr[mid]\`, busca en la mitad derecha (\`low = mid + 1\`).
6. Si \`low > high\`, el elemento no existe en el arreglo.
`,
    codeImplementations: {
      c: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // No encontrado
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10;
    int target = 23;
    int result = binarySearch(arr, n, target);
    printf("Elemento %d encontrado en el índice: %d\\n", target, result);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`
    },
    initialVisualData: {
      defaultArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput].sort((a, b) => a - b) : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
      const target = 23;
      const steps: any[] = [];
      let low = 0;
      let high = arr.length - 1;
      let stepCounter = 0;

      steps.push({
        stepIndex: stepCounter++,
        description: `Búsqueda Binaria. Objetivo a encontrar: ${target}. Arreglo ordenado.`,
        arrayState: [...arr],
        activePointers: [
          { label: 'low', index: low, color: '#10B981' },
          { label: 'high', index: high, color: '#2563EB' }
        ]
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        steps.push({
          stepIndex: stepCounter++,
          description: `Calculando mid = (${low} + ${high}) / 2 = ${mid}. Valor arr[${mid}] = ${arr[mid]}.`,
          arrayState: [...arr],
          highlightIndices: [mid],
          activePointers: [
            { label: 'low', index: low, color: '#10B981' },
            { label: 'mid', index: mid, color: '#C2410C' },
            { label: 'high', index: high, color: '#2563EB' }
          ]
        });

        if (arr[mid] === target) {
          steps.push({
            stepIndex: stepCounter++,
            description: `¡Objetivo ${target} ENCONTRADO en el índice ${mid}!`,
            arrayState: [...arr],
            sortedIndices: [mid],
            highlightIndices: [mid]
          });
          return steps;
        }

        if (arr[mid] < target) {
          steps.push({
            stepIndex: stepCounter++,
            description: `arr[${mid}] (${arr[mid]}) < ${target}. Descartando mitad izquierda [${low}..${mid}]. Nuevo low = ${mid + 1}.`,
            arrayState: [...arr]
          });
          low = mid + 1;
        } else {
          steps.push({
            stepIndex: stepCounter++,
            description: `arr[${mid}] (${arr[mid]}) > ${target}. Descartando mitad derecha [${mid}..${high}]. Nuevo high = ${mid - 1}.`,
            arrayState: [...arr]
          });
          high = mid - 1;
        }
      }

      steps.push({
        stepIndex: stepCounter++,
        description: `El elemento ${target} no fue encontrado en el arreglo.`,
        arrayState: [...arr]
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 7. TWO POINTERS
  // ----------------------------------------------------
  {
    id: 'two-pointers',
    name: 'Two Pointers (Dos Punteros)',
    category: 'conceptos',
    categoryLabel: 'Conceptos',
    subtitle: 'Utiliza dos punteros que avanzan o se convergen en una estructura de datos para resolver problemas en $O(n)$.',
    icon: '👈👉',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(n)',
      timeAverage: 'O(n)',
      timeWorst: 'O(n)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Dos personas caminando desde los extremos opuestos de un puente',
      description: 'Una persona empieza al inicio (izq) y otra al final (der). Se mueven hacia el centro evaluando si la suma de sus alturas cumple una condición dada.',
      realLifeExample: 'Verificar si una palabra es un palíndromo comparando la primera letra con la última.',
    },
    explanationMarkdown: `
### Patrón Two Pointers
Este patrón evita bucles anidados $O(n^2)$ reduciendo la complejidad a tiempo lineal $O(n)$:
1. Inicializa un puntero al inicio (\`left = 0\`) y otro al final (\`right = n - 1\`).
2. Evalúa la condición en \`arr[left]\` y \`arr[right]\` (por ejemplo, buscar si \`arr[left] + arr[right] == target\`).
3. Si la suma es menor que el objetivo, incrementa \`left++\`.
4. Si la suma es mayor, decrementa \`right--\`.
`,
    codeImplementations: {
      c: `#include <stdio.h>

int twoSumSorted(int arr[], int n, int target, int* out1, int* out2) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *out1 = left; *out2 = right;
            return 1;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

bool twoSumSorted(const std::vector<int>& arr, int target, int& idx1, int& idx2) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            idx1 = left; idx2 = right;
            return true;
        }
        if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      python: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1
        else:
            right -= 1
    return None`
    },
    initialVisualData: {
      defaultArray: [1, 3, 5, 8, 11, 15, 18, 22]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [1, 3, 5, 8, 11, 15, 18, 22];
      const target = 19;
      const steps: any[] = [];
      let left = 0, right = arr.length - 1;
      let stepCounter = 0;

      steps.push({
        stepIndex: stepCounter++,
        description: `Técnica Two Pointers. Buscar par que sume ${target}.`,
        arrayState: [...arr],
        activePointers: [
          { label: 'left', index: left, color: '#10B981' },
          { label: 'right', index: right, color: '#C2410C' }
        ]
      });

      while (left < right) {
        const sum = arr[left] + arr[right];
        steps.push({
          stepIndex: stepCounter++,
          description: `Suma actual: arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum}.`,
          arrayState: [...arr],
          highlightIndices: [left, right],
          activePointers: [
            { label: 'left', index: left, color: '#10B981' },
            { label: 'right', index: right, color: '#C2410C' }
          ]
        });

        if (sum === target) {
          steps.push({
            stepIndex: stepCounter++,
            description: `¡Par encontrado! arr[${left}] + arr[${right}] = ${target}.`,
            arrayState: [...arr],
            sortedIndices: [left, right]
          });
          return steps;
        }

        if (sum < target) {
          steps.push({
            stepIndex: stepCounter++,
            description: `Suma ${sum} < ${target} -> Incrementar left++ para aumentar el valor total.`,
            arrayState: [...arr]
          });
          left++;
        } else {
          steps.push({
            stepIndex: stepCounter++,
            description: `Suma ${sum} > ${target} -> Decrementar right-- para reducir el valor total.`,
            arrayState: [...arr]
          });
          right--;
        }
      }

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 8. SLIDING WINDOW
  // ----------------------------------------------------
  {
    id: 'sliding-window',
    name: 'Sliding Window (Ventana Deslizante)',
    category: 'conceptos',
    categoryLabel: 'Conceptos',
    subtitle: 'Mantiene una subventana contigua de elementos que se desplaza sobre el arreglo en $O(n)$.',
    icon: '🪟',
    difficulty: 'Intermedio',
    complexity: {
      timeBest: 'O(n)',
      timeAverage: 'O(n)',
      timeWorst: 'O(n)',
      spaceWorst: 'O(1)',
    },
    analogy: {
      title: 'Enfoque de una cámara fotográfica panorámica',
      description: 'El encuadre de la cámara (la ventana) tiene un tamaño prefijado y se mueve un paso a la derecha por el paisaje. Al avanzar, incluyes el nuevo árbol a la derecha y excluyes la roca que quedó a la izquierda.',
      realLifeExample: 'Calcular el promedio de ingresos diarios durante ventanas móviles de 7 días consecutivos.',
    },
    explanationMarkdown: `
### Patrón Sliding Window
Para encontrar la suma máxima de un subarreglo de tamaño $k$:
1. Calcula la suma del primer bloque de tamaño $k$.
2. Desplaza la ventana un elemento a la derecha sumando el nuevo elemento entrant y restando el saliente: \`sum = sum + arr[i] - arr[i - k]\`.
3. Esto elimina recalculaciones redundantes reduciendo de $O(n \\cdot k)$ a $O(n)$.
`,
    codeImplementations: {
      c: `#include <stdio.h>

int maxSubarraySum(int arr[], int n, int k) {
    if (n < k) return -1;
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;

    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>

int maxSubarraySum(const std::vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;
    int windowSum = std::accumulate(arr.begin(), arr.begin() + k, 0);
    int maxSum = windowSum;
    for (int i = k; i < n; ++i) {
        windowSum += arr[i] - arr[i - k];
        maxSum = std::max(maxSum, windowSum);
    }
    return maxSum;
}`,
      python: `def max_subarray_sum(arr, k):
    if len(arr) < k:
        return -1
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`
    },
    initialVisualData: {
      defaultArray: [2, 1, 5, 1, 3, 2, 8, 4]
    },
    generateSteps: (customInput?: number[]) => {
      const arr = customInput ? [...customInput] : [2, 1, 5, 1, 3, 2, 8, 4];
      const k = 3;
      const steps: any[] = [];
      let stepCounter = 0;

      let currentSum = 0;
      for (let i = 0; i < k; i++) currentSum += arr[i];
      let maxSum = currentSum;

      steps.push({
        stepIndex: stepCounter++,
        description: `Ventana inicial de tamaño k = ${k}: Índices [0..${k-1}]. Suma actual = ${currentSum}.`,
        arrayState: [...arr],
        highlightIndices: [0, 1, 2],
        activePointers: [
          { label: 'start', index: 0, color: '#10B981' },
          { label: 'end', index: k - 1, color: '#C2410C' }
        ]
      });

      for (let i = k; i < arr.length; i++) {
        const entering = arr[i];
        const leaving = arr[i - k];
        currentSum += entering - leaving;
        if (currentSum > maxSum) maxSum = currentSum;

        steps.push({
          stepIndex: stepCounter++,
          description: `Desplazando ventana: Entra arr[${i}] (${entering}), sale arr[${i - k}] (${leaving}). Nueva suma = ${currentSum}. Máx = ${maxSum}.`,
          arrayState: [...arr],
          highlightIndices: Array.from({ length: k }, (_, idx) => i - k + 1 + idx),
          activePointers: [
            { label: 'start', index: i - k + 1, color: '#10B981' },
            { label: 'end', index: i, color: '#C2410C' }
          ]
        });
      }

      steps.push({
        stepIndex: stepCounter++,
        description: `¡Proceso completado! Suma máxima en ventana de tamaño ${k} es ${maxSum}.`,
        arrayState: [...arr]
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 9. STACK (PILA)
  // ----------------------------------------------------
  {
    id: 'stack',
    name: 'Stack (Pila LIFO)',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Estructura LIFO (Last-In, First-Out): el último elemento ingresado es el primero en salir.',
    icon: '🥞',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(1) Push/Pop',
      timeAverage: 'O(1) Push/Pop',
      timeWorst: 'O(1) Push/Pop',
      spaceWorst: 'O(n)',
    },
    analogy: {
      title: 'Pila de platos en una cafetería',
      description: 'El lavaplatos coloca cada nuevo plato sobre la cima de la pila (Push). Cuando un cliente toma un plato, siempre retira el plato de arriba (Pop).',
      realLifeExample: 'El botón de "Deshacer" (Ctrl+Z) en editores de texto y el historial de navegación hacia atrás en la web.',
    },
    explanationMarkdown: `
### Estructura de Datos: Pila (Stack)
Operaciones Principales:
- \`push(x)\`: Inserta un elemento en la cima de la pila.
- \`pop()\`: Remueve y retorna el elemento superior.
- \`peek() / top()\`: Consulta el elemento superior sin removerlo.
- \`isEmpty()\`: Retorna si la pila no contiene elementos.
`,
    codeImplementations: {
      c: `#include <stdio.h>
#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void init(Stack *s) { s->top = -1; }
int isFull(Stack *s) { return s->top == MAX - 1; }
int isEmpty(Stack *s) { return s->top == -1; }

void push(Stack *s, int val) {
    if (!isFull(s)) s->items[++(s->top)] = val;
}

int pop(Stack *s) {
    if (!isEmpty(s)) return s->items[(s->top)--];
    return -1;
}`,
      cpp: `#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    std::cout << "Top: " << s.top() << "\\n"; // 30
    s.pop();
    std::cout << "Nuevo Top: " << s.top() << "\\n"; // 20
    return 0;
}`,
      python: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        return self.items.pop() if self.items else None
    def peek(self):
        return self.items[-1] if self.items else None`
    },
    initialVisualData: {},
    generateSteps: (customInput?: (number | string)[]) => {
      const steps: any[] = [];
      const stack: { value: string | number; active?: boolean }[] = [];

      steps.push({
        stepIndex: 0,
        description: 'Pila inicial vacía.',
        stackQueueState: []
      });

      const pushVals = customInput && customInput.length > 0 ? customInput : [10, 25, 42, 88];
      pushVals.forEach((val, idx) => {
        stack.push({ value: val, active: true });
        steps.push({
          stepIndex: idx + 1,
          description: `Push(${val}): Se coloca en la cima de la pila (LIFO).`,
          stackQueueState: [...stack.map(s => ({ ...s, active: false })), { value: val, active: true }]
        });
      });

      // Pop step
      if (stack.length > 0) {
        const popped = stack[stack.length - 1].value;
        stack.pop();
        steps.push({
          stepIndex: pushVals.length + 1,
          description: `Pop(): Se remueve el elemento superior (${popped}).`,
          stackQueueState: stack.map((s, i) => ({ ...s, active: i === stack.length - 1 }))
        });
      }

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 10. QUEUE (COLA)
  // ----------------------------------------------------
  {
    id: 'queue',
    name: 'Queue (Cola FIFO)',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Estructura FIFO (First-In, First-Out): el primer elemento en ingresar es el primero en ser atendido.',
    icon: '🚶‍♂️🚶‍♀️',
    difficulty: 'Principiante',
    complexity: {
      timeBest: 'O(1) Enqueue/Dequeue',
      timeAverage: 'O(1) Enqueue/Dequeue',
      timeWorst: 'O(1) Enqueue/Dequeue',
      spaceWorst: 'O(n)',
    },
    analogy: {
      title: 'Fila de espera para comprar tickets',
      description: 'La primera persona en llegar a la fila es atendida en la caja registradora primero (FIFO).',
      realLifeExample: 'Impresoras procesando cola de documentos de impresión y peticiones de red a un servidor Web.',
    },
    explanationMarkdown: `
### Estructura de Datos: Cola (Queue)
Operaciones:
- \`enqueue(x)\`: Añade un elemento al final de la cola (rear).
- \`dequeue()\`: Elimina y retorna el elemento del frente de la cola (front).
`,
    codeImplementations: {
      c: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int front, rear;
} Queue;

void init(Queue *q) { q->front = 0; q->rear = -1; }
void enqueue(Queue *q, int val) { q->data[++(q->rear)] = val; }
int dequeue(Queue *q) { return q->data[(q->front)++]; }`,
      cpp: `#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    q.push(10);
    q.push(20);
    std::cout << "Front: " << q.front() << "\\n"; // 10
    q.pop();
    return 0;
}`,
      python: `from collections import deque

q = deque()
q.append(10) # enqueue
q.append(20)
front = q.popleft() # dequeue -> 10`
    },
    initialVisualData: {},
    generateSteps: (customInput?: (number | string)[]) => {
      const steps: any[] = [];
      const queue: { value: string | number; active?: boolean }[] = [];

      steps.push({
        stepIndex: 0,
        description: 'Cola inicial vacía.',
        stackQueueState: []
      });

      const vals = customInput && customInput.length > 0 ? customInput : ['Cliente A', 'Cliente B', 'Cliente C'];
      vals.forEach((v, idx) => {
        queue.push({ value: v, active: true });
        steps.push({
          stepIndex: idx + 1,
          description: `Enqueue("${v}"): Ingresa al final de la cola.`,
          stackQueueState: [...queue]
        });
      });

      if (queue.length > 0) {
        const dequeued = queue[0].value;
        queue.shift();
        steps.push({
          stepIndex: vals.length + 1,
          description: `Dequeue(): Atendido "${dequeued}" (frente de la cola FIFO).`,
          stackQueueState: [...queue]
        });
      }

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 11. BREADTH-FIRST SEARCH (BFS)
  // ----------------------------------------------------
  {
    id: 'bfs',
    name: 'BFS (Búsqueda en Amplitud)',
    category: 'busqueda_grafos',
    categoryLabel: 'Grafos',
    subtitle: 'Explora un grafo nivel por nivel utilizando una Cola (Queue), ideal para encontrar la ruta más corta sin pesos.',
    icon: '🌊',
    difficulty: 'Intermedio',
    complexity: {
      timeBest: 'O(V + E)',
      timeAverage: 'O(V + E)',
      timeWorst: 'O(V + E)',
      spaceWorst: 'O(V)',
    },
    analogy: {
      title: 'Olas que se expanden al lanzar una piedra al agua',
      description: 'El impacto genera un círculo concéntrico inicial (distancia 1), luego el círculo se expande a la siguiente ronda (distancia 2), cubriendo todos los vecinos más cercanos antes de ir más lejos.',
      realLifeExample: 'Redes sociales encontrando conexiones de "primer grado", "segundo grado" y "tercer grado" con otros usuarios.',
    },
    explanationMarkdown: `
### Algoritmo BFS en Grafos
BFS recorre vértices en orden de distancia creciente desde el origen:
1. Marca el nodo origen como visitado y lo inserta en una Cola.
2. Mientras la Cola no esté vacía:
   - Extrae el nodo del frente de la cola.
   - Visita todos sus vecinos no explorados.
   - Marca cada vecino como visitado y lo encola.
3. Garantiza hallar la menor cantidad de aristas hasta cualquier destino.
`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdbool.h>

void bfs(int graph[5][5], int start, int n) {
    bool visited[5] = {false};
    int queue[100], front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;

    while (front < rear) {
        int curr = queue[front++];
        printf("%d ", curr);

        for (int i = 0; i < n; i++) {
            if (graph[curr][i] && !visited[i]) {
                visited[i] = true;
                queue[rear++] = i;
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

void bfs(int startNode, const std::vector<std::vector<int>>& adj) {
    std::vector<bool> visited(adj.size(), false);
    std::queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        std::cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=" ")
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`
    },
    initialVisualData: {
      defaultGraphNodes: [
        { id: 'A', label: 'Nodo A', x: 200, y: 50 },
        { id: 'B', label: 'Nodo B', x: 100, y: 150 },
        { id: 'C', label: 'Nodo C', x: 300, y: 150 },
        { id: 'D', label: 'Nodo D', x: 50, y: 250 },
        { id: 'E', label: 'Nodo E', x: 350, y: 250 }
      ],
      defaultGraphEdges: [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'E' }
      ]
    },
    generateSteps: (_customInput?: any) => {
      type NodeState = 'unvisited' | 'visiting' | 'visited' | 'current' | 'path';
      const nodes: { id: string; label: string; state: NodeState; x: number; y: number }[] = [
        { id: 'A', label: 'Nodo A', state: 'unvisited', x: 200, y: 50 },
        { id: 'B', label: 'Nodo B', state: 'unvisited', x: 100, y: 150 },
        { id: 'C', label: 'Nodo C', state: 'unvisited', x: 300, y: 150 },
        { id: 'D', label: 'Nodo D', state: 'unvisited', x: 50, y: 250 },
        { id: 'E', label: 'Nodo E', state: 'unvisited', x: 350, y: 250 }
      ];
      const edges = [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'E' }
      ];

      const steps: any[] = [];
      steps.push({
        stepIndex: 0,
        description: 'BFS Inicio: Ningún nodo visitado.',
        graphNodes: [...nodes],
        graphEdges: [...edges]
      });

      // Step 1: Start at A
      nodes[0].state = 'current';
      steps.push({
        stepIndex: 1,
        description: 'Iniciando BFS en Nodo origen A. Se agrega a la Cola.',
        graphNodes: JSON.parse(JSON.stringify(nodes)),
        graphEdges: [...edges]
      });

      // Neighbors B and C
      nodes[0].state = 'visited';
      nodes[1].state = 'visiting';
      nodes[2].state = 'visiting';
      steps.push({
        stepIndex: 2,
        description: 'Explorando vecinos directos de A -> Nodos B y C agregados a la Cola.',
        graphNodes: JSON.parse(JSON.stringify(nodes)),
        graphEdges: [...edges]
      });

      // Expand B -> D
      nodes[1].state = 'visited';
      nodes[3].state = 'visiting';
      steps.push({
        stepIndex: 3,
        description: 'Procesando B -> Vecino D descubierto y encolado.',
        graphNodes: JSON.parse(JSON.stringify(nodes)),
        graphEdges: [...edges]
      });

      // Expand C -> E
      nodes[2].state = 'visited';
      nodes[4].state = 'visiting';
      steps.push({
        stepIndex: 4,
        description: 'Procesando C -> Vecino E descubierto y encolado.',
        graphNodes: JSON.parse(JSON.stringify(nodes)),
        graphEdges: [...edges]
      });

      nodes[3].state = 'visited';
      nodes[4].state = 'visited';
      steps.push({
        stepIndex: 5,
        description: '¡Recorrido BFS completado para todos los nodos reachable!',
        graphNodes: JSON.parse(JSON.stringify(nodes)),
        graphEdges: [...edges]
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 12. DIJKSTRA'S ALGORITHM
  // ----------------------------------------------------
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm (Ruta Más Corta)",
    category: 'busqueda_grafos',
    categoryLabel: 'Grafos',
    subtitle: 'Encuentra las distancias mínimas desde un nodo origen a todos los demás en un grafo con pesos no negativos.',
    icon: '🗺️',
    difficulty: 'Avanzado',
    complexity: {
      timeBest: 'O((V + E) log V)',
      timeAverage: 'O((V + E) log V)',
      timeWorst: 'O((V + E) log V)',
      spaceWorst: 'O(V)',
    },
    analogy: {
      title: 'Sistema de Navegación GPS (Google Maps)',
      description: 'El GPS evalúa los tiempos de viaje (pesos de las carreteras) entre interseciones de calles para trazar la ruta de menor tiempo total hacia tu destino.',
      realLifeExample: 'Enrutadores BGP en la arquitectura de Internet buscando los saltos con menor latencia para transportar paquetes IP.',
    },
    explanationMarkdown: `
### Algoritmo de Dijkstra
1. Inicializa las distancias a todos los nodos como $\\infty$, excepto el nodo de inicio que se fija en \`dist[start] = 0\`.
2. Utiliza una **Pila de Prioridad (Min Heap)** para extraer siempre el nodo con menor distancia tentativamente conocida.
3. Para cada vecino \`v\` de \`u\`, si \`dist[u] + weight(u, v) < dist[v]\`, actualiza (**relaja**) la distancia \`dist[v]\`.
`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdbool.h>
#define INF 999999
#define V 5

int minDistance(int dist[], bool sptSet[]) {
    int min = INF, min_index = -1;
    for (int v = 0; v < V; v++)
        if (!sptSet[v] && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V] = {false};
    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;
        sptSet[u] = true;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

void dijkstra(int src, const std::vector<std::vector<std::pair<int, int>>>& adj) {
    int n = adj.size();
    std::vector<int> dist(n, 1e9);
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}`,
      python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, u = heapq.heappop(pq)
        if current_dist > distances[u]:
            continue
            
        for v, weight in graph[u].items():
            distance = current_dist + weight
            if distance < distances[v]:
                distances[v] = distance
                heapq.heappush(pq, (distance, v))
    return distances`
    },
    initialVisualData: {},
    generateSteps: () => {
      type NodeState = 'unvisited' | 'visiting' | 'visited' | 'current' | 'path';
      const steps: any[] = [];
      steps.push({
        stepIndex: 0,
        description: 'Dijkstra Inicialización: dist[Origen] = 0, dist[Resto] = ∞.',
        graphNodes: [
          { id: 'S', label: 'Start (0)', state: 'current' as NodeState, distance: '0', x: 100, y: 150 },
          { id: 'A', label: 'A (∞)', state: 'unvisited' as NodeState, distance: '∞', x: 250, y: 80 },
          { id: 'B', label: 'B (∞)', state: 'unvisited' as NodeState, distance: '∞', x: 250, y: 220 },
          { id: 'D', label: 'Dest (∞)', state: 'unvisited' as NodeState, distance: '∞', x: 400, y: 150 }
        ],
        graphEdges: [
          { from: 'S', to: 'A', weight: 4 },
          { from: 'S', to: 'B', weight: 2 },
          { from: 'A', to: 'D', weight: 3 },
          { from: 'B', to: 'A', weight: 1 },
          { from: 'B', to: 'D', weight: 5 }
        ]
      });

      steps.push({
        stepIndex: 1,
        description: 'Relajando aristas desde S: A recibe dist 4, B recibe dist 2.',
        graphNodes: [
          { id: 'S', label: 'Start (0)', state: 'visited' as NodeState, distance: '0', x: 100, y: 150 },
          { id: 'A', label: 'A (4)', state: 'visiting' as NodeState, distance: '4', x: 250, y: 80 },
          { id: 'B', label: 'B (2)', state: 'current' as NodeState, distance: '2', x: 250, y: 220 },
          { id: 'D', label: 'Dest (∞)', state: 'unvisited' as NodeState, distance: '∞', x: 400, y: 150 }
        ]
      });

      steps.push({
        stepIndex: 2,
        description: 'Procesando B (dist 2): Arista B->A peso 1 relaja la distancia de A de 4 a 3 (2 + 1 = 3).',
        graphNodes: [
          { id: 'S', label: 'Start (0)', state: 'visited' as NodeState, distance: '0', x: 100, y: 150 },
          { id: 'A', label: 'A (3)', state: 'current' as NodeState, distance: '3', x: 250, y: 80 },
          { id: 'B', label: 'B (2)', state: 'visited' as NodeState, distance: '2', x: 250, y: 220 },
          { id: 'D', label: 'Dest (7)', state: 'visiting' as NodeState, distance: '7', x: 400, y: 150 }
        ]
      });

      steps.push({
        stepIndex: 3,
        description: 'Procesando A (dist 3): Arista A->D peso 3 relaja Dest a 6 (3 + 3 = 6 < 7). Ruta más corta final = 6.',
        graphNodes: [
          { id: 'S', label: 'Start (0)', state: 'visited' as NodeState, distance: '0', x: 100, y: 150 },
          { id: 'A', label: 'A (3)', state: 'visited' as NodeState, distance: '3', x: 250, y: 80 },
          { id: 'B', label: 'B (2)', state: 'visited' as NodeState, distance: '2', x: 250, y: 220 },
          { id: 'D', label: 'Dest (6)', state: 'visited' as NodeState, distance: '6', x: 400, y: 150 }
        ]
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 13. 0/1 KNAPSACK PROBLEM (DP)
  // ----------------------------------------------------
  {
    id: 'knapsack-dp',
    name: '0/1 Knapsack (Mochila con Prog. Dinámica)',
    category: 'dp_backtracking',
    categoryLabel: 'Programación Dinámica',
    subtitle: 'Maximiza el valor acumulado en una mochila de capacidad límite W seleccionando o descartando objetos.',
    icon: '🎒',
    difficulty: 'Avanzado',
    complexity: {
      timeBest: 'O(n * W)',
      timeAverage: 'O(n * W)',
      timeWorst: 'O(n * W)',
      spaceWorst: 'O(n * W)',
    },
    analogy: {
      title: 'Un explorador empacando suministros para una expedición',
      description: 'Tu mochila resiste un peso máximo de 5 kg. Cada artículo tiene un peso y un valor de utilidad. Debes decidir si incluir o excluir cada ítem para obtener la máxima utilidad total.',
      realLifeExample: 'Presupuesto de inversión en bolsa de valores escogiendo proyectos con retorno financiero óptimo dada una restricción de capital.',
    },
    explanationMarkdown: `
### Problema de la Mochila 0/1
Se define la matriz de subproblemas \`dp[i][w]\` como el valor máximo alcanzable con los primeros \`i\` objetos y un límite de peso de \`w\`:
- Si el objeto actual pesa más que la capacidad disponible \`weights[i-1] > w\`:
  \`dp[i][w] = dp[i-1][w]\`
- De lo contrario, elegimos el máximo entre no incluir el objeto o incluirlo:
  \`dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])\`
`,
    codeImplementations: {
      c: `#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack(int W, int wt[], int val[], int n) {
    int K[n + 1][W + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) K[i][w] = 0;
            else if (wt[i - 1] <= w)
                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }
    return K[n][W];
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

int knapsack(int W, const std::vector<int>& wt, const std::vector<int>& val) {
    int n = wt.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int w = 1; w <= W; ++w) {
            if (wt[i - 1] <= w) {
                dp[i][w] = std::max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
      python: `def knapsack(W, wt, val):
    n = len(wt)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`
    },
    initialVisualData: {},
    generateSteps: () => {
      const steps: any[] = [];
      const weights = [2, 3, 4];
      const values = [3, 4, 5];
      const W = 5;

      const matrix = Array.from({ length: 4 }, () => Array(W + 1).fill(0));

      steps.push({
        stepIndex: 0,
        description: 'Matriz DP 0/1 Knapsack inicializada en 0.',
        dpGrid: {
          rowLabels: ['Base (0)', 'Item 1 (w:2,v:3)', 'Item 2 (w:3,v:4)', 'Item 3 (w:4,v:5)'],
          colLabels: ['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5'],
          matrix: matrix.map(row => [...row])
        }
      });

      // Fill Item 1
      matrix[1] = [0, 0, 3, 3, 3, 3];
      steps.push({
        stepIndex: 1,
        description: 'Procesando Item 1 (Peso=2, Valor=3): Puede incluirse para capacidades W >= 2.',
        dpGrid: {
          rowLabels: ['Base (0)', 'Item 1 (w:2,v:3)', 'Item 2 (w:3,v:4)', 'Item 3 (w:4,v:5)'],
          colLabels: ['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5'],
          matrix: matrix.map(row => [...row]),
          activeCell: [1, 5]
        }
      });

      // Fill Item 2
      matrix[2] = [0, 0, 3, 4, 4, 7];
      steps.push({
        stepIndex: 2,
        description: 'Procesando Item 2 (Peso=3, Valor=4): En W=5 combinamos Item 1 + Item 2 para Valor = 7.',
        dpGrid: {
          rowLabels: ['Base (0)', 'Item 1 (w:2,v:3)', 'Item 2 (w:3,v:4)', 'Item 3 (w:4,v:5)'],
          colLabels: ['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5'],
          matrix: matrix.map(row => [...row]),
          activeCell: [2, 5]
        }
      });

      matrix[3] = [0, 0, 3, 4, 5, 7];
      steps.push({
        stepIndex: 3,
        description: '¡Solución óptima alcanzada! Valor Máximo acumulado en dp[3][5] = 7.',
        dpGrid: {
          rowLabels: ['Base (0)', 'Item 1 (w:2,v:3)', 'Item 2 (w:3,v:4)', 'Item 3 (w:4,v:5)'],
          colLabels: ['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5'],
          matrix: matrix.map(row => [...row]),
          activeCell: [3, 5]
        }
      });

      return steps;
    },
    exercises: []
  },

  // ----------------------------------------------------
  // 14. N-QUEENS BACKTRACKING
  // ----------------------------------------------------
  {
    id: 'n-queens',
    name: 'N-Reinas (N-Queens Backtracking)',
    category: 'dp_backtracking',
    categoryLabel: 'Backtracking',
    subtitle: 'Coloca N reinas en un tablero de ajedrez N×N de modo que ninguna reina se amenace mutuamente.',
    icon: '👑',
    difficulty: 'Avanzado',
    complexity: {
      timeBest: 'O(N!)',
      timeAverage: 'O(N!)',
      timeWorst: 'O(N!)',
      spaceWorst: 'O(N)',
    },
    analogy: {
      title: 'Ubicación de antenas de alta frecuencia sin interferencia',
      description: 'Tratas de posicionar antenas transmisoras en una cuadrícula. Si dos antenas quedan en la misma fila, columna o diagonal, sus señales colisionan y debes retroceder (Backtrack) para mover la última antena colocada.',
      realLifeExample: 'Asignación de turnos de guardia sin conflictos de horario entre especialistas.',
    },
    explanationMarkdown: `
### Algoritmo de Backtracking (N-Reinas)
1. Coloca una reina fila por fila.
2. Para la fila actual, prueba cada columna de 0 a N-1.
3. Verifica si la posición es segura (sin reinas previas en la misma columna o diagonales).
4. Si es segura, coloca la reina y avanza recursivamente a la siguiente fila.
5. Si la llamada recursiva falla (no encuentra solución más adelante), **retira la reina (Backtrack)** y prueba la siguiente columna.
`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdbool.h>
#define N 4

void printSolution(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) printf("%d ", board[i][j]);
        printf("\\n");
    }
}

bool isSafe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++) if (board[row][i]) return false;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (int i = row, j = col; j >= 0 && i < N; i++, j--) if (board[i][j]) return false;
    return true;
}

bool solveNQUtil(int board[N][N], int col) {
    if (col >= N) return true;
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQUtil(board, col + 1)) return true;
            board[i][col] = 0; // BACKTRACK
        }
    }
    return false;
}`,
      cpp: `#include <iostream>
#include <vector>

bool isSafe(const std::vector<std::vector<int>>& board, int row, int col, int n) {
    for (int i = 0; i < col; ++i) if (board[row][i]) return false;
    for (int i = row, j = col; i >= 0 && j >= 0; --i, --j) if (board[i][j]) return false;
    for (int i = row, j = col; i < n && j >= 0; ++i, --j) if (board[i][j]) return false;
    return true;
}

bool solveNQ(std::vector<std::vector<int>>& board, int col, int n) {
    if (col >= n) return true;
    for (int i = 0; i < n; ++i) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQ(board, col + 1, n)) return true;
            board[i][col] = 0; // Backtrack
        }
    }
    return false;
}`,
      python: `def solve_n_queens(n):
    board = [[0] * n for _ in range(n)]
    
    def is_safe(row, col):
        for i in range(col):
            if board[row][i]: return False
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j]: return False
        for i, j in zip(range(row, n, 1), range(col, -1, -1)):
            if board[i][j]: return False
        return True

    def backtrack(col):
        if col >= n: return True
        for i in range(n):
            if is_safe(i, col):
                board[i][col] = 1
                if backtrack(col + 1): return True
                board[i][col] = 0 # Backtrack
        return False

    backtrack(0)
    return board`
    },
    initialVisualData: {},
    generateSteps: (_customInput?: any) => {
      const steps: any[] = [];
      const board = [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ];

      steps.push({
        stepIndex: 0,
        description: 'Tablero vacio 4x4.',
        dpGrid: {
          rowLabels: ['Fila 0', 'Fila 1', 'Fila 2', 'Fila 3'],
          colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
          matrix: board.map(r => [...r])
        }
      });

      board[1][0] = '👑';
      steps.push({
        stepIndex: 1,
        description: 'Colocando Reina 1 en Fila 1, Columna 0.',
        dpGrid: {
          rowLabels: ['Fila 0', 'Fila 1', 'Fila 2', 'Fila 3'],
          colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
          matrix: board.map(r => [...r]),
          activeCell: [1, 0]
        }
      });

      board[3][1] = '👑';
      steps.push({
        stepIndex: 2,
        description: 'Colocando Reina 2 en Fila 3, Columna 1 (Posición segura).',
        dpGrid: {
          rowLabels: ['Fila 0', 'Fila 1', 'Fila 2', 'Fila 3'],
          colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
          matrix: board.map(r => [...r]),
          activeCell: [3, 1]
        }
      });

      board[0][2] = '👑';
      board[2][3] = '👑';
      steps.push({
        stepIndex: 3,
        description: '¡Solución válida para N-Reinas en 4x4 alcanzada sin conflictos!',
        dpGrid: {
          rowLabels: ['Fila 0', 'Fila 1', 'Fila 2', 'Fila 3'],
          colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
          matrix: board.map(r => [...r])
        }
      });

      return steps;
    },
    exercises: []
  }
];
