import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { HttpClientModule } from '@angular/common/http';

export default {
	title: 'Documentation/Feedback/Empty State/Angular',
	component: EmptyStatePageComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStatePageComponent, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args: EmptyStatePageComponent) => {
		const { title, description } = args;
		return {
			styles: [
				`
			:host{
				display: block;
				height: 100vh;
			}
			`,
			],
			template: `<lu-empty-state-page title="${title}" description="${description}">
	<button luButton type="button" palette="primary">Button</button>
	<button luButton="outlined" type="button" palette="primary">Button</button>
</lu-empty-state-page>`,
		};
	},
	argTypes: {
		topRightBackground: {
			control: 'text',
		},
		topRightForeground: {
			control: 'text',
		},
		bottomLeftBackground: {
			control: 'text',
		},
		bottomLeftForeground: {
			control: 'text',
		},
	},
} as Meta;

export const Page: StoryObj<EmptyStatePageComponent> = {
	args: {
		title: 'Empty state page',
		description: 'Description can be a string or a ng-template',
		icon: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/medal-01.svg',
		topRightBackground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg',
		topRightForeground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg',
		bottomLeftBackground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg',
		bottomLeftForeground: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg',
	},
};
