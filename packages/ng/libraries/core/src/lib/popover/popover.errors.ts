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
 * Throws an exception for the case when popover's LuPopoverPosition value isn't valid.
 */
export function throwLuPopoverInvalidPosition() {
	throw Error(`LuPopoverPosition value must be 'above', 'below', 'before' or 'after'.
      Example: <lu-popover [position]="'before'" #popover="LuPopover"></lu-popover>`);
}

/**
 * Throws an exception for the case when popover's LuPopoverAlignement value isn't valid.
 */
export function throwLuPopoverInvalidAlignement() {
	throw Error(`LuPopoverAlignment value must be 'top', 'bottom', 'right' or 'left'.
      Example: <lu-popover [position]="above" [alignment]="left" #popover="LuPopover"></lu-popover>`);
}
