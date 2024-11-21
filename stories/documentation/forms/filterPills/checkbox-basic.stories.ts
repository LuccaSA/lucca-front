import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface CheckboxBasicStory {
	label: string;
	checked: boolean;
	mixed: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	argTypes: {
		label: {
			control: 'text',
		},
		checked: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
} as Meta;

function getTemplate(args: CheckboxBasicStory): string {
	const checkedAttr = args.checked ? `checked="checked"` : ``;
	const disabledAttr = args.disabled ? `disabled="disabled"` : ``;

	return `<div class="filterPill">
	<label for="input1" class="filterPill-label" luTooltip="${args.label}" luTooltipWhenEllipsis="true">
		${args.label}
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="${args.label}"></span>
	</label>
	<span class="filterPill-checkbox">
		<input type="checkbox" id="input1" class="filterPill-checkbox-input" ${checkedAttr} ${disabledAttr} />
    	<span class="filterPill-checkbox-icon" aria-hidden="true">
      		<span class="filterPill-checkbox-icon-check"></span>
		</span>
    </span>
</div>`;
}

const Template: StoryFn<CheckboxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Checkbox = Template.bind({});
Checkbox.args = {
	label: 'Lorem ipsum dolor',
	checked: false,
	disabled: false,
};
