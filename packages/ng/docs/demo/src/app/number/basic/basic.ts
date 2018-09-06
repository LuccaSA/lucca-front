import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'basic',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
	number = 0;
	pi = 3.141592;
	ten = 10;
	e = 2.71727;
}
