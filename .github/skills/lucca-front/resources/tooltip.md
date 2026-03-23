# pr-Tooltip

## Quand utiliser ce composant
- Pour fournir des informations additionnelles au survol d'un élément interactif.
- Pour expliquer des actions ou des fonctionnalités dans une interface utilisateur.
- Pour donner des conseils ou des recommandations sans encombrer l'interface.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)

## Composant Figma
[Visuel du pr-Tooltip dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5639-31388) - Le pr-Tooltip présente une aide contextuelle avec une flèche indiquant l'élément, disponible en variante par défaut.

## Import

```typescript
import { PrTooltipComponent } from '@lucca-front/ng/overlays';
```

## Usage de base

```html
<!-- Usage minimal -->
<span prTooltip="Texte d'aide">Survolez-moi</span>
```

## Directive / Composant : `prTooltip` ou `<pr-tooltip>`

Directive utilisée pour afficher une aide contextuelle lors du survol d'un élément HTML standard. Applicable à tout élément pouvant être survolé.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Affiche le contenu par défaut. |

```html
<span prTooltip="Texte d'aide">Survolez-moi</span>
```

## Inputs

### `content`
Type: `string` — Default: `''`

Le texte à afficher dans le tooltip.

```html
<span prTooltip [content]="'Texte d\'aide'">Survolez-moi</span>
```

## Patterns courants

### Tooltip sur un bouton
```html
<!-- Afficher un tooltip sur un bouton -->
<button prTooltip="Cliquez ici pour sauvegarder" type="button">Sauvegarder</button>
```

## Accessibilité
Assurez-vous que le tooltip est associé à un élément de manière à ne pas interférer avec les utilisateurs de lecteurs d'écran. Utilisez des attributs ARIA si nécessaire pour décrire le contenu du tooltip.

## Guidelines Prisme
Évitez d'afficher trop d'informations dans le tooltip afin de maintenir une interface propre. Ne pas utiliser de tooltips pour des informations critiques ou vitales, privilégiez les messages en ligne.