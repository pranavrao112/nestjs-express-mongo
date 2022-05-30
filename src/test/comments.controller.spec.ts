import { Test } from '@nestjs/testing';
import { CommentsController } from '../comments/comments.controller';
import { CommentsService } from '../comments/comments.service';

describe('CatsController', () => {
    let commentController: CommentsController;
    let commentService: CommentsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CommentsController],
        providers: [CommentsService],
      }).compile();

      commentService = moduleRef.get<CommentsService>(CommentsService);
      commentController = moduleRef.get<CommentsController>(CommentsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(commentService, 'findAll').mockImplementation(() => new Promise((resolve, reject) => resolve(result)))

      expect(await commentController.findAll()).toBe(result);
    });
  });
});