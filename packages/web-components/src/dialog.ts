import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ElementRef, EnvironmentInjector, inject, Injector, ViewEncapsulation } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';
import { firstValueFrom } from 'rxjs';
import { ELEMENT_COMPONENT, ElementComponentHost } from './element-component';

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
