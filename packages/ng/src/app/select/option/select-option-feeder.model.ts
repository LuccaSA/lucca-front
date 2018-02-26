export interface ISelectOptionFeeder<T> {

	/**
	 * @returns true if the focus is on the field
	 */
	hasFocus(): boolean;

	/**
	 * Called when the popup of option is open
	 */
	open(): void;

	/**
	 * Register key events
	 * @param callback
	 */
	registerKeyevent(callback: (event: KeyboardEvent) => void): void;

	/**
	 * Scroll to the element specifyed in index
	 * @param index
	 */
	scrollTo(index: number);

}
