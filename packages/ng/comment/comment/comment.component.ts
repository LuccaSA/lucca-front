import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { DatePipe } from '@angular/common';
import { LuUserPictureModule, LuUserPictureUserInput } from '@lucca-front/ng/user';

@Component({
	selector: 'lu-comment',
	standalone: true,
	imports: [PortalDirective, DatePipe, LuUserPictureModule],
	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
	title = input.required<PortalContent>();
	content = input.required<PortalContent>();
	author = input.required<LuUserPictureUserInput>();
	date = input<Date>();
	dateDisplay = input<PortalContent>();

	noAvatar = input<boolean>(false);
	size = input<'S' | 'M'>();
}
