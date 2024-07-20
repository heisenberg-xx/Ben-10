import mongoose from "mongoose";


const VersionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    omnitrixLogo: {
        type: String,
        required: true
    },
    omnitrixName: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Version = mongoose.model("Version", VersionSchema)

export default Version



