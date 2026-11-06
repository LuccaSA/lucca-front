import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, luColorTranslations } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions, useStoryModel } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Color Picker/Angular',
	decorators: [
		moduleMetadata({
			imports: [ColorInputComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle. ',
			table: { category: 'inputs (form-field)' },
		},
		label: {
			description: 'Modifie le label du champ.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs (form-field)' },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: 'Applique une largeur fixe au champ.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs (form-field)', defaultValue: { summary: 'null' } },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		colors: {
			control: false,
			description: 'Liste des couleurs proposées. Requis.',
			table: { category: 'inputs', type: { summary: 'ColorOption[]' } },
		},
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		compact: {
			description: 'Modifie la taille du color picker pour le rendre plus petit.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luColorTranslations, 'LuColorLabel'),
	},
} as Meta;

export const Basic: StoryObj<ColorInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		const model = useStoryModel<string | null>(null);
		return {
			props: { colors: colorDecoratives500, model },
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					width,
				},
				argTypes,
			)}>
	<lu-color-input [(ngModel)]="model.example" [colors]="colors"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [ColorInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: false,
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		compact: false,
	},
};
