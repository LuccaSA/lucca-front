import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'lu-index-table-interactive-nested-selectable',
	standalone: true,
	templateUrl: './index-table-interactive-nested-selectable.stories.html',
})
class IndexTableInteractiveNestedSelectableStory {
	toggleRows(event, btnID, eIDs) {
		event.stopPropagation();
		// Feed the list of ids as a selector
		const targetRows = document.querySelectorAll(eIDs);
		// Get the button that triggered this
		const clickedBtn = document.getElementById(btnID);
		// If the button is not expanded...
		if (clickedBtn.getAttribute('aria-expanded') == 'false') {
			// Loop through the rows and show them
			for (let i = 0; i < targetRows.length; i++) {
				targetRows[i].classList.remove('is-closed');
			}
			// Now set the button to expanded
			clickedBtn.setAttribute('aria-expanded', 'true');
			// Otherwise button is not expanded...
		} else {
			// Loop through the rows and hide them
			for (let i = 0; i < targetRows.length; i++) {
				targetRows[i].classList.add('is-closed');
			}
			// Now set the button to collapsed
			clickedBtn.setAttribute('aria-expanded', 'false');
		}
	}

	toggleCheckbox(event, chbxID, eIDs) {
		event.stopPropagation();
		// Feed the list of ids as a selector
		const childChbxs = document.querySelectorAll(eIDs);
		// Get the checkbox that triggered this
		const clickedChbx = document.getElementById(chbxID) as HTMLInputElement;
		clickedChbx.removeAttribute('aria-checked');
		const clickedChbxState = clickedChbx.checked;

		// if this checkbox has childs, propagate her states
		if (childChbxs) {
			for (let i = 0; i < childChbxs.length; i++) {
				const childChbx = childChbxs[i] as HTMLInputElement;
				childChbx.checked = clickedChbxState;
				childChbx.removeAttribute('aria-checked');
			}
		}

		// Reverse state propogation on parents + mixed state management

		// get all of the clickedChbx ancestors
		const parentChbxs = document.querySelectorAll(".checkboxField-input[aria-controls*='" + clickedChbx.id + "']");
		if (parentChbxs) {
			// for each ancestor
			for (let i = parentChbxs.length - 1; i >= 0; i--) {
				const parentChbx = parentChbxs[i] as HTMLInputElement;
				parentChbx.removeAttribute('aria-checked');
				// parse their childs list and sum their states (unchecked = 0 ; checked = 1)
				const parentChbxChildIds = parentChbx.getAttribute('aria-controls').split(' ');
				let calculatedState = 0;
				for (let j = 0; j < parentChbxChildIds.length; j++) {
					const parentChbxChildId = '#' + parentChbxChildIds[j];
					const parentChbxChild = document.querySelectorAll(parentChbxChildId)[0] as HTMLInputElement;

					if (parentChbxChild.checked) {
						calculatedState++;
					}
				}
				// all childs are unchecked => parent is unchecked
				if (calculatedState == 0) {
					parentChbx.checked = false;
				}
				// all childs are checked => parent is checked
				else if (calculatedState == parentChbxChildIds.length) {
					parentChbx.checked = true;
				}
				// some childs checked, some unchecked => parent is mixed
				else {
					parentChbx.checked = true;
					parentChbx.setAttribute('aria-checked', 'mixed');
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
