// Stylelint makes sure we all follow similar coding styles.
// It also checks for common mistakes.
//
// If needed, each rule can be ignored with stylelint-(dis|en)able: https://stylelint.io/user-guide/ignore-code
// Rules can also be applied per directory: https://stylelint.io/user-guide/configure/#overrides. VSCode does not take overrides into account.

export default {
	extends: ['@lucca/stylelint-config-prisme'],
	ignoreFiles: ['**/tests/**'],
	overrides: [
		{
			// Allow common component files to be empty.
			files: [
				'packages/ng/**/*.scss',
				'stories/qa/**/*.scss',
				'**/component.scss',
				'**/responsive.scss',
				'**/mods.scss',
				'**/states.scss',
				'**/vars.scss',
			],
			rules: {
				'no-empty-source': null,
			},
		},
		{
			// Disable deprecation linting on deprecated elements.
			files: [
				'packages/ng/formly/**/*.scss',
				'packages/ng/styles/components/_input.scss',
				'packages/ng/styles/components/_picker.scss',
				'packages/ng/styles/definitions/**/*.scss',
				'packages/scss/src/components/checkbox/**/*.scss',
				'packages/scss/src/components/field/**/*.scss',
				'packages/scss/src/components/file/**/*.scss',
				'packages/scss/src/components/filters/**/*.scss',
				'packages/scss/src/components/header/**/*.scss',
				'packages/scss/src/components/label/**/*.scss',
				'packages/scss/src/components/layout/**/*.scss',
				'packages/scss/src/components/list/**/*.scss',
				'packages/scss/src/components/main/**/*.scss',
				'packages/scss/src/components/notchBox/**/*.scss',
				'packages/scss/src/components/radio/**/*.scss',
				'packages/scss/src/components/radioButtons/**/*.scss',
				'packages/scss/src/components/switch/**/*.scss',
				'packages/scss/src/components/table/**/*.scss',
				'packages/scss/src/components/tableFixed/**/*.scss',
				'packages/scss/src/components/tableFixedDeprecated/**/*.scss',
				'packages/scss/src/components/tableSticked/**/*.scss',
				'packages/scss/src/components/tableStickedDeprecated/**/*.scss',
				'packages/scss/src/components/textfields/**/*.scss',
			],
			rules: {
				'selector-disallowed-list': null,
			},
		},
	],
};
