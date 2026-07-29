import { Component } from '@angular/core';
import { LuDateSelectInputModule } from '@lucca-front/ng/date';
import { LuUserSelectInputModule } from '@lucca-front/ng/user';

@Component({
	selector: 'my-component',
	standalone: true,
	imports: [LuDateSelectInputModule, LuUserSelectInputModule],
})
export class MyComponent {}
