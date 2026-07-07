# Changelog

## 0.2.0

- Utility-class hover now shows the resolved value beneath any `var()`-based declaration.
- Deprecated utility classes surface their recommended replacement, including derived physical → logical mappings (e.g. `pr-u-marginTop100` → `pr-u-marginBlockStart100`).
- Hovering (and diagnostics for) an unknown `pr-u-*` class now suggests close matches.

## 0.1.0

Initial release.

- Completion for `@lucca-front/scss` custom properties (CSS/SCSS/LESS) and `pr-u-*` utility classes (HTML + Angular inline templates).
- Hover showing resolved custom-property values and the CSS applied by utility classes.
- Diagnostics for deprecated tokens/classes and unknown `pr-u-*` classes.
- Version-aware: reads the CSS API manifest from the installed `@lucca-front/scss` in `node_modules`.
