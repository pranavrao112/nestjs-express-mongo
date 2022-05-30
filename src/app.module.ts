import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { filmsSchema } from './schema/films.schema';
import { UsersModule}  from './users/users.module';
import { AuthModule}  from './auth/auth.module';
import { FilmModule}  from './films/films.module';
import { CommentsModule}  from './comments/comments.module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:'Films',
      schema:filmsSchema,
      collection:'Films'
    }]),
    MongooseModule.forRoot(process.env.MONGO_URI_CLOUD || 'mongodb+srv://pranavrao:Pranav112@cluster0.b3tmz.mongodb.net/?retryWrites=true&w=majority'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secretOrPrivateKey: process.env.SECRET || 'xyzxyzxyz',
        signOptions: {
            expiresIn: process.env.JWT_EXPIRY || '24h',
        },
    }),
    UsersModule,
    AuthModule,
    FilmModule,
    CommentsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}