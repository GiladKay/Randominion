"use client";

import { init, tx, id } from "@instantdb/react";
import { useEffect, useState } from "react";
import CreateCard from "./Pages/CreateCard/CreateCard";
import Randomizer from "./Pages/Randomizer/Randomizer";
import { db } from "./utils";
import "./index.css";
import { ButtonBasic } from "./Components/ButtonBasic/ButtonBasic.styled";
import { Box } from "@mui/material";
import { PageContainer } from "./Components/PageContainer/PageContainer";

function Page() {
  // useEffect(() => {
  //   document.title = "Randominion";

  //   const a = [
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/3/30/Courtyard.jpg/200px-Courtyard.jpg",
  //       title: "Courtyard",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/f/f7/Lurker.jpg/200px-Lurker.jpg",
  //       title: "Lurker",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/0/0f/Pawn.jpg/200px-Pawn.jpg",
  //       title: "Pawn",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/0/0e/Masquerade.jpg/200px-Masquerade.jpg",
  //       title: "Masquerade",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/8/8e/Shanty_Town.jpg/200px-Shanty_Town.jpg",
  //       title: "Shanty Town",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/8/88/Steward.jpg/200px-Steward.jpg",
  //       title: "Steward",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/e/e7/Swindler.jpg/200px-Swindler.jpg",
  //       title: "Swindler",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/f/f7/Wishing_Well.jpg/200px-Wishing_Well.jpg",
  //       title: "Wishing Well",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/7/73/Baron.jpg/200px-Baron.jpg",
  //       title: "Baron",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/3/39/Bridge.jpg/200px-Bridge.jpg",
  //       title: "Bridge",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/4/42/Conspirator.jpg/200px-Conspirator.jpg",
  //       title: "Conspirator",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/8/85/Diplomat.jpg/200px-Diplomat.jpg",
  //       title: "Diplomat",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/7/76/Ironworks.jpg/200px-Ironworks.jpg",
  //       title: "Ironworks",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/1/10/Mill.jpg/200px-Mill.jpg",
  //       title: "Mill",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/7/7f/Mining_Village.jpg/200px-Mining_Village.jpg",
  //       title: "Mining Village",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/b/b4/Secret_Passage.jpg/200px-Secret_Passage.jpg",
  //       title: "Secret Passage",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/7/7c/Courtier.jpg/200px-Courtier.jpg",
  //       title: "Courtier",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/1/10/Duke.jpg/200px-Duke.jpg",
  //       title: "Duke",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/4/47/Minion.jpg/200px-Minion.jpg",
  //       title: "Minion",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/c/c8/Patrol.jpg/200px-Patrol.jpg",
  //       title: "Patrol",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/2/27/Replace.jpg/200px-Replace.jpg",
  //       title: "Replace",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/a/a9/Torturer.jpg/200px-Torturer.jpg",
  //       title: "Torturer",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/3/36/Trading_Post.jpg/200px-Trading_Post.jpg",
  //       title: "Trading Post",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/d/d3/Upgrade.jpg/200px-Upgrade.jpg",
  //       title: "Upgrade",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/d/dc/Farm.jpg/200px-Farm.jpg",
  //       title: "Farm",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/b/b6/Nobles.jpg/200px-Nobles.jpg",
  //       title: "Nobles",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/b/b3/Secret_Chamber.jpg/200px-Secret_Chamber.jpg",
  //       title: "Secret Chamber",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/9/95/Great_Hall.jpg/200px-Great_Hall.jpg",
  //       title: "Great Hall",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/4/40/Coppersmith.jpg/200px-Coppersmith.jpg",
  //       title: "Coppersmith",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/4/46/Scout.jpg/200px-Scout.jpg",
  //       title: "Scout",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/6/6b/SaboteurOld.jpg/200px-SaboteurOld.jpg",
  //       title: "Saboteur",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/0/00/Tribute.jpg/200px-Tribute.jpg",
  //       title: "Tribute",
  //     },
  //     {
  //       src: "https://wiki.dominionstrategy.com/images/thumb/9/9d/Harem.jpg/200px-Harem.jpg",
  //       title: "Harem",
  //     },
  //   ];

  //   db.transact(
  //     a.map((card) => {
  //       return tx.cards[id()].update({
  //         name: card.title,
  //         image: card.src,
  //       });
  //     })
  //   );
  // }, []);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div
      className="App"
    >
      <div
        style={{
          zIndex: 2,
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          top: 0,
          height: "50px",
          width: "100vw",
          background: "grey",
          gap: "15px",
        }}
      >
        <ButtonBasic
          style={{
            width: "80px",
            height: "40px",
            border: "2px solid grey",
            borderRadius: "10px",
            background: "#70b9ff",
          }}
          onClick={() => setCurrentTab(0)}
        >
          <span>randomizer</span>
        </ButtonBasic>
        <ButtonBasic
          sx={{
            width: "80px",
            height: "40px",
            padding: "4px",
            border: "2px solid grey",
            borderRadius: "10px",
            background: "#60ff60",
          }}
          onClick={() => setCurrentTab(1)}
        >
          <span>card creator</span>
        </ButtonBasic>
      </div>
      <PageContainer>
        {currentTab === 0 && <Randomizer />}
        {currentTab === 1 && <CreateCard />}
      </PageContainer>
    </div>
  );
}

// Write Data
// ---------
// function addTodo(text: string) {
//   db.transact(
//     tx.todos[id()].update({
//       text,
//       done: false,
//       createdAt: Date.now(),
//     })
//   );
// }

// function deleteTodo(todo: Todo) {
//   db.transact(tx.todos[todo.id].delete());
// }

// function toggleDone(todo: Todo) {
//   db.transact(tx.todos[todo.id].update({ done: !todo.done }));
// }

// function deleteCompleted(todos: Todo[]) {
//   const completed = todos.filter((todo) => todo.done);
//   const txs = completed.map((todo) => tx.todos[todo.id].delete());
//   db.transact(txs);
// }

// function toggleAll(todos: Todo[]) {
//   const newVal = !todos.every((todo) => todo.done);
//   db.transact(todos.map((todo) => tx.todos[todo.id].update({ done: newVal })));
// }

export default Page;
