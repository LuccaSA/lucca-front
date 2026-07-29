import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogCloseDirective, DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderAction, DialogHeaderComponent } from '@lucca-front/ng/dialog';
import { ButtonComponent } from '@lucca/prisme/button';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'dialog-stories',
	templateUrl: './dialog.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DialogComponent, DialogHeaderComponent, DialogFooterComponent, DialogHeaderAction, DialogContentComponent, DialogCloseDirective, DialogDismissDirective, ButtonComponent],
	styles: [
		`
			@layer components {
				.dialog,
				.dialog_backdrop {
					position: absolute !important;
				}

				.dialog {
					max-inline-size: 22rem !important;
				}
			}
		`,
	],
})
class DialogStory {}

export default {
	title: 'QA/Dialog',
	component: DialogStory,
	decorators: [
		moduleMetadata({
			entryComponents: [DialogStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DialogStory> = {
	args: {},
	render: template,
};
