# CalloutPopover

## Quand utiliser ce composant
- Lorsque vous souhaitez afficher des informations contextuelles pour aider l'utilisateur dans une tâche.
- Pour présenter une liste d'éléments accompagnée d'actions ou d'options supplémentaires.
- Quand un feedback visuel est nécessaire sans perturber le flux de travail de l'utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-popover-angular--template)

## Composant Figma
[Accéder à Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14695-6658) - Composant visuel de popover avec plusieurs variantes de tailles et de palettes de couleurs.

## Import

```typescript
import { CalloutPopoverComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout-popover>...</lu-callout-popover>
```

## Directive / Composant : `lu-callout-popover`

Composant utilisé pour afficher un popover d'appel, qui peut contenir des informations ou des actions contextuelles.

### Inputs

### `items`
Type: `number` — Default: `0`

Nombre d'éléments présentés dans le popover.

```html
<lu-callout-popover [items]="3">...</lu-callout-popover>
```

### `buttonLabel`
Type: `string` — Default: `''`

Label du bouton à afficher dans le popover.

```html
<lu-callout-popover [buttonLabel]="'Cliquez ici'">...</lu-callout-popover>
```

### `buttonAlt`
Type: `string` — Default: `''`

Information restituée par le bouton.

```html
<lu-callout-popover [buttonAlt]="'Info supplémentaire'">...</lu-callout-popover>
```

### `icon`
Type: `string` — Default: `''`

Ajoute une icône au callout.

```html
<lu-callout-popover [icon]="'info'">...</lu-callout-popover>
```

### `state`
Type: `'default' | 'hover' | 'focus'` — Default: `'default'`

État du callout.

```html
<lu-callout-popover [state]="'hover'">...</lu-callout-popover>
```

### `heading`
Type: `string` — Default: `''`

Ajoute un titre au popover.

```html
<lu-callout-popover [heading]="'Titre du popover'">...</lu-callout-popover>
```

### `headingHiddenIfSingleItem`
Type: `boolean` — Default: `false`

Masque le titre si le popover ne contient qu'un élément.

```html
<lu-callout-popover [headingHiddenIfSingleItem]="true">...</lu-callout-popover>
```

### `palette`
Type: `'neutral' | 'product' | 'success' | 'warning' | 'critical'` — Default: `'neutral'`

Applique une palette de couleurs au callout.

```html
<lu-callout-popover [palette]="'success'">...</lu-callout-popover>
```

### `closeDelay`
Type: `number` — Default: `0`

Délai nécessaire à la fermeture du popover.

```html
<lu-callout-popover [closeDelay]="300">...</lu-callout-popover>
```

### `openDelay`
Type: `number` — Default: `0`

Délai nécessaire à l'ouverture du popover.

```html
<lu-callout-popover [openDelay]="300">...</lu-callout-popover>
```

### `customText`
Type: `string` — Default: `''`

Remplace la liste d’éléments par un texte personnalisé.

```html
<lu-callout-popover [customText]="'Texte personnalisé ici'">...</lu-callout-popover>
```

## Patterns courants

### Affichage d'une liste d'éléments
```html
<lu-callout-popover [items]="3" [palette]="'neutral'">
    <ul lu-callout-feedback-list palette="neutral">
        <li>Élément 1</li>
        <li>Élément 2</li>
        <li>Élément 3</li>
    </ul>
</lu-callout-popover>
```

## Accessibilité
Assurez-vous que les popovers disposent d'un focus visible pour les utilisateurs de claviers. Utilisez des descriptions claires qui s'affichent dans le contexte approprié.

## Guidelines Prisme
- Utilisez des palettes de couleurs précises dans le contexte de l'application.
- Évitez d’encombrer le popover avec trop d'éléments, privilégiez la clarté et la simplicité.
- Testez les popovers pour différents états d'interaction afin d'assurer une expérience utilisateur fluide.