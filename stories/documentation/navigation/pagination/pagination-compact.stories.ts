import { Meta, Story } from '@storybook/angular';

interface PaginationCompactStory {}

export default {
	title: 'Documentation/Navigation/Pagination/Compact',
	argTypes: {},
} as Meta;

function getTemplate(args: PaginationCompactStory): string {
	return `
	<nav class="pagination mod-compact" role="navigation" aria-labelledby="pagination-count">
		<div class="pagination-scrolling">
			<button type="button" class="actionIcon mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-chevronLeft"></span>
				<span class="u-mask">Précédent</span>
			</button>
			<button type="button" class="actionIcon mod-S">
				<span aria-hidden="true" class="lucca-icon icon-chevronRight"></span>
				<span class="u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`;
}

const Template: Story<PaginationCompactStory> = (args: PaginationCompactStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Compact = Template.bind({});
Compact.args = {};
