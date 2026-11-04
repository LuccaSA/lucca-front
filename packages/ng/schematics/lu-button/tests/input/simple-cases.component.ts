import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

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
			<lu-icon icon="arrowLeft" />
			<span class="pr-u-mask">{{ 'dependencies.GO_BACK_TO_LIST' | transloco }}</span>
		</a>
		<button class="button palette-primary" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button luButton class="something-but-already-button" type="button" [class.is-loading]="saving$ | async" (click)="save()">
			{{translations.ADMIN_SAVE}}
		</button>
		<button class="button mod-delete" type="button">Delete</button>
		<button class="button mod-critical" type="button">Delete</button>
		<button class="button loading" type="button">Save</button>
		<button class="button error" type="button">Save</button>
		<button class="button success" type="button">Save</button>
		<button class="button mod-text" type="button">Text</button>
		<button class="button mod-link" type="button">Link</button>
		<button class="button mod-text mod-invert" type="button">Text invert</button>
		<button class="button mod-ghost mod-inverted" type="button">Ghost inverted</button>
		<button class="button mod-outline" type="button">Outline</button>
		<button class="button mod-outline mod-delete" type="button">Delete</button>
		<button class="button mod-invert" type="button">Invert</button>
		<button class="button disabled" type="button">Disabled</button>
		<button class="button is-disabled" type="button">Disabled</button>
		<a class="button disabled" href="#">Disabled link</a>
		<a class="button is-disabled" href="#">Disabled link</a>
	`,
	imports: [
		IconComponent
	]
})
export class SimpleCasesComponent {
}
