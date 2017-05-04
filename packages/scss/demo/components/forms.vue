Vue.component('demo-forms', {
	template: `
	<section id="form">
		<h2 class="demo-divider">Forms</h2>

			<!-- Form structure -->
			<section class="contentSection">
				<h2>Form structure</h2>
				<p>To create a complete form layout, place each form element in a <code class="code">form-group</code> container. <a href="templates/form.html" target="_blank">See template example</a></p>
<code class="code mod-block">&lt;form class="form"&gt;
	&lt;div class="form-group"&gt;
		<b>Form element. e.g. input</b>
	&lt;/div&gt;
	&lt;div class="form-group"&gt;
		<b>Form element. e.g. checkbox</b>
	&lt;/div&gt;
	&lt;div class="form-actions"&gt;
		<b>Action buttons</b>
	&lt;/div&gt;
&lt;/form&gt;</code>
				<em><b>Tip:</b> You can use form elements like input, checkbox or radio outside a form structure: it will reset margins. It can be useful for a custom use, for exemple, in tables.</em>
			</section>

			<!-- Form elements -->
			<demo-forms-inputs></demo-forms-inputs>
			<demo-forms-textareas></demo-forms-textareas>
			<demo-forms-checkboxes></demo-forms-checkboxes>
			<demo-forms-radios></demo-forms-radios>
			<demo-forms-switches></demo-forms-switches>
		</section>
	`
})

