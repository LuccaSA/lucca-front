import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Directive',
	component: LuDropdownTriggerDirective,
	decorators: [],
} as Meta;

const Template = (args) => ({
	props: args,
	moduleMetadata: {
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
	},
	template: `<button type="button" luButton disclosure [luDropdown]="dropdownSample">Dropdown<lu-icon icon="arrowChevronBottom" /></button>

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
</ng-template>`,
});

export const Directive: StoryObj = {
	args: {},
	render: Template,
};

Directive.parameters = {
	controls: { include: [] },
};
