export default [
	// Any occurrence of one of these selectors in any part of a selector
	// SEE https://regex101.com/r/OTnSEg
	{
		objectPattern: [
			/\.active/,
			/\.disabled/,
			/\.error/,
			/\.label/,
			/\.mod-delete/,
			/\.mod-link/,
			/\.mod-outline\b/,
			/\.success/,
			/\.u-textLight/,
		],
	},
	{
		// Any combination of .button and .mod-counter, with any non-whitespace character between
		// SEE https://regex101.com/r/9WOlXc.
		objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\bmod-counter\b)\S*/,
		versionDeleted: '18.1.0',
	},
	{
		objectPattern: [/\.button-counter/, /\.navSide-item-alert/, /\.textfield-actionClear/, /\.lu-select-value .label/],
		versionDeleted: '18.1.0',
	},
	{
		// Any combination of .callout and .mod-tiny, with any non-whitespace character between
		// SEE https://regex101.com/r/rW039S.
		objectPattern: /(?=\S*\.\bcallout\b)(?=\S*\.\bmod-tiny\b)\S*/,
		versionDeleted: '18.1.0',
	},
	// Any occurrence of one of these selectors in any part of a selector
	// SEE https://regex101.com/r/VHfdte.
	{
		objectPattern: [/\.user-info/, /\.user-tile(-(title|label|footnote))?/, /\.picture/],
		versionDeleted: '20.1.0',
	},
	{
		// Any combination of .button and .mod-icon, with any non-whitespace character between
		// SEE https://regex101.com/r/6yQzje.
		objectPattern: /(\.button|\.mod-icon)[\S]*(\.button|\.mod-icon)/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: [/\.u-comma/, /\.u-unit/],
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.palette-(grey|primary|secondary|lucca)/,
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
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: [/\.u-textLeft/, /\.u-textCenter/, /\.u-textRight/],
		versionDeprecated: '18.1.0',
		versionDeleted: '22.0.0',
		actions: `Doublon. Remplacer par : \`.u-textAlignLeft\`, \`.u-textAlignCenter\` & \`.u-textAlignRight\`.`,
	},
	{
		objectPattern: /\.mod-columnSticky/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	// SEE https://regex101.com/r/1EfDam
	{
		objectPattern: [/\.(indexT|t)able-head-row-cell-sortableButton/],
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		// Any combination of .table-head-row-cell and .mod-sortable, .sortedAscending or .sortedAscending, with any non-whitespace character between
		// SEE https://regex101.com/r/NFrjBF.
		objectPattern: /(?=\S*\.\btable-head-row-cell\b)(?=\S*\.\b(mod-sortable|sortedAscending|sortedDescending)\b)\S*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: [/\.comment-content-textContainer/, /\.mod-withMenuCompact/],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
		},
	},
	{
		objectPattern: [/\.dialog-form/, /\.dialog-formOptional/],
		versionDeprecated: '18.3.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par la classe unique \`.dialog-inside-formOptional\`.`,
	},
	{
		objectPattern: /\.u-elevate.*/,
		versionDeprecated: '19.1.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.lu-dropdown-(content|options|options-item|options-item-action)/,
		versionDeprecated: '19.2.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par le nouveau DOM du composant [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown).`,
	},
	{
		// SEE https://regex101.com/r/VqPdDw.
		objectPattern: /\.filterBarDeprecated-?/,
		versionDeprecated: '19.2.0',
		versionDeleted: '22.0.0',
	},
	{
		objectPattern: /\.menu-?/,
		versionDeprecated: '19.3.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par [Horizontal navigation](https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation).`,
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)/,
		versionDeprecated: '20.1.0',
		versionDeleted: '22.0.0',
		actions: `
			Remplacer par les classes \`.pr-u-bodyXS\`, \`.pr-u-bodyS\`, \`.pr-u-bodyM\`.

			Les utilitaires L ~ XXXL peuvent être remplacés par un utilitaire de titre \`.pr-u-hx\` ou le [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311) correspondant.

			[Plus d’informations sur le sujet](https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9).
		`,
	},
	{
		// Any combination of .button and .mod-text, .mod-deleted or .loading, with any non-whitespace character between
		// SEE https://regex101.com/r/5qB2gm.
		objectPattern: [
			// Classes pour button :
			/(?=\S*\.\bbutton\b)(?=\S*\.\b(mod-text|mod-deleted|loading)\b)\S*/,
			// Inputs Angular :
			// * `delete`
			// * `text`
			// * `text-invert`
		],
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par les classes \`.mod-ghost\` & \`.mod-critical\` et les inputs Angular \`critical\`, \`ghost\` & \`ghost-invert\``,
	},
	{
		objectPattern: [
			// [Liste complète](https://www.notion.so/luccasoftware/Utilitaires-color-text-2c7d278ab26e808b9d61f3734eeb77a2)
			// **Utilitaires renommés très utilisés :**
			/\.pr-u-textPrimary/,
			/\.pr-u-textProduct/,
			/\.pr-u-textSecondary/,
			/\.pr-u-textBrand/,
			/\.pr-u-textCritical/,
			/\.pr-u-textDefault/,
			/\.pr-u-textError/,
			/\.pr-u-textGrey/,
			/\.pr-u-textLight/,
			/\.pr-u-textLucca/,
			/\.pr-u-textNeutral/,
			/\.pr-u-textPlaceholder/,
			/\.pr-u-textSuccess/,
			/\.pr-u-textWarning/,

			// **Utilitaires renommés peu ou pas utilisés :**
			/\.pr-u-textSuccessContrasted/,
			/\.pr-u-textWarningContrasted/,
			/\.pr-u-textBrandContrasted/,
			/\.pr-u-textNavigation/,
			/\.pr-u-textAI/,
			/\.pr-u-textPagga/,
			/\.pr-u-textPoplee/,
			/\.pr-u-textCoreHR/,
			/\.pr-u-textTimmi/,
			/\.pr-u-textCleemy/,
			/\.pr-u-textCc/,
			/\.pr-u-textKiwi/,
			/\.pr-u-textLime/,
			/\.pr-u-textCucumber/,
			/\.pr-u-textMint/,
			/\.pr-u-textGlacier/,
			/\.pr-u-textLagoon/,
			/\.pr-u-textBlueberry/,
			/\.pr-u-textLavender/,
			/\.pr-u-textGrape/,
			/\.pr-u-textWatermelon/,
			/\.pr-u-textPumpkin/,
			/\.pr-u-textPineapple/,
		],
		versionDeprecated: '21.0.0',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
];
