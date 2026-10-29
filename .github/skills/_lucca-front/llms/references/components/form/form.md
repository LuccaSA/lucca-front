# form

## Import

```typescript
import { FormComponent } from '@lucca-front/ng/form';
```

## API Reference

### FormComponent (component)

**Selector:** `form[luForm]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `maxWidth` | `maxWidth` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `presentation` | `presentation` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `focusInvalidOnSubmit` | `focusInvalidOnSubmit` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_FORM_INSTANCE` | `FormComponent` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

+ `focusInvalidOnSubmit` : boolean

### 22.0.0

~ `maxWidth` : transform booleanAttribute → luBooleanAttribute
~ `presentation` : transform booleanAttribute → luBooleanAttribute
