# pr-Skeleton

## Quand utiliser ce composant
- Pour afficher un état de chargement de manière esthétique avant que les données ne soient disponibles.
- Lors de la mise en place de maquettes pour indiquer visuellement des sections de contenu à venir.
- Dans les tableaux ou listes pour masquer le contenu pendant le chargement des données.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19475-8993](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19475-8993) - Ce composant offre diverses variantes d'affichage en fonction du type de contenu à charger, incluant des versions sombres et claires.

## Import

```typescript
import { SkeletonComponent } from '@lucca-front/ng/loaders';
// ou
import { SkeletonDirective } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<div luSkeleton></div>
```

## Directive / Composant : `luSkeleton` ou `<lu-skeleton>`

Directive utilisée pour afficher un composant de chargement. Applicable sur les éléments HTML comme `<div>`, `<span>`, etc.

### Valeurs

| Valeur                   | Description                  |
|--------------------------|------------------------------|
| `""` (vide)              | Variante par défaut          |
| `"Body-S"`               | Skeleton type Body-S         |
| `"Body-XS"`              | Skeleton type Body-XS        |
| `"Heading-1"`            | Skeleton type Heading-1      |
| `"Heading-2"`            | Skeleton type Heading-2      |
| `"Heading-3"`            | Skeleton type Heading-3      |
| `"Heading-4"`            | Skeleton type Heading-4      |
| `"Square"`               | Variante carrée              |
| `"Circle"`               | Variante circulaire          |
| `true` (pour dark)       | Mode sombre activé           |
| `false` (pour dark)      | Mode clair activé            |

```html
<div luSkeleton="Body-M" [dark]="true"></div>
```

## Inputs

### `type`
Type: `'Body-XS' | 'Body-S' | 'Body-M' | 'Heading-1' | 'Heading-2' | 'Heading-3' | 'Heading-4' | 'Square' | 'Circle'` — Default: `''`

Définit le type de Skeleton à afficher.

```html
<div luSkeleton [type]="'Heading-2'"></div>
```

### `dark`
Type: `boolean` — Default: `false`

Détermine si le Skeleton doit être affiché en mode sombre.

```html
<div luSkeleton [dark]="true"></div>
```

## Patterns courants

### Exemple de Skeleton de tableau
```html
<!-- Affiche un Skeleton type DataTable -->
<div luSkeleton="Square" [dark]="false">...</div>
```

## Accessibilité
Le composant Skeleton ne doit pas être utilisé lorsque le contenu peut être chargé rapidement et ne doit pas interférer avec l'accessibilité. Il est essentiel d'informer les utilisateurs que le contenu est en cours de chargement.

## Guidelines Prisme
- Ne pas abuser des Skeletons, utilisation limitée aux chargements appropriés.
- Toujours tester l'impact de l'utilisation du Skeleton sur l'expérience utilisateur, surtout dans le cadre de la lecture de contenu.