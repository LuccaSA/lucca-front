import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconComponent } from '@lucca-front/ng/icon';

export default {
	title: 'Documentation/Texts/Icons/Sizes',
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
} as Meta;

export const Sizes: StoryObj = {
	render: () => ({
		template: `
		<lu-icon icon="heart" size="XS"></lu-icon>
		<lu-icon icon="heart" size="S"></lu-icon>
		<lu-icon icon="heart" size="M"></lu-icon>
		<lu-icon icon="heart" size="L"></lu-icon>
		<lu-icon icon="heart" size="XL"></lu-icon>
		<lu-icon icon="heart" size="XXL"></lu-icon>
	`,
	}),
};
