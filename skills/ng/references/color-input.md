# Color Input

Select input for picking a color from a list.

**Storybook:** [Documentation/Forms/Fields/Color Input/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Color Picker - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=34491-7168)  
**Node ID:** `34491-7168`

## Import

```typescript
import { ColorInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Color">
  <lu-color-input [(ngModel)]="color" [colors]="colors" />
</lu-form-field>
```

## Inputs

### `colors` (required)
Type: `ColorOption[]`

```typescript
colors = [
  { name: 'Red', background: '#ff0000' },
  { name: 'Green', background: '#00ff00' }
];
```

### `clearable`
Type: `boolean` (default: `false`)

### `compact`
Type: `boolean` (default: `false`)

## Accessibility

- Options are keyboard navigable
- Use with `lu-form-field` for labels

