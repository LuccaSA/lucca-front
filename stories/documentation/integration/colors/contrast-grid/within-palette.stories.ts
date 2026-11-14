import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from './contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/WithinPalette',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const WithinPalette: StoryObj<ContrastGridComponent> = { args: { grid: 'withinPalette' } };
