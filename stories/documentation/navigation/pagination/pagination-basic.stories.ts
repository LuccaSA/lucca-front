import { Meta, StoryFn } from '@storybook/angular';

interface PaginationBasicStory {}

export default {
	title: 'Documentation/Navigation/Pagination/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: PaginationBasicStory): string {
	return `
	<nav class="pagination" role="navigation" aria-labelledby="pagination-count">
		<div id="pagination-count" class="pagination-count">
			<span class="pagination-count-current">
				<span class="u-mask">Résultats de </span>
				1<span aria-hidden="true"> – </span>
				<span class="u-mask">à </span>10
			</span>
			<span class="pagination-count-separator"> de </span>
			<span class="pagination-count-total">
				50<span class="u-mask"> pages</span>
			</span>
		</div>
		<div class="pagination-scrolling">
			<button type="button" class="actionIcon mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="u-mask">Précédent</span>
			</button>
			<button type="button" class="actionIcon mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`;
}

const Template: StoryFn<PaginationBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
