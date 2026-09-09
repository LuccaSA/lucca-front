# scrollbox

## Import

```typescript
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
```

## Basic Usage

```html
<lu-scroll-box> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div>
</lu-scroll-box>
<lu-scroll-box [attr.style]="'--components-scrollBox-paddingBlock: var(--pr-t-spacings-200); --components-scrollBox-paddingInline: 0rem; --components-scrollBox-marginBlock: 0rem'"> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div>
</lu-scroll-box>
<div class="resize"> <lu-scroll-box [attr.style]="'--components-scrollBox-marginBlock: var(--pr-t-spacings-300);--components-scrollBox-marginInline: 0; --components-scrollBox-paddingBlock: var(--pr-t-spacings-300); --components-scrollBox-gap: var(--pr-t-spacings-300);'"> <div class="box">box</div> <div class="box">box</div> <div class="box">box</div> </lu-scroll-box>
</div>
<lu-scroll-box> <div style="inline-size: 200vw" class="box">box</div>
</lu-scroll-box>
<lu-scroll-box> <div class="box">box</div>
</lu-scroll-box>
```

## API Reference

### ScrollBoxComponent (component)

**Selector:** `lu-scroll-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./scrollbox.component.md)
- 🎨 [Design guidelines](./scrollbox.design.md)
- 🎯 [Figma design tokens](./scrollbox.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-scrollbox--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ScrollBoxComponent`).
