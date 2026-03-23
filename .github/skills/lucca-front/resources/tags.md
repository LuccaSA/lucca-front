# Tag

## Quand utiliser ce composant
- Pour afficher des informations contextuelles de manière succincte, comme des statuts ou des catégories.
- Pour marquer ou filtrer des éléments dans une liste ou un tableau, offrant une visibilité rapide.
- Pour inclure des icônes à côté des textes afin d'améliorer la compréhension ou l'attrait visuel.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs) | [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-tags-angular-basic--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=17004-73792) + Composant visuel représentant des tags variés en termes de taille, de type et de palette.

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-tag label="Exemple de tag"></lu-tag>
```

## Directive / Composant : `lu-tag` ou `<lu-tag>`

Composant pour afficher un tag qui peut contenir du texte, et possiblement une icône. Applicable sur tous les éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"outlined"` | Applique un style secondaire au tag |

```html
<lu-tag outlined label="Tag outline"></lu-tag>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Texte affiché par le composant.

```html
<lu-tag [label]="'Mon tag'"></lu-tag>
```

### `size`
Type: `'S' | 'M' | 'L'` — Default: `'M'`

Modifie la taille du tag.

```html
<lu-tag [size]="'S'" label="Tag petit"></lu-tag>
```

### `palette`
Type: `'Blueberry' | 'Lime' | 'Glacier' | 'Cucumber' | 'Kiwi' | 'Success' | 'Grape' | 'Lagoon' | 'Mint' | 'Neutral' | 'Warning' | 'Critical' | 'AI'` — Default: `null`

Définit la palette de couleur du tag.

```html
<lu-tag [palette]="'Success'" label="Tag réussi"></lu-tag>
```

### `outlined`
Type: `boolean` — Default: `false`

Applique un style secondaire au tag.

```html
<lu-tag [outlined]="true" label="Tag outline"></lu-tag>
```

### `icon`
Type: `string | null` — Default: `null`

Ajoute une icône au tag.

```html
<lu-tag [icon]="'my-icon'" label="Tag avec icône"></lu-tag>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ellipse le texte et ajoute une tooltip lorsque le label est trop long.

### `AI`
Type: `boolean` — Default: `false`

Applique les couleurs IA.

## Patterns courants

### Tag Simple
```html
<!-- Un tag simple affichant un texte de base -->
<lu-tag label="Tag simple"></lu-tag>
```

### Tag avec Icône
```html
<!-- Un tag avec une icône pour plus de contexte -->
<lu-tag label="Tag avec icône" [icon]="'icon-name'"></lu-tag>
```

## Accessibilité
Assurez-vous d'utiliser des labels clairs pour le texte des tags, et d'inclure des icônes qui sont facilement compréhensibles.

## Guidelines Prisme
- Utiliser des couleurs cohérentes selon les palettes de design définies.
- Éviter d'utiliser trop de tags pour des groupes d'informations pour ne pas submerger l'utilisateur.
- Assurer que le texte est lisible et que les tailles des tags sont appropriées selon le contexte d'utilisation.