/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { fakeAsync, tick } from '@angular/core/testing';
import { composeStory, createMountableStoryComponent } from '@storybook/testing-angular';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import Meta, { Basic } from '../../../../../stories/documentation/forms/api/select/api-select.stories';
import { ALuApiService, LuApiV3Service } from './service';

const Primary = composeStory(Basic, Meta);
const mock = createMock(LuApiV3Service);
mock.searchPaged = jest.fn(() => of([]));

describe('button', () => {
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

	it('renders primary button with default args', fakeAsync(async () => {
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

		const buttonElement = await screen.findByTestId('lu-select');
		expect(buttonElement).toBeInTheDocument();
		fireEvent.click(buttonElement);
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('', 0);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Test' } });
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('Test', 0);
	}));
});
