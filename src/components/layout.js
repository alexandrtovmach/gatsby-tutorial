import React from "react"
import styled from "styled-components"

import Header from "./header"
import Sidebar from "./sidebar"
import { queryPoints } from "../utils/vars"

const Main = styled.main`
  margin-left: 16.8rem;
  display: flex;
  justify-content: center;
  padding-top: 5em;

  @media screen and (max-width: ${queryPoints.pc}) {
    margin-left: 14rem;
  }
  @media screen and (max-width: ${queryPoints.mid}) {
    margin-left: 0;
  }
  @media screen and (max-width: ${queryPoints.small}) {
    padding-top: 7em;
  }
`

const Wrapper = styled.div`
  /* @media screen and (max-width: ${queryPoints.mid}) {
    background-color: lavender;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      content: "Resolution support is in progress"
    }

    > * {
      display: none;
    }
  } */
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
