import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RADIO_GROUP_INPUT_ARROW, RADIO_GROUP_INPUT_FRAMED_SIZE, RADIO_GROUP_INPUT_SIZE, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, useStoryModel, generateInputs, setStoryOptions } from '@/helpers/stories';

import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RadioField/Angular',
	decorators: [
		moduleMetadata({
			imports: [RadioGroupInputComponent, RadioComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(RADIO_GROUP_INPUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille des boutons radio.',
			table: { category: 'inputs' },
		},
		framed: {
			control: { type: 'boolean' },
			description: 'Affiche chaque option dans un cadre (input framed).',
			table: { category: 'inputs' },
		},
		framedCenter: {
			name: '↳ framedCenter',
			if: { arg: 'framed', truthy: true },
			control: { type: 'boolean' },
			description: 'Centre le contenu des cadres.',
			table: { category: 'inputs' },
		},
		framedSize: {
			name: '↳ framedSize',
			if: { arg: 'framed', truthy: true },
			options: setStoryOptions(RADIO_GROUP_INPUT_FRAMED_SIZE),
			control: { type: 'select' },
			description: 'Modifie la taille des cadres.',
			table: { category: 'inputs' },
		},
		arrow: {
			options: setStoryOptions(RADIO_GROUP_INPUT_ARROW),
			control: { type: 'select' },
			description: 'Ajoute une flèche sous chaque option, pour la relier à un contenu affiché en dessous.',
			table: { category: 'inputs' },
		},
		value: {
			control: false,
			description: 'Valeur de l’option, affectée au modèle lorsqu’elle est sélectionnée. Requis.',
			table: { category: 'inputs (radio)', type: { summary: 'T' } },
		},
		disabled: {
			control: false,
			description: 'Désactive l’option.',
			table: { category: 'inputs (radio)', defaultValue: { summary: 'false' } },
		},
		radioInlineMessage: {
			name: 'inlineMessage',
			control: false,
			description: 'Ajoute un texte descriptif sous l’option. [PortalContent]',
			table: { category: 'inputs (radio)' },
		},
		tag: {
			control: false,
			description: 'Ajoute un tag après le libellé de l’option.',
			table: { category: 'inputs (radio)' },
		},
		framedPortal: {
			control: false,
			description: 'Contenu additionnel affiché dans le cadre de l’option lorsque <code>framed</code> est actif. [PortalContent]',
			table: { category: 'inputs (radio)' },
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
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		inline: {
			description: 'Affiche les différentes options sur un axe horizontal.',
			table: { category: 'inputs (form-field)' },
		},
	},
} as Meta;

export const Basic: StoryObj<RadioGroupInputComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, inline, presentation, ...inputArgs } = args;
		const model = useStoryModel(1);
		return {
			props: { model },
			template: cleanupTemplate(`<lu-form-field${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					inline,
					presentation,
				},
				argTypes,
			)}>
	<lu-radio-group-input${generateInputs(inputArgs, argTypes)} [(ngModel)]="model.example">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<ng-template #template><strong>Option</strong> text</ng-template>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>

<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: null,
		inline: false,
		presentation: false,
		framed: false,
		framedCenter: false,
		arrow: null,
	},
};
