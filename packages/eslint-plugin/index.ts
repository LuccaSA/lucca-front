import tsErrorRule, { RULE_NAME as tsErrorRuleName } from './rules/ts-error.ts';

const plugin = {
	meta: {
		name: '@lucca-front/eslint-plugin',
		version: '1.0.0',
	},
	rules: {
		[tsErrorRuleName]: tsErrorRule,
	},
};

export default plugin;
