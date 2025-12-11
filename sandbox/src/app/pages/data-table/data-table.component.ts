import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Pipe, PipeTransform, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { Palette } from '@lucca-front/ng/core';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
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

const groupsMock: TaskGroup[] = [
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

@Component({
	selector: 'app-data-table-page',
	imports: [
		MainLayoutComponent,
		ButtonComponent,
		LuUserModule,
		DatePipe,
		LuUserTileComponent,
		StatusBadgeComponent,
		AriaControlsPipe,
		SkeletonIndexTableComponent,
		EmptyStateSectionComponent,
		NumericBadgeComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './data-table.component.html',
})
export class DataTableComponent {
	groups = signal<TaskGroup[]>([]);

	isLoading = signal(true);
	isEmpty = computed(() => this.groups().length === 0);

	// Complètement équivalent à isEmpty
	// isEmpty2 = computed(() => {
	// 	return this.groups().length === 0;
	// });

	tasksCount = computed(() => this.groups().reduce((count, group) => count + group.tasks.length, 0));

	// Complètement équivalent à tasksCount
	// tasksCount2 = computed(() => {
	// 	let count = 0;

	// 	for (const group of this.groups()) {
	// 		// count = count + group.tasks.length;
	// 		count += group.tasks.length;
	// 	}

	// 	return count;
	// });

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

	constructor() {
		setTimeout(() => {
			this.isLoading.set(false);
		}, 1000);
	}

	useGroupMocks() {
		this.groups.set(groupsMock);
	}

	useEmptyGroup() {
		this.groups.set([]);
	}

	toggleLoadingState() {
		this.isLoading.set(!this.isLoading());
	}
}
