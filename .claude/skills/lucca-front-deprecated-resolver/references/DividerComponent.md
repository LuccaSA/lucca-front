# DividerComponent — input `withRole` déprécié

## Contexte de dépréciation

L'input `withRole` du composant `lu-divider` est déprécié sans remplacement documenté. Il ne doit plus être utilisé.

## Input déprécié

| Input | Type | Action |
|---|---|---|
| `withRole` | `boolean` | Supprimer — ne plus utiliser |

## Migration

### Avant

```html
<lu-divider [withRole]="true" />
```

### Après

```html
<lu-divider />
```

Supprimer simplement l'attribut `[withRole]` ou `withRole` du template.

## Migration automatique

Supprimer l'attribut `[withRole]` ou `withRole` de toutes les occurrences de `lu-divider`.
