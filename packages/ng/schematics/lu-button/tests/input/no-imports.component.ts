import { Component } from '@angular/core';

@Component({
	selector: 'lu-test',
	standalone: true,
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
			<span class="pr-u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button class="button palette-primary" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton class="something-but-already-button" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
	`
})
export class NoImportsComponent {
}
