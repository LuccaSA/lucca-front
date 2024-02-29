import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'lu-index-table-interactive-nested-selectable',
	standalone: true,
	templateUrl: './index-table-interactive-nested-selectable.stories.html',
})
class IndexTableInteractiveNestedSelectableStory {
	toggleRows(btnID, eIDs) {
		// Feed the list of ids as a selector
		var theRows = document.querySelectorAll(eIDs);
		// Get the button that triggered this
		var theButton = document.getElementById(btnID);
		// If the button is not expanded...
		console.log(theButton);
		if (theButton.getAttribute("aria-expanded") == "false") {
		  // Loop through the rows and show them
		  for (var i = 0; i < theRows.length; i++) {
			theRows[i].classList.remove("is-closed");
		  }
		  // Now set the button to expanded
		  theButton.setAttribute("aria-expanded", "true");
		// Otherwise button is not expanded...
		} else {
		  // Loop through the rows and hide them
		  for (var i = 0; i < theRows.length; i++) {
			theRows[i].classList.add("is-closed");
		  }
		  // Now set the button to collapsed
		  theButton.setAttribute("aria-expanded", "false");
		}
	  }
}

export default {
	title: 'Documentation/Listings/Index Table/Interactive Nested Selectable',
	component: IndexTableInteractiveNestedSelectableStory,
} as Meta;

const Template: StoryFn<IndexTableInteractiveNestedSelectableStory> = (args) => ({
	props: args,
});

export const InteractiveNestedSelectable = Template.bind({});
InteractiveNestedSelectable.args = {};
