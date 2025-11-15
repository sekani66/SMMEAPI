import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
    },
    ownerLastName:{
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
        unique: true,
    },
    ownerEmail: {
        type: String,
        required: true,
        unique: true,
    },
    ownerContact: {
        type: String,
        required: true,
    },
    homeAddress: {
        type:String,
        required: true,
    },
    maritalStatus: {
        type: String,
        required: true,
    },
    ownerAge: {
        type: Number,
        required: true
    },
    shareOwners: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
});
const OwnerProfile = mongoose.model("Owner", ownerSchema);
export default OwnerProfile;