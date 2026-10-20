import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BoxDisclosureStory {
	theme: string;
	open: boolean;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Disclosure',
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	argTypes: {
		theme: {
			options: ['', 'neutral', 'sunken', 'fancyLight', 'fancyDark'],
			control: { type: 'select' },
			description: 'Applique un thème via la classe <code>mod-[theme]</code>.',
		},
		open: {
			description: 'Place la box dans son état déplié.',
		},
	},
} as Meta;

function getTemplate(args: BoxDisclosureStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';
	const open = args.open ? ' open' : '';

	return `<details class="boxDisclosure${theme}"${open}>
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Configurer les notifications</span>
			<span class="boxDisclosure-summary-description">À compléter avant le 3 mars.</span>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">
		Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll.
	</div>
</details>`;
}

const Template = (args: BoxDisclosureStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Disclosure: StoryObj<BoxDisclosureStory> = {
	args: { theme: '', open: false },
	render: Template,
};
