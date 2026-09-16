import { CompanionScenario, CompanionStep } from '../types';

/**
 * Default timing model (in seconds) based on livestream broadcast pacing guidelines:
 * Target per complete situation: ~3-4 minutes (180 - 240 seconds)
 * 
 * HOOK: 10–15s (default 12s)
 * CHOICE: 20–25s (default 22s)
 * ANTICIPATION: 5–8s (default 6s)
 * SCRIPTURE: 30–45s minimum (default 35s, dynamically scales with verse length)
 * CONNECTION: 25–35s (default 28s)
 * REFLECTION: 25–40s (default 30s)
 * RESPONSE: 20–25s (default 22s)
 * PRAYER: 30–45s (default 32s, dynamically scales with prayer length)
 * TAKEAWAY: 20–30s (default 24s)
 * NEXT_HOOK: 8–12s (default 10s)
 */
export const BASE_STEP_DURATIONS: Record<CompanionStep, number> = {
  hook: 12,
  choice: 22,
  anticipation: 6,
  scripture: 35,
  connection: 28,
  reflection: 30,
  response: 22,
  prayer: 32,
  takeaway: 24,
  nextHook: 10,
};

/**
 * Calculate dynamic Scripture hold duration based on word count.
 * Guarantees minimum 35 seconds, scaling up for long passages
 * so viewers are never rushed.
 */
export function calculateScriptureDuration(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // ~2.2 words per second reading speed + 16 seconds for contemplation and citation
  const calculated = Math.round(words * 0.55 + 16);
  return Math.max(35, Math.min(55, calculated));
}

/**
 * Calculate dynamic Prayer hold duration based on word count.
 */
export function calculatePrayerDuration(prayerText: string): number {
  const words = prayerText.trim().split(/\s+/).filter(Boolean).length;
  const calculated = Math.round(words * 0.5 + 14);
  return Math.max(30, Math.min(48, calculated));
}

/**
 * Returns the exact duration in seconds for a given scenario step.
 * Checks for scenario-specific overrides first, then dynamic scaling,
 * then base defaults.
 */
export function getStepDuration(
  scenario: CompanionScenario | undefined,
  step: CompanionStep,
  multiplier: number = 1.0
): number {
  if (!scenario) {
    return BASE_STEP_DURATIONS[step] || 20;
  }

  const overrides = scenario.timingOverrides;

  // 1. Check explicit overrides first
  if (overrides) {
    if (step === 'hook' && overrides.hookDuration) return Math.round(overrides.hookDuration * multiplier);
    if (step === 'choice' && overrides.choiceDuration) return Math.round(overrides.choiceDuration * multiplier);
    if (step === 'anticipation' && overrides.anticipationDuration) return Math.round(overrides.anticipationDuration * multiplier);
    if (step === 'scripture' && overrides.scriptureDuration) return Math.round(overrides.scriptureDuration * multiplier);
    if (step === 'connection' && overrides.connectionDuration) return Math.round(overrides.connectionDuration * multiplier);
    if (step === 'reflection' && overrides.reflectionDuration) return Math.round(overrides.reflectionDuration * multiplier);
    if (step === 'response' && overrides.responseDuration) return Math.round(overrides.responseDuration * multiplier);
    if (step === 'prayer' && overrides.prayerDuration) return Math.round(overrides.prayerDuration * multiplier);
    if (step === 'takeaway' && overrides.takeawayDuration) return Math.round(overrides.takeawayDuration * multiplier);
    if (step === 'nextHook' && overrides.nextHookDuration) return Math.round(overrides.nextHookDuration * multiplier);
  }

  // 2. Dynamic content-based calculations
  if (step === 'scripture') {
    const dynamicScripture = calculateScriptureDuration(scenario.primaryText);
    return Math.round(dynamicScripture * multiplier);
  }

  if (step === 'prayer') {
    const dynamicPrayer = calculatePrayerDuration(scenario.prayer);
    return Math.round(dynamicPrayer * multiplier);
  }

  // 3. Fallback to standard baseline
  const base = BASE_STEP_DURATIONS[step] || 20;
  return Math.round(base * multiplier);
}

/**
 * Computes total broadcast duration for a single Companion scenario (in seconds).
 */
export function getTotalScenarioDuration(
  scenario: CompanionScenario,
  multiplier: number = 1.0
): number {
  const steps: CompanionStep[] = [
    'hook',
    'choice',
    'anticipation',
    'scripture',
    'connection',
    'reflection',
    'response',
    'prayer',
    'takeaway',
    'nextHook',
  ];
  return steps.reduce((sum, s) => sum + getStepDuration(scenario, s, multiplier), 0);
}

/**
 * Helper to format seconds to M:SS (e.g., 22 -> "0:22", 215 -> "3:35")
 */
export function formatSeconds(totalSeconds: number): string {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safeSec / 60);
  const secs = safeSec % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
