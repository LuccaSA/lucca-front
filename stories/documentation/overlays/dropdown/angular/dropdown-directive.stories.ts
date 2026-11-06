import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export interface DropdownBasicStory {
	luDropdownPosition: PopoverPosition;
	luDropdownDisabled: boolean;
}

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Directive',
	component: LuDropdownTriggerDirective,
	decorators: [
		moduleMetadata({
			imports: [
				IconComponent,
				ButtonComponent,
				DropdownItemComponent,
				DropdownActionComponent,
				DropdownDividerComponent,
				DropdownGroupComponent,
				IconComponent,
				LuDropdownTriggerDirective,
				DropdownMenuComponent,
			],
		}),
	],
	argTypes: {
		luDropdownPosition: {
			description: 'Modifie la position du dropdown par rapport à son déclencheur.',
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
			table: { category: 'inputs', defaultValue: { summary: 'below' } },
		},
		luDropdownDisabled: {
			description: 'Empêche le dropdown de s’ouvrir.',
			control: 'boolean',
			table: { category: 'inputs' },
		},
		customPositions: {
			description: 'Liste de positions personnalisées (`ConnectionPositionPair[]`) qui remplace `luDropdownPosition`.',
			control: false,
			table: { category: 'inputs', type: { summary: 'ConnectionPositionPair[]' } },
		},
		disabled: {
			description: 'Désactive l’action : elle ne peut plus être déclenchée et ne ferme pas le dropdown. Utilisé dans le template de la story.',
			control: false,
			table: { category: 'inputs (dropdown-action)', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		critical: {
			description: 'Applique un style critique à l’action (ex. suppression). Utilisé dans le template de la story.',
			control: false,
			table: { category: 'inputs (dropdown-action)', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		label: {
			description: 'Libellé du groupe d’actions. Utilisé dans le template de la story.',
			control: false,
			table: { category: 'inputs (dropdown-group)', type: { summary: 'string' } },
		},
		luDropdownOnOpen: {
			description: "Événement déclenché à l'ouverture du dropdown.",
			action: 'luDropdownOnOpen',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		luDropdownOnClose: {
			description: 'Événement déclenché à la fermeture du dropdown.',
			action: 'luDropdownOnClose',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
	},
} as Meta;

function getTemplate(args: DropdownBasicStory): string {
	const direction = args.luDropdownPosition !== 'below' ? ` luDropdownPosition="${args.luDropdownPosition}"` : ``;
	const disabled = args.luDropdownDisabled ? ` luDropdownDisabled` : ``;
	return `<div class="demo">
	<button type="button" luButton disclosure [luDropdown]="dropdownSample"${direction}${disabled} (luDropdownOnOpen)="luDropdownOnOpen()" (luDropdownOnClose)="luDropdownOnClose()">Dropdown<lu-icon icon="arrowChevronBottom" /></button>
	<ng-template #dropdownSample>
		<lu-dropdown-menu>
			<lu-dropdown-item>
				<button lu-dropdown-action type="button">
					<lu-icon icon="heart" />
					Lorem
				</button>
			</lu-dropdown-item>
			<lu-dropdown-item>
				<button lu-dropdown-action disabled type="button">
					<lu-icon icon="cross" />
					Lorem
				</button>
			</lu-dropdown-item>
			<lu-dropdown-divider />
			<lu-dropdown-item>
				<button lu-dropdown-action type="button">
					<lu-icon icon="star" />
					Ipsum
				</button>
			</lu-dropdown-item>
			<lu-dropdown-group label="Group">
				<lu-dropdown-item>
					<button lu-dropdown-action type="button">
						<lu-icon icon="buildingHouse" />
						Dolor
					</button>
				</lu-dropdown-item>
				<lu-dropdown-item>
					<a lu-dropdown-action critical href="#">
						<lu-icon icon="trashDelete" />
						Sit amet
					</a>
				</lu-dropdown-item>
				<lu-dropdown-item>
					<span lu-dropdown-action disabled class="dropdown-list-option-action">
						<lu-icon icon="cross" />
						Sit amet
					</span>
				</lu-dropdown-item>
			</lu-dropdown-group>
		</lu-dropdown-menu>
	</ng-template>
</div>`;
}

const Template = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
		display: flex;
		min-block-size: 30rem;
		padding-block-start: 4rem;
		align-items: center;
		justify-content: center;
	}
	`,
	],
});

export const Directive: StoryObj<DropdownBasicStory> = {
	args: {
		luDropdownPosition: 'below',
		luDropdownDisabled: false,
	},
	render: Template,
	argTypes: {},
};
