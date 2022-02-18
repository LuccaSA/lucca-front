import { Component } from '@angular/core';
import { ALuSidepanelRef, ILuSidepanelContent, LuSidepanel } from '@lucca-front/ng/sidepanel';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
@Component({
	selector: 'lu-sidepanel',
	templateUrl: './sidepanel.component.html',
})
export class SidepanelComponent {
	result$ = new Subject();
	constructor(private _luSidepanel: LuSidepanel) {}
	open() {
		this._luSidepanel.open(PocSidepanelInsideComponent).onClose.subscribe((r) => this.result$.next(r));
	}
}
@Component({
	selector: 'lu-sidepanel-inside',
	template: `
		<p>only the content in this injected component</p>
		<label class="label">{{ error }}</label>
		<div class="textfield">
			<input class="textfield-input" type="number" [(ngModel)]="result" />
			<label class="textfield-label">result</label>
		</div>
		<div class="checkbox">
			<input class="checkbox-input" type="checkbox" name="checkbox" id="checkbox" [(ngModel)]="submitDisabled" />
			<label class="checkbox-label" for="checkbox">disable submit</label>
		</div>
	`,
})
export class PocSidepanelInsideComponent implements ILuSidepanelContent {
	title = 'title of the component';
	submitLabel = 'submit';
	cancelLabel = 'dismiss';
	submitDisabled = false;
	submitPalette = 'error';
	result = 0;
	error;
	// submitAction = () => timer(1500).pipe(mapTo(this.result));
	submitAction = () => {
		let obs$: Observable<number>;
		if (this.result % 2 === 0) {
			obs$ = throwError(`error with result ${this.result}`);
		} else {
			obs$ = of(this.result).pipe(delay(2000));
		}

		return obs$.pipe(
			catchError((err) => {
				this.error = err as unknown;
				return throwError(`error message`);
			}),
		);
	};

	constructor(protected _ref: ALuSidepanelRef<PocSidepanelInsideComponent>) {}

	closeModal() {
		this._ref.close();
	}
}
