import { Directive } from '@angular/core';

@Directive({
	selector: '[luSkeletonDisplay]',
})
export class SkeletonDisplayDirective {
	public static ngTemplateContextGuard(_dir: SkeletonDisplayDirective, ctx: unknown): ctx is void {
		return true;
	}
}
