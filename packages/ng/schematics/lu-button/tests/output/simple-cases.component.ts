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
		<a luButton="ghost"  [routerLink]="['.']">
			<lu-icon icon="arrowLeft" />
			<span class="pr-u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button luButton palette="primary"  type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton class="something-but-already-button" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton critical  type="button">Delete</button>
		<button luButton critical  type="button">Delete</button>
		<button luButton state="loading"  type="button">Save</button>
		<button luButton state="error"  type="button">Save</button>
		<button luButton state="success"  type="button">Save</button>
		<button luButton="ghost"  type="button">Text</button>
		<button luButton="ghost"  type="button">Link</button>
		<button luButton="ghost-invert"  type="button">Text invert</button>
		<button luButton="ghost-invert"  type="button">Ghost inverted</button>
		<button luButton="outlined"  type="button">Outline</button>
		<button luButton="outlined" critical  type="button">Delete</button>
		<button luButton class="mod-inverted" type="button">Invert</button>
		<button luButton disabled  type="button">Disabled</button>
		<button luButton disabled  type="button">Disabled</button>
	`,
	imports: [
		IconComponent, ButtonComponent
	]
})
export class SimpleCasesComponent {
}
