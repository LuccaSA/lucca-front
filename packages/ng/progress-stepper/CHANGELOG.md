### 21.3.0

#### Added

- `PROGRESS_STEPPER_STEP_STATE` constant and `ProgressStepperStepState` type are now publicly exported and used to type the step `state` input.

### 21.2.0

#### Added

- `lu-progress-stepper` component (`progressStepper`) and its `lu-progress-stepper-step` children to display the progress of a multi-step flow.
- Step inputs: `label`, `state` (`success`, `critical`), `current` and `routerLinkParam`.
- `LU_PROGRESS_STEPPER_INSTANCE` injection token exposing the stepper instance to its descendants.
