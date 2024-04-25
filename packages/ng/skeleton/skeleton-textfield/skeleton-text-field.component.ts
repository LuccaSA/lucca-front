import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lu-skeleton-text-field',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './skeleton-text-field.component.html',
	styleUrl: './skeleton-text-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTextFieldComponent {}
