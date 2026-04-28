import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { FieldsetComponent, TextareaInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { ButtonComponent } from '@lucca/prisme/button';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skeleton-self-managed',
	imports: [FormsModule, FormHeaderComponent, FieldsetComponent, GridComponent, GridColumnComponent, TextInputComponent, FormFieldComponent, TextareaInputComponent, ButtonComponent],
	templateUrl: './skeleton-self-managed.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkeletonSelfManagedStory {
	loading = input<boolean>(false);
}

export default {
	title: 'Documentation/Loaders/Skeleton/SelfManaged',
	component: SkeletonSelfManagedStory,
	argTypes: {
		loading: {
			control: 'boolean',
			description: 'Rend le composant en état de chargement',
		},
	},
} as Meta;

export const Basic: StoryObj<SkeletonSelfManagedStory> = {
	args: {
		loading: false,
	},
};

const code = ``;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
