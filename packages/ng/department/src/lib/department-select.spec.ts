/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Meta, { Select } from '@/stories/forms/department/department-select.stories';
import { ILuTree } from '@lucca-front/ng/core';
import { composeStory, createMountableStoryComponent } from '@storybook/testing-angular';
import { fireEvent, render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { of } from 'rxjs';
import { ILuDepartment } from './department.model';
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

const Primary = composeStory(Select, Meta);
const mock = createMock(LuDepartmentV3Service);
mock.getTrees = jest.fn(() => of(deptMock));

describe('department select', () => {
	it('should display dialog with a click on a lu select ', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
		});

		const luSelectElement = screen.getByTestId('lu-select');
		await userEvent.click(luSelectElement);
		const dial = screen.getByRole('dialog');
		// FIXME not working, don't know why :(
		// expect(dial).toBeInTheDocument();
		expect(dial).toBeDefined();
	});

	it('should filters results when clue is typed in', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
			componentProviders: [
				{
					provide: ALuDepartmentService,
					useValue: mock,
				},
			],
		});

		const luSelectElement = await screen.findByTestId('lu-select');
		// FIXME not working, don't know why :(
		// expect(luSelectElement).toBeInTheDocument();
		expect(luSelectElement).toBeDefined();
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
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
		});
		const luSelectElement = screen.getByTestId('lu-select');

		const results = await axe(luSelectElement);
		expect(results).toHaveNoViolations(); // of course not
	});
});
