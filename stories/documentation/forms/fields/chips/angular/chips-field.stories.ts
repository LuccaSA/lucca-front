import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions, useStoryModel } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ChipsInputComponent, luTextfieldTranslations } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

type ChipsFieldStory = ChipsInputComponent & FormFieldComponent & { required: boolean; disabled: boolean; validateEmails: boolean };

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default {
	title: 'Documentation/Forms/Fields/ChipsField/Angular',
	decorators: [
		moduleMetadata({
			imports: [ChipsInputComponent, FormFieldComponent, FormsModule, StoryModelDisplayComponent, JsonPipe],
		}),
	],
	argTypes: {
		label: {
			description: 'Modifie le label du champ.',
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran.',
			table: { category: 'inputs (form-field)' },
		},
		tooltip: {
			type: 'string',
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: { type: 'select' },
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs (form-field)' },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: { type: 'select' },
			description: 'Applique une largeur fixe au champ.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif sous le champ. Il est conseillé d’y préciser comment valider une saisie.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: { type: 'select' },
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs (form-field)', defaultValue: { summary: 'null' } },
		},
		presentation: {
			description: 'Affiche le champ en mode présentation.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs (ngModel)' },
		},
		placeholder: {
			description: 'Texte affiché dans le champ tant que rien n’est saisi.',
			table: { category: 'inputs' },
		},
		hasClearer: {
			description: 'Affiche un bouton qui supprime toutes les chips effaçables.',
			table: { category: 'inputs' },
		},
		unkillableValues: {
			control: false,
			description: 'Valeurs affichées sous forme de chips non effaçables. Elles doivent faire partie de la valeur du champ.',
			table: { category: 'inputs', type: { summary: 'readonly string[]' } },
		},
		chipValidator: {
			control: false,
			description: 'Indique si une valeur respecte le format attendu. Une valeur refusée est ajoutée sous forme de chip en erreur.',
			table: { category: 'inputs', type: { summary: '((value: string) => boolean) | null' } },
		},
		validateEmails: {
			description: 'Exemple : passe à `chipValidator` une fonction qui vérifie que chaque valeur est une adresse e-mail.',
			table: { category: 'story' },
		},
		intl: intlArgType(luTextfieldTranslations, 'LuTextfieldLabel'),
	},
} as Meta;

export const Basic: StoryObj<ChipsFieldStory> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, required, disabled, validateEmails, ...inputArgs } = args;
		const model = useStoryModel<string[]>(['marie.dupont@example.com', 'paul.martin@example', 'contact@example.com']);
		return {
			props: { model, required, disabled, chipValidator: validateEmails ? isEmail : null, unkillableValues: ['contact@example.com'] },
			template: cleanupTemplate(`<lu-form-field ${generateInputs({ label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation }, argTypes)}>
	<lu-chips-input [(ngModel)]="model.example" [required]="required" [disabled]="disabled" [chipValidator]="chipValidator" [unkillableValues]="unkillableValues"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>`),
		};
	},
	args: {
		label: 'Destinataires',
		hiddenLabel: false,
		tooltip: '',
		inlineMessage: 'Appuyez sur Entrée, Tab ou virgule pour valider chaque adresse.',
		inlineMessageState: null,
		presentation: false,
		required: true,
		disabled: false,
		placeholder: '',
		hasClearer: true,
		validateEmails: true,
	},
};
