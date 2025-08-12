import { Meta, StoryFn } from '@storybook/angular';

interface PaginationPagesStory {}

export default {
	title: 'Documentation/Navigation/Pagination/Pages',
	argTypes: {},
} as Meta;

function getTemplate(args: PaginationPagesStory): string {
	return `
	<nav class="pagination" role="navigation" aria-label="Pagination">
		<ul class="pagination-navigation">
			<li class="pagination-navigation-item is-active" aria-current="page"><span class="pr-u-mask">Vous êtes sur la page </span>1</li>
			<li class="pagination-navigation-item"><a href="#">2</a></li>
			<li class="pagination-navigation-item"><a href="#">3</a></li>
			<li class="pagination-navigation-item is-ellipsis" aria-hidden="true"></li>
			<li class="pagination-navigation-item"><a href="#">49</a></li>
			<li class="pagination-navigation-item"><a href="#">50</a></li>
		</ul>
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-text mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="pr-u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-text mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="pr-u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`;
}

const Template: StoryFn<PaginationPagesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Pages = Template.bind({});
Pages.args = {};
