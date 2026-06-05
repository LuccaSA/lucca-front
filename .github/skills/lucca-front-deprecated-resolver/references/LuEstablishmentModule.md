# LuEstablishmentModule / LuEstablishmentSelectModule / LuEstablishmentSelectInputModule / LuEstablishmentSelectInputComponent

## Contexte de dépréciation

L'ancien système de sélection d'établissement est déprécié. Il doit être remplacé par SimpleSelect ou MultipleSelect avec les directives establishments.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuEstablishmentModule` | SimpleSelect / MultipleSelect avec directives establishments |
| `LuEstablishmentSelectModule` | `LuEstablishmentSelectInputComponent, LuEstablishmentSearcherComponent, LuForLegalUnitsDirective, LuLegalUnitSelectorDirective, LuEstablishmentSelectAllComponent` |
| `LuEstablishmentSelectInputModule` | `LuEstablishmentSelectInputComponent` |
| `LuEstablishmentSelectInputComponent` (`lu-establishment-select`) | SimpleSelect / MultipleSelect avec directives establishments |

## Migration du composant

### Avant

```html
<lu-establishment-select [(ngModel)]="establishment">
</lu-establishment-select>
```

```ts
import { LuEstablishmentModule } from '@lucca-front/ng/establishment';
```

### Après

Utiliser `lu-simple-select` ou `lu-multi-select` avec les directives establishments appropriées. Consulter la documentation Prisme pour les directives disponibles.

## Migration automatique

- Remplacer les modules NgModule par les imports standalone directs.
- La migration HTML du composant `lu-establishment-select` nécessite une intervention humaine.

## Annotation à ajouter lors de la migration

```html
<!--
  IA lucca-front-deprecated-resolver
  try to migrate LuEstablishmentSelectInputComponent
-->
```

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate LuEstablishmentSelectInputComponent
*/
```
