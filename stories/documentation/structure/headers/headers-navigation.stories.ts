import { Meta, StoryFn } from '@storybook/angular';

interface HeadersNavigationStory {
	sticky: boolean;
	navside: boolean;
}

export default {
	title: 'Documentation/Structure/Headers/Navigation',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
		navside: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: HeadersNavigationStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';
	if (args.navside) {
		return `
			<div class="navSide"></div>
			<div class="main-content">
				<div class="header mod-nav ${sticky}">
					<div class="header-nav">
						<a class="header-nav-back"></a>
						<div class="header-nav-category">Catégorie</div>
						<h4 class="header-nav-title">Titre de la page</h4>
					</div>
				</div>
			</div>
		`;
	} else {
		return `
			<div class="header mod-nav ${sticky}">
				<div class="header-nav">
					<a class="header-nav-back"></a>
					<div class="header-nav-category">Catégorie</div>
					<h4 class="header-nav-title">Titre de la page</h4>
				</div>
			</div>
		`;
	}
}

const Template: StoryFn<HeadersNavigationStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Navigation = Template.bind({});
Navigation.args = {
	sticky: false,
	navside: false,
};
