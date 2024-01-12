import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

// const spellList = [
//   {
//     spellID: 1,
//     spellName: "Acid Splash",
//     spellLevel: 0,
//     spellSchool: "Conjuration",
//     spellCost: "Action",
//     spellDamage: "1d6",
//     spellDamageType: "Acid",
//     savingThrow: "Dexterity",
//     spellHigherLevel:
//       "Damage increases to 2d6 at level 5, and 3d6 at level 10.",
//     spellRange: 60, // in feet
//     spellRadius: 7, // in feet
//     spellInfo: "Throw a bubble of acid that damages each creature it hits.",
//   },
// ];
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
      spell.spellName.toLowerCase() === newSpell.spellName.toLowerCase()
  );
}

const SpellUpdater = (props) => {
  const { isVisible, spellsArr } = props;
  const [spellData, setSpellData] = useState(defaultSpellData);
  const [formID, setFormID] = useState(crypto.randomUUID());
  // const generatedKey = crypto.randomUUID();
  useEffect(() => {
    console.log("spellData", spellData);
  }, [spellData]);

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
    console.log("Submitting form:", spellData);
    // Do something with the form data, e.g., send it to a server or perform validation
    isUniqueSpellName(spellData, spellsArr)
      ? console.log("ok to submit")
      : alert(`The ${spellData.spellName} already exists!`);
  };

  const renderFields = () => {
    return (
      formDataArr &&
      formDataArr.map((fieldData, index) => {
        const { labelText, dataLabel } = fieldData;
        return (
          <FieldWrapper key={`${dataLabel}${formID}`}>
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
      <form onSubmit={handleSubmit}>
        {renderFields()}
        <button type="submit">Submit</button>
      </form>
    </UpdaterWrapper>
  );
};

export default SpellUpdater;
