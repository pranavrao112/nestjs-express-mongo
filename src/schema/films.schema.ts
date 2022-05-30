import * as mongoose from 'mongoose';

export const filmsSchema = new mongoose.Schema({
    FilmId: { type : String, required: true, unique:true },
    Name:{ type : String, required: true },
    Description:{ type : String, required: true },
    ReleaseDate: { type : String, required: true },
    Rating : { type : Number, required: true },
    Review: { type : String, required: true },
    Country: { type : String, required: true },
    Genre: { type : String, required: true },
    Photo: { type : String, required: true },
    ReviewerId : { type : String, required: true },
    Timestamps: { type : Date, required: true }
},{
    versionKey:false
}); 