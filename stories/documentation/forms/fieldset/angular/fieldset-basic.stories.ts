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
	render: ({ expanded, ...args }, { argTypes }) => {
		const expandedParam = expanded ? `[expanded]="true"` : ``;
		return {
			template: cleanupTemplate(`
<lu-fieldset ${expandedParam} ${generateInputs(args, argTypes)}>
	<div class="grid mod-form">
		<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
			<div class="form-field"><label class="formLabel" id="IDlabel1" for="ID1">Label</label><div class="textField"><div class="textField-input"><input type="text" id="ID1" class="textField-input-value" aria-labelledby="IDlabel1" /></div></div></div>
		</div>
		<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
			<div class="form-field"><label class="formLabel" id="IDlabel2" for="ID2">Label</label><div class="textField"><div class="textField-input"><input type="text" id="ID2" class="textField-input-value" aria-labelledby="IDlabel2" /></div></div></div>
		</div>
	</div>
</lu-fieldset>`),
		};
	},
} as Meta;

export const Basic: StoryObj<FieldsetComponent & { content: string }> = {
	args: {
		heading: 'Title',
		helper: '',
		size: null,
		expandable: false,
		expanded: false,
		horizontal: false,
	},
};
