import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DialogFooterComponent, DialogHeaderComponent, injectDialogData, injectDialogRef, LuDialogModule, LuDialogService } from '@lucca-front/ng/dialog';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'test-dialog',
	template: `
		<div class="dialog-inside">
			<lu-dialog-header>I'm a test dialog ! Hello {{ world }}</lu-dialog-header>

			<!-- TODO this should be a component that holds the class as host value-->
			<div class="dialog-inside-content">
				I'm the content of the dialog !
				<lu-text-input class="autofocus" ngModel></lu-text-input>
				<!-- TODO Discuss focus transfer to child element with gnury-->
			</div>

			<lu-dialog-footer>
				<div class="footer-content">Je suis du texte dans le footer !</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="text" (click)="close()">Cancel</button>
				</div>
			</lu-dialog-footer>
		</div>
	`,
	imports: [ButtonComponent, LuSimpleSelectInputComponent, DialogHeaderComponent, DialogFooterComponent, TextInputComponent, FormsModule],
	standalone: true,
})
class TestDialogContent {
	world = injectDialogData<string>();
	ref = injectDialogRef<number>();

	close(): void {
		this.ref.close(0);
	}
}

@Component({
	selector: 'dialog-story',
	template: ` <button luButton (click)="open()">Open Dialog</button>`,
})
class TestDialogStory {
	dialog = inject(LuDialogService);

	open(): void {
		const ref = this.dialog.open({
			component: TestDialogContent,
			data: 'World',
			cdkConfigOverride: {
				// autoFocus: '.autofocus input',
			},
		});

		ref.closed$.subscribe(console.log);
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/Angular',
	component: TestDialogStory,
	decorators: [
		moduleMetadata({
			imports: [LuDialogModule, ButtonComponent],
		}),
	],
} as Meta;

export const Basic: StoryObj = {};
