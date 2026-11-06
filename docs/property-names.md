# Property names

Directory of the names shared across components. Before naming a new input, check whether the concept already has a name here and reuse it, along with its type and description. If a concept is missing, add it in the same PR as the component that introduces it.

## Angular inputs

- **Description**: wording for the input's JSDoc and its story `description`. Replace `<component>` with the component name.
- **Avoid**: names that should not be used for this concept, either because they are ambiguous, collide with a native attribute, or were used in the past and are being phased out. They remain valid for a different concept (`level` is wrong for a heading level, but right for `lu-priority-level`).
- Boolean inputs default to `false` and use the boolean transform; inputs with a closed set of values are typed with a union derived from an `as const` array (`BUTTON_SIZE` → `ButtonSize`). See [Developer eXperience](../contributing.md#dx).

### Appearance

| Input          | Type                            | Description                                                                 | Avoid                          |
| -------------- | ------------------------------- | --------------------------------------------------------------------------- | ------------------------------ |
| `size`         | union of `'XXS'` … `'XXXL'`     | Changes the size of the `<component>`.                                      | `small`, `large` (booleans)    |
| `palette`      | `Palette` union or `string`     | Applies a color palette to the `<component>`.                               | `color`, `theme`               |
| `state`        | union (`'success'`, `'error'`…) | `<component>` state.                                                        | `status`, `type`               |
| `critical`     | `boolean`                       | Marks an action with significant or irreversible consequences.              | `danger`, `destructive`        |
| `AI`           | `boolean`                       | Applies AI colors.                                                          | `ai`, `isAI`                   |
| `inverted`     | `boolean`                       | Adjusts the colors of the `<component>` for use on a dark background.       | `reverse`, `dark` (see below)  |
| `dark`         | `boolean`                       | Applies a dark style for use on a gray background.                          | `inverted` (different meaning) |
| `vertical`     | `boolean`                       | Displays the `<component>` vertically.                                      | `orientation`, `column`        |
| `withEllipsis` | `boolean`                       | Truncates the text with an ellipsis and adds a tooltip when it is too long. | `ellipsis`, `truncate`         |

### Content

| Input          | Type                        | Description                                                                                                                   | Avoid                                   |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `label`        | `string` or `PortalContent` | Changes the text displayed by the `<component>`.                                                                              | `text`, `content`                       |
| `heading`      | `string` or `PortalContent` | Changes the title displayed by the `<component>`.                                                                             | `title` (native attribute)              |
| `headingLevel` | number union (`1` … `6`)    | Aria level of the title, exposed as a heading. Defaults to `<n>`: set it when the title is not an `h<n>` in the page outline. | `hx`, `level`, `titleLevel`             |
| `headingStyle` | number union (`1`, `2`…)    | Applies the visual style of an `h<n>` to the title, regardless of its `headingLevel`.                                         | `hxStyle`, `titleStyle`                 |
| `hiddenLabel`  | `boolean`                   | Hides the label while keeping it in the DOM for screen readers.                                                               | `showLabel`, `hideLabel`, `labelHidden` |
| `icon`         | `LuccaIcon`                 | Adds an icon to the `<component>`.                                                                                            | `iconName`, `glyph`                     |
| `alt`          | `string`                    | Information conveyed by the screen reader.                                                                                    | `ariaLabel`, `altText`                  |
| `tooltip`      | `string` or `SafeHtml`      | Displays an icon (?) associated with a tooltip.                                                                               | `help`, `hint`                          |
| `withTooltip`  | `boolean`                   | Displays the label in a tooltip on hover.                                                                                     | `tooltip` (holds the tooltip content)   |

### Behavior

| Input      | Type             | Description                        | Avoid                         |
| ---------- | ---------------- | ---------------------------------- | ----------------------------- |
| `disabled` | `boolean`        | Disables the `<component>`.        | `isDisabled`, `disable`       |
| `loading`  | `boolean`        | Applies the loading state.         | `isLoading`, `pending`        |
| `expanded` | `model<boolean>` | Expands the `<component>` content. | `open`, `opened`, `collapsed` |

### Form fields

| Input                | Type                           | Description                                                                                                                                                           | Avoid                          |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `placeholder`        | `string`                       | Changes the field placeholder.                                                                                                                                        |                                |
| `required`           | `boolean`                      | Marks the field as required.                                                                                                                                          | `mandatory`                    |
| `autocomplete`       | `AutoFill` / `string`          | Changes the field's autocomplete behavior.                                                                                                                            |                                |
| `width`              | `FormFieldWidth` (`10` … `60`) | Applies a fixed width to the field.                                                                                                                                   | `size` (reserved for size)     |
| `hasClearer`         | `boolean`                      | Displays a button to clear the field when it is filled.                                                                                                               | `clearable`, `withClearer`     |
| `counter`            | `number`                       | Indicates the maximum number of characters for the field. This information is provided for guidance only: the field length must also be limited via the form control. | `maxLength` (native attribute) |
| `inlineMessage`      | `PortalContent`                | Adds descriptive text (help, error, etc.) below the form field.                                                                                                       | `helper`, `message`            |
| `inlineMessageState` | `InlineMessageState`           | Changes the state of the inline message.                                                                                                                              | `messageState`                 |
| `mixed`              | `boolean`                      | Applies a mixed (indeterminate) selection state (-) to the checkbox.                                                                                                  | `indeterminate`                |
| `presentation`       | `boolean`                      | Turns the form field into non-editable text.                                                                                                                          | `readonly` (native attribute)  |

### Tables

| Input        | Type                               | Description                                   | Avoid               |
| ------------ | ---------------------------------- | --------------------------------------------- | ------------------- |
| `align`      | `'start'` \| `'center'` \| `'end'` | Horizontally aligns the content of the cells. | `textAlign`, `left` |
| `selectable` | `boolean`                          | Makes table rows selectable via checkboxes.   | `checkable`         |

### Known deviations

Existing inputs that do not follow this directory yet. Renaming them is a breaking change: deprecate the old name and add the new one.

- `hx` instead of `headingLevel`: `lu-callout`, `lu-empty-state-page`, `lu-empty-state-section`.
- `hxStyle` instead of `headingStyle`: `lu-empty-state-page`.
- `level` instead of `headingLevel`: `lu-vertical-navigation`.
- `headingLevel` typed as a string (`'3'`) instead of a number: `lu-resource-card`.
- `small` instead of `size="S"`: `lu-sortable-list`, `lu-sortable-list-item`, `lu-segmented-control`, `lu-segmented-control-tabs`, `lu-comment-block`.
