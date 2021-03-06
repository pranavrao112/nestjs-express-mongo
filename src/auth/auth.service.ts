import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) { }

  async createToken(user: JwtPayload) {
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.JWT_EXPIRY || '24h',
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    /* Validate if token passed along with HTTP request
     is associated with any registered account in the database */
    return await this.usersService.findOne(payload.username);
  }

}
