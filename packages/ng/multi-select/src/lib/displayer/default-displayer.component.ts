import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { combineLatest, debounceTime, defer, distinctUntilChanged, map, merge, Observable, ReplaySubject, startWith, Subject, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
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
export class LuMultiSelectDefaultDisplayerComponent<T> implements AfterViewInit, OnInit, OnDestroy {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	cdr = inject(ChangeDetectorRef);

	destroyed$ = new Subject<void>();

	get disabled() {
		return this.select.disabled;
	}

	@ViewChildren('chip')
	chipsQL: QueryList<ElementRef<HTMLElement>>;

	chips$: Observable<HTMLElement[]> = defer(() =>
		this.chipsQL.changes.pipe(
			startWith(undefined),
			map(() => this.chipsQL.toArray().map((chip) => chip.nativeElement)),
		),
	);

	@ViewChild('overflow')
	overflowCountContainer: ElementRef<HTMLElement>;

	hiddenElementsCount$ = new ReplaySubject<number>(1);
	resize$ = new ReplaySubject<void>(1);
	maxElementsWidth$ = new ReplaySubject<number>(1);
	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	private throttledResize$ = this.resize$.pipe(throttleTime(50), startWith(undefined));
	private counterWidth$ = merge(this.hiddenElementsCount$, this.throttledResize$).pipe(
		debounceTime(0),
		map(() => this.overflowCountContainer.nativeElement.offsetWidth),
		distinctUntilChanged(),
	);

	private lastVisibleChip$ = combineLatest([this.hiddenElementsCount$, this.chips$]).pipe(map(([hiddenElementsCount, chips]) => chips[chips.length - hiddenElementsCount - 1]));

	@HostBinding('style.--hidden-option-count-width.px')
	public hiddenOptionCountWidthCssVar = 0;

	@HostBinding('style.--hidden-option-count-offset-left.px')
	public hiddenOptionCountOffsetLeftCssVar = 0;

	@HostListener('window:resize')
	protected onResize() {
		this.resize$.next();
	}

	ngOnInit(): void {
		this.counterWidth$.pipe(takeUntil(this.destroyed$)).subscribe((counterWidth) => {
			this.hiddenOptionCountWidthCssVar = counterWidth;
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	unselectOption(option: T, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(this.select.value.filter((o) => o !== option));
	}

	ngAfterViewInit() {
		merge(this.chips$, this.throttledResize$, this.counterWidth$)
			.pipe(
				debounceTime(0),
				withLatestFrom(this.chips$),
				map(([, chips]) => {
					const baseOffsetTop = this.elementRef.nativeElement.offsetTop;
					return chips.filter((chip) => chip.offsetTop > baseOffsetTop).length;
				}),
				distinctUntilChanged(),
				takeUntil(this.destroyed$),
			)
			.subscribe(this.hiddenElementsCount$);

		this.lastVisibleChip$
			.pipe(
				map((chip) => (chip ? chip.offsetLeft + chip.offsetWidth : 0)),
				distinctUntilChanged(),
				takeUntil(this.destroyed$),
			)
			.subscribe((offset) => {
				this.hiddenOptionCountOffsetLeftCssVar = offset;
				this.cdr.markForCheck();
			});
	}
}
