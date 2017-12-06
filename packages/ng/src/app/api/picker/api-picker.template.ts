import { customPopoverTemplate } from '../../popover/popover.template';
export const standardApiPickerTemplate = customPopoverTemplate(`
<ul class="api-picker-options">
	<li
	*ngFor="let option of (options$ | async); let i = index"
	(click)="selectOption(option)"
	[ngClass]="{'is-focus': (i === (highlightIndex$ | async))}"
	class="api-picker-option">
		{{ option.name }}
	</li>
</ul>
`);
