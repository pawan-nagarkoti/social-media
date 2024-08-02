// two function are used for preview single image
// start
export const previewImage = (previewImageData, setPreviewImageHook) => {
  if (previewImageData && previewImageData[0]) {
    setPreviewImageHook(URL.createObjectURL(previewImageData[0]));
  } else {
    setPreviewImageHook(null);
  }
};

// this function is used for clean up and save the memory leaks
export const cleanupImage = (imageUrl) => {
  if (imageUrl) {
    URL.revokeObjectURL(imageUrl);
  }
};

// end

// Two function are used for preview multiple images
// start
export const multiplPreviewImage = (previewImageData, setPreviewImageHook) => {
  if (previewImageData && previewImageData.length > 0) {
    const previewImages = Array.from(previewImageData).map((file) => URL.createObjectURL(file));
    setPreviewImageHook(previewImages);
  } else {
    setPreviewImageHook([]);
  }
};

export const multipleCleanupImage = (imageUrls) => {
  if (imageUrls && imageUrls.length > 0) {
    imageUrls.forEach(URL.revokeObjectURL);
  }
};
// end

// This function converts the creation time of a post from the API to the number of days since it was created.
export const DateConvertToDays = (createdDate) => {
  const givenDate = new Date(createdDate);
  // Current date
  const currentDate = new Date();
  // Calculate the difference in time
  const timeDifference = currentDate - givenDate;
  // Convert time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};
