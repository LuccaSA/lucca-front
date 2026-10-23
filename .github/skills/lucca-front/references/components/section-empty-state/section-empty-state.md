# section-empty-state

## Import

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
```

## API Reference

### EmptyStateSectionComponent (component)

**Selector:** `lu-empty-state-section`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | ⚠️ **Déprécié** : use illustration and action  |
| `illustration` | `illustration` | `BubbleIllustration \| string \| null` | `null` | — | — | — |
| `action` | `action` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `3` | — | `luNumberAttribute` | — |

## Related files

- 📝 [Code & implementation](./section-empty-state.component.md)
- 🎨 [Design guidelines](./section-empty-state.design.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `action` : transform booleanAttribute → luBooleanAttribute
~ `center` : transform booleanAttribute → luBooleanAttribute
~ `hx` : transform numberAttribute → luNumberAttribute
