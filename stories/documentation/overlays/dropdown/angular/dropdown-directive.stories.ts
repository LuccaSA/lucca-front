import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

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
			description: 'Modifie la position du dropdown par rapport à son déclencheur.',
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
		},
		luDropdownOnOpen: {
			description: "Événement déclenché à l'ouverture du dropdown.",
		},
		luDropdownOnClose: {
			description: 'Événement déclenché à la fermeture du dropdown.',
		},
	},
} as Meta;

function getTemplate(args: DropdownBasicStory): string {
	const direction = args.luPopoverPosition !== 'below' ? ` luDropdownPosition="${args.luPopoverPosition}"` : ``;
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
		luPopoverPosition: 'below',
	},
	render: Template,
	argTypes: {},
};

export const DirectiveTEST = createTestStory(Directive, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: /dropdown/i });

	await step("Vérifie l'état initial", async () => {
		await expect(trigger).toBeVisible();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	await step('Ouvre le dropdown au clic', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getAllByRole('list').at(0)).toBeVisible();
	});

	await step('Les items du menu sont visibles et accessibles', async () => {
		const menu = within(screen.getAllByRole('list').at(0));
		await expect(menu.getByRole('button', { name: 'Ipsum' })).toBeVisible();
		await expect(menu.getByRole('link', { name: /sit amet/i })).toBeVisible();
		const [loremEnabled, loremDisabled] = menu.getAllByRole('button', { name: 'Lorem' });
		await expect(loremEnabled).toBeVisible();
		await expect(loremEnabled).not.toBeDisabled();
		await expect(loremDisabled).toBeDisabled();
	});

	await step('Ferme le dropdown en cliquant sur une action', async () => {
		await userEvent.click(within(screen.getAllByRole('list').at(0)).getByRole('button', { name: 'Ipsum' }));
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	await step('Ouvre le dropdown au clavier (Enter)', async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getAllByRole('list').at(0)).toBeVisible();
	});

	await step('Ferme le dropdown avec Échap et rend le focus au déclencheur', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
		await expect(trigger).toHaveFocus();
	});
});
