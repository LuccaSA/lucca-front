# footer

## Import

```typescript
import { FooterComponent } from '@lucca-front/ng/footer';
```

## Basic Usage

```html
<lu-footer narrowAtMediaMax=XXS> <ng-container footerContent> Content </ng-container> <button type="button" luButton>Button</button> <button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## API Reference

### FooterComponent (component)

**Selector:** `lu-footer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `sticky` | `sticky` | `boolean` | `false` | — | `luBooleanAttribute` | Fige le footer lors du défilement vertical. |
| `container` | `container` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un container autour du contenu du footer. |
| `containerMax` | `containerMax` | `FooterContainerMax \| null` | — | — | — | Définit la largeur maximale du container. |
| `forceNarrow` | `forceNarrow` | `boolean` | `false` | — | `luBooleanAttribute` | Force le mode narrow (responsive) du footer. |
| `dialog` | `dialog` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `narrowAtMediaMax` | `narrowAtMediaMax` | `'XXS' \| 'XS' \| 'S' \| 'M'` | `'XXS'` | — | — | Définit le breakpoint pour lequel le mode narrow (responsive) est appliqué. |

## Related files

- 📝 [Code & implementation](./footer.component.md)
- 🎨 [Design guidelines](./footer.design.md)
- 🎯 [Figma design tokens](./footer.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-cards-footer--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `sticky` : transform booleanAttribute → luBooleanAttribute
~ `container` : transform booleanAttribute → luBooleanAttribute
~ `forceNarrow` : transform booleanAttribute → luBooleanAttribute
~ `dialog` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `FOOTER_CONTAINER_MAX` and `FOOTER_NARROW_AT_MEDIA_MAX` constants, together with the `FooterContainerMax` and `FooterNarrowAtMediaMax` types, are now publicly exported and used to type the `containerMax` and `narrowAtMediaMax` inputs.

#### 21.2.1

##### Fixed

- Padding of the footer inside a `mod-fancy` dialog.

#### 21.2.0

##### Added

- `containerMax` input to cap the width of the footer container.

#### 20.1.3

##### Fixed

- `sticky` footer now stays sticky even when the wrapper does not use `display: contents`.

#### 20.1.0

##### Added

- The footer content can be aligned with the page container.

#### 19.3.4

##### Fixed

- The Angular wrapper uses `display: contents` so it does not break the footer layout.

#### 19.3.0

##### Added

- `lu-footer` component (`footer`) with the `container`, `dialog`, `sticky`, `forceNarrow` and `narrowAtMediaMax` inputs.

##### Fixed

- Footer buttons now wrap instead of overflowing on narrow screens.

#### 18.2.1

##### Fixed

- Container width of the footer.

#### 18.1.1

##### Fixed

- `sticky` footer position and margins.

#### 18.1.0

##### Added

- Responsive footer with container support and `--components-footer-*` CSS custom properties.
