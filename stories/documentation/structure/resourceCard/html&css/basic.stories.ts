import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardHTMLBasicStory {}

export default {
	title: 'Documentation/Structure/Resource Card/HTML&CSS/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	render: (args: ResourceCardHTMLBasicStory) => {
		const card = `
	<div class="resourceCardContainer">
		<section class="resourceCard">
			<div class="resourceCard-content">
				<!--
				<div class="resourceCard-content-before">
					<div class="resourceCard-content-before-content">
						<div class="resourceCard-content-before-content-illustration"></div>
					</div>
				</div>
				-->
				<header class="resourceCard-content-header">
					<h3 class="pr-u-h3 resourceCard-content-header-title">
						<a href="#" class="link"><span class="link-text">Sit amet</span></a>
					</h3>
					<!-- <div class="resourceCard-content-header-infos"></div> -->
				</header>
				<div class="resourceCard-content-description">
					Consectetur adipiscing elit. Consectetur adipiscing elit.
					Consectetur adipiscing elit. Consectetur adipiscing elit.
					Consectetur adipiscing elit. Consectetur adipiscing elit.
				</div>
				<!-- <div class="resourceCard-content-after"></div> -->
			</div>
		</section>
	</div>`;
		const cards = `
	<div class="resourceCardContainer">
		<section class="resourceCard">
			<div class="resourceCard-content">
				<div class="resourceCard-content-before">
					<div class="resourceCard-content-before-content">
						<div class="button cdk-drag-handle resourceCard-content-before-content-handleButton">
							<span aria-hidden="true" class="lucca-icon icon-dotsDrag icon-color-inherit"></span>
						</div>
						<div class="resourceCard-content-before-content-illustration">
							<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700);">
								<span aria-hidden="true" class="lucca-icon icon-heart icon-color-inherit mod-L"></span>
							</div>
						</div>
					</div>
				</div>
				<header class="resourceCard-content-header">
					<h3 class="pr-u-h3 resourceCard-content-header-title">
						<a href="#" class="link"><span class="link-text">Lorem ipsum dolor</span></a>
						<span class="numericBadge-value">88</span>
					</h3>
					<div class="resourceCard-content-header-infos">
						<span class="statusBadge mod-M"> Status</span>
						<span class="tag mod-M palette-none"><span class="tag-content">Text</span></span>
					</div>
				</header>
				<div class="resourceCard-content-description">
					Lorem <a href="#" class="link"><span class="link-text">ipsum</span></a> dolor sit amet, consectetur adipiscing elit, sed do.
				</div>
				<div class="resourceCard-content-after">
					<button type="button" class="button palette-none">Lorem ipsum</button>
				</div>
			</div>
		</section>
	</div>${card.repeat(3)}`;
		return {
			template: `
<div class="resourceCardWrapper">${cards}
</div>
`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
