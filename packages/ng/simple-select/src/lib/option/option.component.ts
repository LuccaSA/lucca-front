import { Highlightable } from '@angular/cdk/a11y';
import { AsyncPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, inject, Injector, Input, OnDestroy, OnInit, TemplateRef, Type } from '@angular/core';
import { asyncScheduler, BehaviorSubject, observeOn, Subscription } from 'rxjs';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { ILuOptionContext, LU_OPTION_CONTEXT, optionContextFactory } from './option.token';

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, NgComponentOutlet, NgTemplateOutlet],
	providers: [{ provide: LU_OPTION_CONTEXT, useFactory: optionContextFactory }],
})
export class LuOptionComponent<T> implements Highlightable, OnInit, OnDestroy {
	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public set optionTplOrType(tplOrType: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined) {
		this.optionTpl = tplOrType && (tplOrType instanceof TemplateRef ? tplOrType : undefined);
		this.optionType = tplOrType && (tplOrType instanceof TemplateRef ? undefined : tplOrType);
	}

	public optionTpl?: TemplateRef<LuOptionContext<T>>;
	public optionType?: Type<unknown>;

	@Input()
	@HostBinding('attr.aria-selected')
	isSelected = false;
	public get option(): T {
		return this.optionContext.option$.value;
	}

	@Input()
	public set option(value: T) {
		this.optionContext.option$.next(value);
	}

	@Input()
	public optionIndex = 0;

	isHighlighted$ = new BehaviorSubject(false);

	/**
	 * Whether option is disabled. Used by ListKeyManager.
	 */
	disabled = false;

	private optionContext = inject<ILuOptionContext<T>>(LU_OPTION_CONTEXT);
	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	@HostBinding('attr.role')
	public role = 'option';

	@HostBinding('attr.id')
	public get id(): string {
		return `lu-select-${this.selectId}-option-${this.optionIndex}`;
	}

	constructor(protected elementRef: ElementRef<HTMLElement>, @Inject(SELECT_ID) protected selectId: number, public injector: Injector) {}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	setActiveStyles(): void {
		this.isHighlighted$.next(true);
		this.elementRef.nativeElement.scrollIntoView({ block: 'center' });
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
