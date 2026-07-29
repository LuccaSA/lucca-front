import { provideHttpClient } from '@angular/common/http';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
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
});
