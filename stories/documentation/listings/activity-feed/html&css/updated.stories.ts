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
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-before">1000 €</div>
						<span class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">800 €</div>
					</li>
				</ul>
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
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Lorem ipsum :</div>
						<div class="activityFeed-content-update-item-before">Oui</div>
						<span class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">Non</div>
					</li>
				</ul>
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
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Sit amet :</div>
						<div class="activityFeed-content-update-item-before">Oui</div>
						<span class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">Non</div>
					</li>
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Dolor :</div>
						<div class="activityFeed-content-update-item-before">1000 €</div>
						<span class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">500 €</div>
					</li>
				</ul>
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
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Statut :</div>
						<div class="activityFeed-content-update-item-before"><div class="statusBadge palette-critical">Refusé</div></div>
						<span class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS" aria-hidden="true"></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after"><div class="statusBadge palette-success">Approuvé</div></div>
					</li>
				</ul>
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
