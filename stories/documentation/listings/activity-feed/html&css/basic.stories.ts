import { Meta, StoryObj } from '@storybook/angular';

interface ActivityFeedBasicStory {}

export default {
	title: 'Documentation/Listings/Activity feed/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ActivityFeedBasicStory): string {
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
				Lorem ipsum dolor sit amet.
			</p>
		</div>
	</li>
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
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
		</div>
	</li>
</ol>`;
}

const Template = (args: ActivityFeedBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ActivityFeedBasicStory> = {
	args: {},
	render: Template,
};
