import { Component } from '@angular/core';

@Component({
	selector: 'sand-user-v4',
	templateUrl: './user-v4.component.html'
})
export class UserV4Component {
	user = null;
	fields = 'id,firstName,lastName,culture.code';
}
