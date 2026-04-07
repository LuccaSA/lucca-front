import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luTypeGuard',
	standalone: true,
})
export class LuTypeGuardPipe implements PipeTransform {
	transform<T, U extends T>(obj: T, typeGuardFn: (arg: T) => arg is U): obj is U {
		return typeGuardFn(obj);
	}
}
