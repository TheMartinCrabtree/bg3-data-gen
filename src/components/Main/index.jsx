import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const characterData = [
  {
    name: "cami",
    userID: 123,
    classes: [
      {
        class: "bard",
        level: 7,
      },
    ],
  },
];

const spellList = [
  {
    spellID: 1,
    spellName: "Acid Splash",
    spellLevel: 0,
    spellSchool: "Conjuration",
    spellCost: "Action",
    spellDamage: "1d6",
    spellDamageType: "Acid",
    savingThrow: "Dexterity",
    spellHigherLevel:
      "Damage increases to 2d6 at level 5, and 3d6 at level 10.",
    spellRange: 60, // in feet
    spellRaidus: 7, // in feet
  },
];

const getLocalStorageData = () => {
  let data = localStorage.getItem("bg3-game-data");
  return data ? JSON.parse(data) : [];
};

const saveLocalStorageData = (data, updateCallback) => {
  localStorage.setItem("bg3-game-data", JSON.stringify(data));
  return updateCallback(getLocalStorageData());
};

const Main = (props) => {
  const [gameData, setData] = useState(getLocalStorageData);
  const [selected, setSelectedIndex] = useState(0);

  const _updateSelected = (indexVal) => {
    setSelectedIndex(indexVal);
  };

  return (
    <div>
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
          download={"bg3-game-data.json"}
        >
          download JSON data
        </a>
      </div>
    </div>
  );
};

export default Main;
