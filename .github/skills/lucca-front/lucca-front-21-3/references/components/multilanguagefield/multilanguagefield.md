# multilanguagefield

## Import

```typescript
import { MultilanguageInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### MultilanguageInputComponent (component)

**Selector:** `lu-multilanguage-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `placeholder` | `placeholder` | `string` | `''` | — | — | Modifie le placeholder au champ. |
| `openOnFocus` | `openOnFocus` | `boolean` | `false` | — | `booleanAttribute` | — |
| `autocomplete` | `autocomplete` | `AutoFill` | `'off'` | — | — | — |
| `hasNoInvariant` | `hasNoInvariant` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hasAIButtons` | `hasAIButtons` | `boolean` | `false` | — | `booleanAttribute` | — |
| `displayLocale` | `displayLocale` | `string` | `''` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `translateWithAI` | `translateWithAI` | `string` | — |

## Related files

- 📝 [Code & implementation](./multilanguagefield.component.md)
- 🎨 [Design guidelines](./multilanguagefield.design.md)
- 🎯 [Figma design tokens](./multilanguagefield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

+ `hasNoInvariant` : boolean
+ `hasAIButtons` : boolean
+ `displayLocale` : string
+ (output) `translateWithAI` : string

### 21.1.0

+ `intl` : unknown

### 21.0.3

+ `autocomplete` : AutoFill

### 21.0.0

Composant introduit (`MultilanguageInputComponent`).
