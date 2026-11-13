import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from '../contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/NeutralOn/Decoratives',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const Decoratives: StoryObj<ContrastGridComponent> = { args: { grid: 'neutralOnGroup', group: 'decoratives' } };
