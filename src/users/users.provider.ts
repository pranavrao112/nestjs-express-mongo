import { Connection } from 'mongoose';
import { userSchema } from '../schema/users.schema';
import { UsersService } from './users.service';
// import normalize from 'normalize-mongoose';
// userSchema.plugin(normalize);

export const UsersProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('User', userSchema),
        inject: ['DbConnectionToken'],
    },
];

export const UserServiceProvider = [
    {
        provide: 'UserServiceProvider',
        useValue: UsersService,
    },
];
