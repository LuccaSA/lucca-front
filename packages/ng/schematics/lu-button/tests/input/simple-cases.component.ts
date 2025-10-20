import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-test',
	template: `
		<button
			class="button mod-block pr-u-textCenter mod-outlined pr-u-textNeutral"
			data-testid="open-expense-form"
			type="button"
			(click)="createExpenseFromForm()"
		>
			{{ 'Cla_Expense_Create_From_Form' | tr }}
		</button>
		<a class="button mod-onlyIcon mod-text" [routerLink]="['.']">
			<lu-icon icon="arrowLeft" />
			<span class="pr-u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button class="button palette-primary" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton class="something-but-already-button" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
	`,
	imports: [
		IconComponent
	]
})
export class SimpleCasesComponent {
}
