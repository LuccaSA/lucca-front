import { customPopoverTemplate } from '../../popover';
const contentPlaceholder = '######## This is where the option goes #######';
const pickerTemplate = `
<ul class="api-picker-options">
	<li
	*ngFor="let option of (options$ | async); let i = index"
	(click)="selectOption(option)"
	[ngClass]="{'is-focus': (i === (highlightIndex$ | async))}"
	class="api-picker-option">
		${contentPlaceholder}
	</li>
</ul>
`;
export function customApiPickerTemplate(content: string) {
	return customPopoverTemplate(pickerTemplate.replace(contentPlaceholder, content));
}
export const standardApiPickerTemplate = customApiPickerTemplate(`<span>{{ option.name }}</span>`);
