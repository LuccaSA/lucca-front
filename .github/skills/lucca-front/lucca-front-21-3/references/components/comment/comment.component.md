# comment — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)

## Angular

Component selector : `lu-comment`

###

### Ai

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

### Basic

```js
import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
```

```html
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
```

### Chat

```js
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
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

## HTML/CSS

Classe CSS : `.comment`

### Basic

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="comment">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<p class="comment-content-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
			repellendus provident nulla iste neque ex?
		</p>
	</blockquote>
</div>
```

### Chat

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ol class="commentWrapperChat">
	<li class="commentWrapper">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Marie Bragoulet</span>
						&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
						repellendus provident nulla iste neque ex ?
					</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>
						&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">
						Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex. Lorem ipsum dolor
						sit amet, consectetur adipisicing elit.
					</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Marie Bragoulet</span>
						&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>
						&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem ipsum dolor sit amet,</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>
						&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem</p>
				</blockquote>
			</div>
		</div>
	</li>
</ol>
```

### Avatar

```css
@forward '@lucca-front/scss/src/components/comment';
```

```html
<div class="comment mod-noAvatar">
	<div class="comment-infos">
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<p class="comment-content-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
			repellendus provident nulla iste neque ex?
		</p>
	</blockquote>
</div>
```

### RichText

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="comment">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<div class="comment-content-textContainerOptional">
			<h3>Lorem, ipsum.</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				<strong>Facilis voluptates ex</strong>
				qui iste libero suscipit cum earum harum animi praesentium, quidem non incidunt vel illum sunt nihil
				reprehenderit a itaque.
			</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
		</div>
	</blockquote>
</div>
```

### Small

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="comment mod-S">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<p class="comment-content-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
			repellendus provident nulla iste neque ex?
		</p>
	</blockquote>
</div>
```

### Compact

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ol class="commentWrapper mod-compact">
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
					repellendus provident nulla iste neque ex?
				</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
			</blockquote>
		</div>
	</li>
</ol>
```

### Wrapper

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ol class="commentWrapper">
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
					repellendus provident nulla iste neque ex?
				</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet,</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					&ngsp;
					<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
			</blockquote>
		</div>
	</li>
</ol>
```
