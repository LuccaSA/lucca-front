import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button
			class="button mod-block u-textCenter mod-outlined u-textNeutral"
			data-testid="open-expense-form"
			type="button"
			(click)="createExpenseFromForm()"
		>
			{{ 'Cla_Expense_Create_From_Form' | tr }}
		</button>
		<a class="button mod-onlyIcon mod-text" [routerLink]="['.']">
			<lu-icon icon="arrowLeft" />
			<span class="u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button class="button palette-primary" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
	`,
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
