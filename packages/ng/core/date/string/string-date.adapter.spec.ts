import { ELuDateGranularity } from '../date-granularity.enum';
import { LuStringDateAdapter } from './string-date.adapter';

describe('LuStringDateAdapter', () => {
	let adapter: LuStringDateAdapter;

	beforeEach(() => {
		// 'en' short date format is M/d/yy, so parsable inputs are month-first
		adapter = new LuStringDateAdapter('en');
	});

	describe('forge', () => {
		it('should build an ISO 8601 date string', () => {
			// Act
			const result = adapter.forge(2022, 3, 15);

			// Assert
			expect(result).toEqual('2022-03-15');
		});

		it('should pad month and date with a leading zero', () => {
			// Act
			const result = adapter.forge(2022, 1, 2);

			// Assert
			expect(result).toEqual('2022-01-02');
		});

		it('should overflow to the next month when the date exceeds the month length', () => {
			// Act
			const result = adapter.forge(2022, 1, 32);

			// Assert
			expect(result).toEqual('2022-02-01');
		});
	});

	describe('forgeToday', () => {
		it('should return today as an ISO 8601 date string', () => {
			// Arrange
			const today = new Date().toISOString().substring(0, 10);

			// Act
			const result = adapter.forgeToday();

			// Assert
			expect(result).toEqual(today);
		});
	});

	describe('forgeInvalid', () => {
		it('should return the invalid date marker', () => {
			// Act
			const result = adapter.forgeInvalid();

			// Assert
			expect(result).toEqual('Invalid Date');
		});
	});

	describe('isValid', () => {
		// only checks that the string builds a valid Date: an out-of-range date such as
		// 2022-02-29 is rolled over by the JS engine and therefore reported as valid
		test.each`
			date              | expectedResult
			${'2022-03-15'}   | ${true}
			${'2022-02-29'}   | ${true}
			${'Invalid Date'} | ${false}
			${'not a date'}   | ${false}
			${''}             | ${false}
		`('should return $expectedResult for "$date"', ({ date, expectedResult }: { date: string; expectedResult: boolean }) => {
			// Act
			const result = adapter.isValid(date);

			// Assert
			expect(result).toBe(expectedResult);
		});
	});

	describe('isParsable', () => {
		test.each`
			text             | expectedResult
			${'01/01/2022'}  | ${true}
			${'12/25/2022'}  | ${true}
			${'13/25/2022'}  | ${false}
			${'02/30/2022'}  | ${false}
			${'01/01/20222'} | ${false}
			${'01/2022'}     | ${false}
			${'nope'}        | ${false}
			${''}            | ${false}
		`('should return $expectedResult for "$text"', ({ text, expectedResult }: { text: string; expectedResult: boolean }) => {
			// Act
			const result = adapter.isParsable(text);

			// Assert
			expect(result).toBe(expectedResult);
		});
	});

	describe('parse', () => {
		test.each`
			date             | granularity                 | expectedResult
			${'01/01/2022'}  | ${ELuDateGranularity.day}   | ${'2022-01-01'}
			${'12/25/2022'}  | ${ELuDateGranularity.day}   | ${'2022-12-25'}
			${'01/01/20222'} | ${ELuDateGranularity.day}   | ${'Invalid Date'}
			${'02/30/2022'}  | ${ELuDateGranularity.day}   | ${'Invalid Date'}
			${'03/2022'}     | ${ELuDateGranularity.month} | ${'2022-03-01'}
			${'2022'}        | ${ELuDateGranularity.year}  | ${'2022-01-01'}
		`(
			'should return $expectedResult when parsing $date with $granularity granularity',
			({ date, granularity, expectedResult }: { date: string; granularity: ELuDateGranularity; expectedResult: string }) => {
				// Act
				const result = adapter.parse(date, granularity);

				// Assert
				expect(result).toEqual(expectedResult);
			},
		);

		it('should return undefined when the text is empty', () => {
			// Act
			const result = adapter.parse('', ELuDateGranularity.day);

			// Assert
			expect(result).toBeUndefined();
		});
	});

	describe('format', () => {
		test.each`
			format            | expectedResult
			${'yyyy-MM-dd'}   | ${'2022-03-15'}
			${'dd/MM/yyyy'}   | ${'15/03/2022'}
			${'MMMM d, yyyy'} | ${'March 15, 2022'}
		`('should format 2022-03-15 as $expectedResult with "$format"', ({ format, expectedResult }: { format: string; expectedResult: string }) => {
			// Act
			const result = adapter.format('2022-03-15', format);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('clone', () => {
		it('should return an equal date string', () => {
			// Act
			const result = adapter.clone('2022-03-15');

			// Assert
			expect(result).toEqual('2022-03-15');
		});
	});

	describe('getters', () => {
		it('should return the year', () => {
			expect(adapter.getYear('2022-03-15')).toBe(2022);
		});

		it('should return the 1-based month', () => {
			expect(adapter.getMonth('2022-03-15')).toBe(3);
		});

		it('should return the date of the month', () => {
			expect(adapter.getDate('2022-03-15')).toBe(15);
		});

		it('should return the day of the week', () => {
			// 2022-03-15 is a Tuesday
			expect(adapter.getDay('2022-03-15')).toBe(2);
		});

		it('should return 0 for a sunday', () => {
			// 2022-03-20 is a Sunday
			expect(adapter.getDay('2022-03-20')).toBe(0);
		});
	});

	describe('add', () => {
		test.each`
			count | granularity                  | expectedResult
			${1}  | ${ELuDateGranularity.day}    | ${'2022-01-02'}
			${-1} | ${ELuDateGranularity.day}    | ${'2021-12-31'}
			${1}  | ${ELuDateGranularity.month}  | ${'2022-02-01'}
			${-2} | ${ELuDateGranularity.month}  | ${'2021-11-01'}
			${1}  | ${ELuDateGranularity.year}   | ${'2023-01-01'}
			${1}  | ${ELuDateGranularity.decade} | ${'2032-01-01'}
			${0}  | ${ELuDateGranularity.day}    | ${'2022-01-01'}
		`(
			'should return $expectedResult when adding $count $granularity to 2022-01-01',
			({ count, granularity, expectedResult }: { count: number; granularity: ELuDateGranularity; expectedResult: string }) => {
				// Act
				const result = adapter.add('2022-01-01', count, granularity);

				// Assert
				expect(result).toEqual(expectedResult);
			},
		);

		it('should cross the month boundary when adding days', () => {
			// Act
			const result = adapter.add('2022-01-31', 1, ELuDateGranularity.day);

			// Assert
			expect(result).toEqual('2022-02-01');
		});
	});

	describe('compare', () => {
		test.each`
			a               | b               | granularity                  | expectedResult
			${'2022-03-15'} | ${'2022-03-16'} | ${ELuDateGranularity.day}    | ${-1}
			${'2022-03-16'} | ${'2022-03-15'} | ${ELuDateGranularity.day}    | ${1}
			${'2022-03-15'} | ${'2022-03-15'} | ${ELuDateGranularity.day}    | ${0}
			${'2022-03-15'} | ${'2022-03-16'} | ${ELuDateGranularity.month}  | ${0}
			${'2022-03-15'} | ${'2022-04-01'} | ${ELuDateGranularity.month}  | ${-1}
			${'2022-03-15'} | ${'2022-12-31'} | ${ELuDateGranularity.year}   | ${0}
			${'2022-03-15'} | ${'2029-03-15'} | ${ELuDateGranularity.decade} | ${0}
			${'2019-03-15'} | ${'2022-03-15'} | ${ELuDateGranularity.decade} | ${-1}
		`(
			'should return $expectedResult when comparing $a and $b with $granularity granularity',
			({ a, b, granularity, expectedResult }: { a: string; b: string; granularity: ELuDateGranularity; expectedResult: number }) => {
				// Act
				const result = adapter.compare(a, b, granularity);

				// Assert
				expect(result).toBe(expectedResult);
			},
		);

		it('should throw when one of the dates is invalid', () => {
			// Act & Assert
			expect(() => adapter.compare('2022-03-15', 'Invalid Date', ELuDateGranularity.day)).toThrowError('you must provide valid and not null dates to be compared');
		});

		it('should throw when one of the dates is null', () => {
			// Act & Assert
			expect(() => adapter.compare('2022-03-15', null as unknown as string, ELuDateGranularity.day)).toThrowError('you must provide valid and not null dates to be compared');
		});
	});
});
