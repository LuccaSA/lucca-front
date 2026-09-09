import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ELuDateGranularity } from '../date-granularity.enum';
import { LuNativeDateAdapter } from './native-date.adapter';
import { ILuNativeDateAdapterOptions } from './native-date.option';

registerLocaleData(localeFr, 'fr-FR');

describe('LuNativeDateAdapter', () => {
	// 'en' short date format is M/d/yy, so parsable inputs are month-first
	let adapter: LuNativeDateAdapter;
	// 'fr-FR' short date format is dd/MM/y, so parsable inputs are date-first
	let frAdapter: LuNativeDateAdapter;

	beforeEach(() => {
		adapter = new LuNativeDateAdapter('en', { useUtc: false });
		frAdapter = new LuNativeDateAdapter('fr-FR', { useUtc: false });
	});

	describe('date part order', () => {
		it('should read the first group as the month in a month-first locale', () => {
			// Act
			const result = adapter.parse('01/02/2022', ELuDateGranularity.day);

			// Assert
			expect(result).toEqual(new Date(2022, 0, 2));
		});

		it('should read the first group as the date in a date-first locale', () => {
			// Act
			const result = frAdapter.parse('01/02/2022', ELuDateGranularity.day);

			// Assert
			expect(result).toEqual(new Date(2022, 1, 1));
		});

		it('should only accept a month-first text in a month-first locale', () => {
			// Act & Assert
			expect(adapter.isParsable('12/25/2022')).toBe(true);
			expect(adapter.isParsable('25/12/2022')).toBe(false);
		});

		it('should only accept a date-first text in a date-first locale', () => {
			// Act & Assert
			expect(frAdapter.isParsable('25/12/2022')).toBe(true);
			expect(frAdapter.isParsable('12/25/2022')).toBe(false);
		});
	});

	describe('isParsable', () => {
		describe('day granularity', () => {
			test.each`
				text              | expectedResult
				${'01/01/2022'}   | ${true}
				${'12/25/2022'}   | ${true}
				${'1/1/2022'}     | ${true}
				${'02/29/2024'}   | ${true}
				${'02/29/2023'}   | ${false}
				${'02/31/2022'}   | ${false}
				${'13/01/2022'}   | ${false}
				${'01/32/2022'}   | ${false}
				${'01/00/2022'}   | ${false}
				${'01/2022'}      | ${false}
				${'01/01/01/22'}  | ${false}
				${'2022'}         | ${false}
				${'nope'}         | ${false}
				${'aa/bb/cccc'}   | ${false}
				${''}             | ${false}
				${'Invalid Date'} | ${false}
			`('should return $expectedResult for "$text"', ({ text, expectedResult }: { text: string; expectedResult: boolean }) => {
				// Act
				const result = adapter.isParsable(text, ELuDateGranularity.day);

				// Assert
				expect(result).toBe(expectedResult);
			});

			it('should use the day granularity by default', () => {
				// Act & Assert
				expect(adapter.isParsable('12/25/2022')).toBe(true);
				expect(adapter.isParsable('12/2022')).toBe(false);
			});

			it('should reject a date rolled over by the JS engine, such as the 31st of february', () => {
				// Act & Assert
				expect(frAdapter.isParsable('31/02/2022', ELuDateGranularity.day)).toBe(false);
			});

			test.each`
				separator  | text
				${'slash'} | ${'01/01/2022'}
				${'dash'}  | ${'01-01-2022'}
				${'dot'}   | ${'01.01.2022'}
				${'comma'} | ${'01,01,2022'}
				${'space'} | ${'01 01 2022'}
			`('should accept a $separator separator', ({ text }: { text: string }) => {
				// Act
				const result = adapter.isParsable(text, ELuDateGranularity.day);

				// Assert
				expect(result).toBe(true);
			});
		});

		describe('month granularity', () => {
			test.each`
				text            | expectedResult
				${'03/2022'}    | ${true}
				${'12/2022'}    | ${true}
				${'13/2022'}    | ${false}
				${'00/2022'}    | ${false}
				${'2022'}       | ${false}
				${'03/15/2022'} | ${false}
				${''}           | ${false}
			`('should return $expectedResult for "$text"', ({ text, expectedResult }: { text: string; expectedResult: boolean }) => {
				// Act
				const result = adapter.isParsable(text, ELuDateGranularity.month);

				// Assert
				expect(result).toBe(expectedResult);
			});
		});

		describe('year granularity', () => {
			// a year below 100 is remapped to the 1900s by the Date constructor, so it never
			// round-trips and is reported as not parsable
			test.each`
				text         | expectedResult
				${'2022'}    | ${true}
				${'1900'}    | ${true}
				${'99'}      | ${false}
				${'0'}       | ${false}
				${'03/2022'} | ${false}
				${'nope'}    | ${false}
				${''}        | ${false}
			`('should return $expectedResult for "$text"', ({ text, expectedResult }: { text: string; expectedResult: boolean }) => {
				// Act
				const result = adapter.isParsable(text, ELuDateGranularity.year);

				// Assert
				expect(result).toBe(expectedResult);
			});
		});

		describe('year upper bound', () => {
			// From 10000 on, the ISO string becomes +010000-01-01, which backends do not support
			test.each`
				text             | granularity                 | expectedResult
				${'01/01/9999'}  | ${ELuDateGranularity.day}   | ${true}
				${'01/01/10000'} | ${ELuDateGranularity.day}   | ${false}
				${'01/01/99999'} | ${ELuDateGranularity.day}   | ${false}
				${'01/9999'}     | ${ELuDateGranularity.month} | ${true}
				${'01/10000'}    | ${ELuDateGranularity.month} | ${false}
				${'9999'}        | ${ELuDateGranularity.year}  | ${true}
				${'10000'}       | ${ELuDateGranularity.year}  | ${false}
			`(
				'should return $expectedResult for "$text" with $granularity granularity',
				({ text, granularity, expectedResult }: { text: string; granularity: ELuDateGranularity; expectedResult: boolean }) => {
					// Act
					const result = adapter.isParsable(text, granularity);

					// Assert
					expect(result).toBe(expectedResult);
				},
			);
		});
	});

	describe('parse', () => {
		test.each`
			text            | granularity                 | expectedResult
			${'12/25/2022'} | ${ELuDateGranularity.day}   | ${new Date(2022, 11, 25)}
			${'1/2/2022'}   | ${ELuDateGranularity.day}   | ${new Date(2022, 0, 2)}
			${'03/2022'}    | ${ELuDateGranularity.month} | ${new Date(2022, 2, 1)}
			${'2022'}       | ${ELuDateGranularity.year}  | ${new Date(2022, 0, 1)}
		`(
			'should return $expectedResult when parsing "$text" with $granularity granularity',
			({ text, granularity, expectedResult }: { text: string; granularity: ELuDateGranularity; expectedResult: Date }) => {
				// Act
				const result = adapter.parse(text, granularity);

				// Assert
				expect(result).toEqual(expectedResult);
			},
		);

		it('should use the day granularity by default', () => {
			// Act
			const result = adapter.parse('12/25/2022');

			// Assert
			expect(result).toEqual(new Date(2022, 11, 25));
		});

		it('should honour the locale date part order', () => {
			// Act
			const result = frAdapter.parse('25/12/2022', ELuDateGranularity.day);

			// Assert
			expect(result).toEqual(new Date(2022, 11, 25));
		});

		test.each`
			text             | granularity
			${'02/31/2022'}  | ${ELuDateGranularity.day}
			${'01/01/10000'} | ${ELuDateGranularity.day}
			${'nope'}        | ${ELuDateGranularity.day}
			${'13/2022'}     | ${ELuDateGranularity.month}
			${'03/2022'}     | ${ELuDateGranularity.year}
		`('should return an invalid date when parsing "$text" with $granularity granularity', ({ text, granularity }: { text: string; granularity: ELuDateGranularity }) => {
			// Act
			const result = adapter.parse(text, granularity);

			// Assert
			expect(result).toBeInstanceOf(Date);
			expect(adapter.isValid(result as Date)).toBe(false);
		});

		it('should return undefined when the text is empty', () => {
			// Act
			const result = adapter.parse('', ELuDateGranularity.day);

			// Assert
			expect(result).toBeUndefined();
		});
	});

	describe('forge', () => {
		it('should build a date from a 1-based month', () => {
			// Act
			const result = adapter.forge(2022, 3, 15);

			// Assert
			expect(result).toEqual(new Date(2022, 2, 15));
		});

		it('should overflow to the next month when the date exceeds the month length', () => {
			// Act
			const result = adapter.forge(2022, 1, 32);

			// Assert
			expect(result).toEqual(new Date(2022, 1, 1));
		});

		it('should overflow to the next year when the month exceeds 12', () => {
			// Act
			const result = adapter.forge(2022, 13, 1);

			// Assert
			expect(result).toEqual(new Date(2023, 0, 1));
		});
	});

	describe('forgeToday', () => {
		it('should return today at midnight', () => {
			// Arrange
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			// Act
			const result = adapter.forgeToday();

			// Assert
			expect(result).toEqual(today);
		});
	});

	describe('forgeInvalid', () => {
		it('should return an invalid date', () => {
			// Act
			const result = adapter.forgeInvalid();

			// Assert
			expect(result).toBeInstanceOf(Date);
			expect(adapter.isValid(result)).toBe(false);
		});
	});

	describe('isValid', () => {
		it('should return true for a valid date', () => {
			// Act & Assert
			expect(adapter.isValid(new Date(2022, 2, 15))).toBe(true);
		});

		test.each`
			label             | value
			${'invalid date'} | ${new Date('nope')}
			${'null'}         | ${null}
			${'undefined'}    | ${undefined}
			${'date string'}  | ${'2022-03-15'}
			${'timestamp'}    | ${1647302400000}
		`('should return false for a $label', ({ value }: { value: unknown }) => {
			// Act
			const result = adapter.isValid(value as Date);

			// Assert
			expect(result).toBe(false);
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
			const result = adapter.format(new Date(2022, 2, 15), format);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should format month names in the adapter locale', () => {
			// Act
			const result = frAdapter.format(new Date(2022, 2, 15), 'MMMM');

			// Assert
			expect(result).toEqual('mars');
		});
	});

	describe('clone', () => {
		it('should return an equal date', () => {
			// Arrange
			const date = new Date(2022, 2, 15);

			// Act
			const result = adapter.clone(date);

			// Assert
			expect(result).toEqual(date);
		});

		it('should not return the same reference', () => {
			// Arrange
			const date = new Date(2022, 2, 15);

			// Act
			const result = adapter.clone(date);

			// Assert
			expect(result).not.toBe(date);
		});
	});

	describe('getters', () => {
		it('should return the year', () => {
			expect(adapter.getYear(new Date(2022, 2, 15))).toBe(2022);
		});

		it('should return the 1-based month', () => {
			expect(adapter.getMonth(new Date(2022, 2, 15))).toBe(3);
		});

		it('should return the date of the month', () => {
			expect(adapter.getDate(new Date(2022, 2, 15))).toBe(15);
		});

		it('should return the day of the week', () => {
			// 2022-03-15 is a Tuesday
			expect(adapter.getDay(new Date(2022, 2, 15))).toBe(2);
		});

		it('should return 0 for a sunday', () => {
			// 2022-03-20 is a Sunday
			expect(adapter.getDay(new Date(2022, 2, 20))).toBe(0);
		});
	});

	describe('add', () => {
		test.each`
			count | granularity                  | expectedResult
			${1}  | ${ELuDateGranularity.day}    | ${new Date(2022, 0, 2)}
			${-1} | ${ELuDateGranularity.day}    | ${new Date(2021, 11, 31)}
			${1}  | ${ELuDateGranularity.month}  | ${new Date(2022, 1, 1)}
			${-2} | ${ELuDateGranularity.month}  | ${new Date(2021, 10, 1)}
			${1}  | ${ELuDateGranularity.year}   | ${new Date(2023, 0, 1)}
			${1}  | ${ELuDateGranularity.decade} | ${new Date(2032, 0, 1)}
			${0}  | ${ELuDateGranularity.day}    | ${new Date(2022, 0, 1)}
		`(
			'should return $expectedResult when adding $count $granularity to 2022-01-01',
			({ count, granularity, expectedResult }: { count: number; granularity: ELuDateGranularity; expectedResult: Date }) => {
				// Act
				const result = adapter.add(new Date(2022, 0, 1), count, granularity);

				// Assert
				expect(result).toEqual(expectedResult);
			},
		);

		it('should cross the month boundary when adding days', () => {
			// Act
			const result = adapter.add(new Date(2022, 0, 31), 1, ELuDateGranularity.day);

			// Assert
			expect(result).toEqual(new Date(2022, 1, 1));
		});

		it('should overflow instead of clamping when adding a month lands on a shorter month', () => {
			// Act
			const result = adapter.add(new Date(2022, 0, 31), 1, ELuDateGranularity.month);

			// Assert
			// 2022-02-31 does not exist and rolls over to march instead of being clamped to 02-28
			expect(result).toEqual(new Date(2022, 2, 3));
		});
	});

	describe('useUtc option', () => {
		let utcAdapter: LuNativeDateAdapter;

		beforeEach(() => {
			utcAdapter = new LuNativeDateAdapter('en', { useUtc: true });
		});

		it('should forge a date at UTC midnight', () => {
			// Act
			const result = utcAdapter.forge(2022, 3, 15);

			// Assert
			expect(result.toISOString()).toEqual('2022-03-15T00:00:00.000Z');
		});

		it('should read the UTC parts of a date', () => {
			// Arrange
			const date = new Date(Date.UTC(2022, 2, 15));

			// Act & Assert
			expect(utcAdapter.getYear(date)).toBe(2022);
			expect(utcAdapter.getMonth(date)).toBe(3);
			expect(utcAdapter.getDate(date)).toBe(15);
			expect(utcAdapter.getDay(date)).toBe(2);
		});

		it('should parse into a UTC date', () => {
			// Act
			const result = utcAdapter.parse('03/15/2022', ELuDateGranularity.day);

			// Assert
			expect(result?.toISOString()).toEqual('2022-03-15T00:00:00.000Z');
		});

		it('should format in the UTC timezone', () => {
			// Act
			const result = utcAdapter.format(new Date(Date.UTC(2022, 2, 15)), 'yyyy-MM-dd');

			// Assert
			expect(result).toEqual('2022-03-15');
		});

		it('should fall back to the default options when none are provided', () => {
			// Arrange
			const defaultAdapter = new LuNativeDateAdapter('en', null as unknown as ILuNativeDateAdapterOptions);

			// Act
			const result = defaultAdapter.forge(2022, 3, 15);

			// Assert
			expect(result).toEqual(new Date(2022, 2, 15));
		});
	});
});
