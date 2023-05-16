import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'round', standalone: true })
export class RoundPipe implements PipeTransform {
	public transform(value: number, precision = 2): number {
		const decimalPower = Math.pow(10, precision);
		return Math.round(value * decimalPower) / decimalPower;
	}
}
