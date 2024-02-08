import { ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LuDialogRef } from '../model';
import { CdkDialogContainer } from '@angular/cdk/dialog';
import { IconComponent } from '../../icon/icon.component';
import { ButtonComponent } from '../../button/button.component';
import { NgIf } from '@angular/common';

let nextId = 0;

@Component({
	selector: 'lu-dialog-header',
	standalone: true,
	imports: [IconComponent, ButtonComponent, NgIf],
	templateUrl: './dialog-header.component.html',
	styleUrl: './dialog-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-header',
		role: 'header',
	},
})
export class DialogHeaderComponent implements OnInit {
	#ref = inject(LuDialogRef);

	@Input('id')
	id: string;

	dismissible = this.#ref.config.dismissible;

	close(): void {
		this.#ref.dismiss();
	}

	ngOnInit(): void {
		// Using setTimeout here to make sure this will be handled in the next Cd cycle, not the current one.
		setTimeout(() => {
			if (!this.id) {
				this.id = `lu-dialog-header-${nextId++}`;
			}
			(this.#ref.cdkRef.containerInstance as CdkDialogContainer)._addAriaLabelledBy(this.id);
		});
	}
}
