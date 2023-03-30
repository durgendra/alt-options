import tryCatch from "./utils/tryCatch.js";
import Summary from "../models/Summary.js";

export const createSummary = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newSummary = new Summary({ ...req.body, uid, uName, uPhoto });
  const response = await fetch(
    "http://127.0.0.1:5000/pdfextract/api/v1.0/extract",
    {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ papers: newSummary.papers }),
    }
  );
  const data = await response.json();
  newSummary.papers = data.papers;
  await newSummary.save();
  res.status(201).json({ success: true, result: newSummary });
});

export const getSummaries = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const summaries = await Summary.find({ uid: uid }).sort({ _id: -1 });
  console.log("User summaries: " + summaries);
  res.status(200).json({ success: true, result: summaries });
});
