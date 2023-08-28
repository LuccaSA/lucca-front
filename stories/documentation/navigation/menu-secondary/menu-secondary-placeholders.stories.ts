import { Meta, StoryFn } from '@storybook/angular';

interface MenuSecondaryPlaceholderStory {
	compact: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu Secondary/Placeholder',
	argTypes: {
		compact: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: MenuSecondaryPlaceholderStory): string {
	const compact = args.compact ? `mod-compact` : '';
	return `
	<div class="navSide ${compact}">
		<nav role="navigation" aria-label="Nom application" class="navSide-wrapper">
			<div class="navSide-mainSection">
				<ul class="navSide-scrollWrapper">
					<div class="navSide-item-placeholder"></div>
					<div class="navSide-item-placeholder"></div>
					<div class="navSide-item-placeholder"></div>
				</ul>
			</div>
			<div class="navSide-bottomSection">
				<div class="navSide-item-placeholder"></div>
			</div>
		</nav>
	</div>
	`;
}

const Template: StoryFn<MenuSecondaryPlaceholderStory> = (args: MenuSecondaryPlaceholderStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.navSide {
			position: relative;
			max-height: 30rem;
		}`,
	],
});

export const Placeholder = Template.bind({});
Placeholder.args = { compact: false };
