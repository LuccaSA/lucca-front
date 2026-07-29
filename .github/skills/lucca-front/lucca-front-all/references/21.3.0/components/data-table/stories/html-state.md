# data-table — State _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/bubbleIllustration';
@forward '@lucca-front/scss/src/components/emptyState';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell" colspan="3">
					<section class="emptyState">
						<div class="emptyState-container">
							<div class="emptyState-content">
								<div class="emptyState-content-icon" aria-hidden="true">
									<div
										class="bubbleIllustration mod-L"
										aria-hidden="true"
										[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/magnifyingGlass.svg' | luSafeExternalSvg"
									></div>
								</div>
								<div class="emptyState-content-text">
									<h3 class="emptyState-content-heading">Empty State</h3>
									<p class="emptyState-content-description">
										Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
										diversitate flatus.
									</p>
								</div>
							</div>
						</div>
					</section>
				</td>
			</tr>
		</tbody>
	</table>
</div>
```
