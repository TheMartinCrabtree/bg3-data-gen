import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import SpellUpdater from "../SpellUpdater";

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
    spellAction: "Action",
    spellDamage: "1d6",
    spellDamageType: "Acid",
    savingThrow: "Dexterity",
    spellHigherLevel:
      "Damage increases to 2d6 at level 5, and 3d6 at level 10.",
    spellRange: 60, // in feet
    spellRadius: 7, // in feet
    spellInfo: "Throw a bubble of acid that damages each creature it hits.",
  },
];

const MainWrapper = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
  padding: 2em;
`;

const ActivePaneWrapper = styled.div``;

const getLocalStorageData = () => {
  let data = localStorage.getItem("bg3-game-data");
  return data ? JSON.parse(data) : [];
};

const saveLocalStorageData = (data, updateCallback) => {
  localStorage.setItem("bg3-game-data", JSON.stringify(data));
  return updateCallback(getLocalStorageData());
};

const Main = (props) => {
  const [usersData, setUserData] = useState(getLocalStorageData);
  const [selected, setSelectedIndex] = useState(0);
  const [currentLayout, setCurrentLayout] = useState({
    spellUpdater: false,
  });
  console.log("currentLayout", currentLayout);

  const _updateSelected = (indexVal) => {
    setSelectedIndex(indexVal);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setUserData(jsonData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  const toggleVisible = (toggledElement, event) => {
    // need to add better exception handling
    console.log("toggledElement", toggledElement);
    toggledElement &&
      setCurrentLayout({
        ...currentLayout,
        [toggledElement]: !currentLayout.toggledElement,
      });
  };

  return (
    <MainWrapper>
      <div>
        <button onClick={() => setUserData(characterData)}>
          update data in state
        </button>
      </div>
      <div>
        <button onClick={() => setUserData([])}>reset data in state</button>
      </div>
      <div>
        <button onClick={() => saveLocalStorageData(usersData, setUserData)}>
          update localStorage data
        </button>
      </div>
      <div>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(usersData)
          )}`}
          download={"bg3-game-data.json"}
        >
          download JSON data
        </a>
      </div>
      <div>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
      <div>View Spells:</div>
      <ActivePaneWrapper>
        <button
          disabled={currentLayout.spellUpdater}
          onClick={() => toggleVisible("spellUpdater")}
        >
          Add Spell
        </button>
        <SpellUpdater isVisible={currentLayout.spellUpdater} />
      </ActivePaneWrapper>
    </MainWrapper>
  );
};

export default Main;
