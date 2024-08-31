"use client";

import React, { useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db, resizeFile } from "../../utils";
import { ButtonBasic } from "../../Components/ButtonBasic/ButtonBasic.styled";

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
    <>
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
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <ButtonBasic
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
          }}
          onClick={handleClear}
        >
          <span>clear</span>
        </ButtonBasic>
        <ButtonBasic
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
            background: "#60ff60",
          }}
          onClick={pushToDb}
        >
          <span>confirm</span>
        </ButtonBasic>
      </div>
    </>
  );
};

export default CreateCard;
