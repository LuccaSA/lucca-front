import { Component, inject, signal, ViewEncapsulation } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LU_DIALOG_INSTANCE } from '@lucca-front/ng/dialog';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';

@Component({
	selector: 'lu-test',
	standalone: true,
	templateUrl: './test.component.html',
	styleUrl: './test.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ButtonComponent, GridComponent, GridColumnComponent],
})
export class TestComponent {
	dialogRef = inject(LU_DIALOG_INSTANCE);
	visible = false;

	mod = signal<'fitContent' | 'XS' | 'S' | '' | 'L' | 'XL' | 'XXL' | 'maxContent' | 'fullScreen'>('');

	toggleMod() {
		switch (this.mod()) {
			case 'fitContent':
				this.mod.set('XS');
				break;
			case 'XS':
				this.mod.set('S');
				break;
			case 'S':
				this.mod.set('');
				break;
			case '':
				this.mod.set('L');
				break;
			case 'L':
				this.mod.set('XL');
				break;
			case 'XL':
				this.mod.set('XXL');
				break;
			case 'XXL':
				this.mod.set('maxContent');
				break;
			case 'maxContent':
				this.mod.set('fullScreen');
				break;
			case 'fullScreen':
				this.mod.set('fitContent');
				break;
		}

		this.dialogRef.updateMod(this.mod());
	}
}
