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
| `removable` | `removable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend le composant supprimable. |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `removed` | `unknown` | — | — |







## Related files

- 📝 [Code & implementation](./plg-push.component.md)
- 🎨 [Design guidelines](./plg-push.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`PLGPushComponent`).

### Notes de release (ZeroHeight)

#### 21.1.1

##### Fixed

- `intl` input is now public so its translations can be overridden.

#### 21.1.0

##### Added

- `intl` input to override the component's translations.

#### 21.0.0

##### Added

- `removable` input to display a close button.
- `removed` two-way binding model reflecting whether the push has been closed.

#### 18.2.3

##### Fixed

- Link color inside the push.

#### 18.2.0

##### Added

- `lu-plg-push` component with a `heading` input.
