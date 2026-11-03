import { NgComponentOutlet } from '@angular/common';
import { HttpInterceptorFn, HttpResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, Injector, input, signal, TemplateRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { POPOVER_CONFIG, PopoverConfig } from '@lucca-front/ng/popover2';
import { ILuUser } from '@lucca-front/ng/user';
import { LU_USER_POPOVER_CUSTOM_CONTENT, LU_USER_POPOVER_USER, LuUserPopoverComponent, LuUserPopoverCustomContentContext } from '@lucca-front/ng/user-popover';
import { LU_RANDOM } from '@lucca/prisme/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { NEVER, of } from 'rxjs';

// Mirrors the (non-exported) LuUserPopover model returned by the employee profile card API
interface EmployeeMock extends ILuUser {
	userDepartment?: { id: number; name: string };
	isWorkingNow?: boolean;
	leaveEndsOn?: Date;
	leaveEndIsFirstHalfDay: boolean;
	currentWorkLocation?: { id: number; name: string; area?: { id: number; name: string } };
	dtContractStart?: Date;
	dtContractEnd?: Date;
	_links?: { schedule?: { href: string }; hrCard?: { href: string } };
}

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

const inContract = {
	dtContractStart: new Date(2020, 0, 1),
	_links: { schedule: { href: '#' } },
};

const employees: EmployeeMock[] = [
	{ id: 1, firstName: 'Chloé', lastName: 'Alibert', jobTitle: 'Technician', userDepartment: { id: 1, name: 'After-sales service' }, isWorkingNow: true, leaveEndIsFirstHalfDay: false, ...inContract },
	{
		id: 2,
		firstName: 'Finn',
		lastName: 'Mertens',
		jobTitle: 'Hero',
		userDepartment: { id: 2, name: 'Adventurers' },
		pictureHref: 'https://cdn.lucca.fr/lucca-front/avatars/finn.png',
		isWorkingNow: true,
		leaveEndIsFirstHalfDay: false,
		...inContract,
	},
	{
		id: 3,
		firstName: 'Jake',
		lastName: 'Dog',
		jobTitle: 'Hero',
		pictureHref: 'https://cdn.lucca.fr/lucca-front/avatars/not-found.png',
		isWorkingNow: true,
		leaveEndIsFirstHalfDay: false,
		...inContract,
	},
	{
		id: 4,
		firstName: 'Marceline',
		lastName: 'Abadeer',
		jobTitle: 'Vampire queen',
		isWorkingNow: true,
		leaveEndIsFirstHalfDay: false,
		...inContract,
		_links: { schedule: { href: '#' }, hrCard: { href: '#' } },
	},
	{ id: 5, firstName: 'Bonnibel', lastName: 'Bubblegum', leaveEndIsFirstHalfDay: false },
	{
		id: 6,
		firstName: 'Maximilienne-Alexandrine',
		lastName: 'De La Rochefoucauld-Montmorency',
		jobTitle: 'Senior international business development and partnerships manager',
		userDepartment: { id: 3, name: 'Strategic partnerships and international business development' },
		isWorkingNow: true,
		currentWorkLocation: { id: 1, name: 'Headquarters building', area: { id: 1, name: 'Third floor, east wing, open space' } },
		leaveEndIsFirstHalfDay: false,
		...inContract,
	},
	{
		id: 7,
		firstName: 'Simon',
		lastName: 'Petrikov',
		jobTitle: 'Wizard',
		isWorkingNow: true,
		currentWorkLocation: { id: 2, name: 'Ice Kingdom', area: { id: 2, name: 'Floor 2' } },
		leaveEndIsFirstHalfDay: false,
		...inContract,
	},
	{ id: 8, firstName: 'Phoebe', lastName: 'Flame', jobTitle: 'Princess', isWorkingNow: true, currentWorkLocation: { id: 3, name: 'Fire Kingdom' }, leaveEndIsFirstHalfDay: false, ...inContract },
	{ id: 9, firstName: 'Lumpy', lastName: 'Space', jobTitle: 'Princess', isWorkingNow: false, leaveEndIsFirstHalfDay: false, ...inContract },
	{ id: 10, firstName: 'Ice', lastName: 'King', jobTitle: 'King', isWorkingNow: false, leaveEndsOn: new Date(2099, 1, 28), leaveEndIsFirstHalfDay: false, ...inContract },
	{ id: 11, firstName: 'Fionna', lastName: 'Campbell', jobTitle: 'Hero', isWorkingNow: false, leaveEndsOn: new Date(2099, 1, 28), leaveEndIsFirstHalfDay: true, ...inContract },
	{ id: 12, firstName: 'Cake', lastName: 'Cat', jobTitle: 'Hero', isWorkingNow: false, leaveEndsOn: today, leaveEndIsFirstHalfDay: false, ...inContract },
	{ id: 13, firstName: 'Marshall', lastName: 'Lee', jobTitle: 'Vampire king', isWorkingNow: false, leaveEndsOn: today, leaveEndIsFirstHalfDay: true, ...inContract },
	{ id: 14, firstName: 'Peppermint', lastName: 'Butler', jobTitle: 'Butler', isWorkingNow: false, leaveEndsOn: tomorrow, leaveEndIsFirstHalfDay: false, ...inContract },
	{ id: 15, firstName: 'Tree', lastName: 'Trunks', jobTitle: 'Farmer', isWorkingNow: false, leaveEndsOn: tomorrow, leaveEndIsFirstHalfDay: true, ...inContract },
	{ id: 16, firstName: 'Gunter', lastName: 'Penguin', jobTitle: 'Penguin', dtContractStart: new Date(2099, 4, 3), leaveEndIsFirstHalfDay: false },
	{ id: 17, firstName: 'Betty', lastName: 'Grof', jobTitle: 'Researcher', dtContractStart: new Date(2010, 0, 1), dtContractEnd: new Date(2020, 11, 31), leaveEndIsFirstHalfDay: false },
	{ id: 18, firstName: 'Lady', lastName: 'Rainicorn', jobTitle: 'Translator', isWorkingNow: true, leaveEndIsFirstHalfDay: false, ...inContract },
];

// Responds to LuUserPopoverStore requests with the mocks above, and never responds for unknown ids (loading state)
const mockEmployeeProfileCardApi: HttpInterceptorFn = (req, next) => {
	const match = req.url.match(/\/work-locations\/api\/employee-profile-card\/(\d+)$/);
	if (!match) {
		return next(req);
	}
	const employee = employees.find(({ id }) => id === Number(match[1]));
	return employee ? of(new HttpResponse({ status: 200, body: employee })) : NEVER;
};

// Renders the popover panel inline, without its trigger
@Component({
	selector: 'user-popover-panel',
	imports: [NgComponentOutlet],
	template: `<div class="popover">
		<div class="popover-content"><ng-container *ngComponentOutlet="component; injector: injector()" /></div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserPopoverPanelComponent {
	readonly userId = input.required<number>();
	readonly customContent = input<TemplateRef<LuUserPopoverCustomContentContext> | null>(null);

	readonly component = LuUserPopoverComponent;
	readonly #injector = inject(Injector);

	readonly injector = computed(() => {
		const user: ILuUser = employees.find(({ id }) => id === this.userId()) ?? { id: this.userId(), firstName: '', lastName: '' };
		return Injector.create({
			parent: this.#injector,
			providers: [
				{ provide: LU_USER_POPOVER_USER, useValue: signal(user).asReadonly() },
				{ provide: LU_USER_POPOVER_CUSTOM_CONTENT, useValue: this.customContent },
				{ provide: POPOVER_CONFIG, useValue: { ref: { updatePosition: () => {} } } as unknown as PopoverConfig },
				{ provide: LU_RANDOM, useValue: () => 0.5 },
			],
		});
	});
}

@Component({
	selector: 'user-popover-stories',
	templateUrl: './user-popover.stories.html',
	imports: [UserPopoverPanelComponent],
	styles: [
		`
			.popover {
				inline-size: fit-content;
				block-size: fit-content;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserPopoverStory {}

export default {
	title: 'QA/UserPopover',
	component: UserPopoverStory,
	decorators: [applicationConfig({ providers: [provideHttpClient(withInterceptors([mockEmployeeProfileCardApi])), provideRouter([])] })],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<UserPopoverStory> = {
	args: {},
	render: template,
};
