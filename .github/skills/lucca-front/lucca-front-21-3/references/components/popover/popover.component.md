# popover — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-overlays-popover--docs)

## Angular

### Popover

```js
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## HTML/CSS

### Popover

```css
@forward '@lucca-front/scss/src/components/popover';
@forward '@lucca-front/scss/src/components/button';
```

```html
<button
	type="button"
	class="button"
	[luPopover]="popover"
	[luPopoverPosition]="position()"
	[luPopoverAlignment]="alignment()"
	[luPopoverTrigger]="trigger()"
>
	{{ trigger() }} me
</button>
<lu-popover #popover>{{ popoverContent() }}</lu-popover>
```

### Popover

```css
@forward '@lucca-front/scss/src/components/popover';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/userPopover';
```

```html
<section class="lu-popover-content userPopover">
	<div class="userPopover-details">
		<div class="userPopover-details-avatar avatar">
			<div class="avatar-picture" style="background-color: rgb(92, 214, 153)">
				<span class="avatar-picture-initials" translate="no">CA</span>
			</div>
		</div>
		<div class="userPopover-details-info">
			<h1 class="userPopover-details-info-name pr-u-ellipsis">
				<a class="userPopover-details-info-name-linkOptional" href="#">Chloé Alibert</a>
			</h1>
			<p class="userPopover-details-info-detail pr-u-ellipsis">Technicienne</p>
			<p class="userPopover-details-info-detail pr-u-ellipsis">SAV</p>
			<p class="userPopover-details-info-detail">
				<!--
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Arrivée prévue le 3 mai</span>
					</span>
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarStrikethrough mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Parti(e)</span>
					</span>
					-->
				<a class="userPopover-details-info-detail-workplace" href="#">
					<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-S"></span>
					<span class="userPopover-details-info-detail-workplace-state">
						Absent(e) –
						<span class="pr-u-textLight">Jusqu’au 28/02/2024 inclus</span>
					</span>
				</a>
			</p>
		</div>
	</div>
</section>
```
