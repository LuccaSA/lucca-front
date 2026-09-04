const selection = require('./selection.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const generatedWarning = `// *******************************************
// *** THIS FILE IS GENERATED, DO NOT EDIT ***
// *** The generator is packages/icons/update-icons.js ***
// *******************************************\n\n`;

const icons = selection.icons
	.map((icon) => {
		return icon.properties.name.split(', ').map((name) => {
			return {
				snake_case: name.replace(/-/gm, '_'),
				code: `\\${icon.properties.code.toString(16)}`,
			};
		});
	})
	.flat();

const scssConfig = `${generatedWarning}// to test locally (without the CDN)
// $font-path: '../../font/lucca-icons' !default;
$font-path: '//cdn.lucca.fr/transverse/prisme/icons/font/lucca-icons' !default;
$font-name: 'Lucca icons' !default;
$isNamespaced: false !default;
$layers: 'reset, base, components, mods, product, utils' !default;

$icons: (
${icons
	.map((icon) => {
		return `\t'${icon.snake_case}': '${icon.code}',`;
	})
	.join('\n')}
) !default;
`;

writeFileSync(join(__dirname, 'src/commons/config.scss'), scssConfig);
