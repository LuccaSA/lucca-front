import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { HttpClientModule } from '@angular/common/http';
import { PaletteArgType } from '../../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Feedback/EmptyState/HTML&CSS',
	component: EmptyStateSectionComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args: EmptyStateSectionComponent) => {
		const { title, description, center, palette } = args;
		return {
			template: `<lu-empty-state-section title="${title}" description="${description}" palette="${palette}"${center ? ' center' : ''}>
	<button luButton type="button" palette="primary">Button</button>
	<button luButton="outlined" type="button" palette="primary">Button</button>
</lu-empty-state-section>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
	},
} as Meta;

export const Section: StoryObj<EmptyStateSectionComponent> = {
	args: {
		title: 'Empty state section',
		description: 'Description can be a string or a ng-template',
		center: false,
		palette: 'none',
	},
};
