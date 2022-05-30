import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { filmsSchema } from '../schema/films.schema';
import { FilmController} from './film.controller';
import {FilmService} from './films.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:'Films',
      schema:filmsSchema,
      collection:'Films'
    }]),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/NESTJS_MONGO_DEMO")
  ],
  controllers: [FilmController],
  providers: [FilmService],
})



export class FilmModule {}