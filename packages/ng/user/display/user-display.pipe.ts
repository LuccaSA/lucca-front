import { inject, Pipe, PipeTransform } from '@angular/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';

export interface LuUserDisplayInput {
	firstName: string;
	lastName: string;
}

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUserDisplay(user: LuUserDisplayInput, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
	let result = '';
	if (user) {
		switch (format) {
			case LuDisplayFullname.lastfirst:
				result = [user.lastName, user.firstName].filter((v) => !!v).join(' ');
				break;
			case LuDisplayFullname.firstlast:
				result = [user.firstName, user.lastName].filter((v) => !!v).join(' ');
				break;
			case LuDisplayFullname.first:
				result = user.firstName;
				break;
			case LuDisplayFullname.last:
				result = user.lastName;
				break;
			case LuDisplayInitials.lastfirst:
				result = [user.lastName?.charAt(0), user.firstName?.charAt(0)].filter((v) => !!v).join('');
				break;
			case LuDisplayInitials.firstlast:
				result = [user.firstName?.charAt(0), user.lastName?.charAt(0)].filter((v) => !!v).join('');
				break;
			case LuDisplayInitials.first:
				result = user.firstName?.charAt(0) ?? '';
				break;
			case LuDisplayInitials.last:
				result = user.lastName?.charAt(0) ?? '';
				break;
			case LuDisplayHybrid.firstIlastFull:
				result = [user.firstName ? user.firstName.charAt(0) + '.' : '', user.lastName].filter((v) => !!v).join(' ');
				break;
			case LuDisplayHybrid.lastIfirstFull:
				result = [user.lastName ? user.lastName.charAt(0) + '.' : '', user.firstName].filter((v) => !!v).join(' ');
				break;
			case LuDisplayHybrid.lastFullfirstI:
				result = [user.lastName, user.firstName ? user.firstName.charAt(0) + '.' : ''].filter((v) => !!v).join(' ');
				break;
			case LuDisplayHybrid.firstFulllastI:
				result = [user.firstName, user.lastName ? user.lastName.charAt(0) + '.' : ''].filter((v) => !!v).join(' ');
				break;
			default:
				break;
		}
	}
	return result;
}

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
@Pipe({ name: 'luUserDisplay', standalone: true })
export class LuUserDisplayPipe implements PipeTransform {
	private readonly defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);

	public transform(user: LuUserDisplayInput, format: LuDisplayFormat = this.defaultFormat): string {
		return luUserDisplay(user, format);
	}
}
