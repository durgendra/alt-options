import * as React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";

import PageThumbnailPlugin from "./PageThumbnailPlugin";

const DisplayThumbnail = ({ fileUrl, pageIndex }) => {
  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 150,
    thumbnailHeight: 200,
  });
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = PageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => pageIndex} />,
  });

  return (
    <Viewer
      fileUrl={fileUrl}
      plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
    />
  );
};

export default DisplayThumbnail;
