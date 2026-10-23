# fancybox

**Sommaire**

- Import
- Basic Usage
- API Reference
  - FancyBoxComponent (component)
- Related files
- Changelog
  - 22.1.0
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Basic Usage

```html
<lu-fancy-box backgroundEndStart="plant" backgroundStartEnd="candies" foregroundStartEnd="pizza" foregroundEndStart="clips"> Content<br />Content<br />Content<br />Content<br />Content<br />Content </lu-fancy-box>
```

## API Reference

### FancyBoxComponent (component)

**Selector:** `lu-fancy-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `foreground` | `foreground` | `string \| null` | `null` | — | — | ⚠️ **Déprécié** : use `foregroundStartEnd` instead URL de l’image au premier plan (200x160). |
| `backgroundLeft` | `backgroundLeft` | `FancyBoxBackgroundEndStart \| string \| null` | `null` | — | — | ⚠️ **Déprécié** : use `backgroundEndStart` instead URL de l’image en arrière plan à gauche (200x160). |
| `backgroundRight` | `backgroundRight` | `FancyBoxBackgroundStartEnd \| string \| null` | `null` | — | — | ⚠️ **Déprécié** : use `backgroundStartEnd` instead URL de l’image en arrière plan à droite (200x160). |
| `foregroundStartEnd` | `foregroundStartEnd` | `FancyBoxForegroundStartEnd \| string \| null` | `null` | — | — | Image au premier plan, en haut du côté "fin" (droite en LTR, gauche en RTL). Accepte aussi une URL pour une illustration… |
| `foregroundEndStart` | `foregroundEndStart` | `FancyBoxForegroundEndStart \| string \| null` | `null` | — | — | Image au premier plan, en bas du côté "début" (gauche en LTR, droite en RTL). Accepte aussi une URL pour une illustratio… |
| `backgroundEndStart` | `backgroundEndStart` | `FancyBoxBackgroundEndStart \| string \| null` | `null` | — | — | Image en arrière plan, en bas du côté "début" (gauche en LTR, droite en RTL). Accepte aussi une URL pour une illustratio… |
| `backgroundStartEnd` | `backgroundStartEnd` | `FancyBoxBackgroundStartEnd \| string \| null` | `null` | — | — | Image en arrière plan, en haut du côté "fin" (droite en LTR, gauche en RTL). Accepte aussi une URL pour une illustration… |
| `size` | `size` | `FancyBoxSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `string` | `'product'` | — | — | Applique une palette de couleurs aux bulles de fond. |

## Related files

- 📝 [Code & implementation](./fancybox.component.md)
- 🎨 [Design guidelines](./fancybox.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.1.0

+ `foregroundStartEnd` : FancyBoxForegroundStartEnd | string | null
+ `foregroundEndStart` : FancyBoxForegroundEndStart | string | null
+ `backgroundEndStart` : FancyBoxBackgroundEndStart | string | null
+ `backgroundStartEnd` : FancyBoxBackgroundStartEnd | string | null
+ `palette` : string
~ `foreground` : devient déprécié (use `foregroundStartEnd` instead)
~ `backgroundLeft` : string → FancyBoxBackgroundEndStart | string | null, devient optionnel, défaut ∅ → null, devient déprécié (use `backgroundEndStart` instead)
~ `backgroundRight` : string → FancyBoxBackgroundStartEnd | string | null, devient optionnel, défaut ∅ → null, devient déprécié (use `backgroundStartEnd` instead)

### 22.0.0

~ `foreground` : string → string | null, défaut ∅ → null

### Notes de release (ZeroHeight)

#### 22.1.0

##### Added

- `foregroundStartEnd`, `foregroundEndStart`, `backgroundStartEnd` and `backgroundEndStart` inputs, accepting a predefined illustration name or an image URL. `foregroundEndStart` adds a bottom-left foreground illustration.
- `FANCY_BOX_FOREGROUND_START_END`, `FANCY_BOX_FOREGROUND_END_START`, `FANCY_BOX_BACKGROUND_START_END` and `FANCY_BOX_BACKGROUND_END_START` constants and their types are now publicly exported and used to type these inputs.
- `palette` input (defaults to `product`) to color the bubbles.
- `fancyBox-content-foregroundStartEnd`, `fancyBox-content-foregroundEndStart`, `fancyBox-content-backgroundStartEnd` and `fancyBox-content-backgroundEndStart` elements to display inline SVG illustrations.

##### Changed

- `backgroundLeft` and `backgroundRight` are no longer required: both backgrounds now default to the `bubbles` illustration.

##### Deprecated

- `foreground` input — use `foregroundStartEnd` instead.
- `backgroundLeft` input — use `backgroundEndStart` instead.
- `backgroundRight` input — use `backgroundStartEnd` instead.
- `fancyBox-content-foreground` element and `--components-fancyBox-foreground`, `--components-fancyBox-background-left` and `--components-fancyBox-background-right` variables — use the `fancyBox-content-*StartEnd` / `fancyBox-content-*EndStart` elements instead.

#### 21.3.0

##### Added

- `FANCY_BOX_SIZE` constant and `FancyBoxSize` type are now publicly exported and used to type the `size` input.

#### 21.1.2

##### Fixed

- `mod-S` styles are now declared inside the `mods` layer, so they are no longer overridden by the component styles.

#### 21.0.0

##### Added

- `size` input with the `S` value (`mod-S`).

#### 19.2.6

##### Fixed

- Positioning of the fancy box decorations.

#### 19.1.0

##### Added

- `lu-fancy-box` component (`fancyBox`) with the `backgroundLeft`, `backgroundRight` and `foreground` inputs.
