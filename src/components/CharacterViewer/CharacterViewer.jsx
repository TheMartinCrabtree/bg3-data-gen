import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div``;

const CharacterViewer = (props) => {
  return (
    <LayoutWrapper>
      <div>Username</div>
      <div>dropdown list of characters</div>
      <div>character details pane that displays basic stats</div>
    </LayoutWrapper>
  );
};

export default CharacterViewer;
