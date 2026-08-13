import { AlgoVisualStep } from '../types';
import { VisualizerPreset } from '../components/AlgorithmVisualizer';

// ============================================================================
// 1. MERGE SORT (CLRS Cormen Cap 2.3 - Divide y Vencerás)
// ============================================================================
export const MERGE_SORT_PSEUDOCODE = `MERGE-SORT(A, p, r)
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
14.     A[k] = R[j];  j = j + 1`;

export const MERGE_SORT_PRESETS: VisualizerPreset<number[]>[] = [
  {
    id: 'default',
    label: 'Arreglo Estándar (CLRS)',
    description: 'Ejemplo clásico del libro Cormen con 7 elementos desordenados.',
    input: [38, 27, 43, 3, 9, 82, 10]
  },
  {
    id: 'reversed',
    label: 'Arreglo Invertido',
    description: 'Arreglo ordenado descendentemente para observar máximo número de divisiones.',
    input: [90, 70, 50, 40, 30, 20, 10]
  },
  {
    id: 'small',
    label: 'Arreglo Pequeño',
    description: 'Simulación rápida de 4 elementos.',
    input: [12, 5, 8, 2]
  }
];

export function generateMergeSortSteps(initialArr: number[]): AlgoVisualStep[] {
  const arr = [...initialArr];
  const steps: AlgoVisualStep[] = [];
  let stepCounter = 0;

  // Initial step
  steps.push({
    stepIndex: stepCounter++,
    description: `Estado inicial del arreglo con ${arr.length} elementos desordenados.`,
    arrayState: [...arr],
    highlightIndices: [],
    sortedIndices: [],
    codeLine: 1,
    variables: { n: arr.length, p: 0, r: arr.length - 1 }
  });

  function mergeSortHelper(p: number, r: number) {
    steps.push({
      stepIndex: stepCounter++,
      description: `Llamada a MERGE-SORT(A, p=${p}, r=${r}). Verificando condición if (${p} < ${r}).`,
      arrayState: [...arr],
      subarrayRange: [p, r],
      codeLine: 1,
      variables: { p, r, 'p < r': p < r }
    });

    if (p < r) {
      const q = Math.floor((p + r) / 2);

      steps.push({
        stepIndex: stepCounter++,
        description: `Calculando punto medio q = ⌊(${p} + ${r}) / 2⌋ = ${q}.`,
        arrayState: [...arr],
        subarrayRange: [p, r],
        activePointers: [
          { label: 'p', index: p, color: '#3B82F6' },
          { label: 'q', index: q, color: '#C2410C' },
          { label: 'r', index: r, color: '#2563EB' }
        ],
        codeLine: 2,
        variables: { p, q, r, 'mitad_izq': `[${p}..${q}]`, 'mitad_der': `[${q + 1}..${r}]` }
      });

      steps.push({
        stepIndex: stepCounter++,
        description: `Dividiendo: Llamada recursiva izquierda MERGE-SORT(A, ${p}, ${q}).`,
        arrayState: [...arr],
        subarrayRange: [p, q],
        codeLine: 3,
        variables: { p, q, r }
      });
      mergeSortHelper(p, q);

      steps.push({
        stepIndex: stepCounter++,
        description: `Dividiendo: Llamada recursiva derecha MERGE-SORT(A, ${q + 1}, ${r}).`,
        arrayState: [...arr],
        subarrayRange: [q + 1, r],
        codeLine: 4,
        variables: { p, q, r }
      });
      mergeSortHelper(q + 1, r);

      // MERGE Execution
      steps.push({
        stepIndex: stepCounter++,
        description: `Iniciando MERGE(A, p=${p}, q=${q}, r=${r}) para combinar subarreglos ordenados.`,
        arrayState: [...arr],
        subarrayRange: [p, r],
        codeLine: 5,
        variables: { p, q, r }
      });

      const n1 = q - p + 1;
      const n2 = r - q;
      const L = arr.slice(p, q + 1);
      const R = arr.slice(q + 1, r + 1);

      steps.push({
        stepIndex: stepCounter++,
        description: `Creando arreglos temporales auxiliares: L de tamaño ${n1} y R de tamaño ${n2}.`,
        arrayState: [...arr],
        subarrayRange: [p, r],
        tempArrays: [
          { label: 'Subarreglo Izquierdo (L)', values: [...L], color: '#3B82F6' },
          { label: 'Subarreglo Derecho (R)', values: [...R], color: '#2563EB' }
        ],
        codeLine: 7,
        variables: { n1, n2, p, q, r }
      });

      steps.push({
        stepIndex: stepCounter++,
        description: `Copiando A[${p}..${q}] en L = [${L.join(', ')}] y A[${q + 1}..${r}] en R = [${R.join(', ')}].`,
        arrayState: [...arr],
        subarrayRange: [p, r],
        tempArrays: [
          { label: 'L', values: [...L] },
          { label: 'R', values: [...R] }
        ],
        codeLine: 8,
        variables: { p, q, r, L: L.join(','), R: R.join(',') }
      });

      let i = 0;
      let j = 0;
      let k = p;

      steps.push({
        stepIndex: stepCounter++,
        description: `Inicializando índices de lectura i = 1 (L), j = 1 (R) y puntero de escritura k = ${p}.`,
        arrayState: [...arr],
        subarrayRange: [p, r],
        tempArrays: [
          { label: 'L', values: [...L], activeIndex: 0 },
          { label: 'R', values: [...R], activeIndex: 0 }
        ],
        codeLine: 9,
        variables: { i: 1, j: 1, k: p }
      });

      while (i < L.length && j < R.length) {
        const valL = L[i];
        const valR = R[j];

        steps.push({
          stepIndex: stepCounter++,
          description: `Comparando L[${i + 1}] (${valL}) <= R[${j + 1}] (${valR}).`,
          arrayState: [...arr],
          subarrayRange: [p, r],
          highlightIndices: [k],
          activePointers: [{ label: 'k', index: k, color: '#C2410C' }],
          tempArrays: [
            { label: 'L', values: [...L], activeIndex: i },
            { label: 'R', values: [...R], activeIndex: j }
          ],
          codeLine: 11,
          variables: { 'L[i]': valL, 'R[j]': valR, 'L[i] <= R[j]': valL <= valR, k }
        });

        if (valL <= valR) {
          arr[k] = valL;
          steps.push({
            stepIndex: stepCounter++,
            description: `L[${i + 1}] (${valL}) es menor o igual -> Colocando ${valL} en A[${k}] e incrementando i.`,
            arrayState: [...arr],
            subarrayRange: [p, r],
            highlightIndices: [k],
            swapIndices: [k],
            tempArrays: [
              { label: 'L', values: [...L], activeIndex: i },
              { label: 'R', values: [...R], activeIndex: j }
            ],
            codeLine: 12,
            variables: { 'A[k]': valL, i: i + 2, k: k + 1 }
          });
          i++;
        } else {
          arr[k] = valR;
          steps.push({
            stepIndex: stepCounter++,
            description: `R[${j + 1}] (${valR}) es menor -> Colocando ${valR} en A[${k}] e incrementando j.`,
            arrayState: [...arr],
            subarrayRange: [p, r],
            highlightIndices: [k],
            swapIndices: [k],
            tempArrays: [
              { label: 'L', values: [...L], activeIndex: i },
              { label: 'R', values: [...R], activeIndex: j }
            ],
            codeLine: 14,
            variables: { 'A[k]': valR, j: j + 2, k: k + 1 }
          });
          j++;
        }
        k++;
      }

      // Copy remaining elements of L
      while (i < L.length) {
        arr[k] = L[i];
        steps.push({
          stepIndex: stepCounter++,
          description: `Copiando elemento restante de L: ${L[i]} en A[${k}].`,
          arrayState: [...arr],
          subarrayRange: [p, r],
          highlightIndices: [k],
          tempArrays: [{ label: 'L (Restantes)', values: L.slice(i) }],
          codeLine: 12,
          variables: { 'A[k]': L[i], k }
        });
        i++;
        k++;
      }

      // Copy remaining elements of R
      while (j < R.length) {
        arr[k] = R[j];
        steps.push({
          stepIndex: stepCounter++,
          description: `Copiando elemento restante de R: ${R[j]} en A[${k}].`,
          arrayState: [...arr],
          subarrayRange: [p, r],
          highlightIndices: [k],
          tempArrays: [{ label: 'R (Restantes)', values: R.slice(j) }],
          codeLine: 14,
          variables: { 'A[k]': R[j], k }
        });
        j++;
        k++;
      }

      steps.push({
        stepIndex: stepCounter++,
        description: `Subarreglo A[${p}..${r}] completamente mezclado y ordenado: [${arr.slice(p, r + 1).join(', ')}].`,
        arrayState: [...arr],
        sortedIndices: Array.from({ length: r - p + 1 }, (_, idx) => p + idx),
        codeLine: 5,
        variables: { subarreglo_ordenado: arr.slice(p, r + 1).join(', ') }
      });
    }
  }

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    stepIndex: stepCounter++,
    description: '¡Proceso Merge Sort completado con éxito! Arreglo totalmente ordenado.',
    arrayState: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    codeLine: 1,
    variables: { estado: 'Completado', resultado: arr.join(', ') }
  });

  return steps;
}

// ============================================================================
// 2. DIJKSTRA (CLRS Cormen Cap 24.3 - Grafos)
// ============================================================================
export const DIJKSTRA_PSEUDOCODE = `DIJKSTRA(G, w, s)
 1. INITIALIZE-SINGLE-SOURCE(G, s)
 2. S = ∅
 3. Q = G.V
 4. while Q ≠ ∅
 5.     u = EXTRACT-MIN(Q)
 6.     S = S ∪ {u}
 7.     for cada vértice v ∈ G.Adj[u]
 8.         RELAX(u, v, w)`;

export interface DijkstraInput {
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { from: string; to: string; weight: number }[];
  startNodeId: string;
}

export const DIJKSTRA_PRESETS: VisualizerPreset<DijkstraInput>[] = [
  {
    id: 'default',
    label: 'Grafo Ponderado 5 Nodos',
    description: 'Grafo estándar con pesos positivos y rutas alternativas.',
    input: {
      startNodeId: 'S',
      nodes: [
        { id: 'S', label: 'Origen (S)', x: 70, y: 130 },
        { id: 'A', label: 'Nodo A', x: 210, y: 60 },
        { id: 'B', label: 'Nodo B', x: 210, y: 200 },
        { id: 'C', label: 'Nodo C', x: 350, y: 60 },
        { id: 'D', label: 'Destino (D)', x: 350, y: 200 }
      ],
      edges: [
        { from: 'S', to: 'A', weight: 10 },
        { from: 'S', to: 'B', weight: 5 },
        { from: 'B', to: 'A', weight: 3 },
        { from: 'A', to: 'C', weight: 1 },
        { from: 'B', to: 'C', weight: 9 },
        { from: 'B', to: 'D', weight: 2 },
        { from: 'C', to: 'D', weight: 4 }
      ]
    }
  }
];

export function generateDijkstraSteps(input: DijkstraInput): AlgoVisualStep[] {
  const steps: AlgoVisualStep[] = [];
  let stepCounter = 0;

  const { nodes, edges, startNodeId } = input;
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const S_set: string[] = [];
  const Q: string[] = [];

  nodes.forEach((n) => {
    dist[n.id] = n.id === startNodeId ? 0 : Infinity;
    prev[n.id] = null;
    Q.push(n.id);
  });

  const getGraphState = (currentNodeId?: string, visitingNodeId?: string) => {
    return nodes.map((n) => {
      let state: 'unvisited' | 'visiting' | 'visited' | 'current' = 'unvisited';
      if (S_set.includes(n.id)) state = 'visited';
      if (visitingNodeId === n.id) state = 'visiting';
      if (currentNodeId === n.id) state = 'current';

      const distanceStr = dist[n.id] === Infinity ? '∞' : `${dist[n.id]}`;
      return {
        id: n.id,
        label: `${n.id} (${distanceStr})`,
        state,
        distance: `dist: ${distanceStr}`,
        x: n.x,
        y: n.y
      };
    });
  };

  steps.push({
    stepIndex: stepCounter++,
    description: `INITIALIZE-SINGLE-SOURCE: Distancia origen dist[${startNodeId}] = 0, resto ∞.`,
    graphNodes: getGraphState(),
    graphEdges: edges.map((e) => ({ ...e, highlighted: false })),
    codeLine: 1,
    variables: { s: startNodeId, 'dist[s]': 0, 'S': '∅', 'Q': Q.join(', ') }
  });

  steps.push({
    stepIndex: stepCounter++,
    description: `S = ∅ (conjunto procesado). Cola Q contiene todos los ${Q.length} vértices.`,
    graphNodes: getGraphState(),
    graphEdges: edges.map((e) => ({ ...e, highlighted: false })),
    codeLine: 2,
    variables: { S: '∅', Q: Q.join(', ') }
  });

  while (Q.length > 0) {
    // EXTRACT-MIN
    Q.sort((a, b) => dist[a] - dist[b]);
    const u = Q.shift()!;

    steps.push({
      stepIndex: stepCounter++,
      description: `while Q != ∅: EXTRACT-MIN(Q) extrae nodo u = ${u} con menor distancia dist[${u}] = ${dist[u]}.`,
      graphNodes: getGraphState(u),
      graphEdges: edges.map((e) => ({ ...e, highlighted: e.from === u })),
      codeLine: 5,
      variables: { u, 'dist[u]': dist[u], Q: Q.join(', ') || 'vacía' }
    });

    S_set.push(u);

    steps.push({
      stepIndex: stepCounter++,
      description: `Agregando ${u} a S = {${S_set.join(', ')}}. Nodo ${u} queda asentado.`,
      graphNodes: getGraphState(u),
      graphEdges: edges.map((e) => ({ ...e, highlighted: false })),
      codeLine: 6,
      variables: { S: `{${S_set.join(', ')}}`, u }
    });

    // Relax neighbors
    const neighbors = edges.filter((e) => e.from === u);
    for (const edge of neighbors) {
      const v = edge.to;
      const weight = edge.weight;

      steps.push({
        stepIndex: stepCounter++,
        description: `Evaluando vecino v = ${v} desde u = ${u} (peso w = ${weight}).`,
        graphNodes: getGraphState(u, v),
        graphEdges: edges.map((e) => ({
          ...e,
          highlighted: e.from === u && e.to === v
        })),
        codeLine: 7,
        variables: { u, v, weight, 'dist[u]': dist[u], 'dist[v]': dist[v] === Infinity ? '∞' : dist[v] }
      });

      if (dist[u] + weight < dist[v]) {
        const oldDist = dist[v] === Infinity ? '∞' : dist[v];
        dist[v] = dist[u] + weight;
        prev[v] = u;

        steps.push({
          stepIndex: stepCounter++,
          description: `¡RELAX exitoso! Nueva ruta más corta hacia ${v}: ${dist[u]} + ${weight} = ${dist[v]} < ${oldDist}.`,
          graphNodes: getGraphState(u, v),
          graphEdges: edges.map((e) => ({
            ...e,
            highlighted: e.from === u && e.to === v
          })),
          codeLine: 8,
          variables: { 'dist[v]': dist[v], 'pi[v]': u }
        });
      }
    }
  }

  steps.push({
    stepIndex: stepCounter++,
    description: '¡Algoritmo de Dijkstra completado! Se han calculado las distancias mínimas a todos los nodos.',
    graphNodes: nodes.map((n) => ({
      id: n.id,
      label: `${n.id} (${dist[n.id]})`,
      state: 'visited' as const,
      distance: `dist: ${dist[n.id]}`,
      x: n.x,
      y: n.y
    })),
    graphEdges: edges.map((e) => ({ ...e, highlighted: false })),
    codeLine: 4,
    variables: { estado: 'Completado', distancias_finales: JSON.stringify(dist) }
  });

  return steps;
}

// ============================================================================
// 3. 0/1 KNAPSACK (CLRS Cormen Cap 16 / Prog. Dinámica)
// ============================================================================
export const KNAPSACK_PSEUDOCODE = `KNAPSACK(w, v, n, W)
 1. Inicializar K[0..n, 0..W] = 0
 2. for i = 1 to n
 3.     for w_cap = 1 to W
 4.         if wt[i-1] <= w_cap
 5.             K[i, w_cap] = max(v[i-1] + K[i-1, w_cap - wt[i-1]], K[i-1, w_cap])
 6.         else
 7.             K[i, w_cap] = K[i-1, w_cap]
 8. return K[n, W]`;

export interface KnapsackInput {
  items: { name: string; weight: number; value: number }[];
  capacity: number;
}

export const KNAPSACK_PRESETS: VisualizerPreset<KnapsackInput>[] = [
  {
    id: 'default',
    label: 'Mochila Estándar (W=5)',
    description: '3 ítems con capacidad de 5 kg.',
    input: {
      capacity: 5,
      items: [
        { name: 'Gato A', weight: 2, value: 3 },
        { name: 'Brújula B', weight: 3, value: 4 },
        { name: 'Linterna C', weight: 4, value: 5 }
      ]
    }
  },
  {
    id: 'tight',
    label: 'Capacidad Reducida (W=4)',
    description: 'Capacidad justa para obligar a elegir el mejor ratio valor/peso.',
    input: {
      capacity: 4,
      items: [
        { name: 'Oro', weight: 3, value: 30 },
        { name: 'Plata', weight: 2, value: 20 },
        { name: 'Bronce', weight: 1, value: 10 }
      ]
    }
  }
];

export function generateKnapsackSteps(input: KnapsackInput): AlgoVisualStep[] {
  const steps: AlgoVisualStep[] = [];
  let stepCounter = 0;

  const { items, capacity: W } = input;
  const n = items.length;

  const rowLabels = ['0 (Sin ítems)', ...items.map((it, idx) => `${idx + 1}. ${it.name} (w=${it.weight}, v=${it.value})`)];
  const colLabels = Array.from({ length: W + 1 }, (_, c) => `w=${c}`);

  // Matrix initialized with 0
  const matrix: (number | string)[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  steps.push({
    stepIndex: stepCounter++,
    description: `Inicializando tabla DP K[0..${n}, 0..${W}] con ceros (caso base).`,
    dpGrid: {
      rowLabels,
      colLabels,
      matrix: matrix.map((r) => [...r]),
      activeCell: [0, 0]
    },
    codeLine: 1,
    variables: { n, W, capacidad: W }
  });

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];

    steps.push({
      stepIndex: stepCounter++,
      description: `Iniciando iteración i = ${i} para ítem "${item.name}" (Peso=${item.weight}, Valor=${item.value}).`,
      dpGrid: {
        rowLabels,
        colLabels,
        matrix: matrix.map((r) => [...r]),
        activeCell: [i, 0]
      },
      codeLine: 2,
      variables: { i, 'item': item.name, 'wt[i-1]': item.weight, 'v[i-1]': item.value }
    });

    for (let w = 1; w <= W; w++) {
      steps.push({
        stepIndex: stepCounter++,
        description: `Evaluando celda K[${i}, ${w}] con capacidad w = ${w}.`,
        dpGrid: {
          rowLabels,
          colLabels,
          matrix: matrix.map((r) => [...r]),
          activeCell: [i, w]
        },
        codeLine: 3,
        variables: { i, w, 'wt[i-1]': item.weight, 'v[i-1]': item.value }
      });

      if (item.weight <= w) {
        const incl = item.value + (matrix[i - 1][w - item.weight] as number);
        const excl = matrix[i - 1][w] as number;
        const best = Math.max(incl, excl);
        matrix[i][w] = best;

        steps.push({
          stepIndex: stepCounter++,
          description: `wt (${item.weight}) <= w (${w}) -> max(Incluir: ${item.value} + K[${i - 1}, ${w - item.weight}] = ${incl}, Excluir: K[${i - 1}, ${w}] = ${excl}) = ${best}.`,
          dpGrid: {
            rowLabels,
            colLabels,
            matrix: matrix.map((r) => [...r]),
            activeCell: [i, w]
          },
          codeLine: 5,
          variables: { 'opcion_incluir': incl, 'opcion_excluir': excl, 'K[i,w]': best }
        });
      } else {
        const excl = matrix[i - 1][w] as number;
        matrix[i][w] = excl;

        steps.push({
          stepIndex: stepCounter++,
          description: `wt (${item.weight}) > w (${w}) -> El ítem excede la capacidad. Heredando valor anterior: ${excl}.`,
          dpGrid: {
            rowLabels,
            colLabels,
            matrix: matrix.map((r) => [...r]),
            activeCell: [i, w]
          },
          codeLine: 7,
          variables: { 'excede_peso': true, 'K[i,w]': excl }
        });
      }
    }
  }

  const finalVal = matrix[n][W];

  steps.push({
    stepIndex: stepCounter++,
    description: `¡Programación Dinámica finalizada! El valor óptimo máximo almacenable en la mochila es ${finalVal}.`,
    dpGrid: {
      rowLabels,
      colLabels,
      matrix: matrix.map((r) => [...r]),
      activeCell: [n, W]
    },
    codeLine: 8,
    variables: { 'valor_optimo_maximo': finalVal }
  });

  return steps;
}
