import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from './contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/ColorOnColor',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const ColorOnColor: StoryObj<ContrastGridComponent> = { args: { grid: 'colorOnColor' } };
