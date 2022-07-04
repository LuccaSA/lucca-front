/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Meta, { Basic } from '@/stories/forms/api/select/api-select.stories';
import { fakeAsync, tick } from '@angular/core/testing';
import { composeStory, createMountableStoryComponent } from '@storybook/testing-angular';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ALuApiService, LuApiV3Service } from './service';

const Primary = composeStory(Basic, Meta);
const mock = createMock(LuApiV3Service);
mock.searchPaged = jest.fn(() => of([]));

describe('lu-api-select', () => {
	it('should display dialog with a click on a lu select ', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByRole('dialog');
		expect(dial).toBeInTheDocument();
	});

	it('should trigger search when clue is typed in', fakeAsync(async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
			componentProviders: [
				{
					provide: ALuApiService,
					useValue: mock,
				},
			],
		});

		const luSelectElement = await screen.findByTestId('lu-select');
		expect(luSelectElement).toBeInTheDocument();
		fireEvent.click(luSelectElement);
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('', 0);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Test' } });
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('Test', 0);
	}));

	it('should check a11y', async () => {
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});
});
