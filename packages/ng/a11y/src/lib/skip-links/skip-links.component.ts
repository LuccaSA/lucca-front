import { AfterViewInit, ChangeDetectionStrategy, Component, EmbeddedViewRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuSkipLinksComponent implements AfterViewInit {
	id = 'top';
	@ViewChild('content', { static: true, read: TemplateRef }) contentTpl: TemplateRef<unknown>;
	#embeddedViewRef: EmbeddedViewRef<unknown>;

	constructor(private viewContainerRef: ViewContainerRef) {}

	ngAfterViewInit() {
		if (document.getElementById(this.id)) {
			return;
		}
		this.#embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.contentTpl);
		this.#embeddedViewRef.detectChanges();
		const nodes = Array.from<Node>(this.#embeddedViewRef.rootNodes).reverse();
		// on inverse le tableau pour les restituer les nœuds DOM dans le même ordre
		nodes.forEach((e) => document.body.prepend(e));
	}

	anchor(hash: string, e: Event) {
		document.location.hash = ''; // FIXME avoids a bug but kinda ugly
		document.location.hash = hash;
		e.preventDefault();
	}
}
