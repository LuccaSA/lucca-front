import noDeprecatedClassesRule, { RULE_NAME as noDeprecatedClassesRuleName, setDeprecationMessageBuilder } from './rules/no-deprecated-classes.ts';
import type { DisallowedObject } from './rules/no-deprecated-classes.ts';
import tsErrorRule, { RULE_NAME as tsErrorRuleName } from './rules/ts-error.ts';

export { setDeprecationMessageBuilder } from './rules/no-deprecated-classes.ts';
export type { DisallowedObject } from './rules/no-deprecated-classes.ts';

const DELETED_RULE_NAME = 'no-deleted-classes';

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
		[DELETED_RULE_NAME]: noDeprecatedClassesRule,
	},
};

interface DeprecatedClassesConfigOptions {
	/** Deprecation entries, e.g. stylelint-config's LFDeprecatedSelectors. */
	deprecations: DisallowedObject[];
	/** Globs the rules apply to (default: Angular templates). */
	files?: string[];
	/** Formats the message from the matched entry + selector (default: a plain message). */
	buildMessage?: (deprecations: DisallowedObject[], matchedSelector: string) => string;
	/** Marks an entry already deleted → `error`; the rest are `warn` (default: nothing deleted). */
	isDeleted?: (entry: DisallowedObject) => boolean;
}

/**
 * One-call flat-config block for the deprecated/deleted class rules, with the version-aware split.
 * Data-agnostic: any Angular project passes its own list, message formatter and severity policy.
 */
export function createDeprecatedClassesConfig({ deprecations, files = ['**/*.html'], buildMessage, isDeleted = () => false }: DeprecatedClassesConfigOptions) {
	if (buildMessage) setDeprecationMessageBuilder(buildMessage);

	return {
		files,
		plugins: { '@lucca-front': plugin },
		rules: {
			[`@lucca-front/${noDeprecatedClassesRuleName}`]: ['warn', { deprecations: deprecations.filter((e) => !isDeleted(e)) }],
			[`@lucca-front/${DELETED_RULE_NAME}`]: ['error', { deprecations: deprecations.filter(isDeleted) }],
		},
	};
}

export default plugin;
