import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface CheckboxBasicStory {
	label: string;
	pressed: boolean;
	mixed: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills/Checkbox/HTML&CSS',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxBasicStory): string {
	const checkedAttr = args.pressed ? ` checked="checked"` : ``;
	const disabledAttr = args.disabled ? ` disabled="disabled"` : ``;
	const pressedAttr = args.pressed ? ` aria-pressed="true"` : ``;

	return `<button type="button" class="filterPill mod-checkbox"${pressedAttr}${disabledAttr}>
	<span class="filterPill-checkbox">
		<span class="filterPill-checkbox-input"></span>
		<span class="filterPill-checkbox-icon" aria-hidden="true">
			<span class="filterPill-checkbox-icon-check"></span>
		</span>
	</span>
	<span class="filterPill-label" luTooltip="${args.label}" luTooltipWhenEllipsis>
		${args.label}
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="${args.label}"></span>
	</span>
</button>`;
}

const Template = (args: CheckboxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<CheckboxBasicStory> = {
	args: {
		label: 'Lorem ipsum dolor',
		pressed: false,
		disabled: false,
	},
	render: Template,
};
