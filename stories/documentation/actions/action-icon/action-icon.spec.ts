/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createMountableStoryComponent } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import { BasicAction } from './action-icon-basic.stories';

describe('action icon', () => {
	it('renders basic action icon with default args', async () => {
		const { component, ngModule } = createMountableStoryComponent(BasicAction({}, {} as unknown));
		await render(component, { imports: [ngModule] });
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).not.toBeNull();
	});
});
