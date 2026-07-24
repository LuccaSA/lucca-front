# segmented-control-tabs

## Import

```typescript
import { SegmentedControlTabsPanelComponent, SegmentedControlTabsComponent } from '@lucca-front/ng/segmented-control-tabs';
```

## API Reference

### SegmentedControlTabsPanelComponent (component)

**Selector:** `lu-segmented-control-tabs-panel`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | — | — | — |
| `value` | `value` | `T` | — | ✅ | — | — |

### SegmentedControlTabsComponent (component)

**Selector:** `lu-segmented-control-tabs`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | — |
| `vertical` | `vertical` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `active` | `T` | — | — |

## Related files

- 📋 [Changelog](./segmented-control-tabs.changelog.md)
