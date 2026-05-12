# activity-feed

## Import

```typescript
import { ActivityFeedStepComponent, ActivityFeedUpdateComponent } from '@lucca-front/ng/activity-feed';
```

## Basic Usage

```html
<lu-activity-feed> <lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
</lu-activity-feed>
```

## API Reference

### ActivityFeedStepComponent (component)

**Selector:** `lu-activity-feed-step`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_ACTIVITY_FEED_TRANSLATIONS` | — | — | — |
| `label` | `label` | `PortalContent \| null` | `null` | — | — | — |
| `user` | `user` | `ILuUser \| null` | `null` | — | — | Permet de définir l’utilisateur présenté dans l’avatar |
| `status` | `status` | `'success' \| 'critical' \| 'pending' \| null` | `null` | — | — | — |
| `date` | `date` | `Date \| string \| null` | `null` | — | — | — |
| `datePipeFormat` | `datePipeFormat` | `string` | — | — | — | — |

### ActivityFeedUpdateComponent (component)

**Selector:** `lu-activity-feed-update`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_ACTIVITY_FEED_TRANSLATIONS` | — | — | — |

## Related files

- 📝 [Code & implementation](./activity-feed.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-listings-activity-feed-angular-basic--docs)
- 📋 [Changelog](../activity-feed.changelog.md)
