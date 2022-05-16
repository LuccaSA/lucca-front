/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createMountableStoryComponent } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import { Basic } from './button-basic.stories';

describe('button', () => {
	it('renders primary button with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(Basic({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).not.toBeNull();
	});
});
