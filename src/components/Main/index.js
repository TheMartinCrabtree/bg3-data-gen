import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const characterData = [
  {
    name: "angela",
    class: "noclass",
    bio: "pixie punk",
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    items: {
      equipped: {
        head: "",
        body: "",
        hands: "",
        feet: "",
        necklace: "",
        rings: {
          left: "",
          right: "",
        },
        weapons: {
          mainhand: "",
          offhand: "",
          ranged: "",
        },
      },
      backpack: {},
    },
  },
  {
    name: "camille",
    class: "noclass",
    bio: "fem fatale",
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    items: {
      equipped: {
        head: "",
        body: "",
        hands: "",
        feet: "",
        necklace: "",
        rings: {
          left: "",
          right: "",
        },
        weapons: {
          mainhand: "",
          offhand: "",
          ranged: "",
        },
      },
      backpack: {},
    },
  },
  {
    name: "hari",
    bio: "fem fatale",
    class: "noclass",
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    items: {
      equipped: {
        head: "",
        body: "",
        hands: "",
        feet: "",
        necklace: "",
        rings: {
          left: "",
          right: "",
        },
        weapons: {
          mainhand: "",
          offhand: "",
          ranged: "",
        },
      },
      backpack: {},
    },
  },
];

const monsterData = [
  {
    name: "goblin",
    class: "runt",
    bio: "runt",
    stats: {
      str: 8,
      dex: 8,
      con: 8,
      int: 8,
      wis: 8,
      cha: 8,
    },
    items: {
      equipped: {
        head: "",
        body: "",
        hands: "",
        feet: "",
        necklace: "",
        rings: {
          left: "",
          right: "",
        },
        weapons: {
          mainhand: "",
          offhand: "",
          ranged: "",
        },
      },
      backpack: {},
    },
  },
];

const Main = (props) => {
  const [gameData, setData] = useState(getLocalStorageData);
  const [selected, setSelectedIndex] = useState(0);
  // console.log("gameData", gameData);
  // console.log("localStorage data", getLocalStorageData());
  const _updateSelected = (indexVal) => {
    setSelectedIndex(indexVal);
  };

  return (
    <MainContainer>
      <Header />
      <MainNavBar />
      <LayoutWrapper>
        <FileNavigator
          data={gameData}
          selected={selected}
          setSelected={_updateSelected}
        />
        <ContentViewer bioData={gameData[selected]} />
      </LayoutWrapper>
      <Footer />

      <div>
        <button onClick={() => setData(characterData)}>
          update data in state
        </button>
      </div>
      <div>
        <button onClick={() => setData([])}>reset data in state</button>
      </div>
      <div>
        <button onClick={() => saveLocalStorageData(gameData, setData)}>
          update localStorage data
        </button>
      </div>
      <div>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(gameData)
          )}`}
          download={"game-data.json"}
        >
          download JSON data
        </a>
      </div>
    </MainContainer>
  );
};

export default Main;
