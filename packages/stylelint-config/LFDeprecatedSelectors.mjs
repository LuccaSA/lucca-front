export default [
	{
		// Any combination of .button and .mod-counter, with any non-whitespace character between
		// SEE https://regex101.com/r/9WOlXc.
		objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\bmod-counter\b)\S*/,
		versionDeleted: '18.1.0',
	},
	{
		objectPattern: ['.button-counter', '.navSide-item-alert', '.textfield-actionClear', '.lu-select-value .label'],
		versionDeleted: '18.1.0',
	},
	{
		// Any combination of .callout and .mod-tiny, with any non-whitespace character between
		// SEE https://regex101.com/r/rW039S.
		objectPattern: /(?=\S*\.\bcallout\b)(?=\S*\.\bmod-tiny\b)\S*/,
		versionDeleted: '18.1.0',
	},
	{
		objectPattern: ['.user-info', /\.user-tile-(title|label|footnote)/],
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: ['.user-info', 'user-tile', '.picture'],
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
		objectPattern: ['.u-comma', '.u-unit'],
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.palette-(grey|primary|secondary|lucca)/,
		versionDeprecated: '17.3.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /\.u-(padding|margin|gap)X*(S|M|L)/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: ['.u-textLeft', '.u-textCenter', '.u-textRight'],
		versionDeprecated: '18.1.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: '.mod-columnSticky',
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: ['.table-head-row-cell-sortableButton', '.indexTable-head-row-cell-sortableButton'],
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
		objectPattern: /\.u-text(Left|Center|Right)/,
		versionDeprecated: '18.2.0',
	},
	{
		objectPattern: ['.comment-content-textContainer', '.mod-withMenuCompact'],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: ['.dialog-form', '.dialog-formOptional'],
		versionDeprecated: '18.3.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /\.u-elevate.*/,
		versionDeprecated: '19.1.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /\.lu-dropdown-(content|options|options-item|options-item-action)/,
		versionDeprecated: '19.2.0',
		versionDeleted: '21.1.0',
	},
	{
		// SEE https://regex101.com/r/VqPdDw.
		objectPattern: /\.filterBarDeprecated-?/,
		versionDeprecated: '19.2.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /\.menu-?/,
		versionDeprecated: '19.3.0',
		versionDeleted: '21.1.0',
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)/,
		versionDeprecated: '20.1.0',
		versionDeleted: '22.1.0',
	},
	{
		// Any combination of .button and .mod-text or .mod-deleted, with any non-whitespace character between
		// SEE https://regex101.com/r/5qB2gm.
		objectPattern: /(?=\S*\.\bbutton\b)(?=\S*\.\b(mod-text|mod-deleted)\b)\S*/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.1.0',
	},
];
