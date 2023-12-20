import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { HttpClientModule } from '@angular/common/http';

export default {
	title: 'Documentation/Feedback/EmptyState/Page',
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
	argTypes: {},
} as Meta;

export const Template: StoryObj<EmptyStatePageComponent> = {
	args: {
		title: 'Empty state page',
		description: 'Description can be a string or a ng-template',
	},
};
