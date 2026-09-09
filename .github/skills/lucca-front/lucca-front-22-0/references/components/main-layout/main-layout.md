# main-layout

## Import

```typescript
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```

## Basic Usage

```html
<lu-main-layout> <ng-container mainLayoutHeader> <lu-container> <div class="fakeContent">header</div> </lu-container> </ng-container> <lu-main-layout-block> <lu-container> <div class="fakeContent">content</div> </lu-container> </lu-main-layout-block> <ng-container mainLayoutFooter> <lu-container> <div class="fakeContent">footer</div> </lu-container> </ng-container> </lu-main-layout>
```

## API Reference

### MainLayoutBlockComponent (component)

**Selector:** `lu-main-layout-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `overflow` | `overflow` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### MainLayoutComponent (component)

**Selector:** `lu-main-layout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `headerSticky` | `headerSticky` | `boolean` | `false` | — | `luBooleanAttribute` | Conserve le header visible en haut du layout. |
| `footerSticky` | `footerSticky` | `boolean` | `false` | — | `luBooleanAttribute` | Conserve le footer visible en bas du layout. |
| `bubblesStartEnd` | `bubblesStartEnd` | `1 \| 2 \| 3 \| null` | `null` | — | `bubblesCountAttribute` | Affiche des bulles décoratives dans le coin supérieur gauche. |
| `bubblesEndStart` | `bubblesEndStart` | `1 \| 2 \| 3 \| null` | `null` | — | `bubblesCountAttribute` | Affiche des bulles décoratives dans le coin inférieur droit. |
| `illustrationStartEnd` | `illustrationStartEnd` | `MainLayoutIllustrationStartEnd \| null` | `null` | — | — | Affiche une illustration dans le coin supérieur gauche. |
| `illustrationEndStart` | `illustrationEndStart` | `MainLayoutIllustrationEndStart \| null` | `null` | — | — | Affiche une illustration dans le coin inférieur droit. |
| `palette` | `palette` | `'success' \| 'warning' \| 'error' \| 'product' \| 'neutral' \| 'none' \| 'brand'` | `'none'` | — | — | Applique une palette de couleurs au layout. |
| `responsive` | `responsive` | `'wideM' \| null` | `null` | — | — | Modifie le comportement responsive du layout. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_MAIN_LAYOUT_INSTANCE` | `MainLayoutIllustrations` | — |

## Type definitions

- [`MainLayoutIllustrationStartEnd`](../../types/MainLayoutIllustrationStartEnd.md) — 11 available values
- [`MainLayoutIllustrationEndStart`](../../types/MainLayoutIllustrationEndStart.md) — 34 available values

## Related files

- 📝 [Code & implementation](./main-layout.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-main-layout-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`MainLayoutBlockComponent`, `MainLayoutComponent`).
