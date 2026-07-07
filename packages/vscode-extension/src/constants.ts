/** Shared constants. No 'vscode' import — safe to use from pure modules. */

export const SCSS_PACKAGE_NAME = '@lucca-front/scss';

/** Location of the manifest inside the published @lucca-front/scss package. */
export const MANIFEST_RELATIVE_PATH = 'css-api/manifest.json';

/** The manifest schema version this extension understands. */
export const SUPPORTED_MANIFEST_VERSION = 1;

export const UTILITY_PREFIX = 'pr-u-';

/** Languages whose documents may contain custom-property references. */
export const CSS_LANGUAGES = ['css', 'scss', 'less'];

/** Languages whose documents may contain utility-class usage. */
export const MARKUP_LANGUAGES = ['html', 'typescript'];

export const COMMAND_RELOAD = 'luccaFront.reloadManifest';
export const CONFIG_SECTION = 'luccaFront';
export const DIAGNOSTIC_SOURCE = 'lucca-front';
