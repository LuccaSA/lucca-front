import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'parameters',
	templateUrl: './parameters.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametersComponent {
	number = 3.141592;
	precision = 2;
}
