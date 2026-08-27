// WARNING!
// Always check for variables with regular expressions. A string will match all the value, not part of it.
// {string} --token -> --token ✓ | var(--token) ✗
//
// Boundary convention:
// - Each pattern ends with `(?![\w-])`: matches the exact token only; the guard blocks a trailing word char OR `-`.
//   --token ✓ | --token-x ✗ | --tokenX ✗

export default [
	{
		// SEE https://regex101.com/r/Qkq3ok.
		objectPattern: /--commons-elevations-elevation-[1-6](?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/Y00E16.
		objectPattern: /--commons-boxShadow-X*(S|M|L)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/BRi8Yi.
		objectPattern: /--palettes-(grey|primary|secondary|lucca)-(25|50|100|200|300|400|500|600|700|800|900)(?![\w-])/,
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
		// SEE https://regex101.com/r/WqLllN.
		objectPattern: /--spacings-X*(S|M|L)(?![\w-])/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/iMddaz.
		objectPattern: /--colors-(black|white)-color(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '22.0.0',
		actions: `
			* Remplacer \`--colors-white-color\` par \`--palettes-neutral-0\` ou \`--pr-t-elevation-surface-raised\` selon si la couleur en question est considérée comme une couleur ou une surface.
			* Remplacer \`--colors-black-color\` par \`--palettes-neutral-900\`.
		`,
	},
	{
		// SEE https://regex101.com/r/xx7vjW.
		objectPattern: /--commons-navSide-compact-width(?![\w-])/,
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/1P70OB.
		objectPattern: /--commons-borderRadius-(M|L|XL|full)(?![\w-])/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
		actions: 'Remplacer par \`--pr-t-border-radius-XXX\`',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0',
		},
	},
];
