import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
require('dotenv').config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: process.env.SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRY,
            },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
})
export class AuthModule { }
