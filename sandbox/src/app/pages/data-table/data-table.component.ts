import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuUserModule } from '@lucca-front/ng/user';

interface Task {
	id: number;
	name: string;
	status: 'completed' | 'in-progress' | 'late';
	user: { firstName: string; lastName: string };
	dueDate: Date;
}

interface TaskGroup {
	groupName: string;
	tasks: Task[];
}

@Component({
	selector: 'app-data-table-page',
	imports: [MainLayoutComponent, ButtonComponent, LuUserModule],
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
					status: 'in-progress',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-11-15'),
				},
				{
					id: 2,
					name: 'S’assigner un objectif PLG',
					status: 'completed',
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
					status: 'completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-10-03'),
				},
				{
					id: 4,
					name: 'Initialiser une SPA',
					status: 'completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-10-03'),
				},
				{
					id: 5,
					name: 'Penser à créer une route',
					status: 'completed',
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
					status: 'completed',
					user: { firstName: 'Marie', lastName: 'Bragoulet' },
					dueDate: new Date('2025-09-03'),
				},
			],
		},
	];
}
