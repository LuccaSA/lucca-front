import { Component } from '@angular/core';

@Component({
	selector: 'lu-refacto-overlay-advanced',
	templateUrl: './refacto-overlay-advanced.component.html'
})
export class RefactoOverlayAdvancedComponent {
	onOpen() {
		console.log('onopen')
	}
	onClose() {
		console.log('onclose')
	}
}
