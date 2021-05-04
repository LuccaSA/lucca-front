import { Component } from '@angular/core';

@Component({
	selector: 'sand-former-employees',
	templateUrl: './former-employees.component.html'
})
export class FormerEmployeesComponent {
	user = { id: 1, firstName: 'john', lastName: 'doe' };
	flag = false;
}
