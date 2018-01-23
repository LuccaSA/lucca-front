import {LuSelectOption} from './select-option.component';

/**
 * Class representing an event of a LuSelectOption
 */
export class LuSelectOptionSelectionChange<T> {
	constructor(
		/** Reference to the option that emitted the event. */
		public source: LuSelectOption<T>,
		/** Whether the change in the option's value was a result of a user action. */
		public isUserInput = false) { }
}
