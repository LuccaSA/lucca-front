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
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | — |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `active` | `T \| null` | — | — |







## Related files






## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`SegmentedControlTabsPanelComponent`, `SegmentedControlTabsComponent`).
