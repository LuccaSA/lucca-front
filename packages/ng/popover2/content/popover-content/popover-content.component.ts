import { AfterViewInit, ChangeDetectionStrategy, Component, contentChildren, effect, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
	selector: 'lu-popover-content',
	standalone: true,
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent, NgIf],
	templateUrl: './popover-content.component.html',
	styleUrl: './popover-content.component.scss',
	host: {
		class: '',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent {
	content!: TemplateRef<unknown>;

	ref!: OverlayRef;

	children = contentChildren('button', { descendants: true });

	test = effect(() => {
		const content = this.children();
		console.log(content);
	});

	close(): void {
		this.ref.detach();
	}
}
