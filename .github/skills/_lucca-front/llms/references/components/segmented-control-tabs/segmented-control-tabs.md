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
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `value` | `value` | `T` | — | ✅ | — | — |

### SegmentedControlTabsComponent (component)

**Selector:** `lu-segmented-control-tabs`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `ariaLabel` | `ariaLabel` | `string \| null` | `null` | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `active` | `T \| null` | — | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

`SegmentedControlTabsPanelComponent` :
  + `icon` : LuccaIcon
  + `hiddenLabel` : boolean

### 22.0.5

`SegmentedControlTabsComponent` :
  + `ariaLabel` : string | null

### 22.0.0

`SegmentedControlTabsComponent` :
  ~ `small` : transform booleanAttribute → luBooleanAttribute
  ~ `vertical` : transform booleanAttribute → luBooleanAttribute
  ~ (model) `active` : T → T | null
