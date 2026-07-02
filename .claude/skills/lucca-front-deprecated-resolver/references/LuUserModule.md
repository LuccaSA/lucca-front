# LuUserModule / LuUserSelectModule / LuUserSelectInputModule / LuUserDisplayModule / LuUserPictureModule / LuUserTileModule / LuUserMeOptionModule / LuUserSearcherModule / LuUserSelectInputComponent

## Contexte de dépréciation

L'ancien système de sélection d'utilisateur est déprécié. Il doit être remplacé par SimpleSelect ou MultipleSelect avec la directive `luCustomUsers`.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuUserModule` | `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` |
| `LuUserSelectModule` | SimpleSelect / MultipleSelect avec `luCustomUsers` |
| `LuUserSelectInputModule` | `LuUserSelectInputComponent` (ou nouvelle API) |
| `LuUserSelectInputComponent` (`lu-user-select`) | SimpleSelect / MultipleSelect avec `luCustomUsers` |
| `LuUserDisplayModule` | `LuUserDisplayPipe` en imports ET providers |
| `LuUserPictureModule` | `LuUserPictureComponent` |
| `LuUserTileModule` | `LuUserTileComponent` |
| `LuUserMeOptionModule` | `LuUserMeOptionDirective` |
| `LuUserSearcherModule` | `LuUserPagedSearcherComponent` |

## Migration des modules simples

### LuUserDisplayModule → LuUserDisplayPipe

```ts
// Avant
@NgModule({ imports: [LuUserDisplayModule] })

// Après (composant standalone)
@Component({
  imports: [LuUserDisplayPipe],
  providers: [LuUserDisplayPipe],
})
```

### LuUserPictureModule → LuUserPictureComponent

```ts
@Component({ imports: [LuUserPictureComponent] })
```

### LuUserTileModule → LuUserTileComponent

```ts
@Component({ imports: [LuUserTileComponent] })
```

### LuUserMeOptionModule → LuUserMeOptionDirective

```ts
@Component({ imports: [LuUserMeOptionDirective] })
```

### LuUserSearcherModule → LuUserPagedSearcherComponent

```ts
@Component({ imports: [LuUserPagedSearcherComponent] })
```

## Migration du composant LuUserSelectInputComponent

### Avant

```html
<lu-user-select [(ngModel)]="user"></lu-user-select>
```

### Après

Utiliser `lu-simple-select` ou `lu-multi-select` avec la directive `luCustomUsers`. Consulter la documentation Prisme pour les détails.

## Migration automatique

- Remplacer les modules NgModule par les imports standalone selon le tableau.
- `LuUserDisplayModule` → `LuUserDisplayPipe` dans imports ET providers.
- La migration HTML de `lu-user-select` nécessite une intervention humaine.

## Annotation à ajouter lors de la migration

```html
<!--
  IA lucca-front-deprecated-resolver
  try to migrate LuUserSelectInputComponent
-->
```

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate LuUserSelectInputComponent
*/
```
