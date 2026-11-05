### 22.1.2

#### Fixed

- Non-currency styles now apply `minimumFractionDigits` and `maximumFractionDigits` when they are given, instead of letting the default significant digits take over.
- `minimumFractionDigits` no longer pads the integer part with leading zeroes.
- `currency` style keeps on focus and while typing the fraction digits it displays on blur: `minimumFractionDigits` alone no longer loses decimals on focus, and the typed fraction is cut to the currency default (0 for JPY, 3 for KWD) instead of 2.

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
