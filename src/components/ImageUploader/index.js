import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const uploadImage = () => {
  // upload image to local storage temporarily before finalizing with post
  const fileInput = document.getElementById("fileInput");

  // Check if a file is selected
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // Handle the file reading completion
    reader.onload = function (event) {
      const imageData = event.target.result;

      // Store the image data in local storage
      localStorage.setItem("uploadedImage", imageData);

      alert("Image uploaded to local storage!");
    };
  } else {
    alert("Please select an image to upload.");
  }
};

const ImageUploader = () => {
  return <div>image uploader</div>;
};

export default ImageUploader;
