import { IntlParamsPipe } from './intl-params.pipe';

describe('IntlParamsPipe', () => {
	it('create an instance', () => {
		const pipe = new IntlParamsPipe();
		expect(pipe).toBeTruthy();
	});

	it('applies params properly', () => {
		const pipe = new IntlParamsPipe();
		expect(pipe.transform('Hello {{param}}', { param: 'World' })).toEqual('Hello World');
	});
});
