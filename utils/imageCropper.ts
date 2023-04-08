import smartcrop from "smartcrop";

const cropImage = async (image, imageElement) => {
  let croppedImage;
  const reader = new FileReader();

  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imageElement.src = e.target?.result;

    smartcrop.crop(imageElement, { width: 400, height: 400 }).then((result) => {
      const crop = result.topCrop;

      const canvas = document.createElement("canvas");

      const width = 400;
      const height = 400;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        imageElement,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          croppedImage = blob;
        },
        "image/jpeg",
        0.9
      );
    });
  };

  return croppedImage;
};

export default cropImage;
