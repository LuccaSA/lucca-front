import { HttpClientModule } from '@angular/common/http';
import { RenderTemplateOptions, fireEvent, render, screen, waitFor } from '@testing-library/angular';
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

const mockEstablishment = {
	searchPaged: vi.fn(() => of(estMock)),
	getAll: vi.fn(() => of(estMock)),
	count: vi.fn(() => of(3)),
} as Partial<LuEstablishmentService> as LuEstablishmentService;
const mockLegalUnit = {
	getAll: vi.fn(() => of([])),
	count: vi.fn(() => of(0)),
} as Partial<LuLegalUnitService> as LuLegalUnitService;

describe('establishment select', () => {
	const testingStoryTemplate = `<label class="textfield mod-inline pr-u-marginInlineEnd200">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select" />
	<span class="textfield-label">Establishment Select</span>
</label>
<label class="textfield mod-inline">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="true" data-testid="lu-select-multiple" />
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
			await render(testingStoryTemplate, rendererTemplateOptions);

			const luSelectElement = screen.getByTestId('lu-select');
			await userEvent.click(luSelectElement);
			const dial = screen.getByTestId('dialog-panel');

			expect(dial).toBeInTheDocument();
		});

		it('should trigger search when clue is typed in', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select');

			expect(luSelectElement).toBeInTheDocument();
			fireEvent.click(luSelectElement);
			// clue is normalized to '' before reaching the data source (see buildOptionsFromDataSource)
			await waitFor(() => expect(mockEstablishment.searchPaged).toHaveBeenCalledWith('', 0));
			vi.mocked(mockEstablishment.searchPaged).mockClear();

			const input: HTMLInputElement = screen.getByRole('textbox');
			fireEvent.input(input, { target: { value: 'FR' } });
			await waitFor(() => expect(mockEstablishment.searchPaged).toHaveBeenCalledWith('FR', 0));
		});

		it('should check a11y', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select');

			const results = await axe(luSelectElement);
			expect(results).toHaveNoViolations(); // of course not
		});
	});

	describe('multiple', () => {
		it('should display dialog with a click on a lu select ', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select-multiple');
			await userEvent.click(luSelectElement);
			const dial = screen.getByTestId('dialog-panel');
			expect(dial).toBeInTheDocument();
		});

		it('should select all establishment', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);

			const luSelectElement = screen.getByTestId('lu-select-multiple');
			expect(luSelectElement).toBeInTheDocument();

			fireEvent.click(luSelectElement);
			// Wait for options to load after debounce fires
			await screen.findByText('Lucca FR');
			const button: HTMLButtonElement = await screen.findByRole('button', { name: 'Select all' });
			fireEvent.click(button);
			// // FIXME could not query by role checkbox
			await waitFor(() => {
				const selectedValues = screen.getByTestId('dialog-panel').querySelectorAll('.optionItem-value.is-selected');
				expect(selectedValues).toHaveLength(3);
			});
		});

		it('should deselect all establishment', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select-multiple');
			fireEvent.click(luSelectElement);
			// Wait for options to load after debounce fires
			await screen.findByText('Lucca FR');
			const t: HTMLButtonElement = await screen.findByRole('button', { name: 'Select all' });
			fireEvent.click(t);
			let selectedValues: NodeListOf<Element>;
			await waitFor(() => {
				selectedValues = screen.getByTestId('dialog-panel').querySelectorAll('.optionItem-value.is-selected');
				expect(selectedValues).toHaveLength(3);
			});
			const button: HTMLButtonElement = screen.getByRole('button', { name: 'Deselect all' });
			fireEvent.click(button);
			// FIXME could not query by role checkbox
			selectedValues = screen.getByTestId('dialog-panel').querySelectorAll('.optionItem-value.is-selected');
			expect(selectedValues).toHaveLength(0);
		});

		it('should check a11y', async () => {
			await render(testingStoryTemplate, rendererTemplateOptions);
			const luSelectElement = screen.getByTestId('lu-select-multiple');
			const results = await axe(luSelectElement);
			expect(results).toHaveNoViolations(); // of course not
		});
	});
});
