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

export interface UserProgress {
  completedItems: string[]; // array of CourseItem ids
  solvedExercises: string[]; // array of Exercise ids
  completedCSubtopics: string[]; // array of CSubTopic ids
  currentItemId: string;
  userNotes: Record<string, string>;
}
