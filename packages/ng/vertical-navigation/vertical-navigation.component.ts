import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-vertical-navigation',
	standalone: true,
	templateUrl: './vertical-navigation.component.html',
	styleUrl: './vertical-navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'verticalNavigation',
		'[class.mod-iconless]': 'false',
	},
})
export class VerticalNavigationComponent {
	headingLabel = input.required<string>();
	level = input<number>(3);
}
