import { Test } from '@nestjs/testing';
import { FilmController } from '../films/film.controller';
import { FilmService } from '../films/films.service';

describe('CatsController', () => {
    let filmController: FilmController;
    let filmService: FilmService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [FilmController],
        providers: [FilmService],
      }).compile();

      filmService = moduleRef.get<FilmService>(FilmService);
      filmController = moduleRef.get<FilmController>(FilmController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(filmService, 'getAllFilms').mockImplementation(() => new Promise((resolve, reject) => resolve(result)))

      expect(await filmController.GetAllFilms()).toBe(result);
    });
  });
});