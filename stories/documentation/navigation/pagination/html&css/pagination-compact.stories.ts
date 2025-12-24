import { Meta, StoryObj } from '@storybook/angular';

interface PaginationCompactStory {}

export default {
	title: 'Documentation/Navigation/Pagination/Compact',
	argTypes: {},
} as Meta;

function getTemplate(args: PaginationCompactStory): string {
	return `
	<nav class="pagination mod-compact" role="navigation" aria-label="Pagination">
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="pr-u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="pr-u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`;
}

const Template = (args: PaginationCompactStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Compact: StoryObj<PaginationCompactStory> = {
	args: {},
	render: Template,
};
