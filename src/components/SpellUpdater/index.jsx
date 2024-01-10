import React, { ReactNode, useState } from "react";
import styled from "styled-components";

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
    spellRadius: 7, // in feet
    spellInfo: "Throw a bubble of acid that damages each creature it hits.",
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

const SpellUpdater = () => {
  const [spellData, setSpellData] = setState(defaultSpellData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSpellData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to a server or perform validation
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      Spell Updater
      <div>Add/Edit Spell</div>
      <form onSubmit={handleSubmit}>
        <label>
          Spell Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spell Level:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spell School:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Action Cost:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Damage:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Damage Type:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Saving Throw to Resist:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bonus at higher levels:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Range:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Radius:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spell Description:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SpellUpdater;
