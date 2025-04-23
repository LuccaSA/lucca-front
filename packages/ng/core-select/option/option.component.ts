import { AsyncPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, HostBinding, inject, Input, input, OnDestroy, TemplateRef, Type, ViewChild } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { asyncScheduler, observeOn, Subscription } from 'rxjs';
import { GroupTemplateLocation } from '../panel/panel.utils';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LuOptionGrouping } from './group.directive';
import { LuOptionGroupPipe } from './group.pipe';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';
import { CoreSelectPanelElement } from '../panel/selectable-item';

export const MAGIC_OPTION_SCROLL_DELAY = 15;

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [LuOptionOutletDirective, NgIf, PortalDirective, LuOptionGroupPipe],
})
export class LuOptionComponent<T> implements AfterViewInit, OnDestroy {
	protected selectableItem = inject(CoreSelectPanelElement);

	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined;

	@Input() option?: T;
	@Input() grouping?: LuOptionGrouping<T, unknown>;

	groupIndex = input<number>();

	@Input()
	public optionIndex = 0;

	@Input()
	scrollIntoViewOptions: ScrollIntoViewOptions = {};

	groupTemplateLocation = input<GroupTemplateLocation>();

	/**
	 * Whether option is disabled. Used by ListKeyManager.
	 */
	disabled = false;

	@ViewChild(LuOptionOutletDirective, { read: LU_OPTION_CONTEXT, static: true })
	private optionContext?: ILuOptionContext<T>;

	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	get id(): string {
		const groupPart = this.groupIndex() === undefined ? `` : `-group-${this.groupIndex()}`;

		return `lu-select-${this.selectId}${groupPart}-option-${this.optionIndex}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	constructor() {
		this.selectableItem.id = this.id;
		effect(() => {
			if (this.selectableItem.isHighlighted()) {
				setTimeout(() => {
					this.elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
				}, MAGIC_OPTION_SCROLL_DELAY);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	selectOption($event: Event): void {
		if (this.disabled) {
			$event.stopPropagation();
		}
	}
}
