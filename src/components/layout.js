import React from "react"
import styled from "styled-components"

import Header from "./header";
import Sidebar from "./sidebar";


const Main = styled.main`
  margin-left: 20vw;
  display: flex;
  justify-content: center;
`

export default ({ children }) => (
  <>
    <Header />
    <Sidebar />
    <Main>
      {children}
    </Main>
  </>
)