# CalloutDisclosure

## Quand utiliser ce composant
- Pour afficher des messages ou des alertes de manière contextuelle dans une interface utilisateur.
- Idéal pour fournir des informations supplémentaires sur des actions disponibles ou des événements à venir.
- Utile pour attirer l'attention de l'utilisateur sur des éléments importants ou des mises à jour de statut.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-disclosure-angular--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14686-65156) — Composant visuel de notification avec diverses variantes en termes de taille et de palette.

## Import

```typescript
import { CalloutDisclosureComponent } from '@lucca-front/ng/feedback';
// ou
import { CalloutFeedbackItemComponent } from '@lucca-front/ng/feedback';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout-disclosure [size]="'M'" [palette]="'Neutral'" [opened]="false">Votre message ici</lu-callout-disclosure>
```

## Directive / Composant : `lu-callout-disclosure`

Composant pour afficher des messages de type callout. Applicable sur les notifications ou avertissements dans l'interface.

### Valeurs

| Valeur          | Description                           |
|-----------------|---------------------------------------|
| `""` (Vide)     | Variante par défaut                   |
| `"S"`           | Taille petite                         |
| `"M"`           | Taille moyenne                        |
| `"Neutral"`     | Palette neutre                       |
| `"Success"`     | Palette de succès                     |
| `"Product"`     | Palette produit                       |
| `"Warning"`     | Palette d'avertissement               |
| `"Critical"`    | Palette critique                      |
| `false`         | Fermé (non ouvert)                   |
| `true`          | Ouvert                               |

```html
<lu-callout-disclosure [size]="'S'" [palette]="'Success'" [opened]="true">Message de succès</lu-callout-disclosure>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du callout.

```html
<lu-callout-disclosure [size]="'S'">...</lu-callout-disclosure>
```

### `palette`
Type: `'Neutral' | 'Success' | 'Product' | 'Warning' | 'Critical'` — Default: `'Neutral'`

Définit la palette de couleur du callout.

```html
<lu-callout-disclosure [palette]="'Critical'">...</lu-callout-disclosure>
```

### `opened`
Type: `boolean` — Default: `false`

Indique si le callout est ouvert ou fermé.

```html
<lu-callout-disclosure [opened]="true">...</lu-callout-disclosure>
```

## Patterns courants

### Utilisation d'un callout de succès
```html
<lu-callout-disclosure [size]="'M'" [palette]="'Success'" [opened]="true">Opération réussie !</lu-callout-disclosure>
```

## Accessibilité
Assurez-vous que les messages sont suffisamment descriptifs pour être compris par les utilisateurs utilisant des technologies d'assistance. Utilisez des rôles ARIA appropriés pour indiquer l'état ouvert ou fermé.

## Guidelines Prisme
- Favoriser des messages clairs et concis.
- Ne pas surcharger l'utilisateur avec trop d'informations à la fois.
- Utiliser les palettes de couleur pour indiquer l'importance plutôt que l'état émotionnel.