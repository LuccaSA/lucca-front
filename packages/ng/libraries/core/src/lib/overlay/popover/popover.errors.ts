/**
 * Throws an exception for the case when popover trigger doesn't have a valid lu-popover instance
 */
export function throwLuPopoverMissingError() {
	throw Error(`lu-popover-trigger: must pass in an lu-popover instance.
    Example:
      <lu-popover #popover="LuPopover"></lu-popover>
      <button [LuPopoverTriggerFor]="popover"></button>`);
}

