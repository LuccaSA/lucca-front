# app-layout

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Basic Usage

```html
<lu-app-layout> <ng-container appLayoutBanner>banner</ng-container> <ng-container appLayoutNavSide>navSide</ng-container> main
</lu-app-layout>
```

## API Reference

### AppLayoutComponent (component)

**Selector:** `lu-app-layout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `mobileNavSideBottom` | `mobileNavSideBottom` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./app-layout.component.md)
- 🎨 [Design guidelines](./app-layout.design.md)
- 🎯 [Figma design tokens](./app-layout.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`AppLayoutComponent`).
