import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface SelectBasicStory {
	label: string;
	value: string;
	expanded: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills/Select/HTML&CSS',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule, IconComponent],
		}),
	],
	argTypes: {
		label: {
			control: 'text',
		},
		value: {
			control: 'text',
		},
		expanded: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
} as Meta;

function getTemplate(args: SelectBasicStory): string {
	const classAttr = args.value !== '' ? `class="filterPill"` : `class="filterPill is-empty"`;
	const tooltip = args.value !== '' ? `luTooltip="${args.value}"` : ``;
	const labelDisplayed = args.value ? args.label + ': ' : args.label;
	const disabled = args.disabled ? 'disabled="disabled"' : null;
	return `<div ${classAttr}>
	<label for="input1" class="filterPill-label" luTooltip="${args.label}" luTooltipWhenEllipsis="true">${labelDisplayed}</label>
	<button ${disabled} class="filterPill-combobox" type="button" id="input1" role="combobox" aria-expanded="${args.expanded}" ${tooltip} luTooltipWhenEllipsis="true">
		${args.value ? args.value : 'Aucune valeur sélectionnée'}
	</button>
	<button type="button" class="filterPill-clear clear"><span class="u-mask">Vider ce champ</span></button>
	<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
		<lu-icon icon="arrowChevronBottom" size="S" />
	</button>
</div>`;
}

const Template: StoryFn<SelectBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	label: 'Lorem ipsum',
	value: 'Lorem ipsum',
	expanded: false,
	disabled: false,
};
