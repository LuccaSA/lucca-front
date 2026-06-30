import { ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca/prisme/icon';
import { ApprobationInboxItemComponent } from '../approbation-inbox-item/approbation-inbox-item.component';
import { ApprobationInboxListComponent } from '../approbation-inbox-list/approbation-inbox-list.component';

@Component({
	selector: 'lu-approbation-inbox-group',
	templateUrl: './approbation-inbox-group.component.html',
	styleUrl: './approbation-inbox-group.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, FormFieldComponent, CheckboxInputComponent, FormsModule],
	host: {
		class: 'approbationInbox-list-groupOptional',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxGroupComponent {
	private readonly list = inject(ApprobationInboxListComponent);

	readonly selectable = computed(() => this.list?.selectable() ?? false);
	readonly label = input.required<string>();
	readonly expanded = model(true);

	readonly items = contentChildren(ApprobationInboxItemComponent);

	readonly allChecked = computed(() => this.items().length > 0 && this.items().every((item) => item.checked()));
	readonly anyChecked = computed(() => this.items().some((item) => item.checked()));
	readonly groupMixed = computed(() => this.anyChecked() && !this.allChecked());

	expandedToggle() {
		this.expanded.set(!this.expanded());
	}

	onGroupChange(value: boolean) {
		this.items().forEach((item) => item.checked.set(value));
	}
}
