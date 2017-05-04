Vue.component('demo-forms-textareas', {
	template: `
		<section id="form-textarea">
			<section class="contentSection">
				<h2>Textareas</h2>

				<!-- Basics -->
				<div class="form">
					<div class="grid">
						<div class="grid-sm6">
							<div class="form-group">
								<div class="textarea mod-block">
									<textarea class="textarea-field"></textarea>
									<label class="textarea-label">Textarea label</label>
								</div>
							</div>
						</div>
						<div class="grid-sm6">
							<div class="form-group">
								<div class="textarea mod-block is-filled">
									<textarea class="textarea-field" disabled>Disabled textarea ø Disabled textarea ø Disabled textarea ø Disabled textarea ø</textarea>
									<label class="textarea-label">Textarea label</label>
								</div>
							</div>
						</div>
					</div>
				</div>
<code class="code mod-block">&lt;div class="textarea"&gt;
	&lt;textarea class="textarea-field"&gt;&lt;/textarea&gt;
	&lt;label class="textarea-label"&gt;Textarea label&lt;/label&gt;
&lt;/div&gt;
</code>
				<em><b>Tip:</b> Use <code class="code">&lt;div class="textarea mod-block"&gt;</code> for a 100% width textarea.</em><br>
				<em><b>Tip:</b> Use <code class="code">&lt;div class="textarea is-filled"&gt;</code> to let the label on the upper state.</em>
			</section>
		</section>
	`
})

