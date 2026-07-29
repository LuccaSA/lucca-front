# Palettes dépréciées — résiduel manuel

Le schematic `ng g @lucca-front/ng:palettes` couvre déjà : classes `.palette-*`, `.mod-grey`, `.icon-color-*`, utilitaires `u-text*`/`pr-u-*`, les CSS vars `--palettes-grey|primary|secondary|lucca-*`, `--colors-grey-*`, `--colors-white-color`, `--colors-black-color`, **et l'input `<lu-icon color="primary|secondary">` → `product`** (statique et bound).

Ce fichier ne concerne que **ce que le schematic ne fait pas**.

## Tables de correspondance (rappel)

| Suppression | Remplacement |
|---|---|
| `.palette-grey` | `.palette-neutral` |
| `.palette-primary` | `.palette-product` |
| `.palette-secondary` | `.palette-product` |
| `.palette-lucca` | `.palette-brand` |
| `--palettes-grey-*` | `--palettes-neutral-*` |
| `--palettes-primary-*` | `--palettes-product-*` |
| `--palettes-secondary-*` | `--palettes-product-*` |
| `--palettes-lucca-*` | `--palettes-brand-*` |
| `--colors-white-color` | `--palettes-neutral-0` |
| `--colors-black-color` | `--palettes-neutral-900` |

## 1. CSS vars `*-rgb` (⚠️ contextuel)

Ces vars **ne sont pas** dans le schematic car leur remplacement dépend de l'usage.

| Suppression | Remplacement |
|---|---|
| `--colors-grey-400-rgb` | `--palettes-neutral-400` |
| `--colors-grey-900-rgb` | `--palettes-neutral-900` |
| `--colors-neutral-400-rgb` | `--palettes-neutral-400` |
| `--colors-neutral-900-rgb` | `--palettes-neutral-900` |
| `--colors-white-rgb` | `--palettes-neutral-0` |

**Règle** : les nouvelles vars sont maintenant au format hexadécimal (ex: `#123456(78)?`). Si l'ancienne var servait à appliquer une opacité via `rgba(...)`, il faut passer par `color.transparentize`.

```scss
// Avant — opacité appliquée via la version -rgb
background-color: rgba(var(--colors-grey-900-rgb), 0.5);

// Après — transparentize sur la palette
@use '@lucca-front/scss/src/commons/utils/color';
background-color: color.transparentize(var(--palettes-neutral-900), 0.5);
```

```scss
// Avant — pas d'opacité, simple couleur pleine
color: rgb(var(--colors-neutral-400-rgb));

// Après — remplacement direct
color: var(--palettes-neutral-400);
```

Ne jamais remplacer aveuglément : inspecter s'il y a un `rgba`/opacité autour.

⚠️ **Un oubli est silencieux** : Sass n'évalue pas les `var()` (valeur « spéciale »), donc `rgb(var(--palettes-neutral-400))` compile sans aucune erreur. C'est le navigateur qui invalide la déclaration au runtime — la couleur disparaît sans message. Il faut donc vérifier manuellement qu'il ne reste aucun `rgb()`/`rgba()` enveloppant une var `--palettes-*`.

## 2. `<lu-icon color>` (✅ automatisé)

L'input `color` du composant Angular `lu-icon` est **pris en charge par le schematic `palettes`** (statique `color="primary"` et bound `[color]="'primary'"`, y compris dans une expression) :

| Suppression | Remplacement |
|---|---|
| `<lu-icon color="primary">` | `<lu-icon color="product">` |
| `<lu-icon color="secondary">` | `<lu-icon color="product">` |

Aucune action manuelle requise. Simplement vérifier après coup qu'il ne reste pas de `color="primary"`/`color="secondary"` sur un `lu-icon`.

## 3. `.mod-grey` (rappel)

Le schematic remplace `.mod-grey` → `.mod-neutral`. À valider systématiquement.
