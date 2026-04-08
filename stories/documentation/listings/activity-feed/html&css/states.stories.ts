import { Meta, StoryObj } from '@storybook/angular';

interface ActivityFeedStatesStory {}

export default {
	title: 'Documentation/Listings/Activity feed/HTML&CSS/States',
	argTypes: {},
} as Meta;

function getTemplate(args: ActivityFeedStatesStory): string {
	return `<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-success"></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Demande approuvée.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-critical"></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Demande refusée.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
	<li class="activityFeed-step mod-pending">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				En attente d'approbation.
			</p>
		</div>
	</li>
</ol>`;
}

const Template = (args: ActivityFeedStatesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const States: StoryObj<ActivityFeedStatesStory> = {
	args: {},
	render: Template,
};
