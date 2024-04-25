# lucca-front / Stylelint config

This package is a shareable stylelint configuration.

[Stylelint](https://stylelint.io/) checks for common mistakes in CSS and CSS-like files, and allows to define rules for tools and developers.

[Prettier should be used](https://stylelint.io/#how-itll-help-you) to handle coding style-guides when possible.

## Install

```
npm uninstall stylelint && npm i --save-dev @lucca/stylelint-config
```

## Avoid conflicts

Remove any pre-existing [configuration](https://stylelint.io/user-guide/configure) (file or statements in package.json).

## Configure

### For your local project

Use this package in a _stylelint.config.js_ file in your repository:

```js
module.exports = {
	extends: ['@lucca/stylelint-config'],
	rules: {},
};
```

### For your CI

Add the relevant scripts to lint the code in Jenkins. Something like:

```json
"ngLint": "ng lint",
"stylelint": "stylelint \"./SOME_PATH/**/*.scss\"",
```

### Breaking the rules

#### Overrides

You can [apply specific rules with overrides](https://stylelint.io/user-guide/configure/#overrides) as needed.

Rules can be disabled while incrementally fixing your code. Set them to `null`:

```js
module.exports = {
	extends: ['@lucca-front/stylelint-config'],
	overrides: [
		{
			files: ['some-path/**/*.scss'],
			rules: {
				'no-descending-specificity': null,
			}
		},
	],
	rules: {};
};
```

#### Ignoring code inline

If needed, each rule can be ignored with [stylelint-(dis|en)able](https://stylelint.io/user-guide/ignore-code).

Please add a comment if you're doing so: use `styleling-disable[-*] -- comment`.

## Testing locally

In your stylelint configuration, temporarily replace `extends: ['@lucca/stylelint-config'],` by `extends: ['RELATIVE_PATH_TO/stylelint-config'],`.

The configuration from your local repository should be applied right away.

## Configuring your editor

### VS Code

⚠️ A [VSCode extension bug](https://github.com/stylelint/vscode-stylelint/issues/490#issuecomment-1966934533) might prevent you from using stylelint 16+.

Follow instructions on the [extension page](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

Those settings in _.vscode/settings.json_ should be fine:

```json
  "[scss]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "stylelint.vscode-stylelint",
    "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": "explicit"
    }
  },
  "stylelint.reportInvalidScopeDisables": true,
  "stylelint.reportNeedlessDisables": true,
  "stylelint.snippet": ["css", "scss"],
  "stylelint.validate": ["css", "scss"]
```

Please note **the VSCode extension does not take overrides into account**.

### JetStorm

You might need to rename _stylelint.config.js_ to _stylelint.config.cjs_ (_CommonJS_) and [adapt the code in consequence](https://stylelint.io/user-guide/configure).
