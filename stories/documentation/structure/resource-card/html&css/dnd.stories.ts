import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardHTMLBasicStory {
	action: boolean;
	actionTemplate: string;
	actionTemplateDisabled: string;
	heading: string;
	headingLevel: number;
	actionType: string;
	infos: boolean;
	infosTemplate: string;
	wrapper: boolean;
	wrapperGrid: boolean;
	disabled: boolean;
	content: boolean;
	contentTemplate: string;
	contentTemplateDisabled: string;
	illustration: boolean;
	illustrationTemplate: string;
	illustrationTemplateDisabled: string;
	draggable: boolean;
	size: string;
}

export default {
	title: 'Documentation/Structure/Resource Card/HTML&CSS/Drag and drop',
	argTypes: {
		wrapperGrid: {
			if: { arg: 'wrapper', truthy: true },
		},
		infosTemplate: {
			if: { arg: 'infos', truthy: true },
		},
		illustrationTemplate: {
			if: { arg: 'illustration', truthy: true },
		},
		contentTemplate: {
			if: { arg: 'content', truthy: true },
		},
		contentTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		actionTemplate: {
			if: { arg: 'action', truthy: true },
		},
		actionTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		illustrationeTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
		},
		actionType: {
			options: ['a', 'button'],
			control: {
				type: 'select',
			},
		},
		headingLevel: {
			control: {
				type: 'range',
				min: 1,
				max: 6,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	render: (args: ResourceCardHTMLBasicStory) => {
		const card = `
		<div class="resourceCardContainer">
			<section class="resourceCard">
				<div class="resourceCard-layout">
					<header class="resourceCard-layout-header">
						<h3 class="pr-u-h3 resourceCard-layout-header-title">
							<a href="#" class="resourceCard-layout-header-title-action">Sit amet</a>
						</h3>
					</header>
					<div class="resourceCard-layout-content">
						Consectetur adipiscing elit. Consectetur adipiscing elit.
						Consectetur adipiscing elit. Consectetur adipiscing elit.
						Consectetur adipiscing elit. Consectetur adipiscing elit.
					</div>
				</div>
			</section>
		</div>`;
		const actionTpl = args.action
			? `
				<div class="resourceCard-layout-after">
					${args.disabled ? args.actionTemplateDisabled : args.actionTemplate}
				</div>`
			: ``;
		const wrapperGridClass = args.wrapperGrid ? ` mod-grid` : ``;
		const beforeTpl = args.illustration
			? `
					<div class="resourceCard-layout-before-illustration">
						${args.disabled ? args.illustrationTemplateDisabled : args.illustrationTemplate}
					</div>`
			: ``;
		const headingTpl =
			args.actionType === 'a'
				? args.disabled
					? `<a luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action is-disabled">${args.heading}</a>`
					: `<a href="#" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action">${args.heading}</a>`
				: args.disabled
					? `<button luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action" disabled="disabled">${args.heading}</button>`
					: `<button type="button" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="resourceCard-layout-header-title-action">${args.heading}</button>`;
		const draggableTpl = args.draggable
			? `
					<div class="button resourceCard-layout-before-button">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</div>`
			: ``;
		const descriptionContentTpl = args.content
			? `
				<div class="resourceCard-layout-content">
					${args.disabled ? args.contentTemplateDisabled : args.contentTemplate}
				</div>`
			: ``;
		const infosTpl = args.infos
			? `
					<div class="resourceCard-layout-header-infos">
						${args.infosTemplate}
					</div>`
			: ``;
		const beforeContent =
			args.illustration || args.draggable
				? `
				<div class="resourceCard-layout-before">${draggableTpl}${beforeTpl}
				</div>`
				: ``;
		const sizeAttr = args.size ? ` mod-S` : ``;
		const cards = `
		<section class="resourceCard${sizeAttr}" #resourceCard1>
			<div class="resourceCard-layout">${beforeContent}
				<header class="resourceCard-layout-header">
					<h${args.headingLevel} class="resourceCard-layout-header-title">
						${headingTpl}
					</h${args.headingLevel}>${infosTpl}
				</header>${descriptionContentTpl}${actionTpl}
			</div>
		</section>${card.repeat(args.wrapper ? 3 : 0)}`;
		if (args.wrapper) {
			return {
				template: `
	<div class="resourceCardWrapper${wrapperGridClass}">${cards}
	</div>
	`,
			};
		} else {
			return {
				template: `${cards}`,
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		wrapper: false,
		wrapperGrid: false,
		draggable: false,
		disabled: false,
		size: '',
		heading: 'Lorem ipsum dolor ',
		headingLevel: 3,
		actionType: 'a',
		infos: false,
		infosTemplate: `<span class="statusBadge">Status badge</span>
						<span class="tag">Tag</span>`,
		content: false,
		contentTemplate: `Lorem <a href="#" class="link">ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do.`,
		contentTemplateDisabled: `Lorem <span class="link is-disabled">ipsum</span> dolor sit amet, consectetur adipiscing elit, sed do.`,
		illustration: false,
		illustrationTemplate: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100)"></div>`,
		illustrationTemplateDisabled: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-neutral-100)"></div>`,
		action: false,
		actionTemplate: `<button type="button" class="button">Lorem ipsum</button>`,
		actionTemplateDisabled: `<button type="button" class="button" disabled="disabled">Lorem ipsum</button>`,
	},
};
