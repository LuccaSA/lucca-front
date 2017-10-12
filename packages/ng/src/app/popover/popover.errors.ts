/**
 * Throws an exception for the case when popover trigger doesn't have a valid lu-popover instance
 */
export function throwLuPopoverMissingError() {
	throw Error(`lu-popover-trigger: must pass in an lu-popover instance.
    Example:
      <lu-popover #popover="LuPopover"></lu-popover>
      <button [LuPopoverTriggerFor]="popover"></button>`);
}

/**
 * Throws an exception for the case when popover's LuPopoverPositionX value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 */
export function throwLuPopoverInvalidPositionX() {
	throw Error(`LuPopoverPositionX value must be either 'before' or after'.
      Example: <lu-popover LuPopoverPositionX="before" #popover="LuPopover"></lu-popover>`);
}

/**
 * Throws an exception for the case when popover's LuPopoverPositionY value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 */
export function throwLuPopoverInvalidPositionY() {
	throw Error(`LuPopoverPositionY value must be either 'above' or below'.
      Example: <lu-popover LuPopoverPositionY="above" #popover="LuPopover"></lu-popover>`);
}
