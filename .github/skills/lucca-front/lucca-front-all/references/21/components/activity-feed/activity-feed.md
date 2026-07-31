# activity-feed

## Import

```typescript
import { ActivityFeedStepComponent, ActivityFeedUpdateComponent, ActivityFeedComponent } from '@lucca-front/ng/activity-feed';
```

## Basic Usage

```html
<lu-activity-feed> <lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." /> <lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
</lu-activity-feed>
```

## API Reference

### ActivityFeedStepComponent (component)

**Selector:** `lu-activity-feed-step`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `PortalContent \| null` | `null` | — | — | — |
| `user` | `user` | `ILuUser \| null` | `null` | — | — | Permet de définir l’utilisateur présenté dans l’avatar |
| `status` | `status` | `ActivityFeedStepStatus \| null` | `null` | — | — | — |
| `date` | `date` | `Date \| string \| null` | `null` | — | — | — |
| `datePipeFormat` | `datePipeFormat` | `string` | — | — | — | — |

### ActivityFeedUpdateComponent (component)

**Selector:** `lu-activity-feed-update`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### ActivityFeedComponent (component)

**Selector:** `lu-activity-feed`

## Related files

- 📝 [Code & implementation](./activity-feed.component.md)
- 🎨 [Design guidelines](./activity-feed.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-listings-activity-feed-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

`ActivityFeedStepComponent` :
  ~ `status` : 'success' | 'critical' | 'pending' | null → ActivityFeedStepStatus | null

### 21.2.0

Composant introduit (`ActivityFeedStepComponent`, `ActivityFeedUpdateComponent`, `ActivityFeedComponent`).
