# Popover2

Popover2 est la nouvelle version de LuPopover, il a été choisi de partir sur une implémentation différente et donc, afin d'éviter les impacts d'un breaking change,
une nouvelle directive a vu le jour `luPopover2`, dans un nouveau point d'entrée, `@lucca-front/ng/popover2`.

## Mise en place

Popover2 est fait pour être simple à utiliser, il suffit de l'importer dans votre environement avec `configureLuPopover()` (à placer dans les providers de votre `AppModule` ou lors du bootstrap de `AppComponent` si vous êtes en full standalone).

## Utilisation

Pour utiliser `Popover2` dans un template, il suffit d'appliquer la directive `[luPopover2]` en renseignant en input une référence à un `ng-template`, exemple:

```angular2html

<button luButton [luPopover2]="popoverTpl"></button>
<ng-template #popoverTpl>
  Je suis le contenu du popover !
  <button luButton>Et je suis un bouton accessible au clavier !</button>
</ng-template>
```

## Paramètres et position

Seule la référence au `ng-template` est obligatoire, mais la directive propose des paramètres pour divers usages:

- `luPopoverPosition` par défaut à `above`, permet de régler la position voulue du popover, en cas d'espace manquant dans le rendu, le composant tentera de se positionner d'abord à l'opposé de la position demandée, puis les deux autres à tour de rôle.
- `luPopoverDisabled` permet de désactiver totalement le popover.
- `customPositions` à utiliser avec précaution, permet de renseigner des `ConnectionPositionPair` pour totalement remplacer la logique de positionnement, très utile pour les menus qui doivent être `below` mais alignés sur un côté plutôt que l'autre.

Les positions custom doivent être déclarées dans le `component.ts` sous forme d'un tableau et passés dans le template en input, exemple pour un menu qui s'ouvre en dessous à gauche (ou au dessus à gauche si pas de place):

component.ts:

```typescript
import { ConnectionPositionPair } from "@angular/cdk/overlay";

export class ExampleComponent {
  protected positions: ConnectionPositionPair[] = [
    // En dessous, aligné à gauche
    new ConnectionPositionPair(
      { originX: "left", originY: "bottom" },
      { overlayX: "left", overlayY: "top" }
    ),
    // Au dessus, aligné à gauche
    new ConnectionPositionPair(
      { originX: "left", originY: "top" },
      { overlayX: "left", overlayY: "bottom" }
    )
  ]
}
```

component.html:

```angular2html

<button luButton [luPopover2]="popoverTpl" [customPositions]="positions"></button>
<ng-template #popoverTpl>
  Je suis le contenu du popover !
  <button luButton>Et je suis un bouton accessible au clavier !</button>
</ng-template>
```
