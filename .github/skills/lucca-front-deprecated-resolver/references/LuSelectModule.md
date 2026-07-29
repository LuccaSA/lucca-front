# LuSelectModule / LuSelectInputModule / LuSelectInputComponent

## Contexte de dépréciation

`LuSelectInputComponent` (sélecteur `lu-select`) et ses modules sont dépréciés au profit de `SimpleSelect` ou `MultipleSelect`.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuSelectModule` | `lu-simple-select` ou `lu-multi-select` |
| `LuSelectInputModule` | `lu-simple-select` ou `lu-multi-select` |
| `LuSelectInputComponent` (`lu-select`) | `lu-simple-select` ou `lu-multi-select` |

## Migration

### Sélection simple — Avant

```html
<lu-select [(ngModel)]="value" [options]="options">
  <lu-option *luForOptions let-option [value]="option">{{ option.name }}</lu-option>
</lu-select>
```

```ts
import { LuSelectModule } from '@lucca-front/ng/select';
```

### Sélection simple — Après

```html
<lu-simple-select [(ngModel)]="value" [options]="options" optionValue="id" optionLabel="name" />
```

```ts
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
```

### Sélection multiple — Avant

```html
<lu-select multiple [(ngModel)]="values" [options]="options">
  <lu-option *luForOptions let-option [value]="option">{{ option.name }}</lu-option>
</lu-select>
```

### Sélection multiple — Après

```html
<lu-multi-select [(ngModel)]="values" [options]="options" optionValue="id" optionLabel="name" />
```

```ts
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

## Cas particuliers

- Si le composant utilise des options personnalisées via `luForOptions`, il faut adapter le template vers les nouvelles APIs `optionTpl` ou `optionValue`/`optionLabel`.
- La migration vers SimpleSelect/MultipleSelect peut nécessiter une intervention humaine si la logique est complexe.

## Annotation à ajouter lors de la migration

```html
<!--
  IA lucca-front-deprecated-resolver
  try to migrate LuSelectInputComponent
-->
```

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate LuSelectInputComponent
*/
```
