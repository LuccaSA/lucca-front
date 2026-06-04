# LuDepartmentModule / LuDepartmentSelectModule / LuDepartmentSelectInputModule / LuDepartmentSelectInputComponent / LuDepartmentFeederComponent / LuDepartmentV3Service

## Contexte de dépréciation

L'ancien système de sélection de département utilise une architecture "picker" dépréciée. Il doit être remplacé par SimpleSelect ou MultipleSelect avec les directives department.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuDepartmentModule` | `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` (ou nouvelle API) |
| `LuDepartmentSelectModule` | `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` |
| `LuDepartmentSelectInputModule` | `LuDepartmentSelectInputComponent` |
| `LuDepartmentSelectInputComponent` (`lu-department-select`) | nouvelle API (voir ci-dessous) |
| `LuDepartmentFeederComponent` (`lu-department-feeder`) | directive department dans SimpleSelect/MultipleSelect |
| `LuDepartmentV3Service` | `LuDepartmentService` |

## Migration du composant

### Avant

```html
<lu-department-select [(ngModel)]="department">
  <lu-department-feeder />
</lu-department-select>
```

```ts
import { LuDepartmentModule } from '@lucca-front/ng/department';
```

### Après

Utiliser `lu-simple-select` ou `lu-multi-select` avec la directive department appropriée. Consulter la documentation Prisme pour les directives disponibles.

## Migration du service

### Avant

```ts
import { LuDepartmentV3Service } from '@lucca-front/ng/department';

providers: [{ provide: ILuDepartmentService, useClass: LuDepartmentV3Service }]
```

### Après

```ts
import { LuDepartmentService } from '@lucca-front/ng/department';

providers: [{ provide: ILuDepartmentService, useClass: LuDepartmentService }]
```

## Migration automatique

- Remplacer `LuDepartmentModule`, `LuDepartmentSelectModule` → imports standalone directs.
- Remplacer `LuDepartmentSelectInputModule` → `LuDepartmentSelectInputComponent`.
- Remplacer `LuDepartmentV3Service` → `LuDepartmentService`.
- La migration HTML du composant `lu-department-select` nécessite une intervention humaine.

## Annotation à ajouter lors de la migration

```html
<!--
  IA lucca-front-deprecated-resolver
  try to migrate LuDepartmentSelectInputComponent
-->
```

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate LuDepartmentSelectInputComponent
*/
```
