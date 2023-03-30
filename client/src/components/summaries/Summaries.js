import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import React, { useEffect } from "react";
import { StarBorder } from "@mui/icons-material";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getSummaries } from "../../actions/summary";
import timeDifference from "../../utils/DateTime";
import DisplayThumbnail from "./DisplayThumbnail";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

const Summaries = () => {
  const {
    state: { summaries, currentUser },
    dispatch,
  } = useValue();
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  useEffect(() => {
    getSummaries(currentUser, dispatch);
  }, []);

  return (
    <Container>
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "roboto",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Summaries history
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Title </TableCell>
              <TableCell> No. of Papers </TableCell>
              <TableCell> Completed </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.map((summary) => {
              return (
                <TableRow
                  key={summary.title}
                  onClick={() =>
                    dispatch({ type: "UPDATE_SUMMARY", payload: summary })
                  }
                >
                  {Object.entries(summary).map(([key, value]) => {
                    if (key === "papers") {
                      return <TableCell> {summary.papers.length}</TableCell>;
                    } else if (key === "createdAt") {
                      return (
                        <TableCell>
                          {" "}
                          {timeDifference(Date.parse(summary.createdAt))}
                          {/* {Date(summary.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })} */}
                        </TableCell>
                      );
                    } else if (
                      key === "uid" ||
                      key === "_id" ||
                      key === "uName" ||
                      key === "uPhoto" ||
                      key === "updatedAt" ||
                      key === "__v"
                    ) {
                      return "";
                    }
                    return <TableCell>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    // <Container>
    //   <ImageList
    //     gap={12}
    //     sx={{
    //       mb: 8,
    //       gridTemplateColumns:
    //         "repeat(auto-fill, minmax(280px, 1fr))!important",
    //     }}
    //   >
    //     {" "}
    //     {summaries.map((summary) => (
    //       <Card key={summary._id}>
    //         <ImageListItem sx={{ height: "100% !important" }}>
    //           <ImageListItemBar
    //             sx={{
    //               background: `Linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100% )`,
    //             }}
    //             title={"Title: " + summary.title}
    //             actionIcon={
    //               <Tooltip title={summary.uName} sx={{ mr: "5px" }}>
    //                 <Avatar src={summary.uPhoto} />
    //               </Tooltip>
    //             }
    //             position="top"
    //           />
    //           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
    //             {/* <Thumbnails />
    //             <Viewer
    //               plugins={[thumbnailPluginInstance]}
    //               fileUrl={summary.papers[0].pLink}
    //               onClick={() =>
    //                 dispatch({ type: "UPDATE_SUMMARY", payload: summary })
    //               }
    //             /> */}
    //             <DisplayThumbnail
    //               fileUrl={summary.papers[0].pLink}
    //               pageIndex={0}
    //             />
    //           </Worker>
    //           <ImageListItemBar
    //             title={summary.title}
    //             actionIcon={
    //               <Rating
    //                 sx={{ color: "rgba(255, 255, 255, 0.8)", mr: "5px" }}
    //                 name="room-rating"
    //                 defaultValue={3.5}
    //                 precision={0.5}
    //                 emptyIcon={
    //                   <StarBorder sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
    //                 }
    //               />
    //             }
    //           />
    //         </ImageListItem>
    //       </Card>
    //     ))}
    //   </ImageList>
    // </Container>
  );
};

export default Summaries;
