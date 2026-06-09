# callout-popover — Popover _(Angular)_

Component selector : `lu-callout-popover`

```js
import { CalloutPopoverComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective } from "@lucca-front/ng/callout";
```

```html
<lu-callout-popover buttonLabel="2" buttonAlt="2 errors" icon="signInfo" closeDelay="500" openDelay="50">
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
