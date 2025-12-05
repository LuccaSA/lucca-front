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
			description: 'Place le titre du fieldset à gauche des champs.',
		},
		expandable: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'horizontal', truthy: false },
			description: 'Permet au fieldset de se replier.',
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
			description: 'Affiche le fieldset en vue dépliée.',
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du fieldset.',
		},
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre du fieldset.',
		},
		helper: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un sous-titre au fieldset.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FieldsetComponent],
		}),
	],
	render: ({ expanded, size, helper, ...args }, { argTypes }) => {
		const expandedParam = expanded ? ` [expanded]="true"` : ``;
		const helperParam = helper ? ` helper="${helper}"` : ``;
		const sizeParam = size ? ` size="S"` : ``;
		return {
			template: cleanupTemplate(`
<lu-fieldset${helperParam}${expandedParam}${sizeParam}${generateInputs(args, argTypes)}>
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
