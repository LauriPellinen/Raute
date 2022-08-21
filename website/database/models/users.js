import mongoose from 'mongoose'
import connection from '../functions/connection.js'

// USER SCHEMA //

const userSchema = new mongoose.Schema({ 
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
}, {});

// // Luo skeema, millaisia user-objekteja haluaa tietokantaan.
// // Periaatteessa luuranko json-filulle.
// const usersSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     username: { type: String, required: true },
//     password: { type: String, required: true } ,
//     is_admin:  { type: Boolean, default: true, required: true }
// }, { timestamps: true })

export const UserModel = connection.model('Users', userSchema);


