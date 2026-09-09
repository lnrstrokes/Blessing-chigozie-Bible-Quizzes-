import { QuizDataset, ValidationResult, ValidationError } from '../types';

export function validateQuizDataset(dataset: QuizDataset): ValidationResult {
  const errors: ValidationError[] = [];

  if (!dataset || !dataset.questions || !Array.isArray(dataset.questions)) {
    return {
      isValid: false,
      errors: [{ questionId: 0, message: 'Invalid dataset structure: missing questions array.' }]
    };
  }

  const idSet = new Set<number>();

  dataset.questions.forEach((q, index) => {
    const qNum = q.id || index + 1;

    // Check unique IDs
    if (idSet.has(q.id)) {
      errors.push({ questionId: qNum, message: `Duplicate question ID detected: ${q.id}` });
    } else {
      idSet.add(q.id);
    }

    // Check question text
    if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') {
      errors.push({ questionId: qNum, message: 'Question text is missing or empty.' });
    }

    // Check options
    if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
      errors.push({ questionId: qNum, message: 'Question must have exactly four options.' });
    } else {
      // Check options are non-empty strings
      q.options.forEach((opt, optIdx) => {
        if (!opt || typeof opt !== 'string' || opt.trim() === '') {
          errors.push({ questionId: qNum, message: `Option at index ${optIdx} is empty.` });
        }
      });
    }

    // Check answerIndex validity
    if (typeof q.answerIndex !== 'number' || q.answerIndex < 0 || q.answerIndex > 3) {
      errors.push({ questionId: qNum, message: `Invalid answerIndex: ${q.answerIndex}. Must be between 0 and 3.` });
    } else if (q.options && q.options.length === 4) {
      // Check answer corresponds to option
      const expectedAnswer = q.options[q.answerIndex];
      if (q.answer.trim().toLowerCase() !== expectedAnswer.trim().toLowerCase()) {
        errors.push({ 
          questionId: qNum, 
          message: `Answer mismatch: specified answer "${q.answer}" does not match option at answerIndex "${expectedAnswer}".` 
        });
      }
    }

    // Check Bible reference
    if (!q.reference || typeof q.reference !== 'string' || q.reference.trim() === '') {
      errors.push({ questionId: qNum, message: 'Bible reference is missing or empty.' });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
