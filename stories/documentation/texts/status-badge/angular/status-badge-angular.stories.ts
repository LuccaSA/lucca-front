import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.<br>[v19.2] Ajout de Neutral.',
		},
		size: {
			options: ['', 'M', 'L'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille de du composant.<br>[v20.2] Ajout de la taille <code>M</code>',
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

const Template: StoryFn<StatusBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { label: 'Status', palette: '', size: '', withEllipsis: false };
