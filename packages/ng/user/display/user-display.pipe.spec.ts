import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';
import { luUserDisplay, LuUserDisplayInput, LuUserDisplayPipe } from './user-display.pipe';

describe(LuUserDisplayPipe.name, () => {
	const users = [
		{ firstName: 'John', lastName: 'Doe' },
		{ firstName: 'Michael', lastName: 'Scott' },
		{ firstName: 'Dwight', lastName: 'Schrute' },
	];
	const user = users[0];
	const userFirst = { firstName: user.firstName, lastName: '' };
	const userLast = { firstName: '', lastName: user.lastName };
	const userWithNullLastName = { firstName: 'John', lastName: null } as unknown as LuUserDisplayInput;
	const userWithNullFirstName = { firstName: null, lastName: 'Doe' } as unknown as LuUserDisplayInput;
	const userWithNoLastName = { firstName: 'John' } as unknown as LuUserDisplayInput;
	const userWithNoFirstName = { lastName: 'Doe' } as unknown as LuUserDisplayInput;

	describe('luUserDisplay()', () => {
		describe('fallback when lastName is missing', () => {
			it('should fallback to first name (full) for fullname formats', () => {
				expect(luUserDisplay(userWithNullLastName, LuDisplayFullname.lastfirst)).toBe('John');
				expect(luUserDisplay(userWithNoLastName, LuDisplayFullname.firstlast)).toBe('John');
				expect(luUserDisplay(userWithNullLastName, LuDisplayFullname.last)).toBe('John');
			});

			it('should fallback to first name (initial) for initials formats', () => {
				expect(luUserDisplay(userWithNullLastName, LuDisplayInitials.lastfirst)).toBe('J');
				expect(luUserDisplay(userWithNoLastName, LuDisplayInitials.firstlast)).toBe('J');
				expect(luUserDisplay(userWithNullLastName, LuDisplayInitials.last)).toBe('J');
			});

			it('should fallback to first name (full) for hybrid formats containing f', () => {
				expect(luUserDisplay(userWithNullLastName, LuDisplayHybrid.lastIfirstFull)).toBe('John');
				expect(luUserDisplay(userWithNoLastName, LuDisplayHybrid.firstFulllastI)).toBe('John');
			});

			it('should fallback to first name (initial) for hybrid formats without f', () => {
				expect(luUserDisplay(userWithNullLastName, LuDisplayHybrid.firstIlastFull)).toBe('J');
				expect(luUserDisplay(userWithNoLastName, LuDisplayHybrid.lastFullfirstI)).toBe('J');
			});
		});

		describe('fallback when firstName is missing', () => {
			it('should fallback to last name (full) for fullname formats', () => {
				expect(luUserDisplay(userWithNullFirstName, LuDisplayFullname.lastfirst)).toBe('Doe');
				expect(luUserDisplay(userWithNoFirstName, LuDisplayFullname.firstlast)).toBe('Doe');
				expect(luUserDisplay(userWithNullFirstName, LuDisplayFullname.first)).toBe('Doe');
			});

			it('should fallback to last name (initial) for initials formats', () => {
				expect(luUserDisplay(userWithNullFirstName, LuDisplayInitials.lastfirst)).toBe('D');
				expect(luUserDisplay(userWithNoFirstName, LuDisplayInitials.firstlast)).toBe('D');
				expect(luUserDisplay(userWithNullFirstName, LuDisplayInitials.first)).toBe('D');
			});

			it('should fallback to last name (full) for hybrid formats containing l', () => {
				expect(luUserDisplay(userWithNullFirstName, LuDisplayHybrid.firstIlastFull)).toBe('Doe');
				expect(luUserDisplay(userWithNoFirstName, LuDisplayHybrid.lastFullfirstI)).toBe('Doe');
			});

			it('should fallback to last name (initial) for hybrid formats without l', () => {
				expect(luUserDisplay(userWithNullFirstName, LuDisplayHybrid.lastIfirstFull)).toBe('D');
				expect(luUserDisplay(userWithNoFirstName, LuDisplayHybrid.firstFulllastI)).toBe('D');
			});
		});

		it("should return the right value with 'lf' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.lastfirst)).toBe('Doe John');
			expect(luUserDisplay(userFirst, LuDisplayFullname.lastfirst)).toBe('John');
			expect(luUserDisplay(userLast, LuDisplayFullname.lastfirst)).toBe('Doe');
		});

		it("should return the right value with 'Lf' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.lastIfirstFull)).toBe('D. John');
			expect(luUserDisplay(userFirst, LuDisplayHybrid.lastIfirstFull)).toBe('John');
			expect(luUserDisplay(userLast, LuDisplayHybrid.lastIfirstFull)).toBe('D.');
		});

		it("should return the right value with 'LF' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.lastfirst)).toBe('DJ');
			expect(luUserDisplay(userFirst, LuDisplayInitials.lastfirst)).toBe('J');
			expect(luUserDisplay(userLast, LuDisplayInitials.lastfirst)).toBe('D');
		});

		it("should return the right value with 'lF' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.lastFullfirstI)).toBe('Doe J.');
			expect(luUserDisplay(userFirst, LuDisplayHybrid.lastFullfirstI)).toBe('J.');
			expect(luUserDisplay(userLast, LuDisplayHybrid.lastFullfirstI)).toBe('Doe');
		});

		it("should return the right value with 'l' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.last)).toBe('Doe');
			expect(luUserDisplay(userFirst, LuDisplayFullname.last)).toBe('');
			expect(luUserDisplay(userLast, LuDisplayFullname.last)).toBe('Doe');
		});

		it("should return the right value with 'L' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.last)).toBe('D');
			expect(luUserDisplay(userFirst, LuDisplayInitials.last)).toBe('');
			expect(luUserDisplay(userLast, LuDisplayInitials.last)).toBe('D');
		});

		it("should return the right value with 'fl' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.firstlast)).toBe('John Doe');
			expect(luUserDisplay(userFirst, LuDisplayFullname.firstlast)).toBe('John');
			expect(luUserDisplay(userLast, LuDisplayFullname.firstlast)).toBe('Doe');
		});

		it("should return the right value with 'Fl' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.firstIlastFull)).toBe('J. Doe');
			expect(luUserDisplay(userFirst, LuDisplayHybrid.firstIlastFull)).toBe('J.');
			expect(luUserDisplay(userLast, LuDisplayHybrid.firstIlastFull)).toBe('Doe');
		});

		it("should return the right value with 'FL' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.firstlast)).toBe('JD');
			expect(luUserDisplay(userFirst, LuDisplayInitials.firstlast)).toBe('J');
			expect(luUserDisplay(userLast, LuDisplayInitials.firstlast)).toBe('D');
		});

		it("should return the right value with 'fL' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.firstFulllastI)).toBe('John D.');
			expect(luUserDisplay(userFirst, LuDisplayHybrid.firstFulllastI)).toBe('John');
			expect(luUserDisplay(userLast, LuDisplayHybrid.firstFulllastI)).toBe('D.');
		});

		it("should return the right value with 'f' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.first)).toBe('John');
			expect(luUserDisplay(userFirst, LuDisplayFullname.first)).toBe('John');
			expect(luUserDisplay(userLast, LuDisplayFullname.first)).toBe('');
		});

		it("should return the right value with 'F' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.first)).toBe('J');
			expect(luUserDisplay(userFirst, LuDisplayInitials.first)).toBe('J');
			expect(luUserDisplay(userLast, LuDisplayInitials.first)).toBe('');
		});
	});

	describe('| luUserDisplay', () => {
		let spectator: SpectatorPipe<LuUserDisplayPipe>;
		const createPipe = createPipeFactory(LuUserDisplayPipe);

		it(`should return the right single value with default 'lf' format`, () => {
			spectator = createPipe(`{{ user | luUserDisplay }}`, {
				hostProps: {
					user,
				},
			});
			expect(spectator.element).toHaveText('Doe John');
		});

		it(`should return the right single value with provide 'fl' format`, () => {
			const provider = { provide: LU_DEFAULT_DISPLAY_POLICY, useValue: LuDisplayFullname.firstlast };
			spectator = createPipe(`{{ user | luUserDisplay }}`, {
				hostProps: {
					user,
				},
				providers: [provider],
			});
			expect(spectator.element).toHaveText('John Doe');
		});

		it(`should return the right single value with specify 'FL' format`, () => {
			spectator = createPipe(`{{ user | luUserDisplay:'FL' }}`, {
				hostProps: {
					user,
				},
			});
			expect(spectator.element).toHaveText('JD');
		});

		it(`should return the right multiple value with default 'lf' format and default ', ' separator`, () => {
			spectator = createPipe(`{{ users | luUserDisplay }}`, {
				hostProps: {
					users,
				},
			});
			expect(spectator.element).toHaveText('Doe John, Scott Michael, Schrute Dwight');
		});

		it(`should return the right multiple value with default 'lf' format and '; ' separator`, () => {
			spectator = createPipe(`{{ users | luUserDisplay:{ separator: '; ' } }}`, {
				hostProps: {
					users,
				},
			});
			expect(spectator.element).toHaveText('Doe John; Scott Michael; Schrute Dwight');
		});

		it(`should return the right multiple value with default 'Lf' format and default ', ' separator`, () => {
			spectator = createPipe(`{{ users | luUserDisplay:{ format: 'Lf' } }}`, {
				hostProps: {
					users,
				},
			});
			expect(spectator.element).toHaveText('D. John, S. Michael, S. Dwight');
		});

		it(`should return the right multiple value with specify 'Fl' format and ' ' separator`, () => {
			spectator = createPipe(`{{ users | luUserDisplay:{ format: 'Fl', separator: ' ' } }}`, {
				hostProps: {
					users,
				},
			});
			expect(spectator.element).toHaveText('J. Doe M. Scott D. Schrute');
		});

		it(`should return the right multiple value with specify 'fL' format and formatter`, () => {
			const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
			spectator = createPipe(`{{ users | luUserDisplay:{ format: 'fL', formatter } }}`, {
				hostProps: {
					users,
					formatter,
				},
			});
			expect(spectator.element).toHaveText('John D., Michael S., and Dwight S.');
		});

		it(`should return the right multiple value with default separator when formatter is undefined`, () => {
			spectator = createPipe(`{{ users | luUserDisplay:{ format: 'fL', formatter: undefined } }}`, {
				hostProps: {
					users,
				},
			});
			expect(spectator.element).toHaveText('John D., Michael S., Dwight S.');
		});
	});
});
