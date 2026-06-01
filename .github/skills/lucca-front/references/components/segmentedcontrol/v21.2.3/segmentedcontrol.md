# segmentedcontrol

## Import

```typescript
import { SegmentedControlFilterComponent, SegmentedControlComponent } from '@lucca-front/ng/segmented-control';
```

## API Reference

### SegmentedControlFilterComponent (component)

**Selector:** `lu-segmented-control-filter`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `value` | `value` | `T` | — | ✅ | — | — |
| `label` | `label` | `PortalContent` | — | — | — | — |

### SegmentedControlComponent (component)

**Selector:** `lu-segmented-control`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille du composant. |
| `vertical` | `vertical` | `boolean` | `false` | — | `booleanAttribute` | Affiche le composant en vue verticale. |

## Related files

- 📝 [Code & implementation](./segmentedcontrol.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../segmentedcontrol.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.3/storybook/?path=/docs/documentation-navigation-segmentedcontrol-angular-tabs--docs)
- 📋 [Changelog](../segmentedcontrol.changelog.md)
