/** @type {import('stylelint').Config} */

import LFDeprecatedProperties from './LFDeprecatedProperties.mjs';
import LFDeprecatedSelectors from './LFDeprecatedSelectors.mjs';
import { getDisallowedObjects, getDisallowedData } from './stylelintForLF.mjs';

export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
	overrides: [
		{
			files: ['**/*.scss'],
			rules: {
				// Disable for now because of bugs with SCSS files.
				// SEE https://github.com/stylelint-scss/stylelint-config-standard-scss/issues/252
				'no-invalid-position-declaration': null,
			},
		},
		{
			// Allow common component files to be empty.
			files: ['**/vars.scss'],
			rules: {
				'custom-property-empty-line-before': null,
			},
		},
	],
	rules: {
		// SCSS specific
		// ============================================================================================
		'scss/at-function-pattern': [
			'^(([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)|[A-Z]+)$',
			{
				message: (functionName) => `Expected "${functionName}" to match pattern foo(-bar(Baz)*)*`,
			},
		],
		'scss/at-mixin-pattern': [
			'^(([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)|[A-Z]+)$',
			{
				message: `Expected @mixin name to match pattern foo(-bar(Baz)*)*`,
			},
		],
		'scss/at-rule-conditional-no-parentheses': null,
		'scss/comment-no-empty': null,
		'scss/dollar-variable-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment', 'after-dollar-variable'],
			},
		],
		'scss/dollar-variable-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (variable) => `Expected "${variable}" to match pattern $foo(-bar(Baz)*)*`,
			},
		],
		'scss/operator-no-newline-before': null,
		'scss/percent-placeholder-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (placeholder) => `Expected "${placeholder}" to match pattern %foo(-bar(Baz)*)*`,
			},
		],

		// Generic rules
		// ============================================================================================
		'alpha-value-notation': [
			'number',
			{
				severity: 'warning',
			},
		],
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment', 'blockless-after-same-name-blockless'],
				ignoreAtRules: ['else'],
			},
		],
		'block-no-empty': null,
		'color-hex-length': null,
		'container-name-pattern': [
			'^(([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)|[A-Z]+)$',
			{
				message: (containerName) => `Expected "${containerName}" to match pattern foo(-bar(Baz)*)*`,
			},
		],
		'custom-property-empty-line-before': [
			'always',
			{
				severity: 'warning',
				except: ['after-comment', 'after-custom-property', 'first-nested'],
			},
		],
		'custom-property-no-missing-var-function': true,
		'custom-property-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (customProperty) => `Expected "${customProperty}" to match pattern --foo(-bar(Baz)*)*`,
			},
		],
		'declaration-block-no-redundant-longhand-properties': null,
		'declaration-empty-line-before': [
			'always',
			{
				severity: 'warning',
				except: ['after-comment', 'after-declaration', 'first-nested'],
			},
		],
		'declaration-property-value-disallowed-list': [
			{ '/.*/': getDisallowedObjects(LFDeprecatedProperties) },
			{
				url: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
				message: (property, value) => getDisallowedData(LFDeprecatedProperties, value).message,
				severity: (property, value) => getDisallowedData(LFDeprecatedProperties, value).severity,
			},
		],
		'keyframes-name-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (keyframeName) => `Expected "${keyframeName}" to match pattern foo(-bar(Baz)*)*`,
			},
		],
		'number-max-precision': 5,
		'property-disallowed-list': [
			getDisallowedObjects(LFDeprecatedProperties),
			{
				url: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
				message: (property) => getDisallowedData(LFDeprecatedProperties, property).message,
				severity: (property) => getDisallowedData(LFDeprecatedProperties, property).severity,
			},
		],
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['scrollbar-3dlight-color'],
			},
		],
		'selector-class-pattern': [
			'^([a-z][a-zA-Z0-9]*)(((-|_)(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (selectorClass) => `Expected "${selectorClass}" to match pattern .foo(-bar(Baz)*)*`,
			},
		],
		'selector-disallowed-list': [
			getDisallowedObjects(LFDeprecatedSelectors),
			{
				splitList: true,
				url: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
				message: (selector) => getDisallowedData(LFDeprecatedSelectors, selector).message,
				severity: (selector) => getDisallowedData(LFDeprecatedSelectors, selector).severity,
			},
		],
		'selector-id-pattern': [
			'^([a-z][a-zA-Z0-9]*)(((-|_)(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (selectorId) => `Expected "${selectorId}" to match pattern #foo(-bar(Baz)*)*`,
			},
		],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['ng-deep'],
			},
		],
		'value-keyword-case': null,

		// Formatting with @stylistic
		// SEE: https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/docs/user-guide/rules.md
		// ============================================================================================

		'@stylistic/block-closing-brace-newline-after': [
			'always-multi-line',
			{
				ignoreAtRules: ['if', 'else'],
			},
		],
		'@stylistic/indentation': 'tab',
		'@stylistic/max-line-length': null,
		'@stylistic/named-grid-areas-alignment': [
			true,
			{
				alignQuotes: true,
			},
		],

		'@stylistic/color-hex-case': null,
		'@stylistic/declaration-block-semicolon-space-before': null,
		'@stylistic/declaration-block-trailing-semicolon': null,
		'@stylistic/declaration-colon-newline-after': null,
		'@stylistic/declaration-colon-space-after': null,
		'@stylistic/declaration-colon-space-before': null,
		'@stylistic/function-comma-space-after': null,
		'@stylistic/number-leading-zero': null,
		'@stylistic/string-quotes': null,
		'@stylistic/value-list-comma-newline-after': null,
	},
};
