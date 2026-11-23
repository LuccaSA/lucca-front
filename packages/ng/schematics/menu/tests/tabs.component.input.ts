import { Component } from '@angular/core';

@Component({
	selector: 'app-tabs',
	template: `
		<header class="pageHeader" [class.mod-withMenu]="tabs.length">
			<h1 class="pageHeader-title">Title</h1>
		</header>
		<nav class="menu mod-S">
			<ul class="menu-list">
				@for (tab of tabs; track tab) {
					<li class="menu-list-item">
						<button type="button" class="menu-list-item-action" [class.is-active]="tab === current">{{ tab }}</button>
					</li>
				}
			</ul>
		</nav>
	`,
})
export class TabsComponent {
	tabs = ['a', 'b'];
	current = 'a';
	actionClass = 'menu-list-item-action';
}
