// WARNING!
// Always check for variables with regular expressions. A string will match all the value, not part of it.

export default [
	{
		objectPattern: /--commons-elevations-elevation-[1-6]]/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /--commons-boxShadow-X*(S|M|L)/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /--palettes-(grey|primary|secondary|lucca)-[0-9]{2,3}/,
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
		actions: `
			* Remplacer \`grey\` par \`neutral\`.
			* Remplacer \`primary\` & \`secondary\` par \`product\`.
			* Remplacer \`lucca\` par \`brand\`.
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		objectPattern: /--spacings-X*(S|M|L)/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /--colors-(black|white)-color/,
		versionDeprecated: '18.2.0',
		versionDeleted: '22.0.0',
		actions: `
			* Remplacer \`--colors-white-color\` par \`--palettes-neutral-0\` ou \`--pr-t-elevation-surface-raised\` selon si la couleur en question est considérée comme une couleur ou une surface.
			* Remplacer \`--colors-black-color\` par \`--palettes-neutral-900\`.
		`,
	},
	{
		objectPattern: /--commons-navSide-compact-width/,
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: /--commons-borderRadius-(M|L|XL|full)/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
		actions: 'Remplacer par \`--pr-t-border-radius-XXX\`',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0',
		},
	},
];
