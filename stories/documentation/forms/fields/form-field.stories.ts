import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: "Modifie le label de l'input.",
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte indicatif sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		errorInlineMessage: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Ajoute un texte d\'erreur sous le champ de formulaire lorsque celui-ci est en erreur.",
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		invalid: {
			control: {
				type: 'boolean',
			},
			description: "Applique l'état invalide au champ.",
		},
		counter: {
			control: {
				type: 'number',
			},
			description: "Nombre de caractère maximum autorisés pour un champ de type texte. A seulement un impact sur l'interface et doit être complé à un réglage au niveau de <code>FormControl</code>.",
		},
		width: {
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
			description: "Applique une largeur fixe au champ. A n'utiliser que lorsque la grille de formulaire n'est pas adaptée.",
		},
	},
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		return {
			template: `<lu-form-field extraDescribedBy="extra-message" ${generateInputs(fieldArgs, argTypes)}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${required ? 'required' : ''}
				[(ngModel)]="example"
				placeholder="Placeholder">
			</textarea>
		</div>
	</div>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent & { required: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		errorInlineMessage: 'Error helper text',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
		width: null,
	},
};
