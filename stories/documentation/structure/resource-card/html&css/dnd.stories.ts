import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ResourceCardHTMLBasicStory {
	action: boolean;
	infos: boolean;
	content: boolean;
	illustration: boolean;
	size: string;
}

export default {
	title: 'Documentation/Structure/Resource Card/HTML&CSS/Drag and drop',
	argTypes: {
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
} as Meta;

function getTemplate(args: ResourceCardHTMLBasicStory) {
	const actionTpl = args.action
		? `
				<div class="resourceCard-layout-after">
					<button type="button" class="button">Lorem ipsum</button>
				</div>`
		: ``;
	const beforeTpl = args.illustration
		? `
					<div class="resourceCard-layout-before-illustration">
						<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100)"></div>
					</div>`
		: ``;
	const descriptionContentTpl = args.content
		? `
				<div class="resourceCard-layout-content">
					Lorem <a href="#" class="link">ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do.
				</div>`
		: ``;
	const infosTpl = args.infos
		? `
					<div class="resourceCard-layout-header-infos">
						<span class="statusBadge">Status badge</span>
						<span class="statusBadge">Status badge</span>
					</div>`
		: ``;
	const sizeAttr = args.size ? ` mod-S` : ``;
	const cards = `
		<section class="resourceCard${sizeAttr}" #resourceCard1>
			<div class="resourceCard-layout">
				<div class="resourceCard-layout-before">
					<div class="button resourceCard-layout-before-button">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</div>${beforeTpl}
				</div>
				<header class="resourceCard-layout-header">
					<h3 class="resourceCard-layout-header-title">
						<a href="#" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action">Lorem ipsum dolor</a>
					</h3>${infosTpl}
				</header>${descriptionContentTpl}${actionTpl}
			</div>
		</section>
		<section class="resourceCard${sizeAttr} cdk-drag-preview" #resourceCard1>
			<div class="resourceCard-layout">
				<div class="resourceCard-layout-before">
					<div class="button resourceCard-layout-before-button">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</div>${beforeTpl}
				</div>
				<header class="resourceCard-layout-header">
					<h3 class="resourceCard-layout-header-title">
						<a href="#" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action">Lorem ipsum dolor</a>
					</h3>${infosTpl}
				</header>${descriptionContentTpl}${actionTpl}
			</div>
		</section>
		<section class="resourceCard${sizeAttr} cdk-drag-placeholder" #resourceCard1>
			<div class="resourceCard-layout">
				<div class="resourceCard-layout-before">
					<div class="button resourceCard-layout-before-button">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</div>${beforeTpl}
				</div>
				<header class="resourceCard-layout-header">
					<h3 class="resourceCard-layout-header-title">
						<a href="#" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action">Lorem ipsum dolor</a>
					</h3>${infosTpl}
				</header>${descriptionContentTpl}${actionTpl}
			</div>
		</section>`;

	return `<div class="resourceCardWrapper">${cards}</div>`;
}

const Template = (args: ResourceCardHTMLBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ResourceCardHTMLBasicStory> = {
	args: {
		size: '',
		infos: false,
		content: false,
		illustration: false,
		action: false,
	},
	render: Template,
};
