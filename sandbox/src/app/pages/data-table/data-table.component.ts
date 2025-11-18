import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { Palette } from '@lucca-front/ng/core';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { LuUserModule, LuUserTileComponent } from '@lucca-front/ng/user';

interface Task {
	id: number;
	name: string;
	status: TaskStatus;
	user: { firstName: string; lastName: string };
	dueDate: Date;
}

type TaskStatus = 'Completed' | 'InProgress' | 'Late';

interface TaskGroup {
	groupName: string;
	tasks: Task[];
}

@Pipe({
	name: 'ariaControls',
})
export class AriaControlsPipe implements PipeTransform {
	transform(group: TaskGroup, groupId: string): string {
		return group.tasks.map((_, index) => `${groupId}-row-${index}`).join(' ');
	}
}

@Component({
	selector: 'app-data-table-page',
	imports: [MainLayoutComponent, ButtonComponent, LuUserModule, DatePipe, LuUserTileComponent, StatusBadgeComponent, AriaControlsPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './data-table.component.html',
})
export class DataTableComponent {
	groups: TaskGroup[] = [
		{
			groupName: 'Novembre 2025',
			tasks: [
				{
					id: 1,
					name: 'Créer une micro interaction',
					status: 'InProgress',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-11-15'),
				},
				{
					id: 2,
					name: 'S’assigner un objectif PLG',
					status: 'Completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-11-03'),
				},
			],
		},
		{
			groupName: 'Octobre 2025',
			tasks: [
				{
					id: 3,
					name: 'Créer une route',
					status: 'Completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-10-03'),
				},
				{
					id: 4,
					name: 'Initialiser une SPA',
					status: 'InProgress',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-10-03'),
				},
				{
					id: 5,
					name: 'Penser à créer une route',
					status: 'Completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-10-03'),
				},
			],
		},

		{
			groupName: 'Septembre 2025',
			tasks: [
				{
					id: 6,
					name: 'Penser à initialiser une SPA',
					status: 'Late',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-09-03'),
				},
			],
		},
	];

	paletteByStatus: Record<TaskStatus, Palette> = {
		Late: 'error',
		InProgress: 'product',
		Completed: 'success',
	};

	labelByStatus: Record<TaskStatus, string> = {
		Late: 'En retard',
		InProgress: 'En cours',
		Completed: 'Terminé',
	};
}
