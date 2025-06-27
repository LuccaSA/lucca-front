// export function registerMention(editor: LexicalEditor, options: MentionPluginOptions): () => void {
// 	return editor.registerNodeTransform(MentionQueryNode, (queryNode) => {
// 		const content = queryNode.getTextContent();
// 		if (content.includes(' ') || content.includes('\n')) {
// 			queryNode.replace($createTextNode(content));
// 		} else {
// 			options.updateClue(queryNode.query);
// 		}
// 	});
// }
