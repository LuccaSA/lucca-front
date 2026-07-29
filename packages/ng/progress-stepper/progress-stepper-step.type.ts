/**
 * Available ProgressStepperStepComponent States
 */

export const PROGRESS_STEPPER_STEP_STATE = ['success', 'critical'] as const;
export type ProgressStepperStepState = (typeof PROGRESS_STEPPER_STEP_STATE)[number];
