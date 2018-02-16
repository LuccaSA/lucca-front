import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs/Observable';
import { ITree, ITreeNode } from './../../../../src/app/tree-picker';
declare var require: any;

@Component({
	/* tslint:disable */
	selector: 'demo-tree-picker',
	/* tslint:enabled */
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
				node: <ITreeNode>{ id: 1, name: 'C:' },
				children: [
					<ITree>{
						node: <ITreeNode>{ id: 2, name: 'ProgramFiles' },
						children: [
							<ITree>{
								node: <ITreeNode>{ id: 3, name: 'Microsoft VS Code' },
								children: []
							},
							<ITree>{
								node: <ITreeNode>{ id: 4, name: 'GIMP 2' },
								children: []
							},
						]
					},
					<ITree>{
						node: <ITreeNode>{ id: 5, name: 'Program files (x86)' },
						children: []
					},
				]
			},
			<ITree>{
				node: <ITreeNode>{ id: 6, name: 'Temp' },
				children: []
			},
			<ITree>{
				node: <ITreeNode>{ id: 7, name: 'Users' },
				children: [
					<ITree>{
						node: { id: 8, name: 'Gérard' },
						children: []
					},
				]
			},
			<ITree>{
				node: <ITreeNode>{ id: 9, name: 'Windows' },
				children: []
			},
			<ITree>{
				node: <ITreeNode>{ id: 10, name: 'Windows.old' },
				children: []
			},
		]
	};

	public picker1Selection: ITreeNode[];
	public picker2Selection: ITreeNode;

	public multipleTreeSelection: ITreeNode[];
	public singleTreeSelection: ITreeNode;
	public allowMultiple = true;

	constructor(
		private http: HttpClient
	) {
		this.picker1Selection = [
			<ITreeNode>{ id: 7, name: 'Users' },
			<ITreeNode>{ id: 8, name: 'Gérard' },
		];
		this.picker2Selection = <ITreeNode>{ id: 8, name: 'Gérard' };


		this.multipleTreeSelection = [];

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
