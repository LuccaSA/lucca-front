# TranslationModel — ILuTranslation déprécié

## Contexte de dépréciation

L'interface `ILuTranslation<T>` est dépréciée. Elle doit être remplacée par `LuTranslation<T>`.

## Élément déprécié

| Élément déprécié | Package | Remplacement |
|---|---|---|
| `ILuTranslation<T>` | `@lucca-front/ng/core` | `LuTranslation<T>` depuis `@lucca-front/ng/core` |

## Migration

### Avant

```ts
import { ILuTranslation } from '@lucca-front/ng/core';

const translations: ILuTranslation<string> = {
  en: 'Hello',
  fr: 'Bonjour',
};
```

### Après

```ts
import { LuTranslation } from '@lucca-front/ng/core';

const translations: LuTranslation<string> = {
  en: 'Hello',
  fr: 'Bonjour',
};
```

## Migration automatique

Remplacer `ILuTranslation` par `LuTranslation` dans tous les imports et usages TypeScript.
