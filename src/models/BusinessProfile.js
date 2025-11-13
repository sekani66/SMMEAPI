import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName:{
        type: String,
        required: true,
    },
    regNo: {
        type: String,
        required: true,
        unique: true,
    },
    taxNo:{
        type: String,
        required: true,
        unique: true,
    },
    businessType:{
        type: String,
        required: true,
    },
    businessSector: {
        type: String,
        required:true,
    },
    tradingYears: {
        type: Number,
        required: true,
    },
    employeeNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    physicalAddress: {
        type: String,
        required: true,
    },
    postalAddress: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const BusinessProfile = mongoose.model("BusinessProfile", businessSchema);
export default BusinessProfile;