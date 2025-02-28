export default [
	{
		// Any combination of .button and .mod-icon with any non-whitespace character between
		objectPattern: /(\.button|\.mod-icon)[\S]*(\.button|\.mod-icon)/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: ['.u-comma', '.u-unit'],
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.palette-(grey|primary|secondary|lucca)/,
		versionDeprecated: '17.3.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: /\.u-(padding|margin|gap)X*(S|M|L)/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.u-elevate*/,
		versionDeprecated: '19.1.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: [
			'.user-info',
			'.user-tile-title',
			'.user-tile-label',
			'.user-tile-footnote',
			'.columnSticky',
			'.table-head-row-cell-sortableButton',
			'.indexTable-head-row-cell-sortableButton',
			'.table-head-row-cell.mod-sortable',
			'.table-head-row-cell.sortedAscending',
			'.table-head-row-cell.sortedDescending',
			'.u-textLeft',
			'.u-textCenter',
			'.u-textRight',
		],
		versionDeprecated: '18.1.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: /\.user-info.+/,
		versionDeprecated: '18.1.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: /\.user-tile.+/,
		versionDeprecated: '18.1.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: ['.picture', '.indexTable-body-row-cell-action'],
		versionDeprecated: '18.1.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: ['.comment-content-textContainer', '.dialog-form', '.dialog-formOptional', '.mod-withMenuCompact'],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
];
