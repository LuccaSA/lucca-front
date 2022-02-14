import { Pipe, PipeTransform } from '@angular/core';
import { ALuDateAdapter } from '@lucca-front/ng/core';

@Pipe({
	name: 'luDate',
	pure: true,
})
export class LuDateAdapterPipe<D> implements PipeTransform {
	constructor(private _adapter: ALuDateAdapter<D>) {}
	transform(d: D, format = 'mediumDate'): string {
		if (d && this._adapter.isValid(d)) {
			return this._adapter.format(d, format);
		}
		return '';
	}
}
