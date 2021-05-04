import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'lu-refacto-tooltip',
	templateUrl: './refacto-tooltip.component.html'
})
export class RefactoTooltipComponent implements OnInit, OnDestroy {
	private _subs = new Subscription();
	display = true;
	interval$ = interval(2000);
	ngOnInit() {
		const sub = this.interval$.pipe(
			delay(300),
		)
		.subscribe(() => this.display = !this.display);
		this._subs.add(sub)
	}
	ngOnDestroy() {
		this._subs.unsubscribe();
	}
}
