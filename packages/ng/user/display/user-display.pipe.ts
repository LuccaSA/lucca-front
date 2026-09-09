import { inject, Pipe, PipeTransform } from '@angular/core';
import { isNil, isNotNil } from '@lucca-front/ng/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';

function getFirstCharacter(value: string | null | undefined): string {
	return value?.at(0) ?? '';
}

function isNotNilAndEmptyString(value: string | null | undefined): boolean {
	return isNotNil(value) && value.length > 0;
}

export interface LuUserDisplayInput {
	firstName: string;
	lastName: string;
}

const formatUser: Record<LuDisplayFormat, (user: LuUserDisplayInput) => string> = {
	[LuDisplayFullname.lastfirst]: ({ firstName, lastName }) => [lastName, firstName].filter(isNotNilAndEmptyString).join(' '),
	[LuDisplayFullname.firstlast]: ({ firstName, lastName }) => [firstName, lastName].filter(isNotNilAndEmptyString).join(' '),
	[LuDisplayFullname.first]: ({ firstName }) => (isNotNilAndEmptyString(firstName) ? firstName : ''),
	[LuDisplayFullname.last]: ({ lastName }) => (isNotNilAndEmptyString(lastName) ? lastName : ''),
	[LuDisplayInitials.lastfirst]: ({ firstName, lastName }) => [getFirstCharacter(lastName), getFirstCharacter(firstName)].filter(isNotNilAndEmptyString).join(''),
	[LuDisplayInitials.firstlast]: ({ firstName, lastName }) => [getFirstCharacter(firstName), getFirstCharacter(lastName)].filter(isNotNilAndEmptyString).join(''),
	[LuDisplayInitials.first]: ({ firstName }) => (isNotNilAndEmptyString(firstName) ? getFirstCharacter(firstName) : ''),
	[LuDisplayInitials.last]: ({ lastName }) => (isNotNilAndEmptyString(lastName) ? getFirstCharacter(lastName) : ''),
	[LuDisplayHybrid.lastIfirstFull]: ({ firstName, lastName }) =>
		[isNotNilAndEmptyString(lastName) ? getFirstCharacter(lastName) + '.' : '', isNotNilAndEmptyString(firstName) ? firstName : ''].filter(isNotNilAndEmptyString).join(' '),
	[LuDisplayHybrid.firstIlastFull]: ({ firstName, lastName }) =>
		[isNotNilAndEmptyString(firstName) ? getFirstCharacter(firstName) + '.' : '', isNotNilAndEmptyString(lastName) ? lastName : ''].filter(isNotNilAndEmptyString).join(' '),
	[LuDisplayHybrid.lastFullfirstI]: ({ firstName, lastName }) =>
		[isNotNilAndEmptyString(lastName) ? lastName : '', isNotNilAndEmptyString(firstName) ? getFirstCharacter(firstName) + '.' : ''].filter(isNotNilAndEmptyString).join(' '),
	[LuDisplayHybrid.firstFulllastI]: ({ firstName, lastName }) =>
		[isNotNilAndEmptyString(firstName) ? firstName : '', isNotNilAndEmptyString(lastName) ? getFirstCharacter(lastName) + '.' : ''].filter(isNotNilAndEmptyString).join(' '),
};

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUserDisplay(user?: LuUserDisplayInput, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
	if (isNil(user)) {
		return '';
	}

	if (isNil(user?.lastName)) {
		const useFull = format.includes('f') || format === format.toLowerCase();
		return formatUser[useFull ? LuDisplayFullname.first : LuDisplayInitials.first](user);
	}
	if (isNil(user?.firstName)) {
		const useFull = format.includes('l') || format === format.toLowerCase();
		return formatUser[useFull ? LuDisplayFullname.last : LuDisplayInitials.last](user);
	}
	return formatUser[format](user);
}

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUsersDisplay(users: LuUserDisplayInput[], options: LuUserDisplayMultipleOptions): string {
	const usersStringified = users.map((u) => luUserDisplay(u, options.format));
	if ('separator' in options) {
		return usersStringified.join(options.separator);
	}
	return options.formatter.format(usersStringified);
}

export type LuUserDisplaySingleOptions = LuDisplayFormat | { format: LuDisplayFormat };

export type LuUserDisplayMultipleOptions =
	| { format: LuDisplayFormat; separator: string }
	| {
			format: LuDisplayFormat;
			formatter: Intl.ListFormat;
	  };

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
@Pipe({ name: 'luUserDisplay', standalone: true })
export class LuUserDisplayPipe implements PipeTransform {
	private readonly defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);

	public transform<T extends LuUserDisplayInput>(user: T, options?: Partial<LuUserDisplaySingleOptions>): string;
	public transform<T extends LuUserDisplayInput>(users: T[], options?: Partial<LuUserDisplayMultipleOptions>): string;
	public transform<T extends LuUserDisplayInput>(userOrUsers: T | T[], options?: Partial<LuUserDisplaySingleOptions> | Partial<LuUserDisplayMultipleOptions>): string {
		if (userOrUsers == null) {
			throw new Error("Parameter 'userOrUsers' must be a user or a user array");
		}

		options = typeof options === 'string' ? { format: options } : options || {};

		const format = options.format ?? this.defaultFormat;

		if (Array.isArray(userOrUsers)) {
			if ('formatter' in options && options.formatter) {
				return luUsersDisplay(userOrUsers, { format, formatter: options.formatter });
			}
			const separator = ('separator' in options ? options.separator : undefined) ?? ', ';
			return luUsersDisplay(userOrUsers, { format, separator });
		}

		return luUserDisplay(userOrUsers, format);
	}
}
