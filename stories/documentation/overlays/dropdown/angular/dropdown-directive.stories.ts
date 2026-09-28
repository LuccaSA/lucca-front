import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, fn, Mock, userEvent, waitFor, within } from 'storybook/test';

interface DropdownBasicStory {
	luPopoverPosition: PopoverPosition;
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
		luPopoverPosition: {
			description: 'Modifie la position du dropdown par rapport à son déclencheur.',
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
			table: { category: 'inputs' },
		},
		luDropdownDisabled: {
			description: 'Empêche le dropdown de s’ouvrir.',
			control: 'boolean',
			table: { category: 'inputs' },
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
	const direction = args.luPopoverPosition !== 'below' ? ` luDropdownPosition="${args.luPopoverPosition}"` : ``;
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
		luPopoverPosition: 'below',
		luDropdownDisabled: false,
	},
	render: Template,
	argTypes: {},
};

type DropdownTestArgs = DropdownBasicStory & {
	luDropdownOnOpen: Mock<() => void>;
	luDropdownOnClose: Mock<() => void>;
};

/**
 * The panel lives in the CDK overlay, outside the story canvas, and the group renders a nested
 * `<ul>`: a global `getAllByRole('list').at(0)` would depend on the DOM order. The trigger's
 * `aria-controls` always points at the panel element, open or not, so it is the stable handle.
 */
function getPanel(trigger: HTMLElement): HTMLElement | null {
	const panelId = trigger.getAttribute('aria-controls');
	return panelId ? document.getElementById(panelId) : null;
}

function getOpenPanel(trigger: HTMLElement): HTMLElement {
	const panel = getPanel(trigger);
	if (!panel) {
		throw new Error('Le panneau du dropdown est fermé.');
	}
	return panel;
}

async function expectOpened(trigger: HTMLElement): Promise<void> {
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	await expect(getOpenPanel(trigger)).toBeVisible();
}

async function expectClosed(trigger: HTMLElement): Promise<void> {
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(getPanel(trigger)).not.toBeInTheDocument();
}

async function openDropdown(trigger: HTMLElement): Promise<void> {
	await userEvent.click(trigger);
	await waitForAngular();
	await expectOpened(trigger);
}

const DirectiveWithSpies: StoryObj<DropdownTestArgs> = {
	...Directive,
	args: {
		...Directive.args,
		luDropdownOnOpen: fn(),
		luDropdownOnClose: fn(),
	},
};

export const DirectiveTEST = createTestStory(DirectiveWithSpies, async ({ canvasElement, args, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: /dropdown/i });

	await step("Vérifie l'état initial", async () => {
		await expect(trigger).toBeVisible();
		await expectClosed(trigger);
	});

	await step('Ouvre le dropdown au clic et donne le focus à la première action', async () => {
		await openDropdown(trigger);
		const menu = within(getOpenPanel(trigger));
		await waitFor(() => expect(menu.getAllByRole('button', { name: 'Lorem' })[0]).toHaveFocus());
	});

	await step('Les items du menu sont visibles et accessibles', async () => {
		const menu = within(getOpenPanel(trigger));
		await expect(menu.getByRole('button', { name: 'Ipsum' })).toBeVisible();
		await expect(menu.getByRole('link', { name: /sit amet/i })).toBeVisible();
		const [loremEnabled, loremDisabled] = menu.getAllByRole('button', { name: 'Lorem' });
		await expect(loremEnabled).toBeVisible();
		await expect(loremEnabled).not.toBeDisabled();
		await expect(loremDisabled).toBeDisabled();
	});

	await step('Un second clic sur le déclencheur referme le dropdown', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		await expectClosed(trigger);
	});

	await step('Un clic en dehors referme le dropdown', async () => {
		await openDropdown(trigger);
		await userEvent.click(document.body);
		await waitForAngular();
		await expectClosed(trigger);
	});

	await step('Un clic sur une action désactivée laisse le dropdown ouvert', async () => {
		await openDropdown(trigger);
		const menu = within(getOpenPanel(trigger));

		await userEvent.click(menu.getAllByRole('button', { name: 'Lorem' })[1]);
		await waitForAngular();
		await expectOpened(trigger);

		await userEvent.click(menu.getByText('Sit amet', { selector: '[lu-dropdown-action][disabled]' }));
		await waitForAngular();
		await expectOpened(trigger);
	});

	await step('Ferme le dropdown en cliquant sur une action', async () => {
		await userEvent.click(within(getOpenPanel(trigger)).getByRole('button', { name: 'Ipsum' }));
		await waitForAngular();
		await expectClosed(trigger);
	});

	await step('Ouvre le dropdown au clavier (Enter)', async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expectOpened(trigger);
	});

	await step('Tab parcourt les actions activables et Enter déclenche celle qui a le focus', async () => {
		const menu = within(getOpenPanel(trigger));
		await waitFor(() => expect(menu.getAllByRole('button', { name: 'Lorem' })[0]).toHaveFocus());

		// L'action désactivée n'est pas tabbable : le focus passe directement à la suivante.
		await userEvent.tab();
		await expect(menu.getByRole('button', { name: 'Ipsum' })).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expectClosed(trigger);
		await expect(trigger).toHaveFocus();
	});

	await step('Ferme le dropdown avec Échap et rend le focus au déclencheur', async () => {
		trigger.focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expectOpened(trigger);

		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expectClosed(trigger);
		await expect(trigger).toHaveFocus();
	});

	await step('Émet luDropdownOnOpen et luDropdownOnClose une seule fois par ouverture/fermeture', async () => {
		args.luDropdownOnOpen.mockClear();
		args.luDropdownOnClose.mockClear();

		await openDropdown(trigger);
		await expect(args.luDropdownOnOpen).toHaveBeenCalledTimes(1);
		await expect(args.luDropdownOnClose).not.toHaveBeenCalled();

		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expectClosed(trigger);
		await expect(args.luDropdownOnOpen).toHaveBeenCalledTimes(1);
		await expect(args.luDropdownOnClose).toHaveBeenCalledTimes(1);
	});
});

const DirectiveDisabled: StoryObj<DropdownBasicStory> = {
	...Directive,
	name: 'Disabled',
	args: {
		...Directive.args,
		luDropdownDisabled: true,
	},
};

export const DisabledTEST = createTestStory(DirectiveDisabled, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: /dropdown/i });

	await step("Un déclencheur désactivé ne s'ouvre pas au clic", async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		await expectClosed(trigger);
	});

	await step("Un déclencheur désactivé ne s'ouvre pas au clavier", async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expectClosed(trigger);
	});
});
