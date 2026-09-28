import { IntlParamsPipe } from './intl-params.pipe';

describe('IntlParamsPipe', () => {
	let pipe: IntlParamsPipe;

	beforeEach(() => {
		pipe = new IntlParamsPipe();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('applies params properly', () => {
		expect(pipe.transform('Hello {{param}}', { param: 'World' })).toEqual('Hello World');
	});

	it('should replace several distinct placeholders', () => {
		// Act
		const result = pipe.transform('{{greeting}}, {{name}}!', { greeting: 'Hello', name: 'World' });

		// Assert
		expect(result).toEqual('Hello, World!');
	});

	it('should replace every occurrence of the same placeholder', () => {
		// Act
		const result = pipe.transform('{{name}} & {{name}}', { name: 'Lucca' });

		// Assert
		expect(result).toEqual('Lucca & Lucca');
	});

	it('should stringify numeric params', () => {
		// Act
		const result = pipe.transform('{{count}} items', { count: 42 });

		// Assert
		expect(result).toEqual('42 items');
	});

	it('should replace a zero param instead of treating it as missing', () => {
		// Act
		const result = pipe.transform('{{count}} item(s)', { count: 0 });

		// Assert
		expect(result).toEqual('0 item(s)');
	});

	it('should replace an empty string param', () => {
		// Act
		const result = pipe.transform('Hello {{param}}!', { param: '' });

		// Assert
		expect(result).toEqual('Hello !');
	});

	it('should accept spaces around the placeholder key', () => {
		// Act
		const result = pipe.transform('Hello {{ param }}', { param: 'World' });

		// Assert
		expect(result).toEqual('Hello World');
	});

	it('should leave the placeholder untouched when the param has no value', () => {
		// Act
		const result = pipe.transform('Hello {{param}}', { other: 'World' });

		// Assert
		expect(result).toEqual('Hello {{param}}');
	});

	it('should leave the placeholder untouched when the param value is nullish', () => {
		// Act
		const result = pipe.transform('Hello {{param}}', { param: null as unknown as string });

		// Assert
		expect(result).toEqual('Hello {{param}}');
	});

	it('should leave every placeholder untouched when params are empty', () => {
		// Act
		const result = pipe.transform('{{greeting}}, {{name}}!', {});

		// Assert
		expect(result).toEqual('{{greeting}}, {{name}}!');
	});

	it('should replace known placeholders and keep unknown ones', () => {
		// Act
		const result = pipe.transform('{{greeting}}, {{name}}!', { greeting: 'Hello' });

		// Assert
		expect(result).toEqual('Hello, {{name}}!');
	});

	it('should return the value unchanged when it has no placeholder', () => {
		// Act
		const result = pipe.transform('Hello World', { param: 'unused' });

		// Assert
		expect(result).toEqual('Hello World');
	});

	it('should return an empty string unchanged', () => {
		// Act
		const result = pipe.transform('', { param: 'World' });

		// Assert
		expect(result).toEqual('');
	});
});
