# ESLint Rule `ts-error`

> ⚠️ **DISCLAIMER**: This plugin is a temporary internal tool. It is **not intended to be maintained long-term** and is **intentionally not published** to npm. It is meant for one-time use during migrations or specific fixes.

Exposes TypeScript errors as ESLint errors and auto-fixes unsafe property access with optional chaining (`?.`).

## 🎯 Overview

This rule **intercepts TypeScript semantic diagnostics** and exposes them in ESLint. It allows you to:

1. **See TypeScript errors directly in ESLint** (CI, pre-commit hooks, IDE)
2. **Auto-fix** unsafe access on optional/nullable properties

## 🚀 Installation & Configuration

### Prerequisites

- `@typescript-eslint/parser` configured with `parserOptions.project`
- `@lucca/eslint-plugin` installed

### ESLint Flat Config (ESLint 9+)

```javascript
// eslint.config.mjs
import tsParser from '@typescript-eslint/parser';
import luccaPlugin from '@lucca/eslint-plugin';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        // or for monorepo:
        // project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
    plugins: {
      '@lucca': luccaPlugin,
    },
    rules: {
      '@lucca/ts-error': 'error',
    },
  },
];
```

### ESLint Legacy Config (ESLint 8)

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@lucca/eslint-plugin"],
  "rules": {
    "@lucca/ts-error": "error"
  }
}
```

### Usage

```bash
# Lint only (detection)
eslint src/

# With auto-fix
eslint --fix src/
```

## 🔧 Auto-fixable Error Codes (7 codes)

These nullability-related errors are **automatically fixed** by adding `?.`:

| Code      | TypeScript Message                        | Transformation                             |
| --------- | ----------------------------------------- | ------------------------------------------ |
| `TS2532`  | Object is possibly 'undefined'            | `user.profile.name` → `user.profile?.name` |
| `TS2533`  | Object is possibly 'null'                 | `user.profile.name` → `user.profile?.name` |
| `TS2531`  | Object is possibly 'null' or 'undefined'  | `user.data.value` → `user.data?.value`     |
| `TS18048` | 'X' is possibly 'undefined'               | `obj.prop.value` → `obj.prop?.value`       |
| `TS18047` | 'X' is possibly 'null'                    | `obj.prop.value` → `obj.prop?.value`       |
| `TS18049` | 'X' is possibly 'null' or 'undefined'     | `obj.prop.value` → `obj.prop?.value`       |
| `TS2722`  | Cannot invoke possibly 'undefined' object | `user.method()` → `user.method?.()`        |

## 🔍 Detection-only Error Codes (no auto-fix)

These errors are **reported** but require manual correction:

| Code     | TypeScript Message                                  |
| -------- | --------------------------------------------------- |
| `TS2304` | Cannot find name 'X'                                |
| `TS2322` | Type 'X' is not assignable to type 'Y'              |
| `TS2339` | Property 'X' does not exist on type 'Y'             |
| `TS2345` | Argument of type 'X' is not assignable to parameter |
| `TS2393` | Duplicate function implementation                   |
| `TS2493` | Tuple type has no element at index 'Z'              |
| `TS2540` | Cannot assign to 'X' (read-only property)           |
| `TS2554` | Expected X arguments, but got Y                     |
| `TS2564` | Property has no initializer                         |
| `TS2571` | Object is of type 'unknown'                         |
| `TS2790` | Operand of 'delete' must be optional                |

## ✅ Examples

### Before (TypeScript errors)

```typescript
interface User {
  profile?: { name: string };
  settings?: { theme: string };
  getName?: () => string;
  items?: string[];
}

function process(user: User) {
  // ❌ TS2532 - Auto-fixed
  console.log(user.profile.name);

  // ❌ TS18048 - Auto-fixed
  const theme = user.settings.theme;

  // ❌ TS2722 - Auto-fixed
  const name = user.getName();

  // ❌ TS2532 - Auto-fixed (bracket notation)
  const first = user.items[0];
}
```

### After `eslint --fix`

```typescript
function process(user: User) {
  // ✅ Automatically fixed
  console.log(user.profile?.name);

  // ✅ Automatically fixed
  const theme = user.settings?.theme;

  // ✅ Automatically fixed
  const name = user.getName?.();

  // ✅ Automatically fixed
  const first = user.items?.[0];
}
```

### Detected Errors (manual fix required)

```typescript
interface User {
  name: string;
  readonly id: number;
}

function process(user: User) {
  // ❌ TS2339 - Property does not exist (detection only)
  console.log(user.nonExistent);

  // ❌ TS2322 - Type mismatch (detection only)
  const age: number = '25';

  // ❌ TS2540 - Read-only property (detection only)
  user.id = 123;
}
```

## 🔗 Integration with Other Rules

This rule works well with:

| Rule                                            | Complementarity                           |
| ----------------------------------------------- | ----------------------------------------- |
| `@typescript-eslint/prefer-optional-chain`      | Suggests `?.` where this rule enforces it |
| `@typescript-eslint/prefer-nullish-coalescing`  | Complements with `??` after the `?.` fix  |
| `@typescript-eslint/no-non-null-assertion`      | Forbids `!` which bypasses type safety    |
| `@typescript-eslint/strict-boolean-expressions` | Strengthens nullability checks            |

## 📊 Statistics

- **18 TypeScript error codes** supported
- **7 auto-fixable codes** (39%)
- **11 detection-only codes** (61%)

## ⚠️ Limitations

1. **Auto-fix only adds `?.`** - it does not handle default values (`?? defaultValue`)
2. **Complex type errors** (generics, unions) require manual correction
3. **Requires an accessible `tsconfig.json`** via `parserOptions.project`

## 🐛 Troubleshooting

### "parserOptions.project" Error

```
Parsing error: Cannot read file 'tsconfig.json'
```

**Solution**: Check the path in `parserOptions.project` (relative to ESLint config file).

### TypeScript Errors Not Showing

Verify that:

1. The file is included in `tsconfig.json` (`include` / `exclude`)
2. The `@typescript-eslint/parser` is properly configured
3. The rule is enabled: `"@lucca/ts-error": "error"`

---

# ESLint Rule `no-deprecated-classes`

Reports usage of deprecated Lucca Front CSS classes in Angular templates.

## 🎯 Overview

- Covers external `.html` templates and inline component templates (through `angular.processInlineTemplates`).
- The deprecation list lives in `@lucca-front/stylelint-config` (`LFDeprecatedSelectors.mjs`).
- Its regexes are written against **CSS selectors** (e.g. `/\.mod-link/`, or same-element lookahead combinations).
- The rule converts each class list into a compound selector before matching: `class="button mod-counter"` → `".button.mod-counter"`.
- The stylelint regexes therefore apply verbatim — `\b` boundaries and combinations included.
- The stylelint list stays the single source of truth.

## 🚀 Configuration

- Requires `@angular-eslint/template-parser` (the rule visits `TextAttribute` / `BoundAttribute` nodes; wrong parser fails fast).
- Options take the raw `LFDeprecatedSelectors` entries — no mapping layer. String entries are rejected by the schema (near-inert against class attributes).
- The `setDeprecationMessageBuilder()` call is load-bearing: without it, messages degrade to a plain fallback.
- Wired in `eslint.config.mjs`:

```javascript
import localRules, { setDeprecationMessageBuilder } from './packages/eslint-plugin/index.ts';
import LFDeprecatedSelectors from './packages/stylelint-config/LFDeprecatedSelectors.mjs';
import { getDisallowedData } from './packages/stylelint-config/stylelintForLF.mjs';

setDeprecationMessageBuilder((deprecations, matchedSelector) => getDisallowedData(deprecations, matchedSelector).message);

// in the `**/*.html` block (angular template parser):
rules: {
	'@lucca-front/no-deprecated-classes': ['error', { deprecations: LFDeprecatedSelectors }],
}
```

## 🔍 Coverage

| Template syntax                              | How it is checked                                                 |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `class="button mod-counter"`                 | Whole class list, as a compound selector                          |
| `ngClass="u-comma"` (static)                 | Same as `class`                                                   |
| `[class.mod-link]="cond"`                    | The bound class name itself                                       |
| `[class]="expr"` / `[attr.class]="expr"`     | String literals in the expression AST                             |
| `[ngClass]="{ 'palette-grey': cond }"`       | Object-literal keys and string literals in the expression AST     |
| `class="foo {{ expr }}"`                     | Static interpolation parts + literals in `expr`                   |

## ⚠️ Limitations

1. **Single-element checks only** — descendant selector patterns (e.g. `.lu-select-value .label`) can never match a single `class` attribute and are silently inert (their individual classes are usually covered by other entries).
2. **Static analysis only** — class names computed in TypeScript code are invisible to the rule.

## 📐 Design notes

- Messages come verbatim from `stylelint-config`'s `getDisallowedData()` — same wording as stylelint, dates included.
- The formatter is injected via `setDeprecationMessageBuilder()` in `eslint.config.mjs`, not via options.
- Two constraints force that indirection: ESLint `structuredClone`s rule options (functions cannot travel through them), and the plugin cannot import `stylelintForLF.mjs` itself (jest cannot load it: its `currentLFVersion` import uses top-level await).
- The builder receives only the entry that matched, so a report always carries its own entry's versions.
- Without injection (e.g. under jest), the rule falls back to a plain static message.
- Message dates come from `LFVersions.mjs`, which fetches release data (1-hour tmp cache): message text varies with network/cache state, and in-repo messages always carry `| LF version not found` (scss version `0.0.0`).
- The `getSeverity()` policy (warning until `versionDeleted` is reached) is not reused: ESLint severity is fixed per rule, and `currentLFVersion` resolves to `null` inside this repo.
- A flat `error` severity is correct here: this repo is always at HEAD of Lucca Front.
- `\b` boundaries stop camelCase over-matches but not hyphen ones (`.error-message` still matches `\.error\b`): a stricter `(?![\w-])` would break dash-separated deprecated families like `.menu-link`, so the looseness is kept knowingly.

## 📋 Known violations in this repository

- Existing violations are suppressed with an explaining inline `eslint-disable` comment, not fixed.
- Each comment names the deprecated class and its replacement.
- Find them all with `grep -r "eslint-disable.*no-deprecated-classes"`.
- Exception: the rule is `off` for `stories/**/*.html` — stories deliberately showcase deprecated classes (~137 occurrences).

---

**Version**: Compatible with ESLint 8.57+ and ESLint 9+
