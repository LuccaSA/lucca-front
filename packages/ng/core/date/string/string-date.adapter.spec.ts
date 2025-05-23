import { ELuDateGranularity } from '../date-granularity.enum';
import { LuStringDateAdapter } from './string-date.adapter';

describe('LuStringDateAdapter', () => {
	let adapter: LuStringDateAdapter;

	beforeEach(() => {
		adapter = new LuStringDateAdapter('en');
	});

	test.each`
		date             | expectedResult
		${'01/01/2022'}  | ${'2022-01-01'}
		${'01/01/20222'} | ${'Invalid Date'}
		${'2/1/23'}      | ${'2023-02-01'}
	`('should return $expectedResult when parsing $date', ({ date, expectedResult }: { date: string; expectedResult: string }) => {
		// Act
		const result = adapter.parse(date, ELuDateGranularity.day);

		// Assert
		expect(result).toEqual(expectedResult);
	});
});
