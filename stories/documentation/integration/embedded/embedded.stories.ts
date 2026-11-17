import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { provideLuEmbedded } from '@lucca-front/ng/embedded';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular-vite';
import documentStylesheet from './embedded-document.scss?url';

@Component({
	selector: 'sb-embedded-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Dialog of the embedded application</lu-dialog-header>
			<lu-dialog-content>Its overlay and its styles live in the shadow root of the application.</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="button" luButton luDialogDismiss>Close</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, DialogDismissDirective, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmbeddedDialogComponent {}

@Component({
	selector: 'sb-embedded-app',
	template: `
		<p>Embedded application, built with the <code>cleemy</code> product palette</p>
		<button type="button" luButton (click)="openDialog()"><lu-icon icon="heart" />Open a dialog</button>
	`,
	styleUrl: './embedded-app.scss',
	encapsulation: ViewEncapsulation.ShadowDom,
	imports: [ButtonComponent, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmbeddedAppComponent {
	readonly #dialog = inject(LuDialogService);

	openDialog(): void {
		this.#dialog.open({ content: EmbeddedDialogComponent, size: 'S' });
	}
}

void createApplication({ providers: [provideLuEmbedded({ documentStylesheet }), provideLuDialog()] }).then((app) => {
	if (!customElements.get('sb-embedded-app')) {
		customElements.define('sb-embedded-app', createCustomElement(EmbeddedAppComponent, { injector: app.injector }));
	}
});

@Component({
	selector: 'sb-embedded-host',
	template: `
		<p>Host page, with its own Lucca Front styles</p>
		<button type="button" luButton>Button of the page</button>
		<sb-embedded-app class="pr-u-displayBlock pr-u-marginBlockStart200" />
	`,
	imports: [ButtonComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmbeddedHostComponent {}

export default {
	title: 'Documentation/Integration/Embedded',
	component: EmbeddedHostComponent,
	parameters: {
		docs: {
			description: {
				component: `For a component shipped to many host pages (banner, assistant…) with its own Angular and Lucca Front versions: a custom element built with \`createCustomElement\` from \`@angular/elements\`, whose root component uses \`ViewEncapsulation.ShadowDom\`, in an application configured with \`provideLuEmbedded\` from \`@lucca-front/ng/embedded\`. The styles of the application, its overlays and its dialogs stay in the shadow root.

The root component loads the embedded stylesheet:

\`\`\`scss
@use '@lucca-front/scss/src/commons/config' with ($isEmbedded: true, $fontFamilyPrefix: 'Banner ');
@use '@lucca-front/icons/src/commons/config' as icons with ($isEmbedded: true, $font-name: 'Banner Lucca icons');
@use '@lucca-front/ng/src/embedded';
\`\`\`

The fonts and the page scroll blocking cannot apply from a shadow root: \`@lucca-front/ng/src/embedded-document\`, compiled with the same configuration into a separate stylesheet, goes to the page through \`provideLuEmbedded({ documentStylesheet })\`.

The application reads \`--commons-pushPanel-inlineSize\`, the inline space reserved by a docked panel, from the page.`,
			},
		},
	},
} as Meta;

export const Basic: StoryObj<EmbeddedHostComponent> = {};
