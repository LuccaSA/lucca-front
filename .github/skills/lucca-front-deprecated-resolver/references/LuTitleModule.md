# LuTitleModule / LuTitleService / LuTitleStrategy / APP_TITLE

## Contexte de dépréciation

Le système de titre basé sur `LuTitleService` est déprécié au profit de `LuTitleStrategy` injectable. `LuTitleStrategy` elle-même utilise désormais `provideLuTitleStrategy()`. `APP_TITLE` est un alias déprécié.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuTitleModule` | titre strategy (voir ci-dessous) |
| `LuTitleService` | `LuTitleStrategy` (Title Strategy Angular) |
| `LuTitleStrategy` (classe) | `provideLuTitleStrategy()` |
| `APP_TITLE` | `provideLuTitleStrategy()` avec configuration |

## Migration

### LuTitleModule / LuTitleService → Title Strategy

```ts
// Avant
@NgModule({
  imports: [LuTitleModule],
  providers: [LuTitleService],
})
class AppModule {}
```

```ts
// Après — bootstrapApplication
import { provideLuTitleStrategy } from '@lucca-front/ng/title';

bootstrapApplication(AppComponent, {
  providers: [
    provideLuTitleStrategy(),
  ]
})
```

### APP_TITLE → provideLuTitleStrategy

```ts
// Avant
import { APP_TITLE } from '@lucca-front/ng/title';
providers: [{ provide: APP_TITLE, useValue: 'Mon App' }]

// Après
import { provideLuTitleStrategy } from '@lucca-front/ng/title';
providers: [provideLuTitleStrategy({ appTitle: 'Mon App' })]
```

## Migration automatique

1. Supprimer `LuTitleModule` des imports NgModule.
2. Remplacer `LuTitleService` par `provideLuTitleStrategy()` dans les providers.
3. Remplacer `APP_TITLE` par la configuration de `provideLuTitleStrategy()`.
