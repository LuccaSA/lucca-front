# BaseFileUploadComponent — valeur `paper` dépréciée pour l'input `illustration`

## Contexte de dépréciation

La valeur `'paper'` de l'input `illustration` du composant de file upload est dépréciée. Elle doit être remplacée par `'invoice'`.

## Valeur dépréciée

| Valeur dépréciée | Remplacement |
|---|---|
| `'paper'` | `'invoice'` |

L'input accepte : `'paper'` (déprécié) | `'picture'` | `'invoice'`

## Migration

### Avant

```html
<lu-single-file-upload illustration="paper" />
```

### Après

```html
<lu-single-file-upload illustration="invoice" />
```

## Migration automatique

Remplacer `illustration="paper"` et `[illustration]="'paper'"` par `illustration="invoice"` et `[illustration]="'invoice'"`.
