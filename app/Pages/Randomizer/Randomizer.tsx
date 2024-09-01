"use client";

import React, { useEffect, useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db } from "../../utils";
import { ButtonBasic } from "../../Components/ButtonBasic/ButtonBasic.styled";
import { Autocomplete, Stack, TextField } from "@mui/material";

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const Randomizer = () => {
  const { isLoading, error, data } = db.useQuery({
    cards: { category: {} },
    categories: {},
  });
  const { cards } = data || {};

  const [filters, setFilters] = useState<string[]>([]);
  const [chosenCards, setChosenCards] = useState([]);

  const randomize = () => {
    if (!cards) return;

    const filteredCards = filters.length
      ? Object.values(cards).filter((card) =>
          filters.includes(card.category[0].id)
        )
      : Object.values(cards);

    const shuffledCards = shuffle(filteredCards);

    setChosenCards(shuffledCards.slice(0, 10));
  };

  useEffect(() => randomize(), [isLoading]);

  return isLoading ? (
    <div>Randomizer is loading cards...</div>
  ) : (
    <Stack padding={1} gap={0.5}>
      <Stack direction="row" gap={2}>
        <ButtonBasic
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
            background: "linear-gradient(45deg, #d3ff67, #70b9ff)",
          }}
          onClick={randomize}
        >
          <span>randomize</span>
        </ButtonBasic>
        <ButtonBasic
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
            background: "#70b9ff",
          }}
          onClick={() => {
            setChosenCards(cards);
          }}
        >
          <span>show all</span>
        </ButtonBasic>
        <Autocomplete
          multiple
          id="tags-standard"
          options={data.categories}
          getOptionLabel={(option) => option.name}
          defaultValue={[]}
          onChange={(_, values) => {
            setFilters(values.map(({ id }) => id));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      </Stack>
      <Stack flexWrap="wrap" direction="row">
        {chosenCards.map((card) => {
          return (
            <div
              style={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "end",
                border: "1px solid red",
                width: "210px",
                height: "370px",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, fontWeight: 600 }}>
                {card.name}
              </div>
              <div style={{ position: "absolute", top: 20 }}>
                {card.category[0].name}
              </div>
              <img src={card.image} alt="card has no image" />
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Randomizer;
