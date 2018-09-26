import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-tooltip-basic',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoTooltipBasicComponent implements OnInit {
	tooltipContent = `<b>Texte en gras</b>`;
	constructor() {}

	ngOnInit() {}
}
