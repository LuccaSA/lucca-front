const selection = require('./selection.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const generatedWarning =
`/***********************************************
 ***		THIS FILE IS GENERATED, DO NOT EDIT		***
 ***		The generator is update-icons.js			***
 ***********************************************/\n\n`

const icons = selection.icons
	.map((icon) => {
		return icon.properties.ligatures.split(', ').map((name) => {
			// Let's convert snake_case to camelCase for css to be happy with it
			return {
				snake_case: name,
				code: `\\${icon.properties.code.toString(16)}`,
				camelCase: name
					.split('_')
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

const list = `${generatedWarning}export const IconsList = [\n\t${icons.map((icon) => `'${icon.camelCase}'`).join(',\n\t')},\n];\n`;

writeFileSync(join(__dirname, './icons-list.ts'), list);

const scssConfig = `${generatedWarning}$font-path: '//cdn.lucca.fr/lucca-front/icons/next/lucca-icons' !default;
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
