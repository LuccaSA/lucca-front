import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Page',
	component: EmptyStatePageComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStatePageComponent, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args: EmptyStatePageComponent) => {
		const { title, description, icon, topRightBackground, topRightForeground, bottomLeftBackground, bottomLeftForeground, contentBackgroundColor, hx } = args;
		const paramIcon = args.icon === '' ? '' : 'icon="' + args.icon + '"';

		return {
			styles: [
				`
:host{
	display: flex;
	flex-direction: column;
	min-height: 30rem;
}
`,
			],
			template: `<lu-empty-state-page
	title="${title}"
	description="${description}"
	${paramIcon}
	topRightBackground="${topRightBackground}"
	topRightForeground="${topRightForeground}"
	bottomLeftBackground="${bottomLeftBackground}"
	bottomLeftForeground="${bottomLeftForeground}"
	contentBackgroundColor="${contentBackgroundColor}"
	hx="${hx}"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button" palette="product">Button</button>
</lu-empty-state-page>`,
		};
	},
	argTypes: {
		topRightBackground: {
			options: [
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-top-right-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-top-right-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-top-right-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-top-right-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-top-right-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-top-right-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-top-right-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-top-right-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-top-right-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-top-right-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-top-right-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-top-right-03.svg',
			],
			control: 'select',
		},
		topRightForeground: {
			options: [
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/tea-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/cookie-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/glasses-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/plant-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/plant-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/polaroids-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/post-its-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/success-01.svg',
			],
			control: 'select',
		},
		bottomLeftBackground: {
			options: [
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-bottom-left-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-bottom-left-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/bubbles-bottom-left-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-bottom-left-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-bottom-left-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/bubbles-bottom-left-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-bottom-left-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-bottom-left-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/bubbles-bottom-left-03.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-bottom-left-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-bottom-left-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/bubbles-bottom-left-03.svg',
			],
			control: 'select',
		},
		bottomLeftForeground: {
			options: [
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/expenses-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/expenses-02.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/finance-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/payment-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/cleemy/procurement-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/lucca/lucca-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/compensation-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/mealvoucher-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/payroll-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/payslips-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/pagga/wizard-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/engagement-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/performance-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/talent-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/training-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/success/party-favor-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/absences-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/office-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/projects-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/time-and-activities-01.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/timmi/timesheet-01.svg',
			],
			control: 'select',
		},
		icon: {
			options: ['', 'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/medal-01.svg', 'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/post-it-01.svg'],
			control: {
				type: 'select',
			},
		},
		contentBackgroundColor: {
			control: {
				type: 'text',
			},
		},
		hx: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: '[v18.1]',
		},
		title: {
			description: '[v18.1] Optional',
		},
		description: {
			description: '[v18.1] Optional',
		},
	},
} as Meta;

export const Page: StoryObj<EmptyStatePageComponent> = {
	args: {
		title: 'Empty state page',
		description: 'Description can be a string or a ng-template',
		icon: '',
		topRightBackground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg',
		topRightForeground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg',
		bottomLeftBackground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg',
		bottomLeftForeground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg',
		contentBackgroundColor: 'var(--pr-t-elevation-surface-default)',
		hx: 1,
	},
};
