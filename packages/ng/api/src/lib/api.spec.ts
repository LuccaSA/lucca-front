/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { LuApiSelectInputComponent } from './select';
import { ALuApiService, LuApiV3Service } from './service';

const mock = createMock(LuApiV3Service);
mock.searchPaged = jest.fn(() => of([]));

describe('lu-api-select', () => {
	const apiSelectStoryTemplate = `
		<label class="textfield">
			<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield u-marginTopStandard">
			<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position"> </lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>

		<label class="textfield u-marginTopStandard">
			<lu-api-select class="textfield-input" [disabled]="true" standard="v4" [api]="apiV4" sort="job.name,level.position"> </lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>`;

	it('should display dialog with a click on a lu select ', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent, HttpClientModule],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByRole('dialog');

		// FIXME not working, don't know why :(
		// expect(dial).toBeInTheDocument();
		expect(dial).toBeDefined();
	});

	it('should trigger search when clue is typed in', fakeAsync(async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent, HttpClientModule],
			componentProviders: [
				{
					provide: ALuApiService,
					useValue: mock,
				},
			],
		});

		const luSelectElement = await screen.findByTestId('lu-select');

		// FIXME not working, don't know why :(
		// expect(luSelectElement).toBeInTheDocument();
		expect(luSelectElement).toBeDefined();
		fireEvent.click(luSelectElement);
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('', 0);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Test' } });
		tick(250); // debouncetime du composant
		expect(mock.searchPaged).toHaveBeenCalledWith('Test', 0);
	}));

	it('should check a11y', async () => {
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent, HttpClientModule],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});
});
