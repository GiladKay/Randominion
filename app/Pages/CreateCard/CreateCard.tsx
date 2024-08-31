"use client";

import React, { useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db, resizeFile } from "../../utils";
import { ButtonBasic } from "../../Components/ButtonBasic/ButtonBasic.styled";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const enum URLType {
  Data,
  External,
}

const CreateCard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<{ src: string; raw: Blob | string }>();
  const [urlType, setUrlType] = useState(URLType.Data);
  const { isLoading, error, data } = db.useQuery({ categories: {} });
  const [category, setCategory] = useState<string>();
  const [customCategory, setCustomCategory] = useState("");

  async function handleChange(e) {
    const file = await resizeFile(e.target.files[0]);
    setImage({
      src: URL.createObjectURL(file),
      raw: file,
    });
  }

  const handleImageUrl = async (e) => {
    const { value } = e.target;
    if (value.trim()[0] === "[") {
      const cardObjects = JSON.parse(value);

      await db.transact(
        cardObjects.map(({ title, src }) => {
          return tx.cards[id()].update({
            name: title,
            image: src,
            category: category,
          });
        })
      );

      return alert("finished");
    }

    setImage({ raw: value, src: value });
  };

  const pushToDb = () => {
    if (!image) return alert("Please input card information");
    const reader = new FileReader();
    reader.readAsDataURL(image.raw as Blob);

    reader.onloadend = () => {
      db.transact(
        tx.cards[id()].update({
          name: title,
          image: reader.result,
          category: category,
        })
      );
      alert("saved card information");
      handleClear();
    };
  };

  const createCategory = () => {
    db.transact(
      tx.categories[id()].update({
        name: customCategory,
      })
    );
    setCustomCategory("");
  };

  const handleClear = () => {
    setImage(null);
    setTitle("");
  };
  return (
    <>
      <Stack gap="10px" direction="row" minWidth="600px">
        <Stack width="400px" alignItems="end">
          <p style={{ height: "10px", width: "50%" }}>name: {title}</p>
          <div
            style={{
              aspectRatio: "59/91",
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
        </Stack>
        <Stack paddingTop="40px" gap="10px">
          <TextField
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="name"
            sx={{ width: "200px" }}
            size="small"
          />
          <FormControl fullWidth sx={{ width: "200px" }}>
            <InputLabel id="category-label" size="small">
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="category"
              onChange={(e) => setCategory(e.target.value)}
              size="small"
            >
              {data?.categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {urlType === URLType.Data && (
            <input type="file" onChange={handleChange} />
          )}
          {urlType === URLType.External && (
            <TextField
              type="text"
              onChange={handleImageUrl}
              label="link"
              size="small"
            />
          )}
          <Stack direction="row" gap="5px" alignItems="center">
            <Stack>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={urlType}
                onChange={(e) => setUrlType(+e.target.value)}
              >
                <FormControlLabel
                  value={URLType.Data}
                  control={<Radio />}
                  label="uploaded image"
                />
                <FormControlLabel
                  value={URLType.External}
                  control={<Radio />}
                  label="linked image"
                />
              </RadioGroup>
            </Stack>
          </Stack>

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
              sx={{
                ":disabled": {
                  opacity: 0.5,
                },
              }}
              disabled={!category || !title.trim().length || !image}
              onClick={pushToDb}
            >
              <span>confirm</span>
            </ButtonBasic>
          </div>
        </Stack>
      </Stack>
      <Stack direction="row" gap={1}>
        <TextField
          type="text"
          onChange={(e) => setCustomCategory(e.target.value)}
          value={customCategory}
          label="custom category"
          size="small"
        />
        <ButtonBasic
          onClick={createCategory}
          sx={{
            width: "120px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
            background: "#60ff60",
          }}
        >
          create custom category
        </ButtonBasic>
      </Stack>
    </>
  );
};

export default CreateCard;
