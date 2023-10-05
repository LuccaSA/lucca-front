import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconComponent } from '@lucca-front/ng/icon';

export default {
	title: 'Documentation/Texts/Icons/Color',
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
} as Meta;

export const Color: StoryObj = {
	render: () => ({
		template: `
		<lu-icon icon="heart" color="primary"></lu-icon>
		<lu-icon icon="heart" color="secondary"></lu-icon>
		<lu-icon icon="heart" color="error"></lu-icon>
		<lu-icon icon="heart" color="warning"></lu-icon>
		<lu-icon icon="heart" color="success"></lu-icon>
		<lu-icon icon="heart" color="light"></lu-icon>
		<lu-icon icon="heart" color="placeholder"></lu-icon>
	`,
	}),
};
