# Changelog

## 0.6.0

- **Reads the manifest's `config` block.** The manifest describes the library's maximal surface, not a default install's, so the legacy unprefixed `u-*` twins are no longer offered in completion — they exist only when `@lucca-front/scss` is built with `$deprecatedUtilityPrefix`. They stay recognised, so existing markup still gets hover (now saying as much) and is never flagged unknown.
- Completion detail names the qualifier a declaration block applies under (`&::before`, `@media`, `@container`). `pr-u-clearfix` no longer reads as if it set `display: table` on the element itself.
- Deprecated custom properties surface and quick-fix their replacement, as utility classes already did. No manifest populates variable replacements yet — this is ready for when the deprecation registry does.
- Storybook deep links: font-size classes (`pr-u-bodyM`, `pr-u-textM`…) point at TextSize instead of TextColor, the size family (`pr-u-width100%`, `pr-u-inlineSize100%`…) at Sizes, `pr-u-clearfix` at Reset instead of Float, `pr-u-fontStyle*` at TextStyle, and the legacy radius twins at BorderRadiusDeprecated.

## 0.5.0

- **Unused `@use` detection**: an `@use` of a `commons/utils` module whose namespace is never referenced is flagged, with a quick fix to remove the import. Deliberately conservative — `@use … as *` and `@forward` are never flagged, since local use cannot be determined.
- Utility classes containing escaped characters are now recognised (e.g. `pr-u-width100%`).

## 0.4.0

- **Mixin support** for `commons/utils`: completion after `@include` (with a parameter snippet), hover showing the signature and whether the namespace is imported, and a quick fix adding the missing `@use`.
- Diagnostic for `@include namespace.mixin` when the namespace is not `@use`d — a Sass compile error, so it is reported regardless of the deprecation toggle.

## 0.3.1

- `luccaFront.docs.storybookBaseUrl` now supports a `{version}` placeholder, filled from the installed package version at minor granularity (e.g. `https://lucca-front.lucca.io/{version}/storybook` → `.../v21.0/storybook`). Fixed URLs keep working unchanged.

## 0.3.0

- **Quick Fixes** (`Ctrl+.`): replace an unknown `pr-u-*` class with a close match, or a deprecated class with its recommended replacement.
- **Status-bar health snapshot**: shows the number of deprecated/unknown issues across open files; click to open the Problems panel.
- **Documentation links** in hovers: a Prisme design-system link for every token/class, plus a per-family Storybook deep link for utilities when `luccaFront.docs.storybookBaseUrl` is set.
- **Experimental deprecation toggle** (`luccaFront.experimental.cssDeprecations`, default off): deprecation diagnostics, hover notices, and completion tags are now opt-in while the scss package's deprecation metadata matures.

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
