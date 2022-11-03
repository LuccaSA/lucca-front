import { Pipe, PipeTransform } from '@angular/core';
import { ILuUser } from '../user.model';
import { LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';
/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
@Pipe({ name: 'luUserDisplay', standalone: true })
export class LuUserDisplayPipe implements PipeTransform {
	transform(user: ILuUser, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
		let result = '';

		if (!!user && !!user.firstName && !!user.lastName) {
			switch (format) {
				case LuDisplayFullname.lastfirst:
					result = user.lastName + ' ' + user.firstName;
					break;
				case LuDisplayFullname.firstlast:
					result = user.firstName + ' ' + user.lastName;
					break;
				case LuDisplayFullname.first:
					result = user.firstName;
					break;
				case LuDisplayFullname.last:
					result = user.lastName;
					break;
				case LuDisplayInitials.lastfirst:
					result = user.lastName.charAt(0) + user.firstName.charAt(0);
					break;
				case LuDisplayInitials.firstlast:
					result = user.firstName.charAt(0) + user.lastName.charAt(0);
					break;
				case LuDisplayInitials.first:
					result = user.firstName.charAt(0);
					break;
				case LuDisplayInitials.last:
					result = user.lastName.charAt(0);
					break;
				case LuDisplayHybrid.firstIlastFull:
					result = user.firstName.charAt(0) + '. ' + user.lastName;
					break;
				case LuDisplayHybrid.lastIfirstFull:
					result = user.lastName.charAt(0) + '. ' + user.firstName;
					break;
				case LuDisplayHybrid.lastFullfirstI:
					result = user.lastName + ' ' + user.firstName.charAt(0) + '.';
					break;
				case LuDisplayHybrid.firstFulllastI:
					result = user.firstName + ' ' + user.lastName.charAt(0) + '.';
					break;
				default:
					break;
			}
		}
		return result;
	}
}
