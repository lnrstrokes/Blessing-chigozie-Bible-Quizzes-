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
