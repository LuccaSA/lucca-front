# callout-disclosure — Disclosure _(Angular)_

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
