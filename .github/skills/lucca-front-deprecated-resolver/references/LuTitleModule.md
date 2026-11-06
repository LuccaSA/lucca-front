# LuTitleModule / LuTitleService / APP_TITLE

## Contexte de dépréciation

Le système de titre basé sur `LuTitleService` (et le NgModule `LuTitleModule` qui le fournit) est déprécié au profit de la Title Strategy Angular, configurée via `provideLuTitleStrategy(options)`. Le token `APP_TITLE` est déprécié : sa valeur passe par l'option `appTitle`.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuTitleModule` | `provideLuTitleStrategy({ … })` |
| `LuTitleService` (et son appel à `init()`) | `provideLuTitleStrategy({ … })` |
| `APP_TITLE` | option `appTitle` de `provideLuTitleStrategy()` |

## ⚠️ `LuTitleStrategy` n'est PAS déprécié

`LuTitleStrategy` est la classe injectable qui implémente la stratégie. `provideLuTitleStrategy()` l'enregistre comme `TitleStrategy`. L'injecter (`inject(LuTitleStrategy)`, par exemple pour lire `title$` ou `titleParts$`) est légitime : **ne jamais supprimer ni remplacer une injection de `LuTitleStrategy`**. Vérifier dans le `.d.ts` installé : seul `APP_TITLE` y porte `@deprecated` (pas la classe `LuTitleStrategy`).

## Signature

```ts
provideLuTitleStrategy(options: LuTitleStrategyOptions): Provider[];

interface LuTitleStrategyOptions {
  appTitle?: () => string | Observable<string> | Signal<string>; // factory, exécutée en contexte d'injection
  translateService?: () => ILuTitleTranslateService;               // factory
  namingStrategy?: 'product' | 'other';
  readTitleByLiveAnnouncer?: boolean;
}
```

- `options` est obligatoire : `provideLuTitleStrategy()` sans argument ne compile pas.
- `appTitle` et `translateService` sont des **factories**, pas des valeurs.
- `LuTitleStrategy` injecte le titre d'app sans `optional` : sans `appTitle` (ni `APP_TITLE` fourni ailleurs), l'app lève un `NullInjectorError` au premier changement de route.

## Migration

### LuTitleModule / LuTitleService → Title Strategy

`LuTitleService.init(applicationNameTranslationKey)` traduisait la clé du nom d'application via `LU_TITLE_TRANSLATE_SERVICE`. La factory `appTitle` reprend ce rôle.

```ts
// Avant
@NgModule({
  imports: [LuTitleModule],
  providers: [{ provide: LU_TITLE_TRANSLATE_SERVICE, useExisting: MyTranslateService }],
})
class AppModule {}

export class AppComponent {
  constructor(titleService: LuTitleService) {
    titleService.init('APP_NAME');
  }
}
```

```ts
// Après — providers de bootstrapApplication (ou de l'AppModule)
import { provideLuTitleStrategy } from '@lucca-front/ng/title';

bootstrapApplication(AppComponent, {
  providers: [
    provideLuTitleStrategy({
      appTitle: () => inject(MyTranslateService).translate('APP_NAME'),
      translateService: () => inject(MyTranslateService),
    }),
  ],
});
// + supprimer l'injection de LuTitleService et l'appel à init()
```

### APP_TITLE → option appTitle

```ts
// Avant
import { APP_TITLE } from '@lucca-front/ng/title';
providers: [{ provide: APP_TITLE, useValue: 'Mon App' }]

// Après
import { provideLuTitleStrategy } from '@lucca-front/ng/title';
providers: [provideLuTitleStrategy({ appTitle: () => 'Mon App' })]
```

Si l'app appelle déjà `provideLuTitleStrategy({ … })`, y ajouter `appTitle` au lieu d'appeler la fonction une seconde fois. Un `useFactory` sur `APP_TITLE` se reporte tel quel dans `appTitle`.

## Migration automatique

1. Supprimer `LuTitleModule` des `imports` / `importProvidersFrom`.
2. Remplacer `LuTitleService` (provider + `init()`) par `provideLuTitleStrategy({ appTitle, translateService })` aux providers racine.
3. Reporter la valeur de `APP_TITLE` dans l'option `appTitle` (en factory).
4. Laisser intactes les injections de `LuTitleStrategy`.

## Validation runtime

Changer de route dans l'app servie et vérifier `document.title` : l'absence de `appTitle` ne se voit qu'à l'exécution (`NullInjectorError`).
