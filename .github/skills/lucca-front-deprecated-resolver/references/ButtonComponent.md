# ButtonComponent (prisme) — input `delete` déprécié

## Contexte de dépréciation

L'input `delete` du composant bouton Prisme est déprécié. Il doit être remplacé par l'input `critical`.

## Input déprécié

| Input déprécié | Remplacement | Notes |
|---|---|---|
| `delete` | `critical` | Renommage simple |

## Migration

### Avant

```html
<button luButton [delete]="true">Supprimer</button>
<!-- ou -->
<button luButton delete>Supprimer</button>
```

### Après

```html
<button luButton critical>Supprimer</button>
```

## Migration automatique

Remplacer `[delete]="true"` par `critical` et supprimer les occurrences de `[delete]="false"` (valeur par défaut).

Règle de transformation :
- `[delete]="true"` → `critical`
- `delete` (attribut booléen) → `critical`
- `[delete]="false"` → supprimer l'attribut
- `[delete]="someVar"` → `[critical]="someVar"`
