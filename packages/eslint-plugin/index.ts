import noDeprecatedClassesRule, { RULE_NAME as noDeprecatedClassesRuleName } from './rules/no-deprecated-classes.ts';
import tsErrorRule, { RULE_NAME as tsErrorRuleName } from './rules/ts-error.ts';

const plugin = {
	meta: {
		name: '@lucca-front/eslint-plugin',
		version: '1.0.0',
	},
	rules: {
		[tsErrorRuleName]: tsErrorRule,
		[noDeprecatedClassesRuleName]: noDeprecatedClassesRule,
	},
};

export default plugin;
