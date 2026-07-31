import plugin, { createDeprecatedClassesConfig, DisallowedObject } from './index';

const deprecations: DisallowedObject[] = [{ objectPattern: /\.mod-link/ }, { objectPattern: /\.dialog-form/, versionDeleted: '22.0.0' }];

// The rule value is a [severity, options] tuple; narrow it for assertions.
const asEntry = (rule: unknown) => rule as [severity: string, options: { deprecations: DisallowedObject[] }];

describe('createDeprecatedClassesConfig', () => {
	it('registers the plugin and both rule ids at the right severities', () => {
		const config = createDeprecatedClassesConfig({ deprecations });

		expect(config.files).toEqual(['**/*.html']);
		expect(config.plugins['@lucca-front']).toBe(plugin);
		expect(asEntry(config.rules['@lucca-front/no-deprecated-classes'])[0]).toBe('warn');
		expect(asEntry(config.rules['@lucca-front/no-deleted-classes'])[0]).toBe('error');
	});

	it('defaults to no deletions: every entry goes to the warn bucket', () => {
		const config = createDeprecatedClassesConfig({ deprecations });

		expect(asEntry(config.rules['@lucca-front/no-deprecated-classes'])[1].deprecations).toHaveLength(2);
		expect(asEntry(config.rules['@lucca-front/no-deleted-classes'])[1].deprecations).toHaveLength(0);
	});

	it('partitions by isDeleted', () => {
		const config = createDeprecatedClassesConfig({
			deprecations,
			isDeleted: (entry) => entry.versionDeleted === '22.0.0',
		});

		expect(asEntry(config.rules['@lucca-front/no-deprecated-classes'])[1].deprecations).toEqual([{ objectPattern: /\.mod-link/ }]);
		expect(asEntry(config.rules['@lucca-front/no-deleted-classes'])[1].deprecations).toEqual([{ objectPattern: /\.dialog-form/, versionDeleted: '22.0.0' }]);
	});

	it('honours a custom files glob', () => {
		const config = createDeprecatedClassesConfig({ deprecations, files: ['src/**/*.html'] });

		expect(config.files).toEqual(['src/**/*.html']);
	});
});
