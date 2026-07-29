import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface EmptyState {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Empty State',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: EmptyState): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell" colspan="3">
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
	</table>
</div>`;
}

const Template = (args: EmptyState) => ({
	props: args,
	template: getTemplate(args),
});

export const EmptyState: StoryObj<EmptyState> = {
	args: {},
	render: Template,
};
