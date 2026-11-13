import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from './contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/WithinNeutral',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const WithinNeutral: StoryObj<ContrastGridComponent> = { args: { grid: 'withinNeutral' } };
