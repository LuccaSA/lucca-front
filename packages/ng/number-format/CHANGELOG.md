### 19.3.4

#### Fixed

- `currency` style now lets `Intl` decide the number of fraction digits depending on the currency and locale.
- `currency` style displays a trailing zero when the fraction part holds a single non-zero digit.

### 19.2.0

#### Fixed

- The control is marked as touched even when the value has not changed.

### 18.2.0

#### Added

- `min` and `max` support on the formatted number input.

#### Changed

- Number formatting is now based on `Intl` instead of a custom mask implementation. Models, directive and input component were reworked accordingly.

#### Removed

- `autoDecimalDigits` option and the `AutoDecimalDigitsNumberMask` model.

#### Fixed

- Negative values use a real minus sign instead of a hyphen.
- `percent` values are no longer divided twice, and `min`/`max` behave consistently with them.
