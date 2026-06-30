import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';

interface SelectableItem {
	checked: WritableSignal<boolean>;
}

@Component({
	selector: 'lu-approbation-inbox-list',
	templateUrl: './approbation-inbox-list.component.html',
	styleUrl: './approbation-inbox-list.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, FormsModule, FormFieldComponent, CheckboxInputComponent, DividerComponent],
	host: {
		class: 'approbationInbox-list',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxListComponent {
	readonly label = input.required<PortalContent>();
	readonly selectable = input(false, { transform: booleanAttribute });

	private readonly items = signal<SelectableItem[]>([]);

	readonly selectAllState = computed(() => {
		const all = this.items();
		if (all.length === 0) return false;
		const checkedCount = all.filter((item) => item.checked()).length;
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
}
