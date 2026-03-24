# CalloutPopover

## Quand utiliser ce composant
- Lorsque vous souhaitez fournir des informations contextuelles supplémentaires sur un élément interactif.
- Pour afficher des messages d'alerte ou de succès près d'un élément particulier, comme un bouton ou un champ de formulaire.
- Dans les situations où une interaction rapide est nécessaire, comme lors de la confirmation d'une action.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-popover-angular--template)

## Composant Figma
[Visuel du composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14695-6658) - Variantes disponibles en taille (XS, S, M), palettes (Neutral, Product, Success, Warning, Critical) et états (Hover, Focus, Default).

## Import

```typescript
import { CalloutPopoverComponent } from '@lucca-front/ng/feedback';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout-popover>Votre message ici</lu-callout-popover>
```

## Directive / Composant : `lu-callout-popover`

Composant permettant d'afficher un popover d'appel, généralement utilisé pour des notifications contextuelles.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-callout-popover size="S" palette="Product" state="Hover">Votre message ici</lu-callout-popover>
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M'` — Default: `'M'`

Définit la taille du popover.

```html
<lu-callout-popover [size]="'S'">Votre message ici</lu-callout-popover>
```

### `palette`
Type: `'Neutral' | 'Product' | 'Success' | 'Warning' | 'Critical'` — Default: `'Neutral'`

Définit la palette de couleur du popover.

```html
<lu-callout-popover [palette]="'Success'">Votre message ici</lu-callout-popover>
```

### `state`
Type: `'Hover' | 'Focus' | 'Default'` — Default: `'Default'`

Définit l'état d'affichage du popover.

```html
<lu-callout-popover [state]="'Hover'">Votre message ici</lu-callout-popover>
```

## Patterns courants

### Affichage d'une notification de succès
```html
<lu-callout-popover size="M" palette="Success">Action réussie !</lu-callout-popover>
```

## Accessibilité
Veillez à ce que le popover soit associé à son élément déclencheur pour garantir que les lecteurs d'écran puissent fournir le bon contexte. Utilisez des attributs ARIA appropriés.

## Guidelines Prisme
- Assurez-vous que le contenu des popovers soit concis et informatif.
- Évitez de surcharger le popover avec trop d'informations.
- Testez le composant dans diverses tailles d'écran pour assurer la responsivité.