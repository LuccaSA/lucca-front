import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ResourceCardComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardAngularBasicStory {}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule, NumericBadgeComponent, IconComponent, StatusBadgeComponent, ButtonComponent, LinkComponent, TagComponent, ResourceCardComponent],
		}),
	],
	render: (args: ResourceCardAngularBasicStory) => {
		return {
			template: `
	<lu-resource-card>
		<ng-container resourceCardIllustration>
			<div style="background-color: var(--palettes-lavender-100)" class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault"></div>
		</ng-container>
		<a href="#" class="resourceCard-layout-header-title-link">test</a>
		<lu-numeric-badge value="88" />

		<ng-container resourceCardInfos>
			<lu-status-badge label="Status" />
			<lu-status-badge label="Status" />
		</ng-container>
		<ng-container resourceCardAction>
			<button type="button" luButton class="resourceCard-layout-after-button">
				<lu-icon icon="menuDots" />
			</button>
		</ng-container>
		<ng-container resourceCardContent>
			Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
		</ng-container>
	</lu-resource-card>
	`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
