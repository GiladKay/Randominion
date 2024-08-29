"use client";

import { init, tx, id } from "@instantdb/react";
import { useEffect, useState } from "react";
import CreateCard from "./CreateCard";
import Randomizer from "./Randomizer";

// ID for app: Randominion
const APP_ID = "25fae525-9ceb-4531-8917-f76a93773e8e";

// Optional: Declare your schema for intellisense!
type Card = {
  name: string;
  image: Blob;
};

type Schema = {
  cards: Record<string, Card>;
};
export const db = init<Schema>({ appId: APP_ID });


function App() {
  useEffect(() => {
    document.title = 'Randominion'
  }, [])
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
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
        }}
      >
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
            background: "green",
          }}
          onClick={() => setCurrentTab(0)}
        >
          <span>randomizer</span>
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
            background: "red",
          }}
          onClick={() => setCurrentTab(1)}
        >
          <span>card creator</span>
        </div>
      </div>
      {currentTab === 0 && <Randomizer />}
      {currentTab === 1 && <CreateCard />}
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

export default App;
