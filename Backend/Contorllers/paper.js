import { Paper } from "../Modal/paper.js";

export const createPaper = async(req, res) => {
    const { name, subject, year, course, semester, imageUrl } = req.body();
    try {
        const paper = await Paper.create({ name, subject, year, course, imageUrl, semester });
        return res.status(201).json({ paper });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getPapers = async(req, res) => {
    const { name, subject, year, course, semester, imageUrl } = req.body();
    try {
        const paper = await Paper.findOne({ name, semester });
        return res.status(201).json({ paper });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getPaper = async(req, res) => {
    const { id } = req.query();
    try {
        const paper = await Paper.findById({ id });
        return res.status(201).json({ paper });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
}

export const updatePaper = async(req, res) => {
    const { name, subject, year, course, semester, imageUrl } = req.body();
    const { id } = req.query();
    try {
        const newPaper = { name, subject, year, course, semester, imageUrl };
        const paper = await Paper.findByIdAndUpdate(id, newPaper);
        return res.status(201).json({ paper });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deletePaper = async(req, res) => {
    const { id } = req.query();
    try {
        const paper = await Paper.findByIdAndDelete({ id });
        return res.status(201).send("Ppaer Deleted Sucessfully");
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
}