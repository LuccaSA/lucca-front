import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luCoreSelectTranslations, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuMultiSelectInputComponent, luMultiSelectTranslations } from '@lucca-front/ng/multi-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { generateInputs, InputAlias, intlArgType, SelectCommonAliasInput, setStoryOptions, useStoryModel } from '../../../../../helpers/stories';

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
			table: { category: 'inputs (form-field)' },
		},
		label: {
			description: 'Modifie le label du champ.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs' },
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
		keepSearchAfterSelection: {
			description: 'Permet de poursuivre la recherche après une sélection',
			table: { category: 'inputs' },
		},
		loading: {
			description: 'Applique l’état de chargement.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
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
		maxValuesShown: {
			control: { type: 'number' },
			description: 'Nombre maximum de valeurs affichées sous forme de chips. Les valeurs suivantes sont résumées par un compteur.',
			table: { category: 'inputs', defaultValue: { summary: '500' } },
		},
		compact: {
			control: { type: 'boolean' },
			description: 'Applique un affichage compact au champ.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		noClueIcon: {
			control: { type: 'boolean' },
			description: 'Masque l’icône de recherche affichée dans le champ lorsqu’il a le focus ou est ouvert.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		colorPicker: {
			control: { type: 'boolean' },
			description: 'Adapte l’affichage du champ à la sélection de couleurs.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		ignorePresentation: {
			control: { type: 'boolean' },
			description: 'Ignore le mode `presentation` du champ de formulaire parent.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		inputTabindex: {
			control: { type: 'number' },
			description: 'Modifie le `tabindex` du champ.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		addOptionStrategy: {
			options: ['never', 'always', 'if-empty-clue', 'if-not-empty-clue'],
			control: { type: 'select' },
			description: 'Définit les conditions d’affichage du bouton d’ajout d’option.',
			table: { category: 'inputs', defaultValue: { summary: 'never' } },
		},
		addOptionLabel: {
			name: '↳ addOptionLabel',
			if: { arg: 'addOptionStrategy', neq: 'never' },
			control: { type: 'text' },
			description: 'Libellé du bouton d’ajout d’option. [PortalContent]',
			table: { category: 'inputs' },
		},
		prefix: {
			control: false,
			description: 'Contenu affiché avant la valeur du champ. [PortalContent]',
			table: { category: 'inputs' },
		},
		filterPillLabelPluralFn: {
			control: false,
			description: 'Fonction qui retourne le libellé affiché après le nombre de valeurs sélectionnées en mode filter pill.',
			table: { category: 'inputs', type: { summary: '(count: number) => string | LuPluralForms' } },
		},
		optionKey: {
			control: false,
			description: 'Fonction qui retourne la clé identifiant une option.',
			table: { category: 'inputs', type: { summary: '(option: T) => unknown' } },
		},
		valuesTpl: {
			control: false,
			description: 'Template ou composant utilisé pour afficher les valeurs sélectionnées. Two-way.',
			table: { category: 'models', type: { summary: 'TemplateRef<LuOptionContext<T[]>> | Type<unknown>' } },
		},
		panelHeaderTpl: {
			control: false,
			description: 'Template ou composant affiché en en-tête du panneau. Two-way.',
			table: { category: 'models', type: { summary: 'TemplateRef<void> | Type<unknown>' } },
		},
		panelFooterTpl: {
			control: false,
			description: 'Template ou composant affiché en pied du panneau. Two-way.',
			table: { category: 'models', type: { summary: 'TemplateRef<void> | Type<unknown>' } },
		},
		dataSource: {
			control: false,
			description: 'Source de données des options (pagination, recherche). Two-way.',
			table: { category: 'models', type: { summary: 'SelectDataSource<T>' } },
		},
		highlightedOption: {
			description: 'Événement déclenché lorsque l’option mise en évidence dans le panneau change.',
			action: 'highlightedOption',
			control: false,
			table: { category: 'outputs', type: { summary: 'T' } },
		},
		addOption: {
			description: 'Événement déclenché au clic sur le bouton d’ajout d’option, avec la recherche en cours.',
			action: 'addOption',
			control: false,
			table: { category: 'outputs', type: { summary: 'string' } },
		},
		intl: intlArgType([luCoreSelectTranslations, luMultiSelectTranslations], 'ILuMultiSelectLabel & LuCoreSelectLabel'),
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<InputAlias<LuMultiSelectInputComponent<unknown> & FormFieldComponent & { required: boolean }, SelectCommonAliasInput>> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, ...inputArgs } = args;
		const model = useStoryModel<ILegume[]>([]);
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
	<lu-multi-select [(ngModel)]="model.example" [options]="legumes | filterLegumes:clue" (clueChange)="clue = $event"${generateInputs(inputArgs, argTypes)} (panelOpened)="panelOpened()" (panelClosed)="panelClosed()" (highlightedOption)="highlightedOption($event)" (addOption)="addOption($event)" />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>`,
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
		compact: false,
		noClueIcon: false,
		colorPicker: false,
		ignorePresentation: false,
		addOptionStrategy: 'never',
		addOptionLabel: '',
	},
};
