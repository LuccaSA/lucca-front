import { ILuTranslation } from '@lucca-front/ng/core';

export class MyComponent {
	translations: ILuTranslation<string>;

	constructor(private translation: ILuTranslation<number>) {}
}
