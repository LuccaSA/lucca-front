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
			<td><a href="https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated">Select</a> et variations (<a href="https://prisme.lucca.io/94310e217/p/699694-api-select">API</a>, <a href="https://prisme.lucca.io/94310e217/p/70d7eb-establishment">Establishment</a>, <a href="https://prisme.lucca.io/94310e217/p/479237-department-select-">Department</a>, <a href="https://prisme.lucca.io/94310e217/p/691517-select">User</a>, <a href="https://prisme.lucca.io/94310e217/p/69f87f-qualification">Qualification</a>, etc.)</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>
				<p>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/587833-select-simple">Simple</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/927519-select-multiple-new">Multiple Select</a> et leurs directives.</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>Deprecated <a href="https://prisme.lucca.io/94310e217/p/334d4a-filter-bar">Filter bar</a></td>
			<td>19.2.0</td>
			<td>22.0.0</td>
			<td>À remplacer par <a href="https://prisme.lucca.io/94310e217/p/053be4-filter-pill">Filter Pills</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/13044b-filter-bar-">Filter Bar</a>.</td>
		</tr>
		<tr>
			<td><code>&lt;lu-dropdown&gt;</code></td>
			<td>20.3.0</td>
			<td>–</td>
			<td>À remplacer par un template, comme présenté sur l'exemple de la page <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)list(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.list</code></a>
			</td>
			<td>16.2.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/883e34-sortable-list">Sortable list</a>.</td>
		</tr>
		<tr>
			<td data-pattern="\.label(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.label</code></a>
				(partout dans un sélecteur)
			</td>
			<td>16.3.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)form-group(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.form-group</code></a>
			</td>
			<td>16.4.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>sélecteur : <code>.form-field</code></li>
				<li>composants Angular : <code>lu-text-input</code>, <code>lu-checkbox-input</code>…</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-icon</code></a>
			</td>
			<td>16.5.0</td>
			<td>–</td>
			<td>Retirer la classe : <code>.button</code> applique déjà la taille d’icône.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a>
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>sélecteur : <code>.is-loading</code></li>
				<li>input Angular : <code>state=&quot;loading&quot;</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.disabled(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.disabled</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)error(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.error</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-link(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-link</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-outline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-outline</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)success(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.success</code></a></li>
				</ul>
				(partout dans un sélecteur)
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)palette-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-grey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)palette-primary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-primary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)palette-secondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-secondary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)palette-lucca(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-lucca</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li><code>*-grey</code> ⇒ <code>*-neutral</code></li>
				<li><code>*-primary</code> &amp; <code>*-secondary</code> ⇒ <code>*-product</code></li>
				<li><code>*-lucca</code> ⇒ <code>*-brand</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="(?=\S*\.(box|card|section)(?![\w-]))(?=\S*\.mod-grey(?![\w-]))\S*">
				<p>Toute combinaison de <code>.box</code>, <code>.card</code> ou <code>.section</code> avec <code>.mod-grey</code></p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)box(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.box</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)box(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-grey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)card(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.card</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)card(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-grey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)section(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.section</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)section(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-grey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)icon-color-primary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.icon-color-primary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)icon-color-secondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.icon-color-secondary</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li><code>*-grey</code> ⇒ <code>*-neutral</code></li>
				<li><code>*-primary</code> &amp; <code>*-secondary</code> ⇒ <code>*-product</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)dialog-form(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-form</code></a>
			</td>
			<td>17.3.5</td>
			<td>–</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-textLeft(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textLeft</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-textCenter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textCenter</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-textRight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textRight</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>–</td>
			<td>
				<p>Doublon :</p>
				<ul>
				<li><code>.u-text*</code> ⇒ <code>.pr-u-textAlign*</code></li>
				<li><code>*Left</code> ⇒ <code>*Start</code></li>
				<li><code>*Right</code> ⇒ <code>*End</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.active(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.active</code></a>
				(partout dans un sélecteur)
			</td>
			<td>17.4.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-dialog</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sidePanel(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sidePanel(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-sidePanel</code></a></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>*dialog</code> ⇒ <code>*popin</code></li>
				<li><code>*sidePanel</code> ⇒ <code>*drawer</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="(?=\S*\.userTile(?![\w-]))(?=\S*\.mod-X{1,3}L(?![\w-]))\S*">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-XL</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XXL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XXL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-XXL</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XXXL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-XXXL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-XXXL</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.mod-L</code>, la plus grande taille de <a href="https://prisme.lucca.io/94310e217/p/56d611-user-tile">User tile</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-user-picture(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-user-picture</code></a>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/42b330-avatar">Avatar</a> et sa classe <code>.avatar</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-body-row-cell-action(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-action</code></a>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.indexTable-body-row-cell-link</code>, un véritable lien vers la ligne.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)viewTabs(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.viewTabs</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)viewTabs-item(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.viewTabs-item</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)viewTabs_panel(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.viewTabs_panel</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)viewTabs-item-tab(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.viewTabs-item-tab</code></a></li>
				</ul>
			</td>
			<td>18.2.1</td>
			<td>–</td>
			<td>
				<p>Segmented control :</p>
				<ul>
				<li><code>*viewTabs*</code> ⇒ <code>*segmentedControl*</code></li>
				<li><code>*-item-tab</code> ⇒ <code>*-item-action</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-withMenuCompact(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-withMenuCompact</code></a>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f">schematics</a>)</td>
		</tr>
		<tr>
			<td data-pattern="\.dialog-formOptionn?al(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)dialog-formOptional(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-formOptional</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)dialog-formOptionnal(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-formOptionnal</code></a></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown-content(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-content</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown-options(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown-options-item(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options-item</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown-options-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options-item-action</code></a></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>Remplacer par le nouveau DOM du composant <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)filterBarDeprecated(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterBarDeprecated</code></a>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-(margin|padding)(Top|Right|Bottom|Left)(\d+|Auto)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)(%5Cd%2B%7CAuto)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-margin(Top|Right|Bottom|Left)(0|Auto|25|50|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)(%5Cd%2B%7CAuto)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-padding(Top|Right|Bottom|Left)(0|Auto|25|50|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(Top|Right|Bottom|Left)0</code></a></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>
				<p>Utilitaires logiques :</p>
				<ul>
				<li><code>*Top*</code> ⇒ <code>*BlockStart*</code></li>
				<li><code>*Bottom*</code> ⇒ <code>*BlockEnd*</code></li>
				<li><code>*Left*</code> ⇒ <code>*InlineStart*</code></li>
				<li><code>*Right*</code> ⇒ <code>*InlineEnd*</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)menu(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.menu</code></a>
			</td>
			<td>19.3.0</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation">Horizontal navigation</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-withMenu(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-withMenu</code></a>
			</td>
			<td>19.3.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>remplacement : <code>*withHorizontalNavigation</code></li>
				<li>suppression : <code>.pageHeader</code> détecte automatiquement <code>.horizontalNavigation</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-text(X?S|M|X{0,3}L)(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-text(X%3FS%7CM%7CX%7B0%2C3%7DL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-text(XS|S|M|L|…)</code></a>
				(utilitaires de taille)
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>XS, S &amp; M : <code>.u-text*</code> ⇒ <code>.pr-u-body*</code></li>
				<li>L ~ XXXL ⇒<ul>
				<li>utilitaire de titre : <code>.pr-u-hx</code></li>
				<li>token : <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a></li>
				</ul>
				</li>
				</ul>
				<p><a href="https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9">Plus d’informations sur le sujet</a>.</p>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-(inset0|(margin|padding|inset)(Inline|Block)(-(start|end)|Start|End)?0)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-inset0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-inset0</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-(margin%7Cpadding%7Cinset)(Inline%7CBlock)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(margin|padding|inset)(Inline|Block)0</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-(margin%7Cpadding%7Cinset)(Inline%7CBlock)(-start%7C-end%7CStart%7CEnd)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(margin|padding|inset)(Inline|Block)(-start|-end|Start|End)0</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p><code>.u-*</code> ⇒ <code>.pr-u-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-insetReset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-insetReset</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-topReset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-topReset</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-bottomReset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-bottomReset</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-leftReset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-leftReset</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-rightReset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-rightReset</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<code>*Reset</code> ⇒ <code>*0</code>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLeft(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textLeft</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCenter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textCenter</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textRight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textRight</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p>Doublon :</p>
				<ul>
				<li><code>*text*</code> ⇒ <code>*textAlign*</code></li>
				<li><code>*Left</code> ⇒ <code>*Start</code></li>
				<li><code>*Right</code> ⇒ <code>*End</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-clear(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-clear</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.pr-u-clearBoth</code>.</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius[A-Z]\w*(?![\w-])">
				<p>Angles : pas d’utilitaire logique, utiliser les tokens <code>--pr-t-border-radius-*</code></p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(TopLeft%7CTopRight%7CBottomLeft%7CBottomRight)Radius%5BA-Z%5D%5Cw*(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(textAlign%7Cfloat%7Cclear)(Left%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(TopLeft|TopRight|BottomLeft|BottomRight)Radius…</code></a></li>
				</ul>
				<p>Alignement, float &amp; clear : <code>Left</code> : <code>Start</code> / <code>InlineStart</code>, <code>Right</code> : <code>End</code> / <code>InlineEnd</code></p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(textAlign%7Cfloat%7Cclear)Left(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-(textAlign|float|clear)Left</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(textAlign%7Cfloat%7Cclear)Right(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-(textAlign|float|clear)Right</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p>Utilitaires logiques :</p>
				<ul>
				<li><code>*Left</code> ⇒ <code>*InlineStart</code></li>
				<li><code>*Right</code> ⇒ <code>*InlineEnd</code></li>
				<li><code>*textAlignLeft</code> ⇒ <code>*textAlignStart</code></li>
				<li><code>*textAlignRight</code> ⇒ <code>*textAlignEnd</code></li>
				<li>Angles physiques ⇒ tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-text(X?S|M|X{0,3}L)(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-text(X%3FS%7CM%7CX%7B0%2C3%7DL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-text(XS|S|M|L|…)</code></a>
				(utilitaires de taille)
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>XS, S &amp; M : <code>*text*</code> ⇒ <code>*body*</code></li>
				<li>L ~ XXXL ⇒<ul>
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
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-h5(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-h5</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-h6(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-h6</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>utilitaire : <code>*h4</code></li>
				<li>token : <a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">token typographie</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-text</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-delete</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>.mod-text</code> ⇒<ul>
				<li>sélecteur : <code>.mod-ghost</code></li>
				<li>input Angular : <code>luButton=&quot;ghost&quot;</code> ou <code>luButton=&quot;ghost-invert&quot;</code></li>
				</ul>
				</li>
				<li><code>.mod-delete</code> ⇒<ul>
				<li>sélecteur : <code>.mod-critical</code></li>
				<li>input Angular : <code>critical</code></li>
				</ul>
				</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button-group(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-group</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button-group(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-text</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.mod-ghost</code>.</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)?Radius(M|L|XL)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-borderRadius(M%7CL%7CXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-borderRadius(M|L|XL)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)Radius(M%7CL%7CXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)Radius(M|L|XL)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)RadiusFull(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(StartStart|StartEnd|EndStart|EndEnd)RadiusFull</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>*RadiusM</code> &amp; <code>*RadiusL</code> ⇒ <code>*RadiusDefault</code></li>
				<li><code>*RadiusXL</code> ⇒ <code>*RadiusStructure</code></li>
				<li>Angles ⇒ tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.mod-delete(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-delete</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-textLight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textLight</code></a></li>
				</ul>
				(partout dans un sélecteur)
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>.mod-delete</code> ⇒ <code>.mod-critical</code></li>
				<li><code>.u-textLight</code> ⇒ <code>.pr-u-textLight</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="\.u-[a-zA-Z]">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-%5Ba-zA-Z%5D%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-…</code></a>
				(tout utilitaire préfixé <code>.u-</code>)
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p><code>.u-*</code> ⇒ <code>.pr-u-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textProduct(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textProduct(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textProduct</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textBrand(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textBrand</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCritical(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textCritical</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textDefault(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textDefault</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textError(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textError</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textLight</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textNeutral(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textNeutral</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPlaceholder(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPlaceholder</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textSuccess(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textSuccess</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textWarning(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textWarning</code></a></li>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textSuccessContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textWarningContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textBrandContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textNavigation(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPagga(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPoplee(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCoreHR(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textTimmi(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCleemy(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCc(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textKiwi(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLime(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textCucumber(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textMint(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textGlacier(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLagoon(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textBlueberry(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLavender(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textGrape(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textWatermelon(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPumpkin(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPineapple(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-text(Cc|Kiwi|Lime|Mint|…)</code></a>
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
			<td data-pattern="\.pr-u-textAI(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textAI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textAI</code></a>
				(utilitaires renommés peu ou pas utilisés)
			</td>
			<td>21.0.0</td>
			<td>21.3.0</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textPrimary(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPrimary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPrimary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textSecondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textSecondary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textGrey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textGrey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textLucca(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textLucca</code></a></li>
				</ul>
				(utilitaires renommés très utilisés)
			</td>
			<td>21.0.0</td>
			<td>22.0.0</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-colorTextGrey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextGrey</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-colorTextLucca(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextLucca</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-colorTextPrimary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextPrimary</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-colorTextSecondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextSecondary</code></a></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li><code>*Grey</code> ⇒<ul>
				<li>neutre : <code>*Neutral</code></li>
				<li>défaut : <code>*</code></li>
				</ul>
				</li>
				<li><code>*Primary</code> &amp; <code>*Secondary</code> ⇒ <code>*Product</code></li>
				<li><code>*Lucca</code> ⇒ <code>*Brand</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)container(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-S(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.container</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)container(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-S(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-S</code></a>
			</td>
			<td>21.1.0</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-S</code>, sans remplacement.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)checkbox(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.checkbox</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/42c88e-checkbox">Checkbox</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)radio(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radio</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)radioButtons(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radioButtons</code></a></li>
				</ul>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)switch(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.switch</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/39c7b7-switch">Switch</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)textfield(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.textfield</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/459eda-textfield">Textfield</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)file(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.file</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/8282a5-file-upload">File upload</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>
				<ul>
				<li><a href="https://prisme.lucca.io/94310e217/p/4263a5-data-table">Data table</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/24fc14-index-table">Index table</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)main(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.main</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)layout(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.layout</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)header(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.header</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)filters(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filters</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)notchBox(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.notchBox</code></a></li>
				</ul>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.label-icon(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)label-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.label-icon</code></a>
				(partout dans un sélecteur)
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textPineappleContrasted(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textPineappleContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPineappleContrasted</code></a>
				(utilitaires renommés peu ou pas utilisés)
			</td>
			<td>21.2.4</td>
			<td>–</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-textOrchid(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-textOrchid(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textOrchid</code></a>
				(utilitaires renommés peu ou pas utilisés)
			</td>
			<td>21.3.0</td>
			<td>–</td>
			<td>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)palette-AI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-AI</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-colorTextAI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextAI</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<ul>
				<li><code>*-AI</code> ⇒ <code>*-orchid</code></li>
				<li><code>*TextAI</code> ⇒ <code>*TextOrchid</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)filterPill-combobox(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterPill-combobox</code></a>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>Remplacer par <code>.filterPill-value</code>.</td>
		</tr>
		<tr>
			<td data-pattern="\.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pr-u-(margin%7Cpadding%7Cinset)(Inline%7CBlock)-(start%7Cend)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-(margin|padding|inset)(Inline|Block)-(start|end)0</code></a>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>
				<p>Passer en camelCase :</p>
				<ul>
				<li><code>*-start0</code> ⇒ <code>*Start0</code></li>
				<li><code>*-end0</code> ⇒ <code>*End0</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-neutralBackground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-neutralBackground</code></a>
			</td>
			<td>22.0.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>sélecteur : <code>.dialog.mod-surfaceDefault</code></li>
				<li>option de <code>LuDialogService.open()</code> : <code>surfaceDefault: true</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)activityFeed-content-update-after(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.activityFeed-content-update-after</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)activityFeed-content-update-before(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.activityFeed-content-update-before</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)activityFeed-content-update-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.activityFeed-content-update-icon</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>Remplacer par <code>.activityFeed-content-update-item-(after|before|icon)</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)dataTable(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-hover(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dataTable</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)dataTable(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-hover(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-hover</code></a>
			</td>
			<td>22.0.6</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-hover</code> et l’input Angular <code>hover</code>, sans remplacement : une ligne sans action ne doit pas avoir d’effet de survol.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)fancyBox-content-box(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-box</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)fancyBox-content-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-foreground</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)fancyBox-content-box-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-box-foreground</code></a></li>
				</ul>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>HTML : composant <code>lu-fancy-box</code>, renommer la classe seule fait disparaître les illustrations</li>
				<li>input Angular : <code>foregroundStartEnd</code> à la place de <code>foreground</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)highlightSection(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.highlightSection</code></a>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>Le composant Highlight section (<code>.highlightSection</code> et <code>&lt;lu-highlight-section&gt;</code>) sera remplacé en 22.2 par une évolution du composant Box.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)priorityLevels(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.priorityLevels</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)priorityLevels-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.priorityLevels-icon</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.1.1</td>
			<td>Remplacer par <code>.priorityLevel</code> et <code>.priorityLevel-icon</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)checkboxesfield(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.checkboxesfield</code></a>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/42c88e-checkbox">Checkbox</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)radiosfield(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radiosfield</code></a>
			</td>
			<td>–</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
	</tbody>
</table>

<details>
<summary>Suppressions jusqu’à la 21.2.2</summary>

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
			<td data-pattern="\.grid-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)(\d+|Offset\d+)?(?![\w-])">
				<p>Colonnes de grille</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)(1|2|3|4|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)Offset(1|2|3|4|…)</code></a></li>
				</ul>
				<p>Alignements de grille</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(xxxs|xxs|xs|s|…)(Start|Center|End|Top|…)</code></a></li>
				</ul>
				<p>Colonnes de formulaire</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(xxxs|xxs|xs|s|…)(1|2|3|4|…)</code></a></li>
				</ul>
				<p>Tableaux</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-stickyColumn-(xxxs|xxs|xs|s|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(%5Cd%2B%7COffset%5Cd%2B)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%5Cd%2B)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-layoutFixed-(xxxs|xxs|xs|s|…)(2|3|4|5|…)</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>15.1.0</td>
			<td>Écrire le point de rupture en majuscules (<code>l</code> ⇒ <code>L</code>), puis appliquer les dépréciations suivantes du composant.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)status(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.status</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)status-dot(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.status-dot</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)status-label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.status-label</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)status-dot-important(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.status-dot-important</code></a></li>
				</ul>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/425d98-status-badge">Status badge</a>.</td>
		</tr>
		<tr>
			<td data-pattern="\.grid(-(offset)?\d+)?\\@mediaMin">
				<p>Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (<code>.grid-6\@mediaMinS</code>)</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid\@mediaMin…</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(1|2|3|4|…)\@mediaMin…</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-offset(1|2|3|4|…)\@mediaMin…</code></a></li>
				</ul>
				<p>Mods de l’ancienne grille, combinés à <code>.grid</code></p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-reverse(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-reverse(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-reverse</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(start|center|end|top|…)\@mediaMin…</code></a></li>
				</ul>
				<p>Utilitaires d’ordre de l’ancienne grille</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-first\@mediaMin…</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)grid(-(offset)%3F%5Cd%2B)%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5E%7C%5B%5E%5Cw-%5D)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-last\@mediaMin…</code></a></li>
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
			<td data-pattern="\.u-elevate.*">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-elevate.*%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-elevate…</code></a>
			</td>
			<td>16.2.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)textfield-actionClear(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.textfield-actionClear</code></a>
			</td>
			<td>16.2.2</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-counter</code></a>
			</td>
			<td>16.3.0</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-counter</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)navSide-item-alert(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.navSide-item-alert</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-select-value%20%5C.label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-select-value .label</code></a></li>
				</ul>
			</td>
			<td>16.3.0</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)callout(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-tiny(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.callout</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)callout(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-tiny(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-tiny</code></a>
			</td>
			<td>16.5.0</td>
			<td>18.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-icon</code></a>
			</td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)actionIcon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.actionIcon</code></a>
			</td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
				<li>sans bordure : <code>.button.mod-onlyIcon.mod-ghost</code></li>
				<li>avec bordure : <code>.button.mod-onlyIcon.mod-outlined</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-comma(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-comma</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-unit(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-unit</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="\.u-((margin|padding)(Top|Right|Bottom|Left)?(Auto|0|X{1,2}[SL]|[SML])|(margin|padding)(Inline|Block)(Auto|X{1,2}[SL]|[SML])|(columnGap|rowGap|gap)(0|X{1,2}[SL]|[SML]))(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-gap(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-columnGap(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-rowGap(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-margin(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginBlock(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginBottom(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginInline(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginLeft(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginRight(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-marginTop(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-padding(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingBlock(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingBottom(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingInline(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingLeft(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingRight(0|Auto|XXS|XS|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-paddingTop(0|Auto|XXS|XS|…)</code></a></li>
				</ul>
				<p>Utilitaires de bordure à zéro : noms <code>.u-</code> supprimés avec les utilitaires t-shirt, noms <code>.pr-u-</code> toujours livrés</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-border0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-border0</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D)%7C(columnGap%7CrowGap%7Cgap)(0%7CX%7B1%2C2%7D%5BSL%5D%7C%5BSML%5D))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-border(Top|Right|Bottom|Left|…)0</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
				<li><code>.u-*</code> ⇒ <code>.pr-u-*</code></li>
				<li><code>*XXS</code> ⇒ <code>*50</code></li>
				<li><code>*XS</code> ⇒ <code>*100</code></li>
				<li><code>*S</code> ⇒ <code>*200</code></li>
				<li><code>*M</code> ⇒ <code>*300</code></li>
				<li><code>*L</code> ⇒ <code>*400</code></li>
				<li><code>*XL</code> ⇒ <code>*600</code></li>
				<li><code>*XXL</code> ⇒ <code>*800</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)user-info(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-info</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)user-tile(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-tile</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)user-tile-title(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-tile-title</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)user-tile-label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-tile-label</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)user-tile-footnote(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-tile-footnote</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)picture(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.picture</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)mod-columnSticky-shadowMask(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-columnSticky-shadowMask</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>.mod-stickyColumn-shadowMask</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell-sortableButton(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell-sortableButton</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell-sortableButton-arrows-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell-sortableButton-arrows-ascending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell-sortableButton-arrows-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell-sortableButton-arrows-descending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell-sortableButton(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell-sortableButton</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell-sortableButton-arrows-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell-sortableButton-arrows-ascending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell-sortableButton-arrows-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell-sortableButton-arrows-descending</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="(?=\S*\.(indexT|t)able-head-row-cell(?![\w-]))(?=\S*\.(mod-sortable|sortedAscending|sortedDescending|is-sorted-(ascending|descending))(?![\w-]))\S*">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-sortable</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedAscending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedDescending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-ascending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-descending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-sortable</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedAscending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedDescending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-ascending</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-descending</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-nameOnly(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-nameOnly(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-nameOnly</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userPicture-initials(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userPicture-initials</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)comment-content-textContainer(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.comment-content-textContainer</code></a>
			</td>
			<td>18.3.0</td>
			<td>20.1.0</td>
			<td>(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f">schematics</a>)</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-prev(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.calendarWrapper-navigation</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-prev(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-prev</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-next(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.calendarWrapper-navigation</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-next(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-next</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)filterBar-scrollBox-first(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterBar-scrollBox-first</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)filterBar-scrollBox-last(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterBar-scrollBox-last</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-body-row-cell-subAction(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-subAction</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)indexTable-body-row-cell-subActionDropdownTrigger(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-subActionDropdownTrigger</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)calloutPopover-overlay-head-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.calloutPopover-overlay-head-icon</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par <code>.calloutPopover-overlay-icon</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)multipleSelect-displayer-numericBadge(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.multipleSelect-displayer-numericBadge</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par le composant <code>lu-chip</code>, utilisé par le displayer depuis la 21.0.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)richTextField-toolbar-chips-item(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.richTextField-toolbar-chips-item</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par <code>.richTextField-toolbar-chips-chip</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pagination(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-mods(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pagination</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)pagination(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5E%7C%5B%5E%5Cw-%5D)mod-mods(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-mods</code></a>
			</td>
			<td>–</td>
			<td>21.1.4</td>
			<td>Remplacer par <code>.mod-compact</code>.</td>
		</tr>
	</tbody>
</table>

</details>

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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-background-base(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-background-base</code></a>
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>Remplacer par le token <code>--pr-t-elevation-surface-default</code>.</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-(grey|primary|secondary|lucca)-(0|text|25|50|100|200|300|400|500|600|700|800|900)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-grey-(0|text|25|50|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-primary-(0|text|25|50|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-secondary-(0|text|25|50|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-lucca-(0|text|25|50|…)</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li><code>*-grey-*</code> ⇒ <code>*-neutral-*</code></li>
				<li><code>*-primary-*</code> &amp; <code>*-secondary-*</code> ⇒ <code>*-product-*</code></li>
				<li><code>*-lucca-*</code> ⇒ <code>*-brand-*</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-grey-900-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-grey-900-rgb</code></a>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li>Sass : <code>color.transparentize(var(--palettes-neutral-900), …)</code></li>
				<li>CSS : <code>color-mix()</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-grey-400-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-grey-400-rgb</code></a>
			</td>
			<td>17.3.1</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li>Sass : <code>color.transparentize(var(--palettes-neutral-400), …)</code></li>
				<li>CSS : <code>color-mix()</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-navSide-fullwidth-palette-alert-color(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-navSide-fullwidth-palette-alert-color</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-navSide-fullwidth-palette-alert-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-navSide-fullwidth-palette-alert-text</code></a></li>
				</ul>
			</td>
			<td>17.3.2</td>
			<td>–</td>
			<td>Retirer la variable : l’alerte est remplacée par le composant Numeric badge.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-white-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-white-rgb</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-neutral-400-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-neutral-400-rgb</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-neutral-900-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-neutral-900-rgb</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li>Sass : <code>color.transparentize(var(--palettes-neutral-*), …)</code></li>
				<li>CSS : <code>color-mix()</code></li>
				</ul>
				<p><small><code>*</code> = <code>0</code> pour <code>white</code>, sinon la nuance d&#39;origine</small></p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-toasts-background(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-toasts-background</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-toasts-padding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-toasts-padding</code></a></li>
				</ul>
			</td>
			<td>18.1.0</td>
			<td>–</td>
			<td>Retirer la variable, sans remplacement.</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-(\w+-)?text(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(%5Cw%2B-)%3Ftext(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-…-text</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-text</code></a></li>
				</ul>
				(toutes les palettes)
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>
				<p><code>*text</code> ⇒ <code>*0</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-disabled-opacity(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-disabled-opacity</code></a>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li>token de texte : <code>--pr-t-color-text-disabled</code></li>
				<li>couleur : <code>--commons-disabled-color</code></li>
				<li>fond : <code>--commons-disabled-background</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-black-color(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-black-color</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-white-color(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-white-color</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>22.0.0</td>
			<td>
				<ul>
				<li><code>--colors-white-color</code> ⇒<ul>
				<li>couleur : <code>--palettes-neutral-0</code></li>
				<li>surface : <code>--pr-t-elevation-surface-raised</code></li>
				</ul>
				</li>
				<li><code>--colors-black-color</code> ⇒ <br><code>--palettes-neutral-900</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-navSide-compact-width(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-navSide-compact-width</code></a>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-container-max-width(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-container-max-width</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-container-padding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-container-padding</code></a></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>--components-container-max-width</code> ⇒ <br><code>--commons-container-maxWidth</code></li>
				<li><code>--components-container-padding</code> ⇒ <br><code>--commons-container-padding</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-font-family(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-font-family</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-font-family-brand(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-font-family-brand</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-font-family-cursive(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-font-family-cursive</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<p><code>--commons-*</code> ⇒ <code>--pr-t-*</code></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="--sizes-(XS|S|M|L|XL|XXL|XXXL)-(fontSize|lineHeight)(?![\w-])">
				<p>Tailles de police et hauteurs de ligne</p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-fontSize</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-lineHeight</code></a></li>
				</ul>
				<p>Paddings verticaux, lus uniquement avec <code>$deprecatedSpacings: true</code></p>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-verticalPadding</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-verticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-verticalPadding</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<p><a href="https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311">Tokens typographie</a> :</p>
				<ul>
				<li><code>*sizes-XXXL-*</code> ⇒ <br>aucun token équivalent</li>
				<li><code>*sizes-XXL-*</code> ⇒ <br><code>*pr-t-font-heading-1-*</code></li>
				<li><code>*sizes-XL-*</code> ⇒ <br><code>*pr-t-font-heading-2-*</code></li>
				<li><code>*sizes-L-*</code> ⇒ <br><code>*pr-t-font-heading-3-*</code></li>
				<li><code>*sizes-M-*</code> ⇒<ul>
				<li>texte : <code>*pr-t-font-body-M-*</code></li>
				<li>titre : <code>*pr-t-font-heading-4-*</code></li>
				</ul>
				</li>
				<li><code>*sizes-S-*</code> ⇒ <br><code>*pr-t-font-body-S-*</code></li>
				<li><code>*sizes-XS-*</code> ⇒ <br><code>*pr-t-font-body-XS-*</code></li>
				<li><code>--sizes-*-verticalPadding</code> ⇒ <br>tokens <code>--pr-t-spacings-*</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td data-pattern="--components-button-(font-size|line-height)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-(font-size%7Cline-height)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-button-(font-size|line-height)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-(font-size%7Cline-height)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(callout%7CcalloutFeedbackList%7Cchip%7Ccomment-text%7Cdivider%7CformLabel%7CsortableList-description%7Ctag)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(callout|calloutFeedbackList|…)-(fontSize|lineHeight)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-textField-(fontSize|lineHeight)</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>*-fontSize</code> ⇒ <code>*-font</code></li>
				<li><code>*-lineHeight</code> ⇒ <code>*-font</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-numericBadge-fontSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-numericBadge-fontSize</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-numericBadge-lineHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-numericBadge-lineHeight</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>21.3.0</td>
			<td>Remplacer par <code>--components-numericBadge-font</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-borderRadius-M(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-borderRadius-M</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-borderRadius-L(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-borderRadius-L</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-borderRadius-XL(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-borderRadius-XL</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-borderRadius-full(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-borderRadius-full</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>*-M</code> ⇒ <code>--pr-t-border-radius-50</code></li>
				<li><code>*-L</code> ⇒ <code>--pr-t-border-radius-100</code></li>
				<li><code>*-XL</code> ⇒ <code>--pr-t-border-radius-150</code></li>
				<li><code>*-full</code> ⇒ <code>--pr-t-border-radius-full</code></li>
				</ul>
				<p><small><code>*</code> = <code>--commons-borderRadius</code></small></p>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-gauge-height(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-gauge-height</code></a>
			</td>
			<td>20.3.0</td>
			<td>–</td>
			<td>Remplacer par <code>--components-gauge-blockSize</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-resize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-resize</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-height(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-height</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-minHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-minHeight</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-maxHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-maxHeight</code></a></li>
				</ul>
			</td>
			<td>21.2.0</td>
			<td>–</td>
			<td>
				<p><code>--components-richTextField-*</code> ⇒ <br><code>--components-richTextField-content-*</code></p>
			</td>
		</tr>
		<tr>
			<td data-pattern="--palettes-AI-\d+(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-AI-%5C*(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-AI-*</code></a>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<ul>
				<li>couleur : <code>--palettes-orchid-*</code></li>
				<li>dégradé : <code>--palettes-ai-*</code></li>
				</ul>
				<p><small>(<code>*</code>: 50-900)</small></p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-pageHeader-content-action-flexShrink(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-pageHeader-content-action-flexShrink</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-pageHeader-content-flexWrap(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-pageHeader-content-flexWrap</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-filterPill-display(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-filterPill-display</code></a>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-display-padding-block(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-display-padding-block</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-display-padding-inline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-display-padding-inline</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>Remplacer par <code>--components-timepicker-display-inset-(block|inline)</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-minHeigh(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-minHeigh</code></a>
			</td>
			<td>–</td>
			<td>21.3.1</td>
			<td>Remplacer par <code>--components-richTextField-minHeight</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-activityFeed-content-update-display(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-activityFeed-content-update-display</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-activityFeed-content-update-icon-display(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-activityFeed-content-update-icon-display</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>Remplacer par <code>--components-activityFeed-content-update-item-(icon-)?display</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-list-option-action-pointerEvents(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-list-option-action-pointerEvents</code></a>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-listboxOption-content-opacity(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-listboxOption-content-opacity</code></a>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-offsetInline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-offsetInline</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-offsetBlock(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-offsetBlock</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-imageWidth(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-imageWidth</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-imageHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-imageHeight</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-background-left(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-background-left</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-background-right(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-background-right</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-foreground</code></a></li>
				</ul>
			</td>
			<td>22.1.0</td>
			<td>–</td>
			<td>
				<p>Avec <code>*</code> = <code>--components-fancyBox</code> :</p>
				<ul>
				<li><code>*-offsetInline</code> ⇒ <br><code>*-content-foregroundStartEnd-insetInlineEnd</code></li>
				<li><code>*-offsetBlock</code> ⇒ <br><code>*-content-foregroundStartEnd-insetBlockStart</code></li>
				<li><code>*-imageWidth</code> ⇒ <br><code>*-content-foregroundStartEnd-inlineSize</code></li>
				<li><code>*-imageHeight</code> ⇒ <br><code>*-content-foregroundStartEnd-blockSize</code></li>
				<li>Image <code>*-background-left</code> ⇒<ul>
				<li>sélecteur : <code>.fancyBox-content-backgroundEndStart</code></li>
				<li>input Angular : <code>backgroundEndStart</code></li>
				</ul>
				</li>
				<li>Image <code>*-background-right</code> ⇒<ul>
				<li>sélecteur : <code>.fancyBox-content-backgroundStartEnd</code></li>
				<li>input Angular : <code>backgroundStartEnd</code></li>
				</ul>
				</li>
				<li>Image <code>*-foreground</code> ⇒<ul>
				<li>sélecteur : <code>.fancyBox-content-foregroundStartEnd</code></li>
				<li>input Angular : <code>foregroundStartEnd</code></li>
				</ul>
				</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--components-priorityLevels-(font|gap|minBlockSize|icon-color[1-3])(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-font(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-font</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-gap(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-gap</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-minBlockSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-minBlockSize</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-icon-color(1%7C2%7C3)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-icon-color(1|2|3)</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.1.1</td>
			<td>Remplacer par <code>--components-priorityLevel-*</code>.</td>
		</tr>
	</tbody>
</table>

<details>
<summary>Suppressions jusqu’à la 21.2.2</summary>

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
			<td data-pattern="--breakpoints-(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)-breakAt(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--breakpoints-(xxxs|xxs|xs|s|…)-breakAt</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-box-shadow-(hard|xxs|xs|s|…)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--spacings-(reset|smallest|…)</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>15.1.0</td>
			<td>
				<ul>
				<li><code>--breakpoints-*-breakAt</code> ⇒ point de rupture en majuscules (<code>l</code> ⇒ <code>L</code>)</li>
				<li><code>--commons-box-shadow-*</code> ⇒ <code>--commons-boxShadow-*</code> en majuscules</li>
				<li><code>--spacings-*</code> ⇒ échelle en majuscules :<ul>
				<li><code>reset</code> ⇒ <code>0</code></li>
				<li><code>smallest</code> ⇒ <code>XXS</code></li>
				<li><code>smaller</code> ⇒ <code>XS</code></li>
				<li><code>small</code> ⇒ <code>S</code></li>
				<li><code>standard</code> ⇒ <code>M</code></li>
				<li><code>big</code> ⇒ <code>L</code></li>
				<li><code>bigger</code> ⇒ <code>XL</code></li>
				<li><code>biggest</code> ⇒ <code>XXL</code></li>
				</ul>
				</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td data-pattern="--commons-elevations-elevation-[1-6](?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-elevations-elevation-%5B1-6%5D(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-elevations-elevation-(1|2|3|4|…)</code></a>
			</td>
			<td>16.1.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-XXS(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-XXS</code></a>
			</td>
			<td>16.1.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="--commons-boxShadow-(X?S|M|X*L)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-S(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-S</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-M(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-M</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-L(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-L</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td data-pattern="--spacings-(0|X{0,2}S|M|X{0,2}L|auto)(?![\w-])">
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(0%7CX%7B0%2C2%7DS%7CM%7CX%7B0%2C2%7DL%7Cauto)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--spacings-(0|auto|XXS|XS|…)</code></a>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
				<li><code>--spacings-*</code> ⇒ <code>--pr-t-spacings-*</code></li>
				<li><code>*XXS</code> ⇒ <code>*50</code></li>
				<li><code>*XS</code> ⇒ <code>*100</code></li>
				<li><code>*S</code> ⇒ <code>*200</code></li>
				<li><code>*M</code> ⇒ <code>*300</code></li>
				<li><code>*L</code> ⇒ <code>*400</code></li>
				<li><code>*XL</code> ⇒ <code>*600</code></li>
				<li><code>*XXL</code> ⇒ <code>*800</code></li>
				</ul>
				(<a href="https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256">schematics</a>)
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-fontSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-fontSize</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-lineHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-lineHeight</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>--components-title-font</code>.</td>
		</tr>
		<tr>
			<td data-pattern="--components-(inlineMessage|simpleSelect|multiSelect|segmentedControl|timepicker|sortableList-helper)-(fontSize|lineHeight)(?![\w-])">
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(inlineMessage%7CsimpleSelect%7CmultiSelect%7CsegmentedControl%7Ctimepicker%7CsortableList-helper)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-horizontalNavigation-listItemAction(FontSize%7CLineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-title-weight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(timepicker|multiSelect|…)-(fontSize|lineHeight)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-switchField-label-(fontSize|lineHeight)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-horizontalNavigation-listItemAction(FontSize%7CLineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-horizontalNavigation-listItemAction(FontSize|LineHeight)</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-title-weight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-title-weight</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>
				<ul>
				<li><code>*-fontSize</code> ⇒ <code>*-font</code></li>
				<li><code>*-lineHeight</code> ⇒ <code>*-font</code></li>
				<li><code>*FontSize</code> ⇒ <code>*Font</code></li>
				<li><code>*LineHeight</code> ⇒ <code>*Font</code></li>
				<li><code>*-weight</code> ⇒ <code>*-font</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-filterBar-extremitiesDisplay(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-filterBar-extremitiesDisplay</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-scrollBox-wrap(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-scrollBox-wrap</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--pr-t-radius-input(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--pr-t-radius-input</code></a>
			</td>
			<td>–</td>
			<td>20.2.0</td>
			<td>Remplacer par <code>--pr-t-border-radius-input</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-box-arrow-horizontalMargin(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-box-arrow-horizontalMargin</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fileEntry-status-borderRadius(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fileEntry-status-borderRadius</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-box-border-radius(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-box-border-radius</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.2.0</td>
			<td>Utiliser les tokens <code>--pr-t-border-radius-*</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-max-height(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-max-height</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-max-width(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-max-width</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-min-width(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-min-width</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-option-actionBackground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-option-actionBackground</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-optionColor(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-optionColor</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-option-actionColor(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-option-actionColor</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-option-actionEvents(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-option-actionEvents</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.3.0</td>
			<td>
				<ul>
				<li><code>max-height</code> ⇒ <code>maxBlockSize</code></li>
				<li><code>max-width</code> ⇒ <code>maxInlineSize</code></li>
				<li><code>min-width</code> ⇒ <code>minInlineSize</code></li>
				<li><code>option-actionBackground</code> ⇒ <code>list-option-action-backgroundColor</code></li>
				<li><code>option-actionColor</code> ⇒ <code>list-option-action-color</code></li>
				<li><code>option-actionEvents</code> et <code>optionColor</code> : sans remplacement</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-tag-iconBottom(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-tag-iconBottom</code></a>
			</td>
			<td>–</td>
			<td>20.3.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-calloutPopover-content-margin(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-calloutPopover-content-margin</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dataTable-overflow(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dataTable-overflow</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-filterPill-clear-display(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-filterPill-clear-display</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par <code>--components-clear-display</code> du composant Clear.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-inputFramed-header-label-fontWeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-inputFramed-header-label-fontWeight</code></a>
			</td>
			<td>–</td>
			<td>21.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-paddingInput-block(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-paddingInput-block</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-paddingInput-inline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-paddingInput-inline</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.1.0</td>
			<td>Remplacer par <code>--components-timepicker-input-padding-(block|inline)</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--background-left-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--background-left-01</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--background-right-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--background-right-01</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--foreground-left-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--foreground-left-01</code></a></li>
					<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--foreground-right-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--foreground-right-01</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.2.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-loading-padding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-loading-padding</code></a>
			</td>
			<td>–</td>
			<td>21.2.0</td>
			<td>–</td>
		</tr>
	</tbody>
</table>

</details>
