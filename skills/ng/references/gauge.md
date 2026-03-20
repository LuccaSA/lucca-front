# Gauge

Progress indicator component (circular or linear).

**Storybook:** [Documentation/Loaders/Gauge/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Gauge - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=16861-2802)  
**Node ID:** `16861-2802`

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Basic Usage

```html
<lu-gauge [value]="75" />
```

## Inputs

### `value`
Type: `number` (default: `0`) - Progress value from 0 to 100.

```html
<lu-gauge [value]="progress" />
```

### `circular`
Type: `boolean` (default: `false`) - Display as circular gauge.

```html
<lu-gauge [value]="75" circular />
```

### `thin`
Type: `boolean` (default: `false`) - Makes the gauge thinner (4px instead of 8px).

```html
<lu-gauge [value]="50" thin />
```

### `animated`
Type: `boolean` (default: `false`) - Animates the gauge on load.

```html
<lu-gauge [value]="80" animated />
```

### `size`
Type: `number` (default: `40`) - Size in pixels (for circular gauge).

```html
<lu-gauge [value]="60" circular [size]="100" />
```

### `palette`
Type: `Palette` - Color palette.

```html
<lu-gauge [value]="75" palette="success" />
<lu-gauge [value]="30" palette="warning" />
<lu-gauge [value]="90" palette="critical" />
```

### `alt`
Type: `string` - Accessibility label.

```html
<lu-gauge [value]="75" alt="75% complete" />
```

### `noAlt`
Type: `boolean` (default: `false`) - Disables default alt text.

## Common Patterns

### Linear Progress Bar
```html
<lu-gauge [value]="uploadProgress" animated />
<p>{{ uploadProgress }}% uploaded</p>
```

### Circular Dashboard Metric
```html
<div class="metric">
  <lu-gauge [value]="completionRate" circular [size]="120" palette="product" />
  <h3>{{ completionRate }}%</h3>
  <p>Completion Rate</p>
</div>
```

### File Upload Progress
```html
<div class="upload-item">
  <span>{{ file.name }}</span>
  <lu-gauge [value]="file.progress" animated thin />
</div>
```

### Multi-Status Display
```html
<lu-gauge [value]="85" palette="success" />
<span>Excellent</span>

<lu-gauge [value]="65" palette="warning" />
<span>Good</span>

<lu-gauge [value]="35" palette="critical" />
<span>Needs Improvement</span>
```

## Accessibility

- Automatically generates percentage alt text
- Use `alt` for custom descriptions
- Progress is announced to screen readers
