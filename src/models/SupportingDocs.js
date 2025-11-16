import mongoose from "mongoose";

const supportingDocsSchema = new mongoose.Schema({
    documentType: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    storagePath: {
        type: String,
        required: true,
        unique: true
    },
    mimetype: {
        type: String,
        default: 'application/pdf'
    },
    size: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, 
    {
    timestamps: true
});

const SupportingDocs = mongoose.model('SupportingDocs', supportingDocsSchema);
export default SupportingDocs;