import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from '../../../../helpers/stories';
import { waitForAngular } from '../../../../helpers/test';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { expect, screen, userEvent, within } from 'storybook/test';

const me = { id: 66, picture: null, department: { id: 3, name: 'Commercial' }, firstName: 'Pierre', lastName: 'Durand' };
const chloe = { id: 1, picture: null, department: { id: 1, name: 'Direction' }, firstName: 'Chloe', lastName: 'Alibert', additionalInformation: 'Direction' };

export default {
	title: 'Documentation/Navigation/Impersonation/Angular',
	component: ImpersonationComponent,
	argTypes: {
		enableFormerEmployees: {
			control: {
				type: 'boolean',
			},
			description: 'Inclus les collaborateurs partis',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ImpersonationComponent, StoryModelDisplayComponent, JsonPipe],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)] }),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-impersonation [(selectedUser)]="example" ${generateInputs(args, argTypes)} (clear)="example = me" />

<pr-story-model-display>{{example | json}}</pr-story-model-display>
`,
			props: {
				example: me,
				me,
			},
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: { enableFormerEmployees: false },
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getTrigger = () => canvas.getByRole('button', { name: /changer de profil/i });
	const getClearButton = () => canvasElement.querySelector('.impersonation-clear') as HTMLElement;

	await step('Initial state: trigger is not active (selected user is current user)', async () => {
		const trigger = getTrigger();
		await expect(trigger).not.toHaveClass('is-active');
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Initial state: clear button is not visible', async () => {
		await expect(getClearButton()).not.toBeVisible();
	});

	await step('Click trigger opens the popover', async () => {
		const trigger = getTrigger();
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	});

	await step('Press Escape closes the popover', async () => {
		const trigger = getTrigger();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('ArrowDown on trigger opens the popover', async () => {
		const trigger = getTrigger();
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('ArrowUp on trigger opens the popover', async () => {
		const trigger = getTrigger();
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Click trigger again closes the popover', async () => {
		const trigger = getTrigger();
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Select a different user: trigger becomes active and clear button appears', async () => {
		const trigger = getTrigger();
		await userEvent.click(trigger);
		await waitForAngular();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		// Pick first option that is not the current user (not marked with mod-me)
		const otherOption = options.find((opt) => !opt.querySelector('.mod-me'));
		const optionText = otherOption.querySelector('[translate="no"]').textContent.trim();
		await userEvent.click(otherOption);
		await waitForAngular();
		await expect(trigger).toHaveClass('is-active');
		await expect(trigger).toHaveTextContent(optionText);
		await expect(getClearButton()).toBeVisible();
	});
});

export const ActiveTEST: StoryObj = {
	...Basic,
	name: 'Active TEST',
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => ({
		template: `<lu-impersonation [(selectedUser)]="example" ${generateInputs(args, argTypes)} (clear)="example = me" />`,
		props: { example: chloe, me },
	}),
	play: async ({ canvasElement, step }) => {
		await waitForAngular();

		const canvas = within(canvasElement);
		const getTrigger = () => canvas.getByRole('button', { name: /changer de profil/i });
		const getClearButton = () => canvasElement.querySelector<HTMLElement>('.impersonation-clear');

		await step('When a different user is selected, trigger has is-active class', async () => {
			const trigger = getTrigger();
			await expect(trigger).toHaveClass('is-active');
		});

		await step('When a different user is selected, clear button is visible', async () => {
			await expect(getClearButton()).toBeVisible();
		});

		await step('Clicking the clear button resets the selected user', async () => {
			const trigger = getTrigger();
			const clearButton = getClearButton();
			await userEvent.click(clearButton);
			await waitForAngular();
			await expect(trigger).not.toHaveClass('is-active');
			await expect(getClearButton()).not.toBeVisible();
		});
	},
};
