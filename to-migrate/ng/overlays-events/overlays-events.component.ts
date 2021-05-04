import { Component } from '@angular/core';

@Component({
	selector: 'sand-overlays-events',
	templateUrl: './overlays-events.component.html'
})
export class OverlaysEventsComponent {
	item;
	user;
	department;
	date;
	onOpen() {
		console.log('on open')
	}
	onClose() {
		console.log('on close')
	}
	debug() {
		console.log('debug');
	}
}
