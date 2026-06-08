import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FIELDSET_SIZE, FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

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
		withAction: {
			if: { arg: 'expandable', eq: false },
			description: 'Ajoute un bouton d’action à droite du titre.',
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
			description: 'Affiche le fieldset en vue dépliée.',
		},
		size: {
			options: setStoryOptions(FIELDSET_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du fieldset.',
		},
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre du fieldset. [PortalContent]',
		},
		helper: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un sous-titre au fieldset. [PortalContent]',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FieldsetComponent, GridComponent, GridColumnComponent, FormFieldComponent, TextInputComponent, FormsModule, ButtonComponent, FormComponent],
		}),
	],
	render: ({ expanded, size, helper, action, withAction, presentation, horizontal, maxWidth, ...args }, { argTypes }) => {
		const expandedParam = expanded ? ` [expanded]="true"` : ``;
		const helperParam = helper ? ` helper="${helper}"` : ``;
		const sizeParam = size ? ` size="S"` : ``;
		const actionParam = withAction ? ` [action]="portalSample"` : ``;
		const maxWidthParam = maxWidth ? ` maxWidth` : ``;
		const horizontalParam = horizontal ? ` horizontal` : ``;
		const portalSample = withAction
			? `

	<ng-template #portalSample>
		<button luButton>button</button>
	</ng-template>`
			: ``;
		return {
			template: `<form luForm${maxWidthParam}>
	<lu-fieldset${horizontalParam}${helperParam}${expandedParam}${sizeParam}${actionParam}${generateInputs(args, argTypes)}>
		<lu-grid mode="form">
			<lu-grid-column colspan="2">
				<lu-form-field label="Label"${generateInputs({ presentation }, argTypes)}>
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="2">
				<lu-form-field label="Label"${generateInputs({ presentation }, argTypes)}>
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>${portalSample}
</form>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FieldsetComponent & { content: string; withAction: boolean; presentation: boolean; maxWidth: boolean }> = {
	args: {
		heading: 'Title',
		helper: '',
		expandable: false,
		expanded: false,
		horizontal: false,
		withAction: false,
		presentation: false,
		maxWidth: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByText('Title')).toBeVisible();
		const inputs = canvas.getAllByRole('textbox');
		await expect(inputs.length).toBeGreaterThanOrEqual(2);
	});

	await step('Interaction clavier', async () => {
		const inputs = canvas.getAllByRole('textbox');
		inputs[0].focus();
		await expect(inputs[0]).toHaveFocus();
		await userEvent.type(inputs[0], 'test');
		await waitForAngular();
		await expect(inputs[0]).toHaveValue('test');
	});
});
