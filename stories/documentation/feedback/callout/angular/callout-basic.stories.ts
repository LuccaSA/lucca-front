import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

import { ButtonComponent } from '@lucca-front/ng/button';
import {
	CALLOUT_HEADING_LEVEL,
	CALLOUT_SIZE,
	CalloutActionsComponent,
	CalloutComponent,
	CalloutFeedbackItemComponent,
	CalloutFeedbackListComponent,
	CalloutStates,
	luCalloutTranslations,
} from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args, context) => {
		const { palette, heading, headingLevel, actions, actionsInline, ...inputs } = args;
		const paletteArg = palette ? ` palette="${palette}"` : '';
		const headingArg = heading ? ` heading="${heading}"` : ``;
		const headingLevelArg = heading && headingLevel ? ` headingLevel="${headingLevel}"` : ``;

		const actionsInlineArg = actionsInline ? ` inline` : ``;
		const actionsTemplate = actions
			? `
	<lu-callout-actions${actionsInlineArg}>
		<button luButton="outlined">Action</button>
		<button luButton="ghost">Action</button>
	</lu-callout-actions>`
			: ``;

		return {
			props: {
				...args,
			},
			template: `<lu-callout${headingArg}${headingLevelArg}${paletteArg}${generateInputs(inputs, context.argTypes)} (removedChange)="removedChange($event)">
	<p>Feedback description</p>${actionsTemplate}
</lu-callout>`,
		};
	},
	argTypes: {
		removable: {
			description: 'Ajoute un bouton de suppression au callout.',
			table: { category: 'inputs' },
		},
		removed: {
			if: { arg: 'removable', truthy: true },
			description: 'Masque le callout.',
			table: { category: 'inputs' },
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
			if: { arg: 'AI', truthy: false },
			table: { category: 'inputs' },
		},
		icon: {
			options: ['', 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp', 'weatherStars', 'officePenStar'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
			table: { category: 'inputs' },
		},
		iconAlt: {
			description: 'Information de l’icône restituée par le lecteur d’écran.',
			type: 'string',
			table: { category: 'inputs' },
		},
		state: {
			options: setStoryOptions(CalloutStates),
			description: 'État du callout.',
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(CALLOUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
			table: { category: 'inputs' },
		},
		heading: {
			type: 'string',
			description: 'Ajoute un titre au callout. [PortalContent]',
			table: { category: 'inputs' },
		},
		headingLevel: {
			name: '↳ headingLevel',
			options: setStoryOptions(CALLOUT_HEADING_LEVEL),
			control: {
				type: 'select',
			},
			description: '[v22.2] Applique un niveau sémantique au titre.',
			if: { arg: 'heading', truthy: true },
			table: { category: 'inputs' },
		},
		hx: {
			control: false,
			description: '[Déprécié] Utiliser <code>headingLevel</code>.',
			table: { category: 'inputs (deprecated)' },
		},
		removedChange: {
			description: 'Événement déclenché lors de l’activation du bouton de suppression.',
			action: 'removedChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'boolean' } },
		},
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs' },
		},
		actions: {
			description: '[v20.3] Ajoute une liste d’actions sous la description (<code>lu-callout-actions</code>).',
			table: { category: 'story' },
		},
		actionsInline: {
			name: '↳ inline',
			if: { arg: 'actions', truthy: true },
			description: '[v20.3] Déplace les actions sur la droite du callout.',
			table: { category: 'inputs (callout-actions)' },
		},
		intl: intlArgType(luCalloutTranslations, 'LuCalloutLabel'),
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { actions: boolean; actionsInline: boolean }> = {
	name: 'Basic',
	args: {
		heading: '',
		removable: false,
		removed: false,
		AI: false,
		actions: false,
		actionsInline: false,
	},
};
