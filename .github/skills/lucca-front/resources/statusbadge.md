# StatusBadge

## Quand utiliser ce composant
- Pour indiquer un statut dans une liste d'éléments (par exemple, dans un tableau de tâches).
- Pour afficher des notifications de succès, d'erreur ou d'avertissement de manière visuelle.
- Dans les badges d'icônes pour fournir une indication de priorité ou de statut d'élément.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-statusbadge-angular--basic)

## Composant Figma
[Visuel Figma du composant pr-DotBadge](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13369-11940) - Ce composant est disponible en trois tailles : S, XS, et M.

## Import

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-status-badge label="Statut" />
```

## Directive / Composant : `lu-status-badge` ou `<lu-status-badge>`

Directive pour afficher un badge de statut. Applicable sur des éléments HTML pour indiquer des statuts.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"M"` | Variante de taille Medium |
| `"S"` | Variante de taille Small |
| `"XS"` | Variante de taille Extra Small |

```html
<lu-status-badge size="M" label="Statut" />
```

## Inputs

### `label`
Type: `string` — Default: `''`

Texte affiché par le composant.

```html
<lu-status-badge label="En cours">...</lu-status-badge>
```

### `size`
Type: `'S' | 'XS' | 'M'` — Default: `''`

Modifie la taille du composant.

```html
<lu-status-badge size="S" label="Petit badge">...</lu-status-badge>
```

### `palette`
Type: `'' | 'product' | 'neutral' | 'success' | 'warning' | 'error'` — Default: `''`

Applique une palette de couleurs au composant.

```html
<lu-status-badge palette="success" label="Succès">...</lu-status-badge>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ajoute une ellipse et une tooltip lorsque le label est trop long.

```html
<lu-status-badge label="Un label très long qui déborde" withEllipsis="true"></lu-status-badge>
```

## Patterns courants

### Badge de succès
```html
<lu-status-badge label="Succès" palette="success" size="M">...</lu-status-badge>
```

## Accessibilité
Assurez-vous que le texte du badge est suffisamment contrasté avec l'arrière-plan pour être lisible. Utilisez des attributs ARIA si nécessaire pour améliorer la compréhension du statut.

## Guidelines Prisme
- Utilisez toujours des étiquettes descriptives pour les badges.
- Évitez les couleurs qui pourraient prêter à confusion dans des contextes différents (par exemple, rouge pour une alerte et rouge pour l'erreur).
- Gardez les textes courts et pertinents pour une meilleure lisibilité.