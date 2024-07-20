import mongoose from "mongoose"

const PaperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    year: { type: Number, required: true },
    course: { type: String, required: true },
    semester: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

export const Paper = mongoose.model("Paper", PaperSchema);