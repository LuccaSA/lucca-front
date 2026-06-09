# comment — Ai _(Angular)_

```js
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { generateInputs } from '../../../../helpers/stories';
import { LOCALE_ID } from '@angular/core';
```

```html
<lu-comment-chat>
	<lu-comment-block compact [avatar]="avatarAI" authorName="Assistant IA">
		<ng-template #avatarAI>
			<lu-user-picture AI />
		</ng-template>
		<lu-comment [date]="date" content="Bonjour, comment puis-je vous accompagner aujourd’hui ?" />
	</lu-comment-block>
	<lu-comment-block chatAnswer compact [avatar]="avatarTpl" authorName="Chloé Alibert">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{ firstName: 'Chloé', lastName: 'Alibert' }" />
		</ng-template>
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet…" />
	</lu-comment-block>
</lu-comment-chat>
```
