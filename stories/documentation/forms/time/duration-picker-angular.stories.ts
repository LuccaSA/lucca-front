import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DurationPickerComponent } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Duration Picker/Angular Form',
	decorators: [
		moduleMetadata({
			imports: [DurationPickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
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
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.",
		},
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
		hideZeroValue: {
			control: {
				type: 'boolean',
			},
			description: 'Masque le contenu du champ lorsque sa valeur est nulle.',
		},
		displayArrows: {
			control: {
				type: 'boolean',
			},
			description: "Affiche les boutons d'incrémention.",
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
			description: "Modifie le pas d\'incrémentation.",
		},
		max: {
			control: {
				type: 'text',
			},
			description: 'Définie une valeur maximale.',
		},
	},
} as Meta;

export const Basic: StoryObj<DurationPickerComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field [rolePresentationLabel]="true" ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>
	<lu-duration-picker label="${label}" ${generateInputs(inputArgs, argTypes)} [(ngModel)]="example">
	</lu-duration-picker>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		step: 'PT1M',
		max: 'PT99H',
	},
};
