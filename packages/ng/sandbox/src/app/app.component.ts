import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AppLayoutComponent],
	templateUrl: './app.component.html',
})
export class App {
	protected title = 'sandbox';
}
