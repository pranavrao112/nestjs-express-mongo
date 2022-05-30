import { JwtPayload } from '../auth/jwt-payload.interface';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Comments } from '../models/comments.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommentsService {
    private hashLength = 16;
    constructor(@Inject('CommentModelToken') private readonly commentModel: Model<Comments>) { }
    async findAll(): Promise<Comments[]> {
        return await this.commentModel.find().exec();
    }

    async findOne(name: String): Promise<Comments> {
        const res = await this.commentModel.findOne({Name: name});
        return res;
    }

    async create(commentObj: any): Promise<Comments> {
        const addComment = new this.commentModel(commentObj);
        return await addComment.save();
    }

    async delete(id: string): Promise<Comments> {
        return await this.commentModel.findByIdAndDelete(id);
    }

    async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.hashLength);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
