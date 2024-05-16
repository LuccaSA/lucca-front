import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface EmptyStateSectionBasicStory {}

export default {
	title: 'Documentation/Feedback/Empty State/HTML&CSS/Section',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: EmptyStateSectionBasicStory): string {
	return `<section class="emptyState">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarAction.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h3 class="emptyState-content-heading">Empty State</h3>
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

const Template: StoryFn<EmptyStateSectionBasicStory> = (args: EmptyStateSectionBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Section = Template.bind({});
Section.args = {};
