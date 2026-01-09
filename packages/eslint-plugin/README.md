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

**Version**: Compatible with ESLint 8.57+ and ESLint 9+
