/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createMountableStoryComponent } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import { BasicButton } from './button-basic.stories';
import { CounterButton } from './button-counter.stories';
import { GroupButton } from './button-group.stories';
import { IconButton } from './button-icon.stories';

describe('button', () => {
	it('renders primary button with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(BasicButton({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).not.toBeNull();
	});

	it('renders counter button with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(CounterButton({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).not.toBeNull();
	});

	it('renders group button with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(GroupButton({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElements = screen.getAllByRole('button');
		expect(buttonElements).not.toBeNull();
	});

	it('renders icon button with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(IconButton({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElements = screen.getAllByRole('button');
		expect(buttonElements).not.toBeNull();
	});
});
