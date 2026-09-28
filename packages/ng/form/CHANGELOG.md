### 21.3.0

#### Changed

- `form[luForm]` – improve integration when used inside a `LuDialog` (adds the `dialog-inside-formOptional` styling hook automatically).
- `mod-maxWidth` – forms are no longer width-capped by default; the `mod-maxWidth` modifier now limits the form width to 50rem.

### 21.1.0

#### Added

- `presentation` – new boolean input on `form[luForm]` to display fields in a read-only "presentation" mode, along with the `LU_FORM_INSTANCE` injection token exposing the form instance to descendants.

#### Fixed

- `form-field` – remove the extra gap when a checkbox field label is visually hidden (`pr-u-mask`).

### 21.0.3

#### Fixed

- `divider` – vertical dividers (`mod-vertical`) inside a form no longer receive the block margin meant for horizontal dividers.

### 21.0.0

#### Added

- `form[luForm]` – Angular wrapper component (host `class="form"`) for the form styles, with a `maxWidth` boolean input toggling the `mod-maxWidth` style.

#### Fixed

- `form-header-title` – rely on the heading-2 typography token instead of the full title component styles.

### 20.3.0

#### Added

- `form-field-contentOptional` – layout class to display optional content (e.g. an action) inline next to a field.

### 19.2.0

#### Added

- `mod-width20` … `mod-width60` – field width modifiers to constrain a `form-field` to a fixed width.

### 18.3.2

#### Changed

- `mod-withArrow` – allow the arrow style to be applied directly on a `form-field`.

#### Fixed

- `form-field` – fix a spacing jump when a box appears or disappears.
- `form-field` – apply the critical (invalid) color on labels and inline messages for select fields (`simpleSelect`, `multiSelect`).

### 18.3.1

#### Fixed

- `form-fieldset` – display the invalid legend style when a radio or checkbox field is invalid.
- `mod-withArrow` – only apply the arrow style when a box follows the field.

### 18.3.0

#### Fixed

- `divider` – fix divider spacing and margins inside forms.

### 18.1.0

#### Added

- `form-header` – header classes (`form-header`, `form-header-title`, `form-header-mandatory`, `form-header-mandatory-asterisk`) and the `mod-maxWidth` modifier backed by the `--components-form-maxWidth` custom property.
