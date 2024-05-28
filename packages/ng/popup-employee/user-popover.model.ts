interface LuUserPopoverDepartment {
	id: number;
	name: string;
}

interface LuEmployeeCardArea {
	id: number;
	name: string;
}

interface LuUserPopoverWorkLocation {
	id: number;
	name: string;
	color?: string;
	area: LuEmployeeCardArea;
}

interface LuUserPopoverLinks {
	schedule?: EntityLinks;
	hrCard?: EntityLinks;
}

interface EntityLinks {
	href: string;
}

export interface LuUserPopover {
	id: number;
	firstName: string;
	lastName: string;
	userDepartment?: LuUserPopoverDepartment;
	jobTitle?: string;
	pictureHref?: string;
	isWorkingNow?: boolean;
	leaveEndsOn?: Date;
	leaveEndIsFirstHalfDay: boolean;
	currentWorkLocation?: LuUserPopoverWorkLocation;
	dtContractStart?: Date;
	dtContractEnd?: Date;
	_links?: LuUserPopoverLinks;
}
