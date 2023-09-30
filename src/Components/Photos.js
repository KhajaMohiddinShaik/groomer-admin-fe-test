import "../App.css";
import React, { useState, useRef } from "react";
import { Switch } from "@mui/material";
import Context from "../Context";

function Photos({
  uploadedimages,
  setUploadedimages,
  isReadOnly,
  shouldUpload,
  setshouldUpload,
  show,
}) {
  const fileInputRef = useRef(); // Create a reference for the file input element

  // States for previewing uploaded photos and their indexes
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState(uploadedimages);

  // Function to handle photo upload
  const handlePhotoUpload = (event) => {
    // Retrieve the selected files from the input event
    const files = Array.from(event.target.files);
    setUploadedimages([]);
    setUploadedimages([...uploadedimages, ...files]);
    // Create previews for the uploaded photos

    // const uploadedPhotoPreviews = files.map((file) =>
    //   URL.createObjectURL(file)
    // );
    setUploadedPhotos([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUploadedPhotos((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    // setUploadedPhotos([...uploadedPhotos, ...uploadedPhotoPreviews]); // Do this to show previews of photos

    // Add the uploaded files to the list of uploaded photos
    // setUploadedPhotos([...uploadedPhotos, ...files]);
    // console.log(uploadedPhotoPreviews);
  };

  // Function to handle thumbnail click, showing the preview of a photo
  const handleThumbnailClick = (index) => {
    setPreviewPhoto(uploadedPhotos[index]);
    setPreviewIndex(index);
  };

  // Function to handle the deletion of an uploaded photo
  const handleDeleteClick = (index) => {
    const updatedPhotos = [...uploadedPhotos];
    updatedPhotos.splice(index, 1);
    setUploadedPhotos(updatedPhotos);

    const updatedImages = [...uploadedimages];
    updatedImages.splice(index, 1);

    setUploadedimages([]);
    setUploadedimages([...updatedImages]);
  };

  // Function to close the photo preview
  const handleClosePreview = () => {
    setPreviewPhoto(null);
  };

  // Function to delete a photo from the preview
  const handleDeletePhoto = () => {
    const updatedPhotos = [...uploadedPhotos];
    updatedPhotos.splice(previewIndex, 1);
    setUploadedPhotos(updatedPhotos);
    setPreviewPhoto(null);
    setPreviewIndex(null);

    const updatedImages = [...uploadedimages];
    updatedImages.splice(previewIndex, 1);

    setUploadedimages([]);
    setUploadedimages([...updatedImages]);
  };

  // console.log(uploadedimages);
  // console.log(uploadedPhotos);
  return (
    <div className="form-group">
      <label className="label">Photos:</label>
      <div className="input">
        <div className="upload">
          Upload files&nbsp;
          {!isReadOnly && shouldUpload ? (
            <label htmlFor="photo-upload" className="upload-label">
              <u>here</u>
            </label>
          ) : (
            <u>here</u>
          )}
        </div>
        {show && (
          <Switch
            checked={shouldUpload}
            onChange={(e) => setshouldUpload(!shouldUpload)}
            color="default"
            disabled={isReadOnly}
          />
        )}
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          onClick={(e) => {
            e.target.value = null;
          }}
          style={{ display: "none" }}
        />
        {/* </div> */}
        <div className="photoContainer">
          <div className="uploaded-photos">
            {/* Display uploaded photo thumbnails */}
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="thumbnail-container">
                <img
                  src={shouldUpload ? photo : `${Context}/${photo}`}
                  alt={`Uploaded ${index + 1}`}
                  className="thumbnail"
                  onClick={() => {
                    handleThumbnailClick(index);
                  }}
                />
                {/* Display delete icon for each thumbnail if not in read-only mode */}
                {!isReadOnly && (
                  <div
                    className="delete-icon"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <span>&times;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </label> */}

      {/* Display the preview of an uploaded photo */}
      {previewPhoto && (
        <div className="preview-container">
          <div className="preview-content">
            <img src={previewPhoto} alt="Preview" className="preview-image" />
            <div className="preview-actions">
              {/* Display delete and close icons for the photo preview */}
              {!isReadOnly && (
                <div className="deleteicon" onClick={handleDeletePhoto}>
                  <i class="material-icons">delete</i>
                </div>
              )}
              <div className="close-icon" onClick={handleClosePreview}>
                <span>&times;</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photos;
