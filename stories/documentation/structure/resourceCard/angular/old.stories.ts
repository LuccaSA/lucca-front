import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ChildComponent, ParentComponent, ResourceCardComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

interface ResourceCardAngularBasicStory {}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Old',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [
				ResourceCardComponent,
				LuTooltipModule,
				NumericBadgeComponent,
				IconComponent,
				StatusBadgeComponent,
				ButtonComponent,
				LinkComponent,
				ResourceCardWrapperComponent,
				ParentComponent,
				ChildComponent,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args: ResourceCardAngularBasicStory) => {
		return {
			template: `
	<lu-resource-card-wrapper grid>

		<div #card1>
			<lu-resource-card>
				<a href="#" luLink luTooltip luTooltipWhenEllipsis [luTooltipAnchor]="card1">
					Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
				</a>
				<lu-numeric-badge value="7" />

				<ng-container resourceCardIllustration>
					<div
						class="pr-u-displayGrid pr-u-placeItemsCenter pr-u-borderRadiusDefault"
						style="background-color: var(--palettes-lavender-100); color: var(--palettes-lavender-700)"
					>
						<lu-icon icon="heart" size="L" />
					</div>
				</ng-container>
				<ng-container resourceCardInfos>
					<lu-status-badge label="Status" />
				</ng-container>
				<ng-container resourceCardActions>
					<button type="button" luButton>button</button>
				</ng-container>
				<ng-container resourceCardDescription>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</ng-container>
			</lu-resource-card>
		</div>

		<div #card2>
			<lu-resource-card draggable>
				<button type="button" luLink luTooltip luTooltipWhenEllipsis [luTooltipAnchor]="card2">
					Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
				</button>
			</lu-resource-card>
		</div>

		<div #card3>
			<lu-resource-card headingLevel="4" headingStyle="4">
				<a href="#" luLink luTooltip luTooltipWhenEllipsis [luTooltipAnchor]="card3">
					Lorem ipsum
				</a>

				<ng-container resourceCardInfos>
					<lu-status-badge label="Status" />
					<lu-status-badge label="Status" />
				</ng-container>
				<ng-container resourceCardActions>
					<button type="button" luButton>
						<lu-icon icon="menuDots" alt="More" />
					</button>
				</ng-container>
				<ng-container resourceCardDescription>
					Lorem ipsum dolor sit amet, consectetur <a luLink href="#">adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</ng-container>
			</lu-resource-card>
		</div>

		<div #card4>
			<lu-resource-card draggable headingLevel="4" headingStyle="4" disabled>
				<a luLink luTooltip luTooltipWhenEllipsis [luTooltipAnchor]="card4" disabled href="#">
					Lorem ipsum
				</a>

				<ng-container resourceCardInfos>
					<lu-status-badge label="Status" />
					<lu-status-badge label="Status" />
				</ng-container>
				<ng-container resourceCardActions>
					<button type="button" luButton disabled>
						<lu-icon icon="menuDots" alt="More" />
					</button>
				</ng-container>
				<ng-container resourceCardDescription>
					Lorem ipsum dolor sit amet, consectetur <a luLink disabled href="#">adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</ng-container>
			</lu-resource-card>
		</div>

	</lu-resource-card-wrapper>

	<!--
	<div style="margin: 2rem" #anchor>
		<parentComponent style="padding: 1rem; border: 1px solid">
			lorem ipsum dolor
			<childComponent luTooltip luTooltipWhenEllipsis [luTooltipAnchor]="anchor" class="pr-u-displayInlineBlock pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" style="width: 8rem; background-color: yellow; vertical-align: bottom">
				<em>trigger</em> trigger <strong>trigger</strong>
			</childComponent>
		</parentComponent>
	</div>
	-->
	`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
