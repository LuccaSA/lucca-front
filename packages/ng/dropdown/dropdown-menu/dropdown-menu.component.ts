import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrl: './dropdown-menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class DropdownMenuComponent {}
