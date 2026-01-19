import { TestBed } from '@angular/core/testing';
import { ɵIsSelectedStrategy } from './select.model';

interface ILegume {
	id: number;
	name: string;
}

const options: ILegume[] = [
	{ id: 1, name: 'Radis' },
	{ id: 2, name: 'Chou' },
	{ id: 3, name: 'Carotte' },
];

describe('DefaultIsSelectedStrategy', () => {
	let strategy: ɵIsSelectedStrategy<ILegume>;

	beforeEach(() => {
		strategy = TestBed.inject<ɵIsSelectedStrategy<ILegume>>(ɵIsSelectedStrategy);
	});

	it('should return true when all options are selected', () => {
		// Act
		const isSelected = strategy.isGroupSelected(options, []);

		// Assert
		expect(isSelected).toBe(true);
	});

	it('should return false when all options are unselected', () => {
		// Act
		const isSelected = strategy.isGroupSelected(options, options);

		// Assert
		expect(isSelected).toBe(false);
	});

	it('should return false when one option is selected', () => {
		// Act
		const isSelected = strategy.isGroupSelected(options, options.slice(1));

		// Assert
		expect(isSelected).toBe(false);
	});
});
