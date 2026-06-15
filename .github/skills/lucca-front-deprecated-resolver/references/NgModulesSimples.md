# Modules NgModule simples dépréciés

Ce fichier regroupe les modules NgModule dépréciés dont la migration est triviale : remplacer le module par le composant/pipe/directive standalone correspondant.

## Table de correspondance

| Module déprécié | Package | Remplacement |
|---|---|---|
| `LuToastsModule` | `@lucca-front/ng/toast` | `LuToastsComponent` |
| `LuNumberModule` | `@lucca-front/ng/number` | `LuNumberPipe` |
| `LuScrollModule` | `@lucca-front/ng/scroll` | `LuScrollDirective` |
| `LuSafeContentModule` | `@lucca-front/ng/safe-content` | `LuSafeHtmlPipe` |
| `LuFormlyModule` | `@lucca-front/ng/formly` | `provideLuFormly()` dans les providers d'une route lazy-loaded |

## Migration générique

Pour chaque module NgModule de cette liste :

```ts
// Avant
import { LuToastsModule } from '@lucca-front/ng/toast';
@NgModule({ imports: [LuToastsModule] })

// Après (composant standalone)
import { LuToastsComponent } from '@lucca-front/ng/toast';
@Component({ imports: [LuToastsComponent] })
```

## Cas particulier : LuFormlyModule

`LuFormlyModule` doit être remplacé par `provideLuFormly()` dans une route lazy-loaded, pas globalement.

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

## Migration automatique

Remplacer chaque occurrence du module par son équivalent standalone selon la table de correspondance.
