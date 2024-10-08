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
const TextBoxWrapper = styled.div`padding: 5px;`;
const TextBox = styled.div`
  background-color: lightgray;
  border-radius: 5px;
`

const StyledTable = styled.table`width: 100%`;

const SpellViewer = (props) => {
  const { spellList } = props;
  const [openPanels, setOpenPanels] = useState([]);



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
          concentration,
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
                  <td>Saving Throw: {savingThrow ? savingThrow : "N/A"}</td>
                  </tr>
                  <tr>
                  <td>Spell Duration: {spellDuration ? spellDuration : "N/A"}</td>
                  <td>Requires Concentration: {concentration ? concentration : "N/A"}</td>
                  </tr>
                  <tr>
                  <td>Range: {spellRange ? spellRange : "N/A"}</td>
                  <td>Spell Radius: {spellRadius ? spellRadius : "N/A"}</td>
                  
                  </tr>
                </StyledTable>
                {TextBox && (<TextBoxWrapper><TextBox>Bonuses at higher levels: {spellHigherLevel}</TextBox></TextBoxWrapper>)}
                <TextBoxWrapper><TextBox>Spell Info: {spellInfo}</TextBox></TextBoxWrapper>
                
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
