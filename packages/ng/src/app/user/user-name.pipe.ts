import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './user.model';

/**
 * Displays a user name according to specified format. Supported formats: f for first name, F for first initial, l for last name, L for last initial.
 */
@Pipe({name: 'userName'})
export class UserNamePipe implements PipeTransform {
	transform(user: IUser, format: string): string {
		let result = '';

		if (!!user && !!user.firstName && !!user.lastName) {
			switch (format) {
				case 'lf':
					result = user.lastName + ' ' + user.firstName;
					break;
				case 'Lf':
					result = user.lastName.charAt(0) + '. ' + user.firstName;
					break;
				case 'LF':
					result = user.lastName.charAt(0) + user.firstName.charAt(0);
					break;
				case 'lF':
					result = user.lastName + ' ' + user.firstName.charAt(0) + '.';
					break;
				case 'fl':
					result = user.firstName + ' ' + user.lastName;
					break;
				case 'Fl':
					result = user.firstName.charAt(0) + '. ' + user.lastName;
					break;
				case 'FL':
					result = user.firstName.charAt(0) + user.lastName.charAt(0);
					break;
				case 'fL':
					result = user.firstName + ' ' + user.lastName.charAt(0) + '.';
					break;
				default: break;
			}
		}
		return result;
	}
}