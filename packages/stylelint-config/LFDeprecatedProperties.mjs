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
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /--spacings-X*(S|M|L)/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
	},
	{
		objectPattern: /--colors-(black|white)-color/,
		versionDeprecated: '18.2.0',
		versionDeleted: '21.1.0',
	},
	{
		objectPattern: /--commons-navSide-compact-width/,
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
	},
	{
		objectPattern: /--commons-borderRadius-(M|L|XL|full)/,
		versionDeprecated: '20.2.0',
	},
];
