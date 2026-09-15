import { Component, inject, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { $createParagraphNode, $getNodeByKey, $getRoot, createEditor, EditorState, LexicalEditor, NodeKey } from 'lexical';
import { $createTagNode, registerTagChipsCleanup, TagNode } from './tag-node';

@Component({ template: '' })
class HostComponent {
	readonly viewContainerRef = inject(ViewContainerRef);
}

describe(TagNode.name, () => {
	let editor: LexicalEditor;
	let container: HTMLElement;
	let viewContainerRef: ViewContainerRef;
	let fixture: ComponentFixture<HostComponent>;
	let tagKey: NodeKey;
	let unregister: () => void;

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		viewContainerRef = fixture.componentInstance.viewContainerRef;
		container = document.createElement('div');
		container.contentEditable = 'true';
		document.body.appendChild(container);
		editor = createEditor({
			nodes: [TagNode],
			onError: (error) => {
				throw error;
			},
		});
		editor.setRootElement(container);
		unregister = registerTagChipsCleanup(editor);
	});

	afterEach(() => {
		unregister();
		container.remove();
	});

	function insertTag(): EditorState {
		editor.update(
			() => {
				const paragraph = $createParagraphNode();
				const tag = $createTagNode('tag1', viewContainerRef, 'Tag 1');
				tagKey = tag.getKey();
				paragraph.append(tag);
				$getRoot().append(paragraph);
			},
			{ discrete: true },
		);
		fixture.detectChanges();
		return editor.getEditorState();
	}

	function clear(): void {
		editor.update(() => $getRoot().clear(), { discrete: true });
	}

	function getChips(): HTMLElement[] {
		return Array.from(container.querySelectorAll<HTMLElement>('.chip'));
	}

	it('should render the tag as a chip', () => {
		insertTag();

		expect(getChips()).toHaveLength(1);
		expect(getChips()[0].firstChild?.textContent).toBe('Tag 1');
	});

	it('should destroy the chip component when the tag is removed', () => {
		insertTag();
		const chip = getChips()[0];

		clear();

		expect(getChips()).toHaveLength(0);
		expect(chip.isConnected).toBe(false);
	});

	it('should render a new chip when a removed tag is restored (undo)', () => {
		const stateWithTag = insertTag();
		clear();

		// Restoring a previous state reuses the same node instance, as the history plugin does on undo
		editor.setEditorState(stateWithTag);
		editor.update(() => {}, { discrete: true });

		expect(getChips()).toHaveLength(1);
		expect(getChips()[0].firstChild?.textContent).toBe('Tag 1');
	});

	it('should still allow removing the tag from a restored chip', () => {
		const stateWithTag = insertTag();
		clear();
		editor.setEditorState(stateWithTag);
		editor.update(() => {}, { discrete: true });
		fixture.detectChanges();

		getChips()[0].querySelector('button')?.click();
		editor.update(() => {}, { discrete: true });

		expect(getChips()).toHaveLength(0);
	});

	it('should not duplicate the label when the tag DOM is recreated', () => {
		insertTag();

		editor.update(() => $getNodeByKey<TagNode>(tagKey)?.setTagDescription('Tag one'), { discrete: true });

		expect(getChips()).toHaveLength(1);
		expect(getChips()[0].firstChild?.textContent).toBe('Tag one');
		expect(getChips()[0].textContent).not.toContain('Tag 1');
	});
});
