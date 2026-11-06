import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FIELDSET_SIZE, FieldsetActionDirective, FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/Fieldset/Angular/Basic',
	argTypes: {
		horizontal: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: false },
			description: 'Place le titre du fieldset à gauche des champs.',
			table: { category: 'inputs' },
		},
		expandable: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'horizontal', truthy: false },
			description: 'Permet au fieldset de se replier.',
			table: { category: 'inputs' },
		},
		withAction: {
			if: { arg: 'expandable', eq: false },
			description:
				'Ajoute une action affichée à droite du titre, ignorée lorsque <code>expandable</code> est actif. Projeter dans le composant l’élément d’action portant la directive <code>luFieldsetAction</code>, comme dans cet exemple, ou renseigner l’input <code>action</code> sur <code>lu-fieldset</code> [PortalContent]. L’input prévaut si les deux sont fournis.',
			table: { category: 'story' },
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
			description: 'Affiche le fieldset en vue dépliée. Two-way.',
			table: { category: 'models', defaultValue: { summary: 'false' } },
		},
		expandedChange: {
			description: 'Événement déclenché lorsque le fieldset est déplié ou replié.',
			action: 'expandedChange',
			control: false,
			if: { arg: 'expandable', truthy: true },
			table: { category: 'outputs', type: { summary: 'boolean' } },
		},
		hiddenLegend: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: false },
			description: 'Masque la légende en la conservant dans le DOM pour les lecteurs d’écrans. ',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(FIELDSET_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du fieldset.',
			table: { category: 'inputs' },
		},
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre du fieldset. [PortalContent]',
			table: { category: 'inputs' },
		},
		helper: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un sous-titre au fieldset. [PortalContent]',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		maxWidth: {
			control: {
				type: 'boolean',
			},
			description: "Applique la largeur maximale d'un formulaire au fieldset (cette largeur maximale est généralement appliquée par le formulaire lui-même).",
			table: { category: 'inputs (form)' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FieldsetComponent, FieldsetActionDirective, GridComponent, GridColumnComponent, FormFieldComponent, TextInputComponent, FormsModule, ButtonComponent, FormComponent],
		}),
	],
	render: ({ expanded, expandedChange, size, helper, action, withAction, presentation, horizontal, maxWidth, ...args }, { argTypes }) => {
		const expandedParam = args['expandable'] ? ` [(expanded)]="expanded" (expandedChange)="onExpandedChange($event)"` : ``;
		const helperParam = helper ? ` helper="${helper}"` : ``;
		const sizeParam = size ? ` size="S"` : ``;
		const maxWidthParam = maxWidth ? ` maxWidth` : ``;
		const horizontalParam = horizontal ? ` horizontal` : ``;
		const actionSample = withAction
			? `
		<button type="button" luButton luFieldsetAction>button</button>`
			: ``;
		return {
			props: {
				expanded,
				onExpandedChange: (value: boolean) => expandedChange?.(value),
			},
			template: `<form luForm${maxWidthParam}>
	<lu-fieldset${horizontalParam}${helperParam}${expandedParam}${sizeParam}${generateInputs(args, argTypes)}>${actionSample}
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
	</lu-fieldset>
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
		hiddenLegend: false,
	},
};
