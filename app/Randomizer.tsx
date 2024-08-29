"use client";

import React, { useEffect, useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { db } from "./page";

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
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
    <div style={{ display: "flex", flexDirection: "column" }}>
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
          background: "yellow",
        }}
        onClick={randomize}
      >
        <span>randomize</span>
      </div>
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
    </div>
  );
};

export default Randomizer;
