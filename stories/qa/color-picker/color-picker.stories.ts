import { colorDecoratives50, colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'color-picker-stories',
	templateUrl: './color-picker.stories.html',
	imports: [ColorInputComponent, FormFieldComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ColorPickerStory {
	colorDecoratives500 = colorDecoratives500;
	colorDecoratives50 = colorDecoratives50;
	selectedColor: ColorOption = colorDecoratives500[0];
	selectedBorderColor: ColorOption = colorDecoratives50[0];
}

export default {
	title: 'QA/ColorPicker',
	component: ColorPickerStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ColorPickerStory> = {
	args: {},
	render: template,
};
