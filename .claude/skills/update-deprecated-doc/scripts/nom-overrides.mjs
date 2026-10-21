// Hand-written `Nom` cells, for patterns too complex to expand automatically.
// Keyed by the first regex source of the entry (`objectPattern` or its first array item).
const ul = (...items) => `<ul>\n${items.map((i) => `\t<li><code>${i}</code></li>`).join('\n')}\n</ul>`;
const combo = (...pairs) =>
	`<ul>\n${pairs.map(([a, b]) => `\t<li><code>${a}</code> <strong>+</strong> <code>${b}</code></li>`).join('\n')}\n</ul>`;

export default {
	[String.raw`\.grid(-(offset)?\d+)?\\@mediaMin`]: [
		'<p>Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (<code>.grid-6\\@mediaMinS</code>)</p>',
		ul('.grid\\@mediaMin…', '.grid-(1|2|3|4|…)\\@mediaMin…', '.grid-offset(1|2|3|4|…)\\@mediaMin…'),
		'<p>Mods de l’ancienne grille, combinés à <code>.grid</code></p>',
		combo(['.grid', '.mod-reverse'], ['.grid', '.mod-(start|center|end|top|…)\\@mediaMin…']),
		'<p>Utilitaires d’ordre de l’ancienne grille</p>',
		ul('.u-first\\@mediaMin…', '.u-last\\@mediaMin…'),
	].join('\n'),
	[String.raw`\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])`]:
		[
			ul(
				'.u-gap(0|Auto|XXS|XS|…)',
				'.u-columnGap(0|Auto|XXS|XS|…)',
				'.u-rowGap(0|Auto|XXS|XS|…)',
				'.u-margin(0|Auto|XXS|XS|…)',
				'.u-marginBlock(0|Auto|XXS|XS|…)',
				'.u-marginBottom(0|Auto|XXS|XS|…)',
				'.u-marginInline(0|Auto|XXS|XS|…)',
				'.u-marginLeft(0|Auto|XXS|XS|…)',
				'.u-marginRight(0|Auto|XXS|XS|…)',
				'.u-marginTop(0|Auto|XXS|XS|…)',
				'.u-padding(0|Auto|XXS|XS|…)',
				'.u-paddingBlock(0|Auto|XXS|XS|…)',
				'.u-paddingBottom(0|Auto|XXS|XS|…)',
				'.u-paddingInline(0|Auto|XXS|XS|…)',
				'.u-paddingLeft(0|Auto|XXS|XS|…)',
				'.u-paddingRight(0|Auto|XXS|XS|…)',
				'.u-paddingTop(0|Auto|XXS|XS|…)',
			),
			'<p>Utilitaires de bordure à zéro : noms <code>.u-</code> supprimés avec les utilitaires t-shirt, noms <code>.pr-u-</code> toujours livrés</p>',
			ul('.u-border0', '.u-border(Top|Right|Bottom|Left|…)0'),
		].join('\n'),
	[String.raw`\.u-(inset0|(margin|padding|inset)(Inline|Block)(-(start|end)|Start|End)?0)(?![\w-])`]: ul(
		'.u-inset0',
		'.u-(margin|padding|inset)(Inline|Block)0',
		'.u-(margin|padding|inset)(Inline|Block)(-start|-end|Start|End)0',
	),
	[String.raw`\.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0(?![\w-])`]: ul(
		'.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0',
	),
	[String.raw`(?=\S*\.userTile(?![\w-]))(?=\S*\.mod-X{1,3}L(?![\w-]))\S*`]: combo(
		['.userTile', '.mod-XL'],
		['.userTile', '.mod-XXL'],
		['.userTile', '.mod-XXXL'],
	),
	[String.raw`\.u-elevate.*`]: ul('.u-elevate…'),
	[String.raw`\.pr-u-(margin|padding)(Top|Right|Bottom|Left)(\d+|Auto)(?![\w-])`]: [
		'<p>Espacements : <code>Top</code> → <code>BlockStart</code>, <code>Right</code> → <code>InlineEnd</code>, <code>Bottom</code> → <code>BlockEnd</code>, <code>Left</code> → <code>InlineStart</code></p>',
		ul(
			'.pr-u-margin(Top|Right|Bottom|Left)(0|Auto|25|50|…)',
			'.pr-u-padding(Top|Right|Bottom|Left)(0|Auto|25|50|…)',
			'.pr-u-border(Top|Right|Bottom|Left)0',
		),
		'<p>Angles : pas d’utilitaire logique, utiliser les tokens <code>--pr-t-border-radius-*</code></p>',
		ul('.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius…'),
		'<p>Alignement, float &amp; clear : <code>Left</code> → <code>Start</code> / <code>InlineStart</code>, <code>Right</code> → <code>End</code> / <code>InlineEnd</code></p>',
		ul('.pr-u-(textAlign|float|clear)Left', '.pr-u-(textAlign|float|clear)Right'),
	].join('\n'),
	[String.raw`\.u-text(X?S|M|X{0,3}L)(?![\w-])`]: ul('.u-text(XS|S|M|L|…)') + '\n(utilitaires de taille)',
	[String.raw`\.pr-u-text(X?S|M|X{0,3}L)(?![\w-])`]: ul('.pr-u-text(XS|S|M|L|…)') + '\n(utilitaires de taille)',
	[String.raw`\.pr-u-h[56](?![\w-])`]: ul('.pr-u-h5', '.pr-u-h6'),
	[String.raw`\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)?Radius(M|L|XL)(?![\w-])`]: ul(
		'.pr-u-borderRadius(M|L|XL)',
		'.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)Radius(M|L|XL)',
		'.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)RadiusFull',
	),
	[String.raw`\.pr-u-textPrimary(?![\w-])`]: ul('.pr-u-text(Primary|Product|…)') + '\n(utilitaires renommés très utilisés)',
	[String.raw`\.pr-u-textSuccessContrasted(?![\w-])`]: ul('.pr-u-text(AI|Cc|Kiwi|Lime|…)') + '\n(utilitaires renommés peu ou pas utilisés)',
	[String.raw`\.active(?![\w-])`]:
		ul('.active', '.disabled', '.error', '.label', '.label-icon', '.mod-delete', '.mod-link', '.mod-outline', '.success', '.u-textLight') +
		'\n(partout dans un sélecteur)',
	[String.raw`\.u-[a-zA-Z]`]: ul('.u-…') + '\n(tout utilitaire préfixé <code>.u-</code>)',
	[String.raw`--commons-elevations-elevation-[1-6](?![\w-])`]: ul('--commons-elevations-elevation-(1|2|3|4|…)'),
	[String.raw`--commons-boxShadow-X*(S|M|L)(?![\w-])`]: ul('--commons-boxShadow-S', '--commons-boxShadow-M', '--commons-boxShadow-L'),
	[String.raw`--palettes-(grey|primary|secondary|lucca)-(0|text|25|50|100|200|300|400|500|600|700|800|900)(?![\w-])`]: ul(
		'--palettes-grey-(0|text|25|50|…)',
		'--palettes-primary-(0|text|25|50|…)',
		'--palettes-secondary-(0|text|25|50|…)',
		'--palettes-lucca-(0|text|25|50|…)',
	),
	[String.raw`--spacings-(0|X{0,2}S|M|X{0,2}L|auto)(?![\w-])`]: ul('--spacings-(0|auto|XXS|XS|…)'),
	[String.raw`--palettes-(\w+-)?text(?![\w-])`]: ul('--palettes-…-text', '--palettes-text') + '\n(toutes les palettes)',
	[String.raw`--sizes-(XS|S|M|L|XL|XXL|XXXL)-(fontSize|lineHeight)(?![\w-])`]: [
		'<p>Tailles de police et hauteurs de ligne</p>',
		ul('--sizes-(XS|S|M|L|…)-fontSize', '--sizes-(XS|S|M|L|…)-lineHeight'),
		'<p>Paddings verticaux, lus uniquement avec <code>$deprecatedSpacings: true</code></p>',
		ul('--sizes-(XS|S|M|L|…)-verticalPadding', '--sizes-verticalPadding'),
	].join('\n'),
	[String.raw`--components-button-(font-size|line-height)(?![\w-])`]: ul(
		'--components-button-(font-size|line-height)',
		'--components-(callout|calloutFeedbackList|…)-(fontSize|lineHeight)',
		'--component-textField-(fontSize|lineHeight)',
	),
	[String.raw`--components-(inlineMessage|simpleSelect|multiSelect|segmentedControl|timepicker|sortableList-helper)-(fontSize|lineHeight)(?![\w-])`]:
		ul(
			'--components-(timepicker|multiSelect|…)-(fontSize|lineHeight)',
			'--component-switchField-label-(fontSize|lineHeight)',
			'--components-horizontalNavigation-listItemAction(FontSize|LineHeight)',
			'--components-title-weight',
		),
	[String.raw`--palettes-AI-\d+(?![\w-])`]: ul('--palettes-AI-*'),
};
