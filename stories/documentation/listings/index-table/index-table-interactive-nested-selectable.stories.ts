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
		var targetRows = document.querySelectorAll(eIDs);
		// Get the button that triggered this
		var clickedBtn = document.getElementById(btnID);
		// If the button is not expanded...
		if (clickedBtn.getAttribute("aria-expanded") == "false") {
			// Loop through the rows and show them
			for (var i = 0; i < targetRows.length; i++) {
				targetRows[i].classList.remove("is-closed");
			}
			// Now set the button to expanded
			clickedBtn.setAttribute("aria-expanded", "true");
		// Otherwise button is not expanded...
		} else {
			// Loop through the rows and hide them
			for (var i = 0; i < targetRows.length; i++) {
				targetRows[i].classList.add("is-closed");
			}
			// Now set the button to collapsed
			clickedBtn.setAttribute("aria-expanded", "false");
		}
	}

	toggleCheckbox(chbxID, eIDs) {
		// Feed the list of ids as a selector
		var childChbxs = document.querySelectorAll(eIDs);
		// Get the checkbox that triggered this
		var clickedChbx = document.getElementById(chbxID) as HTMLInputElement;
		clickedChbx.removeAttribute("aria-checked");
		var clickedChbxState = clickedChbx.checked;

		// if this checkbox has childs, propagate her states
		if(childChbxs) {
			for (var i = 0; i < childChbxs.length; i++) {
				var childChbx = childChbxs[i] as HTMLInputElement;
				childChbx.checked = clickedChbxState;
				childChbx.removeAttribute("aria-checked");
			}
		}

		// Reverse state propogation on parents + mixed state management

		// get all of the clickedChbx ancestors
		var parentChbxs = document.querySelectorAll(".checkboxField-input[aria-controls*='"+clickedChbx.id+"']");
		if(parentChbxs) {
			// for each ancestor
			for (var i = parentChbxs.length -1 ; i >= 0; i--) {
				var parentChbx = parentChbxs[i] as HTMLInputElement;
				parentChbx.removeAttribute("aria-checked");
				// parse their childs list and sum their states (unchecked = 0 ; checked = 1)
				var parentChbxChildIds = parentChbx.getAttribute("aria-controls").split(" ");
				var calculatedState = 0;
				for (var j = 0; j < parentChbxChildIds.length; j++) {
					var parentChbxChildId = "#" + parentChbxChildIds[j];
					var parentChbxChild = document.querySelectorAll(parentChbxChildId)[0] as HTMLInputElement;

					if(parentChbxChild.checked){
						calculatedState++;
					}
				}
				// all childs are unchecked => parent is unchecked
				if(calculatedState == 0) {
					parentChbx.checked = false;
				}
				// all childs are checked => parent is checked
				else if(calculatedState == parentChbxChildIds.length) {
					parentChbx.checked = true;
				}
				// some childs checked, some unchecked => parent is mixed
				else {
					parentChbx.checked = true;
					parentChbx.setAttribute("aria-checked","mixed");
				}
			}
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
