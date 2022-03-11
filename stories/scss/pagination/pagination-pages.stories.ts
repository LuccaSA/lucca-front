import { Meta, Story } from '@storybook/angular';

interface PaginationPagesStory {
}

export default {
	title: 'SCSS/Pagination/Pages',
	argTypes: {
	},
} as Meta;

function getTemplate(args: PaginationPagesStory): string {
	return `
	<nav class="pagination" role="navigation" aria-labelledby="pagination-navigation">
		<ul id="pagination-navigation" class="pagination-navigation">
			<li class="pagination-navigation-item is-active" aria-current="page"><span class="u-mask">Vous êtes sur la page </span>1</li>
			<li class="pagination-navigation-item"><a href="#">2</a></li>
			<li class="pagination-navigation-item"><a href="#">3</a></li>
			<li class="pagination-navigation-item is-ellipsis" aria-hidden="true"></li>
			<li class="pagination-navigation-item"><a href="#">49</a></li>
			<li class="pagination-navigation-item"><a href="#">50</a></li>
		</ul>
		<div class="pagination-scrolling">
			<button class="actionIcon" disabled>
				<span aria-hidden="true" class="lucca-icon icon-chevronWest"></span>
				<span class="u-mask">Précédent</span>
			</button>
			<button class="actionIcon">
				<span aria-hidden="true" class="lucca-icon icon-chevronEast"></span>
				<span class="u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`
}

const Template: Story<PaginationPagesStory> = (args: PaginationPagesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Pages = Template.bind({});
Pages.args = { };
