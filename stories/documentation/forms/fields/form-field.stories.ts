import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_LAYOUT, FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent, InputDirective, luFormFieldTranslations } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { useStoryModel, generateInputs, setStoryOptions, intlArgType } from '../../../helpers/stories';

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
			description: 'Modifie le label de l’input. [PortalContent]',
			table: { category: 'inputs' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire (attribut <code>required</code> posé sur le champ projeté).',
			table: { category: 'story' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte indicatif sous le champ de formulaire. [PortalContent]',
			table: { category: 'inputs' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		errorInlineMessage: {
			description: 'Ajoute un texte d’erreur sous le champ de formulaire lorsque celui-ci est en erreur. [PortalContent]',
			table: { category: 'inputs' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs' },
		},
		invalid: {
			control: {
				type: 'boolean',
			},
			description: 'Applique l’état invalide au champ.',
			table: { category: 'inputs' },
		},
		counter: {
			control: {
				type: 'number',
			},
			description:
				'Nombre de caractères maximum autorisés pour un champ de type texte. A seulement un impact sur l’interface et doit être complété à un réglage au niveau de <code>FormControl</code>.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: 'Applique une largeur fixe au champ. À n’utiliser que lorsque la grille de formulaire n’est pas adaptée.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs' },
		},
		tag: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un tag après le label du champ.',
			table: { category: 'inputs' },
		},
		AI: {
			description: '[v20.3] Indique que la valeur du champ a été générée par IA.',
			table: { category: 'inputs' },
		},
		iconAIalt: {
			name: '↳ iconAIalt',
			if: { arg: 'AI', truthy: true },
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs' },
		},
		iconAItooltip: {
			name: '↳ iconAItooltip',
			if: { arg: 'AI', truthy: true },
			description: 'Ajoute une info-bulle à l’icône AI.',
			table: { category: 'inputs' },
		},
		inline: {
			description: 'Affiche les options du champ sur un axe horizontal (radios, checkboxes).',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
		extraDescribedBy: {
			control: {
				type: 'text',
			},
			description: 'Ajoute des identifiants à l’attribut <code>aria-describedby</code> du champ.',
			table: { category: 'inputs' },
		},
		statusControl: {
			control: false,
			description: 'Contrôle dont la validité détermine l’état invalide du champ, à la place de celle des contrôles projetés.',
			table: { category: 'inputs', type: { summary: 'AbstractControl | null' } },
		},
		layout: {
			options: FORM_FIELD_LAYOUT,
			control: {
				type: 'select',
			},
			description: 'Disposition du champ. Généralement positionnée automatiquement par le composant projeté (ex. <code>fieldset</code> pour un groupe de radios). Two-way.',
			table: { category: 'models', type: { summary: 'FormFieldLayout' }, defaultValue: { summary: 'default' } },
		},
		rolePresentationLabel: {
			description: "Applique role='presentation' au label du champ dans le cas où celui-ci ne doit pas être lu par le lecteur d’écran.",
			table: { category: 'models' },
		},
		intl: intlArgType(luFormFieldTranslations, 'LuFormFieldTranslations'),
	},
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model },
			template: `<lu-form-field ${generateInputs(fieldArgs, argTypes)}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${required ? 'required' : ''}
				[(ngModel)]="model.example"
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
		inlineMessageState: null,
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
		size: null,
		tag: '',
		AI: false,
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
		inline: false,
		presentation: false,
		extraDescribedBy: '',
		layout: 'default',
	},
};
