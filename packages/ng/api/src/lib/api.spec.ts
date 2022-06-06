/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { fakeAsync, tick } from '@angular/core/testing';
import { composeStory, createMountableStoryComponent } from '@storybook/testing-angular';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
import Meta, { Basic as PrimaryStory } from '../../../../../stories/documentation/forms/api/select/api-select.stories';
import { ALuApiService, LuApiV3Service } from './service';

const Primary = composeStory(PrimaryStory, Meta);
const mock = createMock(LuApiV3Service);
mock.searchPaged = jest.fn(() => of([]));

describe('button', () => {
	it('should display dialog with a click on a lu select ', async () => {
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		const t = await render(component, {
			imports: [ngModule],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		expect(luSelectElement).not.toBeNull();
		luSelectElement.click();
		const dial = screen.getByRole('dialog');
		expect(dial).not.toBeNull();
	});

	it('renders primary button with default args', fakeAsync(async () => {
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

		const buttonElement = screen.getByTestId('lu-select');
		expect(buttonElement).not.toBeNull();
		buttonElement.click();
		tick(250);
		expect(mock.searchPaged).toHaveBeenCalledWith('', 0);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Test' } });
		tick(250);
		expect(mock.searchPaged).toHaveBeenCalledWith('Test', 0);
	}));
});
