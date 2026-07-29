import { LuTranslation } from '@lucca-front/ng/core';

export class MyComponent {
	translations: LuTranslation<string>;

	constructor(private translation: LuTranslation<number>) {}
}
