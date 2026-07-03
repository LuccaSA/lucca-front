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
		objectPattern: /(?=\S*\.button\b)(?=\S*\.mod-counter\b)\S*/,
		versionDeleted: '18.1.0',
	},
	{
		objectPattern: [/\.button-counter\b/, /\.navSide-item-alert\b/, /\.textfield-actionClear\b/, /\.lu-select-value \.label\b/],
		versionDeleted: '18.1.0',
	},
	{
		// Any combination of .callout and .mod-tiny, with any non-whitespace character between
		// SEE https://regex101.com/r/rW039S.
		objectPattern: /(?=\S*\.callout\b)(?=\S*\.mod-tiny\b)\S*/,
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
		objectPattern: /(?=\S*\.button\b)(?=\S*\.mod-icon\b)\S*/,
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
		// Old t-shirt sized utilities
		// - Sizes: 0, XXS-XXL, Auto (margins only).
		// - Directions: physical, Inline, Block. Gaps: gap, rowGap, columnGap.
		// - Excluded: `.u-{margin|padding}{Inline|Block}0`, still shipping (SEE next entry).
		// - Trailing `\b`: no match on longer names, e.g. `.u-marginBlockStart`.
		// SEE https://regex101.com/r/YCDDc8.
		objectPattern:
			/\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))\b/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		// Zero spacing utilities with the deprecated `.u-` prefix, renamed `.pr-u-` in 20.2.0
		// SEE https://github.com/LuccaSA/lucca-front/pull/3814.
		// SEE https://regex101.com/r/GwCS3W.
		objectPattern: /\.u-(margin|padding|inset)(Inline|Block)(Start|End)?0\b/,
		versionDeprecated: '20.2.0',
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
		// Any combination of .table-head-row-cell and .mod-sortable, .sortedAscending or .sortedDescending, with any non-whitespace character between
		// SEE https://regex101.com/r/NFrjBF.
		objectPattern: /(?=\S*\.table-head-row-cell\b)(?=\S*\.(mod-sortable|sortedAscending|sortedDescending)\b)\S*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
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
		objectPattern: /(?=\S*\.button\b)(?=\S*\.(mod-text|mod-deleted|loading)\b)\S*/,
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
