import { booleanAttribute, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, model, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { ApprobationInboxListComponent } from '../approbation-inbox-list/approbation-inbox-list.component';

@Component({
	selector: 'lu-approbation-inbox-list-item',
	templateUrl: './approbation-inbox-list-item.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [FormFieldComponent, CheckboxInputComponent, FormsModule],
	host: {
		class: 'approbationInbox-list-content-items-item',
		role: 'listitem',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxItemComponent implements OnInit {
	private readonly list = inject(ApprobationInboxListComponent, { optional: true });
	private readonly destroyRef = inject(DestroyRef);

	readonly selectable = computed(() => this.list?.selectable() ?? false);
	readonly center = input(false, { transform: booleanAttribute });
	readonly checked = model(false);

	ngOnInit(): void {
		if (this.list) {
			this.list.register(this);
			this.destroyRef.onDestroy(() => this.list!.unregister(this));
		}
	}
}
