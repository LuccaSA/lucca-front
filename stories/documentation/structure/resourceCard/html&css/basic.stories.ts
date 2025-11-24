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
		return {
			template: `
		<div class="resourceCardWrapper">
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="button mod-S mod-ghost mod-onlyIcon cdk-drag-handle resourceCard-content-before-content-handleButton"><span class="lucca-icon icon-dotsDrag" aria-hidden="true"></span></div>
							<div class="resourceCard-content-before-content-illustration">
								<div
									class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
									style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
								>
									<span class="lucca-icon icon-heart mod-L" aria-hidden="true"></span>
								</div>
							</div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
						<span class="statusBadge">status</span>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard" #card>
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="button mod-S mod-ghost mod-onlyIcon cdk-drag-handle resourceCard-content-before-content-handleButton"><span class="lucca-icon icon-dotsDrag" aria-hidden="true"></span></div>
							<div class="resourceCard-content-before-content-illustration">
								<div
									class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
									style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
								>
									<span class="lucca-icon icon-heart mod-L" aria-hidden="true"></span>
								</div>
							</div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title">
							<a href="#"
								luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
								luTooltipOnlyForDisplay [luTooltipAnchor]="card" class="link"
							>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
							</a>
							<span class="numericBadge">88</span>
						</h3>
						<span class="statusBadge">status</span>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="button mod-S mod-ghost mod-onlyIcon cdk-drag-handle resourceCard-content-before-content-handleButton"><span class="lucca-icon icon-dotsDrag" aria-hidden="true"></span></div>
							<div class="resourceCard-content-before-content-illustration">
								<div
									class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
									style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
								>
									<span class="lucca-icon icon-heart mod-L" aria-hidden="true"></span>
								</div>
							</div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title">
							<a href="#" class="link">
								Title
							</a>
							<span class="numericBadge">88</span>
						</h3>

					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="button mod-S mod-ghost mod-onlyIcon cdk-drag-handle resourceCard-content-before-content-handleButton"><span class="lucca-icon icon-dotsDrag" aria-hidden="true"></span></div>
							<div class="resourceCard-content-before-content-illustration">
								<div
									class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
									style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
								>
									<span class="lucca-icon icon-heart mod-L" aria-hidden="true"></span>
								</div>
							</div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="resourceCard-content-before-content-illustration">
								<div
									class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
									style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
								>
									<span class="lucca-icon icon-heart mod-L" aria-hidden="true"></span>
								</div>
							</div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="button mod-S mod-ghost mod-onlyIcon cdk-drag-handle resourceCard-content-before-content-handleButton"><span class="lucca-icon icon-dotsDrag" aria-hidden="true"></span></div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="resourceCard-content-before-content-illustration"></div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after">
						<button class="button" type="button">button</button>
					</div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="resourceCard-content-before-content-illustration"></div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description">
						<p class="pr-u-margin0">Lorem ipsum dolor</p>
					</div>
					<div class="resourceCard-content-after"></div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="resourceCard-content-before-content-illustration"></div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h3 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h3>
					</header>
					<div class="resourceCard-content-description"></div>
					<div class="resourceCard-content-after"></div>
				</div>
			</section>
			<section class="resourceCard">
				<div class="resourceCard-content">
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">
							<div class="resourceCard-content-before-content-illustration"></div>
						</div>
					</div>
					<header class="resourceCard-content-header">
						<h4 class="resourceCard-content-header-title"><a href="#" class="link">Title</a></h4>
					</header>
					<div class="resourceCard-content-description"></div>
					<div class="resourceCard-content-after"></div>
				</div>
			</section>
		</div>
`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
