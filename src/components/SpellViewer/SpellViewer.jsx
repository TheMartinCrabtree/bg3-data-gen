import React, { useState } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div``;
const AccordionContainer = styled.div``;
const AccordionButton = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  &:hover {
    background-color: #ccc;
  }
`;
const AccordionPanel = styled.div`
  padding: 10px 10px;
  background-color: white;
  color: black;
  max-height: 400px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;
// const FieldWrapper = styled.div`
//   padding: 1em 0;
// `;

const StyledTable = styled.table`width: 100%`;

const SpellViewer = (props) => {
  const { spellList } = props;
  const [openPanels, setOpenPanels] = useState([]);
  console.log("openPanels", openPanels);



  const renderAccordion = () => {
    const togglePanel = (spellID) => {
      if (openPanels.includes(spellID)) {
        setOpenPanels(openPanels.filter((id) => id !== spellID));
      } else {
        setOpenPanels([...openPanels, spellID]);
      }
    };

    return (
      spellList &&
      spellList.map((spellData) => {
        const {
          spellID,
          spellName,
          spellLevel,
          spellSchool,
          spellAction,
          spellDamage,
          spellDamageType,
          savingThrow,
          spellHigherLevel,
          spellRange,
          spellRadius,
          spellDuration,
          spellInfo,
        } = spellData;
        const isOpen = openPanels.includes(spellID);
        return (
          <AccordionContainer key={`${spellID}-spellinfo`}>
            <AccordionButton onClick={() => togglePanel(spellID)}>
              {spellName}
            </AccordionButton>
            {isOpen && (
              <AccordionPanel>
                <StyledTable>
                  <tr>
                    <td>Spell Level: {spellLevel}</td>
                    <td>Spell School: {spellSchool}</td>
                    <td>Action Type: {spellAction}</td>
                  </tr>
                  <tr>
                  <td>Damage: {spellDamage ? spellDamage : "N/A"}</td>
                  <td>Damage Type: {spellDamageType ? spellDamageType : "N/A"}</td>
                  <td>Spell Duration: {spellDuration}</td>
                  </tr>
                  <tr>
                  <td>Range: {spellRange}</td>
                  <td>Spell Radius: {spellRadius}</td>
                  <td>Saving Throw: {savingThrow}</td>
                  </tr>
                </StyledTable>
                <p>Bonuses at higher levels: {spellHigherLevel}</p>
                <p>Spell Info: {spellInfo}</p>
                
              </AccordionPanel>
            )}
          </AccordionContainer>
        );
      })
    );
  };
  return (
    <LayoutWrapper>
      <AccordionContainer>{spellList && renderAccordion()}</AccordionContainer>
    </LayoutWrapper>
  );
};

export default SpellViewer;
