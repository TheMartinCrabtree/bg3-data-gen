import React, {  useState, useEffect } from "react";
import styled from "styled-components";

const testData = [
    {
        spellID: "A001",
        spellName: "Acid Splash",
    },
    {
        spellID: "A002",
        spellName: "Acid Sploosh",
    },
    {
        spellID: "A003",
        spellName: "Basic Splash",
    },
];

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
&:hover{
    background-color: #ccc;
}
`;
const AccordionPanel = styled.div`padding: 0 18px;
background-color: white;
max-height: 0;
overflow: hidden;
transition: max-height 0.2s ease-out;`;

const SpellViewer = (props)=>{
    const [spellsData, setSpellsData] = useState(testData);
    const [openPanels, setOpenPanels] = useState([]);
 
    const renderAccordion =()=>{
        const togglePanel =(spellID)=>{
            const spellIndex = spellID && openPanels.indexOf(spellID);
            if(spellIndex > -1){
                setOpenPanels(openPanels.slice(spellIndex, 1));
                return false;
            }else{
                setOpenPanels([...openPanels, spellID]);
                return true;
            }
        };

        spellsData && spellsData.map((spellData)=>{
            const [spellID,
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
                spellInfo] = spellData;
            return(
            <div key={spellID}>
                <AccordionButton>
                    <AccordionButton onClick={togglePanel}>{spellName}</AccordionButton>
                    <AccordionPanel>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </AccordionPanel>
                </AccordionButton>
            </div>
            );
        });
    }
    return(<LayoutWrapper>
        <AccordionContainer>
            {spellsData && renderAccordion()}
        </AccordionContainer>

    </LayoutWrapper>)
};

export default SpellViewer;

