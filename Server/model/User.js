import mongooes from 'mongoose'

const UserSchema = new mongooes.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    roll:{
        type:String,
        default:'user'
    }
})


const User = mongooes.model('User',UserSchema)

export default User
