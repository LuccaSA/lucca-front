import { LuUserDisplayPipe } from './user-display.pipe';
import { IUser } from '../user.model';
import { DisplayFullname, DisplayHybrid, DisplayInitials } from './display-format.model';

describe('UserNamePipe', () => {
	let user: IUser;
	beforeEach(() => {
		user = <IUser>{ firstName: 'John', lastName: 'Doe' };
	});

	it('create an instance', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe).toBeTruthy();
	});

	it('should return the right value with \'lf\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayFullname.lastfirst)).toBe('Doe John');
	});

	it('should return the right value with \'Lf\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayHybrid.lastIfirstFull)).toBe('D. John');
	});

	it('should return the right value with \'LF\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayInitials.lastfirst)).toBe('DJ');
	});

	it('should return the right value with \'lF\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayHybrid.lastFullfirstI)).toBe('Doe J.');
	});

	it('should return the right value with \'l\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayFullname.last)).toBe('Doe');
	});

	it('should return the right value with \'L\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayInitials.last)).toBe('D');
	});

	it('should return the right value with \'fl\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayFullname.firstlast)).toBe('John Doe');
	});

	it('should return the right value with \'Fl\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayHybrid.firstIlastFull)).toBe('J. Doe');
	});

	it('should return the right value with \'FL\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayInitials.firstlast)).toBe('JD');
	});

	it('should return the right value with \'fL\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayHybrid.firstFulllastI)).toBe('John D.');
	});

	it('should return the right value with \'f\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayFullname.first)).toBe('John');
	});

	it('should return the right value with \'F\' format', () => {
		const pipe = new LuUserDisplayPipe();
		expect(pipe.transform(user, DisplayInitials.first)).toBe('J');
	});
});
