import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'intlParams',
	standalone: true,
})
export class IntlParamsPipe implements PipeTransform {
	#matcher = /{{\s?([^{}\s]*)\s?}}/g;

	transform(value: string, args: Record<string, string | number>): string {
		return value.replace(this.#matcher, (base, key: string) => {
			return args[key]?.toString() ?? base;
		});
	}
}
