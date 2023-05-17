import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDurationPickerComponent } from '@lucca-front/ng/duration';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'duration-stories',
	standalone: true,
	imports: [LuDurationPickerComponent, FormsModule, JsonPipe],
	templateUrl: './duration.stories.html',
})
class DurationStory {
	durationInHours = 'PT1H30M';
	durationInDays = 'P1DT1H30M';
}

export default {
	title: 'QA/Duration',
	component: DurationStory,
} as Meta;

const template: StoryFn<DurationStory> = () => ({});

export const basic = template.bind({});
