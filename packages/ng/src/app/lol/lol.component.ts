import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * a short documentation of the component
 */
@Component({
	selector: 'lu-lol', // the selector will be extracted by the documentation script
	templateUrl: './lol.component.html',
	styleUrls: ['./lol.component.scss']
})
export class LuLolComponent implements OnInit {
	/**
	 * a short documentation of the input
	 * the type of the input will be inferred with its default value
	 */
	@Input() myInput = 4;

	/**
	 * a short documentation of the poutput
	 */
	@Output() myOutput = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

}
