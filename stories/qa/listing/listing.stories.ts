import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, StoryObj } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'listing-stories',
	templateUrl: './listing.stories.html',
	imports: [ListingComponent, ListingItemComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListingStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/Listing',
	component: ListingStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ListingStory> = {
	args: {},
	render: template,
};
