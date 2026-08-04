import { Meta, StoryObj } from '@storybook/angular-vite';

interface OrnamentStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Ornaments',
	argTypes: {},
} as Meta;

const bubble = (side: 'start' | 'end') =>
	`<img alt="" class="highlightSection-bubbles-${side}" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg" />`;

function getSection(label: string, sides: ('start' | 'end')[]): string {
	const bubbles = sides.length ? `\n	<div class="highlightSection-bubbles">\n		${sides.map(bubble).join('\n		')}\n	</div>` : '';

	return `<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">${label}</p>
		</div>
	</div>${bubbles}
</div>`;
}

function getTemplate(args: OrnamentStory): string {
	return [getSection('Des deux côtés', ['start', 'end']), getSection('Sans ornement', []), getSection('En bas au début', ['start']), getSection('En bas à la fin', ['end'])].join('\n\n');
}

const Template = (args: OrnamentStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-100);
		}`,
	],
});

export const Ornaments: StoryObj<OrnamentStory> = {
	args: {},
	render: Template,
};
