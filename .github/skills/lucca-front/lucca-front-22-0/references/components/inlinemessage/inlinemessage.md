# inlinemessage

## Import

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

## API Reference

### InlineMessageComponent (component)

**Selector:** `lu-inline-message`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | Modifie le texte affiché par le composant. [PortalContent] |
| `state` | `state` | `'success' \| 'warning' \| 'error' \| 'default'` | — | — | — | Modifie l’état de l’inline message. |
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du composant. |
| `withTooltip` | `withTooltip` | `boolean` | `false` | — | `luBooleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./inlinemessage.component.md)

- 🎯 [Figma design tokens](./inlinemessage.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-inlinemessage-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `withTooltip` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 18.2.4

##### Fixed

- `lu-inline-message`: properly render `PortalContent` labels (template or component) by importing the required `PortalDirective`.

#### 18.2.0

##### Changed

- `label`: now accepts a `PortalContent` (template or component) instead of only a plain string, allowing rich content.

#### 18.1.4

##### Fixed

- `lu-inline-message`: no longer apply `mod-undefined` / `is-undefined` CSS classes when `size` or `state` are not set.
