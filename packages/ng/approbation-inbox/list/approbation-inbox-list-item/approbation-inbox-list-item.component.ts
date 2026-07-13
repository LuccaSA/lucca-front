import {
	afterRenderEffect,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	ElementRef,
	inject,
	input,
	model,
	OnInit,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { ApprobationInboxListComponent } from '../approbation-inbox-list/approbation-inbox-list.component';
import { LU_APPROBATION_INBOX_LIST_ITEM_TRANSLATIONS } from './approbation-inbox-list-item.translate';

@Component({
	selector: 'lu-approbation-inbox-list-item',
	templateUrl: './approbation-inbox-list-item.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [FormFieldComponent, CheckboxInputComponent, FormsModule, IntlParamsPipe],
	host: {
		class: 'approbationInbox-list-content-items-item',
		role: 'listitem',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxItemComponent implements OnInit {
	protected readonly intl = input(...intlInputOptions(LU_APPROBATION_INBOX_LIST_ITEM_TRANSLATIONS));

	private readonly list = inject(ApprobationInboxListComponent, { optional: true });
	private readonly destroyRef = inject(DestroyRef);

	readonly selectable = computed(() => this.list?.selectable() ?? false);
	readonly center = input(false, { transform: booleanAttribute });
	readonly checked = model(false);

	private readonly titleSlot = viewChild<ElementRef<HTMLElement>>('titleSlot');
	readonly title = signal('');

	constructor() {
		afterRenderEffect(() => {
			this.title.set(this.titleSlot()?.nativeElement.textContent?.trim() ?? '');
		});
	}

	ngOnInit(): void {
		if (this.list) {
			this.list.register(this);
			this.destroyRef.onDestroy(() => this.list!.unregister(this));
		}
	}
}
