/**
 * Throws an exception for the case when popover trigger doesn't have a valid lu-popover instance
 */
export function throwLuPopoverMissingPanelError() {
	throw Error(`lu-popover-trigger: must pass in a lu-popover instance.
    Example:
      <lu-popover #popover="LuPopover"></lu-popover>
      <button [luPopover]="popover"></button>`);
}

export function throwLuPopoverMissingTargetError() {
	throw Error(`lu-popover-trigger: must pass in a popover target instance.`);
}
