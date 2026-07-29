# Scrollbox

# Content

## Scrollbox Angular `v19.2`

```ts
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
```

**Exemple : Basic**

```html
<lu-scroll-box>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<lu-scroll-box [attr.style]="'--components-scrollBox-paddingBlock: var(--pr-t-spacings-200); --components-scrollBox-paddingInline: 0rem; --components-scrollBox-marginBlock: 0rem'">
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<div class="resize">
	<lu-scroll-box [attr.style]="'--components-scrollBox-marginBlock: var(--pr-t-spacings-300);--components-scrollBox-marginInline: 0; --components-scrollBox-paddingBlock: var(--pr-t-spacings-300); --components-scrollBox-gap: var(--pr-t-spacings-300);'">
		<div class="box">box</div>
		<div class="box">box</div>
		<div class="box">box</div>
	</lu-scroll-box>
</div>
<lu-scroll-box>
	<div style="width: 200vw" class="box">box</div>
</lu-scroll-box>
<lu-scroll-box>
	<div class="box">box</div>
</lu-scroll-box>
```
