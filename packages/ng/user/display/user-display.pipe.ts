import { inject, Pipe, PipeTransform } from '@angular/core';
import { ILuUser } from '../user.model';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from './display-format.model';

export interface LuUserDisplayInput {
	firstName: string;
	lastName: string;
}

function getFirstCharacter([firstCharacter]: string): string {
	return firstCharacter ?? '';
}

const formatUser: Record<LuDisplayFormat, (user: ILuUser) => string> = {
	[LuDisplayFullname.lastfirst]: ({ firstName, lastName }) => `${lastName} ${firstName}`,
	[LuDisplayFullname.firstlast]: ({ firstName, lastName }) => `${firstName} ${lastName}`,
	[LuDisplayFullname.first]: ({ firstName }) => firstName,
	[LuDisplayFullname.last]: ({ lastName }) => lastName,
	[LuDisplayInitials.lastfirst]: ({ firstName, lastName }) => `${getFirstCharacter(lastName)}${getFirstCharacter(firstName)}`,
	[LuDisplayInitials.firstlast]: ({ firstName, lastName }) => `${getFirstCharacter(firstName)}${getFirstCharacter(lastName)}`,
	[LuDisplayInitials.first]: ({ firstName }) => getFirstCharacter(firstName),
	[LuDisplayInitials.last]: ({ lastName }) => getFirstCharacter(lastName),
	[LuDisplayHybrid.lastIfirstFull]: ({ firstName, lastName }) => `${getFirstCharacter(lastName)}. ${firstName}`,
	[LuDisplayHybrid.firstIlastFull]: ({ firstName, lastName }) => `${getFirstCharacter(firstName)}. ${lastName}`,
	[LuDisplayHybrid.lastFullfirstI]: ({ firstName, lastName }) => `${lastName} ${getFirstCharacter(firstName)}.`,
	[LuDisplayHybrid.firstFulllastI]: ({ firstName, lastName }) => `${firstName} ${getFirstCharacter(lastName)}.`,
};

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUserDisplay(user: ILuUser, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
	return formatUser[format](user);
}

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
export function luUsersDisplay(users: ILuUser[], { format, separator }: LuUserDisplayMultipleOptions): string {
	return users.map((u) => luUserDisplay(u, format)).join(separator);
}

export type LuUserDisplaySingleOptions = LuDisplayFormat | { format: LuDisplayFormat };

export type LuUserDisplayMultipleOptions = { format: LuDisplayFormat; separator: string };

/**
 * Displays a user name according to specified format. Supported formats: f for first name,
 * F for first initial, l for last name, L for last initial.
 */
@Pipe({ name: 'luUserDisplay', standalone: true })
export class LuUserDisplayPipe implements PipeTransform {
	private readonly defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);

	public transform<T extends ILuUser>(user: T, options?: Partial<LuUserDisplaySingleOptions>): string;
	public transform<T extends ILuUser>(users: T[], options?: Partial<LuUserDisplayMultipleOptions>): string;
	public transform<T extends ILuUser>(userOrUsers: T | T[], options?: Partial<LuUserDisplaySingleOptions> | Partial<LuUserDisplayMultipleOptions>): string {
		if (userOrUsers == null) {
			throw new Error("Parameter 'userOrUsers' must be a user or a user array");
		}

		options = typeof options === 'string' ? { format: options } : options || {};

		const format = options.format ?? this.defaultFormat;

		if (Array.isArray(userOrUsers)) {
			const separator = ('separator' in options ? options.separator : undefined) ?? ', ';
			return luUsersDisplay(userOrUsers, { format, separator });
		}

		return luUserDisplay(userOrUsers, format);
	}
}
