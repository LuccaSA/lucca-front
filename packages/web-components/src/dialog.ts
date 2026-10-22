import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, EnvironmentInjector, inject, Injector, input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogHeaderAction, DialogHeaderComponent, DialogHeaderSubtitle, LuDialogConfig, LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';
import { firstValueFrom } from 'rxjs';
import { ELEMENT_COMPONENT, ELEMENT_PAGE_CONTENT, ElementComponentHost } from './element-component';

/**
 * Options of `LuDialogService.open`, without the content.
 */
export type PrismeDialogConfig = Omit<LuDialogConfig<unknown>, 'content' | 'data' | 'canClose' | 'cdkConfigOverride'>;

export interface PrismeDialogRef {
	/** Closes the dialog with an optional result */
	close(result?: unknown): void;
	/** Dismisses the dialog, as the close button of its header does */
	dismiss(): void;
	/** Resolves with the result when closed, `undefined` when dismissed */
	closed: Promise<unknown>;
}

/**
 * Renders a copy of a `<template>` written by the page, holding the same markup as the Angular template of a dialog
 * (`lu-dialog`, `lu-dialog-header`…). The elements in it inject the dialog ref from this component.
 */
@Component({
	selector: 'lu-web-components-template-dialog',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		style: 'display: contents',
		'(click)': 'onClick($event)',
	},
})
class TemplateDialogComponent {
	readonly #dialogRef = inject(LuDialogRef);

	constructor() {
		const host = inject<ElementRef<HTMLElement & ElementComponentHost>>(ElementRef).nativeElement;
		const component = { injector: inject(Injector), instance: this };
		host[ELEMENT_COMPONENT] = () => component;
		host.append(document.importNode(inject<HTMLTemplateElement>(DIALOG_DATA).content, true));
	}

	// Same attributes as the `luDialogClose` and `luDialogDismiss` directives
	onClick(event: MouseEvent): void {
		const target = event.target as Element;
		if (target.closest('[luDialogClose]')) {
			this.#dialogRef.close(undefined);
		} else if (target.closest('[luDialogDismiss]')) {
			this.#dialogRef.dismiss();
		}
	}
}

/**
 * Moves nodes of the page into its host, before the first render.
 */
@Directive({
	selector: '[luWebComponentsNodes]',
	host: { style: 'display: contents' },
})
export class NodesDirective implements OnInit {
	readonly #host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	readonly nodes = input.required<readonly Node[]>({ alias: 'luWebComponentsNodes' });

	ngOnInit(): void {
		this.#host.append(...this.nodes());
	}
}

const isMarked = (attribute: string) => (node: Node) => node instanceof Element && node.hasAttribute(attribute);

/**
 * `lu-dialog-header` renders its action and subtitle slots when content queries find the `dialogHeaderAction` and
 * `dialogHeaderSubtitle` directives, which page markup does not create: puts the page nodes in elements carrying them.
 */
@Component({
	selector: 'lu-web-components-dialog-header',
	imports: [DialogHeaderComponent, DialogHeaderAction, DialogHeaderSubtitle, NodesDirective],
	template: `
		<lu-dialog-header>
			@if (action.length) {
				<div dialogHeaderAction [luWebComponentsNodes]="action"></div>
			}
			<div [luWebComponentsNodes]="title"></div>
			@if (subtitle.length) {
				<div dialogHeaderSubtitle [luWebComponentsNodes]="subtitle"></div>
			}
			<div dialogHeaderContent [luWebComponentsNodes]="content"></div>
		</lu-dialog-header>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { style: 'display: contents' },
})
export class DialogHeaderElementComponent {
	readonly #nodes = inject(ELEMENT_PAGE_CONTENT);

	protected readonly action = this.#nodes.filter(isMarked('dialogHeaderAction'));
	protected readonly subtitle = this.#nodes.filter(isMarked('dialogHeaderSubtitle'));
	protected readonly content = this.#nodes.filter(isMarked('dialogHeaderContent'));
	protected readonly title = this.#nodes.filter((node) => ![this.action, this.subtitle, this.content].some((slot) => slot.includes(node)));
}

function findTemplate(selector: string | HTMLTemplateElement): HTMLTemplateElement {
	const template = typeof selector === 'string' ? document.querySelector(selector.startsWith('#') ? selector : `#${selector}`) : selector;
	if (!(template instanceof HTMLTemplateElement)) {
		throw new Error(`Prisme.dialog.open: no <template> matches ${String(selector)}`);
	}
	return template;
}

export function createDialogApi(injector: EnvironmentInjector) {
	const dialogService = injector.get(LuDialogService);

	const open = (template: string | HTMLTemplateElement, config: PrismeDialogConfig = {}): PrismeDialogRef => {
		const dialogRef = dialogService.open<TemplateDialogComponent, HTMLTemplateElement>({ ...config, content: TemplateDialogComponent, data: findTemplate(template) });
		return {
			close: (result?: unknown) => dialogRef.close(result as void),
			dismiss: () => dialogRef.dismiss(),
			closed: firstValueFrom(dialogRef.closed$),
		};
	};

	// Like the `luDialogOpen` directive, with the id of a `<template>` as value
	const setHasPopup = () => document.querySelectorAll('[luDialogOpen]').forEach((trigger) => trigger.setAttribute('aria-haspopup', 'dialog'));
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setHasPopup, { once: true });
	} else {
		setHasPopup();
	}
	document.addEventListener('click', (event) => {
		const trigger = (event.target as Element).closest('[luDialogOpen]');
		const id = trigger?.getAttribute('luDialogOpen');
		if (id) {
			open(id);
		}
	});

	return { open };
}
