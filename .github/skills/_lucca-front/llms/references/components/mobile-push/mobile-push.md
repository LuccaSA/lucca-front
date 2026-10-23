# mobile-push

## Import

```typescript
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```

## Basic Usage

```html
<lu-mobile-push (appStoreLinkClicked)="appStoreLinkClicked()" (googlePlayLinkClicked)="googlePlayLinkClicked()"> Posez une absence depuis n’importe où avec l’application Lucca.
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

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_MOBILE_PUSH_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./mobile-push.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.0.5

+ token `LU_MOBILE_PUSH_TRANSLATIONS` : unknown

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
