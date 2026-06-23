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
				<div class="activityFeed-content-group-update">
					<div class="activityFeed-content-group-update-before">1000 €</div>
					<span class="activityFeed-content-group-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
					<span class="pr-u-mask">a été remplacé par</span>
					<div class="activityFeed-content-group-update-after">800 €</div>
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
			<div class="activityFeed-content">
				<div class="activityFeed-content-group">
					<div class="activityFeed-content-group-update">
						<div class="activityFeed-content-group-update-object">Lorem ipsum :</div>
						<div class="activityFeed-content-group-update-before">Oui</div>
						<span class="activityFeed-content-group-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-group-update-after">Non</div>
					</div>
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
			<div class="activityFeed-content">
				<div class="activityFeed-content-group">
					<div class="activityFeed-content-group-update">
						<div class="activityFeed-content-group-update-object">Sit amet :</div>
						<div class="activityFeed-content-group-update-before">Oui</div>
						<span class="activityFeed-content-group-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-group-update-after">Non</div>
					</div>
					<div class="activityFeed-content-group-update">
						<div class="activityFeed-content-group-update-object">Dolor :</div>
						<div class="activityFeed-content-group-update-before">1000 €</div>
						<span class="activityFeed-content-group-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-group-update-after">500 €</div>
					</div>
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
				Daniel Hernandez a modifié une demande.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time"><abbr>Mar.</abbr> 15 juillet 2025 à 08:56</time>
			<div class="activityFeed-content">
				<div class="activityFeed-content-group">
					<div class="activityFeed-content-group-update">
						<div class="activityFeed-content-group-update-object">Statut :</div>
						<div class="activityFeed-content-group-update-before"><div class="statusBadge palette-critical">Refusé</div></div>
						<span class="activityFeed-content-group-update-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-group-update-after"><div class="statusBadge palette-success">Approuvé</div></div>
					</div>
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
