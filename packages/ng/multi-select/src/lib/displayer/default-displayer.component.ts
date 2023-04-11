import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Observable, ReplaySubject, Subject, combineLatest, concatMap, debounceTime, defer, distinctUntilChanged, map, merge, startWith, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective],
	template: `
		<div class="chips-container" *ngIf="{ options: context.option$ | async, visibleChips: (visibleChips$ | async) || [] } as vm">
			<div
				#chip
				*ngFor="let option of vm.options; let index = index"
				class="chip lu-multiselect-chip"
				[class.mod-unkillable]="disabled"
				[attr.aria-hidden]="index >= vm.visibleChips.length ? 'true' : undefined"
			>
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<button
					*ngIf="!disabled"
					type="button"
					class="chip-kill lu-multiselect-chip-kill"
					(click)="unselectOption(option, $event)"
					[attr.tabindex]="index >= vm.visibleChips.length ? -1 : undefined"
				></button>
			</div>
		</div>
		<div class="lu-multiselect-counter" #overflow>
			<ng-container *ngIf="hiddenElementsCount$ | async as count">
				<div class="chip mod-unkillable lu-multiselect-counter-chip" aria-hidden="true" [luTooltip]="intl.showResultsDetails">+ {{ count }}</div>
				<span class="u-mask" [ngPlural]="count">
					<ng-template ngPluralCase="=1">{{ intl.otherResult }}</ng-template>
					<ng-template ngPluralCase="other">{{ intl.otherResults }}</ng-template>
				</span>
			</ng-container>
		</div>
	`,
	styleUrls: ['./default-displayer.component.scss'],
})
export class LuMultiSelectDefaultDisplayerComponent<T> implements AfterViewInit, OnInit, OnDestroy {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	cdr = inject(ChangeDetectorRef);
	intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);

	destroyed$ = new Subject<void>();

	get disabled() {
		return this.select.disabled;
	}

	@ViewChildren('chip')
	chipsQL: QueryList<ElementRef<HTMLElement>>;

	protected ngAfterViewInit$ = new ReplaySubject<void>(1);

	chips$: Observable<HTMLElement[]> = this.ngAfterViewInit$.pipe(
		concatMap(() => this.chipsQL.changes.pipe(startWith(undefined))),
		map(() => this.chipsQL.toArray().map((chip) => chip.nativeElement)),
	);

	@ViewChild('overflow')
	overflowCountContainer: ElementRef<HTMLElement>;

	resize$ = new ReplaySubject<void>(1);
	maxElementsWidth$ = new ReplaySubject<number>(1);
	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	private throttledResize$ = this.resize$.pipe(throttleTime(50), startWith(undefined));

	private counterWidth$ = merge(
		defer(() => this.hiddenElementsCount$),
		this.throttledResize$,
	).pipe(
		debounceTime(0),
		map(() => this.overflowCountContainer.nativeElement.offsetWidth),
		distinctUntilChanged(),
	);

	visibleChips$ = merge(this.chips$, this.throttledResize$, this.counterWidth$).pipe(
		debounceTime(0),
		withLatestFrom(this.chips$),
		map(([, chips]) => {
			const baseOffsetTop = this.elementRef.nativeElement.offsetTop;
			return chips.filter((chip) => chip.offsetTop <= baseOffsetTop);
		}),
		distinctUntilChanged((previous, current) => previous.length === current.length && previous.every((chip, index) => chip === current[index])),
		takeUntil(this.destroyed$),
	);

	hiddenElementsCount$: Observable<number> = combineLatest([this.chips$, this.visibleChips$]).pipe(map(([chips, visbleChips]) => chips.length - visbleChips.length));

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

		this.visibleChips$
			.pipe(
				takeUntil(this.destroyed$),
				map((chips) => {
					const lastChip = chips[chips.length - 1];
					return lastChip ? lastChip.offsetLeft + lastChip.offsetWidth : 0;
				}),
				distinctUntilChanged(),
			)
			.subscribe((offset) => {
				this.hiddenOptionCountOffsetLeftCssVar = offset;
				this.cdr.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
		this.ngAfterViewInit$.complete();
	}

	unselectOption(option: T, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(this.select.value.filter((o) => o !== option));
	}

	ngAfterViewInit() {
		this.ngAfterViewInit$.next();
	}
}
