import { Controller, Get, Post, Body , UseGuards, HttpStatus} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilmService } from './films.service';
import { Logger } from '../utils/logger';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

const logger = new Logger('FilmControllerClass');
@ApiTags('Films')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) { }

  @Post('addFilm')
  //@UseGuards(AuthGuard('jwt'))
  async AddFilms(@Body() input: any) {
      logger.info('Incoming payload on films controller : ',input);
      try{
      return await this.filmService.addFilm(input);
      } catch (err) {
        logger.error('Failed to add data to DB :', err);
        return err;
      }
  }

  @Get('getFilms')
  //@UseGuards(AuthGuard('jwt'))
  async GetAllFilms() {
    try {
      return await this.filmService.getAllFilms();
    } catch (err) {
      logger.error('Failed to fetch data from DB :', err);
      return err;
    }
  }


}
