# activity-feed — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-activity-feed-angular-basic--docs)

## Angular

Component selector : `lu-activity-feed`

### Basic

```js
import { LOCALE_ID } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent, ActivityFeedUpdateItemComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { ButtonComponent } from '@lucca/prisme/button';
```

```html
<lu-activity-feed>
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
</lu-activity-feed>
```

## HTML/CSS

Classe CSS : `.activityFeed`

### Add

```css
@forward '@lucca-front/scss/src/components/activity-feed';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/button';
```

```html
<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-content">
			<button type="button" class="activityFeed-step-add button mod-outlined">Afficher plus</button>
		</div>
	</li>
</ol>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/activity-feed';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
</ol>
```

### States

```css
@forward '@lucca-front/scss/src/components/activity-feed';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-success"></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">Demande approuvée.</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-state mod-critical"></div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">Demande refusée.</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
		</div>
	</li>
	<li class="activityFeed-step mod-pending">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">En attente d'approbation.</p>
		</div>
	</li>
</ol>
```

### Updated

```css
@forward '@lucca-front/scss/src/components/activity-feed';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/statusBadge';
```

```html
<ol class="activityFeed">
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
			<div class="activityFeed-content">
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-before">1000 €</div>
						<span
							class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS"
							aria-hidden="true"
						></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">800 €</div>
					</li>
				</ul>
			</div>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
			<div class="activityFeed-content">
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Lorem ipsum :</div>
						<div class="activityFeed-content-update-item-before">Oui</div>
						<span
							class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS"
							aria-hidden="true"
						></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">Non</div>
					</li>
				</ul>
			</div>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">
				Daniel Hernandez a transmis la facture au service comptabilité.
			</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
			<div class="activityFeed-content">
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Sit amet :</div>
						<div class="activityFeed-content-update-item-before">Oui</div>
						<span
							class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS"
							aria-hidden="true"
						></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">Non</div>
					</li>
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Dolor :</div>
						<div class="activityFeed-content-update-item-before">1000 €</div>
						<span
							class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS"
							aria-hidden="true"
						></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">500 €</div>
					</li>
				</ul>
			</div>
		</div>
	</li>
	<li class="activityFeed-step">
		<div class="activityFeed-step-avatar avatar mod-placeholder" translate="no">
			<span class="avatar-picture"></span>
		</div>
		<div class="activityFeed-step-description">
			<p class="activityFeed-step-description-content">Daniel Hernandez a modifié une demande.</p>
			<time datetime="2025-07-15 08:56" class="activityFeed-step-description-time">
				<abbr>Mar.</abbr>
				15 juillet 2025 à 08:56
			</time>
			<div class="activityFeed-content">
				<ul class="activityFeed-content-update">
					<li class="activityFeed-content-update-item">
						<div class="activityFeed-content-update-item-object">Statut :</div>
						<div class="activityFeed-content-update-item-before">
							<div class="statusBadge palette-critical">Refusé</div>
						</div>
						<span
							class="activityFeed-content-update-item-icon lucca-icon icon-arrowRight mod-XS"
							aria-hidden="true"
						></span>
						<span class="pr-u-mask">a été remplacé par</span>
						<div class="activityFeed-content-update-item-after">
							<div class="statusBadge palette-success">Approuvé</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</li>
</ol>
```
