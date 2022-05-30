import { AuthGuard } from '@nestjs/passport';
import {
    Get,
    Post,
    Body,
    Controller,
    UsePipes,
    Delete,
    Param,
    Put,
    UseGuards,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../models/users.model';
import { Model } from 'mongoose';
import { Logger } from '../utils/logger';
const logger = new Logger('AuthControllerClass');

@Controller('user')
export class UsersController {
    private hashLength = 16;

    constructor(private readonly usersService: UsersService) { }

    @Get('getUsers')
    @UseGuards(AuthGuard('jwt'))
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id) {
        return this.usersService.findOne(id);
    }

    @Post('addUser')
    @UseGuards(AuthGuard('jwt'))
    // Checking if user exists 
    async create(@Body() inputObj: any) {
        logger.info('Incoming payload on users controller : ',inputObj);
        const duplicateUser = await this.usersService.findOne(inputObj.Name);
        logger.info('Existing user details fetched from DB : ',duplicateUser);
        if (!duplicateUser) {
            // incase of password then encrypt the password
            if (inputObj.password) {
                const hashPassword = await bcrypt.hash(inputObj.password, this.hashLength);
                inputObj.password = hashPassword;
                this.usersService.create(inputObj);
            } else {
                this.usersService.create(inputObj);
            }
            return { status: HttpStatus.CREATED };
        } else {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Username already taken',
            }, HttpStatus.CONFLICT);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteItem(@Param('id') id) {
        this.usersService.delete(id);
        return { status: HttpStatus.OK };
    }
}
