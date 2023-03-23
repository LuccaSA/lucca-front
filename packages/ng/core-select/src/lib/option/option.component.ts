import { Highlightable } from '@angular/cdk/a11y';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, inject, Input, OnDestroy, TemplateRef, Type, ViewChild } from '@angular/core';
import { asyncScheduler, BehaviorSubject, observeOn, Subscription } from 'rxjs';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, LuOptionOutletDirective],
})
export class LuOptionComponent<T> implements Highlightable, AfterViewInit, OnDestroy {
	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined;

	@Input()
	@HostBinding('attr.aria-selected')
	isSelected = false;

	@Input() option?: T;

	@Input()
	public optionIndex = 0;

	@Input()
	scrollIntoViewOptions: ScrollIntoViewOptions = {};

	isHighlighted$ = new BehaviorSubject(false);

	/**
	 * Whether option is disabled. Used by ListKeyManager.
	 */
	disabled = false;

	@ViewChild(LuOptionOutletDirective, { read: LU_OPTION_CONTEXT, static: true })
	private optionContext?: ILuOptionContext<T>;

	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	@HostBinding('attr.role')
	public role = 'option';

	@HostBinding('attr.id')
	public get id(): string {
		return `lu-select-${this.selectId}-option-${this.optionIndex}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	setActiveStyles(): void {
		this.isHighlighted$.next(true);
		this.elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
	}

	setInactiveStyles(): void {
		this.isHighlighted$.next(false);
	}

	selectOption($event: Event): void {
		if (this.disabled) {
			$event.stopPropagation();
		}
	}
}
