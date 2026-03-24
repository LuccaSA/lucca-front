# TagComponent

## Quand utiliser ce composant
- Pour afficher des étiquettes ou des mots-clés associés à du contenu, comme des catégories ou des statuts.
- Pour donner de la visibilité à des éléments interactifs ou des informations contextuelles dans une interface utilisateur.
- Pour organiser visuellement des informations en permettant aux utilisateurs de filtrer ou de catégoriser des éléments.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-tags-angular-basic--template)

## Composant Figma
[Pr-Tag Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=17004-73792) - Ce composant représente une étiquette visuelle. Il offre plusieurs variantes de taille (S, M, L) et de type (Fill, Outline) avec diverses palettes de couleurs (ex: Blueberry, Lime, Glacier).

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tags';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-tag>Étiquette</lu-tag>
```

## Directive / Composant : `lu-tag`

Composant destiné à afficher des étiquettes. Applicable sur n'importe quel élément HTML.

### Valeurs

| Valeur         | Description                            |
|----------------|----------------------------------------|
| `""` (vide)    | Variante par défaut                    |
| `"outline"`    | Étiquette avec contour                 |
| `"fill"`       | Étiquette remplie                      |

```html
<lu-tag type="outline">Étiquette</lu-tag>
```

## Inputs

### `size`
Type: `'S' | 'M' | 'L'` — Default: `'M'`

Définit la taille de l'étiquette.

```html
<lu-tag [size]="'S'">Étiquette Petite</lu-tag>
```

### `type`
Type: `'fill' | 'outline'` — Default: `'fill'`

Définit le style de l'étiquette (remplie ou contour).

```html
<lu-tag [type]="'outline'">Étiquette avec Contour</lu-tag>
```

### `palette`
Type: `'Blueberry' | 'Lime' | 'Glacier' | 'Lavender' | 'Cucumber' | 'Kiwi' | 'Success' | 'Neutral' | 'Grape' | 'Lagoon' | 'Pineapple' | 'Warning' | 'Critical'` — Default: `'Blueberry'`

Définit la palette de couleur de l'étiquette.

```html
<lu-tag [palette]="'Lime'">Étiquette Verte</lu-tag>
```

## Patterns courants

### Étiquettes Colorées
```html
<lu-tag size="M" type="fill" palette="Glacier">Étiquette Glacière</lu-tag>
<lu-tag size="S" type="outline" palette="Lime">Étiquette Lime</lu-tag>
```

## Accessibilité
Veiller à ce que les étiquettes soient descriptives et accessibles pour les lecteurs d'écran. Utiliser des couleurs ayant un bon contraste pour assurer la visibilité.

## Guidelines Prisme
- Utiliser les variantes de taille et de type de manière cohérente à travers l'interface.
- Ne pas surcharger d'informations une seule étiquette; garder le texte court et concis.