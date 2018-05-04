import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as LF from '../../src';

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
