import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	effect,
	ElementRef,
	forwardRef,
	HostBinding,
	inject,
	input,
	LOCALE_ID,
	signal,
	TemplateRef,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { FILTER_PILL_HOST_COMPONENT, FILTER_PILL_INPUT_COMPONENT } from '../core';

let nextId = 0;

@Component({
	selector: 'lu-filter-pill',
	standalone: true,
	imports: [PopoverDirective, FormsModule, IconComponent, NgTemplateOutlet],
	templateUrl: './filter-pill.component.html',
	styleUrl: './filter-pill.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FILTER_PILL_HOST_COMPONENT,
			useExisting: forwardRef(() => FilterPillComponent),
		},
	],
	host: {
		class: 'filterPill',
	},
})
export class FilterPillComponent {
	// TODO Avoir un CVA sur la barre de filtres
	// TODO Selects: Fournir une couche autour d'overlayRef qui décide d'attacher le panel sur un overlay ou un ng-container dans le cas d'un pill

	#locale = inject(LOCALE_ID);

	elementRef = inject(ElementRef);

	id = `filterPill-combobox-${nextId++}`;

	inputComponentRef = contentChild(FILTER_PILL_INPUT_COMPONENT);

	popoverRef = viewChild(PopoverDirective);

	pillTpl: TemplateRef<unknown>;

	labelTpl = computed(() => this.customLabelTpl() || this.defaultLabelTpl());

	defaultLabelTpl = viewChild<TemplateRef<unknown>>('defaultLabel');

	customLabelTpl = signal<TemplateRef<unknown> | null>(null);

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'bottom' },
			{
				overlayX: 'start',
				overlayY: 'top',
			},
			-4,
			0,
		),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-4,
			0,
		),
	];

	label = input.required<string>();

	// TODO i18n placeholder
	placeholder = input<string>('Sélectionner une valeur');

	icon = input<LuccaIcon>();

	defaultIcon = computed<LuccaIcon>(() => this.inputComponentRef()?.getDefaultFilterPillIcon?.() || 'arrowChevronBottom');

	displayedIcon = computed(() => this.icon() || this.defaultIcon());

	shouldHideCombobox = computed(() => this.inputComponentRef()?.hideCombobox?.() || false);

	inputIsEmpty = computed(() => this.inputComponentRef()?.isFilterPillEmpty());

	shouldShowColon = computed(() => this.inputComponentRef()?.showColon?.() || !this.inputIsEmpty());

	colonDisplay = computed(() => {
		if (!this.shouldShowColon()) {
			return '';
		}
		if (this.#locale === 'fr') {
			return ' :';
		}
		return ':';
	});

	@HostBinding('class.is-empty')
	get isEmpty() {
		return this.inputIsEmpty();
	}

	@HostBinding('class.is-comboboxHidden')
	get hideCombobox() {
		return this.shouldHideCombobox();
	}

	constructor() {
		effect(() => {
			this.inputComponentRef()?.enableFilterPillMode();
			this.inputComponentRef()?.registerFilterPillClosePopover(this.closePopover);
		});
	}

	closePopover = () => {
		this.popoverRef().close();
	};

	clear(): void {
		this.inputComponentRef()?.clearFilterPillValue();
	}
}
