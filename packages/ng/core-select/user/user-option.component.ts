import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { map, startWith } from 'rxjs';
import { LuCoreSelectUser, LuCoreSelectWithAdditionnalInformation } from './user-option.model';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';
import { LuCoreSelectUsersDirective } from './users.directive';

@Component({
	selector: 'lu-user-option',
	imports: [AsyncPipe, LuUserDisplayPipe],
	template: `
		@if (context.option$ | async; as user) {
			@if (userDirective.displayMeOption && user.id === userDirective.currentUserId && hasEmptyClue$ | async) {
				<div>
					<b>{{ intl.me }} {{ user | luUserDisplay: userDirective.displayFormat }}</b>
				</div>
			} @else {
				<div>{{ user | luUserDisplay: userDirective.displayFormat }}</div>
			}
			@if (user.additionalInformation) {
				<div class="lu-select-additionalInformation">({{ user.additionalInformation }})</div>
			}
		}
	`,
	standalone: true,
	styles: [
		`
			.lu-select-additionalInformation {
				font-size: 80%;
				font-style: italic;
				margin-top: -0.25em;
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
}
