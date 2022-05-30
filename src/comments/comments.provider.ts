import { Connection } from 'mongoose';
import { commentSchema } from '../schema/comments.schema';
import { CommentsService } from './comments.service';

export const CommentsProviders = [
    {
        provide: 'CommentModelToken',
        useFactory: (connection: Connection) => connection.model('Comments', commentSchema),
        inject: ['DbConnectionToken'],
    },
];

export const CommentServiceProvider = [
    {
        provide: 'CommentServiceProvider',
        useValue: CommentsService,
    },
];
