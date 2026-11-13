import { Meta, StoryObj } from '@storybook/angular-vite';
import { ContrastGridComponent } from '../contrast-grid.component';

export default {
	title: 'Documentation/Integration/Colors/ContrastGrid/NeutralOn/Products',
	component: ContrastGridComponent,
	parameters: {
		controls: { disable: true },
	},
} as Meta<ContrastGridComponent>;

export const Products: StoryObj<ContrastGridComponent> = { args: { grid: 'neutralOnGroup', group: 'products' } };
