# LoadingComponent — type `fullpage` déprécié

## Contexte de dépréciation

La valeur `'fullpage'` de l'input `type` du composant `lu-loading` est dépréciée. La casse correcte est `'fullPage'` (avec P majuscule).

## Valeur dépréciée

| Valeur dépréciée | Remplacement |
|---|---|
| `'fullpage'` | `'fullPage'` |

## Migration

### Avant

```html
<lu-loading type="fullpage" />
<!-- ou -->
<lu-loading [type]="'fullpage'" />
```

### Après

```html
<lu-loading type="fullPage" />
```

## Migration automatique

Remplacer toutes les occurrences de `type="fullpage"` et `[type]="'fullpage'"` par `type="fullPage"` et `[type]="'fullPage'"`.
