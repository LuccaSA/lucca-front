import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-resource-card',
	templateUrl: './resource-card.component.html',
	styleUrl: './resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, CdkDragHandle],
	host: {
		class: 'resourceCard',
		role: 'region',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-grid]': 'grid()',
	},
})
export class ResourceCardComponent {
	draggable = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });
	grid = input(false, { transform: booleanAttribute });
	headingLevel = input<'1' | '2' | '3' | '4' | '5' | '6'>('3');
	size = input<'S' | null>(null);
}
