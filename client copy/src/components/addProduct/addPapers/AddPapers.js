import React, { useCallback, useState } from "react";
import { Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ProgressList from "./progressList/ProgressList";
import PapersList from "./PapersList";

const AddPapers = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
  });
  return (
    <>
      <Paper
        sx={{
          cursor: "pointer",
          background: "#fafafa",
          color: "#bdbdbd",
          border: "1px dashed #ccc",
          "&:hover": { border: "1px solid #ccc" },
        }}
      >
        <div style={{ padding: "16px" }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}> Drop the files here...</p>
          ) : (
            <p>Drag 'n' Drop some files here, or click to select files</p>
          )}
          <em>( document with *.pdf only extension ) </em>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
      <PapersList />
    </>
  );
};

export default AddPapers;
