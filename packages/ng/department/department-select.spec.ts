import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ILuTree } from '@lucca-front/ng/core';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ILuDepartment } from './department.model';
import { LuDepartmentSelectInputComponent } from './select';
import { ALuDepartmentService, LuDepartmentV4Service } from './service';

const deptMock: ILuTree<ILuDepartment>[] = [
	{
		value: { id: 1, name: 'Lucca France' },
		children: [
			{ value: { id: 11, name: 'Tech' }, children: [] },
			{ value: { id: 11, name: 'Admin' }, children: [] },
		],
	},
	{ value: { id: 2, name: 'Lucca UK' }, children: [{ value: { id: 21, name: 'Support' }, children: [] }] },
];

const mock = {
	getTrees: vi.fn(() => of(deptMock)),
} as Partial<LuDepartmentV4Service> as LuDepartmentV4Service;

describe('department select', () => {
	const departmentStoryTemplate = `<label class="textfield">
	<lu-department-select
		class="textfield-input"
		[appInstanceId]="15"
		[operations]="[1]"
		[filters]="['isactive=false']"
		data-testid="lu-select"
	></lu-department-select>
</label>`;

	it('should display dialog with a click on a lu select ', async () => {
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByTestId('dialog-panel');

		expect(dial).toBeInTheDocument();
	});

	it('should filters results when clue is typed in', async () => {
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
			componentProviders: [
				{
					provide: ALuDepartmentService,
					useValue: mock,
				},
			],
		});

		const luSelectElement = await screen.findByTestId('lu-select');

		expect(luSelectElement).toBeInTheDocument();
		fireEvent.click(luSelectElement);
		expect(mock.getTrees).toHaveBeenCalled();
		const items = screen.getByTestId('dialog-panel').getElementsByClassName('optionItem');
		expect(items.length).toEqual(5);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Tech' } });
		const searchItems = screen.getByTestId('dialog-panel').getElementsByClassName('optionItem');
		expect(searchItems.length).toEqual(2);
	});

	it('should check a11y', async () => {
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});

	describe('selection', () => {
		// Same shape as deptMock, but with unique ids so the `byId` comparer can tell the nodes apart
		const uniqueIdsTree: ILuTree<ILuDepartment>[] = [
			{
				value: { id: 1, name: 'Lucca France' },
				children: [
					{ value: { id: 11, name: 'Tech' }, children: [] },
					{ value: { id: 12, name: 'Admin' }, children: [] },
				],
			},
			{ value: { id: 2, name: 'Lucca UK' }, children: [{ value: { id: 21, name: 'Support' }, children: [] }] },
		];

		async function renderSelect(options: { multiple?: boolean } = {}): Promise<ReturnType<typeof vi.fn>> {
			const ngModelChange = vi.fn();
			const treeMock = {
				getTrees: vi.fn(() => of(uniqueIdsTree)),
			} as Partial<LuDepartmentV4Service> as LuDepartmentV4Service;

			await render(
				`<lu-department-select
					data-testid="lu-select"
					${options.multiple ? 'multiple' : ''}
					[appInstanceId]="15"
					[ngModel]="null"
					(ngModelChange)="ngModelChange($event)"
				></lu-department-select>`,
				{
					imports: [LuDepartmentSelectInputComponent, FormsModule],
					providers: [provideHttpClient(), provideHttpClientTesting()],
					componentProviders: [{ provide: ALuDepartmentService, useValue: treeMock }],
					componentProperties: { ngModelChange },
				},
			);

			await userEvent.click(screen.getByTestId('lu-select'));

			return ngModelChange;
		}

		// The selected department is also rendered in the select display, so options are looked up inside the panel
		function clickOption(name: string): Promise<void> {
			return userEvent.click(within(screen.getByTestId('dialog-panel')).getByText(name));
		}

		it('should emit the clicked department', async () => {
			// Arrange
			const ngModelChange = await renderSelect();

			// Act
			await clickOption('Tech');

			// Assert
			expect(ngModelChange).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ id: 11, name: 'Tech' }));
		});

		it('should emit a parent department without its children', async () => {
			// Arrange
			const ngModelChange = await renderSelect();

			// Act
			await clickOption('Lucca France');

			// Assert
			expect(ngModelChange).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ id: 1, name: 'Lucca France' }));
		});

		it('should replace the previous selection in single mode', async () => {
			// Arrange
			const ngModelChange = await renderSelect();

			// Act
			await clickOption('Tech');
			await userEvent.click(screen.getByTestId('lu-select'));
			await clickOption('Support');

			// Assert
			expect(ngModelChange).toHaveBeenLastCalledWith(expect.objectContaining({ id: 21, name: 'Support' }));
			expect(ngModelChange).toHaveBeenCalledTimes(2);
		});

		it('should accumulate departments in multiple mode', async () => {
			// Arrange
			const ngModelChange = await renderSelect({ multiple: true });

			// Act
			await clickOption('Tech');
			await clickOption('Support');

			// Assert
			expect(ngModelChange).toHaveBeenLastCalledWith([expect.objectContaining({ id: 11 }), expect.objectContaining({ id: 21 })]);
		});

		it('should deselect an already selected department in multiple mode', async () => {
			// Arrange
			const ngModelChange = await renderSelect({ multiple: true });

			// Act
			await clickOption('Tech');
			await clickOption('Tech');

			// Assert
			expect(ngModelChange).toHaveBeenLastCalledWith([]);
		});
	});
});
