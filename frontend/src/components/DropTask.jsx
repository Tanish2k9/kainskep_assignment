import React, { useState } from "react";
import "./DropTask.css";
export const DropTask = ({ onDrop, fullheight }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      className={`${showDrop ? "activeDrop" : "hideDrop"} ${
        fullheight ? "full-height" : ""
      } drop-container`}
      onDragEnter={() => {
        setShowDrop(true);
      }}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDrop={(e) => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      DropTask
    </div>
  );
};
