import { Meta, StoryFn } from '@storybook/angular';

interface BreadcrumbsCompactStory {}

export default {
	title: 'Documentation/Navigation/Breadcrumbs/HTML&CSS/Compact',
} as Meta;

function getTemplate(args: BreadcrumbsCompactStory): string {
	return `<nav role="presentation" class="breadcrumbs mod-compact">
	<ol class="breadcrumbs-list">
		<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">Previous page</a></li>
		<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">Current page</span></li>
	</ol>
</nav>`;
}

const Template: StoryFn<BreadcrumbsCompactStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Compact = Template.bind({});
Compact.args = {};
