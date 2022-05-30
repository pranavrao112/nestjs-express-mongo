import * as mongoose from 'mongoose';
require('dotenv').config();

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGO_URI_CLOUD || 'mongodb+srv://pranavrao:Pranav112@cluster0.b3tmz.mongodb.net/?retryWrites=true&w=majority'),
  },
];
