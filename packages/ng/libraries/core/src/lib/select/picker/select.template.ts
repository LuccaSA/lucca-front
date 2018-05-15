import { customPopoverTemplate } from '../../popover/popover.template';
const contentPlaceholder = '######## This is where the option goes #######';
const pickerTemplate = `
<ul class="select-options" >
	<ng-content></ng-content>
</ul>
`;
export function customSelectTemplate(content: string) {
	return customPopoverTemplate(
		pickerTemplate.replace(contentPlaceholder, content),
	);
}
export const standardSelectTemplate = customSelectTemplate(
	`<span>{{ option.name }}</span>`,
);
