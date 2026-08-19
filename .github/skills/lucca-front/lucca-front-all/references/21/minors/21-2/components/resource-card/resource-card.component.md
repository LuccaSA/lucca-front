# resource-card — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)

## Angular

Mots-clés : carte, fiche, tuile, ressource

Component selector : `lu-resource-card`

### Basis

```js
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

```html
<lu-resource-card>
	<a href="#" luResourceCardAction luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor</a>
</lu-resource-card>
```

### Dnd

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

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/resource-card';
```

```html
<section class="resourceCard" #resourceCard1>
	<div class="resourceCard-layout">
		<header class="resourceCard-layout-header">
			<h3 class="resourceCard-layout-header-title">
				<a
					href="#"
					luTooltip
					luTooltipWhenEllipsis
					[luTooltipAnchor]="resourceCard1"
					class="resourceCard-layout-header-title-action"
				>
					Lorem ipsum dolor
				</a>
			</h3>
		</header>
	</div>
</section>
```

### Dnd

```css
@forward '@lucca-front/scss/src/components/resource-card';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="resourceCardWrapper">
	<section class="resourceCard" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipAnchor]="resourceCard1"
						class="resourceCard-layout-header-title-action"
					>
						Lorem ipsum dolor
					</a>
				</h3>
			</header>
		</div>
	</section>
	<section class="resourceCard cdk-drag-preview" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipAnchor]="resourceCard1"
						class="resourceCard-layout-header-title-action"
					>
						Lorem ipsum dolor
					</a>
				</h3>
			</header>
		</div>
	</section>
	<section class="resourceCard cdk-drag-placeholder" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipAnchor]="resourceCard1"
						class="resourceCard-layout-header-title-action"
					>
						Lorem ipsum dolor
					</a>
				</h3>
			</header>
		</div>
	</section>
</div>
```
