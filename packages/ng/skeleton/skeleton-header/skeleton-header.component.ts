import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lu-skeleton-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './skeleton-header.component.html',
	styleUrl: './skeleton-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonHeaderComponent {}
