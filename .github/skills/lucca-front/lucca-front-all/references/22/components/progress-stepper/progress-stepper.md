# progress-stepper

## Import

```typescript
import { ProgressStepperStepComponent, ProgressStepperComponent } from '@lucca-front/ng/progress-stepper';
```

## Basic Usage

```html
<lu-progress-stepper current="3"> <lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="Step" /> <lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="Step" /> <lu-progress-stepper-step label="Step" /> <lu-progress-stepper-step label="Step" /> <lu-progress-stepper-step label="Step" />
</lu-progress-stepper>
```

## API Reference

### ProgressStepperStepComponent (component)

**Selector:** `lu-progress-stepper-step`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | — |
| `state` | `state` | `ProgressStepperStepState \| null` | `null` | — | — | — |
| `routerLinkParam` | `routerLinkParam` | `RouterLinkParam \| string \| readonly string[] \| UrlTree \| null \| undefined` | `null` | — | — | — |

### ProgressStepperComponent (component)

**Selector:** `lu-progress-stepper`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `current` | `current` | `number` | `1` | — | `luNumberAttribute` | Étape courante. |

## Related files

- 📝 [Code & implementation](./progress-stepper.component.md)
- 🎨 [Design guidelines](./progress-stepper.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-progress-stepper-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`ProgressStepperComponent` :
  ~ `current` : transform numberAttribute → luNumberAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `PROGRESS_STEPPER_STEP_STATE` constant and `ProgressStepperStepState` type are now publicly exported and used to type the step `state` input.

#### 21.2.0

##### Added

- `lu-progress-stepper` component (`progressStepper`) and its `lu-progress-stepper-step` children to display the progress of a multi-step flow.
- Step inputs: `label`, `state` (`success`, `critical`), `current` and `routerLinkParam`.
- `LU_PROGRESS_STEPPER_INSTANCE` injection token exposing the stepper instance to its descendants.
