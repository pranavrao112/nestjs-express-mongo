import { JwtPayload } from './../auth/jwt-payload.interface';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Users } from '../models/users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private hashLength = 16;
    constructor(@Inject('UserModelToken') private readonly userModel: Model<Users>) { }
    async findAll(): Promise<Users[]> {
        return await this.userModel.find().exec();
    }

    async findOne(name: String): Promise<Users> {
        const res = await this.userModel.findOne({Name: name});
        return res;
    }

    async create(userObj: any): Promise<Users> {
        const createdUser = new this.userModel(userObj);
        return await createdUser.save();
    }

    async delete(id: string): Promise<Users> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.hashLength);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
