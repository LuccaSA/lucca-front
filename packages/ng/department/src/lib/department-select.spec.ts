/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClientModule } from '@angular/common/http';
import { ILuTree } from '@lucca-front/ng/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ILuDepartment } from './department.model';
import { LuDepartmentSelectInputComponent } from './select';
import { ALuDepartmentService, LuDepartmentV3Service } from './service';

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

const mock = createMock(LuDepartmentV3Service);
mock.getTrees = jest.fn(() => of(deptMock));

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent, HttpClientModule],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByRole('dialog');

		expect(dial).toBeInTheDocument();
	});

	it('should filters results when clue is typed in', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent, HttpClientModule],
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
		const items = screen.getByRole('dialog').getElementsByClassName('optionItem');
		expect(items.length).toEqual(5);
		const input: HTMLInputElement = await screen.findByRole('textbox');
		fireEvent.input(input, { target: { value: 'Tech' } });
		const searchItems = screen.getByRole('dialog').getElementsByClassName('optionItem');
		expect(searchItems.length).toEqual(2);
	});

	it('should check a11y', async () => {
		await render(departmentStoryTemplate, {
			imports: [LuDepartmentSelectInputComponent, HttpClientModule],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});
});
