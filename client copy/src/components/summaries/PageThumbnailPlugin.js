import { Plugin, RenderViewer } from "@react-pdf-viewer/core";
import React from "react";

const PageThumbnailPlugin = (props) => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps) => {
      let { slot } = renderProps;

      slot.children = PageThumbnail;

      // Reset the sub slot
      slot.subSlot.attrs = {};
      slot.subSlot.children = <></>;

      return slot;
    },
  };
};

export default PageThumbnailPlugin;
