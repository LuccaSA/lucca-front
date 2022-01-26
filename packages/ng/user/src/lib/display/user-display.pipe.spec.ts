import { LuUserDisplayPipe } from './user-display.pipe';
import { ILuUser } from '../user.model';
import {
	LuDisplayFullname,
	LuDisplayHybrid,
	LuDisplayInitials,
} from './display-format.model';

describe('UserNamePipe', () => {
	let user: ILuUser;
	beforeEach(() => {
		user = <ILuUser>{ firstName: 'John', lastName: 'Doe' };
	});

	it('create an instance', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe).toBeTruthy();
	});

	it('should return the right value with \'lf\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayFullname.lastfirst)).toBe('Doe John');
	});

	it('should return the right value with \'Lf\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayHybrid.lastIfirstFull)).toBe('D. John');
	});

	it('should return the right value with \'LF\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayInitials.lastfirst)).toBe('DJ');
	});

	it('should return the right value with \'lF\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayHybrid.lastFullfirstI)).toBe('Doe J.');
	});

	it('should return the right value with \'l\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayFullname.last)).toBe('Doe');
	});

	it('should return the right value with \'L\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayInitials.last)).toBe('D');
	});

	it('should return the right value with \'fl\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayFullname.firstlast)).toBe('John Doe');
	});

	it('should return the right value with \'Fl\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayHybrid.firstIlastFull)).toBe('J. Doe');
	});

	it('should return the right value with \'FL\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayInitials.firstlast)).toBe('JD');
	});

	it('should return the right value with \'fL\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayHybrid.firstFulllastI)).toBe('John D.');
	});

	it('should return the right value with \'f\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayFullname.first)).toBe('John');
	});

	it('should return the right value with \'F\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, LuDisplayInitials.first)).toBe('J');
	});
});
