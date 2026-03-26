# SkeletonFieldComponent

## Quand utiliser ce composant
1. Pour indiquer à l'utilisateur qu'un contenu est en cours de chargement, tout en précisant son type et sa position.
2. Lors de la transition entre deux états d'affichage afin d'améliorer l'expérience utilisateur.
3. Pour éviter l'affichage de contenu vide tout en offrant une indication visuelle de chargement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-field--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-field--template)

## Composant Figma
[pr-SkeletonFormField (v18.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46919) - Ce composant présente une série de rectangle ou ligne qui indiquent la zone d'affichage d'un contenu à venir, dans des formes spécifiques selon le type de donnée (texte, image, etc.). La variante disponible est pr-SkeletonFormField (v18.1).

## Import

```typescript
import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-field></lu-skeleton-field>
```

## Directive / Composant : `lu-skeleton-field`

Ce sélecteur représente un indicateur de chargement qui peut être appliqué à divers éléments HTML.

## Inputs

### `hiddenLabel`
Type: `boolean` — Default: `false`

Si l'étiquette doit être cachée lors du rendu.

```html
<lu-skeleton-field [hiddenLabel]="true"></lu-skeleton-field>
```

### `rows`
Type: `number` — Default: `1`

Nombre de lignes à afficher pour simuler le contenu.

```html
<lu-skeleton-field [rows]="3"></lu-skeleton-field>
```

## Patterns courants

### Utilisation standard
```html
<!-- Affichage d'une ligne de chargement -->
<lu-skeleton-field [rows]="1"></lu-skeleton-field>
```

## Accessibilité
Assurez-vous que les composants de type skeleton ne sont pas utilisés comme éléments d'interaction et qu'ils ne remplacent pas des informations essentielles.

## Guidelines Prisme
- Évitez de rendre trop de contenu de skeleton en même temps, ce qui pourrait confondre l'utilisateur.
- Limitez la durée d'affichage des skeletons et remplacez-les par du contenu réel dès qu'il est disponible.