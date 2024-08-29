import Resizer from "react-image-file-resizer";

export const resizeFile = (file): Promise<Blob> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      910,
      590,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as Blob);
      },
      'blob'
    );
  });