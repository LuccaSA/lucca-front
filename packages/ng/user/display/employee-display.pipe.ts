import { inject, Pipe, PipeTransform } from '@angular/core';
import { isNil } from '@lucca-front/ng/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname } from './display-format.model';
import { luUserDisplay, LuUserDisplaySingleOptions } from './user-display.pipe';

export interface LuEmployeeDisplayInput {
	givenName?: string | null;
	familyName?: string | null;
}

/**
 * Displays the name of an employee of the Lucca v5 API according to specified format. Supported formats: f for given name,
 * F for given name initial, l for family name, L for family name initial.
 */
export function luEmployeeDisplay(employee?: LuEmployeeDisplayInput | null, format: LuDisplayFormat = LuDisplayFullname.lastfirst): string {
	if (isNil(employee)) {
		return '';
	}
	return luUserDisplay({ firstName: employee.givenName, lastName: employee.familyName }, format);
}

/**
 * Displays the name of an employee of the Lucca v5 API according to specified format. Supported formats: f for given name,
 * F for given name initial, l for family name, L for family name initial.
 */
@Pipe({ name: 'luEmployeeDisplay' })
export class LuEmployeeDisplayPipe implements PipeTransform {
	readonly #defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);

	public transform(employee: LuEmployeeDisplayInput | null | undefined, options?: LuUserDisplaySingleOptions): string {
		const format = (typeof options === 'string' ? options : options?.format) ?? this.#defaultFormat;
		return luEmployeeDisplay(employee, format);
	}
}
