import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'Lucca front ng demo';

	constructor() {}
}
