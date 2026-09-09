import { QuizDataset, Question } from '../types';

export interface ValidationError {
  questionId?: number;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateDataset(dataset: QuizDataset): ValidationResult {
  const errors: ValidationError[] = [];

  if (!dataset.id || typeof dataset.id !== 'string') {
    errors.push({ message: 'Dataset missing valid string ID' });
  }

  if (!dataset.title || typeof dataset.title !== 'string') {
    errors.push({ message: 'Dataset missing valid title' });
  }

  if (!Array.isArray(dataset.questions) || dataset.questions.length === 0) {
    errors.push({ message: 'Dataset must contain a non-empty array of questions' });
    return { isValid: false, errors };
  }

  const seenIds = new Set<number>();

  dataset.questions.forEach((q: Question, idx: number) => {
    // Unique IDs check
    if (seenIds.has(q.id)) {
      errors.push({ questionId: q.id, message: `Duplicate question ID detected: ${q.id}` });
    }
    seenIds.add(q.id);

    // Four options check
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push({ questionId: q.id, message: `Question ${q.id} must have exactly 4 options` });
    }

    // Valid answer index check (0, 1, 2, 3)
    if (typeof q.answerIndex !== 'number' || q.answerIndex < 0 || q.answerIndex > 3) {
      errors.push({ questionId: q.id, message: `Question ${q.id} has invalid answerIndex (${q.answerIndex}). Must be between 0 and 3.` });
    }

    // Answer consistency check
    if (Array.isArray(q.options) && q.answerIndex >= 0 && q.answerIndex < q.options.length) {
      const selectedOption = q.options[q.answerIndex];
      if (selectedOption !== q.answer) {
        errors.push({
          questionId: q.id,
          message: `Question ${q.id} answer consistency failure: answer "${q.answer}" does not match options[answerIndex] "${selectedOption}"`,
        });
      }
    }

    // Bible reference check
    if (!q.reference || typeof q.reference !== 'string' || q.reference.trim() === '') {
      errors.push({ questionId: q.id, message: `Question ${q.id} is missing a valid Bible reference` });
    }

    // Difficulty check
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
      errors.push({ questionId: q.id, message: `Question ${q.id} has invalid difficulty: "${q.difficulty}". Must be easy, medium, or hard.` });
    }

    // Category check
    if (!q.category || typeof q.category !== 'string' || q.category.trim() === '') {
      errors.push({ questionId: q.id, message: `Question ${q.id} is missing a valid category` });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
