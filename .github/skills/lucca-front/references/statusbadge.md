# DotBadge

## Quand utiliser ce composant
- Pour afficher un statut visuel associé à un élément (ex. : notifications, messages).
- Lorsqu'il est nécessaire de discriminer des informations par couleur et taille dans une interface utilisateur.
- Pour indiquer un état (comme "actif", "en attente" ou "terminé") de manière concise.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-statusbadge-angular--basic)

## Composant Figma
[Accéder au Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13369-11940) — Composant visuel de badge de statut, avec variantes de tailles S, XS, et M.

## Import

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-status-badge>Contenu du badge</lu-status-badge>
```

## Directive / Composant : `lu-status-badge`

Composant de badge de statut. Applicable pour afficher un badge dans une interface utilisateur.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |
| `"XS"` | Taille extra petite |
| `"M"` | Taille moyenne |

```html
<lu-status-badge size="S">...</lu-status-badge>
```

## Inputs

### `palette`
Type: `'default' | 'primary' | 'success' | 'error' | 'warning' | 'neutral'` — Default: `'default'`

Applique une palette de couleurs au composant.

```html
<lu-status-badge [palette]="'primary'">...</lu-status-badge>
```

### `size`
Type: `'S' | 'XS' | 'M'` — Default: `'S'`

Modifie la taille du composant.

```html
<lu-status-badge [size]="'M'">...</lu-status-badge>
```

### `label`
Type: `string`

Modifie le texte affiché par le composant.

```html
<lu-status-badge [label]="'Nouvelle notification'">...</lu-status-badge>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ajoute une ellipse au texte et une tooltip lorsque le label est trop long.

```html
<lu-status-badge [withEllipsis]="true">Texte trop long pour le badge</lu-status-badge>
```

## Patterns courants

### Badge de statut avec étiquette
```html
<!-- Affichage d'un badge avec étiquette -->
<lu-status-badge [label]="'Actif'" [size]="'M'" [palette]="'success'">...</lu-status-badge>
```

## Accessibilité
Assurez-vous que les badges inclus des attributs ARIA appropriés pour décrire le statut aux lecteurs d'écran.

## Guidelines Prisme
- Utiliser des couleurs de la palette prédéfinie pour assurer la cohérence visuelle.
- Éviter d'utiliser trop d'informations textuelles dans le badge pour ne pas encombrer l'interface.
- Préférer les tailles XS et S pour les badges dans des contextes denses, et M dans des cas où l'espace le permet.