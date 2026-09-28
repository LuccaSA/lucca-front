# mobile-push

## Import

```typescript
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```

## Basic Usage

```html
<lu-mobile-push > Posez une absence depuis n’importe où avec l’application Lucca.
</lu-mobile-push>
```

## API Reference

### MobilePushComponent (component)

**Selector:** `lu-mobile-push`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `appStoreLinkClicked` | `appStoreLinkClicked` | `void` | — |
| `googlePlayLinkClicked` | `googlePlayLinkClicked` | `void` | — |

## Related files

- 📝 [Code & implementation](./mobile-push.component.md)

- 🎯 [Figma design tokens](./mobile-push.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`MobilePushComponent`).
