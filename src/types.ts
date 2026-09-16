export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  answer: string;
  reference: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard' | 'expert';
  category: string;
  explanation?: string;
}

export interface QuizDataset {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
}

export interface QuizSettings {
  thinkingTime: number; // seconds
  countdownTime: number; // seconds
  answerRevealTime: number; // seconds
  transitionTime: number; // seconds
  showExplanation: boolean;
  autoPlay: boolean;
}

export type PlaybackState = 
  | 'intro'
  | 'thinking'
  | 'countdown'
  | 'reveal'
  | 'transition'
  | 'milestone'
  | 'outro'
  | 'paused'
  | 'stopped';

export interface AudioSettings {
  muted: boolean;
  musicVolume: number;
  sfxVolume: number;
}

export interface ValidationError {
  questionId: number;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export type AppContentMode = 'quiz' | 'companion';

export interface ChoiceOption {
  key: string;
  label: string;
}

export interface ChoicePrompt {
  question: string;
  options: ChoiceOption[];
  instruction?: string;
  countdownSeconds?: number;
}

export interface ResponsePrompt {
  question: string;
  options: ChoiceOption[];
  instruction?: string;
}

// For backward compatibility
export type CommentPromptOption = ChoiceOption;
export type CommentPrompt = ChoicePrompt;

export interface CompanionScenario {
  id: string;
  categoryId: string;
  categoryName: string;
  situation: string;
  supportingStatement: string;
  title?: string;
  // Scene 2: Choice
  choicePrompt: ChoicePrompt;
  // Scene 3: Anticipation Transition
  anticipationText?: string;
  // Scene 4: Scripture Reveal
  primaryReference: string;
  primaryText: string;
  keyPhraseEmphasis?: string;
  supportingReferences?: string[];
  // Scene 5: Connection (concise statements)
  connectionPoints: string[];
  contextExplanation?: string;
  // Scene 6: Reflection
  reflectionQuestion: string;
  // Scene 7: Response
  responsePrompt: ResponsePrompt;
  // Scene 8: Prayer
  prayer: string;
  // Scene 9: Takeaway
  takeaway: string;
  // Scene 10: Next Hook preview
  nextSituationPreview?: string;
  // Backwards compatibility alias
  commentPrompt?: CommentPrompt;
  // Optional custom timing overrides in seconds
  timingOverrides?: CompanionTimingOverrides;
}

export interface CompanionTimingOverrides {
  hookDuration?: number;
  choiceDuration?: number;
  anticipationDuration?: number;
  scriptureDuration?: number;
  connectionDuration?: number;
  reflectionDuration?: number;
  responseDuration?: number;
  prayerDuration?: number;
  takeawayDuration?: number;
  nextHookDuration?: number;
}

export interface CompanionCategory {
  id: string;
  name: string;
  description: string;
  scenarios: CompanionScenario[];
}

export type CompanionStep = 
  | 'hook'
  | 'choice'
  | 'anticipation'
  | 'scripture'
  | 'connection'
  | 'reflection'
  | 'response'
  | 'prayer'
  | 'takeaway'
  | 'nextHook';

export interface CompanionSettings {
  autoAdvance: boolean;
  loopContinuously: boolean;
  pacingMultiplier?: number;
}

