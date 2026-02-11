import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { generateInputs } from '../../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Simple Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe, StoryModelDisplayComponent],
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
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ.',
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
		},
		loading: {
			description: "Applique l'état de chargement.",
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<
	LuSimpleSelectInputComponent<unknown> &
		FormFieldComponent & {
			disabled: boolean;
		}
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
			props: { legumes: allLegumes, example: allLegumes[0] },
			template: `<lu-form-field ${generateInputs(
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
	<lu-simple-select ${generateInputs(inputArgs, argTypes)}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[(ngModel)]="example">
	</lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		placeholder: 'Placeholder',
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		loading: false,
		disabled: false,
	},
};
