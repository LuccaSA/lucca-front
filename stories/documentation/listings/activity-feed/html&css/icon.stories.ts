import { Meta, StoryObj } from '@storybook/angular-vite';

interface ActivityFeedIconStory {}

export default {
	title: 'Documentation/Listings/Activity feed/HTML&CSS/Icon',
	argTypes: {},
} as Meta;

function getTemplate(args: ActivityFeedIconStory): string {
	return `<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-icon"><span class="lucca-icon icon-signInfo" aria-hidden="true"></span></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Demande enregistrée.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-icon"><span class="lucca-icon icon-timeHourglass" aria-hidden="true"></span></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Demande en cours de traitement.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
</ol>`;
}

const Template = (args: ActivityFeedIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon: StoryObj<ActivityFeedIconStory> = {
	args: {},
	render: Template,
};
