import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button
		 luButton="outlined" block class="pr-u-textCenter pr-u-textNeutral"
			data-testid="open-expense-form"
			type="button"
			(click)="createExpenseFromForm()"
		>
			{{ 'Cla_Expense_Create_From_Form' | tr }}
		</button>
		<a luButton="text"  [routerLink]="['.']">
			<lu-icon icon="arrowLeft" />
			<span class="pr-u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button luButton palette="primary"  type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton class="something-but-already-button" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
	`,
	imports: [
		IconComponent, ButtonComponent
	]
})
export class SimpleCasesComponent {
}
