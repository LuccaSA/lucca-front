# pr-Skeleton

## Quand utiliser ce composant
- Lorsque vous souhaitez indiquer un chargement pour un contenu qui sera bientôt disponible.
- Dans des listes de données pour montrer que des éléments sont en cours de chargement (ex: tableaux, corps de liste).
- Pour fournir une indication visuelle sur l'interface utilisateur pendant le chargement d'éléments disparates.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Composant Figma
[Visuel du pr-Skeleton](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19475-8993) - Variantes disponibles : Body-S, Body-XS, Heading-2, Heading-4, Square, Circle, avec options Dark et Light.

## Import

```typescript
import { PrSkeletonComponent } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton></lu-skeleton>
```

## Directive / Composant : `luSkeleton` ou `<lu-skeleton>`

Composant utilisé pour afficher un indicateur de chargement. Applicable sur les éléments de type block.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"Body-S"` | Squelette de petite taille pour le corps |
| `"Body-XS"` | Squelette très petit pour le corps |
| `"Heading-1"` | Squelette pour catégorie 1 de titre |
| `"Heading-2"` | Squelette pour catégorie 2 de titre |
| `"Heading-3"` | Squelette pour catégorie 3 de titre |
| `"Heading-4"` | Squelette pour catégorie 4 de titre |
| `"Square"` | Squelette en forme carrée |
| `"Circle"` | Squelette en forme circulaire |
| `"Dark"` | Variante en mode sombre |

```html
<lu-skeleton type="Body-S" [dark]="true"></lu-skeleton>
```

## Inputs

### `type`
Type: `'Body-S' | 'Body-XS' | 'Heading-1' | 'Heading-2' | 'Heading-3' | 'Heading-4' | 'Square' | 'Circle'` — Default: `'Body-S'`

Définit le type de squelette à afficher.

```html
<lu-skeleton [type]="'Heading-2'"></lu-skeleton>
```

### `dark`
Type: `boolean` — Default: `false`

Définit si le squelette doit être affiché en mode sombre.

```html
<lu-skeleton [dark]="true"></lu-skeleton>
```

## Patterns courants

### Affichage d'un squelette de chargement
```html
<!-- Indication de chargement pour un titre -->
<lu-skeleton type="Heading-1" [dark]="false"></lu-skeleton>
```

## Accessibilité
Le pr-Skeleton ne doit pas être utilisé en tant qu'élément interactif. S'assurer que le contenu est remplacé par un contenu réel une fois le chargement terminé.

## Guidelines Prisme
L'utilisation de pr-Skeleton doit être rapide et ne pas perturber l'expérience utilisateur. Privilégier des temps d'affichage courts pour éviter la congestion visuelle.