import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LinkComponent } from 'dist/ng/link';
import { BreadcrumbsLinkDirective } from 'packages/ng/breadcrumbs/breadcrumbs-link.directive';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/PageHeader/Angular/Basic',
	argTypes: {
		label: {
			description: 'PortalContent',
		},
		description: {
			description: 'PortalContent',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				PageHeaderComponent,
				LinkComponent,
				ButtonComponent,
				IconComponent,
				LuTooltipModule,
				FormFieldComponent,
				TextInputComponent,
				FormsModule,
				HorizontalNavigationComponent,
				HorizontalNavigationLinkDirective,
				BreadcrumbsComponent,
				BreadcrumbsLinkDirective,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args, { argTypes }) => {
		const { breadcrumbs, actions, navigation, backAction, titleActions, ...otherArgs } = args;
		const titleActionsContainer = titleActions
			? `<ng-container pageHeaderTitleActions>
	<button type="button" luButton="text" luTooltip="Modifier" luTooltipOnlyForDisplay><lu-icon icon="officePen" alt="Modifier" /></button>
	<button type="button" luButton="text" luTooltip="Copier" luTooltipOnlyForDisplay><lu-icon icon="fileCopy" alt="Copier" /></button>
	<button type="button" luButton="text" luTooltip="Supprimer" luTooltipOnlyForDisplay><lu-icon icon="trashDelete" alt="Supprimer" /></button>
</ng-container>`
			: ``;
		const backActionContainer = backAction
			? `<ng-container pageHeaderBackAction>
		<a href="#" luButton="text">
			<lu-icon icon="arrowLeft" alt="Retour" />
		</a>
</ng-container>`
			: ``;
		const navigationContainer = navigation
			? `<ng-container pageHeaderNavigation>
	<lu-horizontal-navigation >
		<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#" aria-current="page">Page</a>
		<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#">Page</a>
		<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#">Page</a>
	</lu-horizontal-navigation>
</ng-container>`
			: ``;
		const actionsContainer = actions
			? `<ng-container pageHeaderActions>
		<lu-form-field
			label="Label"
			hiddenLabel
		>
			<lu-text-input
				hasSearchIcon
				type="text"
				placeholder="ex : Mon précieux"
				[(ngModel)]="example"
			></lu-text-input>
		</lu-form-field>
		<button type="button" luButton>Button</button>
		<button type="button" luButton="outline">Button</button>
		<button type="button" luButton="text"><lu-icon icon="menuDots" alt="Voir plus d’options" /></button>
	</ng-container>`
			: ``;
		const breadcrumbsContainer = breadcrumbs
			? `<ng-container pageHeaderBreadcrumbs>
		<lu-breadcrumbs>
			<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" routerLink="/" ariaCurrentWhenActive="page">Page 0</a>
			<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" ariaCurrentWhenActive="page" href="#2">Page 1</a>
			<a *luBreadcrumbsLink class="breadcrumbs-list-item-action" aria-current="page">Page 2</a>
		</lu-breadcrumbs>
	</ng-container>`
			: ``;

		return {
			template: `
<lu-page-header ${generateInputs(otherArgs, argTypes)}>
	${breadcrumbsContainer}
	${backActionContainer}
	${titleActionsContainer}
	${actionsContainer}
	${navigationContainer}
</lu-page-header>
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		label: 'H1. Page title',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum.',
		breadcrumbs: false,
		actions: false,
		titleActions: false,
		navigation: false,
		backAction: false,
	},
};
