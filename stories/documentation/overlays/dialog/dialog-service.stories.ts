import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	configureLuDialog,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	injectDialogData,
	injectDialogRef,
	LuDialogRef,
	LuDialogService,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'sb-dialog-content',
	template: `
		<lu-dialog>
			<lu-dialog-header>Header</lu-dialog-header>

			<lu-dialog-content>Content</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="button" luButton (click)="close()">Confirm</button>
					<button type="button" luButton="text" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [DialogFooterComponent, DialogContentComponent, DialogHeaderComponent, DialogComponent, ButtonComponent, DialogDismissDirective],
	standalone: true,
})
export class DialogContentStoryComponent {
	ref = injectDialogRef<string>();
	data = injectDialogData<number>();

	close(): void {
		this.ref.close(this.data.toString());
	}
}

@Component({
	selector: 'lu-dialog-story',
	standalone: true,
	template: ` <button luButton (click)="openDialog()">Open dialog</button>`,
	imports: [ButtonComponent],
	providers: [provideLuDialog()],
})
export class DialogStory {
	dialog = inject(LuDialogService);

	openDialog(): void {
		const ref: LuDialogRef<DialogContentStoryComponent> = this.dialog.open({
			content: DialogContentStoryComponent,
			data: 5,
		});

		const res = ref.result$;
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/[Test] Angular Service usage',
	component: DialogStory,
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
		}),
	],
} as Meta;

export const Basic: StoryObj = {
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
	},
};
