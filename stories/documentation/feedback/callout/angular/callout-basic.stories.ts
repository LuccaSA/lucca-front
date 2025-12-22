import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args, context) => {
		const { palette, heading, actions, actionsInline, ...inputs } = args;
		const paletteArg = palette !== 'none' && palette !== undefined ? ` palette="${palette}"` : ``;
		const headingArg = heading ? ` heading="${heading}"` : ``;

		const actionsInlineArg = actionsInline ? ` inline` : ``;
		const actionsTemplate = actions
			? `<lu-callout-actions${actionsInlineArg}>
		<button luButton="outlined">Action</button>
		<button luButton="ghost">Action</button>
	</lu-callout-actions>`
			: ``;

		return {
			template: `<lu-callout${headingArg}${paletteArg}${generateInputs(inputs, context.argTypes)}>
	Feedback description
	${actionsTemplate}
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
			options: ['none', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
			if: { arg: 'AI', truthy: false },
		},
		icon: {
			options: [null, 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp', 'weatherStars', 'officePenStar'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
		},
		iconAlt: {
			description: "Information de l'icône restituée par le lecteur d'écran.",
			type: 'string',
		},

		state: {
			options: [null, 'success', 'warning', 'error'],
			description: 'État du composant.',
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
		},
		heading: {
			type: 'string',
			description: 'Ajoute un titre au callout.',
		},
		removedChange: HiddenArgType,
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			control: {
				type: 'boolean',
			},
		},
		actions: {
			description: "[v20.3] Ajoute une liste d'actions sous la description.",
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
		state: null,
		icon: null,
		palette: 'none',
		removable: false,
		removed: false,
		AI: false,
		actions: false,
		actionsInline: false,
	},
};
