import * as templateParser from '@angular-eslint/template-parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule, { RULE_NAME } from './no-deprecated-classes';

const ruleTester = new RuleTester({
	languageOptions: {
		parser: templateParser,
	},
});

// Representative subset of @lucca-front/stylelint-config's LFDeprecatedSelectors,
// as regex sources (RegExp#source), the way eslint.config.mjs feeds them.
const options: [{ deprecations: { patterns: string[]; versionDeprecated?: string; versionDeleted?: string }[] }] = [
	{
		deprecations: [
			{ patterns: ['\\.u-textLight', '\\.mod-outline\\b', '\\.mod-link'] },
			{
				// Combination of .button and .mod-counter on the same element
				patterns: ['(?=\\S*\\.\\bbutton\\b)(?=\\S*\\.\\bmod-counter\\b)\\S*'],
				versionDeleted: '18.1.0',
			},
			{
				patterns: ['\\.palette-(grey|primary|secondary|lucca)'],
				versionDeprecated: '17.3.0',
				versionDeleted: '22.0.0',
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
			name: '✅ No options configured',
			code: `<div class="u-textLight"></div>`,
		},
	],
	invalid: [
		{
			name: '❌ Deprecated static class',
			code: `<span class="u-textLight">text</span>`,
			options,
			errors: [{ messageId: 'deprecatedClass', data: { matched: '.u-textLight', versions: '' } }],
		},
		{
			name: '❌ Deprecated class combination, regardless of order',
			code: `<button class="mod-counter button">3</button>`,
			options,
			errors: [{ messageId: 'deprecatedClass', data: { matched: '.mod-counter.button', versions: ' | removed in LF 18.1.0' } }],
		},
		{
			name: '❌ Deprecated class with both versions in message',
			code: `<div class="palette-grey"></div>`,
			options,
			errors: [
				{
					messageId: 'deprecatedClass',
					data: { matched: '.palette-grey', versions: ' | deprecated since LF 17.3.0 | removed in LF 22.0.0' },
				},
			],
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
