import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-basic-user-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class BasicComponent {
	user = { firstName: 'John', lastName: 'Doe' };
	users = [];
}
