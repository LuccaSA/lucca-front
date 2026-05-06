import { ButtonComponent } from '@lucca-front/ng/button';
import { CALLOUT_HX, CALLOUT_SIZE, CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutStates } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args, context) => {
		const { palette, heading, hx, actions, actionsInline, ...inputs } = args;
		const paletteArg = palette !== 'none' && palette !== undefined ? ` palette="${palette}"` : ``;
		const headingArg = heading ? ` heading="${heading}"` : ``;
		const hxArg = heading && hx ? ` hx="${hx}"` : ``;

		const actionsInlineArg = actionsInline ? ` inline` : ``;
		const actionsTemplate = actions
			? `
	<lu-callout-actions${actionsInlineArg}>
		<button luButton="outlined">Action</button>
		<button luButton="ghost">Action</button>
	</lu-callout-actions>`
			: ``;

		return {
			template: `<lu-callout${headingArg}${hxArg}${paletteArg}${generateInputs(inputs, context.argTypes)}>
	<p>Feedback description</p>${actionsTemplate}
</lu-callout>`,
		};
	},
	argTypes: {
		removable: {
			description: 'Ajoute un bouton de suppression au callout.',
		},
		removed: {
			if: { arg: 'removable', truthy: true },
			description: 'Masque le callout.',
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
			if: { arg: 'AI', truthy: false },
		},
		icon: {
			options: ['', 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp', 'weatherStars', 'officePenStar'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
		},
		iconAlt: {
			description: 'Information de l’icône restituée par le lecteur d’écran.',
			type: 'string',
		},
		state: {
			options: setStoryOptions(CalloutStates),
			description: 'État du callout.',
			control: {
				type: 'select',
			},
		},
		size: {
			options: setStoryOptions(CALLOUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
		},
		heading: {
			type: 'string',
			description: 'Ajoute un titre au callout.',
		},
		hx: {
			options: setStoryOptions(CALLOUT_HX),
			control: {
				type: 'select',
			},
			description: '[v21.4] Applique un niveau sémantique au titre.',
			if: { arg: 'heading', truthy: true },
		},
		removedChange: HiddenArgType,
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
		},
		actions: {
			description: '[v20.3] Ajoute une liste d’actions sous la description.',
		},
		actionsInline: {
			if: { arg: 'actions', truthy: true },
			description: '[v20.3] Déplace les actions sur la droite du callout.',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { actions: boolean; actionsInline: boolean }> = {
	args: {
		heading: '',
		palette: 'none',
		removable: false,
		removed: false,
		AI: false,
		actions: false,
		actionsInline: false,
	},
};
