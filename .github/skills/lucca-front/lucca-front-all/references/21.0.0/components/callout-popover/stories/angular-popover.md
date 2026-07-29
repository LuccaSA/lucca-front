# callout-popover — Popover _(Angular)_

```js
import { CalloutPopoverComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective } from "@lucca-front/ng/callout";
```

```html
<lu-callout-popover icon="signInfo">
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
