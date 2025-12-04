import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardActionComponent, ResourceCardAfterActionComponent, ResourceCardComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardAngularBasicStory {
	wrapper: boolean;
	wrapperDraggable: boolean;
	wrapperGrid: boolean;
	draggable: boolean;
	disabled: boolean;
	heading: string;
	headingAction: string;
	description: boolean;
	descriptionContent: string;
	headingLevel: number;
	headingStyle: number;
	headingNumericBadge: boolean;
	before: boolean;
	beforeContent: string;
	beforeContentDisabled: string;
	headingInfos: boolean;
	headingInfosContent: string;
	after: boolean;
	afterContent: string;
	afterContentDisabled: string;
	descriptionContentDisabled: string;
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Basic',
	argTypes: {
		wrapperDraggable: {
			if: { arg: 'wrapper', truthy: true },
		},
		wrapperGrid: {
			if: { arg: 'wrapper', truthy: true },
		},
		draggable: {
			if: { arg: 'wrapper', truthy: false },
		},
		headingInfosContent: {
			if: { arg: 'headingInfos', truthy: true },
		},
		beforeContent: {
			if: { arg: 'before', truthy: true },
		},
		descriptionContent: {
			if: { arg: 'description', truthy: true },
		},
		descriptionContentDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		afterContent: {
			if: { arg: 'after', truthy: true },
		},
		afterContentDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		beforeContentDisabled: {
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
			imports: [
				LuTooltipModule,
				NumericBadgeComponent,
				IconComponent,
				StatusBadgeComponent,
				ButtonComponent,
				LinkComponent,
				TagComponent,
				ResourceCardComponent,
				ResourceCardWrapperComponent,
				ResourceCardActionComponent,
				ResourceCardAfterActionComponent,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args: ResourceCardAngularBasicStory) => {
		const draggableWrapperAttr = args.wrapperDraggable ? ` draggable` : ``;
		const draggableAttr = args.draggable ? ` draggable` : ``;
		const disabledAttr = args.disabled ? ` disabled` : ``;
		const gridAttr = args.wrapperGrid ? ` grid` : ``;
		const actionTpl = args.headingAction === 'a' ? `<a href="#" luResourceCardAction>${args.heading}</a>` : `<button type="button" luResourceCardAction>${args.heading}</button>`;
		const headingLevelAttr = args.headingLevel !== 3 ? ` headingLevel="${args.headingLevel}"` : ``;
		const headingStyleAttr = args.headingStyle !== 3 ? ` headingStyle="${args.headingStyle}"` : ``;
		const numericBadgeTpl = args.headingNumericBadge ? `<lu-numeric-badge value="88" />` : ``;
		const headingInfosTpl = args.headingInfos
			? `
			<ng-container resourceCardInfos>
				${args.headingInfosContent}
			</ng-container>`
			: ``;
		const descriptionTpl = args.description
			? args.disabled
				? `
			<ng-container resourceCardDescription>
				${args.descriptionContentDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardDescription>
				${args.descriptionContent}
			</ng-container>`
			: ``;
		const beforeTpl = args.before
			? args.disabled
				? `<ng-container resourceCardBefore>
				${args.beforeContentDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardBefore>
				${args.beforeContent}
			</ng-container>`
			: ``;
		const afterTpl = args.after
			? args.disabled
				? `
			<ng-container resourceCardAfter>
				${args.afterContentDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardAfter>
				${args.afterContent}
			</ng-container>`
			: ``;
		const card = `
		<lu-resource-card>
			<a href="#" luResourceCardAction>Sit amet</a>
			<ng-container resourceCardDescription>
				Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
			</ng-container>
		</lu-resource-card>`;
		const cards = `
		<lu-resource-card${disabledAttr}${draggableAttr}${headingLevelAttr}${headingStyleAttr}>
			${actionTpl}${numericBadgeTpl}${headingInfosTpl}${beforeTpl}${afterTpl}${descriptionTpl}
		</lu-resource-card>${card.repeat(args.wrapper ? 3 : 0)}`;
		if (args.wrapper) {
			return {
				template: `
	<lu-resource-card-wrapper${gridAttr}${draggableWrapperAttr}>${cards}
	</lu-resource-card-wrapper>

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
		wrapperDraggable: false,
		wrapperGrid: false,
		draggable: false,
		disabled: false,
		heading: 'Lorem ipsum dolor',
		headingLevel: 3,
		headingStyle: 3,
		headingAction: 'a',
		headingNumericBadge: false,
		headingInfos: false,
		headingInfosContent: `<lu-status-badge label="Status" />
				<lu-status-badge label="Status" />`,
		description: false,
		descriptionContent: `Lorem <a href="#" luLink>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		descriptionContentDisabled: `Lorem <a href="#" luLink disabled>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		before: false,
		beforeContent: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
					 style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
				>
					<lu-icon icon="heart" />
				</div>`,
		beforeContentDisabled: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
					 style="background-color: var(--palettes-neutral-50); color: var(--palettes-neutral-500)"
				>
					<lu-icon icon="heart" />
				</div>`,
		after: false,
		afterContent: `<button type="button" luResourceCardAfterAction>Lorem ipsum</button>`,
		afterContentDisabled: `<button type="button" luResourceCardAfterAction>Lorem ipsum</button>`,
	},
};
