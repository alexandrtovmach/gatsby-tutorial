import React from "react"
import styled from "styled-components"

import Header from "./header";
import Sidebar from "./sidebar";


const Main = styled.main`
  margin-left: 20vw;
  display: flex;
  justify-content: center;
`

export default ({ children, headerText, lang }) => (
  <>
    <Header text={headerText} />
    <Sidebar locale={lang} />
    <Main>
      {children}
    </Main>
  </>
)