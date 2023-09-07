import { AsyncPipe, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	ElementRef,
	HostBinding,
	NgZone,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
	inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Observable, ReplaySubject, combineLatest, concatMap, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';
import { LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS } from './default-displayer.translate';

function fromElementWidth(el: HTMLElement): Observable<number> {
	return new Observable<number>((observer) => {
		// Emit the initial width
		observer.next(el.getBoundingClientRect().width);

		// Emit the new width whenever the element is resized
		const resizeObserver = new ResizeObserver((entries) => observer.next(entries[0].contentRect.width));
		resizeObserver.observe(el);

		// Cleanup observer on cancellation
		return () => resizeObserver.disconnect();
	}).pipe(distinctUntilChanged());
}

@Component({
	selector: 'lu-multi-select-default-displayer',
	standalone: true,
	imports: [AsyncPipe, LuTooltipModule, NgIf, NgFor, NgPlural, NgPluralCase, ɵLuOptionOutletDirective],
	template: `
		<div class="chips-container" #chipsContainer>
			<div
				#chip
				*ngFor="let option of context.option$ | async; let index = index"
				class="chip lu-multiselect-chip"
				[class.mod-unkillable]="disabled"
				[attr.aria-hidden]="index >= ((visibleChipsCount$ | async) || 0) ? 'true' : undefined"
				[title]="index + '-' + (visibleChipsCount$ | async)"
			>
				<ng-container *luOptionOutlet="select.valueTpl || select.optionTpl; value: option"></ng-container>
				<a
					href
					*ngIf="!disabled"
					type="button"
					class="chip-kill"
					(click)="unselectOption(option, $event)"
					[attr.tabindex]="index >= ((visibleChipsCount$ | async) || 0) ? -1 : undefined"
				></a>
			</div>
		</div>
		<div class="lu-multiselect-counter" #overflow>
			<ng-container *ngIf="hiddenChipsCount$ | async as count">
				<div class="chip mod-unkillable lu-multiselect-counter-chip" aria-hidden="true" [luTooltip]="intl.showResultsDetails">+ {{ count }}</div>
				<span class="u-mask" [ngPlural]="count">
					<ng-template ngPluralCase="=1">{{ intl.otherResult }}</ng-template>
					<ng-template ngPluralCase="other">{{ intl.otherResults }}</ng-template>
				</span>
			</ng-container>
		</div>
	`,
	styleUrls: ['./default-displayer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuMultiSelectDefaultDisplayerComponent<T> implements AfterViewInit, OnInit, OnDestroy {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	cdr = inject(ChangeDetectorRef);
	intl = getIntl(LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS);

	protected destroyRef = inject(DestroyRef);
	protected zone = inject(NgZone);

	get disabled() {
		return this.select.disabled;
	}

	@ViewChild('overflow', { static: true })
	overflowCountContainer: ElementRef<HTMLElement>;

	@ViewChild('chipsContainer', { static: true })
	chipsContainer: ElementRef<HTMLElement>;

	@ViewChildren('chip')
	chipsQL: QueryList<ElementRef<HTMLElement>>;

	protected ngAfterViewInit$ = new ReplaySubject<void>(1);

	chips$: Observable<HTMLElement[]> = this.ngAfterViewInit$.pipe(
		concatMap(() => this.chipsQL.changes.pipe(startWith(undefined))),
		map(() => this.chipsQL.toArray().map((chip) => chip.nativeElement)),
	);

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	protected visibleChips$ = new ReplaySubject<HTMLElement[]>(1);
	protected hiddenChips$ = new ReplaySubject<HTMLElement[]>(1);

	visibleChipsCount$ = this.visibleChips$.pipe(
		map((chips) => chips.length),
		distinctUntilChanged(),
	);
	hiddenChipsCount$ = this.hiddenChips$.pipe(
		map((chips) => chips.length),
		distinctUntilChanged(),
	);

	@HostBinding('style.--hidden-option-count-width.px')
	hiddenOptionCountWidthCssVar = 0;

	@HostBinding('style.--hidden-option-count-offset-left.px')
	hiddenOptionCountOffsetLeftCssVar = 0;

	ngOnInit(): void {
		this.visibleChips$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((visible) => {
			this.hiddenOptionCountOffsetLeftCssVar = visible.length ? visible[visible.length - 1].offsetLeft + visible[visible.length - 1].offsetWidth : 0;
			this.cdr.markForCheck();
		});

		this.hiddenChipsCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((hidden) => {
			this.hiddenOptionCountWidthCssVar = hidden;
			this.cdr.markForCheck();
		});

		combineLatest([fromElementWidth(this.chipsContainer.nativeElement), fromElementWidth(this.overflowCountContainer.nativeElement), this.chips$])
			.pipe(
				debounceTime(0),
				map(([containerWidth, counterWidth, chips]) => {
					const baseOffsetTop = this.elementRef.nativeElement.offsetTop;

					const isOutOfContainer = (chip: HTMLElement, allowedWidth: number) => chip.offsetTop > baseOffsetTop || chip.offsetLeft + chip.offsetWidth > allowedWidth;

					const needsCounterSpace = !!chips.length && isOutOfContainer(chips[chips.length - 1], containerWidth);
					const availableWidth = needsCounterSpace ? containerWidth - counterWidth : containerWidth;

					// First on next line or first out of container
					const firstHiddenIndex = chips.findIndex((chip) => isOutOfContainer(chip, availableWidth));

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
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(({ visible, hidden }) => {
				this.zone.run(() => {
					this.visibleChips$.next(visible);
					this.hiddenChips$.next(hidden);
				});
			});
	}

	unselectOption(option: T, $event: Event): void {
		$event.stopPropagation();
		$event.preventDefault();
		this.select.updateValue(this.select.value.filter((o) => o !== option));
	}

	ngOnDestroy(): void {
		this.ngAfterViewInit$.complete();
	}

	ngAfterViewInit() {
		this.ngAfterViewInit$.next();
	}
}
