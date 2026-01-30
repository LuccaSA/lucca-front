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
	],
};
