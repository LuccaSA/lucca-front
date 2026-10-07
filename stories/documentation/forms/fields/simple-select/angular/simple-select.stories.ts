import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luCoreSelectTranslations, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuSimpleSelectInputComponent, luSimpleSelectTranslations } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { generateInputs, InputAlias, intlArgType, SelectCommonAliasInput, setStoryOptions, useStoryModel } from '../../../../../helpers/stories';

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
			table: { category: 'inputs (form-field)' },
		},
		label: {
			description: 'Modifie le label du champ.',
			table: { category: 'inputs (form-field)' },
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
			table: { category: 'inputs' },
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
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		loading: {
			description: 'Applique l’état de chargement.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
		noClueIcon: {
			description: 'Masque l’icône de recherche affichée lorsque le champ a le focus ou que le panneau est ouvert.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		inputTabindex: {
			control: { type: 'number' },
			description: 'Modifie le tabindex du champ de saisie.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		ignorePresentation: {
			description: 'Désactive l’affichage par défaut du mode présentation (`presentation` du `lu-form-field`), lorsqu’un composant parent fournit le sien.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		autocomplete: {
			control: { type: 'text' },
			description: 'Modifie l’attribut `autocomplete` du champ de saisie.',
			table: { category: 'inputs', defaultValue: { summary: 'off' } },
		},
		optionKey: {
			control: false,
			description: 'Fonction retournant la clé unique d’une option, utilisée pour suivre les options affichées dans le panneau.',
			table: { category: 'inputs', type: { summary: '(option: T) => unknown' }, defaultValue: { summary: '(option) => option' } },
		},
		panelFooterTpl: {
			control: false,
			description: 'Template affiché en pied du panneau de sélection.',
			table: { category: 'models', type: { summary: 'TemplateRef<void> | Type<unknown>' } },
		},
		dataSource: {
			control: false,
			description: 'Source de données des options, utilisée à la place de l’input `options` (chargement, pagination, recherche).',
			table: { category: 'models', type: { summary: 'SelectDataSource<T>' } },
		},
		panelOpened: {
			description: "Événement déclenché à l'ouverture du panneau de sélection.",
			action: 'panelOpened',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		panelClosed: {
			description: 'Événement déclenché à la fermeture du panneau de sélection.',
			action: 'panelClosed',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		clueChange: {
			description: 'Événement déclenché lorsque la recherche saisie change. S’y abonner rend le champ recherchable.',
			action: 'clueChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'string' } },
		},
		nextPage: {
			description: 'Événement déclenché lorsque la fin de la liste d’options est atteinte, pour charger la page suivante.',
			action: 'nextPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		highlightedOption: {
			description: 'Événement déclenché lorsqu’une option est mise en surbrillance dans le panneau.',
			action: 'highlightedOption',
			control: false,
			table: { category: 'outputs', type: { summary: 'T' } },
		},
		addOption: {
			description: 'Événement déclenché au clic sur le bouton d’ajout d’option (voir `addOptionStrategy`). Émet la recherche saisie.',
			action: 'addOption',
			control: false,
			table: { category: 'outputs', type: { summary: 'string' } },
		},
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
		intl: intlArgType([luCoreSelectTranslations, luSimpleSelectTranslations], 'ILuSimpleSelectLabel & LuCoreSelectLabel'),
	},
} as Meta;

export const Basic: StoryObj<
	InputAlias<
		LuSimpleSelectInputComponent<ILegume> &
			FormFieldComponent & {
				disabled: boolean;
			},
		SelectCommonAliasInput
	>
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, ...inputArgs } = args;
		const model = useStoryModel<ILegume>(allLegumes[0]);
		return {
			props: { ...args, legumes: allLegumes, model },
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
	<lu-simple-select ${generateInputs(inputArgs, argTypes)} (panelOpened)="panelOpened()" (panelClosed)="panelClosed()"
		(highlightedOption)="highlightedOption($event)" (nextPage)="nextPage()" (addOption)="addOption($event)"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event; clueChange($event)"
		[(ngModel)]="model.example">
	</lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>`,
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
		presentation: false,
		noClueIcon: false,
		inputTabindex: 0,
		ignorePresentation: false,
		autocomplete: 'off',
	},
};
