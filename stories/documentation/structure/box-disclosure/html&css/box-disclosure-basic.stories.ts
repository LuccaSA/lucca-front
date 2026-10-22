import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BoxDisclosureBasicStory {
	theme: string;
	open: boolean;
	metadata: boolean;
}

export default {
	title: 'Documentation/Structure/BoxDisclosure/HTML&CSS/Basic',
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
		metadata: {
			description: 'Ajoute une information courte avant le chevron.',
		},
	},
} as Meta;

function getTemplate(args: BoxDisclosureBasicStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';
	const open = args.open ? ' open' : '';
	const metadata = args.metadata ? `\n\t\t<span class="boxDisclosure-summary-metadata">Metadata</span>` : '';

	return `<details class="boxDisclosure${theme}"${open}>
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-description">Subtitle</span>
		</span>${metadata}
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">
		Custom content
	</div>
</details>`;
}

const Template = (args: BoxDisclosureBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BoxDisclosureBasicStory> = {
	args: { theme: '', open: false, metadata: true },
	render: Template,
};
