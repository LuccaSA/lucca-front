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
		const { heading, description, icon, topRightBackground, topRightForeground, bottomLeftBackground, bottomLeftForeground, contentBackgroundColor, hx } = args;
		const paramIcon = args.icon === '' ? '' : 'icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/message/' + args.icon + '.svg"';
		const paramTopRightBackground = args.topRightBackground === '' ? '' : 'topRightBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/' + args.topRightBackground + '.svg"';
		const paramTopRightForeground = args.topRightForeground === '' ? '' : 'topRightForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/' + args.topRightForeground + '.svg"';
		const paramBottomLeftBackground = args.bottomLeftBackground === '' ? '' : 'bottomLeftBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/' + args.bottomLeftBackground + '.svg"';
		const paramBottomLeftForeground = args.bottomLeftForeground === '' ? '' : 'bottomLeftForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/' + args.bottomLeftForeground + '.svg"';
		return {
			styles: [
				`
:host{
	display: flex;
	flex-direction: column;
	min-block-size: 30rem;
}
`,
			],
			template: `<lu-empty-state-page
	heading="${heading}"
	description="${description}"
	${paramIcon}
	${paramTopRightBackground}
	${paramTopRightForeground}
	${paramBottomLeftBackground}
	${paramBottomLeftForeground}
	hx="${hx}"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-page>`,
		};
	},
	argTypes: {
		topRightBackground: {
			options: [
				'poplee/bubbles-top-right-01',
				'poplee/bubbles-top-right-02',
				'poplee/bubbles-top-right-03',
				'cleemy/bubbles-top-right-01',
				'cleemy/bubbles-top-right-02',
				'cleemy/bubbles-top-right-03',
				'lucca/bubbles-top-right-01',
				'lucca/bubbles-top-right-02',
				'lucca/bubbles-top-right-03',
				'pagga/bubbles-top-right-01',
				'pagga/bubbles-top-right-02',
				'pagga/bubbles-top-right-03',
				'timmi/bubbles-top-right-01',
				'timmi/bubbles-top-right-02',
				'timmi/bubbles-top-right-03',
			],
			control: 'select',
		},
		topRightForeground: {
			options: [
				'generic/coffee-01',
				'generic/tea-01',
				'generic/cookie-01',
				'generic/glasses-01',
				'generic/plant-01',
				'generic/plant-02',
				'generic/polaroids-01',
				'generic/post-its-01',
				'generic/success-01',
			],
			control: 'select',
		},
		bottomLeftBackground: {
			options: [
				'poplee/bubbles-bottom-left-01',
				'poplee/bubbles-bottom-left-02',
				'poplee/bubbles-bottom-left-03',
				'cleemy/bubbles-bottom-left-01',
				'cleemy/bubbles-bottom-left-02',
				'cleemy/bubbles-bottom-left-03',
				'lucca/bubbles-bottom-left-01',
				'lucca/bubbles-bottom-left-02',
				'lucca/bubbles-bottom-left-03',
				'pagga/bubbles-bottom-left-01',
				'pagga/bubbles-bottom-left-02',
				'pagga/bubbles-bottom-left-03',
				'timmi/bubbles-bottom-left-01',
				'timmi/bubbles-bottom-left-02',
				'timmi/bubbles-bottom-left-03',
			],
			control: 'select',
		},
		bottomLeftForeground: {
			options: [
				'cleemy/expenses-01',
				'cleemy/expenses-02',
				'cleemy/finance-01',
				'cleemy/payment-01',
				'cleemy/procurement-01',
				'lucca/lucca-01',
				'pagga/compensation-01',
				'pagga/mealvoucher-01',
				'pagga/payroll-01',
				'pagga/payslips-01',
				'pagga/wizard-01',
				'poplee/core-hr-01',
				'poplee/engagement-01',
				'poplee/performance-01',
				'poplee/talent-01',
				'poplee/training-01',
				'success/party-favor-01',
				'timmi/absences-01',
				'timmi/office-01',
				'timmi/projects-01',
				'timmi/time-and-activities-01',
				'timmi/timesheet-01',
			],
			control: 'select',
		},
		icon: {
			options: ['', 'medal-01', 'post-it-01'],
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
		heading: {
			description: '[v18.1] Optional',
		},
		description: {
			description: '[v18.1] Optional',
		},
	},
} as Meta;

export const Page: StoryObj<EmptyStatePageComponent> = {
	args: {
		heading: 'Empty state page',
		description: 'Description can be a string or a ng-template',
		icon: '',
		topRightBackground: 'poplee/bubbles-top-right-01',
		topRightForeground: 'generic/coffee-01',
		bottomLeftBackground: 'poplee/bubbles-bottom-left-01',
		bottomLeftForeground: 'poplee/core-hr-01',
		contentBackgroundColor: 'var(--pr-t-elevation-surface-default)',
		hx: 1,
	},
};
