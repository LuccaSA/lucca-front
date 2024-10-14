import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface EmptyStatePageStory {}

export default {
	title: 'Documentation/Feedback/Empty State/HTML&CSS/Page',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: EmptyStatePageStory): string {
	return `<section class="emptyState mod-page" [style.--components-emptyState-background-color]="'var(--palettes-neutral-25)'">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/medal-01.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h1 class="emptyState-content-heading">Empty State</h1>
				<p class="emptyState-content-description">Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus.</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>`;
}

const Template: StoryFn<EmptyStatePageStory> = (args: EmptyStatePageStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Page = Template.bind({});
Page.args = {};
