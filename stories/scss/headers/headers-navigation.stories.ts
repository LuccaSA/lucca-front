import { Meta, Story } from '@storybook/angular';

interface HeadersNavigationStory {
}

export default {
	title: 'SCSS/Headers/Navigation',
} as Meta;

function getTemplate(args: HeadersNavigationStory): string {
	return `
	<div class="header mod-nav">
		<div class="header-nav">
			<a class="header-nav-back"></a>
			<div class="header-nav-category">Catégorie</div>
			<h4 class="header-nav-title">Titre de la page</h4>
		</div>
	</div>
	`
}

const Template: Story<HeadersNavigationStory> = (args: HeadersNavigationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Navigation = Template.bind({});
Navigation.args = {};
