# pr-SkeletonFormField (v18.1)

## Quand utiliser ce composant
- Pour indiquer le chargement des données dans un formulaire tout en préservant la structure visuelle.
- Lorsqu'il est nécessaire de placeholder des éléments lorsque le contenu réel est en cours d'obtention à partir d'une API.
- Pour améliorer l'expérience utilisateur en évitant de montrer un espace vide lors de chargements prolongés.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-field--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-field--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46919) - Le pr-SkeletonFormField est représenté par un cadre vide qui simule l'apparence d'un champ de formulaire en cours de chargement. Variantes disponibles : pr-SkeletonFormField (v18.1).

## Import

```typescript
import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-field></lu-skeleton-field>
```

## Directive / Composant : `luSkeletonField` ou `<lu-skeleton-field>`

Permet d'afficher un champ de formulaire en mode chargement. Applicable sur les éléments HTML associés aux formulaires.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-skeleton-field></lu-skeleton-field>
```

## Inputs

### `dark`
Type: `boolean` — Default: `false`

Indique si le skeleton doit avoir un fond sombre.

```html
<lu-skeleton-field [dark]="true"></lu-skeleton-field>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Permet de cacher l'étiquette du champ pour un affichage minimaliste.

```html
<lu-skeleton-field [hiddenLabel]="true"></lu-skeleton-field>
```

### `rows`
Type: `number` — Default: `1`

Définit le nombre de lignes du skeleton.

```html
<lu-skeleton-field [rows]="3"></lu-skeleton-field>
```

## Patterns courants

### Skeleton de formulaire
```html
<!-- Affichage d'un skeleton pour un champ de texte -->
<lu-skeleton-field [rows]="1"></lu-skeleton-field>
```

## Accessibilité
Assurez-vous que les éléments de skeleton sont marqués avec des attributs `aria-live` pour informer les lecteurs d'écran qu'un chargement est en cours.

## Guidelines Prisme
- Utiliser le pr-SkeletonFormField pour tous les types de chargements visibles dans les formulaires.
- Ne pas abuser des skeletons, privilégier leur utilisation lors de chargements prolongés.
- Toujours donner à l'utilisateur une indication claire de ce qui est en cours de chargement.