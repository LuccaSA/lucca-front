# callout-disclosure — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)

## Angular

## Callout Angular

### Disclosure

Component selector : `lu-callout-disclosure`

```js
import { CalloutDisclosureComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective } from "@lucca-front/ng/callout";
```

```html
<lu-callout-disclosure heading="List title">
	<ul lu-callout-feedback-list palette="neutral">
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>Feedback description.</lu-feedback-item-description>
			<button lu-feedback-item-action luButton="outlined">Click me !</button>
			<button lu-feedback-item-action luButton="ghost">Click me but inverted !</button>
		</li>
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>Feedback description #2.</lu-feedback-item-description>
			<button lu-feedback-item-action luButton>Click me !</button>
		</li>
	</ul>
</lu-callout-disclosure>
```

## HTML/CSS

## Callout HTML

### Basic

### Sans icône

### Tailles

### Status

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
```

```html
<details class="calloutDisclosure">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signInfo"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>
```

### Iconless

### Sans icône

### Tailles

### Status

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
```

```html
<details class="calloutDisclosure mod-iconless">
	<summary class="calloutDisclosure-summary">
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>
```

### Size

### Sans icône

### Tailles

### Status

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
```

```html
<details class="calloutDisclosure mod-S">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signInfo"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>
```

### Status

### Sans icône

### Tailles

### Status

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
```

```html
<details class="calloutDisclosure palette-success">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signSuccess"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>

<details class="calloutDisclosure palette-warning">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signWarning"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>

<details class="calloutDisclosure palette-error">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signError"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>
```
