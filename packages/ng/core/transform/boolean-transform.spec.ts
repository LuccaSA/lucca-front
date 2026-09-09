import { luBooleanAttribute, luNullableBooleanAttribute, luOptionalBooleanAttribute, luOptionalNullableBooleanAttribute } from './boolean-transform';

describe('boolean transform', () => {
	describe(luBooleanAttribute, () => {
		it.each([
			{ input: true as const, expected: true as const },
			{ input: false as const, expected: false as const },
			{ input: 'true' as const, expected: true as const },
			{ input: 'false' as const, expected: false as const },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luBooleanAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: true = luBooleanAttribute<true>('true');
			expect(result).toBe(true);
		});
	});

	describe(luNullableBooleanAttribute, () => {
		it.each([
			{ input: true as const, expected: true as const },
			{ input: false as const, expected: false as const },
			{ input: 'true' as const, expected: true as const },
			{ input: 'false' as const, expected: false as const },
			{ input: null, expected: null },
			{ input: 'null' as const, expected: null },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luNullableBooleanAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: true | null = luNullableBooleanAttribute<true>('true');
			expect(result).toBe(true);
		});
	});

	describe(luOptionalBooleanAttribute, () => {
		it.each([
			{ input: true as const, expected: true as const },
			{ input: false as const, expected: false as const },
			{ input: 'true' as const, expected: true as const },
			{ input: 'false' as const, expected: false as const },
			{ input: undefined, expected: undefined },
			{ input: 'undefined' as const, expected: undefined },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luOptionalBooleanAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: true | undefined = luOptionalBooleanAttribute<true>('true');
			expect(result).toBe(true);
		});
	});

	describe(luOptionalNullableBooleanAttribute, () => {
		it.each([
			{ input: true as const, expected: true as const },
			{ input: false as const, expected: false as const },
			{ input: 'true' as const, expected: true as const },
			{ input: 'false' as const, expected: false as const },
			{ input: null, expected: null },
			{ input: 'null' as const, expected: null },
			{ input: undefined, expected: undefined },
			{ input: 'undefined' as const, expected: undefined },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = luOptionalNullableBooleanAttribute(input);
			expect(result).toBe(expected);
		});

		it('should narrow type with explicit generic parameter', () => {
			const result: true | null | undefined = luOptionalNullableBooleanAttribute<true>('true');
			expect(result).toBe(true);
		});
	});
});
