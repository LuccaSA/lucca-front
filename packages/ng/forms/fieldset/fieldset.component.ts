import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input, model, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

let nextId = 0;

@Component({
	selector: 'lu-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrl: './fieldset.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, NgTemplateOutlet, IconComponent],
})
export class FieldsetComponent {
	heading = input<PortalContent | null>(null);
	helper = input<PortalContent | null>(null);
	size = input<'S' | null>(null);
	horizontal = input(false, { transform: booleanAttribute });
	expandable = input(false, { transform: booleanAttribute });
	expanded = model(false);

	id = `fieldsetTitleContent${nextId++}`;
}
