import {
	AfterViewInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	effect,
	ElementRef,
	HostBinding,
	inject,
	Input,
	input,
	OnDestroy,
	OnInit,
	output,
	TemplateRef,
	Type,
	ViewChild,
} from '@angular/core';
import { getIntl, PortalDirective } from '@lucca-front/ng/core';
import { asyncScheduler, observeOn, Subscription } from 'rxjs';
import { GroupTemplateLocation } from '../panel/panel.utils';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LuOptionGrouping } from './group.directive';
import { LuOptionGroupPipe } from './group.pipe';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';
import { CoreSelectPanelElement } from '../panel/selectable-item';
import { LU_OPTION_TRANSLATIONS } from './option.translate';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

export const MAGIC_OPTION_SCROLL_DELAY = 15;

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [LuOptionOutletDirective, PortalDirective, LuOptionGroupPipe, LuTooltipTriggerDirective],
})
export class LuOptionComponent<T> implements AfterViewInit, OnDestroy, OnInit {
	protected selectableItem = inject(CoreSelectPanelElement);
	protected intl = getIntl(LU_OPTION_TRANSLATIONS);

	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined;

	@Input() option?: T;
	@Input() grouping?: LuOptionGrouping<T, unknown>;

	hasChildren = input(false, { transform: booleanAttribute });
	onlyParent = output<void>();
	onlyChildren = output<void>();

	groupIndex = input<number>();

	public optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	@Input()
	scrollIntoViewOptions: ScrollIntoViewOptions = {};

	groupTemplateLocation = input<GroupTemplateLocation>();

	@ViewChild(LuOptionOutletDirective, { read: LU_OPTION_CONTEXT, static: true })
	private optionContext?: ILuOptionContext<T>;

	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	get id(): string {
		const groupPart = this.groupIndex() === undefined ? `` : `-group-${this.groupIndex()}`;

		return `lu-select-${this.selectId}${groupPart}-option-${this.optionIndex()}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	constructor() {
		effect(() => {
			if (this.selectableItem.isHighlighted()) {
				setTimeout(() => {
					this.elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
				}, MAGIC_OPTION_SCROLL_DELAY);
			}
		});
	}

	ngOnInit(): void {
		this.selectableItem.id.set(this.id);
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.selectableItem.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	selectOption($event: Event): void {
		if (this.selectableItem.disabled) {
			$event.stopPropagation();
		}
	}
}
