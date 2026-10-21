# Propriétés et sélecteurs dépréciés

Référence : [Cycle de vie des composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f) – section « Liste des éléments dépréciés ».

> **Note :** contrairement à la page Prisme, les tables *Classes* et *Variables CSS* conservent les dépréciations dont la suppression est effective. Prisme purge les entrées une fois la suppression livrée ; le linter (et cette page) les conserve pour signaler l'usage résiduel.

<style>
  table {
    table-layout: fixed !important;
  }

  table thead th:last-of-type {
    inline-size: 39% !important;
  }

  td > :is(ol, ul) {
    list-style-position: outside !important;
    padding-inline-start: 0.5rem !important;
  }
</style>

## Composants

Source : [Cycle de vie des composants > Composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f)

<table>
	<thead>
		<tr>
			<th>Nom</th>
			<th>Depuis</th>
			<th>Suppression</th>
			<th>Action à réaliser</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>&lt;lu-dropdown&gt;</code></td>
			<td>20.3.0</td>
			<td>–</td>
			<td>À remplacer par un template, comme présenté sur l'exemple de la page <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/334d4a-filter-bar">Filter bar</a></td>
			<td>19.2.0</td>
			<td>22.0.0</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/053be4-filter-pill">Filter Pills</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/13044b-filter-bar-">Filter Bar</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated">Select</a> et variations (<a href="https://prisme.lucca.io/94310e217/p/699694-api-select">API</a>, <a href="https://prisme.lucca.io/94310e217/p/70d7eb-establishment">Establishment</a>, <a href="https://prisme.lucca.io/94310e217/p/479237-department-select-">Department</a>, <a href="https://prisme.lucca.io/94310e217/p/691517-select">User</a>, <a href="https://prisme.lucca.io/94310e217/p/69f87f-qualification">Qualification</a>, etc.)</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>
				<p>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/587833-select-simple">Simple</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/927519-select-multiple-new">Multiple Select</a> et leurs directives.</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/66df2f-list">List</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/883e34-sortable-list">Sortable list</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/04061d-checkbox">Checkbox</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/42c88e-checkbox">Checkbox</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/07849c-radio">Radio</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/15149b-switch">Switch</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/39c7b7-switch">Switch</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/55805e-radio-buttons">Radio buttons</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/55f101-text-field">Textfield</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/459eda-textfield">Textfield</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/10c73a-date-picker">Date picker</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/87a48d-date-picker">Date input</a>.</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/99e88e-file-upload">File upload</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/8282a5-file-upload">File upload</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/640fae-label">Label</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/3960bc-chip">Chip</a>, <a href="https://prisme.lucca.io/94310e217/p/6036ad-tag">Tag</a> ou <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/7693f3-popover">Popover</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/129fae-popover">Popover2</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/863d99-side-panel">Side panel</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/841b0b-dialogs">Dialog</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/75b1ea-table-">Table</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/4263a5-data-table">Data table</a> ou <a href="https://prisme.lucca.io/94310e217/p/24fc14-index-table">Index table</a>.</td>
		</tr>
	</tbody>
</table>

## Classes

Source : [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs)

<table>
	<thead>
		<tr>
			<th>Nom</th>
			<th>Depuis</th>
			<th>Suppression</th>
			<th>Action à réaliser</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<ul>
					<li><code>.fancyBox-content-foreground</code></li>
				</ul>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>.fancyBox-content-foreground</code> →
						<ul>
							<li>HTML : composant <code>lu-fancy-box</code>, renommer la classe seule fait disparaître les illustrations</li>
							<li>input Angular : <code>foregroundStartEnd</code> à la place de <code>foreground</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.highlightSection</code></li>
				</ul>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>Le composant Highlight section (<code>.highlightSection</code> et <code><lu-highlight-section></code>) sera remplacé en 22.2 par une évolution du composant Box.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.dataTable</code> <strong>+</strong> <code>.mod-hover</code></li>
				</ul>
			</td>
			<td>22.0.6</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-hover</code> et l’input Angular <code>hover</code>, sans remplacement : une ligne sans action ne doit pas avoir d’effet de survol.</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0(?![\w-])">
				<ul>
					<li><code>.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>
				<p>Passer en camelCase :</p>
				<ul>
					<li><code>*-start0</code> → <code>*Start0</code></li>
					<li><code>*-end0</code> → <code>*End0</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.mod-neutralBackground</code></li>
				</ul>
			</td>
			<td>22.0.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>.dialog.mod-neutralBackground</code> →
						<ul>
							<li>sélecteur : <code>.dialog.mod-surfaceDefault</code></li>
							<li>option de <code>LuDialogService.open()</code> : <code>surfaceDefault: true</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.palette-AI</code></li>
					<li><code>.pr-u-colorTextAI</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<ul>
					<li><code>*-AI</code> → <code>*-orchid</code></li>
					<li><code>*TextAI</code> → <code>*TextOrchid</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.container</code> <strong>+</strong> <code>.mod-S</code></li>
				</ul>
			</td>
			<td>21.1.0</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-S</code>, sans remplacement.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.pr-u-colorTextGrey</code></li>
					<li><code>.pr-u-colorTextLucca</code></li>
					<li><code>.pr-u-colorTextPrimary</code></li>
					<li><code>.pr-u-colorTextSecondary</code></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li>
						<code>*Grey</code> →
						<ul>
							<li>neutre : <code>*Neutral</code></li>
							<li>défaut : <code>*</code></li>
						</ul>
					</li>
					<li><code>*Primary</code> &amp; <code>*Secondary</code> → <code>*Product</code></li>
					<li><code>*Lucca</code> → <code>*Brand</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textPrimary(?![\w-])">
				<ul>
					<li><code>.pr-u-text(Primary|Product|…)</code></li>
				</ul>
				(utilitaires renommés très utilisés)
			</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textSuccessContrasted(?![\w-])">
				<ul>
					<li><code>.pr-u-text(AI|Cc|Kiwi|Lime|…)</code></li>
				</ul>
				(utilitaires renommés peu ou pas utilisés)
			</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button</code> <strong>+</strong> <code>.mod-text</code></li>
					<li><code>.button</code> <strong>+</strong> <code>.mod-delete</code></li>
					<li><code>.button</code> <strong>+</strong> <code>.loading</code></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li>
						<code>.mod-text</code> →
						<ul>
							<li>sélecteur : <code>.mod-ghost</code></li>
							<li>input Angular : <code>luButton="ghost"</code> ou <code>luButton="ghost-invert"</code></li>
						</ul>
					</li>
					<li>
						<code>.mod-delete</code> →
						<ul>
							<li>sélecteur : <code>.mod-critical</code></li>
							<li>input Angular : <code>critical</code></li>
						</ul>
					</li>
					<li>
						<code>.loading</code> →
						<ul>
							<li>sélecteur : <code>.is-loading</code></li>
							<li>input Angular : <code>state="loading"</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-(inset0|(margin|padding|inset)(Inline|Block)(-(start|end)|Start|End)?0)(?![\w-])">
				<ul>
					<li><code>.u-inset0</code></li>
					<li><code>.u-(margin|padding|inset)(Inline|Block)0</code></li>
					<li><code>.u-(margin|padding|inset)(Inline|Block)(-start|-end|Start|End)0</code></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p><code>.u-*</code> → <code>.pr-u-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button-group</code> <strong>+</strong> <code>.mod-text</code></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.mod-ghost</code>.</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)?Radius(M|L|XL)(?![\w-])">
				<ul>
					<li><code>.pr-u-borderRadius(M|L|XL)</code></li>
					<li><code>.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)Radius(M|L|XL)</code></li>
					<li><code>.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)RadiusFull</code></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
					<li><code>*RadiusM</code> &amp; <code>*RadiusL</code> → <code>*RadiusDefault</code></li>
					<li><code>*RadiusXL</code> → <code>*RadiusStructure</code></li>
					<li>Angles → tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-[a-zA-Z]">
				<ul>
					<li><code>.u-…</code></li>
				</ul>
				(tout utilitaire préfixé <code>.u-</code>)
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p><code>.u-*</code> → <code>.pr-u-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-text(X?S|M|X{0,3}L)(?![\w-])">
				<ul>
					<li><code>.u-text(XS|S|M|L|…)</code></li>
				</ul>
				(utilitaires de taille)
			</td>
			<td>20.1.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li>XS, S &amp; M : <code>.u-text*</code> → <code>.pr-u-body*</code></li>
					<li>
						L ~ XXXL →
						<ul>
							<li>utilitaire de titre : <code>.pr-u-hx</code></li>
							<li>token : <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a></li>
						</ul>
					</li>
				</ul>
				<p><a href="https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9">Plus d’informations sur le sujet</a>.</p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.user-info</code></li>
					<li><code>.user-tile</code></li>
					<li><code>.user-tile-title</code></li>
					<li><code>.user-tile-label</code></li>
					<li><code>.user-tile-footnote</code></li>
					<li><code>.picture</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-text(X?S|M|X{0,3}L)(?![\w-])">
				<ul>
					<li><code>.pr-u-text(XS|S|M|L|…)</code></li>
				</ul>
				(utilitaires de taille)
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>XS, S &amp; M : <code>*text*</code> → <code>*body*</code></li>
					<li>
						L ~ XXXL →
						<ul>
							<li>utilitaire de titre : <code>.pr-u-hx</code></li>
							<li>token : <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-h[56](?![\w-])">
				<ul>
					<li><code>.pr-u-h5</code></li>
					<li><code>.pr-u-h6</code></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>*h5</code> &amp; <code>*h6</code> →
						<ul>
							<li>utilitaire : <code>*h4</code></li>
							<li>token : <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.menu</code></li>
				</ul>
			</td>
			<td>19.3.0</td>
			<td>22.0.0</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation">Horizontal navigation</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.mod-withMenu</code></li>
				</ul>
			</td>
			<td>19.3.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>*withMenu</code> →
						<ul>
							<li>remplacement : <code>*withHorizontalNavigation</code></li>
							<li>suppression : <code>.pageHeader</code> détecte automatiquement <code>.horizontalNavigation</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.lu-dropdown-content</code></li>
					<li><code>.lu-dropdown-options</code></li>
					<li><code>.lu-dropdown-options-item</code></li>
					<li><code>.lu-dropdown-options-item-action</code></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>22.0.0</td>
			<td>Remplacer par le nouveau DOM du composant <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.filterBarDeprecated</code></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>22.0.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-(margin|padding)(Top|Right|Bottom|Left)(\d+|Auto)(?![\w-])">
				<p>Espacements : <code>Top</code> → <code>BlockStart</code>, <code>Right</code> → <code>InlineEnd</code>, <code>Bottom</code> → <code>BlockEnd</code>, <code>Left</code> → <code>InlineStart</code></p>
				<ul>
					<li><code>.pr-u-margin(Top|Right|Bottom|Left)(0|Auto|25|50|…)</code></li>
					<li><code>.pr-u-padding(Top|Right|Bottom|Left)(0|Auto|25|50|…)</code></li>
					<li><code>.pr-u-border(Top|Right|Bottom|Left)0</code></li>
				</ul>
				<p>Angles : pas d’utilitaire logique, utiliser les tokens <code>--pr-t-border-radius-*</code></p>
				<ul>
					<li><code>.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius…</code></li>
				</ul>
				<p>Alignement, float &amp; clear : <code>Left</code> → <code>Start</code> / <code>InlineStart</code>, <code>Right</code> → <code>End</code> / <code>InlineEnd</code></p>
				<ul>
					<li><code>.pr-u-(textAlign|float|clear)Left</code></li>
					<li><code>.pr-u-(textAlign|float|clear)Right</code></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>
				<p>Utilitaires logiques :</p>
				<ul>
					<li><code>*Top*</code> → <code>*BlockStart*</code></li>
					<li><code>*Bottom*</code> → <code>*BlockEnd*</code></li>
					<li><code>*Left*</code> → <code>*InlineStart*</code></li>
					<li><code>*Right*</code> → <code>*InlineEnd*</code></li>
					<li><code>*textAlignLeft</code> → <code>*textAlignStart</code></li>
					<li><code>*textAlignRight</code> → <code>*textAlignEnd</code></li>
					<li>Angles physiques → tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-elevate.*">
				<ul>
					<li><code>.u-elevate…</code></li>
				</ul>
			</td>
			<td>19.1.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.dialog-form</code></li>
					<li><code>.dialog-formOptional</code></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>22.0.0</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.comment-content-textContainer</code></li>
					<li><code>.mod-withMenuCompact</code></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>20.1.0</td>
			<td>(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f">schematics</a>)</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.viewTabs</code></li>
					<li><code>.viewTabs-item</code></li>
					<li><code>.viewTabs_panel</code></li>
					<li><code>.viewTabs-item-tab</code></li>
				</ul>
			</td>
			<td>18.2.1</td>
			<td>–</td>
			<td>
				<p>Segmented control :</p>
				<ul>
					<li><code>*viewTabs*</code> → <code>*segmentedControl*</code></li>
					<li><code>*-item-tab</code> → <code>*-item-action</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.mod-columnSticky</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.indexTable-head-row-cell-sortableButton</code></li>
					<li><code>.table-head-row-cell-sortableButton</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.table-head-row-cell</code> <strong>+</strong> <code>.mod-sortable</code></li>
					<li><code>.table-head-row-cell</code> <strong>+</strong> <code>.sortedAscending</code></li>
					<li><code>.table-head-row-cell</code> <strong>+</strong> <code>.sortedDescending</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.indexTable-body-row-cell-action</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>.indexTable-body-row-cell-link</code>, un véritable lien vers la ligne.</td>
		</tr>
		<tr>
			<td data-pattern="(?=\S*\.userTile(?![\w-]))(?=\S*\.mod-X{1,3}L(?![\w-]))\S*">
				<ul>
					<li><code>.userTile</code> <strong>+</strong> <code>.mod-XL</code></li>
					<li><code>.userTile</code> <strong>+</strong> <code>.mod-XXL</code></li>
					<li><code>.userTile</code> <strong>+</strong> <code>.mod-XXXL</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.mod-L</code>, la plus grande taille de <a href="https://prisme.lucca.io/94310e217/p/56d611-user-tile">User tile</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.lu-user-picture</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/42b330-avatar">Avatar</a> et sa classe <code>.avatar</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.pr-u-clear</code></li>
				</ul>
			</td>
			<td>18.1.2</td>
			<td>–</td>
			<td>Remplacer par <code>.pr-u-clearBoth</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.u-textLeft</code></li>
					<li><code>.u-textCenter</code></li>
					<li><code>.u-textRight</code></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>22.0.0</td>
			<td>
				<p>Doublon :</p>
				<ul>
					<li><code>.u-text*</code> → <code>.pr-u-textAlign*</code></li>
					<li><code>*Left</code> → <code>*Start</code></li>
					<li><code>*Right</code> → <code>*End</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button</code> <strong>+</strong> <code>.mod-counter</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button-counter</code></li>
					<li><code>.navSide-item-alert</code></li>
					<li><code>.textfield-actionClear</code></li>
					<li><code>.lu-select-value .label</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.callout</code> <strong>+</strong> <code>.mod-tiny</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.pr-u-textLeft</code></li>
					<li><code>.pr-u-textCenter</code></li>
					<li><code>.pr-u-textRight</code></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>–</td>
			<td>
				<p>Doublon :</p>
				<ul>
					<li><code>*text*</code> → <code>*textAlign*</code></li>
					<li><code>*Left</code> → <code>*Start</code></li>
					<li><code>*Right</code> → <code>*End</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.loading</code> <strong>+</strong> <code>.mod-dialog</code></li>
					<li><code>.loading</code> <strong>+</strong> <code>.mod-sidePanel</code></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>–</td>
			<td>
				<ul>
					<li><code>*dialog</code> → <code>*popin</code></li>
					<li><code>*sidePanel</code> → <code>*drawer</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])">
				<ul>
					<li><code>.u-gap(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-columnGap(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-rowGap(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-margin(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginBlock(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginBottom(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginInline(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginLeft(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginRight(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-marginTop(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-padding(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingBlock(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingBottom(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingInline(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingLeft(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingRight(0|Auto|XXS|XS|…)</code></li>
					<li><code>.u-paddingTop(0|Auto|XXS|XS|…)</code></li>
				</ul>
				<p>Utilitaires de bordure à zéro : noms <code>.u-</code> supprimés avec les utilitaires t-shirt, noms <code>.pr-u-</code> toujours livrés</p>
				<ul>
					<li><code>.u-border0</code></li>
					<li><code>.u-border(Top|Right|Bottom|Left|…)0</code></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
					<li><code>.u-*</code> → <code>.pr-u-*</code></li>
					<li><code>*XXS</code> → <code>*50</code></li>
					<li><code>*XS</code> → <code>*100</code></li>
					<li><code>*S</code> → <code>*200</code></li>
					<li><code>*M</code> → <code>*300</code></li>
					<li><code>*L</code> → <code>*400</code></li>
					<li><code>*XL</code> → <code>*600</code></li>
					<li><code>*XXL</code> → <code>*800</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.pr-u-insetReset</code></li>
					<li><code>.pr-u-topReset</code></li>
					<li><code>.pr-u-bottomReset</code></li>
					<li><code>.pr-u-leftReset</code></li>
					<li><code>.pr-u-rightReset</code></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>–</td>
			<td>
				<code>*Reset</code> → <code>*0</code>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.palette-grey</code></li>
					<li><code>.palette-primary</code></li>
					<li><code>.palette-secondary</code></li>
					<li><code>.palette-lucca</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li><code>*-grey</code> → <code>*-neutral</code></li>
					<li><code>*-primary</code> &amp; <code>*-secondary</code> → <code>*-product</code></li>
					<li><code>*-lucca</code> → <code>*-brand</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="(?=\S*\.(box|card|section)(?![\w-]))(?=\S*\.mod-grey(?![\w-]))\S*">
				<p>Toute combinaison de <code>.box</code>, <code>.card</code> ou <code>.section</code> avec <code>.mod-grey</code></p>
				<ul>
					<li><code>.box</code> <strong>+</strong> <code>.mod-grey</code></li>
					<li><code>.card</code> <strong>+</strong> <code>.mod-grey</code></li>
					<li><code>.section</code> <strong>+</strong> <code>.mod-grey</code></li>
					<li><code>.icon-color-primary</code></li>
					<li><code>.icon-color-secondary</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li><code>*-grey</code> → <code>*-neutral</code></li>
					<li><code>*-primary</code> &amp; <code>*-secondary</code> → <code>*-product</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.u-comma</code></li>
					<li><code>.u-unit</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button</code> <strong>+</strong> <code>.mod-icon</code></li>
				</ul>
			</td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.actionIcon</code></li>
				</ul>
			</td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
					<li>
						<code>.actionIcon</code> →
						<ul>
							<li>sans bordure : <code>.button.mod-onlyIcon.mod-ghost</code></li>
							<li>avec bordure : <code>.button.mod-onlyIcon.mod-outlined</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.button-icon</code></li>
				</ul>
			</td>
			<td>16.5.0</td>
			<td>–</td>
			<td>Retirer la classe : <code>.button</code> applique déjà la taille d’icône.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.form-group</code></li>
				</ul>
			</td>
			<td>16.4.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>.form-group</code> →
						<ul>
							<li>sélecteur : <code>.form-field</code></li>
							<li>composants Angular : <code>lu-text-input</code>, <code>lu-checkbox-input</code>…</li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.list</code></li>
				</ul>
			</td>
			<td>16.2.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/883e34-sortable-list">Sortable list</a>.</td>
		</tr>
		<tr>
			<td data-pattern="\.grid(-(offset)?\d+)?\\@mediaMin">
				<p>Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (<code>.grid-6\@mediaMinS</code>)</p>
				<ul>
					<li><code>.grid\@mediaMin…</code></li>
					<li><code>.grid-(1|2|3|4|…)\@mediaMin…</code></li>
					<li><code>.grid-offset(1|2|3|4|…)\@mediaMin…</code></li>
				</ul>
				<p>Mods de l’ancienne grille, combinés à <code>.grid</code></p>
				<ul>
					<li><code>.grid</code> <strong>+</strong> <code>.mod-reverse</code></li>
					<li><code>.grid</code> <strong>+</strong> <code>.mod-(start|center|end|top|…)\@mediaMin…</code></li>
				</ul>
				<p>Utilitaires d’ordre de l’ancienne grille</p>
				<ul>
					<li><code>.u-first\@mediaMin…</code></li>
					<li><code>.u-last\@mediaMin…</code></li>
				</ul>
			</td>
			<td>16.2.0</td>
			<td>19.1.0</td>
			<td>
				<p>Remplacer par le nouveau composant <a href="https://prisme.lucca.io/94310e217/p/955d69-grid">Grid</a>.</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.status</code></li>
				</ul>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/425d98-status-badge">Status badge</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.checkbox</code></li>
					<li><code>.checkboxesfield</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/42c88e-checkbox">Checkbox</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.radio</code></li>
					<li><code>.radiosfield</code></li>
					<li><code>.radioButtons</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.switch</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/39c7b7-switch">Switch</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.textfield</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/459eda-textfield">Textfield</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.file</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/8282a5-file-upload">File upload</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.table</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>.table</code> →
						<ul>
							<li><a href="https://prisme.lucca.io/94310e217/p/4263a5-data-table">Data table</a></li>
							<li><a href="https://prisme.lucca.io/94310e217/p/24fc14-index-table">Index table</a></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>.main</code></li>
					<li><code>.layout</code></li>
					<li><code>.header</code></li>
					<li><code>.filters</code></li>
					<li><code>.notchBox</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.active(?![\w-])">
				<ul>
					<li><code>.active</code></li>
					<li><code>.disabled</code></li>
					<li><code>.error</code></li>
					<li><code>.label</code></li>
					<li><code>.label-icon</code></li>
					<li><code>.mod-delete</code></li>
					<li><code>.mod-link</code></li>
					<li><code>.mod-outline</code></li>
					<li><code>.success</code></li>
					<li><code>.u-textLight</code></li>
				</ul>
				(partout dans un sélecteur)
			</td>
			<td>–</td>
			<td>–</td>
			<td>–</td>
		</tr>
	</tbody>
</table>

## Variables CSS

Source : [LFDeprecatedProperties.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedProperties.mjs)

<table>
	<thead>
		<tr>
			<th>Nom</th>
			<th>Depuis</th>
			<th>Suppression</th>
			<th>Action à réaliser</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<ul>
					<li><code>--components-fancyBox-offsetInline</code></li>
					<li><code>--components-fancyBox-offsetBlock</code></li>
					<li><code>--components-fancyBox-imageWidth</code></li>
					<li><code>--components-fancyBox-imageHeight</code></li>
					<li><code>--components-fancyBox-background-left</code></li>
					<li><code>--components-fancyBox-background-right</code></li>
					<li><code>--components-fancyBox-foreground</code></li>
				</ul>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>
				<p>Avec <code>*</code> = <code>--components-fancyBox</code> :</p>
				<ul>
					<li><code>*-offsetInline</code> →<br><code>*-content-foregroundStartEnd-insetInlineEnd</code></li>
					<li><code>*-offsetBlock</code> →<br><code>*-content-foregroundStartEnd-insetBlockStart</code></li>
					<li><code>*-imageWidth</code> →<br><code>*-content-foregroundStartEnd-inlineSize</code></li>
					<li><code>*-imageHeight</code> →<br><code>*-content-foregroundStartEnd-blockSize</code></li>
					<li>
						Image <code>*-background-left</code> →
						<ul>
							<li>sélecteur : <code>.fancyBox-content-backgroundEndStart</code></li>
							<li>input Angular : <code>backgroundEndStart</code></li>
						</ul>
					</li>
					<li>
						Image <code>*-background-right</code> →
						<ul>
							<li>sélecteur : <code>.fancyBox-content-backgroundStartEnd</code></li>
							<li>input Angular : <code>backgroundStartEnd</code></li>
						</ul>
					</li>
					<li>
						Image <code>*-foreground</code> →
						<ul>
							<li>sélecteur : <code>.fancyBox-content-foregroundStartEnd</code></li>
							<li>input Angular : <code>foregroundStartEnd</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-AI-\d+(?![\w-])">
				<ul>
					<li><code>--palettes-AI-*</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<ul>
					<li>
						<code>--palettes-AI-*</code> →
						<ul>
							<li>couleur : <code>--palettes-orchid-*</code></li>
							<li>dégradé : <code>--palettes-ai-*</code></li>
						</ul>
					</li>
				</ul>
				<p><small>(<code>*</code>: 50-900)</small></p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-richTextField-resize</code></li>
					<li><code>--components-richTextField-height</code></li>
					<li><code>--components-richTextField-minHeight</code></li>
					<li><code>--components-richTextField-maxHeight</code></li>
				</ul>
			</td>
			<td>21.2.0</td>
			<td>–</td>
			<td>
				<p><code>--components-richTextField-*</code> →<br><code>--components-richTextField-content-*</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-gauge-height</code></li>
				</ul>
			</td>
			<td>20.3.0</td>
			<td>–</td>
			<td>Remplacer par <code>--components-gauge-blockSize</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--commons-borderRadius-M</code></li>
					<li><code>--commons-borderRadius-L</code></li>
					<li><code>--commons-borderRadius-XL</code></li>
					<li><code>--commons-borderRadius-full</code></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>22.0.0</td>
			<td>(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0">schematics</a>)</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--pr-t-radius-input</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.2.0</td>
			<td>Remplacer par <code>--pr-t-border-radius-input</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-numericBadge-fontSize</code></li>
					<li><code>--components-numericBadge-lineHeight</code></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>21.3.0</td>
			<td>Remplacer par <code>--components-numericBadge-font</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--commons-font-family</code></li>
					<li><code>--commons-font-family-brand</code></li>
					<li><code>--commons-font-family-cursive</code></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<p><code>--commons-*</code> → <code>--pr-t-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="--sizes-(XS|S|M|L|XL|XXL|XXXL)-(fontSize|lineHeight)(?![\w-])">
				<p>Tailles de police et hauteurs de ligne</p>
				<ul>
					<li><code>--sizes-(XS|S|M|L|…)-fontSize</code></li>
					<li><code>--sizes-(XS|S|M|L|…)-lineHeight</code></li>
				</ul>
				<p>Paddings verticaux, lus uniquement avec <code>$deprecatedSpacings: true</code></p>
				<ul>
					<li><code>--sizes-(XS|S|M|L|…)-verticalPadding</code></li>
					<li><code>--sizes-verticalPadding</code></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<p><a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">Tokens typographie</a> :</p>
				<ul>
					<li><code>*sizes-XXXL-*</code> →<br>aucun token équivalent</li>
					<li><code>*sizes-XXL-*</code> →<br><code>*pr-t-font-heading-1-*</code></li>
					<li><code>*sizes-XL-*</code> →<br><code>*pr-t-font-heading-2-*</code></li>
					<li><code>*sizes-L-*</code> →<br><code>*pr-t-font-heading-3-*</code></li>
					<li>
						<code>*sizes-M-*</code> →
						<ul>
							<li>texte : <code>*pr-t-font-body-M-*</code></li>
							<li>titre : <code>*pr-t-font-heading-4-*</code></li>
						</ul>
					</li>
					<li><code>*sizes-S-*</code> →<br><code>*pr-t-font-body-S-*</code></li>
					<li><code>*sizes-XS-*</code> →<br><code>*pr-t-font-body-XS-*</code></li>
					<li><code>--sizes-*-verticalPadding</code> →<br>tokens <code>--pr-t-spacings-*</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--sizes-fontSize</code></li>
					<li><code>--sizes-lineHeight</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>--components-title-font</code>.</td>
		</tr>
		<tr>
			<td data-pattern="--components-button-(font-size|line-height)(?![\w-])">
				<ul>
					<li><code>--components-button-(font-size|line-height)</code></li>
					<li><code>--components-(callout|calloutFeedbackList|…)-(fontSize|lineHeight)</code></li>
					<li><code>--component-textField-(fontSize|lineHeight)</code></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<ul>
					<li><code>*-fontSize</code> → <code>*-font</code></li>
					<li><code>*-lineHeight</code> → <code>*-font</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--components-(inlineMessage|simpleSelect|multiSelect|segmentedControl|timepicker|sortableList-helper)-(fontSize|lineHeight)(?![\w-])">
				<ul>
					<li><code>--components-(timepicker|multiSelect|…)-(fontSize|lineHeight)</code></li>
					<li><code>--component-switchField-label-(fontSize|lineHeight)</code></li>
					<li><code>--components-horizontalNavigation-listItemAction(FontSize|LineHeight)</code></li>
					<li><code>--components-title-weight</code></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>
				<ul>
					<li><code>*-fontSize</code> → <code>*-font</code></li>
					<li><code>*-lineHeight</code> → <code>*-font</code></li>
					<li><code>*FontSize</code> → <code>*Font</code></li>
					<li><code>*LineHeight</code> → <code>*Font</code></li>
					<li><code>*-weight</code> → <code>*-font</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--commons-navSide-compact-width</code></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-container-max-width</code></li>
					<li><code>--components-container-padding</code></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>
				<ul>
					<li><code>--components-container-max-width</code> →<br><code>--commons-container-maxWidth</code></li>
					<li><code>--components-container-padding</code> →<br><code>--commons-container-padding</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--colors-black-color</code></li>
					<li><code>--colors-white-color</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li>
						<code>--colors-white-color</code> →
						<ul>
							<li>couleur : <code>--palettes-neutral-0</code></li>
							<li>surface : <code>--pr-t-elevation-surface-raised</code></li>
						</ul>
					</li>
					<li><code>--colors-black-color</code> →<br><code>--palettes-neutral-900</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-(\w+-)?text(?![\w-])">
				<ul>
					<li><code>--palettes-…-text</code></li>
					<li><code>--palettes-text</code></li>
				</ul>
				(toutes les palettes)
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>
				<p><code>*text</code> → <code>*0</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--commons-disabled-opacity</code></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>
				<ul>
					<li>
						<code>--commons-disabled-opacity</code> →
						<ul>
							<li>token de texte : <code>--pr-t-color-text-disabled</code></li>
							<li>couleur : <code>--commons-disabled-color</code></li>
							<li>fond : <code>--commons-disabled-background</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-toasts-background</code></li>
					<li><code>--components-toasts-padding</code></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>–</td>
			<td>Retirer la variable, sans remplacement.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--colors-white-rgb</code></li>
					<li><code>--colors-grey-400-rgb</code></li>
					<li><code>--colors-grey-900-rgb</code></li>
					<li><code>--colors-neutral-400-rgb</code></li>
					<li><code>--colors-neutral-900-rgb</code></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li>
						<code>--colors-*-rgb</code> →
						<ul>
							<li>Sass : <code>color.transparentize(var(--palettes-neutral-900), …)</code></li>
							<li>CSS : <code>color-mix()</code></li>
						</ul>
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--spacings-(0|X{0,2}S|M|X{0,2}L|auto)(?![\w-])">
				<ul>
					<li><code>--spacings-(0|auto|XXS|XS|…)</code></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
					<li><code>--spacings-*</code> → <code>--pr-t-spacings-*</code></li>
					<li><code>*XXS</code> → <code>*50</code></li>
					<li><code>*XS</code> → <code>*100</code></li>
					<li><code>*S</code> → <code>*200</code></li>
					<li><code>*M</code> → <code>*300</code></li>
					<li><code>*L</code> → <code>*400</code></li>
					<li><code>*XL</code> → <code>*600</code></li>
					<li><code>*XXL</code> → <code>*800</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--components-navSide-fullwidth-palette-alert-color</code></li>
					<li><code>--components-navSide-fullwidth-palette-alert-text</code></li>
				</ul>
			</td>
			<td>17.3.2</td>
			<td>–</td>
			<td>Retirer la variable : l’alerte est remplacée par le composant Numeric badge.</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-(grey|primary|secondary|lucca)-(0|text|25|50|100|200|300|400|500|600|700|800|900)(?![\w-])">
				<ul>
					<li><code>--palettes-grey-(0|text|25|50|…)</code></li>
					<li><code>--palettes-primary-(0|text|25|50|…)</code></li>
					<li><code>--palettes-secondary-(0|text|25|50|…)</code></li>
					<li><code>--palettes-lucca-(0|text|25|50|…)</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
					<li><code>*-grey-*</code> → <code>*-neutral-*</code></li>
					<li><code>*-primary-*</code> &amp; <code>*-secondary-*</code> → <code>*-product-*</code></li>
					<li><code>*-lucca-*</code> → <code>*-brand-*</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="--commons-elevations-elevation-[1-6](?![\w-])">
				<ul>
					<li><code>--commons-elevations-elevation-(1|2|3|4|…)</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="--commons-boxShadow-X*(S|M|L)(?![\w-])">
				<ul>
					<li><code>--commons-boxShadow-S</code></li>
					<li><code>--commons-boxShadow-M</code></li>
					<li><code>--commons-boxShadow-L</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><code>--commons-background-base</code></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>Remplacer par le token <code>--pr-t-elevation-surface-default</code>.</td>
		</tr>
	</tbody>
</table>
