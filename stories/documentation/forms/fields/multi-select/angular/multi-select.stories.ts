import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { generateInputs, setStoryOptions } from '../../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Multi Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuMultiSelectInputComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle. ',
		},
		label: {
			description: 'Modifie le label du champ.',
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ.',
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
		},
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
		},
		keepSearchAfterSelection: {
			description: 'Permet de poursuivre la recherche après une sélection',
		},
		loading: {
			description: 'Applique l’état de chargement.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<LuMultiSelectInputComponent<unknown> & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, ...inputArgs } = args;
		return {
			props: { legumes: allLegumes, example: [] },
			template: `<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					width,
					presentation,
				},
				argTypes,
			)}>
	<lu-multi-select [(ngModel)]="example" [options]="legumes | filterLegumes:clue" (clueChange)="clue = $event"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [LuMultiSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: false,
		placeholder: 'Placeholder',
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		loading: false,
		keepSearchAfterSelection: false,
		presentation: false,
	},
};
