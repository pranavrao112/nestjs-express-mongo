import { JwtPayload } from './jwt-payload.interface';
import { Controller, Get, UseGuards, Post, Body, Response, Inject, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '../utils/logger';
const logger = new Logger('AuthControllerClass');
@Controller('user')
export class AuthController {
    private hashLength = 16;
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) { }

    @Post('login')
    async login(@Body() payload: JwtPayload) {
        logger.info('Incoming payload on auth controller : ',payload);
        const user = await this.usersService.findOne(payload.username);
        logger.info('User details fetched : ',user)
        if(!user){
            throw new BadRequestException('Invalid credentials!');
        }
        // if we have password 
        if(payload.password){
            const hashPassword = await bcrypt.hash(payload.password, this.hashLength);
            if(!await bcrypt.compare(hashPassword, payload.password)){
                throw new BadRequestException('Invalid credentials!');
            }
        }
        if (user) {
            try{
                return await this.authService.createToken(payload);
            } catch (err) {
                logger.error('Failed to add data to DB :', err);
                return err;
           }
        } else {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Wrong username or password',
            }, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('token')
    async createToken(@Body() payload: JwtPayload): Promise<any> {
        try{
        return await this.authService.createToken(payload);
        } catch (err) {
            logger.error('Failed to create token :', err);
            return err;
          }
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        // This route is restricted by AuthGuard
    }
}
