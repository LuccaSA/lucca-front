import { TestBed } from '@angular/core/testing';
import { LuOptionComparer, ɵIsSelectedStrategy } from './select.model';

interface ILegume {
	id: number;
	name: string;
}

const options: ILegume[] = [
	{ id: 1, name: 'Radis' },
	{ id: 2, name: 'Chou' },
	{ id: 3, name: 'Carotte' },
];

const compareById: LuOptionComparer<ILegume> = (a, b) => a?.id === b?.id;

describe('DefaultIsSelectedStrategy', () => {
	let strategy: ɵIsSelectedStrategy<ILegume>;

	beforeEach(() => {
		strategy = TestBed.inject<ɵIsSelectedStrategy<ILegume>>(ɵIsSelectedStrategy);
	});

	it('should be provided as the default strategy', () => {
		// Assert
		expect(strategy).toBeInstanceOf(ɵIsSelectedStrategy);
	});

	describe('isSelected', () => {
		it('should return true when the option is part of the selection', () => {
			// Act
			const isSelected = strategy.isSelected(options[1], [options[1]], compareById);

			// Assert
			expect(isSelected).toBe(true);
		});

		it('should return true when a distinct object matches through the comparer', () => {
			// Act
			const isSelected = strategy.isSelected(options[1], [{ id: 2, name: 'Chou (copie)' }], compareById);

			// Assert
			expect(isSelected).toBe(true);
		});

		it('should return true when the option is one of several selected options', () => {
			// Act
			const isSelected = strategy.isSelected(options[2], [options[0], options[2]], compareById);

			// Assert
			expect(isSelected).toBe(true);
		});

		it('should return false when the option is not part of the selection', () => {
			// Act
			const isSelected = strategy.isSelected(options[1], [options[0], options[2]], compareById);

			// Assert
			expect(isSelected).toBe(false);
		});

		it('should return false when nothing is selected', () => {
			// Act
			const isSelected = strategy.isSelected(options[0], [], compareById);

			// Assert
			expect(isSelected).toBe(false);
		});

		it('should return false when the comparer rejects an identical option', () => {
			// Arrange
			const neverEqual: LuOptionComparer<ILegume> = () => false;

			// Act
			const isSelected = strategy.isSelected(options[0], [options[0]], neverEqual);

			// Assert
			expect(isSelected).toBe(false);
		});
	});

	describe('isGroupSelected', () => {
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

		it('should return false when all but one option are selected', () => {
			// Act
			const isSelected = strategy.isGroupSelected(options, options.slice(2));

			// Assert
			expect(isSelected).toBe(false);
		});

		it('should return false for an empty group', () => {
			// Act
			const isSelected = strategy.isGroupSelected([], []);

			// Assert
			expect(isSelected).toBe(false);
		});
	});
});
