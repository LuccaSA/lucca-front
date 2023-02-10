import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';
import { ILuUser } from '../user.model';
import { LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LU_DEFAULT_DISPLAY_POLICY } from './display-format.model';
import { luUserDisplay, LuUserDisplayPipe } from './user-display.pipe';

describe('UserNamePipe', () => {
	let user: ILuUser;
	beforeEach(() => {
		user = <ILuUser>{ firstName: 'John', lastName: 'Doe' };
	});

	describe('luUserDisplay()', () => {
		it("should return the right value with 'lf' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.lastfirst)).toBe('Doe John');
		});

		it("should return the right value with 'Lf' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.lastIfirstFull)).toBe('D. John');
		});

		it("should return the right value with 'LF' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.lastfirst)).toBe('DJ');
		});

		it("should return the right value with 'lF' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.lastFullfirstI)).toBe('Doe J.');
		});

		it("should return the right value with 'l' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.last)).toBe('Doe');
		});

		it("should return the right value with 'L' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.last)).toBe('D');
		});

		it("should return the right value with 'fl' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.firstlast)).toBe('John Doe');
		});

		it("should return the right value with 'Fl' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.firstIlastFull)).toBe('J. Doe');
		});

		it("should return the right value with 'FL' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.firstlast)).toBe('JD');
		});

		it("should return the right value with 'fL' format", () => {
			expect(luUserDisplay(user, LuDisplayHybrid.firstFulllastI)).toBe('John D.');
		});

		it("should return the right value with 'f' format", () => {
			expect(luUserDisplay(user, LuDisplayFullname.first)).toBe('John');
		});

		it("should return the right value with 'F' format", () => {
			expect(luUserDisplay(user, LuDisplayInitials.first)).toBe('J');
		});
	});

	describe('| luUserDisplay', () => {
		let spectator: SpectatorPipe<LuUserDisplayPipe>;
		const createPipe = createPipeFactory(LuUserDisplayPipe);

		it(`should return the right value with 'lf' format`, () => {
			spectator = createPipe(`{{ user | luUserDisplay }}`, {
				hostProps: {
					user,
				},
			});
			expect(spectator.element).toHaveText('Doe John');
		});

		it(`should return the right value with 'fl' format`, () => {
			const provider = { provide: LU_DEFAULT_DISPLAY_POLICY, useValue: LuDisplayFullname.firstlast };
			spectator = createPipe(`{{ user | luUserDisplay }}`, {
				hostProps: {
					user,
				},
				providers: [provider],
			});
			expect(spectator.element).toHaveText('John Doe');
		});
	});
});
