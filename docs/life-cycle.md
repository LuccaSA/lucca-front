# Propriétés et sélecteurs dépréciés

> **Note :** les éléments dont la suppression est livrée figurent dans [Propriétés et sélecteurs supprimés](life-cycle-deleted.md).

<style>
  table {
    table-layout: fixed !important;
  }

  table thead th:last-of-type {
    inline-size: 39% !important;
  }

  table :is(th, td):is(:nth-child(2), :nth-child(3)) {
    text-align: center !important;
  }

  td > :is(ol, ul) {
    list-style-position: outside !important;
    padding-inline-start: 0.5rem !important;
  }
</style>

## Composants

Sources : [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs) et les marqueurs `@deprecated` de [packages/ng](https://github.com/LuccaSA/lucca-front/tree/master/packages/ng)

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
				<a href="https://prisme.lucca.io/94310e217/p/66df2f-list">List</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)list(-(item-content-description%7Citem-content-title%7Citem-actions%7Citem-content%7Citem-handler%7Citem))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.list</code></a>
			</td>
			<td>16.2.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/883e34-sortable-list">Sortable list</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/863d99-side-panel">Side panel</a>
			</td>
			<td>16.3.0</td>
			<td>–</td>
			<td>Remplacer par <code>LuModal</code> avec <code>modal.open(component, data, { mode: &#39;sidepanel&#39; })</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated">Select</a>, <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-select(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>lu-select</code></a>
			</td>
			<td>17.3.2</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/lu-select"><strong>Schematic</strong> : lu-select</a>
				<p>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/587833-select-simple">Simple</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/927519-select-multiple-new">Multiple Select</a> et leurs directives.</p>
				<p>Variations concernées :</p>
				<ul>
				<li><a href="https://prisme.lucca.io/94310e217/p/699694-api-select">API</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/70d7eb-establishment">Establishment</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/479237-department-select-">Department</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/691517-select">User</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/69f87f-qualification">Qualification</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>User picture, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-user-picture(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-user-picture</code></a></td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/42b330-avatar">Avatar</a> et sa classe <code>.avatar</code>.</td>
		</tr>
		<tr>
			<td>View tabs, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)viewTabs(-item(-tab)%3F%7C_panel)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.viewTabs</code></a></td>
			<td>18.2.1</td>
			<td>–</td>
			<td>
				<p>Segmented control :</p>
				<ul>
				<li><code>.viewTabs*</code> ⇒ <code>.segmentedControl*</code></li>
				<li><code>*-item-tab</code> ⇒ <code>*-item-action</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/10c73a-date-picker">Date picker</a>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>Remplacer par <code>DateInputComponent</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/334d4a-filter-bar">Filter bar</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)filterBarDeprecated(-(footer-toggleButton-labelAlternative%7Cfooter-toggleButton-label%7Cfooter-toggleButton%7Cfooter-actions%7CtoggledFilters%7Cfooter))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterBarDeprecated</code></a>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/053be4-filter-pill">Filter Pills</a> &amp; <a href="https://prisme.lucca.io/94310e217/p/13044b-filter-bar-">Filter Bar</a>.</td>
		</tr>
		<tr>
			<td>Menu, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)menu(-(containerOptional%7Clink-placeholder%7Clist-item-action%7Clink%7Clist))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.menu</code></a></td>
			<td>19.3.0</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation">Horizontal navigation</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-panel(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>lu-dropdown</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)lu-dropdown(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-panel(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-panel</code></a></li>
				</ul>
			</td>
			<td>20.3.1</td>
			<td>–</td>
			<td>Remplacer <code>&lt;lu-dropdown&gt;</code> par un template, comme présenté sur l’exemple de la page <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/7693f3-popover">Popover</a>
			</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>Remplacer par <code>PopoverDirective</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/04061d-checkbox">Checkbox</a>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)checkbox(-(label-helper%7Cinput%7Clabel%7Cmixed))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)checkboxesfield(-(messages-success%7Cmessages-warning%7Cmessages-helper%7Cmessages-error%7Cmessages-valid%7Cmessages%7Csuffix%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.checkbox</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)checkbox(-(label-helper%7Cinput%7Clabel%7Cmixed))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)checkboxesfield(-(messages-success%7Cmessages-warning%7Cmessages-helper%7Cmessages-error%7Cmessages-valid%7Cmessages%7Csuffix%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.checkboxesfield</code></a></li>
				</ul>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/42c88e-checkbox">Checkbox</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/07849c-radio">Radio</a>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)radio(-(label-helper%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)radiosfield(-(messages-success%7Cmessages-warning%7Cmessages-helper%7Cmessages-error%7Cmessages-valid%7Cmessages%7Csuffix%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radio</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)radio(-(label-helper%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)radiosfield(-(messages-success%7Cmessages-warning%7Cmessages-helper%7Cmessages-error%7Cmessages-valid%7Cmessages%7Csuffix%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radiosfield</code></a></li>
				</ul>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/55805e-radio-buttons">Radio buttons</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)radioButtons(-(item-input%7Citem-label%7Citem))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.radioButtons</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/45f82a-radio">Radio</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/15149b-switch">Switch</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)switch(-(label-helper%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.switch</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/39c7b7-switch">Switch</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/55f101-text-field">Textfield</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)textfield(-(messages-success%7Cmessages-warning%7Cmessages-helper%7Cmessages-error%7Cmessages-valid%7Coptions-entry%7Csuffix-action%7Coptions-mark%7Cmessages%7Coptions%7Csuffix%7Cclear%7Cinput%7Clabel))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.textfield</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/459eda-textfield">Textfield</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/99e88e-file-upload">File upload</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)file(-(progress%7Ccontent%7Cformats%7Cbutton%7Cinput%7Ctitle%7Cicon%7Cname%7Cor))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.file</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/8282a5-file-upload">File upload</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/75b1ea-table-">Table</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)table(-(head-row-cell-secondLine%7Cbody-row-cell-handler%7Cfoot-row-cell-handler%7Chead-row-cell-wrapper%7Cbody-row-cell-action%7Cfoot-row-cell-action%7Cbody-row-cell%7Cfoot-row-cell%7Chead-row-cell%7Cbody-row%7Cfoot-row%7Chead-row%7Cbody%7Cfoot%7Chead))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>
				<p>Remplacer par :</p>
				<ul>
				<li><a href="https://prisme.lucca.io/94310e217/p/4263a5-data-table">Data table</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/24fc14-index-table">Index table</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://prisme.lucca.io/94310e217/p/640fae-label">Label</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)label(-(icon))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.label</code></a>
			</td>
			<td>21.1.2</td>
			<td>–</td>
			<td>
				<p>Remplacer par :</p>
				<ul>
				<li><a href="https://prisme.lucca.io/94310e217/p/3960bc-chip">Chip</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/6036ad-tag">Tag</a></li>
				<li><a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>Main, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)main(-(content))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.main</code></a></td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>Layout, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)layout(-(content-headers-subheader%7Ccontent-headers-header%7Cnavside-content-inner%7Caside-content-inner%7Ccontent-container%7Ccontent-headers%7Cnavside-content%7Ccontent-footer%7Cnavside-footer%7Cnavside-toggle%7Caside-content%7Ccontent-inner%7Caside-footer%7Ccontent%7Cnavside%7Cbanner%7Cfooter%7Caside))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.layout</code></a></td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>Header, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)header(-(contentRight%7Cnav-category%7CcontentLeft%7Cnav-title%7Cnav-back%7Cnav))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.header</code></a></td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>Filters, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)filters(-(sectionRight%7CsectionLeft))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filters</code></a></td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>Notch box, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)notchBox(-(wrapper%7Cbadge))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.notchBox</code></a></td>
			<td>21.1.2</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>Highlight section, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)highlightSection(-(content-illustration%7Ccontent-slot%7CbubbleStart%7CbubbleEnd%7Ccontent))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.highlightSection</code></a></td>
			<td>22.1.1</td>
			<td>–</td>
			<td>Le composant Highlight section (<code>.highlightSection</code> et <code>&lt;lu-highlight-section&gt;</code>) sera remplacé en 22.2 par une évolution du composant Box.</td>
		</tr>
		<tr>
			<td>Priority levels, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)priorityLevels(-icon)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.priorityLevels</code></a></td>
			<td>–</td>
			<td>22.1.1</td>
			<td>Remplacer par <code>.priorityLevel</code> et <code>.priorityLevel-icon</code>.</td>
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
				<p>Compteur dans un élément de navigation :</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(menu%7ChorizontalNavigation)(-%5B%5Cw-%5D%2B)%3F%5Cs(.*%5Cs)%3F%5C.label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.horizontalNavigation… .label</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(menu%7ChorizontalNavigation)(-%5B%5Cw-%5D%2B)%3F%5Cs(.*%5Cs)%3F%5C.label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.menu… .label</code></a></li>
				</ul>
			</td>
			<td>16.3.0</td>
			<td>–</td>
			<td>Remplacer par <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)form-group(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.form-group</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)form-group(-(line-col%7Clegend%7Clabel%7Ctitle%7Cline))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.form-group-(line-col|legend|…)</code></a></li>
				</ul>
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
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-icon</code></a>
			</td>
			<td>16.5.0</td>
			<td>–</td>
			<td>Retirer la classe : <code>.button</code> applique déjà la taille d’icône.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.disabled</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)error(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)error(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.error</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-link(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-link(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-link</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-outline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-outline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-outline</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)success(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)success(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.success</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>.disabled</code> ⇒<ul>
				<li>sélecteur : <code>.is-disabled</code></li>
				<li>input Angular : <code>disabled</code></li>
				</ul>
				</li>
				<li><code>.(error|loading|success)</code> ⇒<ul>
				<li>sélecteur : <code>.is-*</code></li>
				<li>input Angular : <code>state=&quot;*&quot;</code></li>
				</ul>
				</li>
				<li><code>.mod-link</code> ⇒<ul>
				<li>sélecteur : <code>.mod-ghost</code></li>
				<li>input Angular : <code>luButton=&quot;ghost&quot;</code></li>
				</ul>
				</li>
				<li><code>.mod-outline</code> ⇒<ul>
				<li>sélecteur : <code>.mod-outlined</code></li>
				<li>input Angular : <code>luButton=&quot;outlined&quot;</code></li>
				</ul>
				</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dialog-form(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-form</code></a>
			</td>
			<td>17.3.5</td>
			<td>–</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-textCenter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textCenter</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-textLeft(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textLeft</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-textRight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-textRight</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/alignment-utilities"><strong>Schematic</strong> : alignment-utilities</a>
				<p>Doublon :</p>
				<ul>
				<li><code>.u-text*</code> ⇒ <code>.pr-u-textAlign*</code></li>
				<li><code>*Left</code> ⇒ <code>*Start</code></li>
				<li><code>*Right</code> ⇒ <code>*End</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)breadcrumbs-list-item%20%3E%20a%5C.active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.breadcrumbs-list-item &gt; a.active</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)breadcrumbs-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.breadcrumbs-list-item-action</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)breadcrumbs-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.active</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>–</td>
			<td>Remplacer par <code>.is-active</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-dialog</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-sidePanel(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.loading</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)loading(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-sidePanel(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-sidePanel</code></a></li>
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
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(XL%7CXXL%7CXXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(XL%7CXXL%7CXXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(XL|XXL|XXXL)</code></a>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.mod-L</code>, la plus grande taille de <a href="https://prisme.lucca.io/94310e217/p/56d611-user-tile">User tile</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)indexTable-body-row-cell-action(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-action</code></a>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.indexTable-body-row-cell-link</code>, un véritable lien vers la ligne.</td>
		</tr>
		<tr>
			<td>
				<p>Largeur compacte de <code>.navSide</code>, sur n’importe quel élément de la page</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-withMenuCompact(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-withMenuCompact</code></a></li>
				</ul>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dialog-formOptional(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-formOptional</code></a>
			</td>
			<td>18.3.0</td>
			<td>–</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-content(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-content</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-options(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-options-item(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options-item</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-options-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options-item-action</code></a></li>
				</ul>
			</td>
			<td>19.2.0</td>
			<td>–</td>
			<td>Remplacer par le nouveau DOM du composant <a href="https://prisme.lucca.io/94310e217/p/557682-dropdown">Dropdown</a>.</td>
		</tr>
		<tr>
			<td>
				<p>Espacements : <code>Top</code> ⇒ <code>BlockStart</code>, <code>Right</code> ⇒ <code>InlineEnd</code>, <code>Bottom</code> ⇒ <code>BlockEnd</code>, <code>Left</code> ⇒ <code>InlineStart</code></p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(Top|Right|Bottom|Left)0</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-margin(Top%7CRight%7CBottom%7CLeft)(Auto%7C0%7C25%7C50%7C75%7C100%7C150%7C200%7C250%7C300%7C400%7C500%7C600%7C700%7C800)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-padding(Top%7CRight%7CBottom%7CLeft)(0%7C25%7C50%7C75%7C100%7C150%7C200%7C250%7C300%7C400%7C500%7C600%7C700%7C800)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-margin(Top|Right|Bottom|Left)(Auto|0|25|50|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-margin(Top%7CRight%7CBottom%7CLeft)(Auto%7C0%7C25%7C50%7C75%7C100%7C150%7C200%7C250%7C300%7C400%7C500%7C600%7C700%7C800)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-padding(Top%7CRight%7CBottom%7CLeft)(0%7C25%7C50%7C75%7C100%7C150%7C200%7C250%7C300%7C400%7C500%7C600%7C700%7C800)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(Top%7CRight%7CBottom%7CLeft)0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-padding(Top|Right|Bottom|Left)(0|25|50|75|…)</code></a></li>
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
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pageHeader(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-withMenu(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pageHeader</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pageHeader(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-withMenu(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-withMenu</code></a>
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
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)horizontalNavigation-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(active%7Cdisabled)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.horizontalNavigation-list-item-action</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)horizontalNavigation-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(active%7Cdisabled)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(active|disabled)</code></a>
			</td>
			<td>19.3.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>.active</code> ⇒ <code>.is-active</code></li>
				<li><code>.disabled</code> ⇒ <code>.is-disabled</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-(inset%7Ctop%7Cbottom%7Cleft%7Cright)Reset(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-(inset|top|bottom|left|…)Reset</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<code>*Reset</code> ⇒ <code>*0</code>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-text(Left%7CCenter%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-text(Left|Center|Right)</code></a>
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
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-clear(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-clear</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>Remplacer par <code>.pr-u-clearBoth</code>.</td>
		</tr>
		<tr>
			<td>
				<p>Coins : pas d’utilitaire logique, utiliser les tokens <code>--pr-t-border-radius-*</code></p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(TopLeft%7CTopRight%7CBottomLeft%7CBottomRight)Radius%5BA-Z%5D%5Cw*(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-(textAlign%7Cfloat%7Cclear)(Left%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(TopLeft|TopRight|…)Radius…</code></a></li>
				</ul>
				<p>Alignement, float &amp; clear : <code>Left</code> ⇒ <code>Start</code> / <code>InlineStart</code>, <code>Right</code> ⇒ <code>End</code> / <code>InlineEnd</code></p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-clear(Left%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-clear(Left|Right)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-float(Left%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-float(Left|Right)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textAlign(Left%7CRight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textAlign(Left|Right)</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<p>Utilitaires logiques :</p>
				<ul>
				<li><code>.pr-u-textAlignLeft</code> ⇒ <code>.pr-u-textAlignStart</code></li>
				<li><code>.pr-u-textAlignRight</code> ⇒ <code>.pr-u-textAlignEnd</code></li>
				<li><code>.pr-u-floatLeft</code> ⇒ <code>.pr-u-floatInlineStart</code></li>
				<li><code>.pr-u-floatRight</code> ⇒ <code>.pr-u-floatInlineEnd</code></li>
				<li><code>.pr-u-clearLeft</code> ⇒ <code>.pr-u-clearInlineStart</code></li>
				<li><code>.pr-u-clearRight</code> ⇒ <code>.pr-u-clearInlineEnd</code></li>
				<li>Coins physiques ⇒ tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-text(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-text(XS|S|M|L|…)</code></a>
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
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-h(5%7C6)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-h(5|6)</code></a>
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
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-delete</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-text</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button-group(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-group</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button-group(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-text</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dropdown-list-option-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dropdown-list-option-action</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dropdown-list-option-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-delete</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-options-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-dropdown-options-item-action</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-dropdown-options-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-delete(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-delete</code></a></li>
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
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)%3FRadius(M%7CL%7CXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)RadiusFull(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(StartStart|StartEnd|…)Radius(M|L|XL)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)%3FRadius(M%7CL%7CXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-border(StartStart%7CStartEnd%7CEndStart%7CEndEnd)RadiusFull(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-border(StartStart|StartEnd|…)RadiusFull</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-borderRadius(M%7CL%7CXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-borderRadius(M|L|XL)</code></a></li>
				</ul>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>*Radius(M|L)</code> ⇒ <code>*RadiusDefault</code></li>
				<li><code>*RadiusXL</code> ⇒ <code>*RadiusStructure</code></li>
				<li>Coins ⇒ tokens <code>--pr-t-border-radius-*</code>.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-%5Ba-zA-Z%5D%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-…</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/class-prefix"><strong>Schematic</strong> : class-prefix</a>
				<p><code>.u-*</code> ⇒ <code>.pr-u-*</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés très utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textBrand(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textBrand</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textCritical(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textCritical</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textDefault(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textDefault</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textError(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textError</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textLight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textLight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textNeutral(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textNeutral</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPlaceholder(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPlaceholder</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textProduct(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textProduct</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textSuccess(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textSuccess</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textWarning(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textWarning</code></a></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/color-text"><strong>Schematic</strong> : color-text</a>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
			</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés peu ou pas utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textSuccessContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textWarningContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textBrandContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textNavigation(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPagga(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPoplee(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textCoreHR(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textTimmi(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textCleemy(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textCc(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textKiwi(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textLime(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textCucumber(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textMint(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textGlacier(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textLagoon(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textBlueberry(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textLavender(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textGrape(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textWatermelon(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPumpkin(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPineapple(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-text(Cc|Kiwi|Lime|Mint|…)</code></a></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/color-text"><strong>Schematic</strong> : color-text</a>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)container(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-S(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.container</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)container(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-S(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-S</code></a>
			</td>
			<td>21.1.0</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-S</code>, sans remplacement.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)card(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.card</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)card(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.disabled</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)navSide-item-link(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.navSide-item-link</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)navSide-item-link(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.active</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)navSide-item-subMenu-link(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.navSide-item-subMenu-link</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)navSide-item-subMenu-link(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.active</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)progress(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(error%7Csuccess)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.progress</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)progress(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(error%7Csuccess)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(error|success)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)segmentedControl_panel(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.segmentedControl_panel</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)segmentedControl_panel(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)active(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.active</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)tableOfContent-list-item%20%3E%20a%5C.disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.tableOfContent-list-item &gt; a.disabled</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)tableOfContent-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.tableOfContent-list-item-action</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)tableOfContent-list-item-action(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)disabled(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.disabled</code></a></li>
				</ul>
			</td>
			<td>21.2.0</td>
			<td>–</td>
			<td>
				<ul>
				<li><code>.active</code> ⇒ <code>.is-active</code></li>
				<li><code>.disabled</code> ⇒ <code>.is-disabled</code></li>
				<li><code>.error</code> ⇒ <code>.is-error</code></li>
				<li><code>.success</code> ⇒ <code>.is-success</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés peu ou pas utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPineappleContrasted(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPineappleContrasted</code></a></li>
				</ul>
			</td>
			<td>21.2.4</td>
			<td>–</td>
			<td>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés peu ou pas utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textOrchid(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textOrchid</code></a></li>
				</ul>
			</td>
			<td>21.3.0</td>
			<td>–</td>
			<td>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-neutralBackground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dialog(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-neutralBackground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-neutralBackground</code></a>
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
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dataTable(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-hover(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dataTable</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dataTable(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-hover(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-hover</code></a>
			</td>
			<td>22.0.6</td>
			<td>–</td>
			<td>Retirer la classe <code>.mod-hover</code> et l’input Angular <code>hover</code>, sans remplacement : une ligne sans action ne doit pas avoir d’effet de survol.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)fancyBox-content-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-foreground</code></a>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-background-base(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-background-base</code></a>
			</td>
			<td>17.3.0</td>
			<td>–</td>
			<td>Remplacer par le token <code>--pr-t-elevation-surface-default</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-navSide-fullwidth-palette-alert-(color%7Ctext)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-navSide-fullwidth-palette-alert-(color|text)</code></a>
			</td>
			<td>17.3.2</td>
			<td>–</td>
			<td>Retirer la variable : l’alerte est remplacée par le composant Numeric badge.</td>
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
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-text(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-text</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(%5Cw%2B-)%3Ftext(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-…-text</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<p><code>*text</code> ⇒ <code>*0</code></p>
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
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-font-family(-brand%7C-cursive)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-font-family(-brand|-cursive)</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-typo"><strong>Schematic</strong> : tokens-typo</a>
				<p><code>--commons-*</code> ⇒ <code>--pr-t-*</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<p>Tailles de police et hauteurs de ligne</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-fontSize</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-lineHeight</code></a></li>
				</ul>
				<p>Paddings verticaux, lus uniquement avec <code>$deprecatedSpacings: true</code></p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-((XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)-)%3FverticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-(XS|S|M|L|…)-verticalPadding</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--sizes-verticalPadding(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--sizes-verticalPadding</code></a></li>
				</ul>
			</td>
			<td>20.1.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-typo"><strong>Schematic</strong> : tokens-typo</a>
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
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-fontSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-textField-fontSize</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-lineHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-textField-lineHeight</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-(font-size%7Cline-height)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(callout%7CcalloutFeedbackList%7Cchip%7Ccomment-text%7Cdivider%7CformLabel%7CsortableList-description%7Ctag)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(callout|calloutFeedbackList|…)-fontSize</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-(font-size%7Cline-height)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(callout%7CcalloutFeedbackList%7Cchip%7Ccomment-text%7Cdivider%7CformLabel%7CsortableList-description%7Ctag)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-textField-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(callout|calloutFeedbackList|…)-lineHeight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-font-size(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-button-font-size</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-button-line-height(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-button-line-height</code></a></li>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-borderRadius-(M%7CL%7CXL%7Cfull)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-borderRadius-(M|L|XL|full)</code></a>
			</td>
			<td>20.2.0</td>
			<td>–</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-radius"><strong>Schematic</strong> : tokens-radius</a>
				<p>Avec <code>*</code> = <code>--commons-borderRadius</code> :</p>
				<ul>
				<li><code>*-M</code> ⇒ <code>--pr-t-border-radius-50</code></li>
				<li><code>*-L</code> ⇒ <code>--pr-t-border-radius-100</code></li>
				<li><code>*-XL</code> ⇒ <code>--pr-t-border-radius-150</code></li>
				<li><code>*-full</code> ⇒ <code>--pr-t-border-radius-full</code></li>
				</ul>
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
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-height(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-height</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-maxHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-maxHeight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-minHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-minHeight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-richTextField-resize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-richTextField-resize</code></a></li>
				</ul>
			</td>
			<td>21.2.0</td>
			<td>–</td>
			<td>
				<p><code>--components-richTextField-*</code> ⇒ <br><code>--components-richTextField-content-*</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-background-left(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-background-left</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-background-right(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-background-right</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-foreground</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-imageHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-imageHeight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-imageWidth(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-imageWidth</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-offsetBlock(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-offsetBlock</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fancyBox-offsetInline(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fancyBox-offsetInline</code></a></li>
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
				</ul>
				<p>Images :</p>
				<ul>
				<li>Angular : input de <code>lu-fancy-box</code> :<ul>
				<li><code>*-background-left</code> ⇒ <code>backgroundEndStart</code></li>
				<li><code>*-background-right</code> ⇒ <code>backgroundStartEnd</code></li>
				<li><code>*-foreground</code> ⇒ <code>foregroundStartEnd</code></li>
				</ul>
				</li>
				<li>HTML : SVG dans un enfant de <code>.fancyBox-content</code> :<ul>
				<li><code>*-background-left</code> ⇒ <code>.fancyBox-content-backgroundEndStart</code></li>
				<li><code>*-background-right</code> ⇒ <code>.fancyBox-content-backgroundStartEnd</code></li>
				<li><code>*-foreground</code> ⇒ <code>.fancyBox-content-foregroundStartEnd</code></li>
				</ul>
				</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-font(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-font</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-gap(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-gap</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-icon-color(1%7C2%7C3)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-icon-color(1|2|3)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-priorityLevels-minBlockSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-priorityLevels-minBlockSize</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>22.1.1</td>
			<td>Remplacer par <code>--components-priorityLevel-*</code>.</td>
		</tr>
	</tbody>
</table>
