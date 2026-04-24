import { STATUS_BADGE_SIZE, StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

interface StatusBadgeBasicStory {
	label: string;
	size: string;
	palette: string;
	withEllipsis: boolean;
}

export default {
	title: 'Documentation/Texts/StatusBadge/Angular',
	decorators: [
		moduleMetadata({
			imports: [StatusBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.<br>[v19.2] Ajout de Neutral.',
		},
		size: {
			options: setStoryOptions(STATUS_BADGE_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.<br>[v20.2] Ajout de la taille <code>M</code>',
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le texte affiché par le composant.',
		},
		withEllipsis: {
			description: '[v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long.',
		},
	},
} as Meta;

function getTemplate(args: StatusBadgeBasicStory): string {
	const s = args.size ? ` size="${args.size}"` : ``;
	const p = args.palette ? ` palette="${args.palette}"` : ``;
	const e = args.withEllipsis ? ` withEllipsis` : ``;
	return `<lu-status-badge label="${args.label}"${p}${s}${e} />`;
}

const Template = (args: StatusBadgeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<StatusBadgeBasicStory> = {
	args: { label: 'Status', palette: '', size: '', withEllipsis: false },
	render: Template,
};
