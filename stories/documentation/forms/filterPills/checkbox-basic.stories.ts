import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface CheckboxBasicStory {
	label: string;
	checked: boolean;
	mixed: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills/Checkbox',
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
		mixed: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
} as Meta;

function getTemplate(args: CheckboxBasicStory): string {
	const checkedAttr = args.checked ? `checked="checked"` : ``;
	const mixedAttr = args.mixed ? `aria-checked="mixed"` : ``;
	const disabledAttr = args.disabled ? `disabled="disabled"` : ``;

	return `<div class="filterPill">
	<span class="filterPill-checkbox">
		<input type="checkbox" id="input1" class="filterPill-checkbox-input" ${checkedAttr} ${mixedAttr} ${disabledAttr} />
    	<span class="filterPill-checkbox-icon" aria-hidden="true">
      		<span class="filterPill-checkbox-icon-check"></span>
		</span>
    </span>
	<label for="input1" class="filterPill-label" luTooltip="${args.label}" luTooltipWhenEllipsis="true" luTooltipOnlyForDisplay="true">
		${args.label}
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="${args.label}"></span>
	</label>
</div>`;
}

const Template: StoryFn<CheckboxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	label: 'Lorem ipsum dolor',
	checked: false,
	mixed: false,
	disabled: false,
};
