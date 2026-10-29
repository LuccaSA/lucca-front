import { luNullableNumberAttribute, luNumberAttribute, luOptionalNullableNumberAttribute, luOptionalNumberAttribute } from './number-transform';

describe('number transform', () => {
	describe(luNumberAttribute, () => {
		it.each([
			{ input: 42 as const, expected: 42 as const },
			{ input: 0 as const, expected: 0 as const },
			{ input: '42' as const, expected: 42 as const },
			{ input: '0' as const, expected: 0 as const },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luNumberAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: 42 = luNumberAttribute<42>('42');
			expect(result).toBe(42);
		});
	});

	describe(luNullableNumberAttribute, () => {
		it.each([
			{ input: 42 as const, expected: 42 as const },
			{ input: 0 as const, expected: 0 as const },
			{ input: '42' as const, expected: 42 as const },
			{ input: '0' as const, expected: 0 as const },
			{ input: null, expected: null },
			{ input: 'null' as const, expected: null },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luNullableNumberAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: 42 | null = luNullableNumberAttribute<42>('42');
			expect(result).toBe(42);
		});
	});

	describe(luOptionalNumberAttribute, () => {
		it.each([
			{ input: 42 as const, expected: 42 as const },
			{ input: 0 as const, expected: 0 as const },
			{ input: '42' as const, expected: 42 as const },
			{ input: '0' as const, expected: 0 as const },
			{ input: undefined, expected: undefined },
			{ input: 'undefined' as const, expected: undefined },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luOptionalNumberAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: 42 | undefined = luOptionalNumberAttribute<42>('42');
			expect(result).toBe(42);
		});
	});

	describe(luOptionalNullableNumberAttribute, () => {
		it.each([
			{ input: 42 as const, expected: 42 as const },
			{ input: 0 as const, expected: 0 as const },
			{ input: '42' as const, expected: 42 as const },
			{ input: '0' as const, expected: 0 as const },
			{ input: null, expected: null },
			{ input: 'null' as const, expected: null },
			{ input: undefined, expected: undefined },
			{ input: 'undefined' as const, expected: undefined },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luOptionalNullableNumberAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: 42 | null | undefined = luOptionalNullableNumberAttribute<42>('42');
			expect(result).toBe(42);
		});
	});
});
