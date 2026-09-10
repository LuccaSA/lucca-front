# activity-feed

## Import

```typescript
import { ActivityFeedStepComponent, ActivityFeedUpdateItemComponent, ActivityFeedUpdateComponent, ActivityFeedComponent } from '@lucca-front/ng/activity-feed';
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

### ActivityFeedUpdateItemComponent (component)

**Selector:** `lu-activity-feed-update-item`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `string` | — | ✅ | — | — |

### ActivityFeedUpdateComponent (component)

**Selector:** `lu-activity-feed-update`

### ActivityFeedComponent (component)

**Selector:** `lu-activity-feed`

## Related files

- 📝 [Code & implementation](./activity-feed.component.md)
- 🎨 [Design guidelines](./activity-feed.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-activity-feed-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ component `ActivityFeedUpdateItemComponent` (lu-activity-feed-update-item)
`ActivityFeedUpdateComponent` :
  - `intl`

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `ACTIVITY_FEED_STEP_STATUS` constant and `ActivityFeedStepStatus` type are now publicly exported and used to type the `status` input.

#### 21.2.1

##### Fixed

- `date` formatting no longer relies on a literal unsupported by Safari.

#### 21.2.0

##### Added

- `lu-activity-feed` component, along with `lu-activity-feed-step` and `lu-activity-feed-update`, to display a chronological feed of activities.
- `lu-activity-feed-step` inputs: `label`, `user`, `status` (`success`, `critical`, `pending`), `date` and `datePipeFormat`.
- `intl` input on `lu-activity-feed` and `lu-activity-feed-update` to override the component's translations.
- Load-more button to fetch additional entries of the feed.
