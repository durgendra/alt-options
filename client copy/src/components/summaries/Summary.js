import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, StarBorder } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DisplayThumbnail from "./DisplayThumbnail";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Summary = () => {
  const {
    state: { summary },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: "UPDATE_SUMMARY", payload: null });
  };
  return (
    <Dialog
      fullScreen
      open={Boolean(summary)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {summary?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Paper </TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Title </TableCell>
                <TableCell> Summary </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary?.papers.map((paper) => {
                return (
                  <TableRow key={paper.name}>
                    {Object.entries(paper).map(([key, value]) => {
                      if (key === "pLink") {
                        return (
                          <TableCell>
                            <ImageList
                              rowHeight={250}
                              sx={{
                                "&.MuiImageList-root": {
                                  gridTemplateColumns:
                                    "repeat(auto-fill, minmax(250px, 1fr))!important",
                                },
                              }}
                            >
                              <ImageListItem key={key} cols={1} rows={1}>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                                  <Viewer fileUrl={paper.pLink} />
                                </Worker>
                              </ImageListItem>
                            </ImageList>

                            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js"> */}
                            {/* <Viewer
                                fileUrl={paper.pLink}
                                defaultScale={SpecialZoomLevel.PageFit}
                              /> */}
                            {/* <DisplayThumbnail
                                fileUrl={paper.pLink}
                                pageIndex={0}
                              /> */}
                            {/* </Worker> */}
                          </TableCell>
                        );
                      } else if (
                        key === "pText" ||
                        key === "_id" ||
                        key === "createdAt" ||
                        key === "updatedAt"
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
        {/* <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {summary?.papers?.map((url) => (
            <SwiperSlide key={url.pLink}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                <Viewer fileUrl={url.pLink} />
              </Worker>
            </SwiperSlide>
          ))}
          <Tooltip
            title={summary?.title || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar src={summary?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          ></Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          ></Stack>
        </Stack> */}
      </Container>
    </Dialog>
  );
};

export default Summary;
