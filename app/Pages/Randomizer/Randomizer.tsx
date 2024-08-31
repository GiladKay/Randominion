"use client";

import React, { useEffect, useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db } from "../../utils";
import { ButtonBasic } from "../../Components/ButtonBasic/ButtonBasic.styled";
import { Stack } from "@mui/material";

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

const Randomizer = () => {
  const { isLoading, error, data } = db.useQuery({ cards: {} });
  const { cards } = data || {};

  const [chosenCards, setChosenCards] = useState([]);

  const randomize = () => {
    if (!cards) return
    const shuffledCards = shuffle(Object.values(cards))
    
    setChosenCards(shuffledCards.slice(0,10));
  };

  useEffect(() => randomize(), [isLoading]);

  return isLoading ? (
    <div>Randomizer is loading cards...</div>
  ) : (
    <>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
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
                height: "350px",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0 }}>{card.name}</div>
              <img src={card.image} alt="card has no image" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Randomizer;
