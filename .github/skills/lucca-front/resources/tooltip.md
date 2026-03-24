# Tooltip

## Quand utiliser ce composant
- Pour fournir des informations supplémentaires au survol d’un bouton ou d’un lien.
- Pour aider l'utilisateur à comprendre une fonctionnalité sans l'encombrer visuellement.
- Pour montrer des conseils ou des messages d'erreur de manière contextuelle.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)

## Composant Figma
[Voir sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5639-31388) - Le composant pr-Tooltip fournit une aide contextuelle visuelle avec une variante disponible.

## Import

```typescript
import { TooltipComponent } from '@lucca-front/ng/tooltip';
```

## Usage de base

```html
<!-- Usage minimal -->
<button luTooltip="Texte d'aide contextuelle" type="button">Survoler moi</button>
```

## Directive / Composant : `luTooltip` ou `<lu-tooltip>`

Affiche un tooltip d’aide contextuelle au survol d’un élément HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<button luTooltip="Texte d'aide contextuelle" type="button">Survoler moi</button>
```

## Inputs

### `content`
Type: `string` — Default: `undefined`

Le texte à afficher dans le tooltip.

```html
<button luTooltip [content]="'Texte d\'aide contextuelle'" type="button">Survoler moi</button>
```

## Patterns courants

### Tooltip sur un bouton
```html
<!-- Affiche un tooltip lorsque l'on survole le bouton -->
<button luTooltip="Texte d'aide contextuelle" type="button">Survoler moi</button>
```

## Accessibilité
Veillez à ce que les tooltips soient accessibles via le clavier et que leur contenu soit disponible pour les lecteurs d'écran.

## Guidelines Prisme
- Toujours utiliser les tooltips pour fournir des informations complémentaires sans surcharger l'interface.
- Évitez d'utiliser des tooltips pour afficher des informations critiques, car ils ne sont pas toujours visibles.
- Assurez-vous que le contenu du tooltip est concis et pertinent pour l'élément qu'il accompagne.