export default [
	// Any occurrence of one of these selectors in any part of a selector
	// SEE https://regex101.com/r/OTnSEg
	{
		objectPattern: [
			/\.active\b/,
			/\.disabled\b/,
			/\.error\b/,
			/\.label\b/,
			/\.mod-delete\b/,
			/\.mod-link\b/,
			/\.mod-outline\b/,
			/\.success\b/,
			/\.u-textLight\b/,
		],
	},
	{
		// Any combination of .button and .mod-counter, with any non-whitespace character between
		// SEE https://regex101.com/r/9WOlXc.
		objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\bmod-counter\b)\S*/,
		versionDeleted: '18.1.0',
	},
	{
		objectPattern: [/\.button-counter\b/, /\.navSide-item-alert\b/, /\.textfield-actionClear\b/, /\.lu-select-value .label\b/],
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
		objectPattern: [/\.user-info\b/, /\.user-tile(-(title|label|footnote))?\b/, /\.picture\b/],
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
		objectPattern: [/\.u-comma\b/, /\.u-unit\b/],
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.palette-(grey|primary|secondary|lucca)\b/,
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
	},
	{
		objectPattern: /\.u-(padding|margin|gap)X*(S|M|L)\b/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: [/\.u-textLeft\b/, /\.u-textCenter\b/, /\.u-textRight\b/],
		versionDeprecated: '18.1.0',
		versionDeleted: '22.0.0',
	},
	{
		objectPattern: /\.mod-columnSticky\b/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	// SEE https://regex101.com/r/1EfDam
	{
		objectPattern: [/\.(indexT|t)able-head-row-cell-sortableButton\b/],
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
		objectPattern: /\.u-text(Left|Center|Right)\b/,
		versionDeprecated: '18.2.0',
	},
	{
		objectPattern: [/\.comment-content-textContainer\b/, /\.mod-withMenuCompact\b/],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: [/\.dialog-form\b/, /\.dialog-formOptional\b/],
		versionDeprecated: '18.3.0',
		versionDeleted: '22.0.0',
	},
	{
		objectPattern: /\.u-elevate.*/,
		versionDeprecated: '19.1.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.lu-dropdown-(content|options|options-item|options-item-action)\b/,
		versionDeprecated: '19.2.0',
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/VqPdDw.
		objectPattern: /\.filterBarDeprecated\b/,
		versionDeprecated: '19.2.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /\.menu\b/,
		versionDeprecated: '19.3.0',
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)\b/,
		versionDeprecated: '20.1.0',
		versionDeleted: '22.0.0',
	},
	{
		// Any combination of .button and .mod-text, .mod-deleted or .loading, with any non-whitespace character between
		// SEE https://regex101.com/r/5qB2gm.
		objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\b(mod-text|mod-deleted|loading)\b)\S*/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
	},
	{
		// Utilitaires renommés très utilisés
		objectPattern: [
			/\.pr-u-textPrimary\b/,
			/\.pr-u-textProduct\b/,
			/\.pr-u-textSecondary\b/,
			/\.pr-u-textBrand\b/,
			/\.pr-u-textCritical\b/,
			/\.pr-u-textDefault\b/,
			/\.pr-u-textError\b/,
			/\.pr-u-textGrey\b/,
			/\.pr-u-textLight\b/,
			/\.pr-u-textLucca\b/,
			/\.pr-u-textNeutral\b/,
			/\.pr-u-textPlaceholder\b/,
			/\.pr-u-textSuccess\b/,
			/\.pr-u-textWarning\b/,
		],
		versionDeprecated: '21.0.0',
	},
	{
		// Utilitaires renommés peu ou pas utilisés
		objectPattern: [
			/\.pr-u-textSuccessContrasted\b/,
			/\.pr-u-textWarningContrasted\b/,
			/\.pr-u-textBrandContrasted\b/,
			/\.pr-u-textNavigation\b/,
			/\.pr-u-textAI\b/,
			/\.pr-u-textProduct\b/,
			/\.pr-u-textPagga\b/,
			/\.pr-u-textPoplee\b/,
			/\.pr-u-textCoreHR\b/,
			/\.pr-u-textTimmi\b/,
			/\.pr-u-textCleemy\b/,
			/\.pr-u-textCc\b/,
			/\.pr-u-textKiwi\b/,
			/\.pr-u-textLime\b/,
			/\.pr-u-textCucumber\b/,
			/\.pr-u-textMint\b/,
			/\.pr-u-textGlacier\b/,
			/\.pr-u-textLagoon\b/,
			/\.pr-u-textBlueberry\b/,
			/\.pr-u-textLavender\b/,
			/\.pr-u-textGrape\b/,
			/\.pr-u-textWatermelon\b/,
			/\.pr-u-textPumpkin\b/,
			/\.pr-u-textPineapple\b/,
		],
		versionDeprecated: '21.0.0',
	},
];
