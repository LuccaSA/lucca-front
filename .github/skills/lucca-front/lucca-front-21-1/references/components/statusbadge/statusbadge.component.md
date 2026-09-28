# statusbadge — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)

## Angular

Component selector : `lu-status-badge`

### Badge angular

```js
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

```html
<lu-status-badge label="Status" />
```

## HTML/CSS

### Badge basic

```css
@forward '@lucca-front/scss/src/components/status-badge';
```

```html
<div class="statusBadge">Status</div>
```

### Badge palettes

```css
@forward '@lucca-front/scss/src/components/status-badge';
```

```html
<div class="statusBadge palette-product">Status</div>
<div class="statusBadge palette-neutral">Status</div>
<div class="statusBadge palette-success">Status</div>
<div class="statusBadge palette-warning">Status</div>
<div class="statusBadge palette-error">Status</div>
```

### Badge size

```css
@forward '@lucca-front/scss/src/components/status-badge';
```

```html
<div class="statusBadge mod-L">Status</div>
```
