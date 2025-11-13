import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({

    identityNumber: {
        type: String,
        required: true,
        unique: true,
        length: 13
    },
    contact: {
        type: String,
        required: true,
        length: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;