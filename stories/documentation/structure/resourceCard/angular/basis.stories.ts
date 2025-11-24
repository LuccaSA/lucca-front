import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
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
	description: string;
	headingLevel: number;
	headingStyle: number;
	headingNumericBadge: boolean;
	illustration: boolean;
	illustrationContent: string;
	illustrationContentDisabled: string;
	headingInfos: boolean;
	headingInfosContent: string;
	actions: boolean;
	actionsContent: string;
	actionsContentDisabled: string;
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
		illustrationContent: {
			if: { arg: 'illustration', truthy: true },
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
			imports: [ResourceCardComponent, LuTooltipModule, NumericBadgeComponent, IconComponent, StatusBadgeComponent, ButtonComponent, LinkComponent, ResourceCardWrapperComponent],
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
		const actionTpl = args.headingAction === 'a' ? `<a href="#" luLink${disabledAttr}>${args.heading}</a>` : `<button type="button" luLink${disabledAttr}>${args.heading}</button>`;
		const headingLevelAttr = args.headingLevel !== 3 ? ` headingLevel="${args.headingLevel}"` : ``;
		const headingStyleAttr = args.headingStyle !== 3 ? ` headingStyle="${args.headingStyle}"` : ``;
		const numericBadgeTpl = args.headingNumericBadge ? `<lu-numeric-badge value="88" />` : ``;
		const headingInfosTpl = args.headingInfos
			? `
			<ng-container resourceCardInfos>
				${args.headingInfosContent}
			</ng-container>`
			: ``;
		const descriptionTpl =
			args.description !== ''
				? `
			<ng-container resourceCardDescription>
				${args.description}
			</ng-container>`
				: ``;
		const illustrationTpl = args.illustration
			? args.disabled
				? `<ng-container resourceCardIllustration>
				${args.illustrationContentDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardIllustration>
				${args.illustrationContent}
			</ng-container>`
			: ``;
		const actionsTpl = args.actions
			? args.disabled
				? `
			<ng-container resourceCardActions>
				${args.actionsContentDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardActions>
				${args.actionsContent}
			</ng-container>`
			: ``;
		const card = `
		<lu-resource-card>
			<a href="#" luLink>Sit amet</a>
			<ng-container resourceCardDescription>
				Consectetur adipiscing elit.
			</ng-container>
		</lu-resource-card>`;
		const cards = `
		<lu-resource-card${draggableAttr}${headingLevelAttr}${headingStyleAttr}>
			${actionTpl}${numericBadgeTpl}${headingInfosTpl}${illustrationTpl}${actionsTpl}${descriptionTpl}
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
		headingNumericBadge: false,
		headingAction: 'a',
		headingInfos: false,
		headingInfosContent: `<lu-status-badge label="Status" />`,
		description: '',
		illustration: false,
		illustrationContent: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
					 style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
				>
					<lu-icon icon="heart" size="L" />
				</div>`,
		illustrationContentDisabled: `<div class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
					 style="background-color: var(--palettes-neutral-50); color: var(--palettes-neutral-500)"
				>
					<lu-icon icon="heart" size="L" />
				</div>`,
		actions: false,
		actionsContent: `<button type="button" luButton>Lorem ipsum</button>`,
		actionsContentDisabled: `<button type="button" luButton disabled>Lorem ipsum</button>`,
	},
};
