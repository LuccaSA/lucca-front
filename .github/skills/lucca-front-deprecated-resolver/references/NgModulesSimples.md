# Modules NgModule simples dépréciés

Ce fichier regroupe les modules NgModule dépréciés dont la migration est simple. Le remplacement dépend de **l'endroit où le module est utilisé** (voir « Règle générale pour les NgModules » dans [SKILL.md](../SKILL.md)).

## Table de correspondance

| Module déprécié | Package | Providers dans `ɵinj` | Dans `imports` d'un composant | Dans `importProvidersFrom` / `providers` |
|---|---|---|---|---|
| `LuToastsModule` | `@lucca-front/ng/toast` | aucun | `LuToastsComponent` si le template contient `<lu-toasts>` | supprimer |
| `LuNumberModule` | `@lucca-front/ng/number` | aucun | `LuNumberPipe` si le template utilise `\| luNumber` | supprimer |
| `LuScrollModule` | `@lucca-front/ng/scroll` | aucun | `LuScrollDirective` si le template utilise `luScroll` | supprimer |
| `LuSafeContentModule` | `@lucca-front/ng/safe-content` | aucun | `LuSafeHtmlPipe` si le template utilise `\| luSafeHtml` | supprimer |
| `LuFormlyModule` | `@lucca-front/ng/formly` | `provideLuFormly()` | supprimer | `provideLuFormly()` dans les providers d'une route lazy-loaded |

La colonne « Providers dans `ɵinj` » se vérifie dans le fesm2022 installé (le script `scripts/inventory-deprecated.mjs` l'affiche). Si elle diffère pour la version installée, c'est le fesm qui fait foi.

## Selon le contexte d'usage

### Dans les `imports` d'un `@Component` (ou d'un `@NgModule` déclarant des composants)

Le module n'y sert qu'à exposer ses déclarables au template. Le remplacer par ceux que le template utilise vraiment, et seulement ceux-là :

```ts
// Avant
import { LuToastsModule } from '@lucca-front/ng/toast';
@Component({ imports: [LuToastsModule], template: '<lu-toasts [sources]="sources" />' })

// Après
import { LuToastsComponent } from '@lucca-front/ng/toast';
@Component({ imports: [LuToastsComponent], template: '<lu-toasts [sources]="sources" />' })
```

Si le template n'utilise aucun de ses déclarables, supprimer l'import sans le remplacer.

### Dans `importProvidersFrom(...)` ou un tableau `providers`

Le module n'y sert qu'à apporter ses providers. Les quatre premiers n'en déclarent aucun : **les supprimer**, sans les remplacer.

```ts
// Avant
importProvidersFrom(BrowserModule, LuToastsModule)

// Après
importProvidersFrom(BrowserModule)
```

⛔ **Jamais** `importProvidersFrom(BrowserModule, LuToastsComponent)` : Angular refuse un composant, une directive ou un pipe standalone dans `importProvidersFrom` (erreur `NG0800`). L'erreur n'apparaît qu'au runtime en dev mode ; `ng build` en prod et `tsc` passent.

Si `importProvidersFrom(...)` se retrouve vide, supprimer l'appel.

## Cas particulier : LuFormlyModule

`LuFormlyModule` ne déclare que `provideLuFormly()`. Le remplacer par `provideLuFormly()` dans les providers de la route lazy-loaded qui affiche les formulaires, pas globalement.

```ts
// Avant
@NgModule({ imports: [LuFormlyModule] })

// Après
const routes: Routes = [{
  path: 'my-form',
  loadComponent: () => import('./my-form.component'),
  providers: [provideLuFormly()],
}]
```

Si le module était importé dans un composant non routé, voir « Où poser les providers » dans [LuModalModule.md](./LuModalModule.md) : l'import n'apportait peut-être rien.

## Migration automatique

1. Relever le contexte de chaque usage (`imports` d'un composant / `importProvidersFrom` / `providers`).
2. `imports` d'un composant : remplacer par les déclarables utilisés dans le template, ou supprimer.
3. `importProvidersFrom` / `providers` : supprimer (ou `provideLuFormly()` pour `LuFormlyModule`).
