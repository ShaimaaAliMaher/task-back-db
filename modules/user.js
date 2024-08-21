// lec12
////  dynamic //
const mongoose = require('mongoose')
const validator = require('validator')
 const bcryptjs = require('bcryptjs')
 const jwt =require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
       validate(val){
         let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
         if(!password.test(val)){
            throw new Error("password must include uppercase , lowercase , numbers , special caracters")
         }
       }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is INVALID')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(val) {
            if (val <= 0) {
                throw new Error('age must be a positive number')
            }
        }
    },
    city: {
        type: String
    },
    tokens: [{
            type: String,
            required: true
        }] 
})
userSchema.pre("save", async function () {
    const user_in = this   //  => Document 
        console.log(user_in)

         if (user_in.isModified('password'))
      user_in.password = await bcryptjs.hash(user_in.password , 8)
})
/////////////////
userSchema.statics.findByCredentials = async (em, pass) => {
    const user_in = await User.findOne({ email: em })
    if (!user_in) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcryptjs.compare(pass, user_in.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user_in
}

//////////////////////////////////////////////////////////////////////////////////////////
userSchema.methods.generateToken =async function () {
    const user_in =this
    const token =jwt.sign ({_id: user_in._id.toString()} ,"islam500")
    user_in.token= user_in.token.concat(token)
    await user_in.save()
    return token   
}
//////////////////////////////////////////////////////////////////////////////////////////
//  hide private data 
userSchema.methods.toJSON =function(){
    const user_in = this
    //    convert doc to obj  = toObject 
    const userObject = user_in.toObject()
    delete userObject.tokens
    delete userObject.password

   return userObject
}



const User = mongoose.model('User', userSchema)
module.exports = User