# lucca-prisme / Stylelint config

This package is a shareable stylelint configuration.

[Stylelint](https://stylelint.io/) checks for common mistakes in CSS and CSS-like files, and allows to define rules for tools and developers.

[Prettier should be used](https://stylelint.io/#how-itll-help-you) to handle coding style-guides when possible.

- This configuration lints your code with default CSS & SCSS rules, and adapts some of them for Lucca Front specifics
- It will trigger warnings for deprecated LF features and errors for deleted LF features.

## Install

```
npm i --save-dev stylelint @lucca/stylelint-config-prisme
```

## Avoid conflicts

Remove any pre-existing [configuration](https://stylelint.io/user-guide/configure) (file or statements in package.json).

## Configure

### For your local project

Use this package in a _stylelint.config.js_ file in your repository:

```js
module.exports = {
  extends: ['@lucca/stylelint-config-prisme'],
  rules: {},
};
```

### For your CI

Add the relevant script to lint the code in Jenkins.

```json
"stylelint": "stylelint \"./**/*.scss\"",
```

You can be more specific and restrict the path of scss files being linted: `"stylelint": "stylelint \"./SOME_PATH/**/*.scss\""`,

### `showCachePath` parameter

To avoid hitting Github’s rate limit, the script caches Milestones versions in a local file. Knowing which file has been created can be useful, but also hard to find.

Webstorm has an [issue with outputting the information during the linting](https://youtrack.jetbrains.com/issue/WEB-71871/stylelint-console.log-written-in-the-linted-file-instead-of-console), so outputting the path is optional with a parameter:

```sh
npx stylelint \"./**/*.scss\" showCachePath
```

### Breaking the rules

#### Overrides

You can [apply specific rules with overrides](https://stylelint.io/user-guide/configure/#overrides) as needed.

Rules can be disabled while incrementally fixing your code. Set them to `null`. The following example will ignore the `no-descending-specificity` rule in all SCSS files within `*some-path* :

```js
module.exports = {
 extends: ['@lucca/stylelint-config-prisme'],
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

Please explain why with a comment if you're doing so. Use `styleling-disable[-*] -- Comment` and enable stylelint back as soon as possible: `styleling-enable`.

## Testing locally

1. From the root of this package, run `npm pack`. This will generate a _.tgz_ file.
2. From the root of the project you want to lint, run `npm i PATH_TO_LUCCA_FRONT_REPOSITORY/packages/stylelint-config/lucca-front-stylelint-config-0.0.0.tgz`.

The configuration from your local repository should be applied right away. _If in doubt, restart your editor._

## Configuring your editor

### VS Code

⚠️ A [VSCode extension bug](https://github.com/stylelint/vscode-stylelint/issues/490#issuecomment-1966934533) might prevent you from using stylelint 16+. See below for a fix through VS-code settings.

Those settings in _.vscode/settings.json_ should be fine, but you can also follow instructions on the [extension page](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint):
:

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
  "stylelint.validate": ["css", "scss"],
```

Please note **the VSCode extension does not take overrides into account**.

#### bug: double slash comments appended to the nearest property

A [hackfix](https://github.com/stylelint/vscode-stylelint/issues/490#issuecomment-2156218548) is available.

Add the following line in _.vscode/settings.json_ if the issue arises:

```json
  "stylelint.customSyntax": "postcss-scss"
```

### JetStorm

You might need to rename _stylelint.config.js_ to _stylelint.config.cjs_ (_CommonJS_) and [adapt the code in consequence](https://stylelint.io/user-guide/configure).
