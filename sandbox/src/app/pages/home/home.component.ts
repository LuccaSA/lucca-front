import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';

@Component({
	selector: 'app-home',
	imports: [RouterLink, MainLayoutComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
