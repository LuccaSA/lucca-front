import { HiddenArgType } from '@/helpers/common-arg-types';
import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { sleep, waitForAngular } from '../../helpers/test';

@Component({
	selector: 'select-async-position-stories',
	templateUrl: './select-async-position.stories.html',
	imports: [LuSimpleSelectInputComponent, LuMultiSelectInputComponent, FormFieldComponent, FormsModule],
	styles: [
		`
			.repro {
				position: fixed;
				inset-inline-start: 2rem;
				inline-size: 20rem;
			}

			.repro-intro {
				max-inline-size: 40rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectAsyncPositionStory {
	/** Which select to display. */
	@Input() field: 'simple-async' | 'simple-sync' | 'multi-async' = 'simple-async';
	/** Distance in px between the bottom of the field and the bottom of the viewport. */
	@Input() spaceBelow = 150;
	/** Number of options returned by the fake API. */
	@Input() optionCount = 20;
	/** Fake API latency, in ms. */
	@Input() latency = 300;

	asyncOptions = signal<ILegume[]>([]);
	loading = signal(false);
	clue = '';
	simpleValue: ILegume | null = null;
	multiValue: ILegume[] = [];

	get syncOptions(): ILegume[] {
		return allLegumes.slice(0, this.optionCount);
	}

	loadOptions(): void {
		this.loading.set(true);
		this.asyncOptions.set([]);
		setTimeout(() => {
			this.asyncOptions.set(this.syncOptions);
			this.loading.set(false);
		}, this.latency);
	}
}

export default {
	title: 'QA/Select/AsyncPanelPosition',
	component: SelectAsyncPositionStory,
	argTypes: {
		field: { control: 'inline-radio', options: ['simple-async', 'simple-sync', 'multi-async'] },
		asyncOptions: HiddenArgType,
		syncOptions: HiddenArgType,
		loading: HiddenArgType,
		clue: HiddenArgType,
		simpleValue: HiddenArgType,
		multiValue: HiddenArgType,
		loadOptions: HiddenArgType,
	},
} as Meta<SelectAsyncPositionStory>;

export const Basic: StoryObj<SelectAsyncPositionStory> = {
	args: { field: 'simple-async', spaceBelow: 150, optionCount: 20, latency: 300 },
	play: async ({ canvasElement, args }) => {
		await userEvent.click(within(canvasElement).getByRole('combobox'));
		await waitForAngular();

		const listbox = await screen.findByRole('listbox');
		await waitFor(() => expect(within(listbox).getAllByRole('option')).toHaveLength(args.optionCount), { timeout: 3000 });
		await sleep(100); // repositioning is deferred by a setTimeout once the options are rendered

		// The panel used to be capped to the space left below the field when it was opened — that is, while
		// it was still empty — so it stayed squashed to `spaceBelow - 8` once the options landed.
		const panel = listbox.closest('.cdk-overlay-pane');
		await expect(panel.getBoundingClientRect().height).toBeGreaterThan(args.spaceBelow);
	},
};
