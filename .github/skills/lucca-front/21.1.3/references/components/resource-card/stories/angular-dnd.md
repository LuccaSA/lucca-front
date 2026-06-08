# resource-card — Dnd _(Angular)_

```js
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

```html
<lu-resource-card-wrapper cdkDropList draggable>
	<lu-resource-card cdkDrag>
		<a href="#" luResourceCardAction>Lorem ipsum dolor</a>
		<ng-container resourceCardInfos>
			<lu-status-badge label="Status" />
			<lu-status-badge label="Status" />
		</ng-container>
		<ng-container resourceCardIllustration>
			<div
				class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault"
				style="background-color: var(--palettes-lavender-100)"
			></div>
		</ng-container>
		<ng-container resourceCardAction>
			<button type="button" luButton>Lorem ipsum</button>
		</ng-container>
		<ng-container resourceCardContent>
			Lorem
			<a href="#" luLink>ipsum</a>
			dolor sit amet, consectetur adipiscing elit, sed do.
		</ng-container>
	</lu-resource-card>
	<lu-resource-card cdkDrag>
		<a href="#" luResourceCardAction>Lorem ipsum dolor</a>
		<ng-container resourceCardInfos>
			<lu-status-badge label="Status" />
			<lu-status-badge label="Status" />
		</ng-container>
		<ng-container resourceCardIllustration>
			<div
				class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault"
				style="background-color: var(--palettes-lavender-100)"
			></div>
		</ng-container>
		<ng-container resourceCardAction>
			<button type="button" luButton>Lorem ipsum</button>
		</ng-container>
		<ng-container resourceCardContent>
			Lorem
			<a href="#" luLink>ipsum</a>
			dolor sit amet, consectetur adipiscing elit, sed do.
		</ng-container>
	</lu-resource-card>
	<lu-resource-card cdkDrag>
		<a href="#" luResourceCardAction>Lorem ipsum dolor</a>
		<ng-container resourceCardInfos>
			<lu-status-badge label="Status" />
			<lu-status-badge label="Status" />
		</ng-container>
		<ng-container resourceCardIllustration>
			<div
				class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault"
				style="background-color: var(--palettes-lavender-100)"
			></div>
		</ng-container>
		<ng-container resourceCardAction>
			<button type="button" luButton>Lorem ipsum</button>
		</ng-container>
		<ng-container resourceCardContent>
			Lorem
			<a href="#" luLink>ipsum</a>
			dolor sit amet, consectetur adipiscing elit, sed do.
		</ng-container>
	</lu-resource-card>
</lu-resource-card-wrapper>
```
