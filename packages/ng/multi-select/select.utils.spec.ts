import { LuMultiSelectWithSelectAllMode, LuMultiSelectWithSelectAllValue } from './select.model';
import { selectionToQueryParams } from './select.utils';

describe('multi-select utils', () => {
	describe('selectionToQueryParams', () => {
		const selections: Record<LuMultiSelectWithSelectAllMode, LuMultiSelectWithSelectAllValue<{ id: number }>> = {
			include: {
				mode: 'include',
				values: [{ id: 12 }, { id: 13 }],
			},
			exclude: {
				mode: 'exclude',
				values: [{ id: 12 }, { id: 13 }],
			},
			all: { mode: 'all' },
			none: { mode: 'none' },
		};

		it('should return correct value when "include" selection', () => {
			// Act
			const result = selectionToQueryParams('id', selections.include, (e) => e.id);

			// Assert
			expect(result).toEqual({ id: '12,13' });
		});

		it('should return correct value when "exclude" selection', () => {
			// Act
			const result = selectionToQueryParams('id', selections.exclude, (e) => e.id);

			// Assert
			expect(result).toEqual({ '-id': '12,13' });
		});

		it('should return empty object when "all" selection', () => {
			// Act
			const result = selectionToQueryParams('id', selections.all, (e) => e.id);

			// Assert
			expect(result).toEqual({});
		});

		it('should return empty object when "none" selection', () => {
			// Act
			const result = selectionToQueryParams('id', selections.none, (e) => e.id);

			// Assert
			expect(result).toEqual({});
		});
	});
});
