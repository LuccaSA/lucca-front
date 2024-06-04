import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { LuCoreSelectUser } from './user-option.model';
import { LuCoreSelectUsersDirective } from './users.directive';

@Component({
	selector: 'lu-user-displayer',
	imports: [NgIf, AsyncPipe, LuUserDisplayPipe],
	template: `
		<ng-container *ngIf="context.option$ | async as user">
			{{ user | luUserDisplay: userDirective.displayFormat }}
		</ng-container>
	`,
	standalone: true,
})
export class LuUserDisplayerComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectUser>>(LU_OPTION_CONTEXT);
	protected userDirective = inject(LuCoreSelectUsersDirective);
}
