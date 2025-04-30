import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({ standalone: true, selector: 'radio-framed-vertical-stories', templateUrl: './radio-framed-vertical.stories.html' })
class radioFramedStory {}

export default { title: 'QA/radioFramed/vertical', component: radioFramedStory } as Meta;

const template: StoryFn<radioFramedStory> = () => ({});

export const basic = template.bind({});
