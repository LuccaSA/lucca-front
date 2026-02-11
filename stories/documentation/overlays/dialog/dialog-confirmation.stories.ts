import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogCloseDirective,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderAction,
	DialogHeaderComponent,
	DialogOpenDirective,
	LuDialogConfig,
	LuDialogService,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

import { HiddenArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'dialog-confirmation-story',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ButtonComponent,
		DialogOpenDirective,
		DialogHeaderComponent,
		DialogFooterComponent,
		CheckboxInputComponent,
		DialogContentComponent,
		DialogComponent,
		DialogCloseDirective,
		DialogDismissDirective,
		FormFieldComponent,
		TextInputComponent,
		FormsModule,
		ReactiveFormsModule,
		IconComponent,
		DialogHeaderAction,
	],
	providers: [LuDialogService],
	templateUrl: './dialog-confirmation.stories.html',
})
class DialogConfirmationStory {
	mode?: LuDialogConfig<unknown>['mode'];
	autoFocus?: LuDialogConfig<unknown>['autoFocus'];
	dialog = inject(LuDialogService);

	dismiss() {
		this.dialog.open({
			mode: this.mode,
			autoFocus: this.autoFocus,
			content: DialogConfirmationStoryConfirmation,
		});
	}
}

@Component({
	selector: 'dialog-confirmation-story-confirmation',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ButtonComponent,
		DialogOpenDirective,
		DialogHeaderComponent,
		DialogFooterComponent,
		CheckboxInputComponent,
		DialogContentComponent,
		DialogComponent,
		DialogCloseDirective,
		DialogDismissDirective,
		FormFieldComponent,
		TextInputComponent,
		FormsModule,
		ReactiveFormsModule,
		IconComponent,
		DialogHeaderAction,
	],
	providers: [LuDialogService],
	template: `<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Confirmation</h1>
		</lu-dialog-header>
		<lu-dialog-content>Lorem ipsum dolor</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost">Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>`,
})
class DialogConfirmationStoryConfirmation {
	dialog = inject(LuDialogService);
	autoFocus?: LuDialogConfig<unknown>['autoFocus'];

	dismiss() {
		this.dialog.open({
			content: DialogConfirmationStory,
			autoFocus: this.autoFocus,
		});
	}
}

export default {
	title: 'Documentation/Overlays/Dialog/Angular/Confirmation',
	component: DialogConfirmationStory,
	argTypes: {
		panelClasses: HiddenArgType,
		mode: {
			options: ['default', 'drawer', 'drawer-from-bottom'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['fitContent', 'XS', 'S', '', 'L', 'XL', 'XXL', 'maxContent', 'fullScreen'],
			control: {
				type: 'select',
			},
		},
		autoFocus: HiddenArgType,
		alert: HiddenArgType,
	},
} as Meta;

const template = (args: DialogConfirmationStory) => ({
	props: args,
});

export const Basic: StoryObj<DialogConfirmationStory> = {
	args: {
		mode: 'drawer',
		autoFocus: '.open',
	},
	render: template,
};
