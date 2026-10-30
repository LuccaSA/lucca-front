# priority-level — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-priority-level-angular--docs)

## Angular

### Level

```js
import { PRIORITY_LEVELS, PRIORITY_LEVEL_SIZES, PriorityLevelComponent, PriorityLevelSize } from '@lucca-front/ng/priority-level';
```

```html
<lu-priority-level level="1" />
```


## HTML/CSS

### Level basic

```css
@forward '@lucca-front/scss/src/components/priorityLevel';
```

```html
<div class="priorityLevel mod-low">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-medium">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Medium</span>
</div>
<div class="priorityLevel mod-high">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">High</span>
</div>
```

### Level sizes

```css
@forward '@lucca-front/scss/src/components/priorityLevel';
```

```html
<div class="priorityLevel mod-low mod-S">
	<span class="priorityLevel-icon">
		<span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XXS"></span>
	</span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-low">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-low mod-L">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-S"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
```
