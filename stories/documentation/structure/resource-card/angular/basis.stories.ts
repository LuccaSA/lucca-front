import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardAngularBasicStory {
	wrapper: boolean;
	wrapperGrid: boolean;
	wrapperDraggable: boolean;
	wrapperSize: string;
	draggable: boolean;
	disabled: boolean;
	heading: string;
	actionType: string;
	content: boolean;
	contentTemplate: string;
	headingLevel: number;
	illustration: boolean;
	illustrationTemplate: string;
	illustrationTemplateDisabled: string;
	infos: boolean;
	infosTemplate: string;
	action: boolean;
	actionTemplate: string;
	actionTemplateDisabled: string;
	contentTemplateDisabled: string;
	size: string;
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
		illustrationTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
		},
		actionType: {
			options: ['a', 'button'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: false },
		},
		wrapperSize: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: true },
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
			imports: [
				LuTooltipModule,
				IconComponent,
				StatusBadgeComponent,
				ButtonComponent,
				LinkComponent,
				TagComponent,
				ResourceCardComponent,
				ResourceCardButtonComponent,
				ResourceCardLinkComponent,
				ResourceCardWrapperComponent,
				LuTooltipTriggerDirective,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args: ResourceCardAngularBasicStory) => {
		const sizeWrapperAttr = args.wrapperSize === 'S' ? ` size="S"` : ``;
		const draggableWrapperAttr = args.wrapperDraggable ? ` draggable` : ``;
		const draggableAttr = args.draggable ? ` draggable` : ``;
		const gridAttr = args.wrapperGrid ? ` grid` : ``;
		const disabledAttr = args.disabled ? ` disabled` : ``;
		const actionTpl =
			args.actionType === 'a'
				? `<a href="#" luResourceCardAction luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis${disabledAttr}>${args.heading}</a>`
				: `<button type="button" luResourceCardAction luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis${disabledAttr}>${args.heading}</button>`;
		const headingLevelAttr = args.headingLevel !== 3 ? ` headingLevel="${args.headingLevel}"` : ``;
		const headingInfosTpl = args.infos
			? `
			<ng-container resourceCardInfos>
				${args.infosTemplate}
			</ng-container>`
			: ``;
		const descriptionTpl = args.content
			? args.disabled
				? `
			<ng-container resourceCardContent>
				${args.contentTemplateDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardContent>
				${args.contentTemplate}
			</ng-container>`
			: ``;
		const beforeTpl = args.illustration
			? args.disabled
				? `<ng-container resourceCardIllustration>
				${args.illustrationTemplateDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardIllustration>
				${args.illustrationTemplate}
			</ng-container>`
			: ``;
		const afterTpl = args.action
			? args.disabled
				? `
			<ng-container resourceCardAction>
				${args.actionTemplateDisabled}
			</ng-container>`
				: `
			<ng-container resourceCardAction>
				${args.actionTemplate}
			</ng-container>`
			: ``;
		const card = `
		<lu-resource-card>
			<a href="#" luResourceCardAction>Sit amet</a>
			<ng-container resourceCardContent>
				Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
			</ng-container>
		</lu-resource-card>`;
		const sizeAttr = args.size ? ` size="S"` : ``;
		const cards = `
		<lu-resource-card${draggableAttr}${headingLevelAttr}${sizeAttr}>
			${actionTpl}${headingInfosTpl}${beforeTpl}${afterTpl}${descriptionTpl}
		</lu-resource-card>${card.repeat(args.wrapper ? 3 : 0)}`;
		if (args.wrapper) {
			return {
				template: `
	<lu-resource-card-wrapper${sizeWrapperAttr}${gridAttr}${draggableWrapperAttr}>${cards}
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
		wrapperSize: '',
		draggable: false,
		disabled: false,
		heading: 'Lorem ipsum dolor ',
		headingLevel: 3,
		size: '',
		actionType: 'a',
		infos: false,
		infosTemplate: `<lu-status-badge label="Status" />
				<lu-status-badge label="Status" />`,
		content: false,
		contentTemplate: `Lorem <a href="#" luLink>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		contentTemplateDisabled: `Lorem <a href="#" luLink disabled>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		illustration: false,
		illustrationTemplate: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100)"></div>`,
		illustrationTemplateDisabled: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-neutral-100)"></div>`,
		action: false,
		actionTemplate: `<button type="button" luButton>Lorem ipsum</button>`,
		actionTemplateDisabled: `<button type="button" luButton disabled>Lorem ipsum</button>`,
	},
};
