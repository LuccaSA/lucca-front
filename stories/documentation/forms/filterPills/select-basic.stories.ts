import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface SelectBasicStory {
	label: string;
	value: string;
	expanded: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills',
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
	},
} as Meta;

function getTemplate(args: SelectBasicStory): string {
	const classAttr = args.value !== '' ? `class="filterPill"` : `class="filterPill is-empty"`;
	const tooltip = args.value !== '' ? `luTooltip="${args.value}"` : ``;
	return `<div ${classAttr}>
	<label for="input1" class="filterPill-label" luTooltip="${args.label}" luTooltipWhenEllipsis="true">${args.label}</label>
	<button class="filterPill-combobox" type="button" id="input1" role="combobox" aria-expanded="${args.expanded}" ${tooltip} luTooltipWhenEllipsis="true">
		${args.value ? args.value : 'Sélectionner une valeur'}
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

export const Select = Template.bind({});
Select.args = {
	label: 'Lorem ipsum',
	value: 'Lorem ipsum',
	expanded: false,
};