// WARNING!
// Always check for variables with regular expressions. A string will match all the value, not part of it.
// {string} --token -> --token ✓ | var(--token) ✗
//
// Boundary convention:
// - Each pattern ends with `(?![\w-])`: matches the exact token only; the guard blocks a trailing word char OR `-`.
//   --token ✓ | --token-x ✗ | --tokenX ✗
//
// Sorted by version: `versionDeprecated`, else `versionDeleted`.
// ==============================================================================================

export default [
	{
		// SEE https://regex101.com/r/Nct1a0.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/commons/vars.scss#L19.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/commons/config.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/commons/config.scss#L179.
		// SEE https://github.com/LuccaSA/lucca-front/commit/66e12140f271c541e74db3ec79af116c72c69889.
		objectPattern: [
			/--breakpoints-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)-breakAt(?![\w-])/,
			/--commons-box-shadow-(hard|xxs|xs|s|m|l|xl|xxl)(?![\w-])/,
			/--spacings-(reset|smallest|smaller|small|standard|big|bigger|biggest)(?![\w-])/,
		],
		versionDeleted: '15.1.0',
		actions: `
			* \`--breakpoints-*-breakAt\` ⇒ point de rupture en majuscules (\`l\` ⇒ \`L\`)
			* \`--commons-box-shadow-*\` ⇒ \`--commons-boxShadow-*\` en majuscules
			* \`--spacings-*\` ⇒ échelle en majuscules :
				* \`reset\` ⇒ \`0\`
				* \`smallest\` ⇒ \`XXS\`
				* \`smaller\` ⇒ \`XS\`
				* \`small\` ⇒ \`S\`
				* \`standard\` ⇒ \`M\`
				* \`big\` ⇒ \`L\`
				* \`bigger\` ⇒ \`XL\`
				* \`biggest\` ⇒ \`XXL\`
		`,
	},
	{
		// SEE https://regex101.com/r/Qkq3ok.
		// SEE https://regex101.com/r/g6tsSx.
		// SEE https://github.com/LuccaSA/lucca-front/blob/7aafc39f8c79a749bc1d670fe4f05ea86c300923/packages/scss/src/commons/config.scss#L166.
		// SEE https://github.com/LuccaSA/lucca-front/blob/7aafc39f8c79a749bc1d670fe4f05ea86c300923/packages/scss/src/commons/config.scss#L181.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: [/--commons-elevations-elevation-[1-6](?![\w-])/, /--commons-boxShadow-XXS(?![\w-])/],
		versionDeprecated: '16.1.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449).`,
	},
	{
		// SEE https://regex101.com/r/FvCjd5.
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/vars.scss#L50.
		objectPattern: /--commons-background-base(?![\w-])/,
		versionDeprecated: '17.3.0',
		actions: `Remplacer par le token \`--pr-t-elevation-surface-default\`.`,
	},
	{
		// SEE https://regex101.com/r/Y00E16.
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/vars.scss#L32.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/17961899b2b1c17e69612708b9e6d068b7801fb0/packages/scss/src/commons/config.scss#L455.
		objectPattern: /--commons-boxShadow-(X?S|M|X*L)(?![\w-])/,
		versionDeprecated: '17.3.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449).`,
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
			* \`*-(primary|secondary)-*\` ⇒ \`*-product-*\`
			* \`*-lucca-*\` ⇒ \`*-brand-*\`
		`,
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
		},
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
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
		},
	},
	{
		// SEE https://regex101.com/r/YS7uCx.
		// SEE https://github.com/LuccaSA/lucca-front/blob/1f043f630075d20b2a1298f8b2382435583275b2/packages/scss/src/commons/config.scss#L320.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
		objectPattern: /--colors-grey-400-rgb(?![\w-])/,
		versionDeprecated: '17.3.1',
		versionDeleted: '22.0.0',
		actions: `
			* Sass : \`color.transparentize(var(--palettes-neutral-400), …)\`
			* CSS : \`color-mix()\`
		`,
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
		},
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
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-spacing',
		},
	},
	{
		// SEE https://regex101.com/r/lu9vUK.
		// SEE https://github.com/LuccaSA/lucca-front/blob/f83d03c46a036e58aed46a4ee9046ae34115dd6f/packages/scss/src/commons/config.scss#L321.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
		objectPattern: [/--colors-white-rgb(?![\w-])/, /--colors-neutral-(400|900)-rgb(?![\w-])/],
		versionDeprecated: '17.4.0',
		versionDeleted: '22.0.0',
		actions: `
			* Sass : \`color.transparentize(var(--palettes-neutral-*), …)\`
			* CSS : \`color-mix()\`

			\`*\` = \`0\` pour \`white\`, sinon la nuance d'origine
		`,
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
		},
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
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
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
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes',
		},
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
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-typo',
		},
	},
	{
		// SEE https://regex101.com/r/MXjE6d.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0726fe674636af589d3b14f641d67723f20ff890/packages/ng/schematics/tokens-typo/index.ts#L22.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/components/title/mods.scss#L8.
		objectPattern: [
			// Tailles de police et hauteurs de ligne
			/--sizes-(XS|S|M|L|XL|XXL|XXXL)-(fontSize|lineHeight)(?![\w-])/,
			// Paddings verticaux, lus uniquement avec `$deprecatedSpacings: true`
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
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-typo',
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
		// SEE https://regex101.com/r/aK08Za.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/filterBar/mods.scss#L32.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/scrollBox/states.scss#L10.
		// SEE https://github.com/LuccaSA/lucca-front/commit/90aa5c65c1644ce779cdf86ae85530e212b79c71.
		objectPattern: /--components-(filterBar-extremitiesDisplay|scrollBox-wrap)(?![\w-])/,
		versionDeleted: '20.1.0',
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
		// SEE https://regex101.com/r/1P70OB.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bb80e0bf0e1f3ffaaff8b4ef573f653dc1d3472e/packages/scss/src/commons/config.scss#L750.
		objectPattern: /--commons-borderRadius-(M|L|XL|full)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `
			* \`*-M\` ⇒ \`--pr-t-border-radius-50\`
			* \`*-L\` ⇒ \`--pr-t-border-radius-100\`
			* \`*-XL\` ⇒ \`--pr-t-border-radius-150\`
			* \`*-full\` ⇒ \`--pr-t-border-radius-full\`

			\`*\` = \`--commons-borderRadius\`
		`,
		urls: {
			schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-radius',
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
		// SEE https://regex101.com/r/JRoWlQ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/9eb5311e28d89a9a3f74069d4922c3cb58611464/packages/scss/src/components/box/mods.scss#L47.
		// SEE https://github.com/LuccaSA/lucca-front/blob/9eb5311e28d89a9a3f74069d4922c3cb58611464/packages/scss/src/components/fileEntry/mods.scss#L9.
		// SEE https://github.com/LuccaSA/lucca-front/commit/bb80e0bf0e1f3ffaaff8b4ef573f653dc1d3472e.
		objectPattern: /--components-(box-(arrow-horizontalMargin|border-radius)|fileEntry-status-borderRadius)(?![\w-])/,
		versionDeleted: '20.2.0',
		actions: `Utiliser les tokens \`--pr-t-border-radius-*\`.`,
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
		// SEE https://regex101.com/r/G1g20C.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c4bab5a387fa9bc7d52f45d3f7b336820dd1fba8/packages/scss/src/components/dropdown/vars.scss#L4.
		// SEE https://github.com/LuccaSA/lucca-front/commit/73f0b8df78b82c137d2a9e3109afb9ccf3710487.
		objectPattern: /--components-dropdown-(max-height|max-width|min-width|option-action(Background|Color|Events)|optionColor)(?![\w-])/,
		versionDeleted: '20.3.0',
		actions: `
			* \`max-height\` ⇒ \`maxBlockSize\`
			* \`max-width\` ⇒ \`maxInlineSize\`
			* \`min-width\` ⇒ \`minInlineSize\`
			* \`option-actionBackground\` ⇒ \`list-option-action-backgroundColor\`
			* \`option-actionColor\` ⇒ \`list-option-action-color\`
			* \`option-actionEvents\` et \`optionColor\` : sans remplacement
		`,
	},
	{
		// SEE https://regex101.com/r/cnSAat.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c4bab5a387fa9bc7d52f45d3f7b336820dd1fba8/packages/scss/src/components/tag/mods.scss#L25.
		// SEE https://github.com/LuccaSA/lucca-front/commit/93518054cb3bc3edc5375e9beef87d458e2da8a6.
		objectPattern: /--components-tag-iconBottom(?![\w-])/,
		versionDeleted: '20.3.0',
	},
	{
		// SEE https://regex101.com/r/C1r4Cn.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/calloutPopover/mods.scss#L27.
		// SEE https://github.com/LuccaSA/lucca-front/commit/4f579d6c87c6dc65382bcbfba9a48cd8d2cbf892.
		objectPattern: /--components-calloutPopover-content-margin(?![\w-])/,
		versionDeleted: '21.0.0',
	},
	{
		// SEE https://regex101.com/r/AnEdZn.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/dataTable/vars.scss#L14.
		// SEE https://github.com/LuccaSA/lucca-front/commit/f92d243dfe61cd440720118448b214844edee954.
		objectPattern: /--components-dataTable-overflow(?![\w-])/,
		versionDeleted: '21.0.0',
	},
	{
		// SEE https://regex101.com/r/C9CUAp.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/filterPill/states.scss#L69.
		// SEE https://github.com/LuccaSA/lucca-front/commit/03c7cf23f5d3761a919381e6905ca07e0958305c.
		objectPattern: /--components-filterPill-clear-display(?![\w-])/,
		versionDeleted: '21.0.0',
		actions: `Remplacer par \`--components-clear-display\` du composant Clear.`,
	},
	{
		// SEE https://regex101.com/r/npX0eh.
		// SEE https://github.com/LuccaSA/lucca-front/blob/75af93ed2e949cc8b35ff40bcd8738596c398bf3/packages/scss/src/components/inputFramed/mods.scss#L6.
		// SEE https://github.com/LuccaSA/lucca-front/commit/8cb4c7a43ff67906ab8affeb079db4cd763018f7.
		objectPattern: /--components-inputFramed-header-label-fontWeight(?![\w-])/,
		versionDeleted: '21.1.0',
	},
	{
		// SEE https://regex101.com/r/WtJsNP.
		// SEE https://github.com/LuccaSA/lucca-front/blob/75af93ed2e949cc8b35ff40bcd8738596c398bf3/packages/scss/src/components/timepicker/mods.scss#L5.
		// SEE https://github.com/LuccaSA/lucca-front/commit/759e426e5fb0d8b8614da5b4e95255bff31f5e0f.
		objectPattern: /--components-timepicker-paddingInput-(block|inline)(?![\w-])/,
		versionDeleted: '21.1.0',
		actions: `Remplacer par \`--components-timepicker-input-padding-(block|inline)\`.`,
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
		// SEE https://regex101.com/r/iAXt8A.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bb7fe9c16f8e2daee9602c6964724ad38a806944/packages/scss/src/components/emptyState/vars.scss#L15.
		// SEE https://github.com/LuccaSA/lucca-front/commit/ecb3bc42bee4e3c1d1c36d440a38ba0efa81dd06.
		objectPattern: /--(background|foreground)-(left|right)-01(?![\w-])/,
		versionDeleted: '21.2.0',
	},
	{
		// SEE https://regex101.com/r/KBcVWs.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bb7fe9c16f8e2daee9602c6964724ad38a806944/packages/scss/src/components/loading/component.scss#L17.
		// SEE https://github.com/LuccaSA/lucca-front/commit/c4c9231bb7df90f2def39a85ea7bb1a40b34128b.
		objectPattern: /--components-loading-padding(?![\w-])/,
		versionDeleted: '21.2.0',
	},
	{
		// AI palette, renamed Orchid; `--palettes-ai-*` (lower case) is the AI gradient
		// The palette only ever defined 500 and 600
		// SEE https://regex101.com/r/IFX5bZ.
		// SEE https://github.com/LuccaSA/lucca-front/commit/f0b73e151f73e805500788cdaac6e65fcff20b7a.
		objectPattern: /--palettes-AI-(500|600)(?![\w-])/,
		versionDeleted: '21.3.0',
		actions: `
			* couleur : \`--palettes-orchid-*\`
			* dégradé : \`--palettes-ai-*\`

			(\`*\`: 50-900)
		`,
	},
	{
		// SEE https://regex101.com/r/kusrdB.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14c0ed50fb2720526069764f36028510e1d9851a/packages/scss/src/components/pageHeader/mods.scss#L40.
		// SEE https://github.com/LuccaSA/lucca-front/commit/519a1d0cc0022b69f136795bc47f90565180c537.
		objectPattern: /--components-pageHeader-content-(action-flexShrink|flexWrap)(?![\w-])/,
		versionDeleted: '21.3.0',
	},
	{
		// SEE https://regex101.com/r/ZjwOCu.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14c0ed50fb2720526069764f36028510e1d9851a/packages/scss/src/components/filterPill/states.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0212e264c42b9d4592399fc47bbd73be3c2f0327.
		objectPattern: /--components-filterPill-display(?![\w-])/,
		versionDeleted: '21.3.0',
	},
	{
		// SEE https://regex101.com/r/9hVovc.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14c0ed50fb2720526069764f36028510e1d9851a/packages/scss/src/components/timepicker/mods.scss#L5.
		// SEE https://github.com/LuccaSA/lucca-front/commit/5c8278c2f8fc871a6beb1993803d05d544f7c435.
		objectPattern: /--components-timepicker-display-padding-(block|inline)(?![\w-])/,
		versionDeleted: '21.3.0',
		actions: `Remplacer par \`--components-timepicker-display-inset-(block|inline)\`.`,
	},
	{
		// The typo shipped as the fallback of `--components-richTextField-content-minHeight`
		// SEE https://regex101.com/r/X2AuBX.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14c0ed50fb2720526069764f36028510e1d9851a/packages/scss/src/components/richText/vars.scss#L12.
		// SEE https://github.com/LuccaSA/lucca-front/commit/e574d8d7dde020fa22d21ff4d5162e2cd2fdff55.
		objectPattern: /--components-richTextField-minHeigh(?![\w-])/,
		versionDeleted: '21.3.1',
		actions: `Remplacer par \`--components-richTextField-minHeight\`.`,
	},
	{
		// SEE https://regex101.com/r/S9RZi0.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c2efa49aefd376b8f45a311aaedb299d534e74e2/packages/scss/src/components/activityFeed/states.scss#L5.
		// SEE https://github.com/LuccaSA/lucca-front/commit/ca6461d40ecbe63bb5dd61f47185d1d66a0511ab.
		objectPattern: /--components-activityFeed-content-update-(icon-)?display(?![\w-])/,
		versionDeleted: '22.0.0',
		actions: `Remplacer par \`--components-activityFeed-content-update-item-(icon-)?display\`.`,
	},
	{
		// SEE https://regex101.com/r/ymHwKF.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c2efa49aefd376b8f45a311aaedb299d534e74e2/packages/scss/src/components/dropdown/states.scss#L4.
		// SEE https://github.com/LuccaSA/lucca-front/commit/4d940c5754728a00d9410eb01cedbabfd1e004dc.
		objectPattern: /--components-dropdown-list-option-action-pointerEvents(?![\w-])/,
		versionDeleted: '22.0.0',
	},
	{
		// SEE https://regex101.com/r/WzOw25.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c2efa49aefd376b8f45a311aaedb299d534e74e2/packages/scss/src/components/listboxOption/mods.scss#L58.
		// SEE https://github.com/LuccaSA/lucca-front/commit/2813c500edb19adc570285fe72837ef5aba9016e.
		objectPattern: /--components-listboxOption-content-opacity(?![\w-])/,
		versionDeleted: '22.0.0',
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
	{
		// SEE https://regex101.com/r/7wE80G.
		// SEE https://github.com/LuccaSA/lucca-front/blob/be7004c7c16edd0cbb658c01e46781554bec1ae4/packages/scss/src/components/priorityLevels/mods.scss#L20.
		// SEE https://github.com/LuccaSA/lucca-front/commit/9ba2d000396a4c4f81d71309dd8eb9c71fc5a913.
		objectPattern: /--components-priorityLevels-(font|gap|minBlockSize|icon-color[1-3])(?![\w-])/,
		versionDeleted: '22.1.1',
		actions: `Remplacer par \`--components-priorityLevel-*\`.`,
	},
];
