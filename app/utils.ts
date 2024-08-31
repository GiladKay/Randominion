import { init, tx, id } from "@instantdb/react";

import Resizer from "react-image-file-resizer";
type Card = {
  name: string;
  image: Blob;
};

type Schema = {
  cards: Record<string, Card>;
  categories: Record<string, string>
};

const APP_ID = "25fae525-9ceb-4531-8917-f76a93773e8e";

export const db = init<Schema>({ appId: APP_ID });


const WIDTH = 200
const HEIGHT = 300

export const resizeFile = (file): Promise<Blob> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      WIDTH,
      HEIGHT,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as Blob);
      },
      "blob",
      WIDTH,
      HEIGHT
    );
  });
};
