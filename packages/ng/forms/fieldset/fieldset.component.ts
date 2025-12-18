import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

let nextId = 0;

@Component({
	selector: 'lu-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrl: './fieldset.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, NgTemplateOutlet, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetComponent {
	readonly heading = input<PortalContent | null>(null);
	readonly helper = input<PortalContent | null>(null);
	readonly action = input<PortalContent | null>(null);
	readonly size = input<'S' | null>(null);
	readonly horizontal = input(false, { transform: booleanAttribute });
	readonly expandable = input(false, { transform: booleanAttribute });

	expanded = model(false);

	id = `fieldsetTitleContent${nextId++}`;
}
