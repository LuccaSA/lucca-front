import { InjectionToken } from '@angular/core';
import { CommentBlockComponent } from './comment-block/comment-block.component';

export const COMMENT_BLOCK_INSTANCE = new InjectionToken<CommentBlockComponent>('COMMENT_BLOCK_INSTANCE');
