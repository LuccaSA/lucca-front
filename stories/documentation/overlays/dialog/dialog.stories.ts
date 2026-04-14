import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	configureLuDialog,
	DialogCloseDirective,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderAction,
	DialogHeaderComponent,
	DialogOpenDirective,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Overlays/Dialog/Angular',
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
		}),
		moduleMetadata({
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
		}),
	],
	render: (args) => {
		const fancyIllustrationParam = args['fancyIllustration'] ? ` fancyIllustration="${args['fancyIllustration']}"` : ``;
		return {
			props: {
				config: args,
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog${fancyIllustrationParam}>
		<lu-dialog-header>
			<h1>Template driven header</h1> You can also add more content in header
		</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	argTypes: {
		mode: {
			options: ['default', 'drawer', 'drawer-from-bottom', 'fancy'],
			control: {
				type: 'select',
			},
			description: 'Permet d’afficher la fenêtre de dialogue en mode drawer.',
		},
		autoFocus: {
			options: ['first-tabbable', 'first-input'],
			description: 'Définit quel élément doit recevoir le focus lorsque la fenêtre de dialogue s’ouvre. Peut aussi être un sélecteur CSS.',
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['fitContent', 'XS', 'S', '', 'L', 'XL', 'XXL', 'maxContent', 'fullScreen'],
			control: {
				type: 'select',
			},
			description: 'Largeur de la fenêtre de dialogue.',
		},
		panelClasses: {
			description: 'Permet d’ajouter des classes CSS au composant. (ex : mod-neutralBackground)',
		},
		alert: {
			description:
				'Transforme la fenêtre de dialogue en alerte en obligeant l’utilisateur à faire un choix. L’utilisateur ne peut alors plus la fermer en cliquant sur le backdrop ou en appuyant sur la touche Échap.',
		},
		fancyIllustration: {
			options: ['approval', 'checklist', 'email', 'install', 'mapping', 'save', 'users', 'welcome', 'payment-card'],
			control: {
				type: 'select',
			},
			if: { arg: 'mode', eq: 'fancy' },
			description: 'Modifie l’illustration affichée dans la Fancy dialog.',
		},
		fancyIllustrationUrl: {
			if: { arg: 'mode', eq: 'fancy' },
			description: 'Surcharge l’illustration avec une URL personnalisée.',
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		size: 'M',
		alert: false,
		mode: 'default',
		panelClasses: [],
	},
};

export const Focus: StoryObj = {
	render: (args) => {
		return {
			props: {
				config: args,
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>Template driven header</lu-dialog-header>

		<lu-dialog-content>
			<lu-form-field label="Example input">
				<lu-text-input [ngModel]="example" placeholder="This will be focused if autoFocus is set to first-input" />
			</lu-form-field>
		</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
		autoFocus: 'first-tabbable',
	},
};

export const WithForm: StoryObj = {
	render: (args) => {
		return {
			props: {
				config: args,
				form: new FormGroup({
					example: new FormControl('', Validators.required),
				}),
			},
			template: `<!-- config: ${JSON.stringify(args)} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog with Form inside</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
<!--form = new FormGroup({
			example: new FormControl('', Validators.required)
		})-->
		<form [formGroup]="form" class="dialog-inside-formOptional">
			<lu-dialog-header>Template driven header with Form inside</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Example input">
					<lu-text-input formControlName="example" placeholder="This will be focused if autoFocus is set to first-input" />
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="submit" luButton [disabled]="!form.valid" luDialogClose>Submit</button>
					<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</form>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
		autoFocus: 'first-tabbable',
	},
};

export const WithAction: StoryObj = {
	render: (args) => {
		return {
			props: {
				config: args,
			},
			template: `
<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog with action</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>
			Template driven header
			<ng-container dialogHeaderAction>
				<button luButton="ghost" size="S"><lu-icon icon="menuDots" alt="More options" /></button>
			</ng-container>
		</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'S',
		alert: false,
		mode: 'default',
	},
};

export const Fancy: StoryObj = {
	argTypes: {
		mode: { table: { disable: true } },
		alert: { table: { disable: true } },
		autoFocus: { table: { disable: true } },
		panelClasses: { table: { disable: true } },
	},
	render: (args) => {
		const fancyIllustrationParam = args['fancyIllustration'] ? ` fancyIllustration="${args['fancyIllustration']}"` : ``;
		const fancyIllustrationURLParam = args['fancyIllustrationUrl'] ? ` fancyIllustrationUrl="${args['fancyIllustrationUrl']}"` : ``;
		return {
			props: {
				config: args,
			},
			template: `
<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="{mode: 'fancy'}">Open Template-driven Fancy Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog${fancyIllustrationParam}${fancyIllustrationURLParam}>
		<lu-dialog-header>
			<h1>Félicitations, votre souscription est terminée</h1>
		</lu-dialog-header>
		<lu-dialog-content>Votre contrat signé vous a été envoyé par email.</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton="outlined" luDialogClose>Fermer</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>`,
		};
	},
	args: {
		size: 'M',
		alert: false,
		mode: 'fancy',
		fancyIllustration: 'install',
		fancyIllustrationUrl: '',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByRole('button');

	await step('Keyboard interactions', async () => {
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await userEvent.keyboard('{Enter}');
		await expect(screen.queryByText('dialog')).toBeNull();
	});

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with dialog cross
		await userEvent.click(screen.getAllByRole('button')[0]);
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with confirm button
		await userEvent.click(screen.getAllByRole('button')[1]);
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with cancel button
		await userEvent.click(screen.getAllByRole('button')[2]);
		await expect(screen.queryByText('dialog')).toBeNull();
	});
});
