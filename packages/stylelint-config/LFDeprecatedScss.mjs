// Deprecated SCSS APIs: mixins and stylesheets.
// Stylelint does not read this file: only the deprecation doc does, with the same entry shape as the two other files.
export default [
	{
		// SEE https://regex101.com/r/UCHqOz.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v16.3.0.
		// SEE https://github.com/LuccaSA/lucca-front/blob/8921885b14e6fa83e4359bdefc090b0bce972ac6/packages/ng/material/style/main.scss#L1.
		// SEE https://github.com/LuccaSA/lucca-front/commit/4860db28694015767fa349399b076cd3a8e02234.
		// SEE https://github.com/LuccaSA/lucca-front/pull/2865.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v18.1.0.
		name: 'Override composants Material',
		objectPattern: /@lucca-front\/ng\/material\/style(?![\w-])/,
		versionDeprecated: '16.3.0',
		versionDeleted: '18.1.0',
		actions: `Retirer l’import : ces feuilles de style n’étaient plus actives, des composants LF les remplacent.`,
	},
	{
		// SEE https://regex101.com/r/2v32By.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v18.2.0.
		// SEE https://github.com/LuccaSA/lucca-front/blob/51bb17c582e21295003a3a2a10ca1bc735b306af/packages/ng/styles/definitions/user/user-tile.scss#L3.
		// SEE https://github.com/LuccaSA/lucca-front/pull/2940.
		// SEE https://github.com/LuccaSA/lucca-front/pull/3685.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v20.1.0.
		objectPattern: /(?<![\w-])userTileStyle(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`@forward '@lucca-front/scss/src/components/userTile'\`.`,
	},
	{
		// SEE https://regex101.com/r/nJzVC7.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v18.2.0.
		// SEE https://github.com/LuccaSA/lucca-front/blob/51bb17c582e21295003a3a2a10ca1bc735b306af/packages/ng/styles/definitions/user/user-picture.scss#L5.
		// SEE https://github.com/LuccaSA/lucca-front/pull/3015.
		// SEE https://github.com/LuccaSA/lucca-front/pull/3685.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v20.1.0.
		objectPattern: /(?<![\w-])userPicture(Style|Vars)(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`@forward '@lucca-front/scss/src/components/avatar'\`.`,
	},
];
