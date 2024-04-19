'use strict';

/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],

	rules: {
		// SCSS specific
		// ============================================================================================
		'scss/at-mixin-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (mixinName) => `Expected "${mixinName}" to match pattern --foo(-bar(Baz)*)*`,
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
			},
		],
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
		'number-max-precision': 3,
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['scrollbar-3dlight-color'],
			},
		],
		'selector-class-pattern': [
			'^([a-z][a-zA-Z0-9]*)((-(([a-z0-9]+[a-zA-Z0-9]*)|([A-Z]+))+)*)$',
			{
				message: (selectorClass) => `Expected "${selectorClass}" to match pattern --foo(-bar(Baz)*)*`,
			},
		],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['ng-deep'],
			},
		],
		'value-keyword-case': [
			'lower',
			{
				severity: 'warning',
			},
		],
	},
};
