import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { debounceTime, distinctUntilChanged, map, merge, ReplaySubject, startWith, throttleTime } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, NgIf, NgFor, ɵLuOptionOutletDirective],
	template: `
		<div class="chips-container">
			<div #chip *ngFor="let option of context.option$ | async" class="chip" [class.mod-unkillable]="disabled" [class]>
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<button *ngIf="!disabled" type="button" class="chip-kill" (click)="unselectOption(option, $event)"></button>
			</div>
		</div>
		<div class="overflow-count-container" #overflow>
			<div class="chip mod-unkillable" *ngIf="hiddenElementsCount$ | async as count">+ {{ count }}</div>
		</div>
	`,
	styleUrls: ['./default-displayer.component.scss'],
})
export class LuMultiSelectDefaultDisplayerComponent<T> implements AfterViewInit {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	get disabled() {
		return this.select.disabled;
	}

	@ViewChildren('chip')
	chipsQL: QueryList<ElementRef<HTMLElement>>;

	@ViewChild('overflow')
	overflowCountContainer: ElementRef<HTMLElement>;

	hiddenElementsCount$ = new ReplaySubject<number>(1);
	resize$ = new ReplaySubject<void>(1);
	maxElementsWidth$ = new ReplaySubject<number>(1);
	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	@HostListener('window:resize')
	protected onResize() {
		this.resize$.next();
	}

	unselectOption(option: T, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(this.select.value.filter((o) => o !== option));
	}

	ngAfterViewInit() {
		const resize$ = this.resize$.pipe(throttleTime(50), startWith(undefined));

		const counterWidth$ = merge(this.hiddenElementsCount$, resize$).pipe(
			debounceTime(0),
			map(() => this.overflowCountContainer.nativeElement.offsetWidth),
			distinctUntilChanged(),
		);

		merge(this.chipsQL.changes, resize$, counterWidth$)
			.pipe(
				debounceTime(0),
				map(() => this.chipsQL.toArray().map((el) => el.nativeElement)),
				map((chips) => {
					const baseOffsetTop = this.elementRef.nativeElement.offsetTop;
					return chips.filter((chip) => chip.offsetTop > baseOffsetTop).length;
				}),
				distinctUntilChanged(),
			)
			.subscribe(this.hiddenElementsCount$);
	}
}
