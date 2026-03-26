# pr-Skeleton

## Quand utiliser ce composant
- Lorsque vous souhaitez indiquer que des données sont en cours de chargement.
- Pour remplacer temporairement des éléments d'interface utilisateur pendant le chargement de contenu.
- Idéal pour les situations où le temps de chargement peut affecter l'expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Composant Figma
[Visuel du pr-Skeleton Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19475-8993) - le composant présente plusieurs variantes liées aux types de texte (Body, Heading) et modes (Dark/Light).

## Import

```typescript
import { SkeletonComponent } from '@lucca-front/ng/loaders';
// ou
import { SkeletonDirective } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton></lu-skeleton>
```

## Directive / Composant : `luSkeleton` ou `<lu-skeleton>`

Le sélecteur `luSkeleton` est utilisé pour afficher des éléments de chargement. Applicable sur n'importe quel élément HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"body-s"` | Skeleton de petite taille pour le texte de contenu |
| `"body-xs"` | Skeleton de très petite taille pour un texte compact |
| `"heading-1"` | Skeleton de taille pour un titre de niveau 1 |
| `"heading-2"` | Skeleton de taille pour un titre de niveau 2 |
| `"heading-3"` | Skeleton de taille pour un titre de niveau 3 |
| `"heading-4"` | Skeleton de taille pour un titre de niveau 4 |
| `"square"` | Skeleton sous forme carrée |
| `"circle"` | Skeleton sous forme circulaire |
| `"dark"` | Variante sombre pour tous les types |

```html
<lu-skeleton type="body-s" dark="true"></lu-skeleton>
```

## Inputs

### `type`
Type: `'body-s' | 'body-xs' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'square' | 'circle'` — Default: `'body-s'`

Indique le type de skeleton à afficher.

```html
<lu-skeleton [type]="'heading-2'"></lu-skeleton>
```

### `dark`
Type: `boolean` — Default: `false`

Indique si le mode sombre doit être appliqué.

```html
<lu-skeleton [dark]="true"></lu-skeleton>
```

## Patterns courants

### Pattern de chargement
```html
<!-- Utilisation d'un skeleton pour indiquer le chargement d'un contenu -->
<lu-skeleton type="heading-3" dark="false"></lu-skeleton>
```

## Accessibilité
Utiliser des attributs aria pour indiquer que le contenu est en cours de chargement afin que les lecteurs d'écran puissent l'annoncer correctement.

## Guidelines Prisme
1. Ne pas utiliser le skeleton trop longtemps afin de ne pas frustrer les utilisateurs.
2. Assurez-vous que le skeleton correspond visuellement à l'élément qu'il remplace une fois le chargement terminé.
3. Évitez d'utiliser trop de skeletons en même temps, ce qui pourrait distraire l'utilisateur.