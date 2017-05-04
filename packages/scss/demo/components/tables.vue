Vue.component('demo-tables', {
	template: `
		<section id="table">
			<h2 class="demo-divider">Tables</h2>

			<!-- Basics -->
			<section class="contentSection">
				<h2>Tables</h2>
				<table class="table">
					<thead class="table-head">
						<tr class="table-head-row">
							<th class="table-head-row-cell">Head cell</th>
							<th class="table-head-row-cell">Head cell</th>
							<th class="table-head-row-cell">Head cell</th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
					</tbody>
				</table>
<code class="code mod-block">&lt;table class="table"&gt;
	&lt;thead class="table-head"&gt;
		&lt;tr class="table-head-row"&gt;
			&lt;th class="table-head-row-cell"&gt;...&lt;/th&gt;
			&lt;th class="table-head-row-cell"&gt;...&lt;/th&gt;
		&lt;/tr&gt;
	&lt;/thead&gt;
	&lt;tbody class="table-body"&gt;
		&lt;tr class="table-body-row"&gt;
			&lt;td class="table-body-row-cell"&gt;...&lt;/td&gt;
			&lt;td class="table-body-row-cell"&gt;...&lt;/td&gt;
		&lt;/tr&gt;
	&lt;/tbody&gt;
&lt;/table&gt;
</code>
			</section>

			<!-- Zebra -->
			<section class="contentSection">
				<h3>Zebra table</h3>
				<table class="table mod-zebra">
					<thead class="table-head">
						<tr class="table-head-row">
							<th class="table-head-row-cell">Head cell</th>
							<th class="table-head-row-cell">Head cell</th>
							<th class="table-head-row-cell">Head cell</th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
						<tr class="table-body-row">
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
							<td class="table-body-row-cell">Body cell</td>
						</tr>
					</tbody>
				</table>
<code class="code mod-block">&lt;table class="table mod-zebra"&gt;
	...
</code>
			</section>

			<!-- Clickable lines -->
			<section class="contentSection">
				<h3>Clickable lines</h3>
				<div class="table mod-clickable">
					<div class="table-head">
						<div class="table-head-row">
							<div class="table-head-row-cell">Head cell</div>
							<div class="table-head-row-cell">Head cell</div>
							<div class="table-head-row-cell">Head cell</div>
						</div>
					</div>
					<div class="table-body">
						<a href="#" class="table-body-row">
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
						</a>
						<a href="#" class="table-body-row">
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
						</a>
						<a href="#" class="table-body-row">
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
							<div class="table-body-row-cell">Body cell</div>
						</a>
					</div>
				</div>
<code class="code mod-block">&lt;table class="table mod-clickable"&gt;
	...
</code>
			<em><b>Tip:</b> You can use a <code class="code">&lt;div&gt;</code> & <code class="code">&lt;a&gt;</code> structure if you want to have links on your rows.</em>
			</section>
		</section>
	`
})
