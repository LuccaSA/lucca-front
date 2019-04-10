import { Component } from '@angular/core';

@Component({
	selector: '<%=prefix%>-<%=dasherize(name)%>-example',
	templateUrl: './<%=dasherize(name)%>.example.html'
})
export class <%= classify(name) %>Example {
}
