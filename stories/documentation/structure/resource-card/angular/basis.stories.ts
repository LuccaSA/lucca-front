import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardActionComponent, ResourceCardComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardAngularBasicStory {
	small: boolean;
	drag: boolean;
	action: boolean;
	infos: boolean;
	illustration: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule, NumericBadgeComponent, IconComponent, StatusBadgeComponent, ButtonComponent, LinkComponent, TagComponent, ResourceCardComponent, ResourceCardActionComponent],
		}),
	],
	render: (args: ResourceCardAngularBasicStory) => {
		const smallParam = args.small ? ` size="S"` : ``;
		const dragParam = args.drag ? ` draggable` : ``;
		const disabledParam = args.disabled ? ` disabled` : ``;
		const actionParam = !args.disabled ? ` href="#"` : ``;
		const illustrationTpl = args.illustration
			? `
		<ng-container resourceCardIllustration>
			<div style="background-color: var(--palettes-lavender-100)" class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault"></div>
		</ng-container>`
			: ``;
		const infosTpl = args.infos
			? `
		<ng-container resourceCardInfos>
			<lu-status-badge label="Status" />
			<lu-status-badge label="Status" />
		</ng-container>`
			: ``;
		const actionTpl = args.action
			? `
		<ng-container resourceCardAction>
			<button type="button" luButton class="resourceCard-layout-after-button">
				<lu-icon icon="menuDots" />
			</button>
		</ng-container>`
			: ``;
		return {
			template: `
	<lu-resource-card${smallParam}${dragParam}>
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
	</lu-resource-card>

	<br />

	<lu-resource-card${smallParam}${dragParam}>
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
		<ng-container resourceCardContent>
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
		</ng-container>
	</lu-resource-card>

	<br />

	<lu-resource-card${smallParam}${dragParam}>
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
		<ng-container resourceCardContent>
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
		</ng-container>
	</lu-resource-card>

	<br />

	<lu-resource-card${smallParam}${dragParam} grid style="max-inline-size: 20rem">
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
	</lu-resource-card>

	<br />

	<lu-resource-card${smallParam}${dragParam} grid style="max-inline-size: 20rem">
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
		<ng-container resourceCardContent>
			Consectetur adipiscing elit.
		</ng-container>
	</lu-resource-card>

	<br />

	<lu-resource-card${smallParam}${dragParam} grid style="max-inline-size: 20rem">
		<a${actionParam}${disabledParam} luResourceCardAction>Lorem ipsum dolor</a>${illustrationTpl}${infosTpl}${actionTpl}
		<ng-container resourceCardContent>
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
		</ng-container>
	</lu-resource-card>
	`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		small: false,
		drag: false,
		action: false,
		infos: false,
		illustration: false,
		disabled: false,
	},
};
