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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`MobilePushComponent`).

### Notes de release (ZeroHeight)

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 21.0.3

##### Changed

- Store links now warn assistive technologies that they open in a new tab.

#### 20.1.1

##### Added

- `appStoreLinkClicked` and `googlePlayLinkClicked` outputs, emitted when the corresponding store link is clicked.

#### 20.1.0

##### Added

- `lu-mobile-push` component (`mobilePush`) with the `intl` input, to promote the mobile application.
