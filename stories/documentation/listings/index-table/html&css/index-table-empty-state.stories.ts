import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface IndexTableEmptyStateStory {}

export default {
	title: 'Documentation/Listings/Index Table/HTML & CSS/Empty State',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableEmptyStateStory): string {
	return `<table class="indexTable" role="presentation">
	<thead class="indexTable-head" inert="inert">
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
								<div class="bubbleIllustration mod-L" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/magnifyingGlass.svg' | luSafeExternalSvg"></div>
							</div>
							<div class="emptyState-content-text">
								<h3 class="emptyState-content-heading">Empty State</h3>
								<p class="emptyState-content-description">Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus.</p>
							</div>
						</div>
					</div>
				</section>
			</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableEmptyStateStory) => ({
	props: args,
	template: getTemplate(args),
});

export const EmptyState: StoryObj<IndexTableEmptyStateStory> = {
	args: {},
	render: Template,
};
