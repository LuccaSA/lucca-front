import { InjectionToken } from '@angular/core';
import { CommentBlockComponent } from './comment-block/comment-block.component';
import { CommentChatComponent } from './comment-chat/comment-chat.component';

export const COMMENT_BLOCK_INSTANCE = new InjectionToken<CommentBlockComponent>('COMMENT_BLOCK_INSTANCE');
export const COMMENT_CHAT_INSTANCE = new InjectionToken<CommentChatComponent>('COMMENT_CHAT_INSTANCE');
