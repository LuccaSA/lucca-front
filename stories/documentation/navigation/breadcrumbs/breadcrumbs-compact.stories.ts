import { Meta, Story } from '@storybook/angular';

interface BreadcrumbsCompactStory {
}

export default {
	title: 'Documentation/Navigation/Breadcrumbs/Compact',
} as Meta;

function getTemplate(args: BreadcrumbsCompactStory): string {
	return `
	<nav class="breadcrumbs mod-compact" aria-describedby="breadcrumbs-title">
		<p id="breadcrumbs-title" class="u-mask">Breadcrumbs</p>
		<ul class="breadcrumbs-list">
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">Previous page</a></li>
			<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">current page</span></li>
		</ul>
	</nav>
	`
}

const Template: Story<BreadcrumbsCompactStory> = (args: BreadcrumbsCompactStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Compact = Template.bind({});
Compact.args = {};
