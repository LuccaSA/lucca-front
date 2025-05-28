import { FieldsetComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface FieldsetBasicStory {
	horizontal: boolean;
	expandable: boolean;
	expanded: boolean;
	helper: string;
	heading: string;
	size: string;
	content: string;
}

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
	render: (args: FieldsetBasicStory) => {
		const horizontalParam = args.horizontal ? `horizontal` : ``;
		const expandableParam = args.expandable ? `expandable` : ``;
		const expandedParam = args.expanded ? `expanded="true"` : ``;
		const sizeParam = args.size === 'S' ? `size="S"` : ``;
		return {
			template: cleanupTemplate(`
<lu-fieldset heading="${args.heading}" helper="${args.helper}" ${horizontalParam} ${expandableParam} ${expandedParam} ${sizeParam}>
	${args.content}
</lu-fieldset>`),
		};
	},
} as Meta;

export const Basic = {
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
