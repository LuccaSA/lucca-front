import { Component } from '@angular/core';
import { ITree, ITreeNode } from './../../../../../src/app/tree-picker';

@Component({
	/* tslint:disable */
	selector: 'demo-tree-picker',
	/* tslint:enabled */
	templateUrl: './demo-tree-picker.component.html',
	styles: []
})
export class DemoTreePickerComponent {

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

	constructor() {
		// LuTreePickers ngModels
		this.picker1Selection = [
			<ITreeNode>{ id: 7, name: 'Users' },
			<ITreeNode>{ id: 8, name: 'Gérard' }
		];
		this.picker2Selection = <ITreeNode>{ id: 8, name: 'Gérard' };
	}
}
