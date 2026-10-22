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
		// SEE https://github.com/LuccaSA/lucca-front/blob/7aafc39f8c79a749bc1d670fe4f05ea86c300923/packages/scss/src/commons/config.scss#L166.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: /--commons-elevations-elevation-[1-6](?![\w-])/,
		versionDeprecated: '16.1.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/g6tsSx.
		// SEE https://github.com/LuccaSA/lucca-front/blob/7aafc39f8c79a749bc1d670fe4f05ea86c300923/packages/scss/src/commons/config.scss#L181.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: /--commons-boxShadow-XXS(?![\w-])/,
		versionDeprecated: '16.1.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/Y00E16.
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/vars.scss#L32.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/config.scss#L455.
		objectPattern: /--commons-boxShadow-(X?S|M|X*L)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/BRi8Yi.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6be50a4dac63e15378ae529426817c4e6be5fb84/packages/scss/src/commons/config.scss#L11.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/vars.scss#L50.
		objectPattern: /--commons-background-base(?![\w-])/,
		versionDeprecated: '17.3.0',
		actions: `Remplacer par le token \`--pr-t-elevation-surface-default\`.`,
	},
	{
		// Alert of the navSide items, removed in 18.1.0: these variables are still emitted but no longer read
		// SEE https://regex101.com/r/BYj50i.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6c69e981609f39d15617f8b8cf5a70c7b4028499/packages/scss/src/components/navside/vars.scss#L24.
		objectPattern: /--components-navSide-fullwidth-palette-alert-(color|text)(?![\w-])/,
		versionDeprecated: '17.3.2',
		actions: `Retirer la variable : l’alerte est remplacée par le composant Numeric badge.`,
	},
	{
		// SEE https://regex101.com/r/QullaC.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6be50a4dac63e15378ae529426817c4e6be5fb84/packages/scss/src/commons/config.scss#L320.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/1f043f630075d20b2a1298f8b2382435583275b2/packages/scss/src/commons/config.scss#L320.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/f83d03c46a036e58aed46a4ee9046ae34115dd6f/packages/scss/src/commons/config.scss#L321.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/6f83f82a5f0dcfbf3ad08742ca577889802b8385/packages/scss/src/commons/config.scss#L403.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6f83f82a5f0dcfbf3ad08742ca577889802b8385/packages/scss/src/commons/vars.scss#L32.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/dd76138530436ecabe4f4752836a0f5e4cd14517/packages/scss/src/commons/config.scss#L369.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/3ab3c0fa9d635cb9ddaa00ad7187398e0cf3d300/packages/scss/src/components/toast/vars.scss#L11.
		objectPattern: /--components-toasts-(background|padding)(?![\w-])/,
		versionDeprecated: '18.1.0',
		actions: `Retirer la variable, sans remplacement.`,
	},
	{
		// `text` shade of every palette, and of the current palette (`--palettes-text`)
		// SEE https://regex101.com/r/23TY3b.
		// SEE https://github.com/LuccaSA/lucca-front/blob/dd76138530436ecabe4f4752836a0f5e4cd14517/packages/scss/src/commons/config.scss#L8.
		objectPattern: /--palettes-(\w+-)?text(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `\`*text\` ⇒ \`*0\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/YFRiS1.
		// SEE https://github.com/LuccaSA/lucca-front/blob/9ecaa3f2f7fcb53c4b69501636f819716716d3da/packages/scss/src/commons/config.scss#L567.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/d66db6850f4393a4b7dbe61c15207d1185516ec8/packages/scss/src/components/navside/vars.scss#L9.
		objectPattern: /--commons-navSide-compact-width(?![\w-])/,
		versionDeprecated: '18.3.0',
	},
	{
		// No longer read: overriding them has no effect
		// SEE https://regex101.com/r/BwNNLw.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14abe50720b75c678361778195dc782cbd6aa035/packages/scss/src/components/container/vars.scss#L4.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/commons/vars.scss#L75.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0726fe674636af589d3b14f641d67723f20ff890/packages/ng/schematics/tokens-typo/index.ts#L21.
		objectPattern: /--commons-font-family(-brand|-cursive)?(?![\w-])/,
		versionDeprecated: '20.1.0',
		actions: `\`--commons-*\` ⇒ \`--pr-t-*\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/MXjE6d.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0726fe674636af589d3b14f641d67723f20ff890/packages/ng/schematics/tokens-typo/index.ts#L22.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/title/mods.scss#L8.
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
		// SEE https://github.com/LuccaSA/lucca-front/commit/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f.
		objectPattern: /--sizes-(fontSize|lineHeight)(?![\w-])/,
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`--components-title-font\`.`,
	},
	{
		// Component font sizes and line heights, replaced by each component's `-font` shorthand
		// SEE https://regex101.com/r/6qyCXX.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/button/vars.scss#L16.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/callout/vars.scss#L8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/calloutFeedbackList/vars.scss#L5.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/chip/vars.scss#L6.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/comment/vars.scss#L12.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/divider/vars.scss#L11.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/formLabel/vars.scss#L10.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/sortableList/vars.scss#L7.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/tag/vars.scss#L9.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/textField/vars.scss#L17.
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
		// SEE https://github.com/LuccaSA/lucca-front/commit/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/bb80e0bf0e1f3ffaaff8b4ef573f653dc1d3472e/packages/scss/src/commons/config.scss#L750.
		objectPattern: /--commons-borderRadius-(M|L|XL|full)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: 'Remplacer par \`--pr-t-border-radius-XXX\`',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0',
		},
	},
	{
		// SEE https://regex101.com/r/eOaxoa.
		// SEE https://github.com/LuccaSA/lucca-front/commit/bb80e0bf0e1f3ffaaff8b4ef573f653dc1d3472e.
		objectPattern: /--pr-t-radius-input(?![\w-])/,
		versionDeleted: '20.2.0',
		actions: `Remplacer par \`--pr-t-border-radius-input\`.`,
	},
	{
		// Still read as a fallback of `--components-gauge-blockSize`
		// SEE https://regex101.com/r/09aS7Z.
		// SEE https://github.com/LuccaSA/lucca-front/blob/465bd91d82d8de1d0512643f175ce817135b83f7/packages/scss/src/components/gauge/vars.scss#L1.
		objectPattern: /--components-gauge-height(?![\w-])/,
		versionDeprecated: '20.3.0',
		actions: `Remplacer par \`--components-gauge-blockSize\`.`,
	},
	{
		// Still read as fallbacks of their `-content-` names
		// SEE https://regex101.com/r/njxlDv.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3cd2c7dcf6e46bf1f2a28eef623252e7748d978a/packages/scss/src/components/richText/vars.scss#L9.
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
		// SEE https://github.com/LuccaSA/lucca-front/commit/f0b73e151f73e805500788cdaac6e65fcff20b7a.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/numericBadge/mods.scss#L8.
		// SEE https://github.com/LuccaSA/lucca-front/commit/e199f114fbb08f565328ea62658b2190b82a840d.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/numericBadge/component.scss#L11.
		objectPattern: /--components-numericBadge-(fontSize|lineHeight)(?![\w-])/,
		versionDeprecated: '20.1.0',
		versionDeleted: '21.3.0',
		actions: `Remplacer par \`--components-numericBadge-font\`.`,
	},
	{
		// SEE https://regex101.com/r/mSg9Vi.
		// SEE https://github.com/LuccaSA/lucca-front/blob/db08f46234ab6e5717d83b3c72d36dedfd180a43/packages/scss/src/components/fancyBox/vars.scss#L29.
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
