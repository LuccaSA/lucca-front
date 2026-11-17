import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { provideLuEmbedded } from './provide-embedded';

@Component({
	selector: 'lu-embedded-dialog-content',
	template: 'dialog',
	styles: '.embeddedDialogMarker { color: red; }',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogContentComponent {}

@Component({
	selector: 'lu-embedded-child',
	template: 'child',
	styles: '.embeddedChildMarker { color: red; }',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChildComponent {}

@Component({
	selector: 'lu-embedded-root',
	template: '{{ moduleId() }}<lu-embedded-child />',
	styles: '.embeddedRootMarker { color: red; }',
	imports: [ChildComponent],
	encapsulation: ViewEncapsulation.ShadowDom,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RootComponent {
	readonly moduleId = input<string | null>(null);
}

const documentStylesheet = 'data:text/css,';

const headStyles = () => [...document.head.querySelectorAll('style')].map((style) => style.textContent ?? '').join('\n');
const shadowStyles = (element: Element) => [...(element.shadowRoot?.querySelectorAll('style') ?? [])].map((style) => style.textContent ?? '').join('\n');

describe('provideLuEmbedded', () => {
	let tagIndex = 0;
	let app: ApplicationRef;
	let element: HTMLElement;

	async function mount(options?: Parameters<typeof provideLuEmbedded>[0]): Promise<void> {
		app = await createApplication({ providers: [provideLuEmbedded(options), provideLuDialog()] });
		const tagName = `lu-embedded-test-${tagIndex++}`;
		customElements.define(tagName, createCustomElement(RootComponent, { injector: app.injector }));
		element = document.createElement(tagName);
		element.setAttribute('module-id', 'pagga');
		document.body.appendChild(element);
		await vi.waitFor(() => expect(element.shadowRoot?.textContent).toContain('pagga'));
	}

	afterEach(() => {
		element.remove();
		app.destroy();
		document.head.querySelectorAll(`link[href="${documentStylesheet}"]`).forEach((link) => link.remove());
	});

	it('should keep the styles of the application in its shadow root', async () => {
		await mount();

		expect(shadowStyles(element)).toContain('embeddedRootMarker');
		expect(shadowStyles(element)).toContain('embeddedChildMarker');
		expect(headStyles()).not.toContain('embeddedRootMarker');
		expect(headStyles()).not.toContain('embeddedChildMarker');
	});

	it('should keep the styles out of the page when a dialog opens', async () => {
		await mount();

		app.injector.get(LuDialogService).open({ content: DialogContentComponent });
		await app.whenStable();

		expect(element.shadowRoot!.querySelector('lu-embedded-dialog-content')).not.toBeNull();
		expect(shadowStyles(element)).toContain('embeddedDialogMarker');
		expect(headStyles()).not.toContain('embeddedDialogMarker');
		expect(headStyles()).not.toContain('embeddedChildMarker');
	});

	it('should create the overlay container inside the shadow root', async () => {
		await mount();

		expect(app.injector.get(OverlayContainer).getContainerElement().parentNode).toBe(element.shadowRoot);
	});

	it('should add the document stylesheet to the page once', async () => {
		await mount({ documentStylesheet });
		const firstElement = element;
		await mount({ documentStylesheet });
		firstElement.remove();

		expect(document.head.querySelectorAll(`link[href="${documentStylesheet}"]`)).toHaveLength(1);
	});
});
