import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective, luBooleanAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ButtonComponent } from '@lucca/prisme/button';
import { FieldsetSize } from './fieldset.type';

let nextId = 0;

@Component({
	selector: 'lu-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrl: './fieldset.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, NgTemplateOutlet, IconComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetComponent {
	readonly heading = input<PortalContent | null>(null);
	readonly helper = input<PortalContent | null>(null);
	readonly action = input<PortalContent | null>(null);
	readonly size = input<FieldsetSize | null>(null);
	readonly horizontal = input(false, { transform: luBooleanAttribute });
	readonly expandable = input(false, { transform: luBooleanAttribute });
	readonly hiddenLegend = input(false, { transform: luBooleanAttribute });

	readonly expanded = model(false);

	id = `fieldsetTitleContent${nextId++}`;
}
