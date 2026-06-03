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
| `state` | `state` | `'success' \| 'critical' \| null` | `null` | — | — | — |
| `routerLinkParam` | `routerLinkParam` | `RouterLinkParam \| string \| readonly string[] \| UrlTree \| null \| undefined` | `null` | — | — | — |

### ProgressStepperComponent (component)

**Selector:** `lu-progress-stepper`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `current` | `current` | `number` | `1` | — | `numberAttribute` | Étape courante. |

## Related files

- 📝 [Code & implementation](./progress-stepper.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.3/storybook/?path=/docs/documentation-progress-stepper-angular-basic--docs)
- 📋 [Changelog](../progress-stepper.changelog.md)
