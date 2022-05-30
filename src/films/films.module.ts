import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { filmsSchema } from '../schema/films.schema';
import { FilmController} from './film.controller';
import {FilmService} from './films.service';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:'Films',
      schema:filmsSchema,
      collection:'Films'
    }]),
    MongooseModule.forRoot(process.env.MONGO_URI_CLOUD || 'mongodb+srv://pranavrao:Pranav112@cluster0.b3tmz.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [FilmController],
  providers: [FilmService],
})



export class FilmModule {}