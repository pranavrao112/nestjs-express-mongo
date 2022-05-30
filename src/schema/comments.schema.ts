import * as mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
    id:{ type : String, required: true },
    FilmId:{ type : String, required: true },
    Comment: { type : String, required: true },
    UserId : { type : String, required: true },
    Timestamps: { type : Date, required: true }
},{
    versionKey:false
}); 