# PLG Push

Promotional inline push component for product-led growth messaging.

**Storybook:** [Documentation/Feedback/PLG Push/Angular/Basic](https://storybook.lucca-front.com)

## Figma Design

**Component:** [PLG Push - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=22031-14975)  
**Node ID:** `22031-14975`

## Import

```typescript
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

## Basic Usage

```html
<lu-plg-push>
  Beneficiez de toutes les options liees au teletravail avec Timmi Office.
  <a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
    <span class="link-text">Demander un essai gratuit</span>
    <span class="link-icon">
      <lu-icon icon="arrowExternal" alt="Ouvrir dans une nouvelle fenetre" />
    </span>
  </a>
</lu-plg-push>
```

## Inputs

### `heading`
Type: `string` (default: `''`)

Adds a title to the component.

```html
<lu-plg-push heading="Nouveau">
  Votre contenu promotionnel ici.
</lu-plg-push>
```

### `removable`
Type: `boolean` (default: `false`)

Displays a close button to dismiss the component.

```html
<lu-plg-push heading="Suggestion" removable>
  Message marketing avec action.
</lu-plg-push>
```

### `removed`
Type: `boolean` (two-way model)

Controls visibility. When true, the component is hidden.

```html
<lu-plg-push [removed]="hiddenPush" removable>
  Message visible uniquement si hiddenPush = false.
</lu-plg-push>
```

## Common Patterns

### Marketing CTA

```html
<lu-plg-push heading="Decouvrez Timmi Office" removable>
  Beneficiez de toutes les options liees au teletravail.
  <a class="link mod-icon" href="/demo" target="_blank" rel="noopener noreferrer">
    <span class="link-text">Demander un essai gratuit</span>
    <span class="link-icon"><lu-icon icon="arrowExternal" alt="Ouvrir dans une nouvelle fenetre" /></span>
  </a>
</lu-plg-push>
```

### Dismiss Once

```typescript
hiddenPush = localStorage.getItem('plg-push-dismissed') === '1';

onDismiss() {
  this.hiddenPush = true;
  localStorage.setItem('plg-push-dismissed', '1');
}
```

```html
<lu-plg-push [removed]="hiddenPush" removable>
  Offre limitee.
</lu-plg-push>
```

## Accessibility

- Keep link text explicit and actionable
- Use meaningful icon `alt` text when icon conveys behavior
- Ensure dismiss action is keyboard accessible when `removable` is enabled

