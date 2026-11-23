import { Component } from '@angular/core';

@Component({
	selector: 'app-tabs',
	template: `
		<header class="pageHeader" [class.mod-withHorizontalNavigation]="tabs.length">
			<h1 class="pageHeader-title">Title</h1>
		</header>
		<nav class="horizontalNavigation mod-S">
			<ul class="horizontalNavigation-list">
				@for (tab of tabs; track tab) {
					<li class="horizontalNavigation-list-item">
						<button type="button" class="horizontalNavigation-list-item-action" [class.is-active]="tab === current">{{ tab }}</button>
					</li>
				}
			</ul>
		</nav>
	`,
})
export class TabsComponent {
	tabs = ['a', 'b'];
	current = 'a';
	actionClass = 'horizontalNavigation-list-item-action';
}
