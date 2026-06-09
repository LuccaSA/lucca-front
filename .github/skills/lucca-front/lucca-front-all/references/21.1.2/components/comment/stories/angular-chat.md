# comment — Chat _(Angular)_

```js
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { generateInputs } from '../../../../helpers/stories';
import { LOCALE_ID } from '@angular/core';
```

```html
<lu-comment-chat>
	<lu-comment-block [avatar]="avatarTpl" authorName="Marie Bragoulet">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{ firstName: 'Marie', lastName: 'Bragoulet' }" />
		</ng-template>
		<lu-comment
			[date]="date"
			content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?"
		/>
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet." />
		<lu-comment
			[date]="date"
			content="<h3>Lorem, ipsum.</h3>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
		earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
	</p>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>"
		/>
	</lu-comment-block>
	<lu-comment-block [chatAnswer]="true" [avatar]="avatarTpl2" authorName="Chloé Alibert">
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
