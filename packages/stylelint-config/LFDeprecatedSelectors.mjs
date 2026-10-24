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
// - Order-independent combo — `(?=[^\s>+~]*\.a(?![\w-]))(?=[^\s>+~]*\.b(?![\w-]))[^\s>+~]*`: both tokens, any order; `[^\s>+~]*` stays within one compound selector.
//   .a.b ✓ | .b.a ✓ | .a .b ✗ | .a>.b ✗
// - Catch-all — `\.token.*`: base plus any suffix.
//   .token ✓ | .tokenX ✓ | .other ✗
//
// Sorted by version: `versionDeprecated`, else `versionDeleted`.
// ==============================================================================================

export default [
	{
		// Lowercase breakpoints, renamed in uppercase in 15.1.0: placed before `.form-group` and `.table`, which also match these selectors.
		// SEE https://regex101.com/r/uw6m3P.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/components/grid/index.scss#L51.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/components/form/index.scss#L24.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/components/tableSticked/index.scss#L14.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a7fd39f92ff5e7d68c4ae07935bb96196fe50815/packages/scss/src/components/tableFixed/index.scss#L15.
		// SEE https://github.com/LuccaSA/lucca-front/commit/66e12140f271c541e74db3ec79af116c72c69889.
		objectPattern: [
			// Colonnes de grille
			/\.grid-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)(\d+|Offset\d+)?(?![\w-])/,
			// Alignements de grille
			/\.mod-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)(Start|Center|End|Top|Middle|Bottom|Around|Between)(?![\w-])/,
			// Colonnes de formulaire
			/\.mod-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)\d+(?![\w-])/,
			// Tableaux
			/\.mod-(stickyColumn-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)|layoutFixed-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)\d+)(?![\w-])/,
		],
		versionDeleted: '15.1.0',
		actions: `Écrire le point de rupture en majuscules (\`l\` ⇒ \`L\`), puis appliquer les dépréciations suivantes du composant.`,
	},
	{
		// Status component
		// SEE https://regex101.com/r/ZFxNkG.
		// SEE https://github.com/LuccaSA/lucca-front/releases/tag/v16.2.0.
		// SEE https://github.com/LuccaSA/lucca-front/commit/cbd937b606666f1f7c8b076495f9d44b483d237a.
		name: 'Status',
		objectPattern: /\.status(-dot(-important)?|-label)?(?![\w-])/,
		versionDeprecated: '16.2.0',
		versionDeleted: '18.1.0',
		actions: `Remplacer par le composant [Status badge](https://prisme.lucca.io/94310e217/p/425d98-status-badge).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/569078-status',
		},
	},
	{
		// SEE https://regex101.com/r/wa8g0O.
		// SEE https://github.com/LuccaSA/lucca-front/blob/79401000ea2b96ce82a5ad2965952a04ea980703/packages/scss/src/components/index.scss#L54.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: [
			// Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (`.grid-6\@mediaMinS`)
			/\.grid(-(offset)?\d+)?\\@mediaMin/,
			// Mods de l’ancienne grille, combinés à `.grid`
			/(?=[^\s>+~]*\.grid(?![\w-]))(?=[^\s>+~]*\.mod-(reverse|(start|center|end|top|middle|bottom|around|between)\\@mediaMin\w*)(?![\w-]))[^\s>+~]*/,
			// Utilitaires de placement de l’ancienne grille
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
		// SEE https://regex101.com/r/43OspP.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5bbf9a6ff0f01b15a5485401d0dd4cf5142c05c9/packages/scss/src/components/util/index.scss#L19.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: /\.u-elevate[1-6](?![\w-])/,
		versionDeprecated: '16.2.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449).`,
	},
	{
		// SEE https://regex101.com/r/yt2aCa.
		// SEE https://github.com/LuccaSA/lucca-front/blob/aeac8903fc82846f9e8cab4533ece52926831de1/packages/scss/src/components/textfield/mods.scss#L35.
		// SEE https://github.com/LuccaSA/lucca-front/commit/cbd937b606666f1f7c8b076495f9d44b483d237a.
		objectPattern: /\.textfield-actionClear(?![\w-])/,
		versionDeprecated: '16.2.2',
		versionDeleted: '18.1.0',
		actions: `Remplacer par le composant [Clear](https://prisme.lucca.io/94310e217/p/80fb2d-clear). [Voir l’exemple](https://prisme.lucca.io/94310e217/p/55f101-text-field-deprecated/t/page-55f101-47914164-17).`,
	},
	{
		// Label used as a counter in a menu or horizontal navigation item, replaced by Numeric badge in 16.3.0.
		// Kept before the Label component entry, which matches it too.
		// SEE https://regex101.com/r/ag9QK4.
		// SEE https://github.com/LuccaSA/lucca-front/blob/2358bf0f58eb26a5a85dd7e8b90a0cc99e87bbd6/packages/scss/src/components/menu/component.scss#L25.
		// SEE https://github.com/LuccaSA/lucca-front/commit/2358bf0f58eb26a5a85dd7e8b90a0cc99e87bbd6.
		objectPattern: [
			// Compteur dans un élément de navigation :
			/\.(menu|horizontalNavigation)(-[\w-]+)?\s(.*\s)?\.label(?![\w-])/,
		],
		versionDeprecated: '16.3.0',
		actions: `Remplacer par [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge).`,
	},
	{
		// Any combination of .button and .mod-counter, within one compound selector
		// SEE https://regex101.com/r/9WOlXc.
		// SEE https://github.com/LuccaSA/lucca-front/blob/4c9e247a76f34292090b22991a24ae603142f7c7/packages/scss/src/components/button/index.scss#L33.
		// SEE https://github.com/LuccaSA/lucca-front/commit/cbd937b606666f1f7c8b076495f9d44b483d237a.
		objectPattern: /(?=[^\s>+~]*\.button(?![\w-]))(?=[^\s>+~]*\.mod-counter(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '16.3.0',
		versionDeleted: '18.1.0',
		actions: `Inutile depuis le composant [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge). [Voir l’exemple](https://prisme.lucca.io/94310e217/p/098404-button/t/page-098404-82776006-50af19-6).`,
	},
	{
		// SEE https://regex101.com/r/AUlf21.
		// SEE https://github.com/LuccaSA/lucca-front/blob/4c9e247a76f34292090b22991a24ae603142f7c7/packages/scss/src/components/button/mods.scss#L59.
		// SEE https://github.com/LuccaSA/lucca-front/commit/cbd937b606666f1f7c8b076495f9d44b483d237a.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5cb11aa50a56e8cbc844f5f683c91e50b429f6c4/packages/scss/src/components/navside/component.scss#L114.
		// SEE https://github.com/LuccaSA/lucca-front/blob/ac3cbedd153698001ffe054d81c8b97b7a1877ba/packages/ng/styles/definitions/select/_select-input.scss#L133.
		objectPattern: [/\.button-counter(?![\w-])/, /\.navSide-item-alert(?![\w-])/, /\.lu-select-value \.label(?![\w-])/],
		versionDeprecated: '16.3.0',
		versionDeleted: '18.1.0',
		actions: `
			* \`.button-counter\` ⇒ [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge)
			* \`.navSide-item-alert\` ⇒ [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge) ou [New badge](https://prisme.lucca.io/94310e217/p/36bcdf-new-badge)
			* \`.lu-select-value .label\` ⇒ [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge) ou le sous-composant dédié de Select Multiple
		`,
	},
	{
		// Legacy form layout, including its children (`.form-group-line-col`…)
		// SEE https://regex101.com/r/s4mzfl.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3cf38ef202523f291b06db60aadc47efd2e7c15a/packages/scss/src/components/form/index.scss#L38.
		objectPattern: /\.form-group\b/,
		versionDeprecated: '16.4.0',
		actions: `
			* sélecteur : \`.form-field\`
			* composants Angular : \`lu-text-input\`, \`lu-checkbox-input\`…
		`,
	},
	{
		// SEE https://regex101.com/r/1MMNCv.
		// SEE https://github.com/LuccaSA/lucca-front/blob/73a4ff23d09d42d32041f6c0da181e9d71733a74/packages/scss/src/components/button/component.scss#L32.
		objectPattern: /\.button-icon(?![\w-])/,
		versionDeprecated: '16.5.0',
		actions: `Retirer la classe : \`.button\` applique déjà la taille d’icône.`,
	},
	{
		// Any combination of .callout and .mod-tiny, within one compound selector
		// SEE https://regex101.com/r/rW039S.
		// SEE https://github.com/LuccaSA/lucca-front/blob/674535dace069360d6103adae0d468fbc7421736/stories/qa/callout/callout.stories.html#L330.
		// SEE https://github.com/LuccaSA/lucca-front/commit/cbd937b606666f1f7c8b076495f9d44b483d237a.
		objectPattern: /(?=[^\s>+~]*\.callout(?![\w-]))(?=[^\s>+~]*\.mod-tiny(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '16.5.0',
		versionDeleted: '18.1.0',
		actions: `Remplacer par le composant [Callout popover](https://prisme.lucca.io/94310e217/p/64c8d8-callout).`,
	},
	{
		// Any combination of .button and .mod-icon, within one compound selector
		// SEE https://regex101.com/r/6yQzje.
		// SEE https://github.com/LuccaSA/lucca-front/blob/243a5f40578079a235982456ee8f9f772aefeead/packages/scss/src/components/button/index.scss#L41.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: /(?=[^\s>+~]*\.button(?![\w-]))(?=[^\s>+~]*\.mod-icon(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par \`.mod-withIcon\`, pour éviter la confusion avec \`.mod-onlyIcon\`.`,
	},
	{
		// Action icon component, merged into Button
		// SEE https://regex101.com/r/XSreTf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/243a5f40578079a235982456ee8f9f772aefeead/packages/scss/src/components/actionIcon/index.scss#L1.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		name: 'Action icon',
		objectPattern: /\.actionIcon\b/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
		actions: `
			* sans bordure : \`.button.mod-onlyIcon.mod-ghost\`
			* avec bordure : \`.button.mod-onlyIcon.mod-outlined\`
		`,
	},
	{
		// SEE https://regex101.com/r/9yDStD.
		// SEE https://github.com/LuccaSA/lucca-front/blob/1ca4668b25117075485ce1ad0c2beba9876b134e/packages/scss/src/components/emptyStateDeprecated/component.scss#L9.
		// SEE https://github.com/LuccaSA/lucca-front/commit/5da372590.
		name: 'Empty state',
		objectPattern: /\.emptyState-(title|description)(?![\w-])/,
		versionDeprecated: '17.2.0',
		versionDeleted: '19.1.0',
		actions: `Remplacer par le nouveau composant [Empty state](https://prisme.lucca.io/94310e217/p/77bb47-empty-state).`,
	},
	{
		// Any combination of .button and .loading, within one compound selector
		// SEE https://regex101.com/r/2L0Pw4.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L116.
		objectPattern: /(?=[^\s>+~]*\.button(?![\w-]))(?=[^\s>+~]*\.loading(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '17.3.0',
		actions: `
			* sélecteur : \`.is-loading\`
			* input Angular : \`state="loading"\`
		`,
	},
	{
		// Any combination of .button and .disabled, .error, .mod-link, .mod-outline or .success, within one compound selector
		// SEE https://regex101.com/r/OTnSEg.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L24.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L126.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L31.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L19.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0bb0a5c0bbf2ec141c1cb3d11578161545ef4bc9/packages/scss/src/components/button/index.scss#L132.
		objectPattern: /(?=[^\s>+~]*\.button(?![\w-]))(?=[^\s>+~]*\.(disabled|error|mod-link|mod-outline|success)(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '17.3.0',
	},
	{
		// SEE https://regex101.com/r/nPMyQZ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6be50a4dac63e15378ae529426817c4e6be5fb84/packages/scss/src/commons/config.scss#L11.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// SEE https://github.com/LuccaSA/lucca-front/blob/6be50a4dac63e15378ae529426817c4e6be5fb84/packages/scss/src/components/box/index.scss#L7.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
		// SEE https://github.com/LuccaSA/lucca-front/blob/6be50a4dac63e15378ae529426817c4e6be5fb84/packages/ng/icon/icon.component.scss#L7.
		objectPattern: [
			// Toute combinaison de `.box`, `.card` ou `.section` avec `.mod-grey`
			/(?=[^\s>+~]*\.(box|card|section)(?![\w-]))(?=[^\s>+~]*\.mod-grey(?![\w-]))[^\s>+~]*/,
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
		// The `.lu-select-*` classes stay out: the API and date selects, not deprecated, still emit them.
		// SEE https://regex101.com/r/dwPyNk.
		// SEE https://github.com/LuccaSA/lucca-front/commit/9b71a76ca515ad8ae2d675bcba5ae39882beeaf7.
		// SEE https://github.com/LuccaSA/lucca-front/blob/9154c555b6a417bf1193f469246e6af8e4c71fee/packages/ng/select/input/select-input.component.ts#L203.
		name: 'Select',
		objectPattern: /(?<![\w.#="'-])lu-select(?![\w-])/,
		versionDeprecated: '17.3.2',
		actions: `
			Remplacer par [Simple](https://prisme.lucca.io/94310e217/p/587833-select-simple) & [Multiple Select](https://prisme.lucca.io/94310e217/p/927519-select-multiple-new) et leurs directives.

			Variations concernées :

			* [API](https://prisme.lucca.io/94310e217/p/699694-api-select)
			* [Establishment](https://prisme.lucca.io/94310e217/p/70d7eb-establishment)
			* [Department](https://prisme.lucca.io/94310e217/p/479237-department-select-)
			* [User](https://prisme.lucca.io/94310e217/p/691517-select)
			* [Qualification](https://prisme.lucca.io/94310e217/p/69f87f-qualification)
		`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated',
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/LKOdgf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/307429b94f4b3e5cb2809a4153201417a6115711/packages/ng/qualification/select/input/qualification-select-input.component.ts#L15.
		// SEE https://github.com/LuccaSA/lucca-front/pull/2614.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		name: 'Qualification picker',
		objectPattern: /(?<![\w.#="'-])lu-qualification-select(?![\w-])/,
		versionDeprecated: '17.3.2',
		versionDeleted: '20.1.0',
		actions: `Remplacer par les directives de [Simple](https://prisme.lucca.io/94310e217/p/587833-select-simple/b/991e87) et [Multiple Select](https://prisme.lucca.io/94310e217/p/927519-select-multiple-new/b/39e067).`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
	{
		// SEE https://regex101.com/r/Ndh0bQ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/d1f911b8d34cbba6945d16538b58eb558feda634/packages/scss/src/components/dialog/component.scss#L37.
		objectPattern: /\.dialog-form(?![\w-])/,
		versionDeprecated: '17.3.5',
		actions: `Remplacer par la classe unique \`.dialog-inside-formOptional\`.`,
	},
	{
		// SEE https://regex101.com/r/y2kYBk.
		// SEE https://github.com/LuccaSA/lucca-front/blob/38b47f6750491ded25c0d835f703d5d9da3d32df/packages/scss/src/commons/utils/index.scss#L204.
		objectPattern: [/\.u-textLeft(?![\w-])/, /\.u-textCenter(?![\w-])/, /\.u-textRight(?![\w-])/],
		versionDeprecated: '17.4.0',
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
		// Any combination of .breadcrumbs-list-item-action and .active, within one compound selector
		// SEE https://regex101.com/r/puV4bl.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5f325acbb26f67993d110ccd13e08ae63e1f9ab4/packages/scss/src/components/breadcrumbs/index.scss#L13.
		objectPattern: /(?=[^\s>+~]*\.breadcrumbs-list-item-action(?![\w-]))(?=[^\s>+~]*\.active(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '17.4.0',
	},
	{
		// SEE https://regex101.com/r/VGtzuM.
		// SEE https://github.com/LuccaSA/lucca-front/blob/38b47f6750491ded25c0d835f703d5d9da3d32df/packages/scss/src/commons/utils/index.scss#L236.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/38b47f6750491ded25c0d835f703d5d9da3d32df/packages/scss/src/commons/utils/index.scss#L231.
		objectPattern: [/\.u-comma(?![\w-])/, /\.u-unit(?![\w-])/],
		versionDeprecated: '17.4.0',
		versionDeleted: '19.1.0',
		actions: `
			* \`.u-comma\` ⇒ virgules dans le HTML, pour l’accessibilité
			* \`.u-unit\` ⇒ aucun remplacement, à reprendre côté produit si nécessaire
		`,
	},
	{
		// Old t-shirt sized utilities
		// - Sizes: 0, XXS-XXL, Auto (margins only).
		// - Directions: physical, Inline, Block. Gaps: gap, rowGap, columnGap.
		// - Excluded: `.u-{margin|padding}{Inline|Block}0`, still shipping (SEE next entry).
		// SEE https://github.com/LuccaSA/lucca-front/blob/6f83f82a5f0dcfbf3ad08742ca577889802b8385/packages/scss/src/commons/config.scss#L4.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3ae878c48cd6344f155dbba44b4d409b3ab1d6bf.
		objectPattern: [
			// SEE https://regex101.com/r/YCDDc8.
			/\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])/,
			// Utilitaires de bordure nulle : `.u-` supprimés avec les utilitaires t-shirt, `.pr-u-` toujours présents
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
		// Any combination of .loading and .mod-dialog or .mod-sidePanel, within one compound selector
		// SEE https://regex101.com/r/XXHZvd.
		// SEE https://github.com/LuccaSA/lucca-front/blob/aa1135a0d41086f89ea098b764883b1278c6541e/packages/scss/src/components/loading/index.scss#L19.
		objectPattern: /(?=[^\s>+~]*\.loading(?![\w-]))(?=[^\s>+~]*\.mod-(dialog|sidePanel)(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '18.1.0',
		actions: `
			* \`*dialog\` ⇒ \`*popin\`
			* \`*sidePanel\` ⇒ \`*drawer\`
		`,
	},
	{
		// Any combination of .userTile and .mod-XL, .mod-XXL or .mod-XXXL, within one compound selector
		// SEE https://regex101.com/r/E0zGze.
		// SEE https://github.com/LuccaSA/lucca-front/blob/22716b6cf5747cdc3172d2e33b1d3a45ecad9ec6/packages/scss/src/components/userTile/index.scss#L28.
		objectPattern: /(?=[^\s>+~]*\.userTile(?![\w-]))(?=[^\s>+~]*\.mod-X{1,3}L(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '18.2.0',
		actions: `Remplacer par \`.mod-L\`, la plus grande taille de [User tile](https://prisme.lucca.io/94310e217/p/56d611-user-tile).`,
	},
	{
		// Former host class of the User picture component
		// SEE https://regex101.com/r/6xEhms.
		// SEE https://github.com/LuccaSA/lucca-front/blob/dc0da551b981fe0e351baf56e57dce711d7e6880/packages/scss/src/components/avatar/index.scss#L3.
		name: 'User picture',
		objectPattern: /\.lu-user-picture(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `Remplacer par le composant [Avatar](https://prisme.lucca.io/94310e217/p/42b330-avatar) et sa classe \`.avatar\`.`,
	},
	{
		// SEE https://regex101.com/r/BktIjm.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a69b1c834c8f73d80d105a936343910891c244b7/packages/scss/src/components/indexTable/component.scss#L188.
		objectPattern: /\.indexTable-body-row-cell-action(?![\w-])/,
		versionDeprecated: '18.2.0',
		actions: `Remplacer par \`.indexTable-body-row-cell-link\`, un véritable lien vers la ligne.`,
	},
	{
		// Misspelt class, renamed `.dialog-formOptional` in 18.2.0 without a deprecation.
		// SEE https://regex101.com/r/XC32QA.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3bc06c234/packages/scss/src/components/dialog/component.scss#L46.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0b0e564717726988df6b5f3ea52a46cff841864d.
		objectPattern: /\.dialog-formOptionnal(?![\w-])/,
		versionDeleted: '18.2.0',
		actions: `Remplacer par la classe unique \`.dialog-inside-formOptional\`.`,
	},
	{
		// Any occurrence of one of these selectors in any part of a selector
		// SEE https://regex101.com/r/VHfdte.
		// SEE https://github.com/LuccaSA/lucca-front/blob/22716b6cf5747cdc3172d2e33b1d3a45ecad9ec6/packages/scss/src/components/userTile/component.scss#L8.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		// SEE https://github.com/LuccaSA/lucca-front/blob/dc0da551b981fe0e351baf56e57dce711d7e6880/packages/scss/src/components/avatar/component.scss#L12.
		// SEE https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/16627d.
		name: 'User tile',
		objectPattern: [/\.user-info\b/, /\.user-tile(-(title|label|footnote))?(?![\w-])/, /\.picture(?![\w-])/],
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `
			* \`.user-info\` & \`.user-tile*\` ⇒ \\
			  [User tile](https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/00d3d8) : composant Angular ou [classes HTML](https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/771576)
			* \`.picture\` ⇒ [Avatar](https://prisme.lucca.io/94310e217/p/42b330-avatar/b/915f82)
		`,
	},
	{
		// Any combination of .table-head-row-cell and .mod-columnSticky-shadowMask, within one compound selector
		// SEE https://regex101.com/r/HoanMW.
		// SEE https://github.com/LuccaSA/lucca-front/blob/69d12b5e0e526a763ebf43d8d4443bd35addb8f9/packages/scss/src/components/tableStickedDeprecated/mods.scss#L65.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern: /(?=[^\s>+~]*\.table-head-row-cell(?![\w-]))(?=[^\s>+~]*\.mod-columnSticky-shadowMask(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`.mod-stickyColumn-shadowMask\`.`,
	},
	{
		// SEE https://regex101.com/r/1EfDam
		// SEE https://github.com/LuccaSA/lucca-front/blob/a69b1c834c8f73d80d105a936343910891c244b7/packages/scss/src/components/tableSortable/index.scss#L3.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern: [/\.(indexT|t)able-head-row-cell-sortableButton(-arrows-(ascending|descending))?(?![\w-])/],
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par le sous-composant tableSortable commun à [Table](https://prisme.lucca.io/94310e217/p/75b1ea-table/t/page-75b1ea-67463914-5) et [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table-new/t/page-24fc14-90701228-74b8e8-3).`,
	},
	{
		// Any combination of .table-head-row-cell or .indexTable-head-row-cell and a sort mod or state (.mod-sortable, .sortedAscending, .sortedDescending, .is-sorted-ascending, .is-sorted-descending), within one compound selector
		// SEE https://regex101.com/r/NFrjBF.
		// SEE https://github.com/LuccaSA/lucca-front/blob/a69b1c834c8f73d80d105a936343910891c244b7/packages/scss/src/components/tableSortable/index.scss#L55.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern:
			/(?=[^\s>+~]*\.(indexT|t)able-head-row-cell(?![\w-]))(?=[^\s>+~]*\.(mod-sortable|sortedAscending|sortedDescending|is-sorted-(ascending|descending))(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par le sous-composant tableSortable commun à [Table](https://prisme.lucca.io/94310e217/p/75b1ea-table/t/page-75b1ea-67463914-5) et [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table-new/t/page-24fc14-90701228-74b8e8-3).`,
	},
	{
		// Any combination of .userTile and .mod-nameOnly, within one compound selector
		// SEE https://regex101.com/r/M2HhEJ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/userTile/index.scss#L7.
		// SEE https://github.com/LuccaSA/lucca-front/commit/22716b6cf5747cdc3172d2e33b1d3a45ecad9ec6.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern: /(?=[^\s>+~]*\.userTile(?![\w-]))(?=[^\s>+~]*\.mod-nameOnly(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/vgycmM.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/avatar/mods.scss#L89.
		// SEE https://github.com/LuccaSA/lucca-front/commit/dc0da551b981fe0e351baf56e57dce711d7e6880.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern: /\.userPicture-initials(?![\w-])/,
		versionDeprecated: '18.2.0',
		versionDeleted: '20.1.0',
	},
	{
		// View tabs, renamed Segmented control
		// SEE https://regex101.com/r/a3WT2V.
		// SEE https://github.com/LuccaSA/lucca-front/blob/1ebcfb26f56530a1f918f3ddec4dacba290b8898/packages/scss/src/components/segmentedControl/index.scss#L4.
		name: 'View tabs',
		objectPattern: /\.viewTabs(-item(-tab)?|_panel)?(?![\w-])/,
		versionDeprecated: '18.2.1',
		actions: `
			Segmented control :

			* \`.viewTabs*\` ⇒ \`.segmentedControl*\`
			* \`*-item-tab\` ⇒ \`*-item-action\`
		`,
	},
	{
		// SEE https://regex101.com/r/Ct4jxl.
		// SEE https://github.com/LuccaSA/lucca-front/blob/d66db6850f4393a4b7dbe61c15207d1185516ec8/packages/scss/src/components/navside/mods.scss#L11.
		objectPattern: [
			// Largeur compacte de `.navSide`, sur n’importe quel élément de la page
			/\.mod-withMenuCompact(?![\w-])/,
		],
		versionDeprecated: '18.3.0',
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
		},
	},
	{
		// SEE https://regex101.com/r/WOAbdM.
		// SEE https://github.com/LuccaSA/lucca-front/blob/13ef1a517c8a6016df65d8dc106c676d120b33cf/packages/scss/src/components/dialog/component.scss#L32.
		objectPattern: /\.dialog-formOptional(?![\w-])/,
		versionDeprecated: '18.3.0',
		actions: `Remplacer par la classe unique \`.dialog-inside-formOptional\`.`,
	},
	{
		// SEE https://regex101.com/r/8f4B4g.
		// SEE https://github.com/LuccaSA/lucca-front/blob/835878ba8719c693b63123293c5cbcd224447e63/packages/scss/src/components/comment/component.scss#L81.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a273d572892c957de5be340926db885576c41d89.
		objectPattern: /\.comment-content-textContainer(?![\w-])/,
		versionDeprecated: '18.3.0',
		versionDeleted: '20.1.0',
		actions: `Remplacer par \`.comment-content-textContainerOptional\`.`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f',
		},
	},
	{
		// Any combination of .calendarWrapper-navigation and .mod-prev or .mod-next, within one compound selector
		// SEE https://regex101.com/r/oye8NK.
		// SEE https://github.com/LuccaSA/lucca-front/blob/0d474e96786a71f224b9e0d57397f8c50399a457/packages/scss/src/components/calendar/component.scss#L54.
		// SEE https://github.com/LuccaSA/lucca-front/commit/1ca565527cdf4bcf7abab16cddacded11a9eef65.
		objectPattern: /(?=[^\s>+~]*\.calendarWrapper-navigation(?![\w-]))(?=[^\s>+~]*\.mod-(prev|next)(?![\w-]))[^\s>+~]*/,
		versionDeleted: '19.1.0',
	},
	{
		// SEE https://regex101.com/r/7wO4Oc.
		// SEE https://github.com/LuccaSA/lucca-front/blob/ae4ffb558579b73a0543e670fada6f8cd31d6a98/packages/scss/src/components/dropdown/index.scss#L3.
		objectPattern: /\.lu-dropdown-(content|options|options-item|options-item-action)(?![\w-])/,
		versionDeprecated: '19.2.0',
		actions: `Remplacer par le nouveau DOM du composant [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown).`,
	},
	{
		// SEE https://regex101.com/r/VqPdDw.
		// SEE https://github.com/LuccaSA/lucca-front/blob/48b4f20edc03b38a32f23058ea8cd5ff3de983dc/packages/scss/src/components/filterBarDeprecated/index.scss#L3.
		name: 'Filter bar',
		objectPattern: /\.filterBarDeprecated\b/,
		versionDeprecated: '19.2.0',
		actions: `Remplacer par [Filter Pills](https://prisme.lucca.io/94310e217/p/053be4-filter-pill) & [Filter Bar](https://prisme.lucca.io/94310e217/p/13044b-filter-bar-).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/334d4a-filter-bar',
		},
	},
	{
		// Physical utilities, replaced by their logical names
		// SEE https://regex101.com/r/w7DSuO.
		// SEE https://github.com/LuccaSA/lucca-front/blob/24575bdd120778f19e0cbb2b47ffc9b6e4491bba/packages/scss/src/commons/core.scss#L12.
		objectPattern: [
			// Espacements : `Top` ⇒ `BlockStart`, `Right` ⇒ `InlineEnd`, `Bottom` ⇒ `BlockEnd`, `Left` ⇒ `InlineStart`
			/\.pr-u-(margin|padding)(Top|Right|Bottom|Left)(\d+|Auto)(?![\w-])/,
			/\.pr-u-border(Top|Right|Bottom|Left)0(?![\w-])/,
		],
		versionDeprecated: '19.2.0',
		actions: `
			Utilitaires logiques :

			* \`*Top*\` ⇒ \`*BlockStart*\`
			* \`*Bottom*\` ⇒ \`*BlockEnd*\`
			* \`*Left*\` ⇒ \`*InlineStart*\`
			* \`*Right*\` ⇒ \`*InlineEnd*\`
		`,
	},
	{
		// SEE https://regex101.com/r/1eWJ0d.
		// SEE https://github.com/LuccaSA/lucca-front/blob/63324c9df3d6955360f0d0e2843ea441d9f8f92f/packages/scss/src/components/horizontalNavigation/index.scss#L3.
		name: 'Menu',
		objectPattern: /\.menu\b/,
		versionDeprecated: '19.3.0',
		actions: `Remplacer par [Horizontal navigation](https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation).`,
	},
	{
		// Page header layout for the deprecated `.menu`
		// Any combination of .pageHeader and .mod-withMenu, within one compound selector
		// SEE https://regex101.com/r/aF0wRq.
		// SEE https://github.com/LuccaSA/lucca-front/blob/63324c9df3d6955360f0d0e2843ea441d9f8f92f/packages/scss/src/components/pageHeader/index.scss#L7.
		objectPattern: /(?=[^\s>+~]*\.pageHeader(?![\w-]))(?=[^\s>+~]*\.mod-withMenu(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '19.3.0',
		actions: `
			* remplacement : \`*withHorizontalNavigation\`
			* suppression : \`.pageHeader\` détecte automatiquement \`.horizontalNavigation\`
		`,
	},
	{
		// SEE https://regex101.com/r/rOqMxE.
		// SEE https://github.com/LuccaSA/lucca-front/blob/3e49b45abf16b48b54ecf6000a66aaf7a107bc7f/packages/scss/src/commons/core.scss#L148.
		objectPattern: /\.u-text(X?S|M|X{0,3}L)(?![\w-])/,
		versionDeprecated: '20.1.0',
		actions: `
			* XS, S & M : \`.u-text*\` ⇒ \`.pr-u-body*\`
			* L ~ XXXL ⇒
				* utilitaire de titre : \`.pr-u-hx\`
				* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)

			[Plus d’informations sur le sujet](https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9).
		`,
	},
	{
		// SEE https://regex101.com/r/BXnpmG.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/filterBar/component.scss#L34.
		// SEE https://github.com/LuccaSA/lucca-front/commit/90aa5c65c1644ce779cdf86ae85530e212b79c71.
		objectPattern: /\.filterBar-scrollBox-(first|last)(?![\w-])/,
		versionDeleted: '20.1.0',
	},
	{
		// SEE https://regex101.com/r/N2e4Ox.
		// SEE https://github.com/LuccaSA/lucca-front/blob/e74c51df4acd967cb2f64e7702dd79569f60bbc0/packages/scss/src/components/indexTable/mods.scss#L301.
		// SEE https://github.com/LuccaSA/lucca-front/commit/b1cecc4633547398360f37a4a761ac11545e4aa3.
		objectPattern: /\.indexTable-body-row-cell-subAction(DropdownTrigger)?(?![\w-])/,
		versionDeleted: '20.1.0',
	},
	{
		// Reset position utilities, duplicates of their `0` names
		// SEE https://regex101.com/r/RnSmNe.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/utils/index.scss#L497.
		objectPattern: /\.pr-u-(inset|top|bottom|left|right)Reset(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `\`*Reset\` ⇒ \`*0\``,
	},
	{
		// `.pr-u-` names of the entry above, still shipping
		// SEE https://regex101.com/r/bskIde.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/utils/index.scss#L381.
		objectPattern: /\.pr-u-text(Left|Center|Right)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `
			Doublon :

			* \`*text*\` ⇒ \`*textAlign*\`
			* \`*Left\` ⇒ \`*Start\`
			* \`*Right\` ⇒ \`*End\`
		`,
	},
	{
		// SEE https://regex101.com/r/qlYGD2.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/utils/index.scss#L305.
		objectPattern: /\.pr-u-clear(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `Remplacer par \`.pr-u-clearBoth\`.`,
	},
	{
		// Physical utilities, born deprecated with the `.pr-u-` prefix
		// SEE https://regex101.com/r/BcMSPB.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/core.scss#L191.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/core.scss#L85.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/utils/index.scss#L311.
		objectPattern: [
			// Coins : pas d’utilitaire logique, utiliser les tokens `--pr-t-border-radius-*`
			/\.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius[A-Z]\w*(?![\w-])/,
			// Alignement, float & clear : `Left` ⇒ `Start` / `InlineStart`, `Right` ⇒ `End` / `InlineEnd`
			/\.pr-u-(textAlign|float|clear)(Left|Right)(?![\w-])/,
		],
		versionDeprecated: '20.2.0',
		actions: `
			Utilitaires logiques :

			* \`*Left\` ⇒ \`*InlineStart\`
			* \`*Right\` ⇒ \`*InlineEnd\`
			* \`*textAlignLeft\` ⇒ \`*textAlignStart\`
			* \`*textAlignRight\` ⇒ \`*textAlignEnd\`
			* Coins physiques ⇒ tokens \`--pr-t-border-radius-*\`.
		`,
	},
	{
		// `.pr-u-` names of the entry above, still shipping
		// SEE https://regex101.com/r/zdllLi.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/core.scss#L173.
		objectPattern: /\.pr-u-text(X?S|M|X{0,3}L)(?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `
			* XS, S & M : \`*text*\` ⇒ \`*body*\`
			* L ~ XXXL ⇒
				* utilitaire de titre : \`.pr-u-hx\`
				* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)
		`,
	},
	{
		// SEE https://regex101.com/r/aDlJ0h.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/utils/index.scss#L360.
		objectPattern: /\.pr-u-h[56](?![\w-])/,
		versionDeprecated: '20.2.0',
		actions: `
			* utilitaire : \`*h4\`
			* token : [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311)
		`,
	},
	{
		// Any combination, within one compound selector, of:
		// .button and .mod-text or .mod-delete;
		// .button-group and .mod-text;
		// a dropdown option action and .mod-delete.
		// SEE https://regex101.com/r/5qB2gm.
		// SEE https://github.com/LuccaSA/lucca-front/blob/00f3b927aede5f55a94620cb0dfb7d43ee7bdaff/packages/scss/src/components/button/index.scss#L31.
		// SEE https://regex101.com/r/zjVUrO.
		// SEE https://github.com/LuccaSA/lucca-front/blob/00f3b927aede5f55a94620cb0dfb7d43ee7bdaff/packages/scss/src/components/buttonGroup/index.scss#L11.
		// SEE https://regex101.com/r/B2oF7e.
		// SEE https://github.com/LuccaSA/lucca-front/blob/00f3b927aede5f55a94620cb0dfb7d43ee7bdaff/packages/scss/src/components/dropdown/index.scss#L16.
		objectPattern: [
			/(?=[^\s>+~]*\.button(?![\w-]))(?=[^\s>+~]*\.(mod-text|mod-delete)(?![\w-]))[^\s>+~]*/,
			/(?=[^\s>+~]*\.button-group(?![\w-]))(?=[^\s>+~]*\.mod-text(?![\w-]))[^\s>+~]*/,
			/(?=[^\s>+~]*\.(dropdown-list-option-action|lu-dropdown-options-item-action)(?![\w-]))(?=[^\s>+~]*\.mod-delete(?![\w-]))[^\s>+~]*/,
		],
		versionDeprecated: '20.2.0',
		actions: `
			* \`.mod-text\` ⇒
				* sélecteur : \`.mod-ghost\`
				* input Angular : \`luButton="ghost"\` ou \`luButton="ghost-invert"\`
			* \`.mod-delete\` ⇒
				* sélecteur : \`.mod-critical\`
				* input Angular : \`critical\`
		`,
	},
	{
		// Former radius scale (M, L, XL), on the whole box or on logical corners
		// SEE https://regex101.com/r/Yq5V7B.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bb80e0bf0e1f3ffaaff8b4ef573f653dc1d3472e/packages/scss/src/commons/config.scss#L750.
		objectPattern: [
			/\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)?Radius(M|L|XL)(?![\w-])/,
			/\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)RadiusFull(?![\w-])/,
		],
		versionDeprecated: '20.2.0',
		actions: `
			* \`*RadiusM\` & \`*RadiusL\` ⇒ \`*RadiusDefault\`
			* \`*RadiusXL\` ⇒ \`*RadiusStructure\`
			* Coins ⇒ tokens \`--pr-t-border-radius-*\`.
		`,
	},
	{
		// SEE https://regex101.com/r/yrt0XY.
		// SEE https://github.com/LuccaSA/lucca-front/commit/ec0b5de7eec2d6e2a1a0ea711d69d25a62de4401.
		// SEE https://github.com/LuccaSA/lucca-front/blob/9154c555b6a417bf1193f469246e6af8e4c71fee/packages/ng/dropdown/panel/dropdown-panel.component.html.
		name: 'Dropdown',
		objectPattern: [/(?<![\w.#="'-])lu-dropdown(?![\w-])/, /\.lu-dropdown-panel(?![\w-])/],
		versionDeprecated: '20.3.1',
		actions: `Remplacer \`<lu-dropdown>\` par un template, comme présenté sur l’exemple de la page [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown).`,
	},
	{
		// SEE https://regex101.com/r/TdUmb8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/core.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/utils/index.scss#L408.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/utils/index.scss#L398.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/utils/index.scss#L403.
		objectPattern: [
			// Utilitaires renommés très utilisés
			/\.pr-u-textProduct(?![\w-])/,
			/\.pr-u-textBrand(?![\w-])/,
			/\.pr-u-textCritical(?![\w-])/,
			/\.pr-u-textDefault(?![\w-])/,
			/\.pr-u-textError(?![\w-])/,
			/\.pr-u-textLight(?![\w-])/,
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
		// SEE https://regex101.com/r/Dk4cFs.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/core.scss#L111.
		objectPattern: [
			// Utilitaires renommés peu ou pas utilisés
			/\.pr-u-textSuccessContrasted(?![\w-])/,
			/\.pr-u-textWarningContrasted(?![\w-])/,
			/\.pr-u-textBrandContrasted(?![\w-])/,
			/\.pr-u-textNavigation(?![\w-])/,
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
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// Renamed in 21.0.0 without a deprecation.
		// SEE https://regex101.com/r/28zhPD.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/fancyBox/component.scss#L23.
		// SEE https://github.com/LuccaSA/lucca-front/commit/3375eeb460e7ed71fbdbfad39f3fd8b7e3fd7ab2.
		objectPattern: /\.fancyBox-content-box(-foreground)?(?![\w-])/,
		versionDeleted: '21.0.0',
		actions: `
			* \`.fancyBox-content-box\` ⇒ \`.fancyBox-content\`
			* \`.fancyBox-content-box-foreground\` ⇒ \`.fancyBox-content-foreground\`, elle-même dépréciée en 22.1.0
		`,
	},
	{
		// SEE https://regex101.com/r/3NshwA.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/calloutPopover/component.scss#L46.
		// SEE https://github.com/LuccaSA/lucca-front/commit/4f579d6c87c6dc65382bcbfba9a48cd8d2cbf892.
		objectPattern: /\.calloutPopover-overlay-head-icon(?![\w-])/,
		versionDeleted: '21.0.0',
		actions: `Remplacer par \`.calloutPopover-overlay-icon\`.`,
	},
	{
		// SEE https://regex101.com/r/bw43dW.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/multiSelect/mods.scss#L40.
		// SEE https://github.com/LuccaSA/lucca-front/commit/89b70c7aa5e7990c258c7f47c01e2bda12e68f3b.
		objectPattern: /\.multipleSelect-displayer-numericBadge(?![\w-])/,
		versionDeleted: '21.0.0',
		actions: `Remplacer par le composant \`lu-chip\`, utilisé par le displayer depuis la 21.0.`,
	},
	{
		// SEE https://regex101.com/r/W4YQT4.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c950a979482bda7cd43333f4cc31aadd37ed8e3a/packages/scss/src/components/richText/component.scss#L105.
		// SEE https://github.com/LuccaSA/lucca-front/commit/9c09d4c3ee58af16441a4416821950f4b13a8b38.
		objectPattern: /\.richTextField-toolbar-chips-item(?![\w-])/,
		versionDeleted: '21.0.0',
		actions: `Remplacer par \`.richTextField-toolbar-chips-chip\`.`,
	},
	{
		// SEE https://regex101.com/r/CjaRkK.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/core.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/commit/f0b73e151f73e805500788cdaac6e65fcff20b7a.
		objectPattern: [
			// Utilitaires renommés peu ou pas utilisés
			/\.pr-u-textAI(?![\w-])/,
		],
		versionDeprecated: '21.0.0',
		versionDeleted: '21.3.0',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// SEE https://regex101.com/r/j7pw92.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/core.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
		objectPattern: [
			// Utilitaires renommés très utilisés
			/\.pr-u-textPrimary(?![\w-])/,
			/\.pr-u-textSecondary(?![\w-])/,
			/\.pr-u-textGrey(?![\w-])/,
			/\.pr-u-textLucca(?![\w-])/,
		],
		versionDeprecated: '21.0.0',
		versionDeleted: '22.0.0',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// Text color utilities generated from the palettes deleted in 22.0.0
		// SEE https://regex101.com/r/6PWygU.
		// SEE https://github.com/LuccaSA/lucca-front/blob/5928f58cf09961a2a2cbc28ee13fed939be472ec/packages/scss/src/commons/core.scss#L111.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0851903943d9c4060e1a5a4e30a0d558124fb527.
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
		// Any combination of .container and .mod-S, within one compound selector
		// SEE https://regex101.com/r/3KL3jk.
		// SEE https://github.com/LuccaSA/lucca-front/blob/48eb2ae48c55bbd91203fde62ab2a10a75bb61c1/packages/scss/src/components/container/index.scss#L15.
		// SEE https://github.com/LuccaSA/lucca-front/blob/48eb2ae48c55bbd91203fde62ab2a10a75bb61c1/packages/scss/src/components/container/mods.scss#L5.
		objectPattern: /(?=[^\s>+~]*\.container(?![\w-]))(?=[^\s>+~]*\.mod-S(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '21.1.0',
		actions: `Retirer la classe \`.mod-S\`, sans remplacement.`,
	},
	{
		// Any combination of .pagination and the .mod-mods typo, within one compound selector
		// SEE https://regex101.com/r/aNEGrV.
		// SEE https://github.com/LuccaSA/lucca-front/blob/75af93ed2e949cc8b35ff40bcd8738596c398bf3/packages/scss/src/components/pagination/index.scss#L10.
		// SEE https://github.com/LuccaSA/lucca-front/commit/c8281421ca1a8b59693374c6dbfe1f01370adbd1.
		objectPattern: /(?=[^\s>+~]*\.pagination(?![\w-]))(?=[^\s>+~]*\.mod-mods(?![\w-]))[^\s>+~]*/,
		versionDeleted: '21.1.4',
		actions: `Remplacer par \`.mod-compact\`.`,
	},
	{
		// SEE https://regex101.com/r/10xX2L.
		// SEE https://github.com/LuccaSA/lucca-front/blob/ae64895accfc9eba74ca24b4c0d294435b261244/packages/scss/src/commons/config.scss#L119.
		// SEE https://github.com/LuccaSA/lucca-front/blob/ae64895accfc9eba74ca24b4c0d294435b261244/packages/scss/src/commons/core.scss#L129.
		objectPattern: [
			// Utilitaires renommés peu ou pas utilisés
			/\.pr-u-textPineappleContrasted(?![\w-])/,
		],
		versionDeprecated: '21.2.4',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// SEE https://regex101.com/r/Ucp3l2.
		// SEE https://github.com/LuccaSA/lucca-front/blob/f0b73e151f73e805500788cdaac6e65fcff20b7a/packages/scss/src/commons/config.scss#L123.
		// SEE https://github.com/LuccaSA/lucca-front/blob/f0b73e151f73e805500788cdaac6e65fcff20b7a/packages/scss/src/commons/core.scss#L129.
		objectPattern: [
			// Utilitaires renommés peu ou pas utilisés
			/\.pr-u-textOrchid(?![\w-])/,
		],
		versionDeprecated: '21.3.0',
		actions: `
			Remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (\`.pr-u-color\`…)
		`,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf',
		},
	},
	{
		// AI palette, renamed Orchid
		// SEE https://regex101.com/r/LqKsYf.
		// SEE https://github.com/LuccaSA/lucca-front/commit/f0b73e151f73e805500788cdaac6e65fcff20b7a.
		objectPattern: [/\.palette-AI(?![\w-])/, /\.pr-u-colorTextAI(?![\w-])/],
		versionDeleted: '21.3.0',
		actions: `
			* \`*-AI\` ⇒ \`*-orchid\`
			* \`*TextAI\` ⇒ \`*TextOrchid\`
		`,
	},
	{
		// SEE https://regex101.com/r/qthxj5.
		// SEE https://github.com/LuccaSA/lucca-front/blob/14c0ed50fb2720526069764f36028510e1d9851a/packages/scss/src/components/filterPill/component.scss#L122.
		// SEE https://github.com/LuccaSA/lucca-front/commit/0212e264c42b9d4592399fc47bbd73be3c2f0327.
		objectPattern: /\.filterPill-combobox(?![\w-])/,
		versionDeleted: '21.3.0',
		actions: `Remplacer par \`.filterPill-value\`.`,
	},
	{
		// Hyphenated zero spacing utilities, duplicates of their camelCase names
		// SEE https://github.com/LuccaSA/lucca-front/pull/5257.
		// SEE https://regex101.com/r/0nhYQP.
		// SEE https://github.com/LuccaSA/lucca-front/commit/db62e260b7a739d9ab2ad45f241d1734413bbef7.
		objectPattern: /\.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0(?![\w-])/,
		versionDeleted: '22.0.0',
		actions: `
			Passer en camelCase :

			* \`*-start0\` ⇒ \`*Start0\`
			* \`*-end0\` ⇒ \`*End0\`
		`,
	},
	{
		// Any combination of .dialog and .mod-neutralBackground, within one compound selector
		// SEE https://regex101.com/r/DWKCa8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/fd1d1cc502f9468a3e01a90f992978c36ac113d4/packages/scss/src/components/dialog/index.scss#L40.
		objectPattern: /(?=[^\s>+~]*\.dialog(?![\w-]))(?=[^\s>+~]*\.mod-neutralBackground(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '22.0.0',
		actions: `
			* sélecteur : \`.dialog.mod-surfaceDefault\`
			* option de \`LuDialogService.open()\` : \`surfaceDefault: true\`
		`,
	},
	{
		// SEE https://regex101.com/r/MzbUXJ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/c2efa49aefd376b8f45a311aaedb299d534e74e2/packages/scss/src/components/activityFeed/component.scss#L78.
		// SEE https://github.com/LuccaSA/lucca-front/commit/ca6461d40ecbe63bb5dd61f47185d1d66a0511ab.
		objectPattern: /\.activityFeed-content-update-(after|before|icon)(?![\w-])/,
		versionDeleted: '22.0.0',
		actions: `Remplacer par \`.activityFeed-content-update-item-(after|before|icon)\`.`,
	},
	{
		// Any combination of .dataTable and .mod-hover, within one compound selector
		// SEE https://regex101.com/r/IaLzf6.
		// SEE https://github.com/LuccaSA/lucca-front/blob/84d01a52c1d45326c76a182dae241d02b8566cc9/packages/scss/src/components/dataTable/index.scss#L61.
		// SEE https://github.com/LuccaSA/lucca-front/blob/84d01a52c1d45326c76a182dae241d02b8566cc9/packages/ng/data-table/data-table.component.ts#L49.
		objectPattern: /(?=[^\s>+~]*\.dataTable(?![\w-]))(?=[^\s>+~]*\.mod-hover(?![\w-]))[^\s>+~]*/,
		versionDeprecated: '22.0.6',
		actions: `Retirer la classe \`.mod-hover\` et l’input Angular \`hover\`, sans remplacement : une ligne sans action ne doit pas avoir d’effet de survol.`,
	},
	{
		// SEE https://regex101.com/r/HRgrNj.
		// SEE https://github.com/LuccaSA/lucca-front/blob/db08f46234ab6e5717d83b3c72d36dedfd180a43/packages/scss/src/components/fancyBox/component.scss#L76.
		// SEE https://github.com/LuccaSA/lucca-front/blob/44cc1f8955d65494d6ccfbdd1cf6ff04379363d4/packages/ng/fancy-box/CHANGELOG.md#L19.
		objectPattern: /\.fancyBox-content-foreground(?![\w-])/,
		versionDeprecated: '22.1.0',
		actions: `
			* HTML : composant \`lu-fancy-box\`, renommer la classe seule fait disparaître les illustrations
			* input Angular : \`foregroundStartEnd\` à la place de \`foreground\`
		`,
	},
	{
		// SEE https://github.com/LuccaSA/lucca-front/blob/718668a2d0f78be779a47ae747a0602a47e5b1c6/packages/scss/src/components/highlightSection/index.scss#L4.
		// SEE https://github.com/LuccaSA/lucca-front/blob/718668a2d0f78be779a47ae747a0602a47e5b1c6/packages/ng/highlight-section/highlight-section.component.ts#L9.
		// SEE https://github.com/LuccaSA/lucca-front/blob/718668a2d0f78be779a47ae747a0602a47e5b1c6/packages/scss/src/commons/utils/highlight-prisme.scss#L299.
		name: 'Highlight section',
		objectPattern: /\.highlightSection\b/,
		versionDeprecated: '22.1.1',
		actions: `Le composant Highlight section (\`.highlightSection\` et \`<lu-highlight-section>\`) sera remplacé en 22.2 par une évolution du composant Box.`,
	},
	{
		// SEE https://regex101.com/r/UwHko8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/be7004c7c16edd0cbb658c01e46781554bec1ae4/packages/scss/src/components/priorityLevels/index.scss#L3.
		// SEE https://github.com/LuccaSA/lucca-front/commit/9ba2d000396a4c4f81d71309dd8eb9c71fc5a913.
		name: 'Priority levels',
		objectPattern: /\.priorityLevels(-icon)?(?![\w-])/,
		versionDeleted: '22.1.1',
		actions: `Remplacer par \`.priorityLevel\` et \`.priorityLevel-icon\`.`,
	},

	// Deprecated components, including their children (`.textfield-input`…)
	// Keep them after the entries targeting their children, so those messages win.
	// ==============================================================================================

	{
		// SEE https://regex101.com/r/xNhjam.
		// SEE https://github.com/LuccaSA/lucca-front/commit/a798b838d6555af1008398825dc471baf34b86fb.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L257.
		name: 'List',
		objectPattern: /\.list\b/,
		versionDeprecated: '16.2.2',
		actions: `Remplacer par [Sortable list](https://prisme.lucca.io/94310e217/p/883e34-sortable-list).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/66df2f-list',
		},
	},
	{
		// SEE https://regex101.com/r/UiBvDM.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L253.
		name: 'Checkbox',
		objectPattern: /\.checkbox\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [Checkbox](https://prisme.lucca.io/94310e217/p/42c88e-checkbox).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/04061d-checkbox',
		},
	},
	{
		// SEE https://regex101.com/r/2KOjjU.
		name: 'Checkbox',
		objectPattern: /\.checkboxesfield\b/,
		actions: `Remplacer par [Checkbox](https://prisme.lucca.io/94310e217/p/42c88e-checkbox).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/04061d-checkbox',
		},
	},
	{
		// SEE https://regex101.com/r/e1p3sA.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L255.
		name: 'Radio',
		objectPattern: /\.radio\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/07849c-radio',
		},
	},
	{
		// SEE https://regex101.com/r/e1p3sA.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L259.
		name: 'Radio buttons',
		objectPattern: /\.radioButtons\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/55805e-radio-buttons',
		},
	},
	{
		// SEE https://regex101.com/r/XtUtpZ.
		name: 'Radio',
		objectPattern: /\.radiosfield\b/,
		actions: `Remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/07849c-radio',
		},
	},
	{
		// SEE https://regex101.com/r/jMc1iX.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L254.
		name: 'Switch',
		objectPattern: /\.switch\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [Switch](https://prisme.lucca.io/94310e217/p/39c7b7-switch).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/15149b-switch',
		},
	},
	{
		// SEE https://regex101.com/r/w9keCn.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L260.
		name: 'Textfield',
		objectPattern: /\.textfield\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [Textfield](https://prisme.lucca.io/94310e217/p/459eda-textfield).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/55f101-text-field',
		},
	},
	{
		// SEE https://regex101.com/r/i6H9hf.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L256.
		name: 'File upload',
		objectPattern: /\.file\b/,
		versionDeprecated: '21.1.2',
		actions: `Remplacer par [File upload](https://prisme.lucca.io/94310e217/p/8282a5-file-upload).`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/99e88e-file-upload',
		},
	},
	{
		// SEE https://regex101.com/r/ZPhMSh.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L261.
		name: 'Table',
		objectPattern: /\.table\b/,
		versionDeprecated: '21.1.2',
		actions: `
			Remplacer par :

			* [Data table](https://prisme.lucca.io/94310e217/p/4263a5-data-table)
			* [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table)
		`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/75b1ea-table-',
		},
	},
	{
		// SEE https://regex101.com/r/7rtb5G.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L258.
		name: 'Label',
		objectPattern: /\.label\b/,
		versionDeprecated: '21.1.2',
		actions: `
			Remplacer par :

			* [Chip](https://prisme.lucca.io/94310e217/p/3960bc-chip)
			* [Tag](https://prisme.lucca.io/94310e217/p/6036ad-tag)
			* [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge)
		`,
		urls: {
			prisme: 'https://prisme.lucca.io/94310e217/p/640fae-label',
		},
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L262.
		name: 'Main',
		objectPattern: /\.main\b/,
		versionDeprecated: '21.1.2',
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L265.
		name: 'Layout',
		objectPattern: /\.layout\b/,
		versionDeprecated: '21.1.2',
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L266.
		name: 'Header',
		objectPattern: /\.header\b/,
		versionDeprecated: '21.1.2',
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L263.
		name: 'Filters',
		objectPattern: /\.filters\b/,
		versionDeprecated: '21.1.2',
	},
	{
		// Listed in the deprecated components of highlight-prisme.scss, with no documented replacement
		// SEE https://regex101.com/r/Sg9PR8.
		// SEE https://github.com/LuccaSA/lucca-front/blob/525a713baf00a378a92ed0a39d3a60f563e9e1cc/packages/scss/src/commons/utils/highlight-prisme.scss#L264.
		name: 'Notch box',
		objectPattern: /\.notchBox\b/,
		versionDeprecated: '21.1.2',
	},

	// Catch-all, keep last
	// ==============================================================================================

	{
		// Any utility with the `.u-` prefix, renamed `.pr-u-` in 20.2.0 and only emitted with `$deprecatedUtilityPrefix: true` since
		// SEE https://github.com/LuccaSA/lucca-front/pull/3814.
		// SEE https://regex101.com/r/Yf9bsZ.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/core.scss#L89.
		// SEE https://github.com/LuccaSA/lucca-front/blob/bf00a13340eaea7a433a3e64100204381d193676/packages/scss/src/commons/config.scss#L9.
		objectPattern: /\.u-[a-zA-Z]/,
		versionDeprecated: '20.2.0',
		actions: `\`.u-*\` ⇒ \`.pr-u-*\``,
		urls: {
			schematics: 'https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256',
		},
	},
];
