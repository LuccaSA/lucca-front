import { finn, jake, marceline } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { ILuUser, LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { LuUserPopoverStore } from '@lucca-front/ng/user-popover/service/user-popover.store';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { of } from 'rxjs';

type NamePartFormat = 'full' | 'abbreviated' | 'hidden';
type UserChoice = 'finn' | 'marceline' | 'jake';

const users: Record<UserChoice, ILuUser> = {
	finn,
	marceline,
	jake,
};

type UserTileStoryArgs = Omit<LuUserTileComponent, 'displayFormat'> & {
	selectedUser: UserChoice;
	withPopover: boolean;
	firstNameFormat: NamePartFormat;
	lastNameFormat: NamePartFormat;
	lastNameFirst: boolean;
};

function getDisplayFormat(args: Pick<UserTileStoryArgs, 'firstNameFormat' | 'lastNameFormat' | 'lastNameFirst'>) {
	if (args.firstNameFormat === 'hidden' && args.lastNameFormat === 'hidden') {
		return null;
	}

	if (args.firstNameFormat === 'hidden') {
		return args.lastNameFormat === 'abbreviated' ? 'L' : 'l';
	}

	if (args.lastNameFormat === 'hidden') {
		return args.firstNameFormat === 'abbreviated' ? 'F' : 'f';
	}

	const firstNameToken = args.firstNameFormat === 'abbreviated' ? 'F' : 'f';
	const lastNameToken = args.lastNameFormat === 'abbreviated' ? 'L' : 'l';

	return args.lastNameFirst ? `${lastNameToken}${firstNameToken}` : `${firstNameToken}${lastNameToken}`;
}

const meta: Meta<UserTileStoryArgs> = {
	title: 'Documentation/Users/Tile/Angular/Basic',
	component: LuUserTileComponent,
	decorators: [
		moduleMetadata({
			imports: [LuUserTileComponent, LuUserPopoverDirective],
		}),
		applicationConfig({
			providers: [
				provideHttpClient(),
				{
					provide: LuUserPopoverStore,
					useValue: {
						get: (id: number) =>
							of({
								...(Object.values(users).find((user) => user.id === id) ?? finn),
								leaveEndIsFirstHalfDay: false,
								pictureHref: (Object.values(users).find((user) => user.id === id) ?? finn).pictureHref ?? (Object.values(users).find((user) => user.id === id) ?? finn).picture?.href,
							}),
					},
				},
			],
		}),
	],
	render: (args) => {
		const selectedUser = users[args.selectedUser];
		const resolvedDisplayFormat = getDisplayFormat(args);
		const size = args.size === 'M' ? '' : ` size="${args.size}"`;
		const role = args.role ? ` role="${args.role}"` : '';
		const displayFormat = !resolvedDisplayFormat || resolvedDisplayFormat === 'lf' ? '' : ` displayFormat="${resolvedDisplayFormat}"`;
		const user = resolvedDisplayFormat ? selectedUser : { ...selectedUser, firstName: '', lastName: '' };

		if (args.withPopover) {
			return {
				props: {
					...args,
					selectedUser,
					user,
				},
				template: `
		<button [luUserPopover]="selectedUser" type="button" class="userPopover_trigger">
			<lu-user-tile [user]="user"${size}${role}${displayFormat} />
		</button>

`,
			};
		} else {
			return {
				props: {
					...args,
					selectedUser,
					user,
				},
				template: `<lu-user-tile [user]="user"${size}${role}${displayFormat} />
`,
			};
		}
	},
};

export default meta;

export const Basic: StoryObj<UserTileStoryArgs> = {
	args: {
		selectedUser: 'finn',
		size: 'M',
		role: '',
		firstNameFormat: 'full',
		lastNameFormat: 'full',
		lastNameFirst: true,
		withPopover: false,
	},
	argTypes: {
		selectedUser: {
			description: '[Story] Utilisateur affiché.',
			options: ['finn', 'marceline', 'jake'],
			control: {
				type: 'select',
			},
		},
		size: {
			description: 'Taille du composant.',
			options: ['XS', 'S', 'M', 'L'],
			control: {
				type: 'select',
			},
		},
		role: {
			description: 'Rôle de l’utilisateur affiché sous son nom.',
			control: {
				type: 'text',
			},
		},
		firstNameFormat: {
			description: '[Story] Format d’affichage du prénom.',
			options: ['full', 'abbreviated', 'hidden'],
			control: {
				type: 'select',
			},
		},
		lastNameFormat: {
			description: '[Story] Format d’affichage du nom de famille.',
			options: ['full', 'abbreviated', 'hidden'],
			control: {
				type: 'select',
			},
		},
		lastNameFirst: {
			description: '[Story] Affiche le nom de famille avant le prénom.',
			control: {
				type: 'boolean',
			},
		},
		withPopover: {
			description: '[Story] Affiche UserPopover au survol du composant.',
			control: {
				type: 'boolean',
			},
		},
	},
};
