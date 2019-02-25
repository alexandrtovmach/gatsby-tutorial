import React from "react"
import styled from "styled-components"

import Header from "./header";
import Sidebar from "./sidebar";


const Main = styled.main`
  margin-left: 20vw;
  display: flex;
  justify-content: center;
`

export default ({ children, headerText }) => (
  <>
    <Header text={headerText} />
    <Sidebar />
    <Main>
      {children}
    </Main>
  </>
)