import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';

@Component({
	selector: 'app-root',
	imports: [AppLayoutComponent, RouterModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
