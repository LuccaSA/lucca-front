import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { <%=classify(name)%>Component } from './<%=dasherize(name)%>.component';

<% if (!!proxy) { %>// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
<% } %>

@NgModule({
	declarations: [
		<%=classify(name)%>Component,
	],
	imports: [
<% if (!!proxy) { %>		HttpClientModule,
		RedirectModule,<% } %>
		RouterModule.forChild([
			{ path: '', component: <%=classify(name)%>Component },
		]),
	],
})
export class <%=classify(name)%>Module {}
