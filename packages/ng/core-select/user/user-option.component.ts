import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { map, startWith } from 'rxjs';
import { LuCoreSelectUser, LuCoreSelectWithAdditionnalInformation } from './user-option.model';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';
import { LuCoreSelectUsersDirective } from './users.directive';

@Component({
	selector: 'lu-user-option',
	imports: [NgIf, AsyncPipe, LuUserDisplayPipe, ɵLuOptionOutletDirective],
	template: `
		<ng-container *ngIf="context.option$ | async as user">
			<div *ngIf="userDirective.displayMeOption() && user.id === userDirective.currentUserId && hasEmptyClue$ | async; else notMe">
				<strong>{{ intl.me }}</strong
				>&ngsp;
				<strong translate="no"><ng-container *luOptionOutlet="customUserOptionTpl() || defaultUserTpl; value: user" /></strong>
			</div>

			<ng-template #notMe>
				<div *luOptionOutlet="customUserOptionTpl() || defaultUserTpl; value: user"></div>
			</ng-template>
			<div class="lu-select-additionalInformation" *ngIf="user.additionalInformation">({{ user.additionalInformation }})</div>
		</ng-container>

		<ng-template #defaultUserTpl let-user>
			<span translate="no">{{ user | luUserDisplay: userDirective.displayFormat() }}</span>
		</ng-template>
	`,
	styles: [
		`
			.lu-select-additionalInformation {
				font-size: 80%;
				font-style: italic;
				margin-block-start: -0.25em;
			}
		`,
	],
})
export class LuUserOptionComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectWithAdditionnalInformation<LuCoreSelectUser>>>(LU_OPTION_CONTEXT);
	protected userDirective = inject(LuCoreSelectUsersDirective);
	protected intl = getIntl(LU_CORE_SELECT_USER_TRANSLATIONS);
	protected hasEmptyClue$ = this.userDirective.select.clueChange.pipe(
		startWith(this.userDirective.select.clue),
		map((clue) => !clue),
	);
	protected customUserOptionTpl = this.userDirective.customUserOptionTpl;
}
