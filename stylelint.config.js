// Stylelint makes sure we all follow similar coding styles.
// It also checks for common mistakes.
//
// If needed, each rule can be ignored with stylelint-(dis|en)able: https://stylelint.io/user-guide/ignore-code
// Rules can also be applied per directory: https://stylelint.io/user-guide/configure/#overrides. VSCode does not take overrides into account.

module.exports = {
	extends: ['./packages/stylelint-config'],
	ignoreFiles: ['**/tests/**'],
	overrides: [
		{
			// TODO: Fix those rules after removing them.
			files: ['**/*.scss'],
			rules: {
				'block-no-empty': null,
				'no-descending-specificity': null,
				'no-duplicate-selectors': null,
				'scss/at-mixin-argumentless-call-parentheses': null,
			},
		},
	],
	rules: {},
};
