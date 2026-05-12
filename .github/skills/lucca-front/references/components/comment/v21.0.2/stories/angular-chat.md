# comment — Chat _(Angular)_

```js
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
```

```html
<lu-comment-chat>
	<lu-comment-block ${…} ${…} authorName="${…} ${…}">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{ firstName: 'Marie', lastName: 'Bragoulet' }" />
		</ng-template>
		<lu-comment
			[date]="date"
			content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?"
		/>
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet." />
		<lu-comment [date]="date" content="${…}" />
	</lu-comment-block>
	<lu-comment-block [chatAnswer]="true" ${…} ${…} authorName="Chloé Alibert">
		<ng-template #avatarTpl2>
			<lu-user-picture [user]="{ firstName: 'Chloé', lastName: 'Alibert' }" />
		</ng-template>
		<lu-comment
			[date]="date"
			content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?"
		/>
	</lu-comment-block>
</lu-comment-chat>
```
