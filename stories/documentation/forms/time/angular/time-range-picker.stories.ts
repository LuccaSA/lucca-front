import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { luTimeRangePickerTranslations, TimePickerComponent, TimeRangePickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

import { generateInputs, intlArgType } from '../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Angular/TimeRangePicker',
	decorators: [
		moduleMetadata({
			imports: [TimePickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent, TimeRangePickerComponent, JsonPipe],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ (appliquée à `lu-form-field` et à `lu-time-range-picker`).',
			table: { category: 'inputs' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
			table: { category: 'inputs (form-field)' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.",
			table: { category: 'inputs (form-field)' },
		},
		label: {
			control: {
				type: 'text',
			},
			description: "Modifie le label de l'input.",
			table: { category: 'inputs (form-field)' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs' },
		},
		displayArrows: {
			control: {
				type: 'boolean',
			},
			description: "Affiche les boutons d'incrémention.",
			table: { category: 'inputs' },
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		step: {
			control: {
				type: 'text',
			},
			description: "Modifie le pas d'incrémentation.",
			table: { category: 'inputs' },
		},
		max: {
			control: {
				type: 'text',
			},
			description: 'Définit une valeur maximale.',
			table: { category: 'inputs' },
		},
		forceMeridiemDisplay: {
			control: {
				type: 'boolean',
			},
			description: "Force l'affichage de l'indicateur AM/PM.",
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		intl: intlArgType(luTimeRangePickerTranslations, 'TimeRangePickerTranslations'),
	},
} as Meta;

export const Basic: StoryObj<TimeRangePickerComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, presentation, ...inputArgs } = args;
		return {
			template: `<lu-form-field label="${label}"${generateInputs({ hiddenLabel, tooltip, inlineMessage, inlineMessageState, size: inputArgs.size, presentation }, argTypes)}>
	<lu-time-range-picker${generateInputs(inputArgs, argTypes)} [(ngModel)]="example" />
</lu-form-field>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>
`,
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Period',
		tooltip: '',
		required: false,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		displayArrows: false,
		disabled: false,
		step: 'PT1M',
		max: '23:59:59',
		forceMeridiemDisplay: false,
		presentation: false,
	},
};
