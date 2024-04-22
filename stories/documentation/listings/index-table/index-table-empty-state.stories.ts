import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableEmptyStateStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Empty State',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableEmptyStateStory): string {
	return `<table class="indexTable" inert role="presentation">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell" colspan="3">
			<section class="emptyState">
				<div class="emptyState-container">
					<div class="emptyState-content">
						<div class="emptyState-content-icon" aria-hidden="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"><path fill="var(--components-emptyState-icon-background-color, var(--palettes-primary-100))" d="M8.486 8.353c13.568-17.282 28.862.168 34.134 8.927 5.273 8.757 12.27 29.818-22.434 27.55C.353 43.536-5.074 25.628 8.486 8.353"/><path fill="#679" d="m21.28 25.715-3.754 3.754 3.002 3.003 3.755-3.755-3.003-3.002"/><path fill="#ACBBD7" d="m14.024 38.48-2.504-2.503a1.767 1.767 0 0 1 0-2.504l3.753-3.753a1.767 1.767 0 0 1 2.504 0l2.503 2.504c.693.693.693 1.81 0 2.503l-3.753 3.754a1.767 1.767 0 0 1-2.504 0M45 18.27c0 7.33-5.944 13.27-13.27 13.27S18.46 25.6 18.46 18.27C18.46 10.94 24.404 5 31.73 5S45 10.944 45 18.27"/><path fill="#fff" d="M42.467 18.27c0 5.93-4.807 10.737-10.737 10.737S20.993 24.2 20.993 18.27 25.8 7.533 31.73 7.533s10.737 4.808 10.737 10.737"/></svg>
						</div>
						<div class="emptyState-content-text">
							<h3 class="emptyState-content-heading">Empty State</h3>
							<p>Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus.</p>
						</div>
					</div>
				</div>
			</section>
			</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableEmptyStateStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const EmptyState = Template.bind({});
EmptyState.args = { };
