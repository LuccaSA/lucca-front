import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({ standalone: true, selector: 'radio-framed-grid-stories', templateUrl: './radio-framed-grid.stories.html' })
class radioFramedStory {}

export default { title: 'QA/radioFramed/grid', component: radioFramedStory } as Meta;

const template: StoryFn<radioFramedStory> = () => ({});

export const basic = template.bind({});
