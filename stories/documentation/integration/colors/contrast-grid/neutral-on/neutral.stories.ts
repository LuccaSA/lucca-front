import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from '../contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/NeutralOn/Neutral',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const Neutral: StoryObj<ContrastGridComponent> = { args: { grid: 'neutralOnNeutral' } };
