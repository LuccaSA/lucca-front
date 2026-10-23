# color-picker

## Related files

- 📝 [Code & implementation](./color-picker.component.md)
- 🎨 [Design guidelines](./color-picker.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)

## Changelog

### Notes de release (ZeroHeight)

#### 22.0.6

##### Fixed

- Form fields bound with `[formField]` (signal forms) are now marked dirty when the user changes the value.

#### 21.3.0

##### Fixed

- Highlighted option no longer follows the pointer while navigating with the keyboard.

#### 21.1.3

##### Fixed

- Empty value display in `presentation` mode now matches the other inputs.

#### 21.1.0

##### Added

- `lu-color-input` component to pick a color among a predefined palette, with the `colors`, `compact`, `clearable` and `intl` inputs.
- `presentation` display mode support, showing an en dash when the value is empty.
