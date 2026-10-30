# callout-popover — Code & Implementation

**Sommaire**

- Angular
  - Popover
- HTML/CSS
  - Basic
  - Custom
  - Size
  - Status

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-feedback-callout-popover-angular-basic--docs)

## Angular

### Popover

```js
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CALLOUT_POPOVER_SIZE, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutPopoverComponent, CalloutStates } from '@lucca-front/ng/callout';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { PALETTE } from '@lucca/prisme/core';
```

```html
<lu-callout-popover icon="signInfo" buttonLabel="2" buttonAlt="2 errors" closeDelay="500" openDelay="50">
	<ul lu-callout-feedback-list palette="neutral">
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>Feedback description</lu-feedback-item-description>
			<button lu-feedback-item-action luButton>Click me!</button>
			<button lu-feedback-item-action luButton="outlined">Click me!</button>
		</li>
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>Feedback description</lu-feedback-item-description>
			<button lu-feedback-item-action luButton>Click me!</button>
			<button lu-feedback-item-action luButton="outlined">Click me!</button>
		</li>
	</ul>
</lu-callout-popover>
```

## HTML/CSS

### Basic

Classe CSS : `.calloutPopover`

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>
	1
</button>
<div class="lu-popover-content calloutPopover-overlay">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-signInfo"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-head">
			<strong class="calloutPopover-overlay-head-title">Titre</strong>
		</div>
		<div class="calloutPopover-overlay-content">
			<ul class="calloutFeedbackList">
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
```

### Custom

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover palette-cleemy">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-soundMegaphone"></span>
	Lorem
</button>
<div class="lu-popover-content calloutPopover-overlay palette-cleemy">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-soundMegaphone"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-content">Ipsum dolor</div>
	</div>
</div>
```

### Size

Classe CSS : `.calloutPopover`

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover mod-S">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>
	1
</button>
<button type="button" class="calloutPopover mod-XS">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>
	1
</button>
<div class="lu-popover-content calloutPopover-overlay mod-S">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-signInfo"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-head">
			<strong class="calloutPopover-overlay-head-title">Titre</strong>
		</div>
		<div class="calloutPopover-overlay-content">
			<ul class="calloutFeedbackList">
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
```

### Status

Classe CSS : `.calloutPopover`

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover palette-success">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signSuccess"></span>
	1
</button>
<button type="button" class="calloutPopover palette-warning">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signWarning"></span>
	1
</button>
<button type="button" class="calloutPopover palette-error">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signError"></span>
	1
</button>
```
