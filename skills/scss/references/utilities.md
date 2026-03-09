# SCSS Utilities Reference

Lucca Front SCSS utilities, mixins, and variables.

## Import

```scss
@use '@lucca-front/scss/src/theming' as theming;
@use '@lucca-front/scss/src/commons' as commons;
```

## Utilities

### Spacing

```scss
// Padding utilities: pr-u-padding{100-800}
// Margin utilities: pr-u-margin{100-800}
// Gap utilities: pr-u-gap{100-800}
```

### Display

```scss
// pr-u-displayNone
// pr-u-displayFlex
// pr-u-displayGrid
// pr-u-displayBlock
// pr-u-displayInline
```

### Flexbox

```scss
// pr-u-flexWrapNowrap
// pr-u-alignItemsCenter
// pr-u-justifyContentCenter
// pr-u-flexDirectionColumn
```

### Text

```scss
// pr-u-textAlignCenter
// pr-u-textAlignLeft
// pr-u-textAlignRight
```

### Visibility

```scss
// pr-u-mask (visually hidden but accessible)
```

## Mixins

### Media Queries

```scss
@include commons.media('S') { ... }
@include commons.media('M') { ... }
@include commons.media('L') { ... }
```

### Theming

```scss
@include theming.palette('primary') { ... }
@include theming.mode('dark') { ... }
```

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--palettes-*` | Color palette tokens |
| `--sizes-*` | Size tokens |
| `--spacings-*` | Spacing tokens |
| `--radii-*` | Border radius tokens |
