import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ILuApiItem } from './api.model';
import { LuApiSelectInputComponent } from './select';
import { ALuApiService, LuApiV3Service } from './service';

const mock = {
	searchPaged: vi.fn(() => of([])),
} as Partial<LuApiV3Service> as LuApiV3Service;

describe('lu-api-select', () => {
	const apiSelectStoryTemplate = `
		<label class="textfield">
			<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3" />
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield pr-u-marginBlockStart300">
			<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position" />
			<span class="textfield-label">Api V4 Select</span>
		</label>

		<label class="textfield pr-u-marginBlockStart300">
			<lu-api-select class="textfield-input" [disabled]="true" standard="v4" [api]="apiV4" sort="job.name,level.position" />
			<span class="textfield-label">Api V4 Select</span>
		</label>`;

	it('should display dialog with a click on a lu select ', async () => {
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent],
			providers: [provideHttpClient()],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByTestId('dialog-panel');

		expect(dial).toBeInTheDocument();
	});

	it('should trigger search when clue is typed in', async () => {
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent],
			providers: [provideHttpClient()],
			componentProviders: [
				{
					provide: ALuApiService,
					useValue: mock,
				},
			],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		expect(luSelectElement).toBeInTheDocument();
		fireEvent.click(luSelectElement);
		await waitFor(() => expect(mock.searchPaged).toHaveBeenCalledWith('', 0));

		const input: HTMLInputElement = screen.getByRole('textbox');
		fireEvent.input(input, { target: { value: 'Test' } });
		await waitFor(() => expect(mock.searchPaged).toHaveBeenCalledWith('Test', 0));
	});

	it('should check a11y', async () => {
		await render(apiSelectStoryTemplate, {
			imports: [LuApiSelectInputComponent],
			providers: [provideHttpClient()],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});

	describe('api standard', () => {
		async function renderStandard(standard: 'v3' | 'v4'): Promise<HttpTestingController> {
			const template =
				standard === 'v4' ? `<lu-api-select data-testid="lu-select" standard="v4" [api]="api" sort="job.name,level.position" />` : `<lu-api-select data-testid="lu-select" [api]="api" />`;

			await render(template, {
				imports: [LuApiSelectInputComponent],
				providers: [provideHttpClient(), provideHttpClientTesting()],
				componentProperties: { api: '/api/things' },
			});

			await userEvent.click(screen.getByTestId('lu-select'));

			return TestBed.inject(HttpTestingController);
		}

		it('should query the v3 endpoint with its fields, orderBy and paging params', async () => {
			// Act
			const httpMock = await renderStandard('v3');

			// Assert
			const request = await waitFor(() => httpMock.expectOne((req) => req.url.startsWith('/api/things')));
			expect(request.request.url).toBe('/api/things?orderBy=name,asc&fields=id,name&paging=0,20');
			request.flush({ data: { items: [] } });
			httpMock.verify();
		});

		it('should query the v4 endpoint with its page and sort params', async () => {
			// Act
			const httpMock = await renderStandard('v4');

			// Assert
			const request = await waitFor(() => httpMock.expectOne((req) => req.url.startsWith('/api/things')));
			expect(request.request.url).toBe('/api/things?page=1&sort=job.name,level.position');
			request.flush({ items: [] });
			httpMock.verify();
		});
	});

	describe('selection', () => {
		it('should emit the selected option', async () => {
			// Arrange
			const ngModelChange = vi.fn();
			const optionsMock = {
				searchPaged: vi.fn(() => of([{ id: 1, name: 'Alice' } as ILuApiItem, { id: 2, name: 'Bob' } as ILuApiItem])),
			} as Partial<LuApiV3Service> as LuApiV3Service;

			await render(`<lu-api-select data-testid="lu-select" [api]="api" [ngModel]="null" (ngModelChange)="ngModelChange($event)" />`, {
				imports: [LuApiSelectInputComponent, FormsModule],
				providers: [provideHttpClient()],
				componentProviders: [{ provide: ALuApiService, useValue: optionsMock }],
				componentProperties: { api: '/api/things', ngModelChange },
			});

			// Act
			await userEvent.click(screen.getByTestId('lu-select'));
			await userEvent.click(await screen.findByText('Bob'));

			// Assert
			await waitFor(() => expect(ngModelChange).toHaveBeenCalledWith(expect.objectContaining({ id: 2, name: 'Bob' })));
		});

		it('should display the selected option in the input', async () => {
			// Arrange
			const optionsMock = {
				searchPaged: vi.fn(() => of([{ id: 1, name: 'Alice' } as ILuApiItem])),
			} as Partial<LuApiV3Service> as LuApiV3Service;

			await render(`<lu-api-select data-testid="lu-select" [api]="api" [ngModel]="null" />`, {
				imports: [LuApiSelectInputComponent, FormsModule],
				providers: [provideHttpClient()],
				componentProviders: [{ provide: ALuApiService, useValue: optionsMock }],
				componentProperties: { api: '/api/things' },
			});

			// Act
			await userEvent.click(screen.getByTestId('lu-select'));
			await userEvent.click(await screen.findByText('Alice'));

			// Assert
			await waitFor(() => expect(screen.getByTestId('lu-select').querySelector('.lu-select-value')?.textContent).toContain('Alice'));
		});
	});

	describe('disabled', () => {
		it('should not open the panel when disabled', async () => {
			// Arrange
			await render(`<lu-api-select data-testid="lu-select" [disabled]="true" [api]="api" />`, {
				imports: [LuApiSelectInputComponent],
				providers: [provideHttpClient()],
				componentProperties: { api: '/api/things' },
			});

			// Act
			await userEvent.click(screen.getByTestId('lu-select'));

			// Assert
			expect(screen.queryByTestId('dialog-panel')).not.toBeInTheDocument();
		});
	});
});
