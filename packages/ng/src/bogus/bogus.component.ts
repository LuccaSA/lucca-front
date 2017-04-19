import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


/**
 * This is a bogus component with bogus documentation
 */
@Component({
	/* tslint:disable */
	selector: 'lu-bogus',
	/* tslint:enable */
	templateUrl: './bogus.component.html',
	styleUrls: ['./bogus.component.scss']
})
export class BogusComponent implements OnInit {

	/**
	 * a bogus input
	 */
	@Input() bogusInput = 0;
	/**
	 * another bogus input
	 */
	@Input() bogusLol = 'rofl';
	/**
	 * a bogus output
	 */
	@Output() bougusOutput = new EventEmitter<any>();

	lol = 'mdr';
	constructor() { }

	ngOnInit() {
	}

}
