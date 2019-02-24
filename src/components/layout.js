import React from "react"
import styled from "styled-components"

import Header from "./header";
import Sidebar from "./sidebar";


const Main = styled.main`
  margin-left: 20vw;
  display: flex;
  justify-content: center;
`

const Article = styled.article`
  max-width: 650px;
  margin-top: 5em;
`

export default ({ children }) => (
  <>
    <Header />
    <Sidebar />
    <Main>
      <Article>
        {children}
      </Article>
    </Main>
  </>
)