import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    UserId:{ type : String, required: true },
    Name:{ type : String, required: true , unique : true},
    Description: { type : String, required: true },
    IsReviewerer : { type : Boolean, required: true },
    Timestamps: { type : Date, required: true }
},{
    versionKey:false
}); 