/** @type {import('stylelint').Config} */

export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],

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
		'scss/dollar-variable-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (variable) => `Expected "${variable}" to match pattern $foo(-bar(Baz)*)*`,
			},
		],
		'scss/percent-placeholder-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (placeholder) => `Expected "${placeholder}" to match pattern %foo(-bar(Baz)*)*`,
			},
		],
		'scss/comment-no-empty': null,

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
				except: ['blockless-after-blockless', 'first-nested'],
				ignore: ['after-comment'],
				ignoreAtRules: ['else'],
			},
		],
		// This rule can create issues when using custom properties provided by LF with the format `r, g, b`,
		// resulting in a mixed syntax `r, g, b / a` instead of `r g b / a`.
		'color-function-notation': null,
		'color-hex-length': null,
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
		'keyframes-name-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (keyframeName) => `Expected "${keyframeName}" to match pattern foo(-bar(Baz)*)*`,
			},
		],
		'number-max-precision': 5,
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
	},
};
