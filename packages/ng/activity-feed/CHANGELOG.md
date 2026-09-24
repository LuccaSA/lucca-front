### 22.0.3

#### Fixed

- Step status icon and avatar no longer shrink when the step content is long.

### 22.0.0

#### Added

- `lu-activity-feed-update-item` component to display a single `before` → `after` change; several items can now be grouped inside a `lu-activity-feed-update`.

#### Changed

- `lu-activity-feed-update` is now a list wrapper (`role="list"`) that only projects its content: the `before`/`after` layout, the `intl` input and the new required `label` input moved to `lu-activity-feed-update-item`.

### 21.3.0

#### Added

- `ACTIVITY_FEED_STEP_STATUS` constant and `ActivityFeedStepStatus` type are now publicly exported and used to type the `status` input.

### 21.2.1

#### Fixed

- `date` formatting no longer relies on a literal unsupported by Safari.

### 21.2.0

#### Added

- `lu-activity-feed` component, along with `lu-activity-feed-step` and `lu-activity-feed-update`, to display a chronological feed of activities.
- `lu-activity-feed-step` inputs: `label`, `user`, `status` (`success`, `critical`, `pending`), `date` and `datePipeFormat`.
- `intl` input on `lu-activity-feed` and `lu-activity-feed-update` to override the component's translations.
- Load-more button to fetch additional entries of the feed.
