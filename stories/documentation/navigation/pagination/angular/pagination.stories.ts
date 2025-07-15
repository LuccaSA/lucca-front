import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { PaginationComponent } from '@lucca-front/ng/pagination';

export default {
	title: 'Documentation/Navigation/Pagination/Angular',
	decorators: [
		moduleMetadata({
			imports: [PaginationComponent],
		}),
	],
	argTypes: {
		isFirstPage: { type: 'boolean' },
		isLastPage: { type: 'boolean' },
		from: { type: 'number' },
		to: { type: 'number' },
		itemsCount: { type: 'number' },
		mod: { options: ['default', 'compact'], control: { type: 'select' } },
	},
} as Meta;

export const Basic: StoryObj<PaginationComponent & { isFirstPage: boolean; isLastPage: boolean; from: number; to: number; itemsCount: number; mod: string }> = {
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-pagination ${generateInputs(args, argTypes)} />`),
		};
	},
	args: {
		from: 1,
		to: 20,
		itemsCount: 27,
		isFirstPage: true,
		isLastPage: false,
	},
};
