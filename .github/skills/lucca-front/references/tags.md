# pr-Tag

## Quand utiliser ce composant
1. Pour afficher des étiquettes ou des badges d'information dans des listes ou des tableaux.
2. Lorsqu'il est nécessaire d'indiquer des statuts ou des catégories d'éléments dans une interface utilisateur.
3. Pour afficher des tags interactifs qui peuvent avoir une icône ou être stylisés de manière variée selon différents états.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-tags-angular-basic--template)

## Composant Figma
[pr-Tag Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=17004-73792) — Un composant qui affiche une étiquette avec différentes tailles, styles et palettes de couleurs.

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-tag label="Exemple de tag"></lu-tag>
```

## Directive / Composant : `lu-tag`

Composant utilisé pour afficher des tags. Applicable sur tout élément nécessitant une étiquette descriptive.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut. |
| `"outlined"` | Applique un style secondaire au tag. |

```html
<lu-tag outlined label="Tag Outline"></lu-tag>
```

## Inputs

### `size`
Type: `'S' | 'M' | 'L'` — Default: `'M'`

Modifie la taille du tag.

```html
<lu-tag size="S" label="Petit Tag"></lu-tag>
```

### `outlined`
Type: `boolean` — Default: `false`

Applique un style secondaire au tag.

```html
<lu-tag outlined label="Tag Outline"></lu-tag>
```

### `icon`
Type: `string` — Default: `undefined`

Ajoute une icône au tag.

```html
<lu-tag icon="star" label="Tag avec icône"></lu-tag>
```

### `AI`
Type: `boolean` — Default: `false`

Applique les couleurs IA.

```html
<lu-tag AI label="Tag IA"></lu-tag>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ellipse le texte et ajoute une tooltip lorsque le label est trop long.

```html
<lu-tag withEllipsis label="Un très long texte pour un tag"></lu-tag>
```

### `label`
Type: `string` — Default: `""`

Modifie le texte affiché par le composant.

```html
<lu-tag label="Exemple de Tag"></lu-tag>
```

## Patterns courants

### Affichage de Statut
```html
<lu-tag size="M" outlined label="Statut"></lu-tag>
```

## Accessibilité
Assurez-vous que les labels sont descriptifs et que tous les tags utilisent l'attribut `aria-label` si le texte n'est pas suffisant pour comprendre leur fonction.

## Guidelines Prisme
- Toujours utiliser des couleurs qui contrastent bien pour garantir la lisibilité.
- Évitez d'utiliser trop d'icônes sur les tags pour ne pas surcharger visuellement l'interface.
- Gardez les textes des tags courts et clairs pour une meilleure compréhension.