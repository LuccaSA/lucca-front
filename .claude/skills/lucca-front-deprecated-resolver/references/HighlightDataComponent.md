# HighlightDataComponent — valeur d'icône `manifying-glass` dépréciée

## Contexte de dépréciation

La valeur `'manifying-glass'` (faute de frappe) de l'input icon du composant `lu-highlight-data` est dépréciée. Elle doit être remplacée par `'magnifying-glass'`.

## Valeur dépréciée

| Valeur dépréciée | Remplacement | Raison |
|---|---|---|
| `'manifying-glass'` | `'magnifying-glass'` | Faute de frappe corrigée |

## Migration

### Avant

```html
<lu-highlight-data icon="manifying-glass" />
```

### Après

```html
<lu-highlight-data icon="magnifying-glass" />
```

## Migration automatique

Remplacer toutes les occurrences de `'manifying-glass'` par `'magnifying-glass'`.
