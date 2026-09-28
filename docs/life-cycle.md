# Deprecated Properties & Selectors

Reference: [Cycle de vie des composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f) – section "Classes & Inputs".

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

Source: [Cycle de vie des composants > Composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f)

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
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/334d4a-filter-bar">Filter bar</a></td>
			<td>19.2.0</td>
			<td>22.0.0</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/053be4-filter-pill">Filter Pills</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/13044b-filter-bar-">Filter Bar</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/66df2f-list">List</a></td>
			<td>–</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/883e34-sortable-list">Sortable list</a>.</td>
		</tr>
		<tr>
			<td><a href="https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated">Select</a> et variations (<a href="https://prisme.lucca.io/94310e217/p/699694-api-select">API</a>, <a href="https://prisme.lucca.io/94310e217/p/70d7eb-establishment">Establishment</a>, <a href="https://prisme.lucca.io/94310e217/p/479237-department-select-">Department</a>, <a href="https://prisme.lucca.io/94310e217/p/691517-select">User</a>, <a href="https://prisme.lucca.io/94310e217/p/69f87f-qualification">Qualification</a>, etc.)</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/587833-select-simple">Simple</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/927519-select-multiple-new">Multiple Select</a> et leurs directives (<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)</td>
		</tr>
		<tr>
			<td><code>&lt;lu-dropdown&gt;</code></td>
			<td>20.3.0</td>
			<td>–</td>
			<td>À remplacer par un template, comme présenté sur l'exemple de la page <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
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

Source: [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs)

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
					<li><code>.active</code></li>
					<li><code>.disabled</code></li>
					<li><code>.error</code></li>
					<li><code>.label</code></li>
					<li><code>.mod-delete</code></li>
					<li><code>.mod-link</code></li>
					<li><code>.mod-outline</code></li>
					<li><code>.success</code></li>
					<li><code>.u-textLight</code></li>
					</ul>
					(anywhere in a selector)
				</td>
			<td>–</td>
			<td>–</td>
			<td>–</td>
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
				<li>Remplacer <code>grey</code> par <code>neutral</code>.</li>
				<li>Remplacer <code>primary</code> &amp; <code>secondary</code> par <code>product</code>.</li>
				<li>Remplacer <code>lucca</code> par <code>brand</code>.</li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
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
				</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>–</td>
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
			<td>Doublon. Remplacer par : <code>.u-textAlignLeft</code>, <code>.u-textAlignCenter</code> &amp; <code>.u-textAlignRight</code>.</td>
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
					<li><code>.table-head-row-cell-sortableButton</code></li>
					<li><code>.indexTable-head-row-cell-sortableButton</code></li>
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
					<li><code>.u-text(XS|S|M|L|…)</code></li>
					</ul>
					(size utilities)
				</td>
			<td>20.1.0</td>
			<td>22.0.0</td>
			<td>
				<p>Remplacer par les classes <code>.pr-u-bodyXS</code>, <code>.pr-u-bodyS</code>, <code>.pr-u-bodyM</code>.</p>
				<p>Les utilitaires L ~ XXXL peuvent être remplacés par un utilitaire de titre <code>.pr-u-hx</code> ou le <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a> correspondant.</p>
				<p><a href="https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9">Plus d’informations sur le sujet</a>.</p>
			</td>
		</tr>
		<tr>
			<td>
					<p>Classes pour button :</p>
					<ul>
					<li><code>.button</code> <strong>+</strong> <code>.mod-text</code></li>
					<li><code>.button</code> <strong>+</strong> <code>.mod-deleted</code></li>
					<li><code>.button</code> <strong>+</strong> <code>.loading</code></li>
					</ul>
					<p>Inputs Angular :</p>
					<ul>
					<li><code>delete</code></li>
					<li><code>text</code></li>
					<li><code>text-invert</code></li>
					</ul>
				</td>
			<td>20.2.0</td>
			<td>22.0.0</td>
			<td>Remplacer par les classes <code>.mod-ghost</code> &amp; <code>.mod-critical</code> et les inputs Angular <code>critical</code>, <code>ghost</code> &amp; <code>ghost-invert</code></td>
		</tr>
		<tr>
			<td>
					<p><a href="https://www.notion.so/luccasoftware/Utilitaires-color-text-2c7d278ab26e808b9d61f3734eeb77a2">Liste complète</a></p>
					<p><strong>Utilitaires renommés très utilisés :</strong></p>
					<ul>
					<li><code>.pr-u-text(Primary|Product|…)</code></li>
					</ul>
					<p><strong>Utilitaires renommés peu ou pas utilisés :</strong></p>
					<ul>
					<li><code>.pr-u-text(AI|Cc|Kiwi|Lime|…)</code></li>
					</ul>
				</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…) (<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)</td>
		</tr>
	</tbody>
</table>

## Variables CSS

Source: [LFDeprecatedProperties.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedProperties.mjs)

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
					<li><code>--commons-elevations-elevation-(1|2|3|4|…)</code></li>
					</ul>
				</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
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
					<li><code>--palettes-grey-XX</code></li>
					<li><code>--palettes-primary-XX</code></li>
					<li><code>--palettes-secondary-XX</code></li>
					<li><code>--palettes-lucca-XX</code></li>
					</ul>
					(2–3 digits)
				</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li>Remplacer <code>grey</code> par <code>neutral</code>.</li>
				<li>Remplacer <code>primary</code> &amp; <code>secondary</code> par <code>product</code>.</li>
				<li>Remplacer <code>lucca</code> par <code>brand</code>.</li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
					<ul>
					<li><code>--spacings-S</code></li>
					<li><code>--spacings-M</code></li>
					<li><code>--spacings-L</code></li>
					</ul>
				</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>–</td>
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
				<li>Remplacer <code>--colors-white-color</code> par <code>--palettes-neutral-0</code> ou <code>--pr-t-elevation-surface-raised</code> selon si la couleur en question est considérée comme une couleur ou une surface.</li>
				<li>Remplacer <code>--colors-black-color</code> par <code>--palettes-neutral-900</code>.</li>
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
					<li><code>--commons-borderRadius-M</code></li>
					<li><code>--commons-borderRadius-L</code></li>
					<li><code>--commons-borderRadius-XL</code></li>
					<li><code>--commons-borderRadius-full</code></li>
					</ul>
				</td>
			<td>20.2.0</td>
			<td>22.0.0</td>
			<td>Remplacer par <code>--pr-t-border-radius-XXX</code> (<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0">schematics</a>)</td>
		</tr>
	</tbody>
</table>
