import noDeprecatedClassesRule, { RULE_NAME as noDeprecatedClassesRuleName } from './rules/no-deprecated-classes.ts';
import tsErrorRule, { RULE_NAME as tsErrorRuleName } from './rules/ts-error.ts';

export { setDeprecationMessageBuilder } from './rules/no-deprecated-classes.ts';

const plugin = {
	meta: {
		name: '@lucca-front/eslint-plugin',
		version: '1.0.0',
	},
	rules: {
		[tsErrorRuleName]: tsErrorRule,
		// Same rule, registered under two ids so the config can give deprecated-but-not-yet-deleted
		// classes a `warn` severity and already-deleted ones an `error` (ESLint severity is per rule id).
		[noDeprecatedClassesRuleName]: noDeprecatedClassesRule,
		'no-deleted-classes': noDeprecatedClassesRule,
	},
};

export default plugin;
