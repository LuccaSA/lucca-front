export interface ISelectOptionFeeder<T> {

	/**
	 * @returns true if the focus is on the field
	 */
	hasFocus(): boolean;

	/**
	 * Called when the popup of option is open
	 */
	open(): void;

}
