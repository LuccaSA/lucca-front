import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from './contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/NeutralVsPalette',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const NeutralVsPalette: StoryObj<ContrastGridComponent> = { args: { grid: 'neutralVsPalette' } };
