const selection = require('./selection.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const generatedWarning = `/***********************************************
 ***		THIS FILE IS GENERATED, DO NOT EDIT		***
 ***		The generator is update-icons.js			***
 ***********************************************/\n\n`;

const icons = selection.icons
	.map((icon) => {
		return icon.properties.name.split(', ').map((name, index) => {
			// Let's convert snake_case to camelCase for css to be happy with it
			return {
				snake_case: name.replace(/-/gm, '_'),
				code: `\\${icon.properties.code.toString(16)}`,
				deprecated: index > 0,
				camelCase: name
					.split('-')
					.map((word, index) => {
						if (index === 0) {
							return word;
						}
						return `${word[0].toUpperCase()}${word.slice(1)}`;
					})
					.join(''),
			};
		});
	})
	.flat();

const type = `${generatedWarning}export type LuccaIcon =\n\t| ${icons.map((icon) => `'${icon.camelCase}'`).join('\n\t| ')};\n`;

writeFileSync(join(__dirname, './index.d.ts'), type);

const list = `${generatedWarning}export const IconsList = [\n\t${icons
	.map((icon) => `{ icon: '${icon.camelCase}', deprecated: ${icon.deprecated} }`)
	.join(',\n\t')},\n];\n`;

writeFileSync(join(__dirname, './icons-list.ts'), list);

const scssConfig = `${generatedWarning}// to test locally (without the CDN)
// $font-path: '../../font/lucca-icons' !default;
$font-path: '//cdn.lucca.fr/transverse/prisme/icons/font/lucca-icons' !default;
$font-name: 'Lucca icons' !default;

$icons: (
${icons
	.map((icon) => {
		return `\t'${icon.snake_case}': '${icon.code}',`;
	})
	.join('\n')}
) !default;
`;

writeFileSync(join(__dirname, 'src/commons/config.scss'), scssConfig);
