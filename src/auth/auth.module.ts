import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserServiceProvider } from '../users/users.provider';
require('dotenv').config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: process.env.SECRET,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        // ...UserServiceProvider,
        // UsersService
    ],
})
export class AuthModule { }
