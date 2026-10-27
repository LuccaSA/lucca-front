# Propriétés et sélecteurs supprimés

> **Note :** Prisme ne liste plus ces éléments supprimés.
> Le linter les signale toujours pour repérer l’usage résiduel.
> Les éléments encore disponibles figurent dans [Propriétés et sélecteurs dépréciés](life-cycle.md).

<style>
  table {
    inline-size: 100% !important;
    table-layout: fixed !important;
  }

  table thead th:last-of-type {
    inline-size: 42% !important;
  }

  table :is(th, td):is(:nth-child(2), :nth-child(3)) {
    text-align: center !important;
  }

  table :is(th, td) {
    vertical-align: baseline !important;
  }
</style>

## Composants

Sources : [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs) et [LFDeprecatedScss.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedScss.mjs)

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
				<a href="https://prisme.lucca.io/94310e217/p/569078-status">Status</a>, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)status(-dot(-important)%3F%7C-label)%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.status</code></a>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/425d98-status-badge">Status badge</a>.</td>
		</tr>
		<tr>
			<td>Override composants Material, <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)%40lucca-front%5C%2Fng%5C%2Fmaterial%5C%2Fstyle(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>@lucca-front/ng/material/style</code></a></td>
			<td>16.3.0</td>
			<td>18.1.0</td>
			<td>Retirer l’import : ces feuilles de style n’étaient plus actives, des composants LF les remplacent.</td>
		</tr>
		<tr>
			<td>Action icon, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)actionIcon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.actionIcon</code></a></td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/action-icon"><strong>Schematic</strong> : action-icon</a>
				<ul>
				<li>sans bordure : <code>.button.mod-onlyIcon.mod-ghost</code></li>
				<li>avec bordure : <code>.button.mod-onlyIcon.mod-outlined</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>Empty state, <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)emptyState-(title%7Cdescription)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.emptyState-title</code></a></td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>Remplacer par le nouveau composant <a href="https://prisme.lucca.io/94310e217/p/77bb47-empty-state">Empty state</a>.</td>
		</tr>
		<tr>
			<td>Qualification picker, <a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)lu-qualification-select(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>lu-qualification-select</code></a></td>
			<td>17.3.0</td>
			<td>20.1.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/lu-select"><strong>Schematic</strong> : lu-select</a>
				<p>Remplacer par les directives de <a href="https://prisme.lucca.io/94310e217/p/587833-select-simple/b/991e87">Simple</a> et <a href="https://prisme.lucca.io/94310e217/p/927519-select-multiple-new/b/39e067">Multiple Select</a>.</p>
			</td>
		</tr>
		<tr>
			<td>
				User tile
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-info(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-tile(-(title%7Clabel%7Cfootnote))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)picture(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-info</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-info(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-tile(-(title%7Clabel%7Cfootnote))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)picture(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.user-tile</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-info(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)user-tile(-(title%7Clabel%7Cfootnote))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)picture(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.picture</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>
				<ul>
				<li><code>.user-info</code> &amp; <code>.user-tile*</code> ⇒ <a href="https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/00d3d8">User tile</a> : composant Angular ou <a href="https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/771576">classes HTML</a></li>
				<li><code>.picture</code> ⇒ <a href="https://prisme.lucca.io/94310e217/p/42b330-avatar/b/915f82">Avatar</a></li>
				</ul>
			</td>
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
				<p>Colonnes de grille</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)(1|2|3|4|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(xxxs|xxs|xs|s|…)Offset(1|2|3|4|…)</code></a></li>
				</ul>
				<p>Alignements de grille</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(xxxs|xxs|xs|s|…)(Start|Center|End|Top|…)</code></a></li>
				</ul>
				<p>Colonnes de formulaire</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(xxxs|xxs|xs|s|…)(1|2|3|4|…)</code></a></li>
				</ul>
				<p>Tableaux</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-layoutFixed-(xxxs|xxs|xs|s|…)(2|3|4|5|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)((Offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(Start%7CCenter%7CEnd%7CTop%7CMiddle%7CBottom%7CAround%7CBetween)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(stickyColumn-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)%7ClayoutFixed-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)(2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12%7C13%7C14%7C15%7C16%7C17%7C18%7C19%7C20))(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-stickyColumn-(xxxs|xxs|xs|s|…)</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>15.1.0</td>
			<td>Écrire le point de rupture en majuscules (<code>l</code> ⇒ <code>L</code>), puis appliquer les dépréciations suivantes du composant.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)textfield-actionClear(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.textfield-actionClear</code></a>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/80fb2d-clear">Clear</a>. <a href="https://prisme.lucca.io/94310e217/p/55f101-text-field-deprecated/t/page-55f101-47914164-17">Voir l’exemple</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-counter</code></a>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>Inutile depuis le composant <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a>. <a href="https://prisme.lucca.io/94310e217/p/098404-button/t/page-098404-82776006-50af19-6">Voir l’exemple</a>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button-counter(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button-counter</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)lu-select-value%20%5C.label(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.lu-select-value .label</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)navSide-item-alert(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.navSide-item-alert</code></a></li>
				</ul>
			</td>
			<td>16.2.0</td>
			<td>18.1.0</td>
			<td>
				<ul>
				<li><code>.button-counter</code> ⇒ <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a></li>
				<li><code>.navSide-item-alert</code> ⇒ <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a> ou <a href="https://prisme.lucca.io/94310e217/p/36bcdf-new-badge">New badge</a></li>
				<li><code>.lu-select-value .label</code> ⇒ <a href="https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge">Numeric badge</a> ou le sous-composant dédié de Select Multiple</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)callout(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-tiny(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.callout</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)callout(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-tiny(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-tiny</code></a>
			</td>
			<td>16.5.0</td>
			<td>18.1.0</td>
			<td>Remplacer par le composant <a href="https://prisme.lucca.io/94310e217/p/64c8d8-callout">Callout popover</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)dialog-formOptionnal(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.dialog-formOptionnal</code></a>
			</td>
			<td>–</td>
			<td>18.2.0</td>
			<td>Remplacer par la classe unique <code>.dialog-inside-formOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<p>Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (<code>.grid-6\@mediaMinS</code>)</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-(1|2|3|4|…)\@mediaMin…</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid-offset(1|2|3|4|…)\@mediaMin…</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid\@mediaMin…</code></a></li>
				</ul>
				<p>Mods de l’ancienne grille, combinés à <code>.grid</code></p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid</code></a> <strong>+</strong> <a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(start|center|end|top|…)\@mediaMin…</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-reverse(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.grid</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-reverse(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-reverse</code></a></li>
				</ul>
				<p>Utilitaires de placement de l’ancienne grille</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(-(offset)%3F(1%7C2%7C3%7C4%7C5%7C6%7C7%7C8%7C9%7C10%7C11%7C12))%3F%5C%5C%3F%40mediaMin%2F%20OR%20(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)grid(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(reverse%7C(start%7Ccenter%7Cend%7Ctop%7Cmiddle%7Cbottom%7Caround%7Cbetween)%5C%5C%3F%40mediaMin%5Cw*)(%5B%5E%5Cw-%5D%7C%24)%2F)%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-(first%7Clast)%5C%5C%3F%40mediaMin%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(first|last)\@mediaMin…</code></a></li>
				</ul>
			</td>
			<td>16.2.0</td>
			<td>19.1.0</td>
			<td>Remplacer par le nouveau composant <a href="https://prisme.lucca.io/94310e217/p/955d69-grid">Grid</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-elevate%5B1-6%5D(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-elevate(1|2|3|4|…)</code></a>
			</td>
			<td>16.2.0</td>
			<td>19.1.0</td>
			<td>Remplacer par les tokens <a href="https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449">elevations</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.button</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)button(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-icon</code></a>
			</td>
			<td>17.2.0</td>
			<td>19.1.0</td>
			<td>Remplacer par <code>.mod-withIcon</code>, pour éviter la confusion avec <code>.mod-onlyIcon</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-comma(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-comma</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-unit(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-unit</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>
				<ul>
				<li><code>.u-comma</code> ⇒ virgules dans le HTML, pour l’accessibilité</li>
				<li><code>.u-unit</code> ⇒ aucun remplacement, à reprendre côté produit si nécessaire</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(margin|padding)(Auto|0|XXS|XS|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(margin|padding)(Inline|Block)(Auto|XXS|XS|S|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-(margin|padding)(Top|Right|Bottom|Left)(Auto|0|XXS|XS|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-columnGap(0|XXS|XS|S|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-gap(0|XXS|XS|S|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-rowGap(0|XXS|XS|S|…)</code></a></li>
				</ul>
				<p>Utilitaires de bordure nulle : <code>.u-</code> supprimés avec les utilitaires t-shirt, <code>.pr-u-</code> toujours présents</p>
				<ul>
				<li><a href="https://github.com/search?q=(%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-((margin%7Cpadding)(Top%7CRight%7CBottom%7CLeft)%3F(Auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(margin%7Cpadding)(Inline%7CBlock)(Auto%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)%7C(columnGap%7CrowGap%7Cgap)(0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL))(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border(Top%7CRight%7CBottom%7CLeft%7CInline%7CBlock)%3F0(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-border(Top|Right|Bottom|Left|…)0</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-border0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-border0</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-spacing"><strong>Schematic</strong> : tokens-spacings</a>
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
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(prev%7Cnext)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.calendarWrapper-navigation</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)calendarWrapper-navigation(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-(prev%7Cnext)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-(prev|next)</code></a>
			</td>
			<td>–</td>
			<td>19.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)menu-containerOptionnal(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.menu-containerOptionnal</code></a>
			</td>
			<td>–</td>
			<td>19.3.0</td>
			<td>Remplacer par <code>.horizontalNavigation-containerOptional</code> du composant <a href="https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation">Horizontal navigation</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-columnSticky-shadowMask(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.table-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)table-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-columnSticky-shadowMask(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-columnSticky-shadowMask</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>.mod-stickyColumn-shadowMask</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell-sortableButton(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell-sortableButton</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell-sortableButton-arrows-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell-sortableButton-arrows-ascending</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell-sortableButton-arrows-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell-sortableButton-arrows-descending</code></a></li>
				</ul>
				<p>Toute combinaison de la cellule d’en-tête avec un modificateur ou un état de tri</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)is-sorted-ascending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-ascending</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)is-sorted-descending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.is-sorted-descending</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-sortable(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-sortable</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)sortedAscending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedAscending</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(indexT|t)able-head-row-cell</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(indexT%7Ct)able-head-row-cell(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)sortedDescending(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.sortedDescending</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par le sous-composant tableSortable commun à <a href="https://prisme.lucca.io/94310e217/p/75b1ea-table/t/page-75b1ea-67463914-5">Table</a> et <a href="https://prisme.lucca.io/94310e217/p/24fc14-index-table-new/t/page-24fc14-90701228-74b8e8-3">Index table</a>.</td>
		</tr>
		<tr>
			<td>
				<p>Toute combinaison de <code>.userTile</code> avec <code>.mod-nameOnly</code></p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-nameOnly(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userTile</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)userTile(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-nameOnly(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-nameOnly</code></a></li>
				</ul>
				<p>Initiales de User picture</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)userPicture-initials(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.userPicture-initials</code></a></li>
				</ul>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)comment-content-textContainer(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.comment-content-textContainer</code></a>
			</td>
			<td>18.3.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>.comment-content-textContainerOptional</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)filterBar-scrollBox-(first%7Clast)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterBar-scrollBox-(first|last)</code></a>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)indexTable-body-row-cell-subAction(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-subAction</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)indexTable-body-row-cell-subActionDropdownTrigger(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.indexTable-body-row-cell-subActionDropdownTrigger</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>–</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)u-text(XS%7CS%7CM%7CL%7CXL%7CXXL%7CXXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.u-text(XS|S|M|L|…)</code></a>
			</td>
			<td>20.1.0</td>
			<td>20.2.0</td>
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
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)fancyBox-content-box(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-box</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)fancyBox-content-box-foreground(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.fancyBox-content-box-foreground</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>
				<ul>
				<li><code>.fancyBox-content-box</code> ⇒ <code>.fancyBox-content</code></li>
				<li><code>.fancyBox-content-box-foreground</code> ⇒ <code>.fancyBox-content-foreground</code>, elle-même dépréciée en 22.1.0</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)calloutPopover-overlay-head-icon(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.calloutPopover-overlay-head-icon</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par <code>.calloutPopover-overlay-icon</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)multipleSelect-displayer-numericBadge(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.multipleSelect-displayer-numericBadge</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par le composant <code>lu-chip</code>, utilisé par le displayer depuis la 21.0.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)richTextField-toolbar-chips-item(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.richTextField-toolbar-chips-item</code></a>
			</td>
			<td>–</td>
			<td>21.0.0</td>
			<td>Remplacer par <code>.richTextField-toolbar-chips-chip</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)icon-color-primary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.icon-color-primary</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)icon-color-secondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.icon-color-secondary</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>21.1.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<p>Remplacer par <code>.icon-color-product</code>.</p>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pagination(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-mods(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pagination</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pagination(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-mods(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-mods</code></a>
			</td>
			<td>–</td>
			<td>21.1.4</td>
			<td>Remplacer par <code>.mod-compact</code>.</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés peu ou pas utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textAI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textAI</code></a></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>21.3.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/color-text"><strong>Schematic</strong> : color-text</a>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)palette-AI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-AI</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-colorTextAI(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorTextAI</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<ul>
				<li><code>.palette-AI</code> ⇒ <code>.palette-orchid</code></li>
				<li><code>.pr-u-colorTextAI</code> ⇒ <code>.pr-u-colorTextOrchid</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)filterPill-combobox(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.filterPill-combobox</code></a>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>Remplacer par <code>.filterPill-value</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)palette-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-grey</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)palette-lucca(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-lucca</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)palette-primary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-primary</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)palette-secondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.palette-secondary</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<ul>
				<li><code>*-grey</code> ⇒ <code>*-neutral</code></li>
				<li><code>*-(primary|secondary)</code> ⇒ <code>*-product</code></li>
				<li><code>*-lucca</code> ⇒ <code>*-brand</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<p>Toute combinaison de <code>.box</code>, <code>.card</code> ou <code>.section</code> avec <code>.mod-grey</code></p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(box%7Ccard%7Csection)(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.(box|card|…)</code></a> <strong>+</strong> <a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)(box%7Ccard%7Csection)(%5B%5E%5Cw-%5D%7C%24)%2F%20AND%20%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)mod-grey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.mod-grey</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<p>Remplacer par <code>.mod-neutral</code>.</p>
			</td>
		</tr>
		<tr>
			<td>
				<p>Utilitaires renommés très utilisés</p>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textGrey(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textGrey</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textLucca(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textLucca</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textPrimary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textPrimary</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-textSecondary(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-textSecondary</code></a></li>
				</ul>
			</td>
			<td>21.0.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/color-text"><strong>Schematic</strong> : color-text</a>
				<p>Remplacer par les <a href="https://prisme.lucca.io/94310e217/p/21a286-utilitaires">nouvelles classes</a> liées aux tokens (<code>.pr-u-color</code>…)</p>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-colorText(Grey%7CLucca%7CPrimary%7CSecondary)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-colorText(Grey|Lucca|…)</code></a>
			</td>
			<td>21.0.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<ul>
				<li><code>*Grey</code> ⇒<ul>
				<li>neutre : <code>*Neutral</code></li>
				<li>défaut : <code>*</code></li>
				</ul>
				</li>
				<li><code>*(Primary|Secondary)</code> ⇒ <code>*Product</code></li>
				<li><code>*Lucca</code> ⇒ <code>*Brand</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)pr-u-(margin%7Cpadding%7Cinset)(Inline%7CBlock)-(start%7Cend)0(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.pr-u-(margin|padding|…)(Inline|Block)-(start|end)0</code></a>
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
				<a href="https://github.com/search?q=%2F(%5C.%7Cclass%3D%22(%5B%5E%22%5D*%5Cs)%3F)activityFeed-content-update-(after%7Cbefore%7Cicon)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>.activityFeed-content-update-(after|before|icon)</code></a>
			</td>
			<td>–</td>
			<td>22.0.0</td>
			<td>Remplacer par <code>.activityFeed-content-update-item-(after|before|icon)</code>.</td>
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
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--breakpoints-(xxxs|xxs|xs|s|…)-breakAt</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-box-shadow-(hard|xxs|xs|s|…)</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--breakpoints-(xxxs%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl%7Cxxxl)-breakAt(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-box-shadow-(hard%7Cxxs%7Cxs%7Cs%7Cm%7Cl%7Cxl%7Cxxl)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(reset%7Csmallest%7Csmaller%7Csmall%7Cstandard%7Cbig%7Cbigger%7Cbiggest)(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--spacings-(reset|smallest|…)</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>15.1.0</td>
			<td>
				<ul>
				<li><code>--breakpoints-*-breakAt</code> ⇒ point de rupture en majuscules (<code>l</code> ⇒ <code>L</code>)</li>
				<li><code>--commons-box-shadow-*</code> ⇒ <code>--commons-boxShadow-*</code> en majuscules</li>
				<li><code>--commons-box-shadow-hard</code> ⇒ <code>--commons-boxShadow-XXS</code></li>
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
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-XXS(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-XXS</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-elevations-elevation-%5B1-6%5D(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-XXS(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-elevations-elevation-(1|2|3|4|…)</code></a></li>
				</ul>
			</td>
			<td>16.1.0</td>
			<td>19.1.0</td>
			<td>Remplacer par les tokens <a href="https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449">elevations</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--commons-boxShadow-(XXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--commons-boxShadow-(XXS|XS|S|M|…)</code></a>
			</td>
			<td>17.3.0</td>
			<td>19.1.0</td>
			<td>Remplacer par les tokens <a href="https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449">elevations</a>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--spacings-(auto%7C0%7CXXS%7CXS%7CS%7CM%7CL%7CXL%7CXXL)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--spacings-(auto|0|XXS|XS|…)</code></a>
			</td>
			<td>17.4.0</td>
			<td>19.1.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/tokens-spacing"><strong>Schematic</strong> : tokens-spacings</a>
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
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-fontSize(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-switchField-label-fontSize</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-lineHeight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--component-switchField-label-lineHeight</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(inlineMessage%7CsimpleSelect%7CmultiSelect%7CsegmentedControl%7Ctimepicker%7CsortableList-helper)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-horizontalNavigation-listItemAction(FontSize%7CLineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-title-weight(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(timepicker|multiSelect|…)-fontSize</code></a></li>
				<li><a href="https://github.com/search?q=(%2F(%5E%7C%5B%5E%5Cw-%5D)--components-(inlineMessage%7CsimpleSelect%7CmultiSelect%7CsegmentedControl%7Ctimepicker%7CsortableList-helper)-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--component-switchField-label-(fontSize%7ClineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-horizontalNavigation-listItemAction(FontSize%7CLineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20OR%20%2F(%5E%7C%5B%5E%5Cw-%5D)--components-title-weight(%5B%5E%5Cw-%5D%7C%24)%2F)%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-(timepicker|multiSelect|…)-lineHeight</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-horizontalNavigation-listItemAction(FontSize%7CLineHeight)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-horizontalNavigation-listItemAction(FontSize|LineHeight)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-title-weight(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-title-weight</code></a></li>
				</ul>
			</td>
			<td>–</td>
			<td>20.1.0</td>
			<td>
				<ul>
				<li><code>*-(fontSize|lineHeight|weight)</code> ⇒ <code>*-font</code></li>
				<li><code>*(FontSize|LineHeight)</code> ⇒ <code>*Font</code></li>
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
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-box-border-radius(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-box-border-radius</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-fileEntry-status-borderRadius(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-fileEntry-status-borderRadius</code></a></li>
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
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-(max-height%7Cmax-width%7Cmin-width%7Coption-action(Background%7CColor%7CEvents)%7CoptionColor)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-option-action(Background|Color|…)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-dropdown-optionColor(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-dropdown-optionColor</code></a></li>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-paddingInput-(block%7Cinline)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-paddingInput-(block|inline)</code></a>
			</td>
			<td>–</td>
			<td>21.1.0</td>
			<td>Remplacer par <code>--components-timepicker-input-padding-(block|inline)</code>.</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--background-(left%7Cright)-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--background-(left|right)-01</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--foreground-(left%7Cright)-01(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--foreground-(left|right)-01</code></a></li>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-AI-(500%7C600)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-AI-(500|600)</code></a>
			</td>
			<td>–</td>
			<td>21.3.0</td>
			<td>
				<p>Avec <code>*</code> = 50-900 :</p>
				<ul>
				<li>couleur : <code>--palettes-orchid-*</code></li>
				<li>dégradé : <code>--palettes-ai-*</code></li>
				</ul>
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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--components-timepicker-display-padding-(block%7Cinline)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--components-timepicker-display-padding-(block|inline)</code></a>
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
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-grey-(0|text|25|50|…)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-lucca-(0|text|25|50|…)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-primary-(0|text|25|50|…)</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--palettes-(grey%7Cprimary%7Csecondary%7Clucca)-(0%7Ctext%7C25%7C50%7C100%7C200%7C300%7C400%7C500%7C600%7C700%7C800%7C900)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--palettes-secondary-(0|text|25|50|…)</code></a></li>
				</ul>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<ul>
				<li><code>*-grey-*</code> ⇒ <code>*-neutral-*</code></li>
				<li><code>*-(primary|secondary)-*</code> ⇒ <code>*-product-*</code></li>
				<li><code>*-lucca-*</code> ⇒ <code>*-brand-*</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-grey-900-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-grey-900-rgb</code></a>
			</td>
			<td>17.3.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
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
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<ul>
				<li>Sass : <code>color.transparentize(var(--palettes-neutral-400), …)</code></li>
				<li>CSS : <code>color-mix()</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<ul>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-neutral-(400%7C900)-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-neutral-(400|900)-rgb</code></a></li>
				<li><a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-white-rgb(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-white-rgb</code></a></li>
				</ul>
			</td>
			<td>17.4.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<p>Avec <code>*</code> = nuance d&#39;origine (<code>0</code> pour <code>white</code>) :</p>
				<ul>
				<li>Sass : <code>color.transparentize(var(--palettes-neutral-*), …)</code></li>
				<li>CSS : <code>color-mix()</code></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)--colors-(black%7Cwhite)-color(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>--colors-(black|white)-color</code></a>
			</td>
			<td>18.2.0</td>
			<td>22.0.0</td>
			<td>
				<a href="https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/palettes"><strong>Schematic</strong> : palettes</a>
				<ul>
				<li><code>--colors-white-color</code> ⇒<ul>
				<li>couleur : <code>--palettes-neutral-0</code></li>
				<li>surface : <code>--pr-t-elevation-surface-raised</code></li>
				</ul>
				</li>
				<li><code>--colors-black-color</code> ⇒ <code>--palettes-neutral-900</code></li>
				</ul>
			</td>
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
	</tbody>
</table>

## Mixins

Source : [LFDeprecatedScss.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedScss.mjs)

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
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userTileStyle(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>userTileStyle</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>@forward &#39;@lucca-front/scss/src/components/userTile&#39;</code>.</td>
		</tr>
		<tr>
			<td>
				<a href="https://github.com/search?q=%2F(%5E%7C%5B%5E%5Cw-%5D)userPicture(Style%7CVars)(%5B%5E%5Cw-%5D%7C%24)%2F%20org%3ALuccaSA%20NOT%20repo%3ALuccaSA%2Flucca-front&amp;type=code"><code>userPicture(Style|Vars)</code></a>
			</td>
			<td>18.2.0</td>
			<td>20.1.0</td>
			<td>Remplacer par <code>@forward &#39;@lucca-front/scss/src/components/avatar&#39;</code>.</td>
		</tr>
	</tbody>
</table>
