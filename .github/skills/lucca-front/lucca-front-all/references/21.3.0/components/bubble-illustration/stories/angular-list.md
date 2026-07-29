# bubble-illustration — List _(Angular)_

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUBBLE_ILLUSTRATION, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

```html
<div class="demo-list">
	@for (illustration of illustrations; track illustration) {
		<div class="demo-list-item">
			<lu-bubble-illustration [illustration]="illustration" />
			<code class="code">{{ illustration }}</code>
		</div>
	}
</div>
```
