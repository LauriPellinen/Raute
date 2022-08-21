import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Luo skeema, millaisia user-objekteja haluaa tietokantaan.
// Periaatteessa luuranko json-filulle.
const usersSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true } ,
    is_admin:  { type: Boolean, default: true, required: true }
}, { timestamps: true })


export const Users = mongoose.model('Users', usersSchema);