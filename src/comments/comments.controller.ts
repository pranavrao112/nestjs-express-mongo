import { AuthGuard } from '@nestjs/passport';
import {
    Get,
    Post,
    Body,
    Controller,
    Delete,
    Param,
    UseGuards,
    HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Logger } from '../utils/logger';
const logger = new Logger('AuthControllerClass');

@Controller('film')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Get('getComments')
    @UseGuards(AuthGuard('jwt'))
    async findAll() {
        try {
            return this.commentsService.findAll();
        } catch (err) {
            logger.error('Failed to fetch data from DB :', err);
            return err;
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id) {
        return this.commentsService.findOne(id);
    }

    @Post('addComment')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() inputObj: any) {
        logger.info('Incoming payload on comments controller : ', inputObj);
        try {
            return await this.commentsService.create(inputObj);
        } catch (err) {
            logger.error('Failed to add data to DB :', err);
            return err;
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteItem(@Param('id') id) {
        this.commentsService.delete(id);
        return { status: HttpStatus.OK };
    }
}
