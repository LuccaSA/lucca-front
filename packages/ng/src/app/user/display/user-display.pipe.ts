import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../user.model';
import { DisplayFullname, DisplayHybrid, DisplayInitials, DisplayFormat} from './display-format.model';
/**
 * Displays a user name according to specified format. Supported formats: f for first name, F for first initial, l for last name, L for last initial.
 */
@Pipe({name: 'luUserDisplay'})
export class LuUserDisplayPipe implements PipeTransform {
	transform(user: IUser, format: DisplayFormat): string {
		let result = '';

		if (!!user && !!user.firstName && !!user.lastName) {
			switch (format) {
				case DisplayFullname.lastfirst:
					result = user.lastName + ' ' + user.firstName;
					break;
				case DisplayFullname.firstlast:
					result = user.firstName + ' ' + user.lastName;
					break;
				case DisplayInitials.lastfirst:
					result = user.lastName.charAt(0) + user.firstName.charAt(0);
					break;
				case DisplayInitials.firstlast:
					result = user.firstName.charAt(0) + user.lastName.charAt(0);
					break;
				case DisplayHybrid.firstIlastFull:
					result = user.firstName.charAt(0) + '. ' + user.lastName;
					break;
				case DisplayHybrid.lastIfirstFull:
					result = user.lastName.charAt(0) + '. ' + user.firstName;
					break;
				case DisplayHybrid.lastFullfirstI:
					result = user.lastName + ' ' + user.firstName.charAt(0) + '.';
					break;
				case DisplayHybrid.firstFulllastI:
					result = user.firstName + ' ' + user.lastName.charAt(0) + '.';
					break;
				default: break;
			}
		}
		return result;
	}
}
