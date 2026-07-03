export default [
	// Any occurrence of one of these selectors in any part of a selector
	// SEE https://regex101.com/r/OTnSEg
	{
		objectPattern: [
			/\.active(?![\w-])/,
			/\.disabled(?![\w-])/,
			/\.error(?![\w-])/,
			/\.label(?![\w-])/,
			/\.label-icon(?![\w-])/,
			/\.mod-delete(?![\w-])/,
			/\.mod-link(?![\w-])/,
			/\.mod-outline(?![\w-])/,
			/\.success(?![\w-])/,
			/\.u-textLight(?![\w-])/,
		],
	},
	{
		// Any combination of .button and .mod-counter, with any non-whitespace character between
		// SEE https://regex101.com/r/9WOlXc.
		objectPattern: /(?=\S*\.button(?![\w-]))(?=\S*\.mod-counter(?![\w-]))\S*/,
		versionDeleted: '18.1.0',
	},
	{
		// SEE https://regex101.com/r/AUlf21.
		objectPattern: [
			/\.button-counter(?![\w-])/,
			/\.navSide-item-alert(?![\w-])/,
			/\.textfield-actionClear(?![\w-])/,
			/\.lu-select-value \.label(?![\w-])/,
		],
		versionDeleted: '18.1.0',
	},
	{
		// Any combination of .callout and .mod-tiny, with any non-whitespace character between
		// SEE https://regex101.com/r/rW039S.
		objectPattern: /(?=\S*\.callout(?![\w-]))(?=\S*\.mod-tiny(?![\w-]))\S*/,
		versionDeleted: '18.1.0',
	},
	{
		// Any occurrence of one of these selectors in any part of a selector
		// SEE https://regex101.com/r/VHfdte.
		objectPattern: [/\.user-info\b/, /\.user-tile(-(title|label|footnote))?(?![\w-])/, /\.picture(?![\w-])/],
		versionDeleted: '20.1.0',
	},
	{
		// Any combination of .button and .mod-icon, with any non-whitespace character between
		// SEE https://regex101.com/r/6yQzje.
		objectPattern: /(?=\S*\.button(?![\w-]))(?=\S*\.mod-icon(?![\w-]))\S*/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/VGtzuM.
		objectPattern: [/\.u-comma(?![\w-])/, /\.u-unit(?![\w-])/],
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/nPMyQZ.
		objectPattern: /\.palette-(grey|primary|secondary|lucca)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
	},
	{
		// Old t-shirt sized utilities
		// - Sizes: 0, XXS-XXL, Auto (margins only).
		// - Directions: physical, Inline, Block. Gaps: gap, rowGap, columnGap.
		// - Excluded: `.u-{margin|padding}{Inline|Block}0`, still shipping (SEE next entry).
		// - Trailing `(?![\w-])`: no match on longer names, e.g. `.u-marginBlockStart` or `.u-margin0-reset`.
		// SEE https://regex101.com/r/YCDDc8.
		objectPattern:
			/\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		// Zero spacing utilities with the deprecated `.u-` prefix, renamed `.pr-u-` in 20.2.0
		// SEE https://github.com/LuccaSA/lucca-front/pull/3814.
		// SEE https://regex101.com/r/GwCS3W.
		objectPattern: /\.u-(margin|padding|inset)(Inline|Block)(Start|End)?0(?![\w-])/,
		versionDeprecated: '20.2.0',
	},
	{
		// SEE https://regex101.com/r/y2kYBk.
		objectPattern: [/\.u-textLeft(?![\w-])/, /\.u-textCenter(?![\w-])/, /\.u-textRight(?![\w-])/],
		versionDeprecated: '18.1.0',
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/HoanMW.
		objectPattern: /\.mod-columnSticky(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	// SEE https://regex101.com/r/1EfDam
	{
		objectPattern: [/\.(indexT|t)able-head-row-cell-sortableButton(?![\w-])/],
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		// Any combination of .table-head-row-cell and .mod-sortable, .sortedAscending or .sortedDescending, with any non-whitespace character between
		// SEE https://regex101.com/r/NFrjBF.
		objectPattern: /(?=\S*\.table-head-row-cell(?![\w-]))(?=\S*\.(mod-sortable|sortedAscending|sortedDescending)(?![\w-]))\S*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/8f4B4g.
		objectPattern: [/\.comment-content-textContainer(?![\w-])/, /\.mod-withMenuCompact(?![\w-])/],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/Ndh0bQ.
		objectPattern: [/\.dialog-form(?![\w-])/, /\.dialog-formOptional(?![\w-])/],
		versionDeprecated: '18.3.0',
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/43OspP.
		objectPattern: /\.u-elevate.*/,
		versionDeprecated: '19.1.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/7wO4Oc.
		objectPattern: /\.lu-dropdown-(content|options|options-item|options-item-action)(?![\w-])/,
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
		// SEE https://regex101.com/r/1eWJ0d.
		objectPattern: /\.menu\b/,
		versionDeprecated: '19.3.0',
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)(?![\w-])/,
		versionDeprecated: '20.1.0',
		versionDeleted: '22.0.0',
	},
	{
		// Any combination of .button and .mod-text, .mod-deleted or .loading, with any non-whitespace character between
		// SEE https://regex101.com/r/5qB2gm.
		objectPattern: /(?=\S*\.button(?![\w-]))(?=\S*\.(mod-text|mod-deleted|loading)(?![\w-]))\S*/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
	},
	{
		// Utilitaires renommés très utilisés
		// SEE https://regex101.com/r/TdUmb8.
		objectPattern: [
			/\.pr-u-textPrimary(?![\w-])/,
			/\.pr-u-textProduct(?![\w-])/,
			/\.pr-u-textSecondary(?![\w-])/,
			/\.pr-u-textBrand(?![\w-])/,
			/\.pr-u-textCritical(?![\w-])/,
			/\.pr-u-textDefault(?![\w-])/,
			/\.pr-u-textError(?![\w-])/,
			/\.pr-u-textGrey(?![\w-])/,
			/\.pr-u-textLight(?![\w-])/,
			/\.pr-u-textLucca(?![\w-])/,
			/\.pr-u-textNeutral(?![\w-])/,
			/\.pr-u-textPlaceholder(?![\w-])/,
			/\.pr-u-textSuccess(?![\w-])/,
			/\.pr-u-textWarning(?![\w-])/,
		],
		versionDeprecated: '21.0.0',
	},
	{
		// Utilitaires renommés peu ou pas utilisés
		// SEE https://regex101.com/r/Dk4cFs.
		objectPattern: [
			/\.pr-u-textSuccessContrasted(?![\w-])/,
			/\.pr-u-textWarningContrasted(?![\w-])/,
			/\.pr-u-textBrandContrasted(?![\w-])/,
			/\.pr-u-textNavigation(?![\w-])/,
			/\.pr-u-textAI(?![\w-])/,
			/\.pr-u-textPagga(?![\w-])/,
			/\.pr-u-textPoplee(?![\w-])/,
			/\.pr-u-textCoreHR(?![\w-])/,
			/\.pr-u-textTimmi(?![\w-])/,
			/\.pr-u-textCleemy(?![\w-])/,
			/\.pr-u-textCc(?![\w-])/,
			/\.pr-u-textKiwi(?![\w-])/,
			/\.pr-u-textLime(?![\w-])/,
			/\.pr-u-textCucumber(?![\w-])/,
			/\.pr-u-textMint(?![\w-])/,
			/\.pr-u-textGlacier(?![\w-])/,
			/\.pr-u-textLagoon(?![\w-])/,
			/\.pr-u-textBlueberry(?![\w-])/,
			/\.pr-u-textLavender(?![\w-])/,
			/\.pr-u-textGrape(?![\w-])/,
			/\.pr-u-textWatermelon(?![\w-])/,
			/\.pr-u-textPumpkin(?![\w-])/,
			/\.pr-u-textPineapple(?![\w-])/,
		],
		versionDeprecated: '21.0.0',
	},
];
