import React, { ReactNode, useState } from "react";
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

const SpellUpdater = (props) => {
  const { isVisible } = props;
  console.log("isVisible", isVisible);
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
    // Do something with the form data, e.g., send it to a server or perform validation
    console.log("Form submitted:", spellData);
  };

  const renderFields = () => {
    return (
      formDataArr &&
      formDataArr.map((fieldData) => {
        const { labelText, dataLabel } = fieldData;
        return (
          <FieldWrapper>
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
