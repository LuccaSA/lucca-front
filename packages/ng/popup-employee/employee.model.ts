interface LuEmployeeCardDepartment {
    id: number,
    name: string,
}

interface LuEmployeeCardArea {
    id: number,
    name: string,
}

interface LuEmployeeCardWorkLocation {
    id: number,
    name: string,
    color?: string,
    area: LuEmployeeCardArea
}

interface LuEmployeeCardLinks {
    schedule?: EntityLinks,
    hrCard?: EntityLinks,
}

interface EntityLinks {
    href: string,
}

export interface LuEmployeeCard {
    id: number,
    firstName: string,
    lastName: string,
    userDepartment?: LuEmployeeCardDepartment,
    jobTitle?: string,
    pictureHref?: string,
    isWorkingNow?: boolean,
    leaveEndsOn?: Date,
    leaveEndIsFirstHalfDay: boolean,
    currentWorkLocation?: LuEmployeeCardWorkLocation,
    dtContractStart?: Date,
    dtContractEnd?: Date,
    _links?: LuEmployeeCardLinks
}