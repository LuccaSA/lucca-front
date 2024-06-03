import { fakeAsync, tick } from '@angular/core/testing';
import { LuRelativeTime, LuRelativeTimeFormatUnit } from './humanize.model';
import { getRelativeTime, relativeTimeTimer } from './humanize.utils';

describe('HumanizeUtils', () => {
	describe('getRelativeTime', () => {
		interface TestCase {
			durationInMs: number;
			expectedUnit: LuRelativeTimeFormatUnit;
			expectedValue: number;
		}

		const minute = 60_000;
		const hour = 60 * minute;
		const day = 24 * hour;
		const week = 7 * day;

		describe('with all units', () => {
			const testCases: TestCase[] = [
				{ expectedUnit: 'second', expectedValue: 0, durationInMs: 0 },
				{ expectedUnit: 'second', expectedValue: 59, durationInMs: minute - 1 },
				{ expectedUnit: 'minute', expectedValue: 1, durationInMs: minute },
				{ expectedUnit: 'minute', expectedValue: 59, durationInMs: hour - 1 },
				{ expectedUnit: 'hour', expectedValue: 1, durationInMs: hour },
				{ expectedUnit: 'hour', expectedValue: 23, durationInMs: day - 1 },
				{ expectedUnit: 'day', expectedValue: 1, durationInMs: day },
				{ expectedUnit: 'day', expectedValue: 6, durationInMs: week - 1 },
				{ expectedUnit: 'week', expectedValue: 1, durationInMs: week },
				{ expectedUnit: 'week', expectedValue: 4, durationInMs: week * 4 },
				{ expectedUnit: 'month', expectedValue: 1, durationInMs: week * 5 },
				{ expectedUnit: 'month', expectedValue: 2, durationInMs: week * 10 },
			];

			// Positive times
			for (const { expectedUnit, expectedValue, durationInMs } of testCases) {
				it(`should return ${expectedValue} ${expectedUnit} when duration is ${durationInMs}`, () => {
					// Act
					const reference = new Date(2024, 0, 1).getTime();
					const { unit, value } = getRelativeTime(reference + durationInMs, reference);

					// Assert
					expect(unit).toBe(expectedUnit);
					expect(value).toBe(expectedValue);
				});
			}

			// Negative times (slice first element because +/-0 is the same value)
			for (const { expectedUnit, expectedValue, durationInMs } of testCases.slice(1)) {
				it(`should return ${-expectedValue} ${expectedUnit} when duration is ${-durationInMs}`, () => {
					// Act
					const reference = new Date(2024, 0, 1).getTime();
					const { unit, value } = getRelativeTime(reference - durationInMs, reference);

					// Assert
					expect(unit).toBe(expectedUnit);
					expect(value).toBe(-expectedValue);
				});
			}
		});

		describe('with only some units', () => {
			it('should return 0 with the nearest greater unit when no lower unit is allowed', () => {
				// Arrange
				const reference = new Date(2024, 0, 1).getTime();
				const durationInMs = 20 * hour;

				// Act
				const { unit, value } = getRelativeTime(reference + durationInMs, reference, ['day', 'month', 'year']);

				// Assert
				expect(unit).toBe('day');
				expect(value).toBe(0);
			});

			it('should return value with the nearest lower unit when one lower unit', () => {
				// Arrange
				const reference = new Date(2024, 0, 1).getTime();
				const durationInMs = 20 * hour;

				// Act
				const { unit, value } = getRelativeTime(reference + durationInMs, reference, ['minute', 'day', 'month', 'year']);

				// Assert
				expect(unit).toBe('minute');
				expect(value).toBe(20 * 60);
			});

			it('should return value the last unit when difference is greater than the last unit', () => {
				// Arrange
				const reference = new Date(2024, 0, 1).getTime();
				const durationInMs = 20 * hour;

				// Act
				const { unit, value } = getRelativeTime(reference + durationInMs, reference, ['second', 'minute']);

				// Assert
				expect(unit).toBe('minute');
				expect(value).toBe(20 * 60);
			});
		});
	});

	describe('relativeTimeTimer', () => {
		describe('past date', () => {
			it('should emit immedialty', () => {
				// Arrange
				const date = Date.now() - 55_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				expect(emittedValues).toEqual([{ unit: 'second', value: -55 }]);
				sub.unsubscribe();
			});

			it('should emit each second until one minute', fakeAsync(() => {
				// Arrange
				const date = Date.now() - 55_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];
				const lastValue = () => emittedValues[emittedValues.length - 1];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				expect(emittedValues).toEqual([{ unit: 'second', value: -55 }]);

				tick(1000);
				expect(emittedValues.length).toBe(2);
				expect(lastValue()).toEqual({ unit: 'second', value: -56 });

				tick(1000);
				expect(emittedValues.length).toBe(3);
				expect(lastValue()).toEqual({ unit: 'second', value: -57 });

				tick(1000);
				expect(emittedValues.length).toBe(4);
				expect(lastValue()).toEqual({ unit: 'second', value: -58 });

				tick(1000);
				expect(emittedValues.length).toBe(5);
				expect(lastValue()).toEqual({ unit: 'second', value: -59 });

				tick(1000);
				expect(emittedValues.length).toBe(6);
				expect(lastValue()).toEqual({ unit: 'minute', value: -1 });

				sub.unsubscribe();
			}));

			it('should emit each minute until one hour', fakeAsync(() => {
				// Arrange
				const date = Date.now() - 60_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];
				const lastValue = () => emittedValues[emittedValues.length - 1];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				for (let i = 1; i <= 58; i++) {
					tick(60_000);
					expect(emittedValues.length).toBe(i + 1);
					expect(lastValue()).toEqual({ unit: 'minute', value: -i - 1 });
				}

				tick(60_000);
				expect(emittedValues.length).toBe(60);
				expect(lastValue()).toEqual({ unit: 'hour', value: -1 });

				sub.unsubscribe();
			}));
		});

		describe('future date', () => {
			it('should emit immedialty', () => {
				// Arrange
				const date = Date.now() + 55_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				expect(emittedValues).toEqual([{ unit: 'second', value: 55 }]);
				sub.unsubscribe();
			});

			it('should emit each minute then each seconds', fakeAsync(() => {
				// Arrange
				const date = Date.now() + 120_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];
				const lastValue = () => emittedValues[emittedValues.length - 1];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				expect(emittedValues.length).toBe(1);
				expect(lastValue()).toEqual({ unit: 'minute', value: 2 });

				tick(60_000);
				expect(emittedValues.length).toBe(2);
				expect(lastValue()).toEqual({ unit: 'minute', value: 1 });

				tick(1_000);
				expect(emittedValues.length).toBe(3);
				expect(lastValue()).toEqual({ unit: 'second', value: 59 });

				tick(1_000);
				expect(emittedValues.length).toBe(4);
				expect(lastValue()).toEqual({ unit: 'second', value: 58 });

				sub.unsubscribe();
			}));
		});

		describe('from future to past', () => {
			it('should emit each secondes', fakeAsync(() => {
				// Arrange
				const date = Date.now() + 2_000;
				const relativeTime$ = relativeTimeTimer(date);
				const emittedValues: LuRelativeTime[] = [];
				const lastValue = () => emittedValues[emittedValues.length - 1];

				// Act
				const sub = relativeTime$.subscribe((relativeTime) => emittedValues.push(relativeTime));

				// Assert
				expect(emittedValues.length).toBe(1);
				expect(lastValue()).toEqual({ unit: 'second', value: 2 });

				tick(1_000);
				expect(emittedValues.length).toBe(2);
				expect(lastValue()).toEqual({ unit: 'second', value: 1 });

				tick(1_000);
				expect(emittedValues.length).toBe(3);
				expect(lastValue()).toEqual({ unit: 'second', value: 0 });

				tick(1_000);
				expect(emittedValues.length).toBe(4);
				expect(lastValue()).toEqual({ unit: 'second', value: -1 });

				tick(1_000);
				expect(emittedValues.length).toBe(5);
				expect(lastValue()).toEqual({ unit: 'second', value: -2 });

				sub.unsubscribe();
			}));
		});
	});
});
