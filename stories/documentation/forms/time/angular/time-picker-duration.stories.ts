import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { BASE_PICKER_SIZE, DurationPickerComponent, luDurationPickerTranslations } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

// `DurationChangeEvent` is not exported by `@lucca-front/ng/time`.
type DurationChangeEvent = Parameters<DurationPickerComponent['durationChange']['emit']>[0];

export default {
	title: 'Documentation/Forms/Time/Angular/Duration',
	decorators: [
		moduleMetadata({
			imports: [DurationPickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
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
		hideZeroValue: {
			control: {
				type: 'boolean',
			},
			description: 'Masque le contenu du champ lorsque sa valeur est nulle.',
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
			description: '[v21.1] Définit une valeur maximale.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		durationChange: {
			description: 'Événement déclenché lorsque l’utilisateur modifie la durée. Émet la nouvelle et la précédente valeur.',
			action: 'durationChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'DurationChangeEvent' } },
		},
		intl: intlArgType(luDurationPickerTranslations, 'DurationPickerTranslations'),
	},
} as Meta;

export const Basic: StoryObj<DurationPickerComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation, durationChange, ...inputArgs } = args;
		return {
			props: {
				onDurationChange: (event: DurationChangeEvent) => durationChange?.(event),
			},
			template: `<lu-form-field [rolePresentationLabel]="true"${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					presentation,
				},
				argTypes,
			)}>
	<lu-duration-picker label="${label}"${generateInputs(inputArgs, argTypes)} [(ngModel)]="example" (durationChange)="onDurationChange($event)" />
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>`,
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		hideZeroValue: false,
		displayArrows: false,
		disabled: false,
		presentation: false,
		step: 'PT1M',
		max: 'PT99H',
	},
};
