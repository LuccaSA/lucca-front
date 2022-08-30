/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createMountableStoryComponent } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import { BasicLink } from './link-basic.stories';

describe('links', () => {
	it('renders basic action icon with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(BasicLink({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElement = screen.getByRole('link');
		expect(buttonElement).not.toBeNull();
	});
});
