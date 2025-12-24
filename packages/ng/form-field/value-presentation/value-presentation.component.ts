import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'lu-value-presentation',
	imports: [NgTemplateOutlet],
	templateUrl: './value-presentation.component.html',
	styleUrl: './value-presentation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePresentationComponent {
	readonly template = input<TemplateRef<unknown>>();
}
