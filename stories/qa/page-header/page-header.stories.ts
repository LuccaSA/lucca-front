import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'page-header-stories',
	templateUrl: './page-header.stories.html',
	imports: [
		PageHeaderComponent,
		BreadcrumbsComponent,
		BreadcrumbsLinkDirective,
		HorizontalNavigationComponent,
		HorizontalNavigationLinkDirective,
		FormFieldComponent,
		TextInputComponent,
		ButtonComponent,
		IconComponent,
		FormsModule,
	],
})
class PageHeaderStory {}

export default {
	title: 'QA/PageHeader',
	component: PageHeaderStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PageHeaderStory> = {
	args: {},
	render: template,
};
