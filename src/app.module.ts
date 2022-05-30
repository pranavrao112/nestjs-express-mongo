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
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/NESTJS_MONGO_DEMO"),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secretOrPrivateKey: process.env.SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRY,
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