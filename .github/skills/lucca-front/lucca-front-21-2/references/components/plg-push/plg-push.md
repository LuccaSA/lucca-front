# plg-push

## Import

```typescript
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

## Basic Usage

```html
<lu-plg-push > Bénéficiez de toutes les options liées au télétravail avec Timmi Office. <a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer"> <span class="link-text">Demander un essai gratuit</span><!-- no text node here --><span class="link-icon"><lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" /></span> </a>
</lu-plg-push>
```

## API Reference

### PLGPushComponent (component)

**Selector:** `lu-plg-push`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `heading` | `heading` | `string` | `''` | — | — | Ajoute un titre au composant. |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | Rend le composant supprimable. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `removed` | `unknown` | — | — |

## Related files

- 📝 [Code & implementation](./plg-push.component.md)
- 🎨 [Design guidelines](./plg-push.design.md)
- 🎯 [Figma design tokens](./plg-push.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`PLGPushComponent`).
