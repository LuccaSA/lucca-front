import { UserNamePipe } from './user-name.pipe';
import { IUser } from './user.model';

describe('UserNamePipe', () => {
	let user: IUser;
	beforeEach(() => {
		user = <IUser>{ firstName: 'John', lastName: 'Doe' };
	});

	it('create an instance', () => {
		const pipe = new UserNamePipe();
		expect(pipe).toBeTruthy();
	});

	it('should return the right value with \'lf\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'lf')).toBe('Doe John');
	});

	it('should return the right value with \'Lf\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'Lf')).toBe('D. John');
	});

	it('should return the right value with \'LF\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'LF')).toBe('DJ');
	});

	it('should return the right value with \'lF\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'lF')).toBe('Doe J.');
	});

	it('should return the right value with \'fl\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'fl')).toBe('John Doe');
	});

	it('should return the right value with \'Fl\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'Fl')).toBe('J. Doe');
	});

	it('should return the right value with \'FL\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'FL')).toBe('JD');
	});

	it('should return the right value with \'fL\' format', () => {
		const pipe = new UserNamePipe();
		expect(pipe.transform(user, 'fL')).toBe('John D.');
	});
});
