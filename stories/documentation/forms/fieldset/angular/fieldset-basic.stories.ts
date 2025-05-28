import { FieldsetComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fieldset/Angular/Basic',
	argTypes: {
		horizontal: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: false },
		},
		expandable: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'horizontal', truthy: false },
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
		},
		size: {
			options: ['S', null],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FieldsetComponent],
		}),
	],
	render: ({ content, ...args }, { argTypes }) => {
		return {
			template: cleanupTemplate(`
<lu-fieldset ${generateInputs(args, argTypes)}>
	${content}
</lu-fieldset>`),
		};
	},
} as Meta;

export const Basic: StoryObj<FieldsetComponent & { content: string }> = {
	args: {
		content: '<div class="grid mod-form" style="background-color: var(--palettes-neutral-50)"><div class="grid-column" style="--grid-colspan: 4">Lorem ipsum dolor sit amet.</div></div>',
		heading: 'Title',
		helper: '',
		size: null,
		expandable: false,
		expanded: false,
		horizontal: false,
	},
};
