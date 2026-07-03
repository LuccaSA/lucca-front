import * as templateParser from '@angular-eslint/template-parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule, { Options, RULE_NAME, setDeprecationMessageBuilder } from './no-deprecated-classes';

// Stands in for stylelint-config's getDisallowedData().message (index.ts injects the real one)
setDeprecationMessageBuilder((_deprecations, matchedSelector) => `stylelint says: ${matchedSelector}`);

const ruleTester = new RuleTester({
	languageOptions: {
		parser: templateParser,
	},
});

// Representative subset of @lucca-front/stylelint-config's LFDeprecatedSelectors,
// passed raw, the way eslint.config.mjs feeds them.
const options: Options = [
	{
		deprecations: [
			{ objectPattern: [/\.u-textLight/, /\.mod-outline\b/, /\.mod-link/] },
			{
				// Combination of .button and .mod-counter on the same element
				objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\bmod-counter\b)\S*/,
				versionDeleted: '18.1.0',
			},
			{
				objectPattern: /\.palette-(grey|primary|secondary|lucca)/,
				versionDeprecated: '17.3.0',
				versionDeleted: '22.0.0',
			},
			{
				// String entries are exact selector matches (stylelint's comparePatterns)
				objectPattern: '.exact-legacy',
			},
		],
	},
];

ruleTester.run(RULE_NAME, rule, {
	valid: [
		{
			name: '✅ Non-deprecated static classes',
			code: `<button class="button mod-S">Hello</button>`,
			options,
		},
		{
			name: '✅ Word boundary is respected (.mod-outlined is not .mod-outline)',
			code: `<div class="mod-outlined"></div>`,
			options,
		},
		{
			name: '✅ Combination pattern requires both classes on the same element',
			code: `<button class="button"><span class="mod-counter"></span></button>`,
			options,
		},
		{
			name: '✅ Non-deprecated class binding',
			code: `<div [class.is-active]="active"></div>`,
			options,
		},
		{
			name: '✅ Non-deprecated ngClass object literal',
			code: `<div [ngClass]="{ 'is-active': active }"></div>`,
			options,
		},
		{
			name: '✅ Deprecated token in a non-class attribute is ignored',
			code: `<div title="u-textLight" [luTooltip]="'mod-link'"></div>`,
			options,
		},
		{
			name: '✅ String entry only matches the exact selector',
			code: `<div class="exact-legacy other"></div>`,
			options,
		},
		{
			name: '✅ No options configured',
			code: `<div class="u-textLight"></div>`,
		},
	],
	invalid: [
		{
			name: '❌ Deprecated static class, message from the injected builder',
			code: `<span class="u-textLight">text</span>`,
			options,
			errors: [{ messageId: 'deprecatedClass', data: { deprecationMessage: 'stylelint says: .u-textLight' } }],
		},
		{
			name: '❌ Deprecated class combination, regardless of order',
			code: `<button class="mod-counter button">3</button>`,
			options,
			errors: [{ messageId: 'deprecatedClass', data: { deprecationMessage: 'stylelint says: .mod-counter.button' } }],
		},
		{
			name: '❌ Deprecated class with versions',
			code: `<div class="palette-grey"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class matched by a string entry',
			code: `<div class="exact-legacy"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass', data: { deprecationMessage: 'stylelint says: .exact-legacy' } }],
		},
		{
			name: '❌ Deprecated class in [class.x] binding',
			code: `<a [class.mod-link]="isLink">link</a>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class in ngClass object literal',
			code: `<div [ngClass]="{ 'palette-grey': cond }"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class as unquoted ngClass object key',
			code: `<div [ngClass]="{ modLink: cond }"></div>`,
			options: [{ deprecations: [{ objectPattern: /\.modLink\b/ }] }],
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class in static ngClass attribute',
			code: `<div ngClass="u-textLight"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class in [class] expression string literal',
			code: `<div [class]="cond ? 'mod-link' : 'safe'"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class in static part of interpolated class attribute',
			code: `<div class="u-textLight {{ dynamic }}"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Deprecated class in interpolation expression string literal',
			code: `<div class="{{ cond ? 'mod-link' : '' }}"></div>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }],
		},
		{
			name: '❌ Multiple deprecation entries on one attribute report separately',
			code: `<button class="button mod-counter u-textLight">3</button>`,
			options,
			errors: [{ messageId: 'deprecatedClass' }, { messageId: 'deprecatedClass' }],
		},
	],
});
