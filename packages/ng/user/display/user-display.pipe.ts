import { inject, Pipe, PipeTransform } from '@angular/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';

function getFirstCharacter([firstCharacter]: string): string {
	return firstCharacter ?? '';
}

function isNotEmptyString(value: string): boolean {
	return value.length > 0;
}

export interface LuUserDisplayInput {
	firstName: string;
	lastName: string;
}

const formatUser: Record<LuDisplayFormat, (user: LuUserDisplayInput) => string> = {
	[LuDisplayFullname.lastfirst]: ({ firstName, lastName }) => [lastName, firstName].filter(isNotEmptyString).join(' '),
	[LuDisplayFullname.firstlast]: ({ firstName, lastName }) => [firstName, lastName].filter(isNotEmptyString).join(' '),
	[LuDisplayFullname.first]: ({ firstName }) => firstName,
	[LuDisplayFullname.last]: ({ lastName }) => lastName,
	[LuDisplayInitials.lastfirst]: ({ firstName, lastName }) => [getFirstCharacter(lastName), getFirstCharacter(firstName)].filter(isNotEmptyString).join(''),
	[LuDisplayInitials.firstlast]: ({ firstName, lastName }) => [getFirstCharacter(firstName), getFirstCharacter(lastName)].filter(isNotEmptyString).join(''),
	[LuDisplayInitials.first]: ({ firstName }) => getFirstCharacter(firstName),
	[LuDisplayInitials.last]: ({ lastName }) => getFirstCharacter(lastName),
	[LuDisplayHybrid.lastIfirstFull]: ({ firstName, lastName }) => [isNotEmptyString(lastName) ? getFirstCharacter(lastName) + '.' : '', firstName].filter(isNotEmptyString).join(' '),
	[LuDisplayHybrid.firstIlastFull]: ({ firstName, lastName }) => [isNotEmptyString(firstName) ? getFirstCharacter(firstName) + '.' : '', lastName].filter(isNotEmptyString).join(' '),
	[LuDisplayHybrid.lastFullfirstI]: ({ firstName, lastName }) => [lastName, firstName ? getFirstCharacter(firstName) + '.' : ''].filter(isNotEmptyString).join(' '),
	[LuDisplayHybrid.firstFulllastI]: ({ firstName, lastName }) => [firstName, lastName ? getFirstCharacter(lastName) + '.' : ''].filter(isNotEmptyString).join(' '),
};

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUserDisplay(user: LuUserDisplayInput, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
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

export type LuUserDisplayMultipleOptions = { format: LuDisplayFormat; separator: string } | { format: LuDisplayFormat; formatter: Intl.ListFormat };

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
			if ('formatter' in options) {
				return luUsersDisplay(userOrUsers, { format, formatter: options.formatter });
			}
			const separator = ('separator' in options ? options.separator : undefined) ?? ', ';
			return luUsersDisplay(userOrUsers, { format, separator });
		}

		return luUserDisplay(userOrUsers, format);
	}
}
