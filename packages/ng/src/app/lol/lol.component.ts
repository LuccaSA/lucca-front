import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Translations } from './translate/lol.translate';
import {LuTranslateService} from '../shared/translation.service';

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

	constructor(public translateService: LuTranslateService) {
		translateService.setTranslations(Translations);
	}

	ngOnInit() { }

}
