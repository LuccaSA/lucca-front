/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClientModule } from '@angular/common/http';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { RenderTemplateOptions, fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ILuEstablishment } from './establishment.model';
import { LuEstablishmentSelectInputComponent } from './select';
import { ALuEstablishmentService, ALuLegalUnitService, LuEstablishmentService, LuLegalUnitService } from './service';

const estMock: ILuEstablishment[] = [
	{
		id: 1,
		name: 'Lucca FR',
		code: 'LFR',
		legalUnit: { id: 1, countryId: 1 },
		legalUnitId: 1,
	},
	{
		id: 2,
		name: 'Lucca UK',
		code: 'LUK',
		legalUnit: { id: 2, countryId: 2 },
		legalUnitId: 2,
	},
	{
		id: 3,
		name: 'Lucca ES',
		code: 'LES',
		legalUnit: { id: 3, countryId: 3 },
		legalUnitId: 3,
	},
];

const mockEstablishment = createMock(LuEstablishmentService);
mockEstablishment.searchPaged = jest.fn(() => of(estMock));
mockEstablishment.getAll = jest.fn(() => of(estMock));
mockEstablishment.count = jest.fn(() => of(3));
const mockLegalUnit = createMock(LuLegalUnitService);
mockLegalUnit.getAll = jest.fn(() => of([]));
mockLegalUnit.count = jest.fn(() => of(0));

describe('establishment select', () => {
	const testingStoryTemplate = `<label class="textfield mod-inline pr-u-marginRight200">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select"></lu-establishment-select>
	<span class="textfield-label">Establishment Select</span>
</label>
<label class="textfield mod-inline">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="true" data-testid="lu-select-multiple"></lu-establishment-select>
	<span class="textfield-label">Establishment Multiple Select</span>
</label>`;

	const rendererTemplateOptions: RenderTemplateOptions<LuEstablishmentSelectInputComponent> = {
		imports: [LuEstablishmentSelectInputComponent, HttpClientModule],
		componentProviders: [
			{
				provide: ALuEstablishmentService,
				useValue: mockEstablishment,
			},
			{
				provide: ALuLegalUnitService,
				useValue: mockLegalUnit,
			},
		],
	};

	describe('Basic', () => {
		it('should display dialog with a click on a lu select ', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any

			await render(testingStoryTemplate, rendererTemplateOptions);

			const luSelectElement = screen.getByTestId('lu-select');
			await userEvent.click(luSelectElement);
			const dial = screen.getByRole('dialog');

			expect(dial).toBeInTheDocument();
		});

		it('should trigger search when clue is typed in', fakeAsync(async () => {
			discardPeriodicTasks();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = await screen.findByTestId('lu-select');

			expect(luSelectElement).toBeInTheDocument();
			fireEvent.click(luSelectElement);
			tick(100); // debouncetime du composant
			expect(mockEstablishment.searchPaged).toHaveBeenCalledWith(null, 0);
			mockEstablishment.searchPaged.mockClear();
			const input: HTMLInputElement = await screen.findByRole('textbox');
			fireEvent.input(input, { target: { value: 'FR' } });
			tick(100); // debouncetime du composant
			expect(mockEstablishment.searchPaged).toHaveBeenCalledWith('FR', 0);
		}));

		it('should check a11y', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select');

			const results = await axe(luSelectElement);
			expect(results).toHaveNoViolations(); // of course not
		});
	});

	describe('multiple', () => {
		it('should display dialog with a click on a lu select ', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select-multiple');
			await userEvent.click(luSelectElement);
			const dial = screen.getByRole('dialog');
			expect(dial).toBeInTheDocument();
		});

		it('should select all establishment', fakeAsync(async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await render(testingStoryTemplate, rendererTemplateOptions);

			const luSelectElement = await screen.findByTestId('lu-select-multiple');
			expect(luSelectElement).toBeInTheDocument();

			fireEvent.click(luSelectElement);
			tick(100); // debouncetime du composant
			const button: HTMLButtonElement = await screen.findByRole('button', { name: 'Select all' });
			fireEvent.click(button);
			// // FIXME could not query by role checkbox
			const selectedValues = screen.getByRole('dialog').querySelectorAll('.optionItem-value.is-selected');
			expect(selectedValues).toHaveLength(3);
		}));

		it('should deselect all establishment', fakeAsync(async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = await screen.findByTestId('lu-select-multiple');
			fireEvent.click(luSelectElement);
			tick(300); // debouncetime du composant
			const t: HTMLButtonElement = await screen.findByRole('button', { name: 'Select all' });
			fireEvent.click(t);
			let selectedValues = screen.getByRole('dialog').querySelectorAll('.optionItem-value.is-selected');
			expect(selectedValues).toHaveLength(3);
			const button: HTMLButtonElement = screen.getByRole('button', { name: 'Deselect all' });
			fireEvent.click(button);
			// FIXME could not query by role checkbox
			selectedValues = screen.getByRole('dialog').querySelectorAll('.optionItem-value.is-selected');
			expect(selectedValues).toHaveLength(0);
		}));

		it('should check a11y', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select-multiple');
			const results = await axe(luSelectElement);
			expect(results).toHaveNoViolations(); // of course not
		});
	});
});
