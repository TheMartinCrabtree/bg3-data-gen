import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { SpellUpdater } from "../SpellUpdater";

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

const defaultSpellList = [
  {
    spellID: "A001",
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

const DevToolsWrapper = styled.div`
  background-color: dimgray;
  padding: 2em;
`;

const ActivePaneWrapper = styled.div`
  background-color: teal;
  padding: 2em;
`;

const getLocalStorageData = () => {
  let data = localStorage.getItem("bg3-game-data");
  return data ? JSON.parse(data) : [];
};

const saveLocalStorageData = (data, updateCallback) => {
  localStorage.setItem("bg3-game-data", JSON.stringify(data));
  return updateCallback(getLocalStorageData());
};

const Main = (props) => {
  const [usersData, setUserData] = useState([]);
  const [spellList, setSpellList] = useState(defaultSpellList);
  const [selected, setSelectedIndex] = useState(0);
  const [currentLayout, setCurrentLayout] = useState({
    devTools: false,
    spellUpdater: false,
  });

  useEffect(() => {
    !usersData[0] && getLocalStorageData();
  }, [usersData]);

  const _updateSelected = (indexVal) => {
    setSelectedIndex(indexVal);
  };

  const handleFileChange = (dataType, event) => {
    const file = event && event.target && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          // quick and dirty
          dataType === "usersData"
            ? setUserData(jsonData)
            : setSpellList(jsonData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  const toggleVisible = (toggledElement, event) => {
    // need to add better exception handling
    toggledElement &&
      setCurrentLayout({
        ...currentLayout,
        [toggledElement]: !currentLayout[toggledElement],
      });
  };

  return (
    <MainWrapper>
      <div>
        <button onClick={() => toggleVisible("devTools")}>
          Show/Hide Dev Tools
        </button>
      </div>
      {!!currentLayout.devTools && (
        <DevToolsWrapper>
          <div>
            <button onClick={() => setUserData(characterData)}>
              update data in state
            </button>
          </div>
          <div>
            <button onClick={() => setUserData([])}>reset data in state</button>
          </div>
          <div>
            <button
              onClick={() => saveLocalStorageData(usersData, setUserData)}
            >
              update localStorage data
            </button>
          </div>
          <div>
            <div>
              <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(usersData)
                )}`}
                download={"bg3-game-data.json"}
              >
                download users JSON data
              </a>
            </div>
            <div>
              <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(spellList)
                )}`}
                download={"bg3-spell-data.json"}
              >
                download spell list JSON data
              </a>
            </div>
          </div>
          Upload Users Data
          <div>
            <input
              type="file"
              accept=".json"
              onChange={() => handleFileChange("usersData")}
            />
          </div>
          Upload Spell List
          <div>
            <input type="file" accept=".json" onChange={handleFileChange} />
          </div>
        </DevToolsWrapper>
      )}
      <ActivePaneWrapper>
        <div>Username</div>
        <div>dropdown list of characters</div>
        <div>character details pane that displays basic stats</div>
      </ActivePaneWrapper>
      <div>View Spells:</div>
      <ActivePaneWrapper>
        <button
          disabled={currentLayout.spellUpdater}
          onClick={() => toggleVisible("spellUpdater")}
        >
          Add Spell
        </button>
        {currentLayout.spellUpdater && (
          <SpellUpdater
            isVisible={currentLayout.spellUpdater}
            toggleVisible={toggleVisible}
            spellsArr={spellList}
            updateSpellList={setSpellList}
          />
        )}
      </ActivePaneWrapper>
    </MainWrapper>
  );
};

export default Main;
