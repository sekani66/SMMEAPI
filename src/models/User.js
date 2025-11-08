import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: false
    },
    surname: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();  
});

userSchema.methods.comparePasswords = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;



