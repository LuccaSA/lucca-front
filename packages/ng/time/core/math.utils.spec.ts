import { ceilToNearest, circularize, floorToNearest, roundToNearest } from './math.utils';

describe('MathUtils', () => {
	describe('roundToNearest', () => {
		it('should return the value itself when it is already a multiple of the step', () => {
			// Act
			const result = roundToNearest(30, 15);

			// Assert
			expect(result).toBe(30);
		});

		it('should round down when the value is below the half step', () => {
			// Act
			const result = roundToNearest(37, 15);

			// Assert
			expect(result).toBe(30);
		});

		it('should round up when the value is above the half step', () => {
			// Act
			const result = roundToNearest(38, 15);

			// Assert
			expect(result).toBe(45);
		});

		it('should round negative values', () => {
			// Act
			const result = roundToNearest(-23, 5);

			// Assert
			expect(result).toBe(-25);
		});
	});

	describe('floorToNearest', () => {
		it('should return the value itself when it is already a multiple of the step', () => {
			// Act
			const result = floorToNearest(30, 15);

			// Assert
			expect(result).toBe(30);
		});

		it('should round down even when the value is close to the next step', () => {
			// Act
			const result = floorToNearest(44, 15);

			// Assert
			expect(result).toBe(30);
		});

		it('should round negative values towards minus infinity', () => {
			// Act
			const result = floorToNearest(-23, 5);

			// Assert
			expect(result).toBe(-25);
		});
	});

	describe('ceilToNearest', () => {
		it('should return the value itself when it is already a multiple of the step', () => {
			// Act
			const result = ceilToNearest(30, 15);

			// Assert
			expect(result).toBe(30);
		});

		it('should round up even when the value is close to the previous step', () => {
			// Act
			const result = ceilToNearest(31, 15);

			// Assert
			expect(result).toBe(45);
		});

		it('should round negative values towards plus infinity', () => {
			// Act
			const result = ceilToNearest(-23, 5);

			// Assert
			expect(result).toBe(-20);
		});
	});

	describe('circularize', () => {
		it('should return 0 for 0', () => {
			// Act
			const result = circularize(0, 10);

			// Assert
			expect(result).toBe(0);
		});

		it('should return max instead of 0 when the value is max', () => {
			// Act
			const result = circularize(10, 10);

			// Assert
			expect(result).toBe(10);
		});

		it('should return max instead of 0 when the value is a multiple of max', () => {
			// Act
			const result = circularize(30, 10);

			// Assert
			expect(result).toBe(10);
		});

		it('should keep values already inside the range unchanged', () => {
			// Act
			const result = circularize(7, 10);

			// Assert
			expect(result).toBe(7);
		});

		it('should wrap values above max', () => {
			// Act
			const result = circularize(11, 10);

			// Assert
			expect(result).toBe(1);
		});

		it('should wrap negative values', () => {
			// Act
			const result = circularize(-1, 10);

			// Assert
			expect(result).toBe(9);
		});

		it('should wrap values several turns above max', () => {
			// Act
			const result = circularize(25, 10);

			// Assert
			expect(result).toBe(5);
		});
	});
});
