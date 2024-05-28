import React, { useState } from "react";
import styled from "styled-components";
import hexGen from "../Utilities/hexGen";

const formDataArr = [
  {
    labelText: "Spell Name",
    dataLabel: "spellName",
  },
  {
    labelText: "Spell Level",
    dataLabel: "spellLevel",
  },
  {
    labelText: "School of Magic",
    dataLabel: "spellSchool",
  },
  {
    labelText: "Action Type",
    dataLabel: "spellAction",
  },
  {
    labelText: "Spell Damage",
    dataLabel: "spellDamage",
  },
  {
    labelText: "Damage Type",
    dataLabel: "spellDamageType",
  },
  {
    labelText: "Saving Throw to Resist",
    dataLabel: "savingThrow",
  },
  {
    labelText: "Bonuses When Cast at a Higher Level",
    dataLabel: "spellHigherLevel",
  },
  {
    labelText: "Spell Duration",
    dataLabel: "spellDuration",
  },
  {
    labelText: "Spell Range",
    dataLabel: "spellRange",
  },
  {
    labelText: "Spell Radius",
    dataLabel: "spellRadius",
  },
  {
    labelText: "Spell Description",
    dataLabel: "spellInfo",
  },
];

const defaultSpellData = {
  spellID: "",
  spellName: "",
  spellLevel: "null",
  spellSchool: "",
  spellAction: "",
  spellDamage: "",
  spellDamageType: "",
  savingThrow: "",
  spellHigherLevel: "",
  spellDuration: "", // in rounds
  spellRange: "", // in feet
  spellRadius: "", // in feet
  spellInfo: "",
};

const UpdaterWrapper = styled.div`
  background-color: darkslategrey;
  margin: 1em 0;
  padding: 1em;
  ${({ $isVisible }) => ($isVisible ? "" : `visibility: hidden;`)};
`;

const FieldWrapper = styled.div``;

function isUniqueSpellName(newSpell, existingSpells) {
  // validate spell does not exist before submitting
  return !existingSpells.some(
    (spell) =>
      spell.spellName.replace(/\s/g, "").toLowerCase() ===
      newSpell.spellName.replace(/\s/g, "").toLowerCase()
  );
}

const SpellUpdater = (props) => {
  const { isVisible, toggleVisible, spellsArr, updateSpellList } = props;
  const [spellData, setSpellData] = useState(defaultSpellData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSpellData({
      ...spellData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!spellData.spellName) {
      alert(`A spell name is required!`);
      return;
    }
    // Do something with the form data, e.g., send it to a server or perform validation
    if (isUniqueSpellName(spellData, spellsArr)) {
      spellData.spellID = spellData.spellName[0].toLocaleLowerCase() + hexGen();
      toggleVisible("spellUpdater");
      return updateSpellList([...spellsArr, spellData]);
    } else {
      return alert(`The ${spellData.spellName} already exists!`);
    }
  };

  const handleCancel = () => {
    return toggleVisible("spellUpdater");
  };

  const renderFields = () => {
    return (
      formDataArr &&
      formDataArr.map((fieldData, index) => {
        const { labelText, dataLabel } = fieldData;
        return (
          <FieldWrapper key={`${dataLabel}${index}`}>
            <label>
              {`${labelText}:`}
              <input
                type="text"
                name={dataLabel}
                value={spellData.dataLabel}
                onChange={handleOnChange}
              />
            </label>
            <br />
          </FieldWrapper>
        );
      })
    );
  };

  return (
    <UpdaterWrapper $isVisible={isVisible}>
      Spell Updater
      <button onClick={handleCancel}>Cancel</button>
      <form onSubmit={handleSubmit}>
        {renderFields()}
        <button type="submit">Submit</button>
      </form>
    </UpdaterWrapper>
  );
};

export default SpellUpdater;
