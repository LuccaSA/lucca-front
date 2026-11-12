# activity-feed

**Sommaire**

- Import
- Basic Usage
- API Reference
  - ActivityFeedStepComponent (component)
  - ActivityFeedUpdateItemComponent (component)
  - ActivityFeedUpdateComponent (component)
  - ActivityFeedComponent (component)
  - Injection tokens
- Related files
- Changelog
  - 22.1.1
  - 22.1.0
  - 22.0.5
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { ActivityFeedStepComponent, ActivityFeedUpdateItemComponent, ActivityFeedUpdateComponent, ActivityFeedComponent } from '@lucca-front/ng/activity-feed';
```

## Basic Usage

```html
<lu-activity-feed> <lu-activity-feed-step [user]="user" [date]="date" /> <lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
</lu-activity-feed>
```

## API Reference

### ActivityFeedStepComponent (component)

**Selector:** `lu-activity-feed-step`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `PortalContent \| null` | `null` | — | — | Description de l’étape. [PortalContent] |
| `user` | `user` | `ILuUser \| null` | `null` | — | — | Permet de définir l’utilisateur présenté dans l’avatar (masqué pour les statuts `success` et `critical`). |
| `avatarPlaceholder` | `avatarPlaceholder` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche un avatar placeholder à la place de celui du `user` (ex. auteur anonyme). |
| `status` | `status` | `ActivityFeedStepStatus \| null` | `null` | — | — | Statut de l’étape : `success` et `critical` remplacent l’avatar par un indicateur d’état. |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Étape identifiée par une icône. |
| `date` | `date` | `Date \| string \| null` | `null` | — | — | Date de l’étape, affichée par défaut sous forme de date et heure complètes. |
| `datePipeFormat` | `datePipeFormat` | `string` | — | — | — | Format passé au `DatePipe` pour afficher la date (ex. `dd/MM/yyyy`). Voir les options de format. |

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

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_ACTIVITY_FEED_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./activity-feed.component.md)
- 🎨 [Design guidelines](./activity-feed.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-listings-activity-feed-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.2`. Les versions sans changement d'API sont omises.

### 22.1.1

`ActivityFeedStepComponent` :
  + `avatarPlaceholder` : boolean

### 22.1.0

`ActivityFeedStepComponent` :
  + `icon` : LuccaIcon | null

### 22.0.5

+ token `LU_ACTIVITY_FEED_TRANSLATIONS` : unknown

### 22.0.0

+ component `ActivityFeedUpdateItemComponent` (lu-activity-feed-update-item)
`ActivityFeedUpdateComponent` :
  - `intl`

### Notes de release (ZeroHeight)

#### 22.1.1

##### Added

- `avatarPlaceholder` input on `lu-activity-feed-step` to display a placeholder avatar instead of the `user` picture (e.g. an anonymous author).

#### 22.1.0

##### Added

- `icon` input on `lu-activity-feed-step` to display an icon in the step state, on a `product` palette background (`activityFeed-step-state mod-icon`).

##### Changed

- Step state icons are now displayed at size `S`.

#### 22.0.5

##### Fixed

- `lu-activity-feed-update-item` content now wraps when space is limited or the content is long.
- Spacing before the colon after the `lu-activity-feed-update-item` label: none outside French, a single space for every French locale (e.g. `fr-FR`).

#### 22.0.3

##### Fixed

- Step status icon and avatar no longer shrink when the step content is long.

#### 22.0.0

##### Added

- `lu-activity-feed-update-item` component to display a single `before` → `after` change; several items can now be grouped inside a `lu-activity-feed-update`.

##### Changed

- `lu-activity-feed-update` is now a list wrapper (`role="list"`) that only projects its content: the `before`/`after` layout, the `intl` input and the new required `label` input moved to `lu-activity-feed-update-item`.

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
