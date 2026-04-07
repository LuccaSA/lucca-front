import { Meta, StoryObj } from '@storybook/angular';

interface ActivityFeedUpdatedStory {}

export default {
	title: 'Documentation/Listings/Activity feed/HTML&CSS/Updated',
	argTypes: {},
} as Meta;

function getTemplate(args: ActivityFeedUpdatedStory): string {
	return `<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
			<div class="activityFeed-content">
				<div class="activityFeed-content-update">
					<div class="activityFeed-content-update-before">1000&nbsp;€</div>
					<span class="activityFeed-content-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
					<span class="pr-u-mask">à été remplacé par</span>
					<div class="activityFeed-content-update-after">800&nbsp;€</div>
				</div>
			</div>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a modifié un statut.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
			<div class="activityFeed-content">
				<div class="activityFeed-content-update">
					<div class="activityFeed-content-update-before"><div class="statusBadge palette-critical">Refusé</div></div>
					<span class="activityFeed-content-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
					<span class="pr-u-mask">à été remplacé par</span>
					<div class="activityFeed-content-update-after"><div class="statusBadge palette-success">Approuvé</div></div>
				</div>
			</div>
		</div>
	</li>
</ol>`;
}

const Template = (args: ActivityFeedUpdatedStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Updated: StoryObj<ActivityFeedUpdatedStory> = {
	args: {},
	render: Template,
};
