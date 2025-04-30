import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({ standalone: true, selector: 'radio-framed-horizontal-stories', templateUrl: './radio-framed-horizontal.stories.html' })
class radioFramedStory {}

export default { title: 'QA/radioFramed/horizontal', component: radioFramedStory } as Meta;

const template: StoryFn<radioFramedStory> = () => ({});

export const basic = template.bind({});
