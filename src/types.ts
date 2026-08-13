export type VisualizerType =
  | 'none'
  | 'memory_pointers'
  | 'linked_list'
  | 'recursion_tree'
  | 'binary_tree'
  | 'big_o_chart'
  | 'sorting'
  | 'graph_bfs_dfs'
  | 'dijkstra'
  | 'dynamic_programming';

export interface CheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  analogousExplanation?: string;
}

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  cormenRef: string;
  initialCode: string;
  solutionCode: string;
  hint: string;
  testCases: TestCase[];
  explanation: string;
}

export interface AnalogyItem {
  title: string;
  concept: string;
  analogy: string;
  whyItWorks: string;
}

export interface DeepeningSubclass {
  title: string;
  subtitle: string;
  moreTopicsContent: string;
  analogies: AnalogyItem[];
  alternativeExplanation: string;
}

export interface PracticeProblem {
  title: string;
  problemStatement: string;
  stepByStepSolution: string;
  keyTakeaway: string;
}

export interface PracticeSubclass {
  title: string;
  appliedTheory: string;
  solvedProblem: PracticeProblem;
  exercises: Exercise[];
  quizQuestions: CheckQuestion[];
}

export interface CourseItem {
  id: string;
  number: number;
  type: 'class' | 'workshop' | 'review';
  title: string;
  topic: string;
  cormenChapter: string;
  durationMinutes: number;
  summary: string;
  theoryContent: string; // Markdown / HTML styled text
  checkQuestions: CheckQuestion[];
  exercises: Exercise[];
  visualizerType: VisualizerType;
  deepeningSubclass?: DeepeningSubclass;
  practiceSubclass?: PracticeSubclass;
  nextItemId?: string;
  prevItemId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface CSubTopic {
  id: string;
  number: string;
  title: string;
  description: string;
  explanationMarkdown: string;
  codeExample: string;
  expectedOutput?: string;
  keyConcepts: string[];
  exercise?: Exercise;
}

export interface CChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  summary?: string;
  theoryContent: string;
  analogies?: AnalogyItem[];
  keyConcepts: string[];
  codeExamples: {
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
  }[];
  exercises: Exercise[];
  quizQuestions: CheckQuestion[];
  subtopics?: CSubTopic[];
}

export interface UserProfile {
  nickname: string;
  university: string;
  avatar: string;
  customTitle: string;
  lastVisitDate: string;
  streakDays: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xpReward: number;
  category: 'c_course' | 'algorithms' | 'streak' | 'general';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  university: string;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  solvedCount: number;
  badgeCount: number;
  title: string;
  isCurrentUser?: boolean;
  rank?: number;
}


export type AlgoCategory =
  | 'conceptos'
  | 'estructuras'
  | 'ordenamiento'
  | 'busqueda_grafos'
  | 'dp_backtracking';

export interface AlgoComplexity {
  timeBest: string;
  timeAverage: string;
  timeWorst: string;
  spaceWorst: string;
}

export interface AlgoVisualStep {
  stepIndex: number;
  description: string;
  arrayState?: number[];
  highlightIndices?: number[];
  sortedIndices?: number[];
  swapIndices?: number[];
  activePointers?: { label: string; index: number; color?: string }[];
  graphNodes?: { id: string; label: string; state: 'unvisited' | 'visiting' | 'visited' | 'current' | 'path'; distance?: string; x?: number; y?: number }[];
  graphEdges?: { from: string; to: string; weight?: number; highlighted?: boolean }[];
  stackQueueState?: { value: string | number; active?: boolean }[];
  treeNodes?: { id: string; value: number; left?: string; right?: string; state?: 'normal' | 'active' | 'found' | 'inserted'; x?: number; y?: number }[];
  dpGrid?: { rowLabels: string[]; colLabels: string[]; matrix: (number | string)[][]; activeCell?: [number, number] };
  subarrayRange?: [number, number];
  tempArrays?: { label: string; values: (number | string)[]; activeIndex?: number; color?: string }[];
  variables?: Record<string, string | number | boolean>;
  codeLine?: number;
}

export interface AlgorithmItem {
  id: string;
  name: string;
  category: AlgoCategory;
  categoryLabel: string;
  subtitle: string;
  icon: string;
  pseudocode?: string;
  cormenChapter?: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  complexity: AlgoComplexity;
  analogy: {
    title: string;
    description: string;
    realLifeExample: string;
  };
  explanationMarkdown: string;
  codeImplementations: {
    c: string;
    cpp: string;
    python: string;
  };
  initialVisualData: {
    defaultArray?: number[];
    defaultGraphNodes?: { id: string; label: string; x: number; y: number }[];
    defaultGraphEdges?: { from: string; to: string; weight?: number }[];
    defaultTreeNodes?: { id: string; value: number; left?: string; right?: string; x: number; y: number }[];
    defaultParams?: Record<string, any>;
  };
  generateSteps: (customInput?: any) => AlgoVisualStep[];
  exercises: {
    id: string;
    title: string;
    description: string;
    cCode: string;
    cppCode: string;
    pythonCode: string;
    expectedOutput: string;
    explanation: string;
  }[];
}

