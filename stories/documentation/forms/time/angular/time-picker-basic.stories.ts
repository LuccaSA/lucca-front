import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { BASE_PICKER_SIZE, TimePickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

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
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran.',
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		displayArrows: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche les boutons d’incrémentation.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
		},
		step: {
			control: {
				type: 'text',
			},
			description: 'Modifie le pas d’incrémentation.',
		},
		max: {
			control: {
				type: 'text',
			},
			description: 'Définit une valeur maximale.',
		},
		forceMeridiemDisplay: {
			options: ['', false, true],
			control: {
				type: 'select',
			},
			description: 'Force l’affichage de l’indicateur AM/PM',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
	},
} as Meta;

export const Basic: StoryObj<TimePickerComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, forceMeridiemDisplay, presentation, ...inputArgs } = args;
		return {
			template: `
<lu-form-field [label]="labelID" [rolePresentationLabel]="true"${generateInputs({ hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation }, argTypes)}>
	<lu-time-picker label="${label}"${generateInputs(inputArgs, argTypes)} ${forceMeridiemDisplay !== null ? `[forceMeridiemDisplay]="${forceMeridiemDisplay}"` : ''} [(ngModel)]="example" />
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
		presentation: false,
	},
};
