// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import typescript from 'typescript-eslint';

export default typescript.config({
    ignores: ['**/*.stories.ts', '**/schematics/**/tests/output', '**/schematics/**/tests/input'],
}, {
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
}, {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...typescript.configs.recommendedTypeChecked, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
        parserOptions: {
            project: ['tsconfig.json', 'packages/ng/tsconfig.json', '.storybook/tsconfig.json'],
            createDefaultProgram: true,
        },
    },
    rules: {
        // Eslint Rules
        curly: 'error',
        'max-classes-per-file': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'quote-props': ['error', 'as-needed'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never',
            },
        ],

        // Typescript Eslint Plugin Rules

        // Would be nice to have these three but requires refactoring of old code
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',

        // This one is from Angular 20, we'll remove it eventually but legacy code makes it hard to do
        '@angular-eslint/prefer-inject': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // on aimerait bien dire oui sauf pour void
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enumMember',
                format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
            },
        ],
        '@typescript-eslint/no-restricted-imports': [
            'error',
            {
                paths: ['rxjs/Rx', '@ngneat/spectator'],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        '@typescript-eslint/unbound-method': 'off',

        // Angular Plugin rules
        '@angular-eslint/component-selector': [
            'error',
            {
                type: ['element', 'attribute'],
                prefix: 'lu',
                style: 'kebab-case',
            },
        ],
        '@angular-eslint/directive-selector': [
            'error',
            {
                type: 'attribute',
                prefix: 'lu',
                style: 'camelCase',
            },
        ],
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-input-rename': 'off',
    },
}, {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {
        '@angular-eslint/template/button-has-type': 'error',
    },
}, prettier, storybook.configs["flat/recommended"]);
