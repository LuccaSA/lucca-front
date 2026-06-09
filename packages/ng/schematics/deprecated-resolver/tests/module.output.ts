import { Component } from '@angular/core';
import { LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { LuUserSelectInputComponent, LuEstablishmentSelectInputModule } from '@lucca-front/ng/user';

@Component({
	selector: 'my-component',
	standalone: true,
	imports: [LuDateSelectInputComponent, LuUserSelectInputComponent],
})
export class MyComponent {}
