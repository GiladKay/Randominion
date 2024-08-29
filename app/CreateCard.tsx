"use client";

import React, { useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db } from "./page";
import { resizeFile } from "./utils";

const CreateCard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<{ src: string; raw: Blob }>();

  async function handleChange(e) {
    const file = await resizeFile(e.target.files[0]);
    setImage({
      src: URL.createObjectURL(file),
      raw: file,
    });
  }

  const pushToDb = () => {
    if (!image) return alert("Please input card information");
    const reader = new FileReader();
    reader.readAsDataURL(image.raw);

    reader.onloadend = () => {
      db.transact(
        tx.cards[id()].update({
          name: title,
          image: reader.result,
        })
      );
      alert("saved card information");
    };
  };

  const handleClear = () => {
    setImage(null);
    setTitle("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        minWidth: "300px",
        gap: "10px",
      }}
    >
      <p style={{ height: "10px", width: "50%" }}>name: {title}</p>
      {
        <div
          style={{
            aspectRatio: "91/59",
            padding: "10px",
            display: "flex",
            width: "200px",
            justifyContent: "center",
            border: "2px solid grey",
            borderRadius: "20px",
          }}
        >
          <img src={image?.src} />
        </div>
      }
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={handleChange} />
      <div style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
        <div
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={pushToDb}
        >
          <span>confirm</span>
        </div>
        <div
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={handleClear}
        >
          <span>clear</span>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
