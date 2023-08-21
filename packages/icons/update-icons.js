const selection = require('./selection.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const iconNames = selection.icons
	.map((icon) => {
		return icon.properties.ligatures.split(', ').map((name) => {
			// Let's convert snake_case to camelCase for css to be happy with it
			return name
				.split('_')
				.map((word, index) => {
					if (index === 0) {
						return word;
					}
					return `${word[0].toUpperCase()}${word.slice(1)}`;
				})
				.join('');
		});
	})
	.flat();

const type = `export type LuccaIcon =\n	| ${iconNames.map((name) => `'${name}'`).join('\n	| ')};\n`;

writeFileSync(join(__dirname, './index.d.ts'), type);
