import { CommentsController } from './comments.controller';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsProviders } from './comments.provider';
import { DatabaseModule } from '../db/db.module';
@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
      ...CommentsProviders,
    ],
  exports: [CommentsService],
})
export class CommentsModule {}
