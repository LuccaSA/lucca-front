# filterbar — Bar _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/filter-pills';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/filterPill';
@forward '@lucca-front/scss/src/components/numericBadge';
@forward '@lucca-front/scss/src/components/segmentedControl';
```

```html
<form>
	<div class="filterBar" [ngModel]="group" [ngModelOptions]="{ standalone: true }">
		<lu-scroll-box class="filterBar-scrollBox">
			<div class="filterBar-scrollBox-group">
				<ul class="segmentedControl filterBar-segmentedControl" role="presentation">
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
						<label for="tab1" class="segmentedControl-item-action">Tous</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
						<label for="tab2" class="segmentedControl-item-action">
							En cours d’approbation @if (withNumericBadge) {
							<span class="numericBadge">8</span>
							}
						</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
						<label for="tab3" class="segmentedControl-item-action">
							Approuvés @if (withNumericBadge) {
							<span class="numericBadge">88</span>
							}
						</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
						<label for="tab4" class="segmentedControl-item-action">Clos</label>
					</li>
				</ul>

				<div class="divider filterBar-divider"></div>

				<button type="button" class="filterPill mod-checkbox">
					<span class="filterPill-checkbox">
						<span class="filterPill-checkbox-input"></span>
						<span class="filterPill-checkbox-icon" aria-hidden="true">
							<span class="filterPill-checkbox-icon-check"></span>
						</span>
					</span>
					<span class="filterPill-label" luTooltip="Inclure les collaborateurs partis" luTooltipWhenEllipsis>
						Inclure les collaborateurs partis
						<span
							class="filterPill-label-placeholder"
							aria-hidden="true"
							data-content-before="Inclure les collaborateurs partis"
						></span>
					</span>
				</button>

				<div class="filterPillWrapper">
					<button type="button" class="filterPill" aria-expanded="false" aria-controls="panel">
						<span class="filterPill-label">Département</span>
						<span class="filterPill-value"></span>
						<span class="filterPill-toggle">
							<span class="lucca-icon icon-arrowChevronBottom mod-S"></span>
						</span>
					</button>
					<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
				</div>

				<button type="submit" class="button mod-ghost mod-S palette-product">Appliquer les filtres</button>
			</div>
			<div class="filterBar-scrollBox-export">
				<button type="submit" class="button mod-S mod-outlined">Exporter</button>
			</div>
		</lu-scroll-box>
	</div>
</form>
```
