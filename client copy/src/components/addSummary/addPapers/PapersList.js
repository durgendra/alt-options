import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import deleteFile from "../../../firebase/deleteFile";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PapersList = () => {
  const {
    state: { papers, currentUser },
    dispatch,
  } = useValue();

  const handleDelete = async (paperURL) => {
    dispatch({ type: "DELETE_PAPER", payload: paperURL });
    const paperName = paperURL
      ?.split(`${currentUser?.id}%2F`)[1]
      ?.split("?")[0];
    try {
      await deleteFile(`papers/${currentUser?.id}/${paperName}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageList
      rowHeight={250}
      sx={{
        "&.MuiImageList-root": {
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))!important",
        },
      }}
    >
      {papers.map((paper, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            <Viewer fileUrl={paper.url} />
          </Worker>
          {/* <img
            src={image}
            alt="rooms"
            loading="lazy"
            style={{ height: "100%" }}
          /> */}
          <ImageListItemBar
            position="top"
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%",
            }}
            actionIcon={
              <IconButton
                sx={{ color: "white" }}
                onClick={() => handleDelete(paper.url)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PapersList;
