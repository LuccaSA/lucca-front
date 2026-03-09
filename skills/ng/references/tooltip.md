# Tooltip

Directive for displaying informational tooltips on hover/focus.

**Storybook:** [Documentation/Overlays/Tooltip/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Tooltip - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=5639-31388)  
**Node ID:** `5639-31388`

## Import

```typescript
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
// or
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

## Basic Usage

```html
<button luButton luTooltip="Click to save your changes">Save</button>
```

## Inputs

### `luTooltip`
Type: `string | SafeHtml`

The tooltip content to display.

```html
<span luTooltip="This is helpful information">Hover me</span>
```

### `luTooltipPosition`
Type: `'above' | 'below' | 'before' | 'after'` (default: `'above'`)

Position of the tooltip relative to the element.

```html
<span luTooltip="Above" luTooltipPosition="above">Above</span>
<span luTooltip="Below" luTooltipPosition="below">Below</span>
<span luTooltip="Left" luTooltipPosition="before">Left</span>
<span luTooltip="Right" luTooltipPosition="after">Right</span>
```

### `luTooltipDisabled`
Type: `boolean` (default: `false`)

Disables the tooltip.

```html
<span luTooltip="Info" [luTooltipDisabled]="!showTooltips">Text</span>
```

### `luTooltipOnlyForDisplay`
Type: `boolean` (default: `false`)

Only shows tooltip when text is truncated (ellipsis). Useful for responsive text.

```html
<span class="text-ellipsis" [luTooltip]="longText" luTooltipOnlyForDisplay>
  {{ longText }}
</span>
```

### `luTooltipEnterDelay`
Type: `number` (default: `300`)

Delay in milliseconds before showing the tooltip.

```html
<span luTooltip="Info" [luTooltipEnterDelay]="500">Slow tooltip</span>
```

### `luTooltipLeaveDelay`
Type: `number` (default: `100`)

Delay in milliseconds before hiding the tooltip.

```html
<span luTooltip="Info" [luTooltipLeaveDelay]="0">Quick hide</span>
```

## Common Patterns

### Icon with Tooltip
```html
<lu-icon icon="infoCircle" alt="" luTooltip="More information about this feature" />
```

### Button with Tooltip
```html
<button luButton luTooltip="Save your changes">
  <lu-icon icon="save" alt="Save" />
</button>
```

### Disabled Button with Tooltip
```html
<span luTooltip="You need permission to perform this action">
  <button luButton disabled>Delete</button>
</span>
```

Note: Wrap disabled elements in a span since disabled elements don't receive mouse events.

### Truncated Text with Tooltip
```html
<span 
  class="text-ellipsis" 
  [luTooltip]="user.fullName" 
  luTooltipOnlyForDisplay>
  {{ user.fullName }}
</span>
```

### HTML Content
```typescript
import { DomSanitizer } from '@angular/platform-browser';

tooltipHtml = this.sanitizer.bypassSecurityTrustHtml('<strong>Bold</strong> content');
```

```html
<span [luTooltip]="tooltipHtml">Hover for HTML tooltip</span>
```

### Table Cell with Tooltip
```html
<lu-data-table-cell>
  <span [luTooltip]="item.description" luTooltipOnlyForDisplay class="text-ellipsis">
    {{ item.description }}
  </span>
</lu-data-table-cell>
```

### Conditional Tooltip
```html
<span [luTooltip]="error" [luTooltipDisabled]="!error">
  {{ value }}
</span>
```

## Accessibility

- Tooltip is linked via `aria-describedby`
- Shows on focus for keyboard users
- Appropriate delays prevent accidental triggering
- Use for supplementary information only, not critical content
