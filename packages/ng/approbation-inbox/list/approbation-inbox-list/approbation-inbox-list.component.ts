import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BubbleIllustration, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { generateId, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { ButtonComponent } from '@lucca/prisme/button';

interface SelectableItem {
	checked: WritableSignal<boolean>;
}

@Component({
	selector: 'lu-approbation-inbox-list',
	templateUrl: './approbation-inbox-list.component.html',
	styleUrl: './approbation-inbox-list.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, FormsModule, FormFieldComponent, CheckboxInputComponent, DividerComponent, ButtonComponent, BubbleIllustrationComponent, NgTemplateOutlet],
	host: {
		class: 'approbationInbox-list',
		role: 'region',
		'[attr.aria-labelledby]': 'titleId',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxListComponent {
	readonly titleId = `approbationInboxListTitle-${generateId()}`;

	readonly label = input.required<PortalContent>();
	readonly selectable = input(false, { transform: booleanAttribute });

	readonly emptyIllustration = input<BubbleIllustration | string>('magnifyingGlass');
	readonly emptyLabel = input.required<string>();
	readonly emptyResetLabel = input<string | null>();

	private readonly items = signal<SelectableItem[]>([]);

	readonly checkedCount = computed(() => this.items().filter((item) => item.checked()).length);

	readonly empty = computed(() => this.items().length === 0);

	readonly selectAllState = computed(() => {
		const all = this.items();
		if (all.length === 0) return false;
		const checkedCount = this.checkedCount();
		if (checkedCount === 0) return false;
		if (checkedCount === all.length) return true;
		return 'mixed' as const;
	});

	register(item: SelectableItem): void {
		this.items.update((items) => [...items, item]);
	}

	unregister(item: SelectableItem): void {
		this.items.update((items) => items.filter((i) => i !== item));
	}

	toggleSelectAll(): void {
		const newValue = this.selectAllState() !== true;
		this.items().forEach((item) => item.checked.set(newValue));
	}

	// TODO inbox: emit event
	submit() {}

	// TODO inbox: emit event
	reset() {}
}
