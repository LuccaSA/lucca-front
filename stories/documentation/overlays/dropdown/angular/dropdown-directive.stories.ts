import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface DropdownBasicStory {
	luPopoverPosition: PopoverPosition;
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
		luPopoverPosition: {
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
		},
	},
} as Meta;

function getTemplate(args: DropdownBasicStory): string {
	const direction = args.luPopoverPosition !== 'below' ? ` luDropdownPostion="${args.luPopoverPosition}"` : ``;
	return `<div class="demo">
	<button type="button" luButton disclosure [luDropdown]="dropdownSample"${direction}>Dropdown<lu-icon icon="arrowChevronBottom" /></button>
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
		min-block-size: 20rem;
		align-items: center;
		justify-content: center;
	}
	`,
	],
});

export const Directive: StoryObj<DropdownBasicStory> = {
	args: {
		luPopoverPosition: 'below',
	},
	render: Template,
	argTypes: {},
};
