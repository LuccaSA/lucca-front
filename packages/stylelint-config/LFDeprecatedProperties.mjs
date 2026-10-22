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
		versionDeprecated: '16.1.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/g6tsSx.
		objectPattern: /--commons-boxShadow-XXS(?![\w-])/,
		versionDeprecated: '16.1.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/Y00E16.
		objectPattern: /--commons-boxShadow-(X?S|M|X*L)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/BRi8Yi.
		objectPattern: /--palettes-(grey|primary|secondary|lucca)-(0|text|25|50|100|200|300|400|500|600|700|800|900)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
		actions: `
			* \`*-grey-*\` ⇒ \`*-neutral-*\`
			* \`*-primary-*\` & \`*-secondary-*\` ⇒ \`*-product-*\`
			* \`*-lucca-*\` ⇒ \`*-brand-*\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/FvCjd5.
		objectPattern: /--commons-background-base(?![\w-])/,
		versionDeprecated: '17.3.0',
		actions: `Remplacer par le token \`--pr-t-elevation-surface-default\`.`,
	},
	{
		// Alert of the navSide items, removed in 18.1.0: these variables are still emitted but no longer read
		// SEE https://regex101.com/r/BYj50i.
		objectPattern: /--components-navSide-fullwidth-palette-alert-(color|text)(?![\w-])/,
		versionDeprecated: '17.3.2',
		actions: `Retirer la variable : l’alerte est remplacée par le composant Numeric badge.`,
	},
	{
		// SEE https://regex101.com/r/QullaC.
		objectPattern: /--colors-grey-900-rgb(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
		actions: `
			* Sass : \`color.transparentize(var(--palettes-neutral-900), …)\`
			* CSS : \`color-mix()\`
		`,
	},
	{
		// SEE https://regex101.com/r/YS7uCx.
		objectPattern: /--colors-grey-400-rgb(?![\w-])/,
		versionDeprecated: '17.3.1',
		versionDeleted: '22.0.0',
		actions: `
			* Sass : \`color.transparentize(var(--palettes-neutral-900), …)\`
			* CSS : \`color-mix()\`
		`,
	},
	{
		// SEE https://regex101.com/r/lu9vUK.
		objectPattern: [/--colors-white-rgb(?![\w-])/, /--colors-neutral-(400|900)-rgb(?![\w-])/],
		versionDeprecated: '17.4.0',
		versionDeleted: '22.0.0',
		actions: `
			* Sass : \`color.transparentize(var(--palettes-neutral-900), …)\`
			* CSS : \`color-mix()\`
		`,
	},
	{
		// SEE https://regex101.com/r/WqLllN.
		objectPattern: /--spacings-(0|X{0,2}S|M|X{0,2}L|auto)(?![\w-])/,
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
		actions: `
			* \`--spacings-*\` ⇒ \`--pr-t-spacings-*\`
			* \`*XXS\` ⇒ \`*50\`
			* \`*XS\` ⇒ \`*100\`
			* \`*S\` ⇒ \`*200\`
			* \`*M\` ⇒ \`*300\`
			* \`*L\` ⇒ \`*400\`
			* \`*XL\` ⇒ \`*600\`
			* \`*XXL\` ⇒ \`*800\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/iMddaz.
		objectPattern: /--colors-(black|white)-color(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '22.0.0',
		actions: `
			* \`--colors-white-color\` ⇒
				* couleur : \`--palettes-neutral-0\`
				* surface : \`--pr-t-elevation-surface-raised\`
			* \`--colors-black-color\` ⇒ \\
			  \`--palettes-neutral-900\`
		`,
	},
	{
		// Toast UI refactor: these variables are no longer read
		// SEE https://regex101.com/r/IqtE6x.
		objectPattern: /--components-toasts-(background|padding)(?![\w-])/,
		versionDeprecated: '18.1.0',
		actions: `Retirer la variable, sans remplacement.`,
	},
	{
		// `text` shade of every palette, and of the current palette (`--palettes-text`)
		// SEE https://regex101.com/r/23TY3b.
		objectPattern: /--palettes-(\w+-)?text(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `\`*text\` ⇒ \`*0\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/YFRiS1.
		objectPattern: /--commons-disabled-opacity(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `
			* token de texte : \`--pr-t-color-text-disabled\`
			* couleur : \`--commons-disabled-color\`
			* fond : \`--commons-disabled-background\`
		`,
	},
	{
		// SEE https://regex101.com/r/xx7vjW.
		objectPattern: /--commons-navSide-compact-width(?![\w-])/,
		versionDeprecated: '18.3.0',
	},
	{
		// No longer read: overriding them has no effect
		// SEE https://regex101.com/r/BwNNLw.
		objectPattern: /--components-container-(max-width|padding)(?![\w-])/,
		versionDeprecated: '18.3.0',
		actions: `
			* \`--components-container-max-width\` ⇒ \\
			  \`--commons-container-maxWidth\`
			* \`--components-container-padding\` ⇒ \\
			  \`--commons-container-padding\`
		`,
	},
	{
		// SEE https://regex101.com/r/uKwykc.
		objectPattern: /--commons-font-family(-brand|-cursive)?(?![\w-])/,
		versionDeprecated: '20.1.0',
		actions: `\`--commons-*\` ⇒ \`--pr-t-*\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/MXjE6d.
		objectPattern: [
			// Font sizes and line heights
			/--sizes-(XS|S|M|L|XL|XXL|XXXL)-(fontSize|lineHeight)(?![\w-])/,
			// Vertical paddings, only read with `$deprecatedSpacings: true`
			/--sizes-((XS|S|M|L|XL|XXL|XXXL)-)?verticalPadding(?![\w-])/,
		],
		versionDeprecated: '20.1.0',
		actions: `
			[Tokens typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311) :

			* \`*sizes-XXXL-*\` ⇒ \\
			  aucun token équivalent
			* \`*sizes-XXL-*\` ⇒ \\
			  \`*pr-t-font-heading-1-*\`
			* \`*sizes-XL-*\` ⇒ \\
			  \`*pr-t-font-heading-2-*\`
			* \`*sizes-L-*\` ⇒ \\
			  \`*pr-t-font-heading-3-*\`
			* \`*sizes-M-*\` ⇒
				* texte : \`*pr-t-font-body-M-*\`
				* titre : \`*pr-t-font-heading-4-*\`
			* \`*sizes-S-*\` ⇒ \\
			  \`*pr-t-font-body-S-*\`
			* \`*sizes-XS-*\` ⇒ \\
			  \`*pr-t-font-body-XS-*\`
			* \`--sizes-*-verticalPadding\` ⇒ \\
			  tokens \`--pr-t-spacings-*\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// Font size and line height of the title component, replaced by its font shorthand
		// SEE https://regex101.com/r/7hOMye.
		objectPattern: /--sizes-(fontSize|lineHeight)(?![\w-])/,
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`--components-title-font\`.`,
	},
	{
		// Component font sizes and line heights, replaced by each component's `-font` shorthand
		// SEE https://regex101.com/r/6qyCXX.
		objectPattern: [
			/--components-button-(font-size|line-height)(?![\w-])/,
			/--components-(callout|calloutFeedbackList|chip|comment-text|divider|formLabel|sortableList-description|tag)-(fontSize|lineHeight)(?![\w-])/,
			/--component-textField-(fontSize|lineHeight)(?![\w-])/,
		],
		versionDeprecated: '20.1.0',
		actions: `
			* \`*-fontSize\` ⇒ \`*-font\`
			* \`*-lineHeight\` ⇒ \`*-font\`
		`,
	},
	{
		// Component font sizes and line heights deleted without deprecation, replaced by each component's `-font` shorthand
		// SEE https://regex101.com/r/VEXU28.
		objectPattern: [
			/--components-(inlineMessage|simpleSelect|multiSelect|segmentedControl|timepicker|sortableList-helper)-(fontSize|lineHeight)(?![\w-])/,
			/--component-switchField-label-(fontSize|lineHeight)(?![\w-])/,
			/--components-horizontalNavigation-listItemAction(FontSize|LineHeight)(?![\w-])/,
			/--components-title-weight(?![\w-])/,
		],
		versionDeleted: '20.1.0',
		actions: `
			* \`*-fontSize\` ⇒ \`*-font\`
			* \`*-lineHeight\` ⇒ \`*-font\`
			* \`*FontSize\` ⇒ \`*Font\`
			* \`*LineHeight\` ⇒ \`*Font\`
			* \`*-weight\` ⇒ \`*-font\`
		`,
	},
	{
		// SEE https://regex101.com/r/1P70OB.
		objectPattern: /--commons-borderRadius-(M|L|XL|full)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: 'Remplacer par \`--pr-t-border-radius-XXX\`',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0',
		},
	},
	{
		// SEE https://regex101.com/r/eOaxoa.
		objectPattern: /--pr-t-radius-input(?![\w-])/,
		versionDeleted: '20.2.0',
		actions: `Remplacer par \`--pr-t-border-radius-input\`.`,
	},
	{
		// Still read as a fallback of `--components-gauge-blockSize`
		// SEE https://regex101.com/r/09aS7Z.
		objectPattern: /--components-gauge-height(?![\w-])/,
		versionDeprecated: '20.3.0',
		actions: `Remplacer par \`--components-gauge-blockSize\`.`,
	},
	{
		// Still read as fallbacks of their `-content-` names
		// SEE https://regex101.com/r/njxlDv.
		objectPattern: /--components-richTextField-(resize|height|minHeight|maxHeight)(?![\w-])/,
		versionDeprecated: '21.2.0',
		actions: `
			\`--components-richTextField-*\` ⇒ \\
			\`--components-richTextField-content-*\`
		`,
	},
	{
		// AI palette, renamed Orchid; `--palettes-ai-*` (lower case) is the AI gradient
		// SEE https://regex101.com/r/IFX5bZ.
		objectPattern: /--palettes-AI-\d+(?![\w-])/,
		versionDeleted: '21.3.0',
		actions: `
			* couleur : \`--palettes-orchid-*\`
			* dégradé : \`--palettes-ai-*\`

			(\`*\`: 50-900)
		`,
	},
	{
		// SEE https://regex101.com/r/cFClO2.
		objectPattern: /--components-numericBadge-(fontSize|lineHeight)(?![\w-])/,
		versionDeprecated: '20.1.0',
		versionDeleted: '21.3.0',
		actions: `Remplacer par \`--components-numericBadge-font\`.`,
	},
	{
		// SEE https://regex101.com/r/mSg9Vi.
		objectPattern:
			/--components-fancyBox-(offsetInline|offsetBlock|imageWidth|imageHeight|background-left|background-right|foreground)(?![\w-])/,
		versionDeprecated: '22.1.0',
		actions: `
			Avec \`*\` = \`--components-fancyBox\` :

			* \`*-offsetInline\` ⇒ \\
			  \`*-content-foregroundStartEnd-insetInlineEnd\`
			* \`*-offsetBlock\` ⇒ \\
			  \`*-content-foregroundStartEnd-insetBlockStart\`
			* \`*-imageWidth\` ⇒ \\
			  \`*-content-foregroundStartEnd-inlineSize\`
			* \`*-imageHeight\` ⇒ \\
			  \`*-content-foregroundStartEnd-blockSize\`
			* Image \`*-background-left\` ⇒
				* sélecteur : \`.fancyBox-content-backgroundEndStart\`
				* input Angular : \`backgroundEndStart\`
			* Image \`*-background-right\` ⇒
				* sélecteur : \`.fancyBox-content-backgroundStartEnd\`
				* input Angular : \`backgroundStartEnd\`
			* Image \`*-foreground\` ⇒
				* sélecteur : \`.fancyBox-content-foregroundStartEnd\`
				* input Angular : \`foregroundStartEnd\`
		`,
	},
];
