import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardHTMLBasicStory {
	actions: boolean;
	actionsContent: string;
	actionsContentDisabled: string;
	heading: string;
	headingLevel: number;
	headingStyle: number;
	headingNumericBadge: boolean;
	headingAction: string;
	headingInfos: boolean;
	headingInfosContent: string;
	wrapper: boolean;
	wrapperGrid: boolean;
	disabled: boolean;
	description: boolean;
	descriptionContent: string;
	descriptionContentDisabled: string;
	illustration: boolean;
	illustrationContent: string;
	illustrationContentDisabled: string;
	draggable: boolean;
}

export default {
	title: 'Documentation/Structure/Resource Card/HTML&CSS/Basic',
	argTypes: {
		wrapperGrid: {
			if: { arg: 'wrapper', truthy: true },
		},
		headingInfosContent: {
			if: { arg: 'headingInfos', truthy: true },
		},
		illustrationContent: {
			if: { arg: 'illustration', truthy: true },
		},
		descriptionContent: {
			if: { arg: 'description', truthy: true },
		},
		descriptionContentDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		actionsContent: {
			if: { arg: 'actions', truthy: true },
		},
		actionsContentDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		illustrationContentDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		headingAction: {
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
		headingStyle: {
			control: {
				type: 'range',
				min: 3,
				max: 4,
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
				<div class="resourceCard-content">
					<header class="resourceCard-content-header">
						<h3 class="pr-u-h3 resourceCard-content-header-title">
							<a href="#" class="link"><span class="link-text">Sit amet</span></a>
						</h3>
					</header>
					<div class="resourceCard-content-description">
						Consectetur adipiscing elit. Consectetur adipiscing elit.
						Consectetur adipiscing elit. Consectetur adipiscing elit.
						Consectetur adipiscing elit. Consectetur adipiscing elit.
					</div>
				</div>
			</section>
		</div>`;
		const actionTpl = args.actions
			? `
					<div class="resourceCard-content-after">
						${args.disabled ? args.actionsContentDisabled : args.actionsContent}
					</div>`
			: ``;
		const wrapperGridClass = args.wrapperGrid ? ` mod-grid` : ``;
		const disableClass = args.disabled ? ` is-disabled` : ``;
		const disableRole = args.disabled ? ` role="presentation"` : ``;
		const illustrationTpl = args.illustration
			? `
							<div class="resourceCard-content-before-content-illustration">
								${args.disabled ? args.illustrationContentDisabled : args.illustrationContent}
							</div>`
			: ``;
		const headingNumericBadgeTpl = args.headingNumericBadge
			? `
							<span class="numericBadge">88</span>`
			: ``;
		const headingTpl =
			args.headingAction === 'a'
				? `<a href="#" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="link${disableClass}"${disableRole}><span class="link-text">${args.heading}</span></a>`
				: `<button type="button" luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis [luTooltipAnchor]="resourceCard1" class="link${disableClass}"${disableRole}><span class="link-text">${args.heading}</span></button>`;
		const draggableTpl = args.draggable
			? `
							<div class="button cdk-drag-handle resourceCard-content-before-content-handleButton">
								<span aria-hidden="true" class="lucca-icon icon-dotsDrag icon-color-inherit"></span>
							</div>`
			: ``;
		const descriptionContentTpl = args.description
			? `
					<div class="resourceCard-content-description">
						${args.disabled ? args.descriptionContentDisabled : args.descriptionContent}
					</div>`
			: ``;
		const infosTpl = args.headingInfos
			? `
						<div class="resourceCard-content-header-infos">
							${args.headingInfosContent}
						</div>`
			: ``;
		const beforeContent =
			args.illustration || args.draggable
				? `
					<div class="resourceCard-content-before">
						<div class="resourceCard-content-before-content">${draggableTpl}${illustrationTpl}
						</div>
					</div>`
				: ``;
		const cards = `
		<div class="resourceCardContainer">
			<section class="resourceCard" #resourceCard1>
				<div class="resourceCard-content">${beforeContent}
					<header class="resourceCard-content-header">
						<h${args.headingLevel} class="pr-u-h${args.headingStyle} resourceCard-content-header-title">
							${headingTpl}${headingNumericBadgeTpl}
						</h${args.headingLevel}>${infosTpl}
					</header>${descriptionContentTpl}${actionTpl}
				</div>
			</section>
		</div>${card.repeat(args.wrapper ? 3 : 0)}`;
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
		heading: 'Lorem ipsum dolor',
		headingLevel: 3,
		headingStyle: 3,
		headingAction: 'a',
		headingNumericBadge: false,
		headingInfos: false,
		headingInfosContent: `<span class="statusBadge mod-M">Status</span>
							<span class="tag mod-M palette-none">Text</span>`,
		description: false,
		descriptionContent: `Lorem <a href="#" class="link"><span class="link-text">ipsum</span></a> dolor sit amet, consectetur adipiscing elit, sed do.`,
		descriptionContentDisabled: `Lorem <span class="link is-disabled"><span class="link-text">ipsum</span></span> dolor sit amet, consectetur adipiscing elit, sed do.`,
		illustration: false,
		illustrationContent: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700);">
									<span aria-hidden="true" class="lucca-icon icon-heart icon-color-inherit mod-L"></span>
								</div>`,
		illustrationContentDisabled: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault" style="background-color: var(--palettes-neutral-50); color: var(--palettes-neutral-500);">
									<span aria-hidden="true" class="lucca-icon icon-heart icon-color-inherit mod-L"></span>
								</div>`,
		actions: false,
		actionsContent: `<button type="button" class="button">Lorem ipsum</button>`,
		actionsContentDisabled: `<button type="button" class="button" disabled="disabled">Lorem ipsum</button>`,
	},
};
