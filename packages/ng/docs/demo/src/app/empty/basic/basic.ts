import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'demo-empty-basic',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
	val = 'lol';
}
