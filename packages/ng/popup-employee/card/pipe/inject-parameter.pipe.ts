import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'injectParameter',
	standalone: true,
})
export class InjectParameterPipe implements PipeTransform {
	public transform(value: string, date: string): string {
		return value.replace('{{date}}', date);
	}
}
