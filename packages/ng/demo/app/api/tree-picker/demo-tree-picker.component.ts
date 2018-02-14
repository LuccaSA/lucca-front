import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs/Observable';
import { ITree, ITreeNode } from '../../../../src/app/api/tree-picker';
declare var require: any;

@Component({
	selector: 'demo-tree-picker',
	templateUrl: './demo-tree-picker.component.html',
	styles: []
})
export class DemoTreePickerComponent {

	public snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
	};

	public asyncTree: Observable<ITree>;

	public staticTree: ITree = {
		node: null,
		children: [
			<ITree>{
				node: <ITreeNode>{ id: 1, name: '1' },
				children: [
					<ITree>{
						node: <ITreeNode>{ id: 2, name: '2' },
						children: [
							<ITree>{
								node: <ITreeNode>{ id: 3, name: '3' },
								children: []
							},
							<ITree>{
								node: <ITreeNode>{ id: 4, name: '4' },
								children: []
							},
						]
					},
					<ITree>{
						node: <ITreeNode>{ id: 5, name: '5' },
						children: []
					},
				]
			},
			<ITree>{
				node: <ITreeNode>{ id: 6, name: '6' },
				children: []
			},
			<ITree>{
				node: <ITreeNode>{ id: 7, name: '7' },
				children: [
					<ITree>{
						node: { id: 8, name: '8' },
						children: []
					},
				]
			},
			<ITree>{
				node: <ITreeNode>{ id: 9, name: '9' },
				children: []
			},
			<ITree>{
				node: <ITreeNode>{ id: 10, name: '10' },
				children: []
			},
		]
	};

	public multipleTreeSelection: ITreeNode[];

	public singleTreeSelection: ITreeNode;

	public allowMultiple = true;

	constructor(
		private http: HttpClient
	) {

		this.multipleTreeSelection = [
			<ITreeNode>{ id: 1, name: '1' },
			<ITreeNode>{ id: 2, name: '2' },
			<ITreeNode>{ id: 3, name: '3' },
			<ITreeNode>{ id: 7, name: '7' },
		];

		this.singleTreeSelection = <ITreeNode>{ id: 3, name: '3' };

		this.asyncTree = http.get('/api/v3/departments/tree').map((result: any) => result.data);
	}
}
