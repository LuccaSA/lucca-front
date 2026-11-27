import { Component } from '@angular/core';

@Component({
	selector: 'app-first',
	template: `<table class="indexTable"><tr><td>–</td></tr></table>`,
})
export class FirstComponent {}

@Component({
	selector: 'app-second',
	template: `<p>Second</p>`,
})
export class SecondComponent {}
