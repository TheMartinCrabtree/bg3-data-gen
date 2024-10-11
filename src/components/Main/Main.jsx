import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { SpellUpdater } from "../SpellUpdater";
import { SpellViewer } from "../SpellViewer";
import { CharacterViewer } from "../CharacterViewer";
import defaultSpellList from "../../data/spelldata";

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
  const [usersData, setUserData] = useState(characterData);
  const [spellList, setSpellList] = useState(defaultSpellList);
  const [selected, setSelectedIndex] = useState(0);
  // would be good to use redux or context to manage spell CRUD
  const [spellEditID, setSpellEditID] = useState(null);
  // add option to hide spell list while updating
  const [currentLayout, setCurrentLayout] = useState({
    devTools: false,
    spellUpdater: false,
    spellList: true,
  });
  
  useEffect(()=>{
    spellEditID && !currentLayout.spellUpdater && setCurrentLayout({...currentLayout,
      spellUpdater: true});
    console.log("spellEditID", spellEditID);

  }, [currentLayout, spellEditID])

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
    toggledElement && currentLayout.spellUpdater && setSpellEditID(null);
  };

  return (
    <MainWrapper>
      <DevToolsWrapper>
        <button onClick={() => toggleVisible("devTools")}>
          Show/Hide Dev Tools
        </button>
      </DevToolsWrapper>
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
      <ActivePaneWrapper>
        <CharacterViewer />
      </ActivePaneWrapper>
      <ActivePaneWrapper>
        <div>Spells:</div>
        <SpellViewer spellList={spellList} setSpellEditID={setSpellEditID} />
      </ActivePaneWrapper>
    </MainWrapper>
  );
};

export default Main;
