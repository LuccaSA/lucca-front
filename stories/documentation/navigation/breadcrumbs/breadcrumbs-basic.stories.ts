import { Meta, Story } from '@storybook/angular';

interface BreadcrumbsBasicStory {}

export default {
	title: 'Documentation/Navigation/Breadcrumbs/Basic',
} as Meta;

function getTemplate(args: BreadcrumbsBasicStory): string {
	return `
	<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
		<p id="breadcrumbs-title" class="u-mask">Breadcrumbs</p>
		<ol class="breadcrumbs-list">
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">You</a></li>
			<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">are</a></li>
			<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">here</span></li>
		</ol>
	</nav>
	`;
}

const Template: Story<BreadcrumbsBasicStory> = (args: BreadcrumbsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
