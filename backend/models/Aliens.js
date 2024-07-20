import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const AlienSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    powers: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    version_id: {
        type: ObjectId,
        required: true,
        ref: "Version"
    }

}, { timestamps: true })

const Alien = mongoose.model("Alien", AlienSchema)

export default Alien