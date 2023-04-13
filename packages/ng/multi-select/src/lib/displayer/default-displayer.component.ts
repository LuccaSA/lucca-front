import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Observable, ReplaySubject, Subject, combineLatest, concatMap, debounceTime, defer, distinctUntilChanged, map, merge, share, startWith, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective],
	template: `
		<ng-container *ngIf="vm$ | async as vm">
			<div class="chips-container">
				<div
					#chip
					*ngFor="let option of vm.options; let index = index"
					class="chip lu-multiselect-chip"
					[class.mod-unkillable]="disabled"
					[attr.aria-hidden]="index >= vm.chipsByVisibility.visible.length ? 'true' : undefined"
				>
					<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
					<button
						*ngIf="!disabled"
						type="button"
						class="chip-kill lu-multiselect-chip-kill"
						(click)="unselectOption(option, $event)"
						[attr.tabindex]="index >= vm.chipsByVisibility.visible.length ? -1 : undefined"
					></button>
				</div>
			</div>
			<div class="lu-multiselect-counter" #overflow>
				<ng-container *ngIf="vm.chipsByVisibility.hidden.length as count">
					<div class="chip mod-unkillable lu-multiselect-counter-chip" aria-hidden="true" [luTooltip]="intl.showResultsDetails">+ {{ count }}</div>
					<span class="u-mask" [ngPlural]="count">
						<ng-template ngPluralCase="=1">{{ intl.otherResult }}</ng-template>
						<ng-template ngPluralCase="other">{{ intl.otherResults }}</ng-template>
					</span>
				</ng-container>
			</div>
		</ng-container>
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

	private throttledResize$ = this.resize$.pipe(throttleTime(50));

	private counterWidth$ = merge(
		defer(() => this.hiddenElementsCount$),
		this.throttledResize$,
	).pipe(
		debounceTime(0),
		withLatestFrom(defer(() => this.hiddenElementsCount$)),
		map(([, count]) => (count ? this.overflowCountContainer?.nativeElement.offsetWidth || 0 : 0)),
		distinctUntilChanged(),
		share(),
	);

	chipsByVisibility$ = merge(this.chips$, this.throttledResize$, this.counterWidth$).pipe(
		debounceTime(0),
		withLatestFrom(this.chips$),
		map(([, chips]) => {
			const baseOffsetTop = this.elementRef.nativeElement.offsetTop;
			const firstHiddenIndex = chips.findIndex((chip) => chip.offsetTop > baseOffsetTop);

			return firstHiddenIndex !== -1
				? {
						visible: chips.slice(0, firstHiddenIndex),
						hidden: chips.slice(firstHiddenIndex),
				  }
				: {
						visible: chips,
						hidden: [],
				  };
		}),
		takeUntil(this.destroyed$),
		share(),
	);

	hiddenElementsCount$: Observable<number> = this.chipsByVisibility$.pipe(map(({ hidden }) => hidden.length));

	@HostBinding('style.--hidden-option-count-width.px')
	hiddenOptionCountWidthCssVar = 0;

	@HostBinding('style.--hidden-option-count-offset-left.px')
	hiddenOptionCountOffsetLeftCssVar = 0;

	vm$ = combineLatest([this.context.option$, this.chipsByVisibility$]).pipe(
		debounceTime(0),
		map(([options, chipsByVisibility]) => ({
			options,
			chipsByVisibility,
		})),
	);

	@HostListener('window:resize')
	protected onResize() {
		this.resize$.next();
	}

	ngOnInit(): void {
		this.counterWidth$.pipe(takeUntil(this.destroyed$)).subscribe((counterWidth) => {
			this.hiddenOptionCountWidthCssVar = counterWidth;
			this.cdr.markForCheck();
		});

		this.chipsByVisibility$
			.pipe(
				takeUntil(this.destroyed$),
				map(({ visible }) => {
					const lastChip = visible[visible.length - 1];
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
