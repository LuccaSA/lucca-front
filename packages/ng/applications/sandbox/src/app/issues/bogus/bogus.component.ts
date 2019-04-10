import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'lu-bogus',
	templateUrl: './bogus.component.html',
	styleUrls: []
})
export class BogusComponent implements OnInit {
	user;
	constructor(private http: HttpClient) {}
	ngOnInit() {
		this.http.get<any>('/api/v3/users/6')
		.subscribe(r => this.user = r.data);
	}
}
