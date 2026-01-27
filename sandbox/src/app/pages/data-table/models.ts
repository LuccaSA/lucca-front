export interface Task {
	id: number;
	name: string;
	status: TaskStatus;
	user: { firstName: string; lastName: string };
	dueDate: Date;
}

export type TaskStatus = 'Completed' | 'InProgress' | 'Late';

export interface TaskGroup {
	groupName: string;
	isExpanded: boolean;
	tasks: Task[];
}
