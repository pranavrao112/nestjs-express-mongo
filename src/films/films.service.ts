/* Logic to communicate with the database */

import { Injectable, Get, Post, Body , Res, HttpStatus} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Films } from '../models/films.model';
import { Logger } from '../utils/logger';
import { Response } from 'express';

const logger = new Logger('Service');


@Injectable()
export class FilmService {
  constructor(@InjectModel('Films') private readonly filmModel: Model<Films>) { }

  async getAllFilms() {
    const getFilms = await this.filmModel.find();
    logger.info('Film details fetched : ', getFilms);
    return getFilms;
  }

  async addFilm(obj: any) {
    const newFilm = new this.filmModel(obj);
    try {
      const result = await newFilm.save();
      logger.info('Film details added : ', result);
      return {
        status: HttpStatus.OK,
        data: result
      };
    } catch (err) {
      logger.error('Failed to fetch data from DB :', err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err
      };
    }
  }
}