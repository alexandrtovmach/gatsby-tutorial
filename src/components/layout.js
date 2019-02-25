import React from "react"
import styled from "styled-components"

import Header from "./header";
import Sidebar from "./sidebar";


const Main = styled.main`
  margin-left: 20vw;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  @media screen and (max-width: 1280px) {
    background-color: lavender;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      content: "Support this view will coming"
    }

    > * {
      display: none;
    }
  }
`

export default ({ children, headerText, lang }) => (
  <Wrapper>
    <Header text={headerText} />
    <Sidebar locale={lang} />
    <Main>
      {children}
    </Main>
  </Wrapper>
)