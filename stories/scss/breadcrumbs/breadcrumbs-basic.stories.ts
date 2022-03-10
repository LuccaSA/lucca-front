import { Meta, Story } from '@storybook/angular';

interface BreadcrumbsBasicStory {
}

export default {
	title: 'SCSS/Breadcrumbs/Basic',
} as Meta;

function getTemplate(args: BreadcrumbsBasicStory): string {
	const classes = [].filter(Boolean).join(' ');
	return `
	<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
		<p id="breadcrumbs-title" class="u-mask">Breadcrumbs</p>
		<ul class="breadcrumbs-list">
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">lien</a></li>
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">lien</a></li>
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">lien</a></li>
			<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">page courante</span></li>
		</ul>
	</nav>
	`
}

const Template: Story<BreadcrumbsBasicStory> = (args: BreadcrumbsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
