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
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_PLG_PUSH_TRANSLATIONS` | — | — | — |
| `heading` | `heading` | `string` | `''` | — | — | Ajoute un titre au composant. |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | Rend le composant supprimable. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `removed` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./plg-push.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./plg-push.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.2/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)
- 📋 [Changelog](./plg-push.changelog.md)
