import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input, OnInit, output, TemplateRef, Type, untracked, viewChild } from '@angular/core';
import { intlInputOptions, isNil, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { asyncScheduler, observeOn } from 'rxjs';
import { CoreSelectPanelInstance, SELECT_PANEL_INSTANCE } from '../panel/panel.instance';
import { GroupTemplateLocation } from '../panel/panel.utils';
import { CoreSelectPanelElement } from '../panel/selectable-item';
import { LuOptionContext, LuOptionGrouping, SELECT_ID } from '../select.model';
import { LuOptionGroupPipe } from './group.pipe';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { LU_OPTION_CONTEXT } from './option.token';
import { LU_OPTION_TRANSLATIONS } from './option.translate';

export const MAGIC_OPTION_SCROLL_DELAY = 15;

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrl: './option.component.scss',
	host: {
		class: 'optionItem',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuOptionOutletDirective, PortalDirective, LuOptionGroupPipe, LuTooltipTriggerDirective],
})
export class LuOptionComponent<T> implements OnInit {
	readonly #panelRef = inject<CoreSelectPanelInstance<T>>(SELECT_PANEL_INSTANCE);
	protected selectableItem = inject(CoreSelectPanelElement);
	readonly intl = input(...intlInputOptions(LU_OPTION_TRANSLATIONS));

	readonly optionTpl = input<TemplateRef<LuOptionContext<T>> | Type<unknown>>();

	readonly option = input<T>();

	readonly grouping = input<LuOptionGrouping<T, unknown>>();

	readonly hasChildren = input(false, { transform: booleanAttribute });

	readonly onlyParent = output<void>();

	readonly onlyChildren = output<void>();

	readonly groupIndex = input<number>();

	public readonly optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	readonly scrollIntoViewOptions = input<ScrollIntoViewOptions>({});

	readonly groupTemplateLocation = input<GroupTemplateLocation>();

	readonly optionContext = viewChild(LU_OPTION_CONTEXT);

	private cdr = inject(ChangeDetectorRef);

	get id(): string {
		const groupPart = this.groupIndex() === undefined ? `` : `-group-${this.groupIndex()}`;

		return `lu-select-${this.selectId}${groupPart}-option-${this.optionIndex()}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	constructor() {
		ɵeffectWithDeps([this.selectableItem.isHighlighted], (isHighlighted, onCleanup) => {
			if (isHighlighted && !untracked(this.#panelRef.pointerNavigation)) {
				const timeoutId = setTimeout(() => {
					this.elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions());
				}, MAGIC_OPTION_SCROLL_DELAY);
				onCleanup(() => clearTimeout(timeoutId));
			}
		});

		ɵeffectWithDeps([this.optionContext], (optionContext, onCleanup) => {
			if (isNil(optionContext)) {
				return;
			}

			const subscription = optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
				this.selectableItem.disabled = isDisabled;
				this.cdr.markForCheck();
			});
			onCleanup(() => subscription.unsubscribe());
		});
	}

	ngOnInit(): void {
		this.selectableItem.id.set(this.id);
	}

	selectOption($event: Event): void {
		if (this.selectableItem.disabled) {
			$event.stopPropagation();
		}
	}
}
