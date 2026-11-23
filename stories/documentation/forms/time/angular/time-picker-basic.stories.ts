import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { BASE_PICKER_SIZE, luTimePickerTranslations, TimePickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

// `TimeChangeEvent` is not exported by `@lucca-front/ng/time`.
type TimeChangeEvent = Parameters<TimePickerComponent['timeChange']['emit']>[0];

export default {
	title: 'Documentation/Forms/Time/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [TimePickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(BASE_PICKER_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs (form-field)' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran.',
			table: { category: 'inputs (form-field)' },
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs' },
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
			description: 'Affiche les boutons d’incrémentation.',
			table: { category: 'inputs' },
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
			table: { category: 'models' },
		},
		step: {
			control: {
				type: 'text',
			},
			description: 'Modifie le pas d’incrémentation.',
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
			options: ['', false, true],
			control: {
				type: 'select',
			},
			description: 'Force (`true`) ou empêche (`false`) l’affichage de l’indicateur AM/PM. Sans valeur (`null`), l’affichage dépend de la locale.',
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		timeChange: {
			description: 'Événement déclenché lorsque l’utilisateur modifie l’heure. Émet la nouvelle et la précédente valeur.',
			action: 'timeChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'TimeChangeEvent' } },
		},
		intl: intlArgType(luTimePickerTranslations, 'TimePickerTranslations'),
	},
} as Meta;

export const Basic: StoryObj<TimePickerComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, forceMeridiemDisplay, presentation, timeChange, ...inputArgs } = args;
		const meridiemArg = forceMeridiemDisplay === true || forceMeridiemDisplay === false ? ` [forceMeridiemDisplay]="${forceMeridiemDisplay}"` : '';
		return {
			props: {
				onTimeChange: (event: TimeChangeEvent) => timeChange?.(event),
			},
			template: `
<lu-form-field [label]="labelID" [rolePresentationLabel]="true"${generateInputs({ hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation }, argTypes)}>
	<lu-time-picker label="${label}"${generateInputs(inputArgs, argTypes)}${meridiemArg} [(ngModel)]="example" (timeChange)="onTimeChange($event)" />
	<ng-template #labelID>
		<span aria-hidden="true">${label}</span>
	</ng-template>
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>
`,
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		displayArrows: false,
		disabled: false,
		step: 'PT1M',
		max: '23:59:59',
		forceMeridiemDisplay: null,
		presentation: false,
	},
};
