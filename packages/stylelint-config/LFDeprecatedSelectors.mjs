// Deprecated selectors — used by Stylelint's selector-disallowed-list (see stylelint.config.mjs).
// Each `objectPattern` is matched with `.test()` against a selector.
//
// WARNING!
// Always match selectors with regular expressions. A string will match the whole selector, not part of it.
// {string} .token -> .token ✓ | .foo .token ✗ | .token.mod-x ✗
//
// Boundary conventions:
// - Exact token — `\.token(?![\w-])`: matches the token only; the guard blocks a trailing word char OR `-`.
//   .token ✓ | .token-x ✗ | .tokenX ✗
// - Component root — `\.token\b`: also flags hyphen-children (`\b` counts `-` as a boundary); not camelCase or plural.
//   .token ✓ | .token-child ✓ | .tokens ✗
// - Enumerated children — `\.token(-(a|b))?(?![\w-])`: base plus only its known children (avoids a broad root).
//   .token ✓ | .token-a ✓ | .token-c ✗
// - Order-independent combo — `(?=\S*\.a(?![\w-]))(?=\S*\.b(?![\w-]))\S*`: both tokens, any order; `\S*` never crosses whitespace (no descendant match).
//   .a.b ✓ | .b.a ✓ | .a .b ✗
// - Catch-all — `\.token.*`: base plus any suffix.
//   .token ✓ | .tokenX ✓ | .other ✗
export default [
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
		// Status component
		// SEE https://regex101.com/r/ZFxNkG.
		objectPattern: /\.status(?![\w-])/,
		versionDeprecated: '16.2.0',
		versionDeleted: '18.1.0',
		actions: `Remplacer par le composant [Status badge](https://prisme.lucca.io/94310e217/p/425d98-status-badge).`,
	},
	{
		// Any occurrence of one of these selectors in any part of a selector
		// SEE https://regex101.com/r/VHfdte.
		objectPattern: [/\.user-info\b/, /\.user-tile(-(title|label|footnote))?(?![\w-])/, /\.picture(?![\w-])/],
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/wa8g0O.
		objectPattern: [
			// Legacy grid columns and offsets, always suffixed with a breakpoint (`.grid-6\@mediaMinS`)
			/\.grid(-(offset)?\d+)?\\@mediaMin/,
			// Legacy grid mods: any combination of .grid and an alignment or reverse mod, with any non-whitespace character between
			/(?=\S*\.grid(?![\w-]))(?=\S*\.mod-(reverse|(start|center|end|top|middle|bottom|around|between)\\@mediaMin\w*)(?![\w-]))\S*/,
			// Legacy grid ordering utilities
			/\.u-(first|last)\\@mediaMin/,
		],
		versionDeprecated: '16.2.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par le nouveau composant [Grid](https://prisme.lucca.io/94310e217/p/955d69-grid).`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// Legacy form layout, including its children (`.form-group-line-col`…)
		// SEE https://regex101.com/r/s4mzfl.
		objectPattern: /\.form-group\b/,
		versionDeprecated: '16.4.0',
		actions: `
			* sélecteur : \`.form-field\`
			* composants Angular : \`lu-text-input\`, \`lu-checkbox-input\`…
		`,
	},
	{
		// SEE https://regex101.com/r/1MMNCv.
		objectPattern: /\.button-icon(?![\w-])/,
		versionDeprecated: '16.5.0',
		actions: `Retirer la classe : \`.button\` applique déjà la taille d’icône.`,
	},
	{
		// Any combination of .button and .mod-icon, with any non-whitespace character between
		// SEE https://regex101.com/r/6yQzje.
		objectPattern: /(?=\S*\.button(?![\w-]))(?=\S*\.mod-icon(?![\w-]))\S*/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
	},
	{
		// Action icon component, merged into Button
		// SEE https://regex101.com/r/XSreTf.
		objectPattern: /\.actionIcon\b/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
		actions: `
			* sans bordure : \`.button.mod-onlyIcon.mod-ghost\`
			* avec bordure : \`.button.mod-onlyIcon.mod-outlined\`
		`,
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
		actions: `
			* \`*-grey\` ⇒ \`*-neutral\`
			* \`*-primary\` & \`*-secondary\` ⇒ \`*-product\`
			* \`*-lucca\` ⇒ \`*-brand\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/7JXwlm.
		objectPattern: [
			// Any combination of .box, .card or .section and .mod-grey, with any non-whitespace character between
			/(?=\S*\.(box|card|section)(?![\w-]))(?=\S*\.mod-grey(?![\w-]))\S*/,
			/\.icon-color-(primary|secondary)(?![\w-])/,
		],
		versionDeprecated: '17.3.0',
		versionDeleted: '22.0.0',
		actions: `
			* \`*-grey\` ⇒ \`*-neutral\`
			* \`*-primary\` & \`*-secondary\` ⇒ \`*-product\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// Old t-shirt sized utilities
		// - Sizes: 0, XXS-XXL, Auto (margins only).
		// - Directions: physical, Inline, Block. Gaps: gap, rowGap, columnGap.
		// - Excluded: `.u-{margin|padding}{Inline|Block}0`, still shipping (SEE next entry).
		objectPattern: [
			// SEE https://regex101.com/r/YCDDc8.
			/\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])/,
			// Zero border utilities: `.u-` names deleted with the t-shirt utilities, `.pr-u-` names still shipping
			// SEE https://regex101.com/r/nLOfQY.
			/\.u-border(Top|Right|Bottom|Left|Inline|Block)?0(?![\w-])/,
		],
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
		actions: `
			* \`.u-*\` ⇒ \`.pr-u-*\`
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
		// Zero spacing utilities with the deprecated `.u-` prefix, renamed `.pr-u-` in 20.2.0
		// - Box models: margin, padding, inset. Directions: Inline, Block, and their start/end children.
		// - Directional children are hyphenated up to 21.x (`.u-marginInline-start0`) and camelCased since 22.0.0 (`.u-marginInlineStart0`).
		// - Bare `.u-inset0` has no direction.
		// SEE https://github.com/LuccaSA/lucca-front/pull/3814.
		// SEE https://github.com/LuccaSA/lucca-front/pull/5257.
		// SEE https://regex101.com/r/GwCS3W.
		objectPattern: /\.u-(inset0|(margin|padding|inset)(Inline|Block)(-(start|end)|Start|End)?0)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `\`.u-*\` ⇒ \`.pr-u-*\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// Hyphenated zero spacing utilities, duplicates of their camelCase names
		// SEE https://github.com/LuccaSA/lucca-front/pull/5257.
		// SEE https://regex101.com/r/0nhYQP.
		objectPattern: /\.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0(?![\w-])/,
		versionDeleted: '22.0.0',
		actions: `
			Passer en camelCase :

			* \`*-start0\` ⇒ \`*Start0\`
			* \`*-end0\` ⇒ \`*End0\`
		`,
	},
	{
		// Reset position utilities, duplicates of their `0` names
		// SEE https://regex101.com/r/RnSmNe.
		objectPattern: /\.pr-u-(inset|top|bottom|left|right)Reset(?![\w-])/,
		versionDeprecated: '17.4.0',
		actions: `\`*Reset\` ⇒ \`*0\``,
	},
	{
		// SEE https://regex101.com/r/y2kYBk.
		objectPattern: [/\.u-textLeft(?![\w-])/, /\.u-textCenter(?![\w-])/, /\.u-textRight(?![\w-])/],
		versionDeprecated: '18.1.0',
		versionDeleted: '22.0.0',
		actions: `
			Doublon :

			* \`.u-text*\` ⇒ \`.pr-u-textAlign*\`
			* \`*Left\` ⇒ \`*Start\`
			* \`*Right\` ⇒ \`*End\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// `.pr-u-` names of the entry above, still shipping
		// SEE https://regex101.com/r/bskIde.
		objectPattern: /\.pr-u-text(Left|Center|Right)(?![\w-])/,
		versionDeprecated: '18.1.0',
		actions: `
			Doublon :

			* \`*text*\` ⇒ \`*textAlign*\`
			* \`*Left\` ⇒ \`*Start\`
			* \`*Right\` ⇒ \`*End\`
		`,
	},
	{
		// Any combination of .loading and .mod-dialog or .mod-sidePanel, with any non-whitespace character between
		// SEE https://regex101.com/r/XXHZvd.
		objectPattern: /(?=\S*\.loading(?![\w-]))(?=\S*\.mod-(dialog|sidePanel)(?![\w-]))\S*/,
		versionDeprecated: '18.1.0',
		actions: `
			* \`*dialog\` ⇒ \`*popin\`
			* \`*sidePanel\` ⇒ \`*drawer\`
		`,
	},
	{
		// SEE https://regex101.com/r/qlYGD2.
		objectPattern: /\.pr-u-clear(?![\w-])/,
		versionDeprecated: '18.1.2',
		actions: `Remplacer par \`.pr-u-clearBoth\`.`,
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
		// Any combination of .userTile and .mod-XL, .mod-XXL or .mod-XXXL, with any non-whitespace character between
		// SEE https://regex101.com/r/E0zGze.
		objectPattern: /(?=\S*\.userTile(?![\w-]))(?=\S*\.mod-X{1,3}L(?![\w-]))\S*/,
		versionDeprecated: '18.2.0',
		actions: `Remplacer par \`.mod-L\`, la plus grande taille de [User tile](https://prisme.lucca.io/94310e217/p/56d611-user-tile).`,
	},
	{
		// Former host class of the User picture component
		// SEE https://regex101.com/r/6xEhms.
		objectPattern: /\.lu-user-picture(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `Remplacer par le composant [Avatar](https://prisme.lucca.io/94310e217/p/42b330-avatar) et sa classe \`.avatar\`.`,
	},
	{
		// SEE https://regex101.com/r/BktIjm.
		objectPattern: /\.indexTable-body-row-cell-action(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`.indexTable-body-row-cell-link\`, un véritable lien vers la ligne.`,
	},
	{
		// View tabs, renamed Segmented control
		// SEE https://regex101.com/r/a3WT2V.
		objectPattern: /\.viewTabs(-item(-tab)?|_panel)?(?![\w-])/,
		versionDeprecated: '18.2.1',
		actions: `
			Segmented control :

			* \`*viewTabs*\` ⇒ \`*segmentedControl*\`
			* \`*-item-tab\` ⇒ \`*-item-action\`
		`,
	},
	{
		// SEE https://regex101.com/r/8f4B4g.
		objectPattern: [/\.comment-content-textContainer(?![\w-])/, /\.mod-withMenuCompact(?![\w-])/],
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
		},
	},
	{
		// SEE https://regex101.com/r/Ndh0bQ.
		objectPattern: [/\.dialog-form(?![\w-])/, /\.dialog-formOptional(?![\w-])/],
		versionDeprecated: '18.3.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par la classe unique \`.dialog-inside-formOptional\`.`,
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
		actions: `Remplacer par le nouveau DOM du composant [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown).`,
	},
	{
		// SEE https://regex101.com/r/VqPdDw.
		objectPattern: /\.filterBarDeprecated\b/,
		versionDeprecated: '19.2.0',
		versionDeleted: '22.0.0',
	},
	{
		// Physical utilities, replaced by their logical names
		// SEE https://regex101.com/r/w7DSuO.
		objectPattern: [
			// Spacings: `Top` ⇒ `BlockStart`, `Right` ⇒ `InlineEnd`, `Bottom` ⇒ `BlockEnd`, `Left` ⇒ `InlineStart`
			/\.pr-u-(margin|padding)(Top|Right|Bottom|Left)(\d+|Auto)(?![\w-])/,
			/\.pr-u-border(Top|Right|Bottom|Left)0(?![\w-])/,
			// Corners: no logical utility, use the `--pr-t-border-radius-*` tokens
			/\.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius[A-Z]\w*(?![\w-])/,
			// Alignment, float & clear: `Left` ⇒ `Start` / `InlineStart`, `Right` ⇒ `End` / `InlineEnd`
			/\.pr-u-(textAlign|float|clear)(Left|Right)(?![\w-])/,
		],
		versionDeprecated: '19.2.0',
		actions: `
			Utilitaires logiques :

			* \`*Top*\` ⇒ \`*BlockStart*\`
			* \`*Bottom*\` ⇒ \`*BlockEnd*\`
			* \`*Left*\` ⇒ \`*InlineStart*\`
			* \`*Right*\` ⇒ \`*InlineEnd*\`
			* \`*textAlignLeft\` ⇒ \`*textAlignStart\`
			* \`*textAlignRight\` ⇒ \`*textAlignEnd\`
			* Angles physiques ⇒ tokens \`--pr-t-border-radius-*\`.
		`,
	},
	{
		// SEE https://regex101.com/r/1eWJ0d.
		objectPattern: /\.menu\b/,
		versionDeprecated: '19.3.0',
		versionDeleted: '22.0.0',
		actions: `Remplacer par [Horizontal navigation](https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation).`,
	},
	{
		// Page header layout for the deprecated `.menu`
		// SEE https://regex101.com/r/aF0wRq.
		objectPattern: /\.mod-withMenu(?![\w-])/,
		versionDeprecated: '19.3.0',
		actions: `
			* remplacement : \`*withHorizontalNavigation\`
			* suppression : \`.pageHeader\` détecte automatiquement \`.horizontalNavigation\`
		`,
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)(?![\w-])/,
		versionDeprecated: '20.1.0',
		versionDeleted: '22.0.0',
		actions: `
			* XS, S & M : \`.u-text*\` ⇒ \`.pr-u-body*\`
			* L ~ XXXL ⇒
				* utilitaire de titre : \`.pr-u-hx\`
				* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)

			[Plus d’informations sur le sujet](https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9).
		`,
	},
	{
		// `.pr-u-` names of the entry above, still shipping
		// SEE https://regex101.com/r/zdllLi.
		objectPattern: /\.pr-u-text(X?S|M|X{0,3}L)(?![\w-])/,
		versionDeprecated: '20.1.0',
		actions: `
			* XS, S & M : \`*text*\` ⇒ \`*body*\`
			* L ~ XXXL ⇒
				* utilitaire de titre : \`.pr-u-hx\`
				* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)
		`,
	},
	{
		// SEE https://regex101.com/r/aDlJ0h.
		objectPattern: /\.pr-u-h[56](?![\w-])/,
		versionDeprecated: '20.1.0',
		actions: `
			* utilitaire : \`*h4\`
			* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)
		`,
	},
	{
		// Any combination of .button and .mod-text, .mod-delete or .loading, with any non-whitespace character between
		// SEE https://regex101.com/r/5qB2gm.
		objectPattern: /(?=\S*\.button(?![\w-]))(?=\S*\.(mod-text|mod-delete|loading)(?![\w-]))\S*/,
		versionDeprecated: '20.2.0',
		versionDeleted: '22.0.0',
		actions: `
			* \`.mod-text\` ⇒
				* sélecteur : \`.mod-ghost\`
				* input Angular : \`luButton="ghost"\` ou \`luButton="ghost-invert"\`
			* \`.mod-delete\` ⇒
				* sélecteur : \`.mod-critical\`
				* input Angular : \`critical\`
			* \`.loading\` ⇒
				* sélecteur : \`.is-loading\`
				* input Angular : \`state="loading"\`
		`,
	},
	{
		// Any combination of .button-group and .mod-text, with any non-whitespace character between
		// SEE https://regex101.com/r/zjVUrO.
		objectPattern: /(?=\S*\.button-group(?![\w-]))(?=\S*\.mod-text(?![\w-]))\S*/,
		versionDeprecated: '20.2.0',
		actions: `Remplacer par \`.mod-ghost\`.`,
	},
	{
		// Former radius scale (M, L, XL), on the whole box or on logical corners
		// SEE https://regex101.com/r/Yq5V7B.
		objectPattern: [
			/\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)?Radius(M|L|XL)(?![\w-])/,
			/\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)RadiusFull(?![\w-])/,
		],
		versionDeprecated: '20.2.0',
		actions: `
			* \`*RadiusM\` & \`*RadiusL\` ⇒ \`*RadiusDefault\`
			* \`*RadiusXL\` ⇒ \`*RadiusStructure\`
			* Angles ⇒ tokens \`--pr-t-border-radius-*\`.
		`,
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
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
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
			/\.pr-u-textPineappleContrasted(?![\w-])/,
			/\.pr-u-textOrchid(?![\w-])/,
		],
		versionDeprecated: '21.0.0',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// Any combination of .dataTable and .mod-hover, with any non-whitespace character between
		// SEE https://regex101.com/r/IaLzf6.
		objectPattern: /(?=\S*\.dataTable(?![\w-]))(?=\S*\.mod-hover(?![\w-]))\S*/,
		versionDeprecated: '22.0.6',
		actions: `Retirer la classe \`.mod-hover\` et l’input Angular \`hover\`, sans remplacement : une ligne sans action ne doit pas avoir d’effet de survol.`,
	},
	{
		// Text color utilities generated from the palettes deleted in 22.0.0
		// SEE https://regex101.com/r/6PWygU.
		objectPattern: /\.pr-u-colorText(Grey|Lucca|Primary|Secondary)(?![\w-])/,
		versionDeprecated: '21.0.0',
		versionDeleted: '22.0.0',
		actions: `
			* \`*Grey\` ⇒
				* neutre : \`*Neutral\`
				* défaut : \`*\`
			* \`*Primary\` & \`*Secondary\` ⇒ \`*Product\`
			* \`*Lucca\` ⇒ \`*Brand\`
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// AI palette, renamed Orchid
		// SEE https://regex101.com/r/LqKsYf.
		objectPattern: [/\.palette-AI(?![\w-])/, /\.pr-u-colorTextAI(?![\w-])/],
		versionDeleted: '21.3.0',
		actions: `
			* \`*-AI\` ⇒ \`*-orchid\`
			* \`*TextAI\` ⇒ \`*TextOrchid\`
		`,
	},
	{
		// Any combination of .container and .mod-S, with any non-whitespace character between
		// SEE https://regex101.com/r/3KL3jk.
		objectPattern: /(?=\S*\.container(?![\w-]))(?=\S*\.mod-S(?![\w-]))\S*/,
		versionDeprecated: '21.1.0',
		actions: `Retirer la classe \`.mod-S\`, sans remplacement.`,
	},
	{
		// SEE https://regex101.com/r/DWKCa8.
		objectPattern: /\.mod-neutralBackground(?![\w-])/,
		versionDeprecated: '22.0.0',
		actions: `
			* sélecteur : \`.dialog.mod-surfaceDefault\`
			* option de \`LuDialogService.open()\` : \`surfaceDefault: true\`
		`,
	},
	{
		// SEE https://regex101.com/r/HRgrNj.
		objectPattern: /\.fancyBox-content-foreground(?![\w-])/,
		versionDeprecated: '22.1.0',
		actions: `
			* HTML : composant \`lu-fancy-box\`, renommer la classe seule fait disparaître les illustrations
			* input Angular : \`foregroundStartEnd\` à la place de \`foreground\`
		`,
	},
	{
		objectPattern: /\.highlightSection\b/,
		versionDeprecated: '22.1.0',
		actions: `Le composant Highlight section (\`.highlightSection\` et \`<lu-highlight-section>\`) sera remplacé en 22.2 par une évolution du composant Box.`,
	},

	// Deprecated components, including their children (`.textfield-input`…)
	// Keep them after the entries targeting their children, so those messages win.
	{
		// SEE https://regex101.com/r/xNhjam.
		objectPattern: /\.list\b/,
		versionDeprecated: '16.2.2',
		actions: `Remplacer par [Sortable list](https://prisme.lucca.io/94310e217/p/883e34-sortable-list).`,
	},
	{
		// SEE https://regex101.com/r/UiBvDM.
		objectPattern: [/\.checkbox\b/, /\.checkboxesfield\b/],
		actions: `Remplacer par [Checkbox](https://prisme.lucca.io/94310e217/p/42c88e-checkbox).`,
	},
	{
		// SEE https://regex101.com/r/e1p3sA.
		objectPattern: [/\.radio\b/, /\.radiosfield\b/, /\.radioButtons\b/],
		actions: `Remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio).`,
	},
	{
		// SEE https://regex101.com/r/jMc1iX.
		objectPattern: /\.switch\b/,
		actions: `Remplacer par [Switch](https://prisme.lucca.io/94310e217/p/39c7b7-switch).`,
	},
	{
		// SEE https://regex101.com/r/w9keCn.
		objectPattern: /\.textfield\b/,
		actions: `Remplacer par [Textfield](https://prisme.lucca.io/94310e217/p/459eda-textfield).`,
	},
	{
		// SEE https://regex101.com/r/i6H9hf.
		objectPattern: /\.file\b/,
		actions: `Remplacer par [File upload](https://prisme.lucca.io/94310e217/p/8282a5-file-upload).`,
	},
	{
		// SEE https://regex101.com/r/ZPhMSh.
		objectPattern: /\.table\b/,
		actions: `
			* [Data table](https://prisme.lucca.io/94310e217/p/4263a5-data-table)
			* [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table)
		`,
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		objectPattern: [/\.main\b/, /\.layout\b/, /\.header\b/, /\.filters\b/, /\.notchBox\b/],
	},

	// Any occurrence of one of these selectors in any part of a selector.
	// Kept after the specific entries (`.lu-select-value .label`…), which must win, and before the `.u-` catch-all: `.u-textLight` must still report here.
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

	// Catch-all, keep last
	{
		// Any utility with the `.u-` prefix, renamed `.pr-u-` in 20.2.0 and only emitted with `$deprecatedUtilityPrefix: true` since
		// SEE https://github.com/LuccaSA/lucca-front/pull/3814.
		// SEE https://regex101.com/r/Yf9bsZ.
		objectPattern: /\.u-[a-zA-Z]/,
		versionDeprecated: '20.2.0',
		actions: `\`.u-*\` ⇒ \`.pr-u-*\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
];
